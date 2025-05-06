import React from 'react';
import { Link } from 'react-router-dom'; // Importera Link från react-router-dom
import './styling/Menu.css'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavComponent() {
  return (
    <Navbar collapseOnSelect expand="lg" className="menu navbar-dark">
      <Container>
        {/* Använd Link för att länka till hemsidan */}
        <Navbar.Brand as={Link} to="/">SCS</Navbar.Brand> {/* Länk till start-sidan */}
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="text-white" />
        <Navbar.Collapse id="responsive-navbar-nav" className="menu text-white">
          <Nav className="me-auto">
            {/* Länk till Certifieringar */}
            <Nav.Link as={Link} to="/cert">Certifications</Nav.Link> 

            {/* Länk till Pricing */}
            <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link> 
            
            {/* Dropdown-länkar med Link istället för vanliga href */}
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {/* Använd Link istället för vanliga Nav.Links */}
            <Nav.Link as={Link} to="/more-deets">More deets</Nav.Link>
            <Nav.Link as={Link} to="/memes">Dank memes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;
