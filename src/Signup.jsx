import {Button, Spinner} from 'react-bootstrap';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import './styling/signup.css';
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');  
  const [address, setAddress] = useState('');
  const [registered, setRegistered] = useState(false);    
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRegistered(false);
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);
    setLoading(true);

        if (!captchaToken) {
      alert("Verifiera att du inte är en robot!");
      return;
    }

    console.log("Captcha token before submit:", captchaToken);       

    try {
      const res = await axios.post('http://localhost:5011/api/account/register/', {
        email,
        password,
        firstName,
        lastName,        
        address,
        captchaToken
      }); 
      setRegistered(true);
      setError(null);
      console.log(res.data.username + " är registererad som ny användare. Hashed password är " + res.data.password);

    } catch (error) {
  const err = error.response?.data;
  console.log("Raw error:", err);

  // Handle ASP.NET Core default validation format
  if (err?.errors && typeof err.errors === "object") {
    Object.entries(err.errors).forEach(([field, messages]) => {
      const message = Array.isArray(messages) ? messages[0] : messages;
      if (field.toLowerCase() === "email") setEmailError(message);
      else if (field.toLowerCase() === "password") setPasswordError(message);
      else setGeneralError(message);
    });
  }
  // Handle custom single error format
  else if (err?.field && err?.message) {
    if (err.field === "email") setEmailError(err.message);
    else if (err.field === "password") setPasswordError(err.message);
    else if (err.field === "password_complexity") setPasswordError(err.message);
    else setGeneralError(err.message);
  }
  // Fallback
  else {
    setGeneralError("Registreringen misslyckades. Försök igen.");
  }
} finally {
  setLoading(false);
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
                  />                    
                </Form.Group>

                <Form.Group className="mb-3 position-relative" controlId="formPassword">
                  <Form.Label className='text-white'>{t('password')}</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('enterPassword')}
                    required
                  />
                   <div
                        className="position-absolute"
                        style={{ top: '70%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: 'black' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                 
                </Form.Group>

                <div className="recaptcha-wrapper w-100 mb-2">
                <ReCAPTCHA
                  sitekey="6LdwVu0rAAAAAPqnYSZIX5tt6fQpzW1x1oEFLS2U"
                  onChange={(token) => setCaptchaToken(token)}
                  className='mb-3 g-recaptcha'
                />
                </div>

                {emailError && <p id="errorMessage" style={{ color: 'red' }} role="alert" aria-live="assertive">{emailError}</p>}
                {passwordError && <p id="errorMessage" style={{ color: 'red' }} role="alert" aria-live="assertive">{passwordError}</p>}
                {generalError && <p id="errorMessage" style={{ color: 'red' }} role="alert" aria-live="assertive">{generalError}</p>}

                <Button variant="primary" type="submit">
                  {loading ? (
                    <>
                    <Spinner
                    as="span"
                    animation='border'
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    {' '}Loading...
                    </>
                  ) : ( t('register'))}
                </Button>

              </Form>

              {registered && (
                <div className="mt-3">
                    <p  className="responseMsg" style={{ color: 'green' }}>{t('membership_registered')}</p>
                    <p className="responseMsg" style={{ color: 'white' }}>{t('want_to_login')}</p>
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
