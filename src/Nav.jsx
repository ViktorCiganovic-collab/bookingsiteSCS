import React from 'react';
import { Link } from 'react-router-dom'; // Importera Link från react-router-dom
import './styling/Menu.css'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next'; // Importera useTranslation
import LanguageSwitcher from './components/LanguageSwitcher'; // Importera LanguageSwitcher här

function NavComponent() {
  const { t } = useTranslation(); // Använd useTranslation-hooken för att hämta översättningar

  return (
    <Navbar collapseOnSelect expand="lg" className="menu navbar-dark">
      <Container>
        {/* Använd Link för att länka till hemsidan */}
        <Navbar.Brand as={Link} to="/">SCS</Navbar.Brand> {/* Länk till start-sidan */}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="text-white" />
        <Navbar.Collapse id="responsive-navbar-nav" className="menu text-white">
          <Nav className="me-auto">
            {/* Länk till Certifieringar med översättning */}
            <Nav.Link as={Link} to="/cert">{t('certifications')}</Nav.Link> 

            {/* Länk till Pricing med översättning */}
            <Nav.Link as={Link} to="/pricing">{t('pricing')}</Nav.Link>
          </Nav>
          <Nav>
            {/* Använd Link istället för vanliga Nav.Links */}
            <Nav.Link as={Link} to="/signup">{t('sign_up')}</Nav.Link>
            <Nav.Link as={Link} to="/login">{t('login')}</Nav.Link>

            {/* Lägg till språkväxlare här */}
            <LanguageSwitcher />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;

