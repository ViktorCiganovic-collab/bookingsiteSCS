import './styling/App.css';
import './styling/Main.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import thirdImg from './media/testworkingenvironment.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { translationKeys } from './translationMap';
import { Helmet } from "react-helmet-async";

function App() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const [categories, setCategories] = useState([]); 
  const [itSpecialist, setItSpecialist] = useState([]);
  const [networking, setNetworking] = useState([]);
  const [adobe, setAdobe] = useState([]);
  
  // Anropa Itcourses-funktionen för att få kurserna som en array

    useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://certbe-backend.onrender.com/api/category');

        // Exempel på att filtrera kategorier och sätta olika states
        setCategories(res.data.slice(3, 6));
        setItSpecialist(res.data.filter(cat => cat.name === 'IT Specialist'));
        setNetworking(res.data.filter(cat => cat.name === 'Cisco Certified Support Technician'));
        setAdobe(res.data.filter(cat => cat.name.includes('Adobe')));
      } catch (error) {
        console.error('Kunde inte hämta kurser:', error);
        setItSpecialist([]);
        setNetworking([]);
        setAdobe([]);
      }
    };

    fetchCategories();
  }, []);



  return (
    <div className='mainPage'>

      <Helmet>
<title>SCS – Certiport IT Certifications in Scandinavia</title>

  <meta name="description" content="Take Certiport certifications online or on-site in Scandinavia with SCS Sweden. Microsoft, Adobe, Cisco, Unity and IT Specialist exams with flexible scheduling, fast results and digital certificates." />

  {/* Canonical */}
  <link rel="canonical" href="https://www.scservices.se/" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="SCS – Official Certiport IT Certifications" />
  <meta property="og:description" content="Take Certiport certifications online or on-site in Scandinavia with SCS Sweden. Microsoft, Adobe, Cisco, Unity and IT Specialist exams with flexible scheduling and fast results." />
  <meta property="og:url" content="https://www.scservices.se/" />
  <meta property="og:site_name" content="Scandinavian Certification Services" />


  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SCS – Certifieringar & Officiella prov" />
  <meta name="twitter:description" content="Boka officiella certifieringar snabbt och enkelt hos Scandinavian Certification Services." />

  {/* Organization Schema */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Scandinavian Certification Services",
      url: "https://www.scservices.se",
      logo: "https://www.scservices.se/logo.png",
      sameAs: [
        "https://www.scservices.se"
      ]
    })}
  </script>

  {/* Breadcrumbs */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Hem",
          item: "https://www.scservices.se/"
        }
      ]
    })}
  </script>
      </Helmet>

      <div className="video-container">
     
        <div className="video-overlay">
          <div className="hero-content" data-aos="zoom-in" data-aos-duration="1000">
          <h1>{t('welcome_message')} Scandinavian Certification Services</h1>
          <p>{t('subheadline')}</p>      
          <Link to="/certifiering"><button className='cta-btn'>Boka nu</button></Link>
          </div>   
        </div>        
      </div>

      <section className="mainpageSectiontwo py-5">
        <Container>
          <h2 data-aos="zoom-in" className="text-center mb-4">{t('popular_certifications')}</h2>
            {isMobile ? (
        // 📱 MOBILVY: visa slider
        <Carousel slide={false}>
          {categories.map((course, index) => (
          <Carousel.Item key={index}>
  <Link to={`/certifiering/${course.slug}/${course.certs[0].slug}/${course.certs[0].id}/${course.id}`}>

    <img
      className="d-block w-100"
      src={course.image}
      alt={course.courseName}
      style={{
        objectFit: "cover",
        
        borderRadius: "8px",
      }}
    />
  </Link>
  <div
    style={{
      background: "rgba(0, 0, 0, 0.7)",
      padding: "12px",
      borderRadius: "0 0 8px 8px",
      textAlign: "center",
      marginTop: "-8px", 
    }}
  >
    <h5 className="text-white mb-1">{course.certs[0].name}</h5>
    <p className="text-light small mb-0">{course.certs[0].description}</p>
  </div>
</Carousel.Item>

          ))}
        </Carousel>
      ) : (
        // 🖥️ DESKTOPVY: visa 3 kolumner
        <Row>
          {categories.map((course, index) => (
            
            <Col key={index} md={4}>
              <div className="course-card" data-aos="fade-up">
              <Link to={`/certifiering/${course.slug}/${course.certs[0].slug}/${course.certs[0].id}/${course.id}`}>
<img
                    src={course.image}
                    alt={course.courseName}
                    className="mb-3 w-80"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Link>
                <p className="text-white mb-1">
                  <strong>Kategori:</strong>{" "}
                  <span className="badge bg-primary mb-2">
                    {course.courseName}
                  </span>
                </p>
                <h3 className="text-white">
                {course.certs[0].name}
                </h3>
                <p className="text-white">{course.certs[0].description ? t(translationKeys[course.certs[0].name]) : course.certs[0].description}</p>
              </div>
            </Col>
          ))}
        </Row>
      )}
        </Container>
      </section>

      <section className="mainpageSectionthree">
        <Row>
          <Col md={12}>
            <div className="position-relative">
        <img src={thirdImg} className="mainpageImgthree" alt="Modern office environment with people collaborating" />
        <div className="infobox position-absolute top-50 start-50 translate-middle text-white text-center bg-dark bg-opacity-50 p-5 rounded-3" data-aos="slide-up">
          <h3>{t('sectionThreeHeadline')}</h3>
          <p className="infoClasses">{t('sectionThreeSubtext')}</p>

          <p className="infoClasses mt-3">{t('home_info_teaser')}</p>
          
          <p className='scroll-indicator'>⬇️</p>       

          <Link to="/info" className="mt-2 btn btn-outline-light infoClasses" aria-label="Learn how Certiport certifications work">
          {t('home_info_link_text')}
        </Link>
        </div>
        </div>

          </Col>
        </Row>
      </section>
    </div>
  );
}

export default App;

