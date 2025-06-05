import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Itcourses from './services/ITcertificates'; 
import './styling/CertDetail.css';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 

export default function CertDetail() {
  const { certName, category } = useParams(); 
  const { t } = useTranslation(); 

 
  return (
    <section className="py-5 detailSection">
      <Container>
        <Row>
          <Col md={5} className='text-center'>
          <h1>{category}</h1>
          <h3>{certName}</h3>
          </Col>

          <Col md={5}>
  <div className="bg-light p-4 rounded shadow-sm">
    <h5 className="mb-4 text-dark">Kursfakta</h5>
    <table className="table table-borderless table-sm mb-4">
      <tbody>
        <tr>
          <td><strong>Typ</strong></td>
          <td>Öppen</td>
        </tr>
        <tr>
          <td><strong>Längd</strong></td>
          <td>1 tillfälle, 01:15 h</td>
        </tr>
        <tr>
          <td><strong>Ditt pris</strong></td>
          <td>750 kr exkl. moms</td>
        </tr>
        <tr>
          <td><strong>Ord.pris</strong></td>
          <td>1 500 kr exkl. moms</td>
        </tr>
        <tr>
          <td><strong>Rabatt</strong></td>
          <td>Kampanj, 50%</td>
        </tr>
        <tr>
          <td><strong>Klippkort</strong></td>
          <td>Ja</td>
        </tr>
        <tr>
          <td><strong>Planerad</strong></td>
          <td>1 orter</td>
        </tr>
        <tr>
          <td><strong>Antal tillfällen</strong></td>
          <td>9 tillfällen</td>
        </tr>
      </tbody>
    </table>
    <Button variant="primary" className="w-100">
      Boka certifiering
    </Button>
  </div>
</Col>


      
        </Row>
      </Container>
    </section>
  );
}
