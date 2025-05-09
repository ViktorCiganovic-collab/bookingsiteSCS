import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Itcourses from './components/ITcertificates'; // Importera din kursdata
import './styling/CertDetail.css';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar'; // Importera react-calendar
import 'react-calendar/dist/Calendar.css'; // Importera styling för Calendar

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

  // State för att hålla reda på det valda datumet
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date); // Uppdatera det valda datumet
  };

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
            
            {/* Visa kalender direkt när sidan laddas */}
            <div className="mt-4">
              <h4 className='text-center'>{t('testTime')}</h4>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()} // Förhindra att tidigare datum väljs
              />
            </div>

            {/* Om ett datum är valt, visa det */}
            {selectedDate && (
              <div className="mt-3">
                <p>{t('selected_date')}: {selectedDate.toLocaleDateString()}</p> {/* Visa det valda datumet */}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
