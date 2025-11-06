import './styling/App.css';
import './styling/Main.css';
import Itcourses from './services/ITcertificates'; 
import { Container, Row, Col } from 'react-bootstrap';
import thirdImg from './media/testworkingenvironment.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { useMediaQuery } from 'react-responsive';


function App() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  
  // Anropa Itcourses-funktionen för att få kurserna som en array
  const courses = Itcourses();  // Här anropar vi Itcourses som en funktion
  const threeCourses = courses.slice(3, 6); 

  return (
    <div className='mainPage'>
      <div className="video-container">
        <video autoPlay muted loop playsInline className="bg-video">
          
          {t('video_not_supported')}
        </video>
        <div className="video-overlay">
          <div className="hero-content" data-aos="zoom-in" data-aos-duration="1000">
          <h1>{t('welcome_message')} Scandinavian Certification Services</h1>
          <p>{t('subheadline')}</p>      
          <Link to="/cert"><button className='cta-btn'>Boka nu</button></Link>
          </div>   
        </div>        
      </div>

      <section className="mainpageSectiontwo py-5">
        <Container>
          <h2 data-aos="zoom-in" className="text-center mb-4">{t('popular_certifications')}</h2>
            {isMobile ? (
        // 📱 MOBILVY: visa slider
        <Carousel slide={false}>
          {threeCourses.map((course, index) => (
          <Carousel.Item key={index}>
  <Link to={`/cert/...`}>
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
          {threeCourses.map((course, index) => (
            <Col key={index} md={4}>
              <div className="course-card" data-aos="fade-up">
                <Link
                  to={`/cert/${encodeURIComponent(course.certs[0].name)}/${encodeURIComponent(course.certs[0].description)}/1500/${course.categoryId}/${course.certs[0].certId}`}
                >
                  <img
                    src={course.image}
                    alt={course.courseName}
                    className="mb-3 w-100"
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
                <h3 className="text-white">{course.certs[0].name}</h3>
                <p className="text-white">{course.certs[0].description}</p>
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
  <img src={thirdImg} className="mainpageImgthree" alt="illustration" />
  <div className="position-absolute top-50 start-50 translate-middle text-white text-center bg-dark bg-opacity-50 p-3 rounded" data-aos="zoom-in" data-aos-duration="1500">
    <h3>{t('sectionThreeHeadline')}</h3>
    <p>{t('sectionThreeSubtext')}</p>
  </div>
</div>

          </Col>
        </Row>
      </section>
    </div>
  );
}

export default App;

