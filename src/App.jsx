import './styling/App.css';
import backgroundVideo from './assets/background_landingpage_.mp4';
import './styling/Main.css';
import Itcourses from './services/ITcertificates'; 
import { Container, Row, Col } from 'react-bootstrap';
import thirdImg from './assets/testworkingenvironment.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function App() {
  const { t } = useTranslation();
  
  // Anropa Itcourses-funktionen för att få kurserna som en array
  const courses = Itcourses();  // Här anropar vi Itcourses som en funktion
  const threeCourses = courses.slice(3, 6); 

  return (
    <>
      <div className="video-container">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src={backgroundVideo} type="video/mp4" />
          {t('video_not_supported')}
        </video>
        <div className="video-overlay">
          <h1 data-aos="zoom-in" data-aos-duration="1000">{t('welcome_message')} Scandinavian Certification Services</h1>
          <p data-aos="fade-up">{t('subheadline')}</p>          
        </div>        
      </div>

      <section className="mainpageSectiontwo py-5">
        <Container>
          <h2 className="text-center mb-4">{t('popular_certifications')}</h2>
          <Row>
            {threeCourses.map((course, index) => (
              <Col key={index} md={4}>
                <div className="course-card" data-aos="slide-up">
                  <Link to={`/cert/${encodeURIComponent(course.certs[0].name)}/${encodeURIComponent(course.certs[0].description)}/1500/${course.categoryId}`}>

                  <img
                    src={course.image}
                    alt={course.courseName}
                    className="mb-3"
                    style={{                      
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />    
                  </Link>        
                 
                  <h3 className='text-white'>{course.certs[0].name}</h3>
                  <p className='text-white'><strong>{t('category')}:</strong> {course.courseName} </p>
                  <p className='text-white'>{course.certs[0].description}</p>
                </div>
              </Col>
            ))}
          </Row>
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
    </>
  );
}

export default App;

