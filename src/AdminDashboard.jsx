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
  const [price, setPrice] = useState('');
  const [certId, setCertId] = useState('');
  const [starttime, setStarttime] = useState('');
  const [endtime, setEndtime] = useState(''); 
  const [testTimeId, setTestTimeId] = useState('');
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
          const res = await axios.get('http://3.90.225.16:5011/api/category');
          setCategory(res.data);
          console.log(res.data);
        } catch (error) {
          console.error('Kunde inte hämta kurser:', error);
          setCategory([]); // för att inte lämna den odefinierad
        }
      };

      fetchCourses();
    }, []); //när sidan laddar första gången hämta certifikatkategorier från servern

  const viewBookings = async () => {    
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
    const res = await axios.get('http://3.90.225.16:5011/api/booking', {
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
      const res = await axios.get('http://3.90.225.16:5011/api/cert');
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
    Price: price, 
  };

  try {
    const res = await axios.post('http://3.90.225.16:5011/api/cert', certificate, {
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
    price: Number(price)
  };

  try {
    const res = await axios.put(`http://3.90.225.16:5011/api/cert/${updatedCertificate.Id}`, updatedCertificate, {
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
      const res = await axios.delete(`http://3.90.225.16:5011/api/cert/${Number(certId)}`, {
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

  const fetchTestTimes = async () => {
  setLoading(true);
  try {
    const res = await axios.get('http://3.90.225.16:5011/api/ExamDate');
    setTesttimes(res.data);
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
  }; //se alla testtillfällen

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
        const res = await axios.post('http://3.90.225.16:5011/api/ExamDate', testTime, {
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
      
      if (!testTimeId || !starttime || !endtime) {
        setError('Vänligen fyll i alla fält!');
        return;
      }

      if (new Date(endtime) <= new Date(starttime)) {
        setError('Slutdatum måste vara efter startdatum.');
        return;
      }

      const updatedTestTime = {
        id: Number(testTimeId),  // testtidens id
        examStartingTime: starttime,
        examEndingTime: endtime,
      };

      try {
        const res = await axios.put(`http://3.90.225.16:5011/api/ExamDate/${updatedTestTime.id}`, updatedTestTime, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }  
        });
        setResponse('Testtiden har uppdaterats!');
        setError(null);
        setTestTimeId('');
        setCertId('');
        setStarttime('');
        setEndtime('');
      }
      catch (error) {
        setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`); // Backticks!
      }
    } //uppdatera testtillfälle

  const DeleteTesttime = async (event) => {
      event.preventDefault();

      if (!testTimeId || !starttime || !endtime) {
        setError('Vänligen fyll i alla fält!');
        return;        
      }

      if (new Date(endtime) <= new Date(starttime)) {
        setError('Slutdatum måste vara efter startdatum.');
        return;
      }

      // const deletedTesttime = {
      //   id: Number(testTimeId),  // testtidens id
      //   examStartingTime: starttime,
      //   examEndingTime: endtime,
      // };

      try {
        const res = await axios.delete(`http://3.90.225.16:5011/api/ExamDate/${testTimeId}`);
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
        const res = await axios.post('http://3.90.225.16:5011/api/category', newCategory, {
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
    const res = await axios.put(`http://3.90.225.16:5011/api/category/${selectedcategory}`, updatedCategory, {
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
    const res = await axios.delete(`http://3.90.225.16:5011/api/category/${selectedcategory}`, {
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
      fetchTestTimes();
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

          <div className='flexelementsBookings'>
          {bookings.map((booking) => (
            <div className='booking'>
              <p>Test: {booking.certName}</p>
              <p>Namn: {booking.customerFirstName} {booking.customerLastName}</p>
              <p>Testtid: {booking.examStartingTime} - {booking.examEndingTime}</p>
            </div>
          ))}
          </div>

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
        <div className=''>
            {certificates.map((certificate) => (
        <div key={certificate.id} className="cert">
          <p>Certifikat-ID: {certificate.id}</p>
          <p>Kategori: {certificate.category}</p>
          <p>Certifikat: {certificate.certName}</p>
          <p>Pris: {certificate.price} kr</p>
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
          <div className=''>
            {testtimes.map((testtime) => (
              <div key={testtime.id} className="cert">
                <p>Testtid-ID: {testtime.id}</p>
                <p>Kategori: {testtime.category}</p>
                <p>Certifikat: {testtime.certName}</p>
                <p>Pris: {testtime.price} kr</p>
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
        <div className="mb-3">
          <label className="form-label">Certifierings-ID</label>
          <input
            type="number"
            className="form-control text-center"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Startdatum för test</label>
          <input
            type="datetime-local"
            className="form-control text-center"
            value={starttime}
            onChange={(e) => setStarttime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Slutdatum för test</label>
          <input
            type="datetime-local"
            className="form-control text-center"
            value={endtime}
            onChange={(e) => setEndtime(e.target.value)}
            min={starttime}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">➕ Lägg till</button>
        </div>
      </form>

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
          <label className="form-label">Nytt startdatum för test</label>
          <input
            type="datetime-local"
            className="form-control text-center"
            value={starttime}
            onChange={(e) => setStarttime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nytt slutdatum för test</label>
          <input
            type="datetime-local"
            className="form-control text-center"
            value={endtime}
            onChange={(e) => setEndtime(e.target.value)}
            min={starttime}
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

        <div className="mb-3">
          <label className="form-label">Startdatum för test</label>
          <input
            type="datetime-local"
            className="form-control text-center"
            value={starttime}
            onChange={(e) => setStarttime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Slutdatum för test</label>
          <input
            type="datetime-local"
            className="form-control text-center"
            value={endtime}
            onChange={(e) => setEndtime(e.target.value)}
            min={starttime}
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
        <div className=''>
          {category.map((x) => (
            <div key={x.id} className="cert">
              <p>Kategori ID: {x.id}</p>
              <p>Kategori: {x.name}</p>
              <p>Beskrivning: {x.description}</p>
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
