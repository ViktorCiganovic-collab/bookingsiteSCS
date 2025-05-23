import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styling/AdminDashboard.css';
import { useTranslation } from 'react-i18next'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './components/AuthProvider';

const AdminDashboard = () => {

    const { t } = useTranslation(); 
    const [isOpen, setIsOpen] = useState(null);
    const [show, setShow] = useState(false);
    const { role, setRole, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    navigate('/login');
    console.log('You have logged out');
  }

    const toggleBox = (boxName) => {
    setIsOpen(prev => (prev === boxName ? null : boxName));
  };



  return (
    <div className='adminDashboard'>
        <section className='adminSectionOne'>
            <h1>{t('admin_dashboard')}</h1>         
            <button className='btn btn-primary' onClick={handleShow}>{t('logout')}</button>    
        </section>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('questionlogout')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('secondquerylogout')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={handleLogout}>
               {t('logout')}
          </Button>
        </Modal.Footer>
        </Modal>

        <section className='adminSectionTwo'>

            <div className='box box1' onClick={() => toggleBox('box1')}>
                <h1>{t('bookings')}</h1>

                {isOpen === 'box1' && (
                    <div className={`box-content open`}>
                        <p>Content to be added soon</p>
                    </div>
                )}
            </div>            

            <div className='box box2' onClick={() => toggleBox('box2')}>
                <h1>{t('editCertificates')}</h1>

                    {isOpen === 'box2' && (
                    <div className={`box-content open`}>
                        <button className="btn btn-primary mx-5 my-2">Redigera certifikat</button>
                        <button className="btn btn-primary">Lägg till certifikat</button>
                    </div>
                )}
            </div>  

            <div className='box box3' onClick={() => toggleBox('box3')}>
                <h1>{t('edit_test_times')}</h1>

                    {isOpen === 'box3' && (
                    <div className={`box-content open`}>
                        <button className="btn btn-primary">Upddatera testtider</button>
                    </div>
                )}
            </div>  

            <div className='box box4' onClick={() => toggleBox('box4')}>
                <h1>{t('edit_remove_lang')}</h1>

                    {isOpen === 'box4' && (
                   <div className={`box-content open`}>
                        <p>-- {t('choose_lang')} --</p>
                        <button class="btn btn-primary">Sv</button>
                        <button class="btn btn-secondary">No</button>
                        <button class="btn btn-success">Da</button>
                        <button class="btn btn-danger">Fi</button>
                    </div>
                )}
            </div>  

        </section>              
            
    </div>
  )
}

export default AdminDashboard;