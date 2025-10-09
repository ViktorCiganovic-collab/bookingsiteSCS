import { useState } from "react";
import axios from "axios";
import './styling/ForgotPasswordPage.css';  
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {Spinner} from 'react-bootstrap';



export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail('');
    setMessage('');
    setLoading(true);

    try {
      await axios.post("http://localhost:5011/api/account/forgot_password", { email });
      setMessage(t('emailSent'));
    } catch (err) {
      setMessage(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forgotpasswordSection rounded-3 shadow-sm">
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
