import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Itcourses from './components/ITcertificates'; // Din kursdata
import './styling/CertDetail.css';
export default function CertDetail() {
  const { certId } = useParams(); // Få tag på certifikats-ID från URL-parametern

  // Hitta certifikatet baserat på certId
  const cert = Itcourses
    .map(course => course.certs)
    .flat()
    .find(certificate => certificate === certId);

  // Om certifikatet inte finns, visa felmeddelande
  if (!cert) {
    return (
      <Container>
        <h2>Det certifikatet finns inte</h2>
      </Container>
    );
  }

  // Hitta den kurs som certifikatet tillhör
  const course = Itcourses.find(course => course.certs.includes(cert));

  return (
    <section className="py-5 detailSection">
      <Container>
        <Row>
          <Col md={12} className="text-center mb-4">
            <h2>{cert}</h2>
            <p>{course.description}</p>
            <img
              src={course.image}
              alt={course.courseName}
              className="img-fluid mb-4 rounded shadow-sm"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={6} className='detailinfoCert d-flex flex-column w-100 justify-content-center align-items-center'>
            <h5>Detaljer för {cert}:</h5>
            <ul>
              <li>Certifikatnamn: {cert}</li>
              <li>Beskrivning: {course.description}</li>
            </ul>
            <Button variant="primary" className="mt-4">
              Boka tid för test
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
