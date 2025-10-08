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
  const [errorMessage, setErrorMessage] = useState(null);

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
    } catch (error) {
      const err = error.response?.data;

      if (err?.field && err?.message) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Ett fel uppstod. Försök igen.");
      }
    }
  };

  return (
    <section className="resetPasswordSection rounded-3 shadow-sm">
       <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">{t('resetPassword')}</h2>
        <label htmlFor="newPassword" className="form-label text-white">
          {t('newPassword')}
        </label>
        <input
          id="newPassword"
          type="password"
          placeholder={t('passwordRequirements')}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3 form-control"
          required
        />
        <label htmlFor="confirmPassword" className="form-label text-white mt-3">
          {t('confirmNewPassword')}
        </label>
        <input
        id="confirmPassword"
        type="password"
        className="form-control"
        placeholder={t('confirmPasswordPlaceholder')}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
         />

        <button type="submit" className="btn btn-primary w-100 text-white py-2 mt-3 rounded">
          {t('saveNewPassword')}
        </button>

 {errorMessage && (
          <p role="alert" aria-live="assertive" className="mt-4 text-sm text-danger">
            {errorMessage}
          </p>
        )}
        {message && (
          <p role="alert" aria-live="assertive" className="mt-4 text-sm text-success">
            {message}
          </p>
        )}
              <Link to="/login" className="text-decoration-none mt-3 text-center text-white text-shadow-lg">{t('backToLogin')}</Link>

      </form>
     
    </section>
  );
}
