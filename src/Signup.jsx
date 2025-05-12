import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // i18n hook
import './styling/signup.css';

function Signup() {
  const { t } = useTranslation(); // translation hook

  return (
    <div className='signupPage'>
      <section className='signupSectionOne'>
        <Container>
          <Row className='d-flex justify-content-center align-items-center width-100'>
            <Col md={6}>

              <h2 className="text-center my-5 mb-4">{t('register')}</h2>

              <Form className='my-5'>
                {/* Förnamn */}
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>{t('firstName')}</Form.Label>
                  <Form.Control type="text" placeholder={t('enterFirstName')} />
                </Form.Group>

                {/* Efternamn */}
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>{t('lastName')}</Form.Label>
                  <Form.Control type="text" placeholder={t('enterLastName')} />
                </Form.Group>

                {/* E-post */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('email')}</Form.Label>
                  <Form.Control type="email" placeholder={t('enterEmail')} />
                  <Form.Text className="text-white">
                    {t('privacyTerms')}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control type="password" placeholder={t('enterPassword')} />
                  <Form.Text className="text-white">
                    {t('privacyTerms')}
                  </Form.Text>
                </Form.Group>  

                {/* Telefonnummer */}
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>{t('phoneNumber')}</Form.Label>
                  <Form.Control type="text" placeholder={t('enterPhoneNumber')} />
                </Form.Group>

                {/* Adress */}
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>{t('address')}</Form.Label>
                  <Form.Control type="text" placeholder={t('enterAddress')} />
                </Form.Group>       
                  {/* Checkbox för villkor */}
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label={t('checkbox')} />
                </Form.Group>  

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
