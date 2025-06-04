import React, { useState } from 'react';
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

const Booking = () => {
  const { category, id, certificate, price, examStarttime, examEndtime } = useParams();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);


  const stripe = useStripe();
  const elements = useElements();

  const handleBookingAndPayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
    setError("Stripe är inte redo, försök igen om en stund.");
    setLoading(false);
    return;
    }

    setError(null);
    setConfirmed(false);
    setLoading(true);

    try {
      // 1. Skapa paymentIntent via backend
      const paymentIntentResponse = await axios.post('https://the-backend-url/api/payments/create-payment-intent', {
        amount: parseInt(price) * 100, // SEK till öre
        testId: id,
      });

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
          examId: id,
          examStartingTime: examStarttime,
          examEndingTime: examEndtime,
          customerFirstName: name,
          customerLastName: lastname,
          customerEmail: email,
          customerPassword: password,
        };

        await axios.post('https://your-backend-url/api/booking', customerBooking, {
          headers: {
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

  return (
    <div className="bookingSectionone d-flex flex-column justify-content-center align-items-center">
      <h2>{t('booking')}</h2>
      <p><strong>{t('course')}:</strong> {certificate}</p>
      <p><strong>{t('category')}:</strong> {category}</p>
      <p><strong>{t('Price')}:</strong> {price} SEK</p>
      <p><strong>{t('Testtime')}:</strong> {new Date(decodeURIComponent(examStarttime)).toLocaleString()} - {new Date(decodeURIComponent(examEndtime)).toLocaleString()}</p>

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

        {/* Kortfält */}
        <Form.Group className="mb-3">
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