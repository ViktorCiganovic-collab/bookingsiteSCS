import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import dayjs from "dayjs";

function UserDashboard() {
  const { role, setRole, isAuthenticated, setIsAuthenticated, token, email } = useContext(AuthContext);
  const [show, setShow] = useState(false);  
  const navigate = useNavigate();
  const { t } = useTranslation();    
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [error, setError] = useState();
  const [response, setResponse] = useState();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);  
  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showToast, setShowToast] = useState(false);
  const [tooLateToCancel, setTooLateToCancel] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({});

  console.log(`Email extracted from the token: ${email}`);
  
  const [expanded, setExpanded] = useState({
    bookings: false,
    certificates: false,
    testtimes: false,  
    certiport: false,  
    myInfo: false,
    logout: false,
  });

  const [expandedNavlink, SetexpandedNavlink] = useState({
    changePassword: false,
  });

  const toggleNavLink = (section) => {
    SetexpandedNavlink(prev => {
      // Om klickad sektion redan är öppen - stäng den (alla stängs)
      if(prev[section]) {
        return {
          myDetails: false,
          changePassword: false,
        };
      }
      // Annars öppna bara den valda sektionen och stäng resten
      return {
        [section]: true,
      };
    })
  }

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
        myInfo: false,
        logout: false,
      };
    }
    // Annars öppna bara den valda sektionen och stäng resten
    return {
      bookings: false,
      certificates: false,
      testtimes: false,
      certiport: false,
      myInfo: false,
      logout: false,
      [section]: true,
    };
  });
    SetexpandedNavlink({
    changePassword: false,
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

    axios.get(`https://certbe-backend.onrender.com/api/booking/mybookings?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('Svar från server:', res.status); // Logga hela response-objektet  
      
      if (res.status === 204 || !res.data || res.data.length === 0) {
        setBookings([]);
        setErrorBookings("Inga bokningar hittades")
      } 
      else {
        setBookings(res.data || []);
      }
      setLoadingBookings(false);
    })
    .catch(err => {
      console.error("Fel vid hämtning av bokningar:", err);

      if (err.response) {
        const status = err.response.status;
        console.log('Statuskod:', status);
        console.log('Felmeddelande från server:', err.response.data);

        if (status === 401) {
          setErrorBookings(t('error_unauthorized', 'Åtkomst nekad. Kontakta support om du tror detta är ett misstag.'));
        } else if (status >= 500) {
          setErrorBookings(t('error_server', 'Ett serverfel uppstod. Försök igen senare.'));
        } else {
          setErrorBookings(t('error_unknown', 'Ett okänt fel uppstod vid hämtning.'));
        }

      } else if (err.request) {
        // Nätverksfel – servern svarar inte alls
        console.log('Request gjord men inget svar från server');
        setErrorBookings(t('error_network', 'Kunde inte kontakta servern. Kontrollera din internetanslutning.'));
      } else {
        console.log('Fel vid konfiguration av request:', err.message);
        setErrorBookings(t('error_unknown', 'Ett okänt fel uppstod vid hämtning.'));
      }

      setBookings([]);
      setLoadingBookings(false);
    });
  }
}, [expanded.bookings, isAuthenticated, token, email, t]);


  //Hämta användardata vid inloggning
  useEffect(() => {
    if (!token) return;    

    axios.get('https://certbe-backend.onrender.com/api/account/get-my-data', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then(res => {
      setUserData(res.data)
    }).catch(err => {
      console.error("Fel vid hämtning:", err);
      setError(err.response?.data || "Något gick fel");
    })

  }, [token]);

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
  const now = dayjs();

  const cancelledBooking = bookings.find(booking => booking.id === bookingId);  
   
  if (!cancelledBooking) {
    console.error("Bokning hittades inte.");
    return;
  }  

  const examStart = dayjs(cancelledBooking.examDate);
  const hoursDiff = examStart.diff(now, "hour");

  if (hoursDiff < 48) {
    setError(t('cancel_exam_too_late'));
    setCancelMessageType("failed");
    setShowToast(true); // Visa toast
    setTimeout(() => {
      setShowToast(false);
      setCancelMessageType(null);
      setError(null);
    }, 5000);
    return;
  }

      setLoadingCancel(true); // Starta loading
    setShowCancelModal(false); // Stäng modal direkt när man trycker "Ja"

  try {
    // 1. Skicka refund-begäran och låt backend hantera borttagning av bokningen
    const refundResponse = await axios.post(
      "https://certbe-backend.onrender.com/api/refund",
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

const changePassword = async (event) => {
  event.preventDefault();
  
  if (!email || !oldPassword || !newPassword) {
    setError('Vänligen fyll i alla uppgifter');
    return;
  }

  // Eventuell validering av lösenordet 
   const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Exempel: Minst 8 tecken, 1 bokstav, 1 siffra
  if (!regex.test(newPassword)) {
    setError('Lösenordet måste vara minst 8 tecken och innehålla minst 1 siffra, minst ett specialtecken och en stor bokstav.');
    return;
  }

  if (newPassword !== confirmPassword) {
     setError("❌ Lösenorden matchar inte.");
      return;
  }

  let newData = {
    Email: email,
    OldPassword: oldPassword,
    NewPassword: newPassword
  };

  setIsChangingPassword(true); 

  try {
    const res = await axios.post('https://api.scservices.se/backend/api/account/change-password', newData);

    console.log('Serverns svar:', res.data);
    if (typeof res.data === 'string' && res.data.includes("uppdaterats")) {
      setResponse('Lösenordet har ändrats!');
      setShowToast(true);      
      setError(null); 
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError('Något gick fel, vänligen försök igen.');
      setResponse(null); 
    }
  } catch (error) {
    setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
    setResponse(null); 
  } finally {
    setIsChangingPassword(false);
  }
};



  return (
    <div className="userDashboard" style={{ display: 'flex', minHeight: '100vh'}}>

      <div className='d-md-none bg-dark'>
      <Button
      variant='primary'
      className="hamburger-button btn-lg w-100"    
      onClick={handleMenuShow}
      aria-label={t('open_menu', 'Öppna meny')}
      aria-haspopup="true"
      aria-expanded={showMenu}
      >
      ☰ Meny
      </Button>
      </div>

      <Nav className="flex-column sidepanel d-none d-md-flex" style={{marginTop: '80px'}} >
        <div className="sidebar-group">
              <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded.bookings}
        aria-controls="bookings-submenu"
        onClick={() => toggleSection('bookings')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleSection('bookings'); }}
        className="sidebar-title"
      >
        🗂️ {t('my_bookings')}
      </div>
          
        </div>

               


        <div className="sidebar-group">
        <div
          role="button"
          tabIndex={0}
          aria-expanded={expanded.certiport ? 'true' : 'false'}
           aria-controls="section-certiport"
          onClick={() => toggleSection('certiport')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleSection('certiport');
          }}
          className="sidebar-title"
        >
          {t('certiport_link')}
        </div>         
      </div>

       

     <div className='sidebar-group'>
  <div
    role="button"
    tabIndex={0}
     aria-expanded={expanded.myInfo ? 'true' : 'false'}
            aria-controls="section-myInfo"
    onClick={() => toggleSection('myInfo')}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') toggleSection('myInfo');
    }}
    className='sidebar-title'
  >
    👤 {t('my_data')}
    
    {expanded.myInfo && (
      <>
        <Nav.Link
  className="sidebar-link"
  tabIndex={0}
  onClick={(e) => {
    e.stopPropagation();
    toggleNavLink('myDetails');
    handleMenuClose();
  }}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // förhindra scroll vid space
      e.stopPropagation();
      toggleNavLink('myDetails');
      handleMenuClose();
    }
  }}
  aria-label={t('my_personal_data', 'Mina uppgifter')}
>
  📄 {t('my_personal_data', 'Mina uppgifter')}
</Nav.Link>

              <Nav.Link
        className="sidebar-link"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          toggleNavLink('changePassword');
          handleMenuClose();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            toggleNavLink('changePassword');
            handleMenuClose();
          }
        }}
         aria-label={t('change_password_title', 'Byt lösenord')}
      >
        🔐 {t('change_password_title')}
      </Nav.Link>

      </>
    )}
  </div>
</div>

       

        <div className="sidebar-group">
  <div
    role="button"
    tabIndex={0}
    onClick={handleShow}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') handleShow();
    }}
    className="sidebar-title"
    aria-label={t('logout', 'Logga ut')}
  >
    🚪 {t('logout')}
  </div>
</div>
      </Nav>

      

      <Offcanvas
          show={showMenu}
          onHide={handleMenuClose}
          placement="start"
          aria-label={t('mobile_menu', 'Mobilmeny')}
           className="custom-offcanvas"
        >
          <Offcanvas.Header closeButton />
          <Offcanvas.Body>
             <Nav className="flex-column sidepanel" role="navigation" aria-label={t('sidebar_navigation', 'Sidomeny navigation')}>
        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => {toggleSection('bookings'); handleMenuClose(); }} aria-expanded={expanded.bookings ? 'true' : 'false'}
                aria-controls="section-bookings">
            🗂️ {t('my_bookings')} 
          </div>          
        </div>

        

            <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => {toggleSection('certiport'); handleMenuClose(); }} aria-expanded={expanded.certiport ? 'true' : 'false'} aria-controls="section-certiport">
            {t('certiport_link')}
          </div>         
        </div>

    

                 <div className="sidebar-group">
        <div className="sidebar-title" onClick={() => toggleSection('myInfo')} aria-expanded={expanded.myInfo ? 'true' : 'false'} aria-controls="section-myInfo">
          👤 {t('my_data')}
        </div>
        {expanded.myInfo && (
          <>
            <Nav.Link
              className="sidebar-link"
              onClick={(e) => {
                e.stopPropagation();
                toggleNavLink('myDetails');
                handleMenuClose();
              }}
              aria-label={t('my_personal_data', 'Mina uppgifter')}
            >
              📄 {t('my_personal_data', 'Mina uppgifter')}
            </Nav.Link>

            <Nav.Link
              className="sidebar-link"
              onClick={(e) => {
                e.stopPropagation();
                toggleNavLink('changePassword');
                handleMenuClose();
              }}
              aria-label={t('change_password_title', 'Byt lösenord')}
            >
              🔐 {t('change_password_title')}
            </Nav.Link>
          </>
        )}
      </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={handleShow} aria-label={t('logout', 'Logga ut')}>
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
          paddingTop: '100px'
        }}
        className='userdashboard_mainpart'
      >
        <h2 data-aos="fade-down" data-aos-duration="700" className='headtitle'>{t('welcomeUserDashboard', 'Välkommen till din dashboard')}!</h2>

                {cancelMessageType && (
  <div
    className={`alert ${
      cancelMessageType === 'success'
        ? 'alert-success'
        : cancelMessageType === 'failed'
        ? 'alert-warning'
        : 'alert-danger'
    }`}
    role="alert"
    aria-live="assertive"
  >
    {cancelMessageType === 'success' && t('booking_cancelled_success', 'Bokning avbokad och återbetalning genomförd.')}
    {cancelMessageType === 'failed' && error /* Visa t.ex. "Du kan inte avboka..." */}
    {cancelMessageType === 'error' && t('booking_cancelled_error', 'Något gick fel. Kontakta Scandinavian Certification Services AB på support@scandinavian-cert.se.')}
  </div>
)}


        {/*Bokningarna ska visas här nedanför*/}
        {expanded.bookings && (
          <section id="section-bookings" aria-labelledby="bookings-heading">
  <div className='booking-list'>
    {loadingBookings && (
      <div>
        <Spinner animation="border" variant="primary" role="status" aria-live="polite" aria-busy="true" />
        <p>{t('laddarBokningar', 'Laddar bokningar...')}</p>
      </div>
    )}
    {!loadingBookings && errorBookings && (
  <p style={{ color: 'red' }} className="errorMsg">{errorBookings}</p>
    )}

    {!loadingBookings && !errorBookings && bookings.length === 0 && (
      <p style={{color: 'red'}} className="errorMsg">{t('ingaBokningar', 'Inga bokningar hittades.')}</p>
    )}

    <h5 id="bookings-heading">{t('dinaTestbokningar')}</h5>

    {/* Desktop tabellvisning */}
    <div className="table-responsive d-none d-md-block" role="region" aria-label={t('dinaTestbokningar')}>
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
                <td>
                  {formatDate(startingTime)} kl. {formatTime(startingTime)} - {formatTime(endingTime)}
                </td>
                <td>
                  <button
                    onClick={() => confirmCancelBooking(booking.id)}
                    disabled={loadingCancel}
                    style={{
                      cursor: loadingCancel ? 'not-allowed' : 'pointer',
                      background: 'none',
                      border: 'none',
                      fontSize: '1.2rem',
                    }}
                    aria-label={t('avboka_test', 'Avboka test') + ` ${booking.examName} ${formatDate(booking.bookingDate)}`}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>

    {/* Mobil kortvisning */}
    <div className="d-block d-md-none" role="region" aria-label={t('dinaTestbokningar_mobil')}>
      {bookings.map((booking) => {
        const startingTime = new Date(booking.examStartingTime);
        const endingTime = new Date(booking.examEndingTime);

        return (
          <div key={booking.id} className="booking-card border rounded p-3 mb-3 shadow-sm bg-light" role="group" aria-label={`${booking.examName} ${formatDate(booking.bookingDate)}`}>
            <p><strong>{t('certifiering')}:</strong> {booking.certName}</p>
            <p><strong>{t('bokningsId')}:</strong> {booking.id}</p>
            <p>
              <strong>{t('testtid')}:</strong><br />
              {formatDate(startingTime)}<br />
              {formatTime(startingTime)} - {formatTime(endingTime)}
            </p>
            <div className="text-end">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => confirmCancelBooking(booking.id)}
                disabled={loadingCancel}
                aria-label={t('avboka_test', 'Avboka test') + ` ${booking.examName} ${formatDate(booking.bookingDate)}`}
              >
                {t('avboka')}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  </section>
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

        {expandedNavlink.myDetails && (
        <Container className="mt-3" aria-labelledby="my-details-heading">
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="text-center mb-3" id="my-details-heading">Mina uppgifter</Card.Title>
                  <Card.Text><strong>Förnamn:</strong> {userData.firstName}</Card.Text>
                  <Card.Text><strong>Efternamn:</strong> {userData.lastName}</Card.Text>
                  <Card.Text><strong>Email:</strong> {userData.email}</Card.Text>
                  <Card.Text><strong>Land:</strong> {userData.country}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}

        {expandedNavlink.changePassword && (
          <div className='d-flex flex-column align-items-center mt-4' style={{ maxWidth: "400px", margin: "0 auto" }} aria-labelledby="change-password-heading">
            <h3 id="change-password-heading" className='headtitle'>{t('change_your_password')}</h3>
            <form onSubmit={changePassword} className="w-100">

              <div className='mb-3'> 
                <label htmlFor="email" className="form-label">{t('your_email_address')}</label>
                <input id="email" type="email" className='form-control text-center' value={email} required></input>
              </div>

                   {/* Nuvarande lösenord */}
        <div className="mb-3 position-relative">
          <label htmlFor="oldPassword" className="form-label">{t('current_password')}</label>
          <input
            id="oldPassword"
            type={showOldPassword ? 'text' : 'password'}
            className="form-control text-center"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            aria-required="true"
            required
          />
          {/* Ögonikon för att visa/dölja lösenord */}
          <div
            className="position-absolute"
            style={{ top: '70%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: 'black' }}
            onClick={() => setShowOldPassword(!showOldPassword)}
            aria-label={showOldPassword ? t('hide_password', 'Dölj lösenord') : t('show_password', 'Visa lösenord')}
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            
          </div>
        </div>

              <div className='mb-3 position-relative'>
                  <label htmlFor="newPassword" className="form-label">{t('new_password')}</label>
                <input required id="newPassword" type={showNewPassword ? 'text' : 'password'} className='form-control text-center' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} aria-required="true"></input>

                <div
            className="position-absolute"
            style={{ top: '70%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: 'black' }}
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
              </div>

                    {/* Bekräfta nytt lösenord */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">{t('confirm_new_password')}</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-control text-center"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  aria-required="true"
                />
              </div>

               <div className="d-grid">
          <button type="submit" className="btn btn-danger" disabled={isChangingPassword} aria-disabled={isChangingPassword}>
            {isChangingPassword ? (
              <>
               <Spinner animation="border" size="sm" variant="light" /> {t('changing_password')}
              </>
            ) : (
              t('change_button')
            )
          }

          </button>
        </div>

            </form>              

             {error && <p className="svarsMeddelande mt-3 text-danger text-center">❌ {error}</p>}

          </div>
        )}

               {/* Modal: Bekräfta avbokning */}
        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} aria-labelledby="cancel-modal-label" centered>
          <Modal.Header closeButton>
            <Modal.Title id="cancel-modal-label">{t('bekräftaAvbokning')}</Modal.Title>
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



        <Modal show={show} onHide={handleClose} aria-labelledby="logout-modal-label" centered>
          <Modal.Header closeButton>
            <Modal.Title  id="logout-modal-label">{t('questionlogout', 'Vill du logga ut?')}</Modal.Title>
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

