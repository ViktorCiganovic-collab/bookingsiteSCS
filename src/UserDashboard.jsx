import React, { useContext, useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import './styling/UserDashboard.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from './services/AuthProvider';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';


function UserDashboard() {
  const { role, setRole, isAuthenticated, setIsAuthenticated, token, email } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();  

  console.log(`Email extracted from the token: ${email}`);
  
  const [expanded, setExpanded] = useState({
    bookings: false,
    certificates: false,
    testtimes: false,    
    logout: false,
  });

  const [bookings, setBookings] = useState([]);
   const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [errorBookings, setErrorBookings] = useState(null);  

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
  };

  useEffect(() => {
    if (expanded.bookings && isAuthenticated) {
      setLoadingBookings(true);
      setErrorBookings(null);
      axios.get(`http://localhost:5011/api/booking/mybookings?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setBookings(res.data);
        setLoadingBookings(false);        
      })
      .catch(err => {
        setErrorBookings(t('error_could_not_fetch_bookings'));
        setLoadingBookings(false);
      });
    }
  }, [expanded.bookings, isAuthenticated, token]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);

  const formatTime = (date) =>
    new Intl.DateTimeFormat('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);

      // När användaren klickar på 🗑️-ikonen
  const confirmCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
    setShowCancelModal(true);
  };

    const cancelTesttime = async (bookingId) => {  

  const token = localStorage.getItem("token");

  
  try {
    await axios.delete(`http://localhost:5011/api/Booking/${Number(bookingId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Uppdatera listan efter borttagning
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  } catch (error) {
    console.error("Kunde inte ta bort bokningen:", error);    
  }
};


  return (
    <div className="userDashboard" style={{ display: 'flex', height: '100vh'}}>
      <Nav className="flex-column sidepanel">
        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('bookings')}>
            🗂️ {t('my_bookings')} 
          </div>
          
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('certificates')}>
            🎓 {t('certificates')}    
          </div>
          {expanded.certificates && (
            <Nav.Link className="sidebar-link">
             ⏰ {t('test_sessions')}  
            </Nav.Link>
          )}
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('testtimes')}>
            ⏰ {t('testtillfallen', 'Testtillfällen')}
          </div>
          {expanded.testtimes && (
            <Nav.Link className="sidebar-link">
              {t('visaTesttillfallen', 'Visa testtillfällen')}
            </Nav.Link>
          )}
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
        <h2 data-aos="fade-down" data-aos-duration="700">{t('welcomeUserDashboard', 'Välkommen till din dashboard')}!</h2>


        {/*Bokningarna ska visas här nedanför*/}
        {expanded.bookings && (
            <div className='booking-list'>
              {loadingBookings && <div><Spinner animation="border" variant="primary" /><p>{t('laddarBokningar', 'Laddar bokningar...')}</p></div> }
              {errorBookings && <p style={{ color: 'red' }}>{errorBookings}</p>}
              {!loadingBookings && bookings.length === 0 && <p>{t('ingaBokningar', 'Inga bokningar hittades.')}</p>}

              <h5>{t('dinaTestbokningar')}</h5>
              <Table striped bordered hover style={{ position: 'relative' }}>                
              <thead>
                <tr>
                  <th>{t('certifiering')}</th>
                  <th>{t('bokningsId')}</th>
                  <th>{t('testtid')}</th> 
                  <th>{t('avboka')}</th>                
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => {
                const startingTime = new Date(booking.examStartingTime);
                const endingTime = new Date(booking.examEndingTime);

                return (
                  <tr key={booking.id}>
                    <td>{booking.certName}</td>
                    <td>{booking.id}</td>
                    <td>{formatDate(startingTime)} kl. {formatTime(startingTime)} - {formatTime(endingTime)}</td>
                    <td onClick={() => confirmCancelBooking(booking.id)} style={{ cursor: 'pointer' }}>🗑️</td>
                  </tr>
                )
                })}                
              </tbody>
              </Table>         
              </div>
        )}    

               {/* Modal: Bekräfta avbokning */}
        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t('bekräftaAvbokning')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{t('säkerAvbokaFråga')} </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
             {t('avbryt')}
            </Button>
           <Button variant="danger" onClick={() => cancelTesttime(bookingToCancel)}>
          {t('jaAvboka')}
        </Button>
          </Modal.Footer>
        </Modal>



        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('questionlogout', 'Vill du logga ut?')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{t('secondquerylogoutusers', 'Är du säker på att du vill logga ut?')}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t('cancel', 'Avbryt')}
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              {t('logout', 'Logga ut')}
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}

export default UserDashboard;

