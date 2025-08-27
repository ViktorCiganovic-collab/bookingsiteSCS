import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './styling/Booking.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import axios from "axios";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "black",
      backgroundColor: 'white',
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
  const [loading, setLoading] = useState(false);
  const [showStripeInfoModal, setShowStripeInfoModal] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5011/api/category');
        const categories = res.data;
        const selectedCategory = categories.find((c) => c.id === parseInt(categoryid));
        if (selectedCategory) setCategory(selectedCategory);
      } catch (error) {
        console.error('Kunde inte hämta kurser:', error);
        setCategory([]);
      }
    };
    fetchCategories();
  }, [categoryid]);

  useEffect(() => {
    axios.get('http://localhost:5011/api/examdate')
      .then((res) => {
        const formattedTestTimes = res.data.map((testtime) => {
          const startTime = new Date(`${testtime.testDate.split('T')[0]}T${testtime.examStartingTime}`);
          const endTime = new Date(`${testtime.testDate.split('T')[0]}T${testtime.examEndingTime}`);

          return {
            ...testtime,
            formattedStartTime: startTime.toLocaleString('sv-SE', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit', hour12: false,
            }),
            formattedEndTime: endTime.toLocaleTimeString('sv-SE', {
              hour: '2-digit', minute: '2-digit', hour12: false,
            }),
          };
        });

        const chosenTesttime = formattedTestTimes.find((t) => t.id === parseInt(examid));
        setTesttime(chosenTesttime);
      })
      .catch(err => console.error("Error fetching exam dates:", err));
  }, [examid]);

  const handleMaterialToggle = (checked) => {
    setAccprice((prev) => prev + (checked ? 100 : -100));
  };

  const handleTestToggle = (checked) => {
    setAccprice((prev) => prev + (checked ? 100 : -100));
  };

  const handleBooking = async () => {
  if (!stripe || !elements) {
    setError("Stripe är inte redo, försök igen om en stund.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    setError("Du är inte inloggad. Logga in först.");
    return;
  }

  setError(null);
  setConfirmed(false);
  setLoading(true);

  try {
    // ✅ Steg 1: Validera tillgänglighet
    await axios.post('http://localhost:5011/api/booking/validate', {
      examId: examid,
      customerEmail: email,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  } catch (err) {
    // ✅ Visa direkt feedback om något gick fel vid validering
    if (err.response?.status === 400 && err.response.data === "Det finns inte platser kvar på det här testdatumet.") {
      setError("Inga platser finns kvar på det valda testdatumet.");
    } else if (err.response?.status === 400 && err.response.data === "Kunden har redan en bokning på detta testdatum.") {
      setError("Du har redan en bokning på detta testdatum.");
    } else if (err.response?.status === 404) {
      setError("Det valda testdatumet kunde inte hittas.");
    } else {
      setError('Ett fel inträffade vid validering. Försök igen.');
    }

    setLoading(false);
    return; // 🛑 Stoppa flödet här – gå inte vidare till betalning
  }

  try {
    // 💳 Steg 2: Skapa betalning
    const paymentIntentResponse = await axios.post('http://localhost:5011/payment/create-payment-intent', {
      amount: parseInt(accprice) * 100,
      testId: examid,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const clientSecret = paymentIntentResponse.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError('Betalningen misslyckades: ' + result.error.message);
      return;
    }

    // ✅ Steg 3: Slutför bokning efter betalning
    if (result.paymentIntent.status === 'succeeded') {
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
        }
      });

      setConfirmed(true);
      setShowStripeInfoModal(false);
    }
  } catch (err) {
    console.error(err);
    setError('Ett fel inträffade vid betalning eller bokning. Försök igen.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bookingSectionone d-flex flex-column justify-content-center align-items-center">
      <h2>{t('booking')}</h2>
      <p><strong>{t('course')}:</strong> {certificatename}</p>
      <p><strong>{t('category')}:</strong> {category.name}</p>
      <p><strong>{t('Price')}:</strong> {accprice} SEK</p>
      {testTime && (
        <p>{testTime.formattedStartTime} - {testTime.formattedEndTime}</p>
      )}

      <Form className="text-center" onSubmit={(e) => {
        e.preventDefault();
        setShowStripeInfoModal(true);
      }}>
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
            label={`${t('add_practice_material')} (+100 SEK)`}
            checked={includeMaterial}
            onChange={(e) => {
              const checked = e.target.checked;
              setIncludeMaterial(checked);
              handleMaterialToggle(checked);
            }}
          />

                <Form.Check
          type="checkbox"
          label={`${t('add_practice_test')} (+100 SEK)`}
          checked={includeTest}
          onChange={(e) => {
            const checked = e.target.checked;
            setIncludeTest(checked);
            handleTestToggle(checked);
          }}
        />

        </div>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Betalar & bokar...
            </>
          ) : (
            t('pay_and_book')
          )}
        </Button>
      </Form>

      {confirmed && <p style={{ color: 'green' }}>✅ Bokningen är klar och betalningen lyckades!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Stripe informations- och betalmodal */}
      <Modal show={showStripeInfoModal} onHide={() => setShowStripeInfoModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Betalning via Stripe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Du betalar säkert via Stripe. Fyll i dina kortuppgifter nedan:</p>
          <img
          src="https://www.leafrootfruit.com.au/wp-content/uploads/2018/08/secure-stripe-payment-logo-amex-master-visa@2x.png"
          alt="Stripe logo"
          style={{ height: '24px' }}
        />


          <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f8f9fa' }}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '10px' }}>
            Kortinformationen hanteras säkert via <strong>Stripe</strong> och lagras inte hos oss.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStripeInfoModal(false)}>
            Avbryt
          </Button>
          <Button variant="primary" onClick={handleBooking} disabled={loading}>
            {loading ? 'Bearbetar...' : 'Fortsätt & betala'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Booking;

