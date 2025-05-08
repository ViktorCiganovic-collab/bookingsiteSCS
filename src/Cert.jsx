import React, { useState } from 'react';
import './styling/Cert.css'; 
import { Container, Row, Col } from 'react-bootstrap';
import certImage from './assets/networkSecurityImage.webp';
import certImage2 from './assets/webdev_img.webp'; 
import Itcourses from './components/ITcertificates'; 
import { Link } from 'react-router-dom';


export default function Cert() {
  const [selectedCategory, setSelectedCategory] = useState('IT-proffs');
  const [selectedCourse, setSelectedCourse] = useState('Microsoft Fundamentals');

  // Fasta kategorier
  const categories = ["IT-proffs", "Affärsutbildning", "IT-användare", "Distansutbildning", "Seminarier"];

  // Kurser baserat på vald kategori
  const filteredCourses = Itcourses.filter(course => course.category === selectedCategory);

  // Kurs-objektet för vald kurs (om någon är vald)
  const currentCourse = filteredCourses.find(course => course.courseName === selectedCourse);

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

      <Row className="mb-4 mx-auto d-flex justify-content-center w-100 text-center">
  <Col md={6}>
    <figure>
      <blockquote className="blockquote">
        <p>
          Det här är våra kurser. Sök nedan på kurs för att se tillgängliga certifikat.
          Viktigt att notera är att certifikat enbart erbjuder test för certifiering,
          inte själva utbildningen.
        </p>
      </blockquote>
      <figcaption className="blockquote-footer">
        Certifikat ger möjlighet att bevisa din kompetens genom tester.
      </figcaption>
    </figure>
  </Col>
</Row>


        <Container>
          <Row>
            {Itcourses.map((course) => (
              <Col md={4} className='course-card my-3'>
                {course.courseName}
                <img src={course.image}></img>
                </Col>
            ))}
          </Row>
    

        </Container>     


      </section>

      <section className='py-5 certificatepageSectionfour'>
  <Container>
    <h2 className="text-center mb-4">Sök efter certifikat</h2>

    <div className="mb-4 mx-auto" style={{ maxWidth: "600px" }}>
      {/* Kategori-select */}
      <label htmlFor="categoryFilter" className="form-label">Välj kategori:</label>
      <select
        id="categoryFilter"
        className="form-select mb-3"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedCourse('');
        }}
      >
        <option value="">-- Välj kategori --</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Kurs-select (visas först när kategori är vald) */}
      {selectedCategory && (
        <>
          <label htmlFor="courseFilter" className="form-label">Välj kurs:</label>
          <select
            id="courseFilter"
            className="form-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Välj kurs --</option>
            {filteredCourses.map((course, idx) => (
              <option key={idx} value={course.courseName}>{course.courseName}</option>
            ))}
          </select>
        </>
      )}
    </div>

    {/* Visar certifikat om en kurs är vald */}
    {currentCourse && (
      <Row className="mt-4">
        <Col md={12} className="mb-4 text-center">
          <h3>{currentCourse.courseName}</h3>
          <p>{currentCourse.description}</p>
          <img 
            src={currentCourse.image} 
            alt={currentCourse.courseName} 
            className="img-fluid mb-4 rounded shadow-sm"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </Col>
        <Col md={12}>
          <h5>Certifieringar i denna kurs:</h5>
          <ul className="list-group">
            {currentCourse.certs.map((cert, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                {cert}
                <Link to={`/cert/${cert}`}>
  <button className="btn btn-primary btn-sm">
    Se bokbara tider
  </button>
</Link>


              </li>
            ))}
          </ul>
        </Col>
      </Row>
    )}
  </Container>
</section>


    </div>
  );
}
