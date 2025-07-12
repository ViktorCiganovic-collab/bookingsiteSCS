import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import './styling/Cert.css';
import { Container, Row, Col } from 'react-bootstrap';
import certImage from './assets/networkSecurityImage.webp';
import certImage2 from './assets/webdev_img.webp';
import Itcourses from './services/ITcertificates'; 
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

export default function Cert() {
  const { t } = useTranslation();   
  const [category, setCategory] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState('');  
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [alltesttimes, setAlltesttimes] = useState([]);
  const [relevantCertificates, setRelevantCertificates] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [error, setError] = useState(false);  
  const categorySectionRef = useRef(null); 

  // Get translated course array
  const courses = Itcourses(); // ✅ Function call to get data  

useEffect(() => {
  axios.get('http://localhost:5011/api/examdate')
    .then(res => setAlltesttimes(res.data))
    .catch(err => console.error("Error fetching exam dates:", err));
}, []);

useEffect(() => {
  const fetchCategories = async () => {

    try {
      const res = await axios.get('http://localhost:5011/api/category');
      setCategory(res.data);
      console.log(res.data);
    }
    catch (error) {
      console.error('Kunde inte hämta kurser:', error);
      setCategory([]);
    }
  }  
  fetchCategories();
}, []);

  // Filter categories based on userchoice
  const currentCategory = category.find(category => category.name === selectedcategory);
 
  const seeTestTimes = (certName) => {
    console.log("Clicked on:", certName);
    setSelectedCertificate(certName);
  };

  // Filter array based on selected certificate
 useEffect(() => {
  if (selectedCertificate) {
    console.log("🔍 Searching for certificate...:", selectedCertificate);
    
    const filteredCertificates = alltesttimes.filter((course) =>
      course.certName.trim().toLowerCase() === selectedCertificate.trim().toLowerCase()
    );

    if (filteredCertificates.length > 0) {
      setRelevantCertificates(filteredCertificates); 
      console.log("✅ Chosen certificates with available slots:", filteredCertificates);
    } else {
      setRelevantCertificates([]); 
      console.log("❌ No available slots for:", selectedCertificate);
    }
  }
}, [selectedCertificate, alltesttimes]);

  function formatCurrency(price) {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
    }).format(price);
  }

  useEffect(() => {
  const savedCategory = localStorage.getItem('selectedcategory');
  if (savedCategory) {
    setSelectedcategory(savedCategory);
  }
}, []);

useEffect(() => {
  localStorage.setItem('selectedcategory', selectedcategory);
}, [selectedcategory]);

const handleCourseClick = (courseName) => {

setSelectedcategory(courseName);

    // Scrolla till certifikatsektionen
    if (categorySectionRef.current) {
      categorySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }

}

  
  return (
    <div>
      <section className='certificatesPage'>
        <h1 data-aos="fade-down">{t('certifications')}</h1>
      </section>

      <section className='certificatesPageSectionTwo py-5'>
        <Container>
          <Row className='align-items-center mb-5'>
            <Col md={6} data-aos="fade-left" data-aos-duration="1000">
              <h2>{t('IT_certification')}</h2>
              <p>{t('IT_certification_description')}</p>
            </Col>
            <Col md={6} data-aos="fade-right" data-aos-duration="1000">
              <img
                src={certImage}
                alt={t('certification_image')}
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>

          <Row className='align-items-center mb-5'>
            <Col md={6} data-aos="zoom-in" data-aos-duration="1000">
              <img
                src={certImage2}
                alt={t('webdesign_certification_image')}
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6} data-aos="fade-right" data-aos-duration="1000">
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
              <figcaption className="blockquote-footer text-white">
                {t('certification_explanation')}
              </figcaption>
            </figure>
          </Col>
        </Row>

        <Container>
          <Row>
  {courses.map((course, index) => (
    <Col
      md={4}
      className="course-card my-3"
      key={course.courseName}
      onMouseEnter={() => setHoveredCategory(index)}
      onMouseLeave={() => setHoveredCategory(null)}    
      style={{ position: 'relative', overflow: 'hidden' }}
      onClick={() => handleCourseClick(course.courseName)}
    >
      <div className="card-base" style={{ height: '100%' }} data-aos="zoom-in-up" data-aos-duration="1000">
        <h4>{course.courseName}</h4>
        <img
          src={course.image}
          alt={course.courseName}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>

      <div
        className="hover-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          opacity: hoveredCategory === index ? 1 : 0,
          visibility: hoveredCategory === index ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1rem'
        }}
      >
        <div>
          <h5>{course.description}</h5>         
        </div>
      </div>
    </Col>
  ))}
</Row>


        </Container>
      </section>

   <section className='py-5 certificatepageSectionfour' ref={categorySectionRef}>
  <Container>
    <h2 className="text-center mb-4">{t('search_for_certificates')}</h2>

    <div className="mb-4 mx-auto" style={{ maxWidth: "600px" }}>
      {/* Kategori-select, alltid synlig */}
      <label htmlFor="courseFilter" className="form-label">{t('choose_category')}</label>
      <select
        id="courseFilter"
        className="form-select"
        value={selectedcategory} 
        onChange={(e) => {
        setSelectedcategory(e.target.value)
        }}      

      >
        
        {category.map((category, idx) => (
          <option key={idx} value={category.name}>{category.name}</option>
        ))}
      </select>
    </div>

    {/* Visar certifikat inom kategorin om en kategori är vald */}
    {selectedcategory && currentCategory ? (
  <Row className="mt-4">
    <Col md={4} className="mb-4 text-center">
      <h3>{currentCategory.name}</h3>
      <p>{currentCategory.description}</p>
      <img
        src={currentCategory.image}
        alt={currentCategory.name}
        className="img-fluid mb-4 rounded shadow-sm"
        style={{ maxHeight: "300px", objectFit: "cover" }}
      />
    </Col>
    <Col md={7}>
      <h5>{t('certifications_for_this_course')}</h5>
      <ul className="list-group">
       {currentCategory.certs.map((cert) => (
  <li key={cert.id || cert.name} className="list-group-item d-flex justify-content-between align-items-center">
    <Link to={`/cert/${encodeURIComponent(cert.name)}/${cert.description}/${cert.price}/${cert.categoryId}`}>
      <span className='certStyling'>{cert.name}</span>
    </Link>
    <button className='btn btn-primary' onClick={() => seeTestTimes(cert.name)}>{t('view_available_timeslots')}</button>
  </li>
))}
      </ul>
      {relevantCertificates && relevantCertificates.length > 0 ? (
  <div className="mt-4">
    <h5>{t('available_exam_times')} {selectedCertificate}</h5>
    <ul className="list-group">
      {relevantCertificates.map((certificate, idx) => (
        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <strong>
              {new Date(certificate.examStartingTime).toLocaleString()} - {new Date(certificate.examEndingTime).toLocaleTimeString()}
            </strong>
          </span>
          {t('Price')} ({formatCurrency(certificate.price)})
          <Link to={`/booking/${certificate.category}/${certificate.id}/${encodeURIComponent(certificate.certName)}/${certificate.price}/${encodeURIComponent(certificate.examStartingTime)}/${encodeURIComponent(certificate.examEndingTime)}`}>
            <button className='btn btn-primary' style={{ padding: "5px", borderRadius: "5px" }}>
              {t('book_time')}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  </div>
) : selectedCertificate ? (
  <p className="mt-4 text-danger">{t('no_exam_dates_available')}</p>
) : null}

    </Col>
  </Row>
) : selectedcategory ? (
  <p className="text-danger text-center">{t('category_not_found')}</p>
) : null}

  </Container>
</section>

    </div>
  );
}
