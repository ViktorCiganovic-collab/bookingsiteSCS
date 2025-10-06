import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styling/About.css';
import backgroundVideoAbout from './assets/mainpageSectionthree.jpg';
import aiImage from './assets/ai_lexicon.jpg';
import datacenter from './assets/datacenter.jpg';
import distansochdigitalisering from './assets/distans-och-digitalisering.jpg';
import security from './assets/security.jpg';
import { useTranslation } from 'react-i18next'; 
import test_center from './assets/annie-spratt-sggw4-qDD54-unsplash.jpg';
import bildkontor from './assets/affarsutbildning2.jpg';
import yh from './assets/arbetsmarknadsutbildning.jpg';
import generellUtb from './assets/generell-utbildning.jpg'

const About = () => {
  const { t } = useTranslation(); // translation hook

  return (
    <>
      {/* SEKTION 1 – Bakgrundsvideo och intro */}
      <section className='aboutSectionOne'>
        <video
          className="backgroundVideo"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={backgroundVideoAbout} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="overlayContent">
          <h1 data-aos="fade-down-right" data-aos-duration="1000">{t('about')}</h1>
          <p data-aos="fade-up" data-aos-duration="1000">{t('about_tagline')}</p>
        </div>
      </section>

      {/* SEKTION 2 – Vilka vi är */}
      <section className="aboutSectionTwo py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className='text-center' data-aos="flip-right" data-aos-duration="1000">
              <h2>{t('who_we_are')}</h2>
              <p>{t('about_team_description')}</p>
            </Col>
            <Col md={6} data-aos="zoom-in" data-aos-duration="1000">
              <img
                src={aiImage}
                alt="Team"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

{/* SEKTION 3 – Vad vi gör */}
<section className="aboutSectionTwo d-flex justify-content-center">
  <Container>
    <h2 className="text-center mb-4">{t('what_we_do')}</h2>
    <Row className="text-center">
      <Col md={6} data-aos="flip-left" data-aos-duration="1000">
        <div className="feature-list">
          <img style={{maxWidth: "100%", borderRadius: "8px"}} src={yh}></img>
          <div className="feature-item">{t('booking_certifications')}</div>
          <div className="feature-item">{t('cert_info')}</div>
          <div className="feature-item">{t('reminders_and_support')}</div>
          <div className="feature-item">{t('flexible_exam_options')}</div>
        </div>
      </Col>
      <Col md={6} data-aos="zoom-in-up" data-aos-duration="1000">
        <div className="feature-list">
          <img style={{maxWidth: "100%", borderRadius: "8px"}} src={generellUtb}></img>
          <div className="feature-item">{t('remote_and_on_site')}</div>
          <div className="feature-item">{t('integration_partners')}</div>
          <div className="feature-item">{t('certification_tracking')}</div>
        </div>
      </Col>
    </Row>
  </Container>
</section>


      {/* SEKTION 4 – Varför välja oss */}
      <section className="aboutSectionTwo py-5">
        <Container>
          <h2 className="text-center mb-4">{t('why_choose_us')}</h2>
          <Row className="text-center">
            <Col md={4}>
              <h5 data-aos="zoom-in" data-aos-duration="1000">{t('easy_booking')}</h5>
              <p>{t('easy_booking_desc')}</p>
              <img data-aos="fade-right" data-aos-duration="1000" style={{maxWidth: "100%", borderRadius: "8px"}} src={bildkontor}></img>
            </Col>
            <Col md={4}>
              <h5 data-aos="zoom-in" data-aos-duration="1000">{t('secure_data')}</h5>
              <p>{t('secure_data_desc')}</p>
              <img data-aos="zoom-in" data-aos-duration="1000" style={{maxWidth: "100%", borderRadius: "8px"}} src={security}></img>
            </Col>
            <Col md={4}>
              <h5 data-aos="zoom-in" data-aos-duration="1000">{t('expert_support')}</h5>
              <p>{t('expert_support_desc')}</p>
              <img data-aos="fade-left" data-aos-duration="1000" style={{maxWidth: "100%", borderRadius: "8px"}} src={distansochdigitalisering}></img>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SEKTION 5 – Kontakt */}
      <section className="aboutSectionTwo py-5 text-center">
        <Container data-aos="zoom-in" data-aos-duration="1000">
          <h2>{t('contact_us')}</h2>
          <p>{t('reach_out')}</p>
          <p>📧 kontakt@dinbokningssite.se</p>
          <p>📍 Malmö | Landskrona | Online</p>
        </Container>
      </section>
    </>
  );
};

export default About;
