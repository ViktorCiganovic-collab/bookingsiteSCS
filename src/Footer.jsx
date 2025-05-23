import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styling/Footer.css'; 
import { useTranslation } from 'react-i18next'; // i18n hook

function Footer() {

  const { t } = useTranslation(); // translation hook

  return (
    <footer className="bg-dark text-white mt-auto py-3">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} SCS</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="/privacy" className="text-white me-3">{t('privacy')}</a>
            <a href="/terms" className="text-white">{t('terms')}</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
