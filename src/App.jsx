import './styling/App.css';
import backgroundVideo from './assets/background_landingpage_.mp4';
import './styling/Main.css';
import Itcourses from './services/ITcertificates'; 
import { Container, Row, Col } from 'react-bootstrap';
import thirdImg from './assets/testworkingenvironment.png';
import { useTranslation } from 'react-i18next';

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
          <h1>{t('welcome_message')} Scandinavian Certificate Services</h1>
          <p>{t('subheadline')}</p>          
        </div>        
      </div>

      <section className="mainpageSectiontwo py-5">
        <Container>
          <h2 className="text-center mb-4">{t('popular_certifications')}</h2>
          <Row>
            {threeCourses.map((course, index) => (
              <Col key={index} md={4}>
                <div className="course-card">
                  <img
                    src={course.image}
                    alt={course.courseName}
                    className="mb-3"
                    style={{                      
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                  <h3 className='text-white'>{course.certs[0]}</h3>
                  <p className='text-white'><strong>{t('category')}:</strong> {course.courseName} </p>
                  <p className='text-white'>{course.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="mainpageSectionthree">
        <Row>
          <Col md={12}>
            <img src={thirdImg} className="mainpageImgthree" alt="illustration" />
          </Col>
        </Row>
      </section>
    </>
  );
}

export default App;

