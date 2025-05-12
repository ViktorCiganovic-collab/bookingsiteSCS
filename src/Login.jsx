import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // i18n hook
import './styling/login.css';

function Login() {
  const { t } = useTranslation(); // translation hook

  return (
    <div className='loginPage'>
      <section className='loginSectionOne'>
        <Container>
          <Row className='d-flex justify-content-center align-items-center mb-5 width-100'>
            <Col md={6}>

              <h2 className="text-center my-5 mb-4">{t('login')}</h2>
              <Form className='my-5'>

                {/* E-post */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('email')}</Form.Label>
                  <Form.Control type="email" placeholder={t('enterEmail')} />
                  <Form.Text className="text-white">
                    {t('privacyTerms')}
                  </Form.Text>
                </Form.Group> 

                                {/* E-post */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control type="password" placeholder={t('enterPassword')} />
                  <Form.Text className="text-white">
                    {t('privacyTerms')}
                  </Form.Text>
                </Form.Group>             
              

                {/* Skapa konto knapp */}
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
