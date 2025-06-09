import React, { useContext, useState } from 'react';
import './styling/UserDashboard.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from './services/AuthProvider';
import { useTranslation } from 'react-i18next'; // Importera useTranslation


function UserDashboard() {

const { role, setRole, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
const [show, setShow] = useState(false);
const navigate = useNavigate();
const { t } = useTranslation();


const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const handleLogout = () => {
  setIsAuthenticated(false);
  setRole('');
  navigate('/login');
  console.log('You have logged out');
  }

  return (
    <div className="userDashboard">
      <h2>{t('welcomeUserDashboard')}!</h2>
      <button className='btn btn-primary' onClick={handleShow}>{t('logout')}</button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('questionlogout')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('secondquerylogoutusers')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserDashboard;
