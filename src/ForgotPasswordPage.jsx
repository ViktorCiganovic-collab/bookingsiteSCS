import { useState } from "react";
import axios from "axios";
import './styling/ForgotPasswordPage.css';  
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
    const { t } = useTranslation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5011/api/account/forgot_password", { email });
      setMessage(t('emailSent'));
    } catch (err) {
      setMessage(t('error'));
    }
  };

  return (
    <section className="forgotpasswordSection rounded-3 shadow-sm">
       <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">{t('forgotPassword')}</h2>
        <input
          type="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="btn btn-primary w-100 text-white py-2 rounded">
          {t('sendResetLink')}
        </button>
         {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}     
      <Link to="/login" className="text-decoration-none mt-3 text-center text-white text-shadow-lg">{t('backToLogin')}</Link>
      </form>
     
    </section>
  );
}
