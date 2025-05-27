import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './styling/login.css';  
import { useEffect, useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './services/AuthProvider';

function Login() {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { role, setRole, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);


  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post('http://localhost:5219/api/auth/login', {
      username,
      password
    });

    const token = response.data.accessToken;
    localStorage.setItem('token', token);

    let isAdmin = false;

    // Försök nå admin-endpointen
    try {
      const protectedResponse = await axios.get('http://localhost:5219/api/auth/admin-only', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (protectedResponse.status === 200) {
        isAdmin = true;
        setRole('Admin');
        setIsAuthenticated(true);
        console.log("Admin-access bekräftad:", protectedResponse.data);
        return navigate('/admin');  // Stoppa funktionen om admin
      }
    } catch (adminError) {
      console.warn("Inte admin eller förbjuden åtkomst.", adminError);
    }

    // Om vi har en token men inte admin, gå till user
    if (token && !isAdmin) {
      setRole('User');
      setIsAuthenticated(true);
      navigate('/user');
    }

  } catch (error) {
    console.error("Fel vid login:", error);
    setError('Fel användarnamn, lösenord eller obehörig.');
  }
};

useEffect(() => {
  if (role) {
    console.log(`${role} has logged in`);
  }
}, [role]);

useEffect(() => {
  if (isAuthenticated) {
    console.log('User is authenticated');
  }
})

 return (
    <div className="loginPage">
      <section className="loginSectionOne">
        <Container>
          <Row className="d-flex justify-content-center align-items-center mb-5 width-100">
            <Col md={6}>
              <h2 className="text-center my-5 mb-4">Login</h2>
              <Form className="my-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className='text-white'>Username</Form.Label>
              <Form.Control 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter username" 
              />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label className='text-white'>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
            />
          </Form.Group>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Button variant="primary" type="submit">
                  Log In
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
