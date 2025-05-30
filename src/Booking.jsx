import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './styling/Booking.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';


const Booking = () => {
const { category, certificate, price, examStarttime, examEndtime } = useParams(); //get data from url params
const [name, setName] = useState('');
const [lastname, setLastname] = useState('');
const { t } = useTranslation(); 

if (!category || !certificate || !examStarttime || !examEndtime) {
  // Hantera fallet där parametern saknas
  return <div>{t('error_missing_parameters')}</div>;
}

const submitBooking = async (event) => {
event.preventDefault();

const customerBooking = {
category,
certName: certificate,
examStartingTime: examStarttime,
examEndingTime: examEndtime,
customerFirstName: name,
customerLastName: lastname
};

console.log(`En testtid har bokats av ${name} ${lastname} för certifikat ${certificate} med testtid den ${new Date(decodeURIComponent(examStarttime)).toLocaleString()}`)
}
    

  return (
      <div className="bookingSectionone d-flex flex-column justify-content-center align-items-center">
      <h2 style={{ textDecoration: 'underline'}}>{t('booking')}</h2>
      <p><span style={{color: 'red'}}>{t('course')}:</span> {certificate} - <span style={{color: 'red'}}>{t('category')}:</span> {category}</p>
      <p><span style={{color: 'red'}}>{t('Price')}:</span> {price} SEK</p>
      <p><span style={{color: 'red'}}>{t('Testtime')}:</span> {new Date(decodeURIComponent(examStarttime)).toLocaleString()}- {new Date(decodeURIComponent(examEndtime)).toLocaleString()}</p>

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
      
      <Button variant="primary" type="submit">
        {t('book_time')}
      </Button>
    </Form>
    </div>

    </div>
  )
}

export default Booking