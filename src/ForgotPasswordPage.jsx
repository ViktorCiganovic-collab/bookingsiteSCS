import { useState } from "react";
import axios from "axios";
import './styling/ForgotPasswordPage.css';  
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {Spinner} from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "react-helmet-async";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState("");  
  const { t } = useTranslation();


  const handleSubmit = async (e) => {
    e.preventDefault();    
    setMessage('');
    setLoading(true);

         if (!captchaToken) {
      setMessage(t("pleaseVerifyCaptcha") || "Vänligen verifiera att du inte är en robot.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://certbe-backend.onrender.com/api/account/forgot_password", { email, captchaToken });
      setMessage(t('emailSent'));
      setEmail('');
      setCaptchaToken(""); 
    } catch (err) {
      console.error("Fel vid återställningsbegäran:", err);
      setMessage(t('error'));
      setCaptchaToken("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forgotpasswordSection rounded-3 shadow-sm">
      <Helmet>
      <title>Glömt lösenord | SCS</title>
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href="https://www.scservices.se/forgot_password" />
    </Helmet>

       <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">{t('forgotPassword')}</h2>
        <label htmlFor="forgotEmail" className="form-label text-white">{t('email')}</label>
        <input
          id="forgotEmail"
          type="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

            <div className="recaptcha-wrapper w-100 mb-2">
                <ReCAPTCHA
                  sitekey="6LdwVu0rAAAAAPqnYSZIX5tt6fQpzW1x1oEFLS2U"
                  onChange={(token) => setCaptchaToken(token)}
                  className='mb-3 g-recaptcha'
                />
                </div>
        <button type="submit" className="btn btn-primary w-100 text-white py-2 rounded">
                                             {loading ? (<>
                                    <Spinner
                                    as="span"
                                    animation='border'
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                    {' '}Loading...
                                    </>) : t('sendResetLink')
                                    }  
        </button>
         {message && <p className="mt-4 text-sm text-gray-600" role="alert" aria-live="polite">{message}</p>}     
      <Link to="/login" className="text-decoration-none mt-3 text-center text-white text-shadow-lg">{t('backToLogin')}</Link>
      </form>
     
    </section>
  );
}
