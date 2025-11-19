import {Button, Spinner} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './styling/login.css';  
import { useEffect, useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './services/AuthProvider';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Login() {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { role, setRole, isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
  event.preventDefault();  
  setLoading(true);

  try {
    const response = await axios.post('https://certbe-backend.onrender.com/api/account/login', {
      email: username,
      password
    }
  );

    const { token, user } = response.data;
    localStorage.setItem('token', token);  
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user);

    // const parsedToken = parseJwt(token);
    // let isAdmin = parsedToken.role == "Admin";
          
    // Avkoda token med jwtDecode
      const parsedToken = jwtDecode(token);
      console.log(parsedToken)
      // Exempel: kolla rollen
      let isAdmin = (parsedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Admin");
      console.log(isAdmin)

      if (isAdmin) {
        setRole('Admin');
        setIsAuthenticated(true);
        console.log("Admin-access bekräftad:");
        navigate('/admin');  

        setUsername('');
        setPassword('');
      }

    // Om vi har en token men inte admin, gå till user
    if (token && !isAdmin) {
      setRole('User');
      setIsAuthenticated(true);
      navigate('/user');

      setUsername('');
      setPassword('');
    }

  } catch (error) {
    console.error("Fel vid login:", error);
    if (error.response && error.response.data) {
  const { error: apiError, message } = error.response.data;

  if (apiError === "account_locked") {
    setError(t('error_account_locked') || message);
  } else if (apiError === "invalid_credentials") {
    setError(t('error_invalid_login') || message);
  } else {
    setError(t('error_unknown') || "Ett okänt fel uppstod.");
  }
} else {
  setError(t('error_network') || "Kunde inte kontakta servern.");
}
  } finally {
    setLoading(false);
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
    <div className="loginPage" style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <section className="loginSectionOne" aria-labelledby="login-heading">
        <Container>
          <Row className="d-flex justify-content-center align-items-center mb-5 width-100">
            <Col md={6}>
              <h2 id="login-heading" className="text-center my-5 mb-4 text-white">{t('login_title')}</h2>
              <Form className="my-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className='text-white'>{t('username_label')}</Form.Label>
              <Form.Control 
                type="email" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder={t('username_placeholder')}
                aria-describedby={error ? 'loginError' : undefined}
              />
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
            <Form.Label className='text-white'>{t('password_label')}</Form.Label>
            <Form.Control 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder={t('password_placeholder')} 
              aria-describedby={error ? 'loginError' : undefined}
            />
              <div
                        className="position-absolute"
                        style={{ top: '70%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: 'black' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
          </Form.Group>

                {error && (
                <p id="loginError" style={{ color: 'red' }} role="alert" aria-live="assertive">
                  {error}
                </p>
              )}

                <Button variant="primary" type="submit">
                                    {loading ? (<>
                                    <Spinner
                                    as="span"
                                    animation='border'
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                    {' '}Loading...
                                    </>) : t('login_button')
                                    }    
                </Button>
                <Link to="/forgot_password" className='text-decoration-none forgot-password text-white'>Glömt lösenord?</Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );

}

export default Login;
