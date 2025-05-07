import React from 'react';
import './styling/Cert.css'; 
import { Container, Row, Col } from 'react-bootstrap';
import certImage from './assets/networkSecurityImage.webp';
import certImage2 from './assets/webdev_img.webp'; 
import Itcourses from './components/ITcertificates';

export default function Cert() {
  return (
    <div>
      <section className='certificatesPage'>
        <h1>Certifieringar</h1>
      </section>

      <section className='certificatesPageSectionTwo py-5'>
        <Container>
          <Row className='align-items-center mb-5'>
            <Col md={6}>
              <h2>IT-certifiering</h2>
              <p>
                Denna certifiering visar att du har kompetens inom moderna IT-system och nätverkssäkerhet.
                Du får lära dig grunderna i systemadministration, molnlösningar och cybersäkerhet.
              </p>
            </Col>
            <Col md={6}>
              <img 
                src={certImage} 
                alt="Certifieringsbild" 
                className="img-fluid rounded shadow" 
              />
            </Col>
          </Row>

          <Row className='align-items-center mb-5'>
            <Col md={6}>
              <img 
                src={certImage2} 
                alt="Webbdesign-certifiering" 
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2>Webbdesign & UX</h2>
              <p>
                Denna kurs fokuserar på att bygga användarvänliga och estetiskt tilltalande webbsidor. 
                Du lär dig grunder i HTML, CSS, designprinciper och hur man tänker användarcentrerat.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='py-5 certificatepageSectionthree'>
        <Container>
          <h2 className="text-center mb-4">Alla IT-certifieringar</h2>
          <Row>
            {Itcourses.map((course, index) => (
              <Col key={index} md={4} className="mb-4">
                <div className="course-card h-100">
                  <img
                    src={course.image}
                    alt={course.courseName}
                    className="img-fluid mb-3"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                  <h4>{course.courseName}</h4>
                  <p><strong>Category:</strong> {course.category}</p>
                  <p>{course.description}</p>
                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-secondary w-100">Book Certificate</button>                
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}
