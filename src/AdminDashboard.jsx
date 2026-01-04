import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Offcanvas, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import QuarterlyChart from './services/QuarterlyChart';
import CertBookingChart from './services/CertBookingChart';
import { AuthContext } from './services/AuthProvider';
import './styling/AdminDashboard.css';
import { useTranslation } from 'react-i18next'; 
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Toast from "react-bootstrap/Toast";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ToastContainer from "react-bootstrap/ToastContainer";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('');
  const { role, setRole, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [checkedRows, setCheckedRows] = useState(() => {
    const stored = localStorage.getItem("contactedcustomers");
    return stored ? JSON.parse(stored) : [];
  });
  const [cancellations, setCancellations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [popularCertificates, setPopularCertificates] = useState([]);
  const [testtimes, setTesttimes] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [certDesc, setCertDesc] = useState('');
  const [price, setPrice] = useState('');
  const [certId, setCertId] = useState('');
  const [certUrl, setCertUrl] = useState('');
  const [sortOrder, setSortOrder] = useState('descending');
  const [sortedTests, setSortedTests] = useState([]);
  const [starttime, setStarttime] = useState('');
  const [endtime, setEndtime] = useState(''); 
  const [testTimeId, setTestTimeId] = useState('');
  const [testDate, setTestDate] = useState('');
  const [slots, setSlots] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(false);
  const [hoveredCertId, setHoveredCertId] = useState(null);
  const [hoveredTesttimeId, setHoveredTesttimeId] = useState(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [bookingId, setBookingId] = useState(1);
  const [discountActive, setDiscountActive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  /*För byte av lösenord*/
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);  
  /*För byte av lösenord*/

  const handleClose = () => setShow(false);  
  const handleShow = () => setShow(true);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  const handleLogout = () => {
      setIsAuthenticated(false);
      setRole('');
      navigate('/login');
      console.log('You have logged out');
    }

  useEffect(() => {
      const fetchCourses = async () => {
        try {
          const res = await axios.get('https://certbe-backend.onrender.com/api/category');
          setCategory(res.data);
          console.log(res.data);
        } catch (error) {
          console.error('Kunde inte hämta kurser:', error);
          setCategory([]); // för att inte lämna den odefinierad
        }
      };

      fetchCourses();
    }, []); //när sidan laddar första gången hämta certifikatkategorier från servern

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

  const viewBookings = async () => {    
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
    const res = await axios.get('https://certbe-backend.onrender.com/api/booking', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    setBookings(res.data);
    console.log(res.data);
    setError(null);
    }

    catch (error) {
    setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
    }
    finally {
    setLoading(false);
  }

  }; //se alla bokningar

  useEffect(() => {
    localStorage.setItem("contactedcustomers", JSON.stringify(checkedRows))
  }, [checkedRows]); //uppdatera webbläsarens localstorage när checkedRows uppdateras

  const fetchCancellations = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('https://certbe-backend.onrender.com/api/refund', {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
      });
      setCancellations(res.data);
      console.log(res.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
    } finally { 
      setLoading(false);
    }
  }

  const fetchCertBookings = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('https://certbe-backend.onrender.com/cert/statistics/most_booked_certs', {headers: {
         'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }});
      setPopularCertificates(res.data);
      setError(null);
      setLoading(false);
    } catch (error) { 
      setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
    } finally {
      setLoading(false);
    }
  }

  const fetchCertificates = async () => {
    setLoading(true);
      try {
      const res = await axios.get('https://certbe-backend.onrender.com/api/cert');
      console.log(res.data);
      setCertificates(res.data);      
      setError(null);
      setLoading(false);
    }

    catch (error) {
          setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
        }
    finally {
    setLoading(false);
  }
  }; // se alla certifikat

  const addCertificate = async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token');

  if (!name || !selectedcategory || !price || !certUrl) {
    setError('Vänligen fyll i alla fält och ladda upp en bild!');
    return;
  }  

  const certificate = {
    CategoryId: selectedcategory,
    CertName: name,
    Slug: slug,
    CertDescription: certDesc,
    Price: price, 
    PdfUrl: certUrl
  };

  try {
    const res = await axios.post('https://certbe-backend.onrender.com/api/cert', certificate, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    setError('');
    console.log('Certifikat tillagt:', res.data);
    setName('');    
    setSelectedcategory('');
    setPrice('');
    setCertDesc('');
    setResponse(true);
  } catch (error) {
    setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
  }
}; // lägg till certifikat

const Editcertificate = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  if (!certId || !selectedcategory || !name || !price) {
    setError('Vänligen fyll i alla fält!');
    return;
  }

  const updatedCertificate = {
    Id: Number(certId),
    CategoryId: Number(selectedcategory),
    CertName: name,
    Slug: slug,
    CertDescription: certDesc,
    price: Number(price),
    LinkToCertInfo: certUrl
  };

  try {
    const res = await axios.put(`https://certbe-backend.onrender.com/api/cert/${updatedCertificate.Id}`, updatedCertificate, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    setResponse(true);
    setError('');
    // Rensa fält
    setCertId('');
    setName('');
    setSelectedcategory('');
    setPrice(999); 
    setCertUrl('');

  } catch (error) {
    setError(`Något gick fel: ${error.message || 'Vänligen försök igen senare.'}`);
    setResponse('');
  }
}; //updatera certifikat

    const DeleteCertificate = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');

      if (!certId) {    
    setError('Vänligen fyll i certifikatets ID.');
    return;}

    try {
      const res = await axios.delete(`https://certbe-backend.onrender.com/api/cert/${Number(certId)}`, {
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`    

      }
      });
      setCertId('');
    }  

    catch (error) {
        setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`); // Backticks!
      }

    } //radera certifikat


  const DeleteBooking = async (event) => {
  event.preventDefault();
  setError(null);  // Återställ felmeddelande
  setResponse(null);  // Återställ svar

  const token = localStorage.getItem("token");

  // Kontrollera om bookingId finns
  if (!bookingId) {
    setError('Vänligen fyll i bokningens ID.');
    return;
  }

  let response;

  // Första GET-anropet för att hämta bokningen
  try {
    response = await axios.get(`https://certbe-backend.onrender.com/api/booking/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    setError("Det gick inte att hämta bokningen.");
    return; // Om GET-anropet misslyckas, stoppa vidare kodexecution
  }

  // Andra POST-anropet för att radera bokningen
  try {
    const res = await axios.post(
      `https://certbe-backend.onrender.com/api/refund`,
      {
        paymentIntentId: response.data.paymentIntentId,
        reason: "Admin avbokar bokning för testtid",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Kontrollera om raderingen lyckades (204 No Content)
    if (res.status === 200) {
      setResponse("Bokningen har raderats.");
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
      setBookingId(""); // Töm inputfält
    } else {
      setError("Bokningen kunde inte raderas.");
    }
  } catch (error) {
    // Hantera olika fel för POST-anropet
    if (error.response && error.response.status === 404) {
      setError("Ingen bokning hittades med det ID:t.");
    } else {
      setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
    }
  } 
};


 
    const fetchExamTimes = async () => {
  setLoading(true); // Sätt loading till true medan vi hämtar data
  setError(null); // Återställ eventuella tidigare fel

  try {
    // Hämta data från backend
    const res = await axios.get('https://certbe-backend.onrender.com/api/examdate');
    
    // Formatera testtider när datan är hämtad
    const formattedTestTimes = res.data.map((testtime) => {
      // Kombinera testdatum (YYYY-MM-DD) med starttiden (HH:mm:ss)
      const startTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examStartingTime}`;
      const endTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examEndingTime}`;
      
      // Skapa Date-objekt från start- och sluttider
      const startTime = new Date(startTimeString);
      const endTime = new Date(endTimeString);

       const testDateOnly = new Date(`${testtime.testDate.split('T')[0]}T00:00:00`);

  const today = new Date();
  
  // Sätt tid till midnatt på båda för att jämföra endast datum
  testDateOnly.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  console.log('testDateOnly:', testDateOnly);
console.log('today:', today);
console.log('isPassed:', testDateOnly < today);

  const isPassed = testDateOnly < today;

      // Kontrollera om datumen är ogiltiga
      if (isNaN(startTime) || isNaN(endTime)) {
        console.error("Ogiltiga datum/tider för testtillfälle:", testtime);
      }

      // Formatera start- och sluttiderna till önskat format
      const formattedStartTime = startTime.toLocaleString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const formattedEndTime = endTime.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      // Returera testtiden med de formaterade tiderna
      return {
        ...testtime,
        formattedStartTime,
        formattedEndTime,
        isPassed
      };
    });

    // Sätt de formaterade testtiderna i state
    setTesttimes(formattedTestTimes);
  } catch (error) {
    // Hantera fel och sätt ett meddelande
    setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
  } finally {
    // Sätt loading till false när vi är klara
    setLoading(false);
  }
}; 

 useEffect(() => {
  if (!testtimes || testtimes.length === 0) return;

  const sorted = [...testtimes].sort((a, b) => {
    const dateA = new Date(`${a.testDate.split('T')[0]}T${a.examStartingTime}`);
    const dateB = new Date(`${b.testDate.split('T')[0]}T${b.examStartingTime}`);

    return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
  });

  setSortedTests(sorted);
}, [testtimes, sortOrder]);


  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const Addnewtesttime = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');

  if (!testDate || !starttime || !endtime || !price || !slots) {
  setError('Vänligen fyll i alla fält!');
  return;}

 const toTimeSpan = (t) => t.length === 5 ? `${t}:00` : t;

 const testTime = {
  testDate,
  examStartingTime: toTimeSpan(starttime),
  examEndingTime: toTimeSpan(endtime),
  slots: Number(slots),
  price: Number(price)
};

      try {
        const res = await axios.post('https://certbe-backend.onrender.com/api/ExamDate', testTime, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setResponse(res.data);
        setCertId('');
        setStarttime('');
        setEndtime('');
        setError(null);
      } 
      catch (error) {
        setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);  // Backticks!
      }
    } //lägg till testtillfälle

const UpdateTesttime = async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token');

  if (!testTimeId || !testDate || !starttime || !endtime || !slots || !price) {
    setError('Vänligen fyll i alla fält!');
    return;
  }

  // Validera att sluttid är efter starttid
  if (new Date(`${testDate}T${endtime}`) <= new Date(`${testDate}T${starttime}`)) {
    setError('Slutdatum måste vara efter startdatum.');
    return;
  }

  // Hjälpfunktion för att formatera tid som "HH:mm:ss"
  const pad = (num) => num.toString().padStart(2, '0');

  const formatTimeSpan = (timeStr) => {
    const [hours, minutes, seconds = '00'] = timeStr.split(':');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const updatedTestTime = {
    id: Number(testTimeId),
    examDate: `${testDate}T00:00:00`,        // Datum utan tid
    timeStart: formatTimeSpan(starttime),   // T.ex. "13:30:00"
    timeEnd: formatTimeSpan(endtime),       // T.ex. "15:00:00"
    slots: Number(slots),
    price: parseFloat(price),
  };

  try {
    const res = await axios.put(
      `https://certbe-backend.onrender.com/api/ExamDate/${updatedTestTime.id}`,
      updatedTestTime,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
    );

    setResponse('Testtiden har uppdaterats!');
    setError(null);
    setTestTimeId('');
    setTestDate('');
    setStarttime('');
    setEndtime('');
    setSlots('');
    setPrice('');
  } catch (error) {
    setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
  }
};



  const DeleteTesttime = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');

      if (!testTimeId) {
        setError('Vänligen fyll i testidens ID!');
        return;        
      }    

      try {
        const res = await axios.delete(`https://certbe-backend.onrender.com/api/ExamDate/${testTimeId}`, {headers: {
           'Content-Type': 'application/json',
          'Accept': 'application/json',
           'Authorization': `Bearer ${token}`
        }});
        setResponse('Testtiden har raderats!');
        setError(null);
      }   
      catch (error) {
        setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`); // Backticks!
      }
    } //radera testtillfälle

 
  const CreateCategory = async (e) => {
  e.preventDefault(); 
  const token = localStorage.getItem('token');

        if (!name || !description || !image) {
        setError('Vänligen fyll i alla fält!');
        setResponse(null);
        return;
      }

        const newCategory = {
        Name: name,  
        Description: description,
        Slug: slug,
        Image: image
      };

      try {
        const res = await axios.post('https://certbe-backend.onrender.com/api/category', newCategory, {
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
          }
        });
    setResponse('Kategori skapad!');
    setError(null);
    // Töm inputfält
    setName('');
    setDescription('');
    setImage('');
      }

      catch (error) {
        setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);  // Backticks!
        setResponse(null);
      }
  } //skapa ny kategori

  const updateDiscount = async (activate) => {
  try {
    setError('');
    setResponse('');

    const token = localStorage.getItem('token');
        if (!token) {
      setError("Ingen token hittades. Du är inte inloggad.");
      return;
    }    
    const url = `https://certbe-backend.onrender.com/api/cert/discount/${certId}`;    
    await axios.put(url, { isDiscount: activate }, 
      {
        headers: {Authorization: `Bearer ${token}`}
      }
    );

    const res = await axios.get('https://certbe-backend.onrender.com/api/cert');
    setCertificates(res.data);

    setDiscountActive(activate);

    setResponse(`Rabatt ${activate ? 'aktiverad' : 'avaktiverad'}`);
    setError(null);
  } catch (err) {
    // Om backend skickar felmeddelande via response
    const message = err.response?.data?.message || err.message;
    setError(message);
  }
};


 const UpdateCategory = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  if (!selectedcategory || !name || !description || !image) {
    setError('Vänligen fyll i alla fält!');
    setResponse(null);
    return;
  }
  const updatedCategory = {
    Id: Number(selectedcategory),
    Name: name,
    Slug: slug,
    Description: description,
    Image: image
  }; //uppdatera en kategori 

  try {
    const res = await axios.put(`https://certbe-backend.onrender.com/api/category/${selectedcategory}`, updatedCategory, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    setResponse('Kategori uppdaterad!');
    setError(null);
    // Töm inputfält
    setSelectedcategory('');
    setName('');
    setDescription('');
    setImage('');
  } catch (error) {
    setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
    setResponse(null);
  }
};

const DeleteCategory = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  if (!selectedcategory) {
    setError('Vänligen ange ett kategori-ID!');
    setResponse(null);
    return;
  }

  try {
    const res = await axios.delete(`https://certbe-backend.onrender.com/api/category/${selectedcategory}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    setResponse('Kategori raderad!');
    setError(null);
    setSelectedcategory('');
  } catch (error) {
    setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
    setResponse(null);
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
    //hämta jwt token för att identifiera användaren
        const token = localStorage.getItem("token");

    const res = await axios.post('https://certbe-backend.onrender.com/api/account/change-password', newData, {
      headers: {
        'Authorization': `Bearer ${token}`  // Skickar JWT-token i headern
      }
    });

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


  useEffect(() => {

    switch(activeSection) {
      case 'bookings':
        viewBookings();
        break;
      case 'cancellations':
        fetchCancellations();
        break;
      case 'certificates':
      fetchCertificates();
      break;
    case 'testtimes':
      fetchExamTimes();
      break;   
    case 'bookingsPerCert':
      fetchCertBookings();
      break;
    case 'editPassword':
    break;

    default:
      // Inga åtgärder eller nollställningar
      break;
    }

  }, [activeSection]);


 const renderContent = () => {
  if (loading) {
  return (
    <div className="text-center mt-4">
      <Spinner animation="border" role="status" />
      <span className="ms-2">Laddar...</span>
    </div>
  );
}
  switch(activeSection) {
    // Bookings
 case 'bookings':
  return (
    <div>
      <h2>Visa bokningar</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
          <p>Laddar bokningar...</p>
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (

        <>
        <div className='table-responsive d-none d-md-block text-dark'>
          <Table striped bordered hover style={{ position: 'relative'}}>
            <thead>
              <tr>
              <th>Certifiering</th>
              <th>Kund</th>
              <th>Email</th>
              <th>Testtid</th>
              <th>Vill ha övningstest</th>
              <th>Vill ha övningsmaterial</th>
              <th>Boknings ID</th>
              <th>Kontaktad</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => {

                const startingTime = new Date(booking.examStartingTime);
                const endingTime = new Date(booking.examEndingTime);
                const now = new Date();
                const isPassed = startingTime < now;

                return (
                  <tr >
                    <td>{booking.certName}</td>
                    <td>{booking.customerFirstName} {booking.customerLastName}</td>
                    <td>{booking.customerEmail}</td>
                    <td>{formatDate(startingTime)} kl. {formatTime(startingTime)} - {formatTime(endingTime)}</td>
                    {isPassed && <span style={{color: 'red', fontWeight: 'bold', marginLeft: '8px'}}>Passerat</span>}
                    <td>{booking.wantsPracticeTest ? "✅" : "❌"}</td>
                    <td>{booking.wantsPracticeMaterial ? "✅" : "❌"}</td>
                    <td>{booking.id}</td>
                    <td>
                    <input 
                    type="checkbox" 
                    checked={checkedRows.includes(booking.id)}
                    onChange={(event)  => {
                      if (event.target.checked) {
                        setCheckedRows([...checkedRows, booking.id])
                      } else {
                        setCheckedRows(checkedRows.filter(id => id !== booking.id))
                      }
                    }}
                     />  
                     {checkedRows.includes(booking.id) ? <span style={{ marginLeft: '8px' }}>✅</span> : <span style={{ marginLeft: '8px'}}>❌</span>}                  
                    </td>
                  </tr>

                )

              })}
            </tbody>
          </Table>
        </div>

        {/* MOBILE VIEW */}
    <div className="d-md-none">
      {bookings.map((booking) => {
        const startingTime = new Date(booking.examStartingTime);
        const endingTime = new Date(booking.examEndingTime);
        const now = new Date();
        const isPassed = startingTime < now;

        return (
          <div key={booking.id} className="card mb-3 p-3 text-dark">
            <p><strong>Certifiering:</strong> {booking.certName}</p>
            <p><strong>Kund:</strong> {booking.customerFirstName} {booking.customerLastName}</p>
            <p><strong>Email:</strong> {booking.customerEmail}</p>

            <p>
              <strong>Testtid:</strong><br />
              {formatDate(startingTime)} kl. {formatTime(startingTime)} – {formatTime(endingTime)}
              {isPassed && (
                <span
                  style={{
                    backgroundColor: '#FF4D4D',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    marginLeft: '8px'
                  }}
                >
                  Passerat
                </span>
              )}
            </p>

            <p><strong>Övningstest:</strong> {booking.wantsPracticeTest ? '✅' : '❌'}</p>
            <p><strong>Övningsmaterial:</strong> {booking.wantsPracticeMaterial ? '✅' : '❌'}</p>
            <p><strong>Boknings ID:</strong> {booking.id}</p>
          </div>
        );
      })}
    </div>

    </>        
      )}
    </div>
  );
    case 'deleteBookings':
return (
    <div className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="text-center mb-3">Radera Bokning</h3>  

      <form onSubmit={DeleteBooking} className="w-100">
        <div className="mb-3">
          <label className="form-label">Boknings ID</label>
          <input
            type="number"
            className="form-control text-center"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-danger">
            🗑 Radera bokning
          </button>
        </div>
      </form>

      {response && (
        <p className="mt-3 text-success text-center">✅ {response}</p>
      )}
      {error && (
        <p className="mt-3 text-danger text-center">❌ {error}</p>
      )}
    </div>
  );

case 'cancellations':
    return (
    <div>
      <h2>Visa Avbokningar</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
          <p>Laddar avbokningar...</p>
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className='flexelementsBookings'>
          {cancellations.map((cancellation, index) => {
            
            return (
              <div key={index} className='booking'>
                <p className="highlight">Avbokning avser: {cancellation.customerName}</p>
                <p>
              Avbokningstidpunkt: {new Date(cancellation.cancelledAt).toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
                <p>Återbetalningsstatus: {cancellation.refundStatus == "succeeded" ? "Återbetalt" : "Väntar på behandling"}</p>
                <p>Betalnings-ID: {cancellation.paymentIntentId}</p>
                               
               
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

    // Certificates
case 'certificates':
  return (
    <div>  
      <h2>Visa certifikat</h2>
      <div className="table-responsive d-none d-md-block">
      <Table striped bordered hover style={{ position: 'relative' }}>
        <thead>
          <tr>
            <th>Certifikat ID</th>
            <th>Kategori</th>
            <th>Certifikat</th>
            <th>Slug (URL)</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr 
              key={certificate.id}
              onMouseEnter={() => setHoveredCertId(certificate.id)}
              onMouseLeave={() => setHoveredCertId(null)}
            >
              <td>{certificate.id}</td>
              <td>{certificate.category}</td>

              <td className="cert-name-cell">
                <span className={hoveredCertId === certificate.id ? 'hidden' : ''}>
                  {certificate.certName}
                </span>

                <div className={`button-container text-center d-flex justify-content-center ${hoveredCertId === certificate.id ? 'show-buttons' : ''}`}>
                  <button className='btn btn-primary'
                  onClick={() => {
                    const categoryObj = category.find(x => x.name === certificate.category);
                    const certDescription = categoryObj.certs.find(x => x.name === certificate.certName);
                    setSelectedcategory(categoryObj ? categoryObj.id : '');
                    setName(certificate.certName);          
                    setCertDesc(certDescription.description);       
                    setPrice(certificate.price);
                    setSlug(certificate.slug);
                    setActiveSection('addCert');
                    setCertUrl(certificate.linkToCertInfo);
                  }}
                  >Duplicera</button>

                  <button
                  className='btn btn-secondary'
                  onClick={() => {
                    setCertId(certificate.id);
                    const catObj = category.find(c => c.name === certificate.category);
                    setSelectedcategory(catObj ? catObj.id : '');
                    setActiveSection('editCert');
                    setName(certificate.certName);
                    setSlug(certificate.slug);
                    setPrice(certificate.price);
                    setCertUrl(certificate.linkToCertInfo);
                  }}
                >
                  Redigera
                </button>

                <button className='btn btn-primary'
              onClick={() => {
                setCertId(certificate.id);
                setActiveSection('addDiscount');
              }}
            >
              Aktivera rabatt
            </button>

                  <button className='btn btn-danger' onClick={() => {
                    setCertId(certificate.id);
                    setActiveSection('deleteCert')
                  }}>Radera</button>
                </div>
              </td>

              <td>{certificate.slug}</td>


              <td>
              {certificate.isDiscount ? certificate.price * 0.5 : certificate.price} kr
              <span
                style={{
                  backgroundColor: certificate.isDiscount ? '#00FF00' : '#FF4D4D',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  marginLeft: '8px'
                }}
              >
                {certificate.isDiscount ? 'Rabatt' : 'Ingen rabatt'}
              </span>
            </td>

            </tr>          
          ))}
        </tbody>
      </Table>
      </div>

      {/* --- Cards for mobile --- */}
<div className="d-md-none">
  {certificates.map((certificate) => (
    <div key={certificate.id} className="card mb-3 p-3">
      <p><strong>Certifikat ID:</strong> {certificate.id}</p>
      <p><strong>Kategori:</strong> {certificate.category}</p>
      <p><strong>Certifikat:</strong> {certificate.certName}</p>
      <p>
        <strong>Pris:</strong> {certificate.isDiscount ? certificate.price * 0.5 : certificate.price} kr
        <span
          style={{
            backgroundColor: certificate.isDiscount ? '#00FF00' : '#FF4D4D',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            marginLeft: '8px'
          }}
        >
          {certificate.isDiscount ? 'Rabatt' : 'Ingen rabatt'}
        </span>
      </p>

      <div className="d-flex gap-3 flex-column justify-content-center mt-3">
        {/* Samma knappar som i tabellen, t.ex: */}
        <button
  className="btn btn-primary me-2"
  onClick={() => {
    const categoryObj = category.find(x => x.name === certificate.category);
    const certDescription = categoryObj ? categoryObj.certs.find(x => x.name === certificate.certName) : null;
    setSelectedcategory(categoryObj ? categoryObj.id : '');
    setName(certificate.certName);
    setCertDesc(certDescription ? certDescription.description : '');
    setPrice(certificate.price);
    setSlug(certificate.slug);
    setCertUrl(certificate.linkToCertInfo);
    setActiveSection('addCert');
  }}
>
  Duplicera
</button>

<button
  className="btn btn-secondary me-2"
  onClick={() => {
    setCertId(certificate.id);
    const catObj = category.find(c => c.name === certificate.category);
    setSelectedcategory(catObj ? catObj.id : '');
    setCertUrl(certificate.linkToCertInfo);
    setSlug(certificate.slug);
    setActiveSection('editCert');
  }}
>
  Redigera
</button>

<button
  className="btn btn-primary me-2"
  onClick={() => {
    setCertId(certificate.id);
    setActiveSection('addDiscount');
  }}
>
  Aktivera rabatt
</button>

<button
  className="btn btn-danger"
  onClick={() => {
    setCertId(certificate.id);
    setActiveSection('deleteCert');
  }}
>
  Radera
</button>

      </div>
    </div>
  ))}
</div>

    </div>
  );

    case 'addCert':
      return (
  <div className="d-flex flex-column justify-content-center align-items-center mt-4">
  <h3 className="text-center mb-3">Lägg till certifikat</h3> 

  <form onSubmit={addCertificate} className="w-100" style={{ maxWidth: "400px" }}>
    <div className="mb-3">
      <label className="form-label">Välj kurs</label>
      <select
        className="form-select text-center"
        value={selectedcategory}
        onChange={(e) => setSelectedcategory(e.target.value)}
        required
      >
        <option value="">-- Välj kurs --</option>
        {category.map((x, index) => (
          <option key={index} value={x.id}>{x.name}</option>
        ))}
      </select>
    </div>

    <div className="mb-3">
      <label className="form-label">Namn på certifikat</label>
      <input
        type="text"
        className="form-control text-center"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>

      <div className="mb-3">
      <label className="form-label">Slug (URL)</label>
      <input
        type="text"
        className="form-control text-center"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />
      <small className="text-white"> Används i URL:en, t.ex. /certifiering/microsoft/{slug} </small>
    </div>

    <div className="mb-3">
        <label className='form-label'>Certifieringsbeskrivning</label>
        <input
        type="text"
        className='form-control text-center'
        value={certDesc}
        onChange={(e) => setCertDesc(e.target.value)}
        required
         />

    </div>

    <div className="mb-3">
      <label className="form-label">Pris</label>
      <input
        type="number"
        className="form-control text-center"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
    </div>

      <div className="mb-3">
      <label className="form-label">Länk till mer info</label>
      <input
        type="text"
        className="form-control text-center"
        value={certUrl}
        onChange={(e) => setCertUrl(e.target.value)}
        required
      />
    </div>

    <div className="d-grid">
      <button type="submit" className="btn btn-primary">Skicka</button>
    </div>
  </form>

    {response && (
      <p className="mt-3 text-success">✅ Certifikatet har lagts till</p>
    )}
    {error && (
      <p className="mt-3 text-danger">❌ Det gick inte att lägga till certifikatet</p>
    )}
  </div>
      );
   
    
    case 'editCert':
    return (
    <form onSubmit={Editcertificate} className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="text-center mb-3">Redigera Certifikat</h3>

      <div className="mb-3 w-100">
        <label className="form-label">Certifikat ID</label>
        <input
          type="number"
          className="form-control text-center"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          required
        />
      </div>

      <div className="mb-3 w-100">
        <label className="form-label">Välj kurs</label>
        <select
          className="form-select text-center"
          value={selectedcategory}
          onChange={(e) => setSelectedcategory(e.target.value)}
          required
        >
          <option value="">-- Välj kurs --</option>
          {category.map((coursename, index) => (
            <option key={index} value={coursename.id}>
              {coursename.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 w-100">
        <label className="form-label">Nytt namn på certifikatet</label>
        <input
          type="text"
          className="form-control text-center"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3 w-100">
      <label className="form-label">Slug (URL)</label>
      <input
        type="text"
        className="form-control text-center"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />
      <small className="text-white"> Används i URL:en, t.ex. /certifiering/microsoft/{slug} </small>
    </div>

      <div className="mb-3 w-100">
        <label className="form-label">Nytt pris</label>
        <input
          type="number"
          className="form-control text-center"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

        <div className="mb-3 w-100">
        <label className="form-label">Ny länk till mer info</label>
        <input
          type="text"
          className="form-control text-center"
          value={certUrl}
          onChange={(e) => setCertUrl(e.target.value)}
          required
        />
      </div>

      <div className="d-grid w-100">
        <button type="submit" className="btn btn-primary">Redigera certifikat</button>
      </div>

      {response && (
        <p className="text-success mt-3">✅ Certifikatet har uppdaterats</p>
      )}
      {error && (
        <p className="text-danger mt-3">❌ Det gick inte att uppdatera certifikatet</p>
      )}
    </form>
  );

    case 'addDiscount':
  return (
    <div className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h3 className="text-center mb-3">Aktivera rabatt med 50% på certifiering</h3>

      <div className="mb-3 w-100">
        <label className="form-label">Certifieringens Id</label>
        <input
          type="number"
          className="form-control text-center"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          required
        />
      </div>

      <div className="d-grid w-100">
        <button
          className={`btn mb-2 ${discountActive ? 'btn-success glow-green' : 'btn-secondary'}`}
          onClick={() => updateDiscount(true)}
          disabled={!certId}
        >
          Aktivera
        </button>
        <button className={`btn btn-danger ${!discountActive ? 'glow-red' : ''}`}
          onClick={() => updateDiscount(false)}
          disabled={!certId}
        >
          🗑 Avaktivera
        </button>
      </div>

      {response && <p className="mt-3 text-success text-center">✅ {response}</p>}
      {error && <p className="mt-3 text-danger text-center">❌ {error}</p>}
    </div>
  );

    case 'deleteCert':
  return (
    <div className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="text-center mb-3">Radera Certifikat</h3>  

      <form onSubmit={DeleteCertificate} className="w-100">
        <div className="mb-3">
          <label className="form-label">Certifikat ID</label>
          <input
            type="number"
            className="form-control text-center"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-danger">
            🗑 Radera certifikat
          </button>
        </div>
      </form>

      {response && (
        <p className="mt-3 text-success text-center">✅ {response}</p>
      )}
      {error && (
        <p className="mt-3 text-danger text-center">❌ {error}</p>
      )}
    </div>
  );


    // Test Times
case 'testtimes':
  return (
    <div>
      <h2>Visa testtider</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
          <p>Laddar testtider...</p>
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
       
        <div className="table-responsive d-none d-md-block">
               <Form.Group controlId="sortSelect" className="mb-3 w-50">
      <Form.Label>Sortering</Form.Label>
      <Form.Select value={sortOrder} onChange={handleSortChange }>
        <option value="ascending">Tidigare testtider först</option>
        <option value="descending">Senare testtider först</option>
      </Form.Select>
    </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Testtid</th>
                <th>Platser kvar</th>
                <th>Testtid-ID</th>
              </tr>
            </thead>
            <tbody>
              {sortedTests.map((testtime) => {
                return (
                  <tr
                    key={testtime.id}
                    onMouseEnter={() => setHoveredTesttimeId(testtime.id)}
                    onMouseLeave={() => setHoveredTesttimeId(null)}
                  >
                    <td className={testtime.isPassed ? 'passed-row cert-name-cell' : 'cert-name-cell'}>
                      <span className={hoveredTesttimeId === testtime.id ? 'hidden' : ''}>
                        {testtime.formattedStartTime} - {testtime.formattedEndTime}
                      </span>
                      {testtime.isPassed && <span className="heavy-text">Datum passerat</span>}
                      <div className={`button-container d-flex justify-content-center ${hoveredTesttimeId === testtime.id ? 'show-buttons' : ''}`}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setTestDate(testtime.testDate.split('T')[0]);
                            setStarttime(testtime.examStartingTime);
                            setEndtime(testtime.examEndingTime);
                            setSlots(testtime.slots);
                            setPrice(testtime.finalPrice);
                            setActiveSection('addTestTime');
                          }}
                        >
                          Duplicera
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setTestTimeId(testtime.id);
                            setTestDate(testtime.testDate.split('T')[0]);
                            setStarttime(testtime.examStartingTime);
                            setEndtime(testtime.examEndingTime);
                            setSlots(testtime.slots);
                            setPrice(testtime.finalPrice);
                            setActiveSection('editTestTime');
                          }}
                        >
                          Redigera
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setTestTimeId(testtime.id);
                            setActiveSection('deleteTestTime');
                          }}
                        >
                          Radera
                        </button>
                      </div>
                    </td>
                    <td>{testtime.slots}</td>
                    <td>{testtime.id}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      {/* --- Cards for mobile --- */}
<div className="d-md-none">
  <Form.Group controlId="sortSelect" className="mb-3 w-50">
      <Form.Label>Sortering</Form.Label>
      <Form.Select value={sortOrder} onChange={handleSortChange }>
        <option value="ascending">Tidigare testtider först</option>
        <option value="descending">Senare testtider först</option>
      </Form.Select>
    </Form.Group>
  {sortedTests.map((testtime) => (
    <div key={testtime.id} className={`card mb-3 p-3 ${testtime.isPassed ? 'border-secondary' : ''}`}>
      <h5 className={testtime.isPassed ? 'text-muted' : ''}>
        {testtime.formattedStartTime} - {testtime.formattedEndTime}
      </h5>
      {testtime.isPassed && <p className="text-danger fw-bold">Datum passerat</p>}

      <p><strong>Platser kvar:</strong> {testtime.slots}</p>
      <p><strong>Testtid-ID:</strong> {testtime.id}</p>

      <div className="d-flex flex-column gap-3 justify-content-center mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => {
            setTestDate(testtime.testDate.split('T')[0]);
            setStarttime(testtime.examStartingTime);
            setEndtime(testtime.examEndingTime);
            setSlots(testtime.slots);
            setPrice(testtime.finalPrice);
            setActiveSection('addTestTime');
          }}
        >
          Duplicera
        </button>
        <button
          className="btn btn-secondary me-2"
          onClick={() => {
            setTestTimeId(testtime.id);
            setTestDate(testtime.testDate.split('T')[0]);
            setStarttime(testtime.examStartingTime);
            setEndtime(testtime.examEndingTime);
            setSlots(testtime.slots);
            setPrice(testtime.finalPrice);
            setActiveSection('editTestTime');
          }}
        >
          Redigera
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            setTestTimeId(testtime.id);
            setActiveSection('deleteTestTime');
          }}
        >
          Radera
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );


   case 'addTestTime':
  return (
    <div className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="text-center mb-3">Lägg till testtillfälle</h3>

      <form onSubmit={Addnewtesttime} className="w-100">
        {/* Test Date input */}
        <div className="mb-3">
          <label className="form-label">Testdatum</label>
          <input
            type="date"
            className="form-control text-center"
            value={testDate}  // testDate state
            onChange={(e) => setTestDate(e.target.value)}  // Handle change for testDate
            required
          />
        </div>

        {/* Start time input */}
        <div className="mb-3">
          <label className="form-label">Starttid</label>
          <input
            type="time"
            className="form-control text-center"
            value={starttime}  // starttime state
            onChange={(e) => setStarttime(e.target.value)}  // Handle change for starttime
            required
          />
        </div>

        {/* End time input */}
        <div className="mb-3">
          <label className="form-label">Sluttid</label>
          <input
            type="time"
            className="form-control text-center"
            value={endtime}  // endtime state
            onChange={(e) => setEndtime(e.target.value)}  // Handle change for endtime
            min={starttime}  // Ensure end time is not before start time
            required
          />
        </div>

        {/* Slots input */}
        <div className="mb-3">
          <label className="form-label">Platser</label>
          <input
            type="number"
            className="form-control text-center"
            value={slots}  // slots state
            onChange={(e) => setSlots(e.target.value)}  // Handle change for slots
            required
          />
        </div>

        {/* Price input */}
        <div className="mb-3">
          <label className="form-label">Pris</label>
          <input
            type="number"
            step="0.01"
            className="form-control text-center"
            value={price}  // price state
            onChange={(e) => setPrice(e.target.value)}  // Handle change for price
            required
          />
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">➕ Lägg till</button>
        </div>
      </form>

      {/* Response messages */}
      {response && <p className="mt-3 text-success text-center">✅ Testtiden har lagts till</p>}
      {error && <p className="mt-3 text-danger text-center">❌ {error}</p>}
    </div>
    
  );

    case 'editTestTime':
  return (
    <div className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="text-center mb-3">Uppdatera ett testtillfälle</h3>

      <form onSubmit={UpdateTesttime} className="w-100">
        <div className="mb-3">
          <label className="form-label">Testtidens ID</label>
          <input
            type="number"
            className="form-control text-center"
            value={testTimeId}
            onChange={(e) => setTestTimeId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Testdatum</label>
          <input
            type="date"
            className="form-control text-center"
            value={testDate} // testDate state
            onChange={(e) => setTestDate(e.target.value)} // Handle change for testDate
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Starttid</label>
          <input
            type="time"
            className="form-control text-center"
            value={starttime}  // starttime state
            onChange={(e) => setStarttime(e.target.value)}  // Handle change for starttime
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sluttid</label>
          <input
            type="time"
            className="form-control text-center"
            value={endtime}  // endtime state
            onChange={(e) => setEndtime(e.target.value)}  // Handle change for endtime
            min={starttime}  // Ensure end time is not before start time
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Platser</label>
          <input
            type="number"
            className="form-control text-center"
            value={slots}  // slots state
            onChange={(e) => setSlots(e.target.value)}  // Handle change for slots
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Pris</label>
          <input
            type="number"
            step="0.01"
            className="form-control text-center"
            value={price}  // price state
            onChange={(e) => setPrice(e.target.value)}  // Handle change for price
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">📝 Uppdatera</button>
        </div>
      </form>

      {response && <p className="mt-3 text-success text-center">✅ Testtiden har uppdaterats</p>}
      {error && <p className="mt-3 text-danger text-center">❌ {error}</p>}
    </div>
  );

 
    case 'deleteTestTime':
  return (
    <div className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="text-center mb-3">Radera ett testtillfälle</h3>

      <form onSubmit={DeleteTesttime} className="w-100">
        <div className="mb-3">
          <label className="form-label">Testtidens ID</label>
          <input
            type="number"
            className="form-control text-center"
            value={testTimeId}
            onChange={(e) => setTestTimeId(e.target.value)}
            required
          />
        </div>      
      

        <div className="d-grid">
          <button type="submit" className="btn btn-danger">🗑 Radera testtid</button>
        </div>
      </form>

      {response && <p className="mt-3 text-success text-center">✅ {response}</p>}
      {error && <p className="mt-3 text-danger text-center">❌ {error}</p>}
    </div>
  );


case 'categories':
  return (
    <div>
      <h2>Visa kategorier</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
          <p>Laddar kategorier...</p>
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="table-responsive d-none d-md-block">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Kategori ID</th>
              <th>Kategori</th>
              <th>Beskrivning</th>
              <th>Slug (URL)</th>
            </tr>
          </thead>
          <tbody>
            {category.map((x) => (
              <tr key={x.id}
              onMouseEnter={() => setHoveredCategoryId(x.id)}
              onMouseLeave={() => setHoveredCategoryId(null)}>
                <td>{x.id}</td>
                <td>{x.name}</td>

                <td className="cert-name-cell">

                  <span className={hoveredCategoryId === x.id ? 'hidden' : ''}>
                  {x.description}
                  </span>

                <div className={`button-container ${hoveredCategoryId === x.id ? 'show-buttons' : ''}`}>
                  <button className='btn btn-primary'
                  onClick={() => {
                    setName(x.name);
                    setDescription(x.description);
                    setSlug(x.slug);
                    setImage(x.image);
                    setActiveSection('createCategory');
                  }}
                  >Duplicera</button>

                  <button className='btn btn-secondary'
                  onClick={() => {
                    setSelectedcategory(x.id);
                    setName(x.name);
                    setSlug(x.slug);
                    setDescription(x.description);
                    setImage(x.image);
                    setActiveSection('updateCategory');
                  }}>Redigera</button>

                  <button className='btn btn-danger'
                  onClick={() => {
                    setSelectedcategory(x.id);
                    setActiveSection('deleteCategory');
                  }}>Radera</button>
                </div>
                  
                  
                  
                </td>

                <td>{x.slug}</td>


              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      )}

      {/* --- Cards for mobile --- */}
<div className="d-md-none">
  {category.map((x) => (
    <div key={x.id} className="card mb-3 p-3">
      <p><strong>Kategori ID:</strong> {x.id}</p>
      <p><strong>Kategori:</strong> {x.name}</p>
      <p><strong>Beskrivning:</strong> {x.description}</p>

      <div className="d-flex flex-column gap-3 justify-content-center mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => {
            setName(x.name);
            setDescription(x.description);
            setImage(x.image);
            setSlug(x.slug);
            setActiveSection('createCategory');
          }}
        >
          Duplicera
        </button>

        <button
          className="btn btn-secondary me-2"
          onClick={() => {
            setSelectedcategory(x.id);
            setName(x.name);
            setSlug(x.slug);
            setDescription(x.description);
            setImage(x.image);
            setActiveSection('updateCategory');
          }}
        >
          Redigera
        </button>

        <button
          className="btn btn-danger"
          onClick={() => {
            setSelectedcategory(x.id);
            setActiveSection('deleteCategory');
          }}
        >
          Radera
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
    case 'createCategory':
  return (
    <div className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="text-center mb-3">Skapa ny kategori</h3>

      <form onSubmit={CreateCategory} className="w-100">
        <div className="mb-3">
          <label className="form-label">Namn</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

             <div className="mb-3">
          <label className="form-label">Slug (URL)</label>
          <input
            type="text"
            className="form-control"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Beskrivning</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bild (URL)</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Skapa kategori</button>
        </div>
      </form>

      {response && <p className="mt-3 text-success text-center">✅ {response}</p>}
      {error && <p className="mt-3 text-danger text-center">❌ {error}</p>}
    </div>
  );

    case 'updateCategory':
  return (
    <div className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="text-center mb-3">Uppdatera kategori</h3>

      <form onSubmit={UpdateCategory} className="w-100">
        <div className="mb-3">
          <label className="form-label">Kategori ID</label>
          <input
            type="number"
            className="form-control"
            value={selectedcategory}
            onChange={(e) => setSelectedcategory(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Namn</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

         <div className="mb-3">
          <label className="form-label">Slug (URL)</label>
          <input
            type="text"
            className="form-control"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Beskrivning</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bild (URL)</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Uppdatera kategori</button>
        </div>
      </form>

      {response && <p className="mt-3 text-success text-center">✅ {response}</p>}
      {error && <p className="mt-3 text-danger text-center">❌ {error}</p>}
    </div>
  );

    case 'deleteCategory':
  return (
    <div className="d-flex flex-column align-items-center mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="text-center mb-3">Radera kategori</h3>

      <form onSubmit={DeleteCategory} className="w-100">
        <div className="mb-3">
          <label className="form-label">Kategori-ID</label>
          <input
            type="number"
            className="form-control text-center"
            value={selectedcategory}
            onChange={(e) => setSelectedcategory(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-danger">🗑 Radera kategori</button>
        </div>
      </form>

      {response && <p className="mt-3 text-success text-center">✅ {response}</p>}
      {error && <p className="mt-3 text-danger text-center">❌ {error}</p>}
    </div>
  );

    case 'bookingsPerCert': 
    return (
      <CertBookingChart />
    );

    case 'bookingsQuarterly':
    return (
      <QuarterlyChart />

    );

    case 'editPassword':
        return (
       <Form className="formPasswordchange mt-4" style={{ maxWidth: '400px', margin: '0 auto' }} aria-labelledby="change-password-heading" onSubmit={changePassword}>
      <h3 id="change-password-heading" className="text-center">{t('change_your_password')}</h3>

      <Form.Group className="mb-3">
        <Form.Label>{t('your_email_address')}</Form.Label>
        <Form.Control 
          id="email" 
          type="email" 
          placeholder={t('enter_your_email')}
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          aria-required="true"          
        />
      </Form.Group>

      <Form.Group className="mb-3 position-relative">
        <Form.Label>{t('current_password')}</Form.Label>
        <InputGroup>
          <Form.Control
            id="oldPassword"
            type={showOldPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            aria-required="true"            
          />
          <InputGroup.Text 
            onClick={() => setShowOldPassword(!showOldPassword)} 
            style={{ cursor: 'pointer' }}
            aria-label={showOldPassword ? t('hide_password', 'Dölj lösenord') : t('show_password', 'Visa lösenord')}
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3 position-relative">
        <Form.Label>{t('new_password')}</Form.Label>
        <InputGroup>
          <Form.Control 
            id="newPassword" 
            type={showNewPassword ? 'text' : 'password'} 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
            aria-required="true"
          />
          <InputGroup.Text 
            onClick={() => setShowNewPassword(!showNewPassword)} 
            style={{ cursor: 'pointer' }}
            aria-label={showNewPassword ? t('hide_password', 'Dölj lösenord') : t('show_password', 'Visa lösenord')}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('confirm_new_password')}</Form.Label>
        <Form.Control 
          id="confirmPassword" 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
          aria-required="true"
        />
      </Form.Group>

      <Button 
        variant="danger" 
        type="submit" 
        className="d-grid"
        disabled={isChangingPassword}
        aria-disabled={isChangingPassword}
        style={{display: "block", width: "100%"}}
      >
        {isChangingPassword ? (
          <>
            <Spinner animation="border" size="sm" variant="light" /> {t('changing_password')}
          </>
        ) : (
          t('change_button')
        )}
      </Button>
       <ToastContainer position="top-center" className="p-3">
                      <Toast
                        bg="success"
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={3000}
                        autohide
                      >
                        <Toast.Header>
                          <strong className="me-auto">Uppdatering</strong>
                        </Toast.Header>
                        <Toast.Body>Dina uppgifter har sparats!</Toast.Body>
                      </Toast>
                    </ToastContainer>          
    </Form>

     
  );

    // Fallback
    default:
      return (
        <div>
          <h2>Välj en sektion</h2>
          <p>Använd menyn till vänster för att välja en funktion.</p>
        </div>
      );
  }
};


  return (
    <div className="adminDashboard d-flex" style={{ minHeight: '100vh' }}>

      <Helmet>
      <title>Adminpanel | SCS</title>
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href="https://www.scservices.se/admin" />
    </Helmet>

      
      {/* Fast sidopanel på md och uppåt */}
      <div className="d-none d-md-block" style={{marginTop: '70px'}}>
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleShow={handleShow}
        />
      </div>

      {/* Offcanvas för små skärmar */}
      <div className="d-md-none">
        <Button 
          variant="primary" 
          onClick={handleShowSidebar} 
          className="hamburger-button btn-lg w-100"
          
        >
          ☰
        </Button>

        <Offcanvas
          show={showSidebar}
          onHide={handleCloseSidebar}
          placement="start"
        >
          <Offcanvas.Header closeButton />
          <Offcanvas.Body>
            <AdminSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              handleShow={handleShow}
              onLinkClick={handleCloseSidebar} 
              handleCloseSidebar={handleCloseSidebar}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <main
        className="adminMainpart"
        style={{ flexGrow: 1, overflowY: 'auto', padding: '2rem', paddingTop: '100px' }}
      >
        {renderContent()}

        <Modal show={show} onHide={handleClose} centered>
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
      </main>
    </div>
  );
};

export default AdminDashboard;