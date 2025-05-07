import React, { useState } from 'react';
import './styling/Cert.css'; 
import { Container, Row, Col } from 'react-bootstrap';
import certImage from './assets/networkSecurityImage.webp';
import certImage2 from './assets/webdev_img.webp'; 
import Itcourses from './components/ITcertificates';

export default function Cert() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories + "All" option
  const uniqueCategories = ["All", ...new Set(Itcourses.map(course => course.category))];

  // Filter based on category selection
  const filteredCourses = selectedCategory === "All"
    ? Itcourses
    : Itcourses.filter(course => course.category === selectedCategory);

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

          {/* Dropdown for category filter */}
          <div className="mb-4 mx-auto me-auto" style={{ maxWidth: "400px" }}>
            <label htmlFor="categoryFilter" className="form-label">Filtrera efter kategori:</label>
            <select
              id="categoryFilter"
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {uniqueCategories.map((category, idx) => (
                <option key={idx} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <Row>
            {filteredCourses.map((course, index) => (
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
