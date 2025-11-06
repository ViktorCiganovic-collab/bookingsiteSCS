import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styling/Footer.css'; 
import { useTranslation } from 'react-i18next'; // i18n hook
import { Link } from 'react-router-dom';
import logo from "./media/logotyp_störreikon.png";


function Footer() {

  const { t } = useTranslation(); // translation hook

  return (
    <footer className="bg-dark text-white mt-auto py-3">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} Scandinavian Certification Services AB</p>
          </Col>
          <Col md={6} className="text-md-end">
             <Link to="/integritetspolicy" style={{textDecoration: 'none', color: '#fff'}}>{t('privacyPolicy')}</Link> &nbsp;|&nbsp; 
    <Link to="/booking-terms" style={{textDecoration: 'none', color: '#fff'}}>{t('bookingTerms')}</Link> &nbsp;|&nbsp; 
    <Link to="/accessibility" style={{textDecoration: 'none', color: '#fff'}}>{t('accessibilityStatement')}</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
