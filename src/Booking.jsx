import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './styling/Booking.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import dayjs from "dayjs";
import { AuthContext } from './services/AuthProvider';
import { Helmet } from "react-helmet-async";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "black",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: { color: "#fa755a", iconColor: "#fa755a" },
  },
};

const Booking = () => {
  const { categoryid, certificatename, examid, price } = useParams();
  const [category, setCategory] = useState({});
  const [testTime, setTesttime] = useState();
  const [includeMaterial, setIncludeMaterial] = useState(false);
  const [includeTest, setIncludeTest] = useState(false);
  const [accprice, setAccprice] = useState(Number(price));
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showStripeInfoModal, setShowStripeInfoModal] = useState(false);

  const stripe = useStripe(); /*En stripe komponent som gör det möjligt att interagera med Stripe API från client. Används för att kunna skapa betalningsid och skicka kortuppgifter till Stripes servrar*/
  const elements = useElements();
  const { t } = useTranslation();
  const { user, token } = useContext(AuthContext);

  // Hämta kategori
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://certbe-backend.onrender.com/api/category');
        const selectedCategory = res.data.find((c) => c.id === parseInt(categoryid));
        if (selectedCategory) setCategory(selectedCategory);
      } catch (error) {
        console.error('Kunde inte hämta kurser:', error);
      }
    };
    fetchCategories();
  }, [categoryid]);

  // Hämta testdatum
  useEffect(() => {
    const fetchTestDates = async () => {
      try {
        const res = await axios.get('https://certbe-backend.onrender.com/api/examdate');
        const formattedTestTimes = res.data.map((t) => {
          const startTime = new Date(`${t.testDate.split('T')[0]}T${t.examStartingTime}`);
          const endTime = new Date(`${t.testDate.split('T')[0]}T${t.examEndingTime}`);
          return {
            ...t,
            formattedStartTime: startTime.toLocaleString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }),
            formattedEndTime: endTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', hour12: false }),
          };
        });
        const chosenTesttime = formattedTestTimes.find((t) => t.id === parseInt(examid));
        setTesttime(chosenTesttime);
      } catch (err) {
        console.error("Error fetching exam dates:", err);
      }
    };
    fetchTestDates();
  }, [examid]);

  // Uppdatera pris när checkboxar ändras
  useEffect(() => {
    let priceTotal = Number(price);
    if (includeMaterial) priceTotal += 750;
    if (includeTest) priceTotal += 500;
    setAccprice(priceTotal);
  }, [includeMaterial, includeTest, price]);

  const handleBooking = async () => {
    if (!stripe || !elements) {
      setError(t('stripe_not_ready'));
      return;
    }

    if (!token) {
      setError(t('not_logged_in'));
      return;
    }

    const now = dayjs();
    const examStart = dayjs(`${testTime.testDate}T${testTime.examStartingTime}`);
    const minutesDiff = examStart.diff(now, 'minute');
    if (minutesDiff < 1440) {
      setError("Bokning stängd. Du måste boka minst 24 timmar före teststart.");
      return;
    }

    setError(null);
    setConfirmed(false);
    setLoading(true);

    try {
      // Validera bokning
      await axios.post('https://certbe-backend.onrender.com/api/booking/validate', {
        examId: examid,
        customerEmail: user.email,
      }, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      // Skapa betalning
      const paymentIntentResponse = await axios.post(
        'https://certbe-backend.onrender.com/payment/create-payment-intent',
        { amount: accprice * 100, testId: examid },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );

      const clientSecret = paymentIntentResponse.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setError(`${t('payment_failed')}: ${result.error.message}`);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        await axios.post('https://certbe-backend.onrender.com/api/booking', {
          ExamId: examid,
          Category: categoryid,
          CertName: certificatename,
          CustomerFirstName: user.firstName,
          CustomerLastName: user.lastName,
          CustomerEmail: user.email,
          PracticeMaterial: includeMaterial,
          PracticeTest: includeTest,
          PaymentIntentId: result.paymentIntent.id
        }, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });

        setConfirmed(true);
        setShowStripeInfoModal(false);
      }
    } catch (err) {
      console.error("Payment or booking error:", err);
      setError(t('payment_or_booking_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bookingSectionone d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '80px' }}>

      <Helmet>
      <title>Boka certifiering | SCS</title>
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href="https://www.scservices.se/booking" />
      </Helmet>
      
      <div className='bookingForm d-flex flex-column justify-content-center align-items-center'>

      <h2>{t('booking')}</h2>
      <p><strong>{t('course')}:</strong> {certificatename}</p>
      <p><strong>{t('category')}:</strong> {category.name}</p>
      <p><strong>{t('Price')}:</strong> {accprice} SEK</p>
      {testTime && <p>{testTime.formattedStartTime} - {testTime.formattedEndTime}</p>}

      <div className='d-flex justify-content-start gap-3 mb-3'>
        <Form.Check
          type="checkbox"
          label={`${t('add_practice_material')} (+750 SEK)`}
          checked={includeMaterial}
          onChange={(e) => setIncludeMaterial(e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label={`${t('add_practice_test')} (+500 SEK)`}
          checked={includeTest}
          onChange={(e) => setIncludeTest(e.target.checked)}
        />
      </div>

      <Button variant="primary" onClick={() => setShowStripeInfoModal(true)} disabled={loading}>
        {loading ? <Spinner as="span" animation="border" size="sm" /> : t('pay_and_book')}
      </Button>

      <div aria-live="polite" role="alert" className="mt-3">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {confirmed && <p style={{ color: 'green' }}>✅ {t('booking_complete')}</p>}
      </div>

      <Modal show={showStripeInfoModal} onHide={() => setShowStripeInfoModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('payment_via_stripe')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('secure_payment_by_stripe')}</p>
          <img src="https://www.leafrootfruit.com.au/wp-content/uploads/2018/08/secure-stripe-payment-logo-amex-master-visa@2x.png"
               alt="Stripe logo" style={{ height: '24px' }} />
          <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f8f9fa' }}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '10px' }}>{t('card_handled_by_stripe')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStripeInfoModal(false)}>{t('cancel')}</Button>
          <Button variant="primary" onClick={handleBooking} disabled={loading}>{loading ? t('processing') : t('continue_and_pay')}</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default Booking;
