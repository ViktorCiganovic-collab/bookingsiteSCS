import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Itcourses from './components/ITcertificates'; // Importera din kursdata
import './styling/CertDetail.css';
import { useTranslation } from 'react-i18next';

export default function CertDetail() {
  const { certId } = useParams(); // Hämta certifikats-ID från URL-parametern
  const { t } = useTranslation(); // Använd i18n för översättningar

  // Hämta alla kurser från Itcourses-funktionen
  const courses = Itcourses(); 

  // Hitta certifikatet baserat på certId
  const cert = courses
    .map(course => course.certs) // Skapa en lista med alla certifikat
    .flat() // Slå samman alla certifikat i en array
    .find(certificate => certificate === certId); // Leta efter det certifikat som matchar certId

  // Om certifikatet inte finns, visa ett felmeddelande
  if (!cert) {
    return (
      <Container>
        <h2>{t('certificate_not_found')}</h2> {/* Översättning för "Det certifikatet finns inte" */}
      </Container>
    );
  }

  // Hitta den kurs som certifikatet tillhör
  const course = courses.find(course => course.certs.includes(cert));

  return (
    <section className="py-5 detailSection">
      <Container>
        <Row>
          <Col md={12} className="text-center mb-4">
            <h2>{cert}</h2> {/* Visa certifikatnamnet */}
            <p>{course.description}</p> {/* Visa kursbeskrivningen */}
            <img
              src={course.image}
              alt={course.courseName}
              className="img-fluid mb-4 rounded shadow-sm"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={6} className='detailinfoCert d-flex flex-column w-100 justify-content-center align-items-center'>
            <h5>{t('details_for')} {cert}:</h5> {/* Översättning för "Detaljer för {cert}" */}
            <ul>
              <li>{t('certificate_name')}: {cert}</li> {/* Översättning för "Certifikatnamn" */}
              <li>{t('description')}: {course.description}</li> {/* Översättning för "Beskrivning" */}
            </ul>
            <Button variant="primary" className="mt-4">
              {t('view_available_timeslots')} {/* Översättning för "Boka tid för test" */}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
