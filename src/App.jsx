import './styling/App.css';
import backgroundVideo from './assets/background_second.mp4';
import './styling/Main.css';
import Itcourses from './components/ITcertificates';
import { Container, Row, Col } from 'react-bootstrap';
import thirdImg from './assets/websiteImg.jpg';

function App() {
  const threeCourses = Itcourses.slice(0, 3);

  return (
    <>
      <div className="video-container">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <h1>Welcome to Scandinavian Certificate Services</h1>
        </div>
      </div>

      <section className="mainpageSectiontwo py-5">
        <Container>
          <h2 className="text-center mb-4">Popular IT Certifications</h2>
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
                  <p><strong>Category:</strong> {course.category}</p>
                  <p>{course.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className='mainpageSectionthree'>
            <Row>
              <Col md={12}><img src={thirdImg} className='mainpageImgthree'></img></Col>
            </Row>
      </section>
    </>
  );
}

export default App;
