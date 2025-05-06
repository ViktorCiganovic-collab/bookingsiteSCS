import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styling/Footer.css'; // Optional for custom styling

function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto py-3">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} SCS</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="/privacy" className="text-white me-3">Privacy</a>
            <a href="/terms" className="text-white">Terms</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
