import './styling/App.css';
import backgroundVideo from './assets/background_second.mp4';
import './styling/Main.css';
import Itcourses from './components/ITcertificates'; // Importera funktionen som returnerar kurser
import { Container, Row, Col } from 'react-bootstrap';
import thirdImg from './assets/websiteImg.jpg';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  
  // Anropa Itcourses-funktionen för att få kurserna som en array
  const courses = Itcourses();  // Här anropar vi Itcourses som en funktion
  const threeCourses = courses.slice(0, 3);  // Vi kan nu använda slice på den returnerade arrayen

  return (
    <>
      <div className="video-container">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src={backgroundVideo} type="video/mp4" />
          {t('video_not_supported')}
        </video>
        <div className="video-overlay">
          <h1>{t('welcome_message')}</h1>
        </div>
      </div>

      <section className="mainpageSectiontwo py-5">
        <Container>
          <h2 className="text-center mb-4">{t('popular_certifications')}</h2>
          <Row>
            {threeCourses.map((course, index) => (
              <Col key={index} md={4}>
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
                  <h3>{course.courseName}</h3>
                  <p><strong>{t('category')}:</strong> {course.category}</p>
                  <p>{course.description}</p>
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

