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
import Offcanvas from 'react-bootstrap/Offcanvas';



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
    certiport: false,  
    logout: false,
  });

  const [bookings, setBookings] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [errorBookings, setErrorBookings] = useState(null);  
  const [cancelMessageType, setCancelMessageType] = useState(null);
  const [loadingCancel, setLoadingCancel] = useState(false);

  //meny för mobiltelefoner och tablets
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuClose = () => setShowMenu(false);
  const handleMenuShow = () => setShowMenu(true); 

 const toggleSection = (section) => {
  setExpanded(prev => {
    // Om klickad sektion redan är öppen - stäng den (alla stängs)
    if (prev[section]) {
      return {
        bookings: false,
        certificates: false,
        testtimes: false,
        certiport: false,
        logout: false,
      };
    }
    // Annars öppna bara den valda sektionen och stäng resten
    return {
      bookings: false,
      certificates: false,
      testtimes: false,
      certiport: false,
      logout: false,
      [section]: true,
    };
  });
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

  const cancelledBooking = bookings.find(booking => booking.id === bookingId);  

  if (!cancelledBooking) {
    console.error("Bokning hittades inte.");
    return;
  }  

      setLoadingCancel(true); // Starta loading
    setShowCancelModal(false); // Stäng modal direkt när man trycker "Ja"

  try {
    // 1. Skicka refund-begäran och låt backend hantera borttagning av bokningen
    const refundResponse = await axios.post(
      "http://localhost:5011/api/refund",
      {
        paymentIntentId: cancelledBooking.paymentIntentId,
        reason: "Jag kan inte delta", // Valfritt
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 2. Kontrollera om återbetalning lyckades
    if (refundResponse.data.status === "succeeded") {
      // 3. Uppdatera UI direkt utan att anropa DELETE eftersom backend redan tagit bort bokningen
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      setCancelMessageType('success');
      setTimeout(() => {
        setCancelMessageType(null);
      }, 5000);


    } else {
      setCancelMessageType('error');
      setTimeout(() => {
        setCancelMessageType(null);
      }, 5000);

    }
  } catch (error) {
  setCancelMessageType('error');
  setTimeout(() => {
        setCancelMessageType(null);
      }, 5000);

}

};


  return (
    <div className="userDashboard" style={{ display: 'flex', minHeight: '100vh', paddingTop: '60px'}}>

      <div className='d-md-none'>
      <Button
      variant='primary'
      className="hamburger-button btn-lg w-100"      
      onClick={handleMenuShow}
      >
      ☰ Meny
      </Button>
      </div>

      <Nav className="flex-column sidepanel d-none d-md-flex">
        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('bookings')}>
            🗂️ {t('my_bookings')} 
          </div>
          
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
          <div className="sidebar-title" onClick={() => toggleSection('certiport')}>
            {t('certiport_link')}
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
          <div className="sidebar-title" onClick={handleShow}>
            🚪 {t('logout')}
          </div>
        </div>
      </Nav>

      <Offcanvas
          show={showMenu}
          onHide={handleMenuClose}
          placement="start"
        >
          <Offcanvas.Header closeButton />
          <Offcanvas.Body>
             <Nav className="flex-column sidepanel">
        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => {toggleSection('bookings'); handleMenuClose(); }}>
            🗂️ {t('my_bookings')} 
          </div>          
        </div>

              <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => {toggleSection('testtimes'); handleMenuClose(); }}>
            ⏰ {t('testtillfallen', 'Testtillfällen')}
          </div>
          {expanded.testtimes && (
            <Nav.Link className="sidebar-link">
              {t('visaTesttillfallen', 'Visa testtillfällen')}
            </Nav.Link>
          )}
        </div>

            <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => {toggleSection('certiport'); handleMenuClose(); }}>
            {t('certiport_link')}
          </div>         
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => {toggleSection('certificates'); handleMenuClose(); }}>
            🎓 {t('certificates')}    
          </div>
          {expanded.certificates && (
            <Nav.Link className="sidebar-link">
             ⏰ {t('test_sessions')}  
            </Nav.Link>
          )}
        </div>  

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={handleShow}>
            🚪 {t('logout')}
          </div>
        </div>
              </Nav>
          </Offcanvas.Body>
        </Offcanvas>

      <main
        style={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          padding: '2rem',
        }}
        className='userdashboard_mainpart'
      >
        <h2 data-aos="fade-down" data-aos-duration="700">{t('welcomeUserDashboard', 'Välkommen till din dashboard')}!</h2>

                {cancelMessageType && (
          <div
            className={`alert ${
              cancelMessageType === 'success' ? 'alert-success' : 'alert-danger'
            }`}
            role="alert"
          >
            {cancelMessageType === 'success'
              ? t('booking_cancelled_success', 'Bokning avbokad och återbetalning genomförd.')
              : t('booking_cancelled_error', 'Något gick fel. Kontakta Scandinavian Certification Services AB på support@scandinavian-cert.se.')}
          </div>
        )}

        {/*Bokningarna ska visas här nedanför*/}
        {expanded.bookings && (
            <div className='booking-list'>
              {loadingBookings && <div><Spinner animation="border" variant="primary" /><p>{t('laddarBokningar', 'Laddar bokningar...')}</p></div> }
              {errorBookings && <p style={{ color: 'red' }}>{errorBookings}</p>}
              {!loadingBookings && bookings.length === 0 && <p>{t('ingaBokningar', 'Inga bokningar hittades.')}</p>}

              <h5>{t('dinaTestbokningar')}</h5>
              <div className="table-responsive">
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
                    <td><button onClick={() => confirmCancelBooking(booking.id)} disabled={loadingCancel} style={{ cursor: loadingCancel ? 'not-allowed' : 'pointer', background: 'none', border: 'none', fontSize: '1.2rem' }}>🗑️</button></td>
                  </tr>
                )
                })}                
              </tbody>
              </Table>   
              </div>      
              </div>
        )}    

        {/*Certiport testresultat och certifieringar visas nedanför*/}
        {expanded.certiport && (
              <div>
      <Button
      as="a"
      href="https://www.certiport.com/Portal/Pages/Registration.aspx"
      target="_blank"
      rel="noopener noreferrer"
      variant="primary"
      className='rounded-3'
    >
      {t('certiport_link')}
    </Button>

     
        <div
          style={{
            padding: '12px',            
            borderRadius: '6px',
            marginTop: '8px',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >          
          <p style={{ marginBottom: '8px' }}>{t('certiport_info_p1')}</p>
          <p style={{ marginBottom: '8px' }}>{t('certiport_info_p2')}</p>
          <p >{t('certiport_info_p3')}</p>
        </div>
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

