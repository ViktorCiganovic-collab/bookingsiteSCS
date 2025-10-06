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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');  
  const [address, setAddress] = useState('');
  const [registered, setRegistered] = useState(false);    
  const [emailError, setEmailError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setError(null);
    setRegistered(false);


    try {
      const res = await axios.post('http://localhost:5011/api/account/register/', {
        email,
        password,
        firstName,
        lastName,        
        address
      }); 
      setRegistered(true);
      setError(null);
      console.log(res.data.username + " är registererad som ny användare. Hashed password är " + res.data.password);

    } catch (error) {
    console.error("Error during registration:", error);

    const backendMessage = error.response?.data?.message?.toLowerCase() || '';

    if (backendMessage.includes('användarnamnet') || backendMessage.includes('email')) {
      setEmailError('Registreringen misslyckades. Användarnamnet kan redan vara taget.');
    } else {
      setError(t('registration_failed')); // Generellt felmeddelande
    }
  }
  
  };

  return (
    <div className="signupPage" style={{ paddingTop: '60px' }}>
      <section className="signupSectionOne" aria-labelledby="register-heading">
        <Container fluid="md" className='px-3'>
          <Row className="d-flex justify-content-center align-items-center width-100">
            <Col md={6} sm={10} xs={12}>
              <h2 className="text-center my-5 mb-4" data-aos="zoom-out-right" id="register-heading">{t('register')}</h2>

              <Form onSubmit={handleSubmit} data-aos="zoom-in-left">

                <Form.Group className='mb-3' controlId="formFirstName">
                  <Form.Label>{t('firstName')}</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t('your_firstname')}
                    required
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formLastName'>
                  <Form.Label>{t('lastName')}</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                     placeholder={t('your_lastname_placeholder')}
                    required
                  />
                </Form.Group>               

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>{t('address')}</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t('address_placeholder')}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>{t('email_username')}</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('enterEmail')}
                    required
                    aria-describedby={emailError ? "emailError" : undefined}
                  />
                    {emailError && (
                <Form.Text id="emailError" style={{ color: 'red' }} role="alert" aria-live="assertive">
                  {emailError}
                </Form.Text>
                )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('enterPassword')}
                    required
                  />
                 
                </Form.Group>

                {error && <p id="errorMessage" style={{ color: 'red' }} role="alert" aria-live="assertive">{error}</p>}

                <Button variant="primary" type="submit">
                  {t('register')}
                </Button>

              </Form>

              {registered && (
                <div className="mt-3" role="alert" aria-live="polite">
                    <p style={{ color: 'green' }}>{t('membership_registered')}</p>
                    <p style={{ color: 'white' }}>{t('want_to_login')}</p>
                  <Link to="/login" className="btn btn-primary">{t('login_button')}</Link>
                </div>
              )}

            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Signup;
