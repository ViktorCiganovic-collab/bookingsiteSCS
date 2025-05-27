import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Itcourses from './services/ITcertificates'; 
import './styling/CertDetail.css';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 

export default function CertDetail() {
  const { certId } = useParams(); 
  const { t } = useTranslation(); 

  // Hämta alla kurser från Itcourses-funktionen
  const courses = Itcourses(); 

  
  const cert = courses
    .map(course => course.certs) 
    .flat() 
    .find(certificate => certificate === certId); 

 
  if (!cert) {
    return (
      <Container>
        <h2>{t('certificate_not_found')}</h2> 
      </Container>
    );
  }

  const course = courses.find(course => course.certs.includes(cert));

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date); 
  };

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
            <h5>{t('details_for')} {cert}:</h5> 
            <ul>
              <li>{t('certificate_name')}: {cert}</li> 
              <li>{t('description')}: {course.description}</li> 
            </ul>
            
          
            <div className="mt-4">
              <h4 className='text-center'>{t('testTime')}</h4>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()} 
                className="text-dark"
              />
            </div>

         
            {selectedDate && (
              <div className="mt-3">
                <p>{t('selected_date')}: {selectedDate.toLocaleDateString()}</p> 
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
