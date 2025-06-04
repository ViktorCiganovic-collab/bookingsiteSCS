import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import './styling/signup.css';

function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);    
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://3.90.225.16:5011/api/account/register/', {
        username,
        password
      }); 
      setRegistered(true);
      setError(null);
      console.log(res.data.username + " är registererad som ny användare. Hashed password är " + res.data.password);

    } catch (error) {
      // Hantera eventuella fel - servern hanterar inte förfrågan
      console.error("Error during registration:", error);
      setError("Registreringen misslyckades. Användarnamnet kan redan vara taget.");

    }
  
  };

  return (
    <div className="signupPage">
      <section className="signupSectionOne">
        <Container>
          <Row className="d-flex justify-content-center align-items-center width-100">
            <Col md={6}>
              <h2 className="text-center my-5 mb-4">{t('register')}</h2>

              <Form className="my-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>{t('firstName')} - Username</Form.Label>
                  <Form.Control
                    type="email"
                    name="firstName"              
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}      
                    placeholder={t('enterFirstName')}
                    required
                  />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}                   
                    placeholder={t('enterPassword')}
                    required
                  />
                </Form.Group>        

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Button variant="primary" type="submit">
                  {t('register')}
                </Button>

                
                 {registered && (
                <div>            
                <p style={{color: 'green'}}>Ditt medlemskap har registrerats</p>
                <p style={{color: 'white'}}>Vill du logga in?</p> 
                <Link to="/login" className="btn btn-primary">Login</Link>       
                </div>)}
              </Form>
            </Col>
          </Row>    
        </Container>
     
      </section>
    </div>
  );
}

export default Signup;