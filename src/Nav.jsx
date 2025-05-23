import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import './styling/Menu.css'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next'; // Importera useTranslation
import LanguageSwitcher from './components/LanguageSwitcher'; // Importera LanguageSwitcher här
import { AuthContext } from './components/AuthProvider';

function NavComponent() {
  const { t } = useTranslation(); // Använd useTranslation-hooken för att hämta översättningar
  const { role, isAuthenticated } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" className="menu navbar-dark">
      <Container>
        
        <Navbar.Brand as={Link} to="/">SCS</Navbar.Brand> {/* Länk till start-sidan */}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="text-white" />
        <Navbar.Collapse id="responsive-navbar-nav" className="menu text-white">
          <Nav className="me-auto">
            {/* Länk till Certifieringar med översättning */}
            <Nav.Link as={Link} to="/cert">{t('certifications')}</Nav.Link> 

            
            <Nav.Link as={Link} to="/about">{t('about')}</Nav.Link>
          </Nav>
          <Nav>
            
            <Nav.Link as={Link} to="/signup">{t('sign_up')}</Nav.Link>

            {isAuthenticated && role === 'Admin' &&
            ( 
            <Nav.Link as={Link} to="/admin">{t('admin_dashboard')}</Nav.Link>
            )}  

            {isAuthenticated && role === 'User' &&
            ( 
            <Nav.Link as={Link} to="/user">{t('myPages')}</Nav.Link>
            )}  

            {!isAuthenticated && ( 
            <Nav.Link as={Link} to="/login">{t('login')}</Nav.Link>
            )}           

            
            <LanguageSwitcher />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;

