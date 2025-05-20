import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // i18n hook
import './styling/login.css';

function Login() {
  const { t } = useTranslation(); // translation hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Assuming you have a login API endpoint
      const response = await fetch('http://localhost:5173/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store the token and role in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role); // Assuming 'role' is part of the response

        // Redirect based on the role (you can adjust this to navigate in React Router)
        if (data.role === 'admin') {
          window.location.href = '/admin'; // Admin route
        } else {
          window.location.href = '/user'; // Regular user route
        }
      } else {
        setError(data.message || t('loginFailed'));
      }
    } catch (error) {
      setError(t('error'));
    }
  };

  return (
    <div className='loginPage'>
      <section className='loginSectionOne'>
        <Container>
          <Row className='d-flex justify-content-center align-items-center mb-5 width-100'>
            <Col md={6}>
              <h2 className="text-center my-5 mb-4">{t('login')}</h2>
              <Form className='my-5' onSubmit={handleLogin}>
                {/* Email Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('email')}</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('enterEmail')}
                  />
                </Form.Group> 

                {/* Password Field */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('enterPassword')}
                  />
                </Form.Group>             

                {/* Error Message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Login Button */}
                <Button variant="primary" type="submit">
                  {t('login')}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>  
    </div>
  );
}

export default Login;
