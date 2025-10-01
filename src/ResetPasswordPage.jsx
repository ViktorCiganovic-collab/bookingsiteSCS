import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './styling/ResetPasswordPage.css';  
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage(t('passwordsDontMatch'));
      return;
    }

    try {
      const res = await axios.post('http://localhost:5011/api/account/reset_password', {
        email,
        token,
        newPassword
      });

      if (res.status === 200) {
        setMessage(t('passwordUpdated'));
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setMessage(t('error'));
    }
  };

  return (
    <section className="resetPasswordSection rounded-3 shadow-sm">
       <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">{t('resetPassword')}</h2>
        <input
          type="password"
          placeholder={t('newPassword')}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3 form-control"
          required
        />

        <input
        type="password"
        className="form-control"
        placeholder={t('confirmNewPassword')}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
         />

        <button type="submit" className="btn btn-primary w-100 text-white py-2 mt-3 rounded">
          {t('saveNewPassword')}
        </button>

         {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}     
      <Link to="/login" className="text-decoration-none mt-3 text-center text-white text-shadow-lg">{t('backToLogin')}</Link>

      </form>
     
    </section>
  );
}
