import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './styling/Booking.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import axios from "axios";

const Booking = () => {
const { category, id, certificate, price, examStarttime, examEndtime } = useParams(); //get data from url params
const [name, setName] = useState('');
const [lastname, setLastname] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [error, setError] = useState(null);
const [confirmed, setConfirmed] = useState(false);
const { t } = useTranslation(); 

if (!category || !certificate || !examStarttime || !examEndtime) {
  // Hantera fallet där parametern saknas
  return <div>{t('error_missing_parameters')}</div>;
}

const submitBooking = async (event) => {
event.preventDefault();

const customerBooking = {
examId: id,
examStartingTime: examStarttime,
examEndingTime: examEndtime,
customerFirstName: name,
customerLastName: lastname,
customerEmail: email,
customerPassword: password,
};

try {
  const res = await axios.post('http://3.90.225.16:5011/api/booking', customerBooking, {
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    }
  })
  setConfirmed(true);
  setError(null);
}

catch (error) {
    console.error("Error during booking:", error);
    setError("Bokningen misslyckades. Var vänlig testa igen.");
}

console.log(`En testtid har bokats av ${name} ${lastname} för certifikat ${certificate} (cert id: ${id}) med testtid den ${new Date(decodeURIComponent(examStarttime)).toLocaleString()}`)
}
    

  return (
      <div className="bookingSectionone d-flex flex-column justify-content-center align-items-center">
      <h2 style={{ textDecoration: 'underline'}}>{t('booking')}</h2>
      <p><strong style={{}}>{t('course')}:</strong> {certificate}</p>
      <p><strong style={{}}>{t('category')}:</strong> {category}</p>
      <p><strong style={{}}>{t('Price')}:</strong> {price} SEK</p>
      <p><strong style={{}}>{t('Testtime')}:</strong> {new Date(decodeURIComponent(examStarttime)).toLocaleString()}- {new Date(decodeURIComponent(examEndtime)).toLocaleString()}</p>

    <div className='sectionTwo'>
    <Form className="text-center" onSubmit={submitBooking}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{t('firstName')}</Form.Label>
        <Form.Control 
        className='text-center' 
        type="text" 
        placeholder="Enter firstname"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
         />      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{t('lastname')}</Form.Label>
        <Form.Control 
        className='text-center' 
        type="text" 
        placeholder="Your lastname"
        value={lastname}
        onChange={(event) => setLastname(event.target.value)}
        required
         />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{t('email')}</Form.Label>
      <Form.Control
        className="text-center"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>{t('password')}</Form.Label>
      <Form.Control
        className="text-center"
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
    </Form.Group>
      
      <Button variant="primary" type="submit">
        {t('book_time')}
      </Button>
    </Form>
    </div>

    {confirmed && (
      <p>Testtiden för {certificate} är bokad</p>
    )}

    {error && (
      <p>Bokningen misslyckades, var vänlig försök igen</p>
    )}

    </div>
  )
}

export default Booking;