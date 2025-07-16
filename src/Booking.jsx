import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import './styling/Booking.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#fff",         
      backgroundColor: 'black',
      padding: '20px 14px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

// path: 'booking/:categoryid/:certificatename/:examid/:price',
{/* <Link to={`/booking/${selectedTest.categoryID}/${encodeURIComponent(selectedTest.certname)}/${testtime.id}/${testtime.price}`}></Link> */}

const Booking = () => {
  const { categoryid, certificatename, examid, price } = useParams();
  const [category, setCategory] = useState([]);
  const [testTime, setTesttime] = useState();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [includeMaterial, setIncludeMaterial] = useState(false);
  const [includeTest, setIncludeTest] = useState(false);
  const [accprice, setAccprice] = useState(Number(price));
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements(); 

useEffect(() => {
  const fetchCategories = async () => {

    try {
      const res = await axios.get('http://localhost:5011/api/category');
      const categories = res.data;
      const selectedCategory = categories.find((category) => category.id === parseInt(categoryid));

      if (selectedCategory) {
        setCategory(selectedCategory); 
      } else {
        console.log("Category not found.")
      }
      console.log(res.data);
    }
    catch (error) {
      console.error('Kunde inte hämta kurser:', error);
      setCategory([]);
    }
  }  
  fetchCategories();
}, [categoryid]);//on page load get data

useEffect(() => {
  axios.get('http://localhost:5011/api/examdate')
    .then((res) => {
      const formattedTestTimes = res.data.map((testtime) => {
        // Combine testDate (YYYY-MM-DD) with time (HH:mm:ss)
        const startTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examStartingTime}`;
        const endTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examEndingTime}`;
        
        // Check the strings before creating Date objects
        console.log("Start time string:", startTimeString);
        console.log("End time string:", endTimeString);
        
        const startTime = new Date(startTimeString);  // Parse the combined string
        const endTime = new Date(endTimeString);      // Parse the combined string

        // Check if parsing was successful
        if (isNaN(startTime)) {
          console.error("Invalid start time:", startTimeString);
        }
        if (isNaN(endTime)) {
          console.error("Invalid end time:", endTimeString);
        }

        // Format the start and end times if valid
        const formattedStartTime = startTime.toLocaleString('sv-SE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        const formattedEndTime = endTime.toLocaleTimeString('sv-SE', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        // Return the formatted testtime object
        return {
          ...testtime,
          formattedStartTime,
          formattedEndTime,
        };
      });

      const chosenTesttime = formattedTestTimes.find((testtime) => testtime.id === parseInt(examid));
      setTesttime(chosenTesttime);
    })
    .catch(err => console.error("Error fetching exam dates:", err));
}, [examid]);

  const handleBookingAndPayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
    setError("Stripe är inte redo, försök igen om en stund.");
    setLoading(false);
    return;
    }

    const token = localStorage.getItem("token"); // Hämta token

  if (!token) {
    setError("Du är inte inloggad. Logga in först.");
    setLoading(false);
    return;
  }

    setError(null);
    setConfirmed(false);
    setLoading(true);

    try {
      // 1. Skapa paymentIntent via backend
      const paymentIntentResponse = await axios.post('http://localhost:5011/payment/create-payment-intent', {
        amount: parseInt(accprice) * 100, // SEK till öre
        testId: examid,
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

      const clientSecret = paymentIntentResponse.data.clientSecret;

      // 2. Bekräfta kortbetalning
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError('Betalningen misslyckades: ' + result.error.message);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        // 3. Skicka bokning till backend
        const customerBooking = {
          ExamId: examid,
          Category: categoryid,
          CertName: certificatename,          
          CustomerFirstName: name,
          CustomerLastName: lastname,
          CustomerEmail: email,
          CustomerPassword: password,
        };

        await axios.post('http://localhost:5011/api/booking', customerBooking, {
          headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });

        setConfirmed(true);
      }
    } catch (err) {
      console.error(err);
      setError('Ett fel inträffade. Försök igen.');
    }
    finally {
    setLoading(false);
  }
  };

  const handleMaterialToggle = (checked) => {
    if (checked) {
      setAccprice((prev) => prev + 100);
    } 
    else {
      setAccprice((prev) => prev - 100);
    }
  }

  const handleTestToggle = (checked) => {
    if (checked) {
      setAccprice((prev) => prev + 100)
    } 
    else { 
      setAccprice((prev) => prev - 100)
    }
  }
// const { categoryid, certificatename, examid, price } = useParams();
  return (
    <div className="bookingSectionone d-flex flex-column justify-content-center align-items-center">
      <h2>{t('booking')}</h2>
      <p><strong>{t('course')}:</strong> {certificatename}</p>
      <p><strong>{t('category')}:</strong> {category.name}</p>
      <p><strong>{t('Price')}:</strong> {accprice} SEK</p>
      {testTime && (
  <p>{testTime.formattedStartTime} - {testTime.formattedEndTime}</p>
)}

      <Form className="text-center" onSubmit={handleBookingAndPayment}>
        <Form.Group className="mb-3">
          <Form.Label>{t('firstName')}</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('lastname')}</Form.Label>
          <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('email')}</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('password')}</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <div className='d-flex justify-content-start gap-3'>
        <Form.Check 
          type="checkbox" 
          label="Lägg till övningsmaterial (+100 SEK)" 
          checked={includeMaterial} 
          onChange={(e) => {
          const checked = e.target.checked;
          setIncludeMaterial(checked);
          handleMaterialToggle(checked); 
          }} 
        />

        <Form.Check
          type="checkbox"
          label="Lägg till övningstest (+100 SEK)"
          checked={includeTest}
          onChange={(e) => {
            const checked = e.target.checked;
            setIncludeTest(checked);
            handleTestToggle(checked);
          }}
          />
          </div>

        {/* Kortfält */}
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Kortinformation</Form.Label>
          <div style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>      {loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />{' '}
          Betalar & bokar...
        </>
      ) : (
        'Betala & boka'
      )}</Button>
      </Form>

      {confirmed && <p style={{ color: 'green' }}>✅ Bokningen är klar och betalningen lyckades!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Booking;