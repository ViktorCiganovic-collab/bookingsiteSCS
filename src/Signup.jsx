import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // i18n hook
import { useNavigate } from 'react-router-dom'; // For redirecting after success
import './styling/signup.css';

function Signup() {
  const { t } = useTranslation(); // translation hook
  const navigate = useNavigate(); // Hook for navigation after successful signup
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'user',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox for terms and conditions
  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Check if all fields are filled
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber ||
      !formData.address
    ) {
      setError(t('pleaseFillAllFields'));
      return;
    }

    // Check if terms and conditions are accepted
    if (!termsAccepted) {
      setError(t('pleaseAcceptTerms'));
      return;
    }

    try {
      const response = await fetch('http://localhost:5173/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(t('userRegistered')); // User successfully registered
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        // Handle backend errors, e.g., user already exists
        setError(data.message || t('registrationFailed'));
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError(t('error'));
    }
  };

  return (
    <div className='signupPage'>
      <section className='signupSectionOne'>
        <Container>
          <Row className='d-flex justify-content-center align-items-center width-100'>
            <Col md={6}>
              <h2 className="text-center my-5 mb-4">{t('register')}</h2>

              <Form className='my-5' onSubmit={handleSubmit}>
                {/* Förnamn */}
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>{t('firstName')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={t('enterFirstName')}
                  />
                </Form.Group>

                {/* Efternamn */}
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>{t('lastName')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={t('enterLastName')}
                  />
                </Form.Group>

                {/* E-post */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('email')}</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('enterEmail')}
                  />
                  <Form.Text className="text-white">
                    {t('privacyTerms')}
                  </Form.Text>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t('enterPassword')}
                  />
                  <Form.Text className="text-white">
                    {t('privacyTerms')}
                  </Form.Text>
                </Form.Group>

                {/* Telefonnummer */}
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>{t('phoneNumber')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder={t('enterPhoneNumber')}
                  />
                </Form.Group>

                {/* Adress */}
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>{t('address')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder={t('enterAddress')}
                  />
                </Form.Group>

                {/* Checkbox för villkor */}
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label={t('checkbox')}
                    checked={termsAccepted}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>

                {/* Error Message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Skapa konto knapp */}
                <Button variant="primary" type="submit">
                  {t('submit')}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Signup;
