import React, { useContext, useState } from 'react';
import { Nav } from 'react-bootstrap';
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

  const [expanded, setExpanded] = useState({
    bookings: false,
    certificates: false,
    testtimes: false,    
    logout: false,
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const handleLogout = () => {
  setIsAuthenticated(false);
  setRole('');
  navigate('/login');
  console.log('You have logged out');
  }

  return (
    <div className="userDashboard" style={{ display: 'flex', height: '100vh'}}>
      <Nav className="flex-column sidepanel">
        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('bookings')}>
            🗂️ Mina bokningar
          </div>
                    {expanded.bookings && (
                      <>
                        <Nav.Link className="sidebar-link">
                          Visa bokningar
                        </Nav.Link>                      
                      </>
                    )}
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('certificates')}>
            🎓 Certifikat
          </div>
              {expanded.bookings && (
              <>
              <Nav.Link className="sidebar-link">
              Visa bokningar
              </Nav.Link>                      
              </>
              )}
        </div>

        <div className="sidebar-group">
                    <div className="sidebar-title" onClick={() => toggleSection('testtimes')}>
            ⏰ Testtillfällen
          </div>
        </div>

        <div className="sidebar-group">
                    <div className="sidebar-title" onClick={handleShow}>
            🚪 {t('logout')}
          </div>
        </div>

      </Nav>

      <main
        style={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          padding: '2rem',         
        }}
        className='userdashboard_mainpart'
      >
      <h2>{t('welcomeUserDashboard')}!</h2>      

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
      </main>
      
    </div>
  );
}

export default UserDashboard;
