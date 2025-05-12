import React, { useState } from 'react';
import './styling/Cert.css';
import { Container, Row, Col } from 'react-bootstrap';
import certImage from './assets/networkSecurityImage.webp';
import certImage2 from './assets/webdev_img.webp';
import Itcourses from './components/ITcertificates'; // Import the function (not called here)
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // i18n hook

export default function Cert() {
  const { t } = useTranslation(); // translation hook
  const [selectedCategory, setSelectedCategory] = useState('IT-proffs');
  const [selectedCourse, setSelectedCourse] = useState('Microsoft Fundamentals');

  // Get translated course array
  const courses = Itcourses(); // ✅ Function call to get data

const categories = [
  t('it_pros'),  // Använd de interna värdena för kategorier
  'Business_education',
  'IT_user',
  'Distance_education',
  'Seminar'
];


  // Filter courses based on category
  const filteredCourses = courses.filter(course => course.category === selectedCategory);
  const currentCourse = filteredCourses.find(course => course.courseName === selectedCourse);

  return (
    <div>
      <section className='certificatesPage'>
        <h1>{t('certifications')}</h1>
      </section>

      <section className='certificatesPageSectionTwo py-5'>
        <Container>
          <Row className='align-items-center mb-5'>
            <Col md={6}>
              <h2>{t('IT_certification')}</h2>
              <p>{t('IT_certification_description')}</p>
            </Col>
            <Col md={6}>
              <img
                src={certImage}
                alt={t('certification_image')}
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>

          <Row className='align-items-center mb-5'>
            <Col md={6}>
              <img
                src={certImage2}
                alt={t('webdesign_certification_image')}
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2>{t('Webdesign_UX')}</h2>
              <p>{t('Webdesign_UX_description')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='py-5 certificatepageSectionthree'>
        <Row className="mb-4 mx-auto d-flex justify-content-center w-100 text-center">
          <Col md={6}>
            <figure>
              <blockquote className="blockquote">
                <p>{t('course_description')}</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                {t('certification_explanation')}
              </figcaption>
            </figure>
          </Col>
        </Row>

        <Container>
          <Row>
            {courses.map((course) => (
              <Col md={4} className='course-card my-3' key={course.courseName}>
                {course.courseName}
                <img src={course.image} alt={course.courseName}></img>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className='py-5 certificatepageSectionfour'>
        <Container>
          <h2 className="text-center mb-4">{t('search_for_certificates')}</h2>

          <div className="mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            {/* Kategori-select */}
            <label htmlFor="categoryFilter" className="form-label">{t('select_category')}:</label>
            <select
              id="categoryFilter"
              className="form-select mb-3"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedCourse('');
              }}
            >
              <option value="">{t('choose_category')}</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Kurs-select (visas först när kategori är vald) */}
            {selectedCategory && (
              <>
                <label htmlFor="courseFilter" className="form-label">{t('select_course')}:</label>
                <select
                  id="courseFilter"
                  className="form-select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">{t('choose_course')}</option>
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
              <Col md={4} className="mb-4 text-center">
                <h3>{currentCourse.courseName}</h3>
                <p>{currentCourse.description}</p>
                <img
                  src={currentCourse.image}
                  alt={currentCourse.courseName}
                  className="img-fluid mb-4 rounded shadow-sm"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              </Col>
              <Col md={7}>
                <h5>{t('certifications_for_this_course')}</h5>
                <ul className="list-group">
                  {currentCourse.certs.map((cert, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      {cert}
                      <Link to={`/cert/${cert}`}>
                        <button className="btn btn-primary btn-sm">
                          {t('view_available_timeslots')}
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
