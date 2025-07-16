import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AdminSidebar from './AdminSidebar';
import { AuthContext } from './services/AuthProvider';
import './styling/AdminDashboard.css';
import { useTranslation } from 'react-i18next'; 
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('');
  const { role, setRole, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [testtimes, setTesttimes] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState('');
  const [name, setName] = useState('');
  const [certDesc, setCertDesc] = useState('');
  const [price, setPrice] = useState('');
  const [certId, setCertId] = useState('');
  const [starttime, setStarttime] = useState('');
  const [endtime, setEndtime] = useState(''); 
  const [testTimeId, setTestTimeId] = useState('');
  const [testDate, setTestDate] = useState();
  const [slots, setSlots] = useState();
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(false);

  const handleClose = () => setShow(false);  
  const handleShow = () => setShow(true);

  const handleLogout = () => {
      setIsAuthenticated(false);
      setRole('');
      navigate('/login');
      console.log('You have logged out');
    }

  useEffect(() => {
      const fetchCourses = async () => {
        try {
          const res = await axios.get('http://localhost:5011/api/category');
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
    const res = await axios.get('http://localhost:5011/api/booking', {
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

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5011/api/cert');
      setCertificates(res.data);
      console.log(res.data);
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

  if (!name || !selectedcategory || !price) {
    setError('Vänligen fyll i alla fält och ladda upp en bild!');
    return;
  }  

  const certificate = {
    CategoryId: selectedcategory,
    CertName: name,
    CertDescription: certDesc,
    Price: price, 
  };

  try {
    const res = await axios.post('http://localhost:5011/api/cert', certificate, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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

  if (!certId || !selectedcategory || !name || !price) {
    setError('Vänligen fyll i alla fält!');
    return;
  }

  const updatedCertificate = {
    Id: Number(certId),
    CategoryId: Number(selectedcategory),
    CertName: name,
    CertDescription: certDesc,
    price: Number(price)
  };

  try {
    const res = await axios.put(`http://localhost:5011/api/cert/${updatedCertificate.Id}`, updatedCertificate, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    setResponse(true);
    setError('');
    // Rensa fält
    setCertId('');
    setName('');
    setSelectedcategory('');
    setPrice(999); 

  } catch (error) {
    setError(`Något gick fel: ${error.message || 'Vänligen försök igen senare.'}`);
    setResponse('');
  }
}; //updatera certifikat

    const DeleteCertificate = async (event) => {
      event.preventDefault();
      if (!certId) {    
    setError('Vänligen fyll i certifikatets ID.');
    return;}

    try {
      const res = await axios.delete(`http://localhost:5011/api/cert/${Number(certId)}`, {
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      });
      setCertId('');
    }  

    catch (error) {
        setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`); // Backticks!
      }

    } //radera certifikat

 
    const fetchExamTimes = async () => {
  setLoading(true); // Sätt loading till true medan vi hämtar data
  setError(null); // Återställ eventuella tidigare fel

  try {
    // Hämta data från backend
    const res = await axios.get('http://localhost:5011/api/examdate');
    
    // Formatera testtider när datan är hämtad
    const formattedTestTimes = res.data.map((testtime) => {
      // Kombinera testdatum (YYYY-MM-DD) med starttiden (HH:mm:ss)
      const startTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examStartingTime}`;
      const endTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examEndingTime}`;
      
      // Skapa Date-objekt från start- och sluttider
      const startTime = new Date(startTimeString);
      const endTime = new Date(endTimeString);

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

  const Addnewtesttime = async (event) => {
      event.preventDefault();

      if (!certId || !starttime || !endtime) {
        setError('Vänligen fyll i alla fält!');
        return;
      }

      const testTime = {
        certId: Number(certId),  // Säkerställ att det är ett nummer
        examStartingTime: starttime,
        examEndingTime: endtime
      };

      try {
        const res = await axios.post('http://localhost:5011/api/ExamDate', testTime, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
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

  if (!testTimeId || !testDate || !starttime || !endtime || !slots || !price) {
    setError('Vänligen fyll i alla fält!');
    return;
  }

  // Validera att slutet är efter start
  if (new Date(`${testDate}T${endtime}`) <= new Date(`${testDate}T${starttime}`)) {
    setError('Slutdatum måste vara efter startdatum.');
    return;
  }

  // Omvandla start och sluttider till TimeSpan format (utan datum)
  const startDateTime = new Date(`${testDate}T${starttime}`);
  const endDateTime = new Date(`${testDate}T${endtime}`);

  const updatedTestTime = {
    id: Number(testTimeId),  // testtidens id
    examDate: startDateTime, // fullständig testdatum
    timeStart: {
      hours: startDateTime.getHours(),
      minutes: startDateTime.getMinutes(),
      seconds: startDateTime.getSeconds(),
    }, // Omvandla till TimeSpan (endast tid, utan datum)
    timeEnd: {
      hours: endDateTime.getHours(),
      minutes: endDateTime.getMinutes(),
      seconds: endDateTime.getSeconds(),
    }, // Omvandla till TimeSpan
    slots: Number(slots),
    price: parseFloat(price),
  };

  try {
    const res = await axios.put(`http://localhost:5011/api/ExamDate/${updatedTestTime.id}`, updatedTestTime, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    setResponse('Testtiden har uppdaterats!');
    setError(null);
    setTestTimeId('');
    setTestDate('');
    setStarttime('');
    setEndtime('');
    setSlots('');
    setPrice('');
  }
  catch (error) {
    setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
  }
}


  const DeleteTesttime = async (event) => {
      event.preventDefault();

      if (!testTimeId) {
        setError('Vänligen fyll i testidens ID!');
        return;        
      }    

      try {
        const res = await axios.delete(`http://localhost:5011/api/ExamDate/${testTimeId}`);
        setResponse('Testtiden har raderats!');
        setError(null);
      }   
      catch (error) {
        setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`); // Backticks!
      }
    } //radera testtillfälle

 
  const CreateCategory = async (e) => {
  e.preventDefault();

        if (!name || !description || !image) {
        setError('Vänligen fyll i alla fält!');
        setResponse(null);
        return;
      }

        const newCategory = {
        Name: name,  
        Description: description,
        Image: image
      };

      try {
        const res = await axios.post('http://localhost:5011/api/category', newCategory, {
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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

 const UpdateCategory = async (e) => {
  e.preventDefault();

  if (!selectedcategory || !name || !description || !image) {
    setError('Vänligen fyll i alla fält!');
    setResponse(null);
    return;
  }
  const updatedCategory = {
    Id: Number(selectedcategory),
    Name: name,
    Description: description,
    Image: image
  }; //uppdatera en kategori 

  try {
    const res = await axios.put(`http://localhost:5011/api/category/${selectedcategory}`, updatedCategory, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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

  if (!selectedcategory) {
    setError('Vänligen ange ett kategori-ID!');
    setResponse(null);
    return;
  }

  try {
    const res = await axios.delete(`http://localhost:5011/api/category/${selectedcategory}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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

  useEffect(() => {

    switch(activeSection) {
      case 'bookings':
        viewBookings();
        break;
      case 'certificates':
      fetchCertificates();
      break;
    case 'testtimes':
      fetchExamTimes();
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
        <div className='flexelementsBookings'>
          {bookings.map((booking, index) => {
            const startingTime = new Date(booking.examStartingTime);
            const endingTime = new Date(booking.examEndingTime);

            return (
              <div key={index} className='booking'>
                <p>Certifikat: {booking.certName}</p>
                <p>Kund: {booking.customerFirstName} {booking.customerLastName}</p>
                <p>
                  Testtid: {formatDate(startingTime)} kl. {formatTime(startingTime)} - {formatTime(endingTime)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
    case 'manageBookings':
      return (
        <div>
          <h2>Hantera bokningar</h2>
          <p>Här hanterar du bokningar.</p>
        </div>
      );

    // Certificates
    case 'certificates':
  return (
    <div>  
      <h2>Visa certifikat</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Certifikat ID</th>
            <th>Kategori</th>
            <th>Certifikat</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate.id}>
              <td>{certificate.id}</td>
              <td>{certificate.category}</td>
              <td>{certificate.certName}</td>
              <td>{certificate.price} kr</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
        <label className="form-label">Nytt pris</label>
        <input
          type="number"
          className="form-control text-center"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Testtid</th>
              <th>Pris</th>
              <th>Platser kvar</th>
              <th>Testtid-ID</th>
            </tr>
          </thead>
          <tbody>
            {testtimes.map((testtime) => (
              <tr key={testtime.id}>
                <td>{testtime.id}</td>
                <td>
                  {testtime.formattedStartTime} - {testtime.formattedEndTime}
                </td>
                <td>{testtime.price} kr</td>
                <td>{testtime.slots}</td>
                <td>{testtime.id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Kategori ID</th>
              <th>Kategori</th>
              <th>Beskrivning</th>
            </tr>
          </thead>
          <tbody>
            {category.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
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
    <div style={{ display: 'flex', height: '100vh'}} className="adminDashboard">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} handleShow={handleShow} />
      <main
        style={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          padding: '2rem',         
        }}
        className='adminMainpart'
      >
        {renderContent()}

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
      </main>
    </div>
  );
};

export default AdminDashboard;
