import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import './styling/AdminDashboard.css';
import { useTranslation } from 'react-i18next'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './services/AuthProvider';
import FilterArrayByCourseCategory from './services/filterArrayByCourseCategory';
import Spinner from 'react-bootstrap/Spinner';


const AdminDashboard = () => {
    const { t } = useTranslation(); 
    const [isOpen, setIsOpen] = useState(null);
    const [show, setShow] = useState(false);
    const { role, setRole, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [addTestTimeForm, setAddTestTimeForm] = useState(false); 
    const [certId, setCertId] = useState('');
    const [starttime, setStarttime] = useState('');
    const [endtime, setEndtime] = useState('');
    const [error, setError] = useState(false);
    const [response, setResponse] = useState('');
    const [addUpdateTestTimeForm, setAddUpdateTestTimeForm] = useState(false);
    const [testTimeId, setTestTimeId] = useState('');
    const [deleteFormVisible, setDeleteFormVisible] = useState(false);
    const [certsDisplayed, setCertsDisplayed] = useState(false);
    const [certificates, setCertificates] = useState([]);
    const [coursesDisplayed, setCoursesDisplayed] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingtesttimes, setLoadingtesttimes] = useState(false);
    const [displaycertificates, setDisplaycertificates] = useState();
    const [coursenames, setCoursenames] = useState([]);
    const [selectedcourse, setSelectedcourse] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(999);
    const [deletepanel, setDeletepanel] = useState(false);
    const [editpanel, setEditpanel] = useState(false);
    const [bookingspanel, setBookingspanel] = useState(false);
    const [bookings, setBookings] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
      setIsAuthenticated(false);
      setRole('');
      navigate('/login');
      console.log('You have logged out');
    }

    const toggleBox = (boxName) => {
      if (addTestTimeForm) {
        // Om formuläret är öppet, gör inget när man klickar på boxen
        return;
      }
      setIsOpen(prev => (prev === boxName ? null : boxName));        
    };

    useEffect(() => {
      if (isOpen === null) {
        setLoading(false);
        setLoadingtesttimes(false);
      }
    }, [isOpen]);

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const res = await axios.get('http://3.90.225.16:5011/api/course');
          setCoursenames(res.data);
        } catch (error) {
          console.error('Kunde inte hämta kurser:', error);
          setCoursenames([]); // för att inte lämna den odefinierad
        }
      };

      fetchCourses();
    }, []);


    const Openformfornewtesttimes = () => {
      if (!addTestTimeForm) {        
        setAddTestTimeForm(true);
        setAddUpdateTestTimeForm(false);
        setCertsDisplayed(false);
        setDeleteFormVisible(false);

      } else {
        setAddTestTimeForm(false); // Om det redan är öppet, stäng det
      }
    };

    const openformforupdatingtesttimes = () => {
      setAddUpdateTestTimeForm(!addUpdateTestTimeForm);
      setAddTestTimeForm(false);
      setCoursesDisplayed(false);
      setCertsDisplayed(false);
      setDeleteFormVisible(false);
    }

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
    }

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
    }

    const openformDeleteTesttime = async () => {
      setDeleteFormVisible(!deleteFormVisible);
      setAddUpdateTestTimeForm(false);
      setAddTestTimeForm(false);
      setCertsDisplayed(false);
    }

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
    }

    const viewTesttimes = async () => {
      const newState = !certsDisplayed;
      const loadingState = !loadingtesttimes;
      setLoadingtesttimes(loadingState);
      setCertsDisplayed(newState);
      setAddTestTimeForm(false);
      setAddUpdateTestTimeForm(false);
      setDeleteFormVisible(false);      

      if (newState) {
        try {
          const result = await axios.get('http://3.90.225.16:5011/api/ExamDate');
          setCertificates(result.data);
          console.log(result.data);
          setError(null);
          setLoadingtesttimes(false);

        } catch (error) {
          setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
        }
      }
    };

    const viewCourses = async () => {
      const newState = !coursesDisplayed;
      const loadingstate = !loading;
      setLoading(loadingstate);
      setDeletepanel(false);  
      setDisplaycertificates(false);
      setCoursesDisplayed(newState);
      setEditpanel(false);

      if (newState) {    

        try {
          const res = await axios.get('http://3.90.225.16:5011/api/cert');
          setCourses(res.data);
          console.log(res.data);
          setError(null);
          setLoading(false);
        }
        catch (error) {
          setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
        }
      }
    }

    const Openfordeletecertificates = async () => {
    setDisplaycertificates(false);
    setCoursesDisplayed(false);
    setDeletepanel(!deletepanel);    
    }

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

    }

    const openCertificates = async () => {
      const newState = !displaycertificates;
      setDeletepanel(false);
      setCoursesDisplayed(false);
      setDisplaycertificates(newState);
      setEditpanel(false);

      if (newState) {
        try {
          const res = await axios.get('http://3.90.225.16:5011/api/category');
          setCoursenames(res.data);
          console.log(res.data);
          setError(null);
        }

        catch (error) {
          setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
        }
      }
    }

  const addCertificate = async (event) => {
  event.preventDefault();

  if (!name || !selectedcourse || !price) {
    setError('Vänligen fyll i alla fält och ladda upp en bild!');
    return;
  }  

  const certificate = {
    CategoryId: selectedcourse,
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
    setSelectedcourse('');
    setPrice('');
    setResponse(true);
  } catch (error) {
    setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
  }
};

const Openeditcertificates = () => {
setEditpanel(!editpanel);
setDisplaycertificates(false);
setCoursesDisplayed(false);
}

const Editcertificate = async (e) => {
  e.preventDefault();

  if (!certId || !selectedcourse || !name || !price) {
    setError('Vänligen fyll i alla fält!');
    return;
  }

  const updatedCertificate = {
    Id: Number(certId),
    CategoryId: Number(selectedcourse),
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
    setSelectedcourse('');
    setPrice(999);
    setEditpanel(false);

  } catch (error) {
    setError(`Något gick fel: ${error.message || 'Vänligen försök igen senare.'}`);
    setResponse('');
  }
};

const viewBookings = async () => {
  setBookingspanel(true);

  try {
  const res = await axios.get('http://3.90.225.16:5011/api/booking', {
    headers: {
      'Accept': 'application/json'
    }
  });
  setBookings(res.data);
  setError(null);

  }
  catch (error) {
          setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
        }
}

useEffect(() => {
  if (!addTestTimeForm && !addUpdateTestTimeForm && !deleteFormVisible && !deletepanel && !displaycertificates && !editpanel) {
    setError(null);
    setResponse('');
  }
}, [addTestTimeForm, addUpdateTestTimeForm, deleteFormVisible, deletepanel, displaycertificates, editpanel]);

  

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

        <div className='box box1' onClick={() => {toggleBox('box1'); viewBookings();}}>
          <h1>{t('bookings')}</h1>

          {isOpen === 'box1' && (
            <div className="box-content open" style={{padding: '8px'}}>
              {bookingspanel && (
                bookings.map((booking, index) => (
                  <div key={index}>
                    <h3>{booking.customerFirstName} {booking.customerLastName}</h3>
                    <p>{booking.certName} - Tid: {booking.examStartingTime}-{booking.examEndingTime}</p>
                    <div style={{borderBottom: '1px solid grey'}}></div>
                  </div>                  
                ))
              )}
            </div>
          )}
        </div>            

        <div className='box box2' onClick={() => toggleBox('box2')}>
          <h1>{t('editCertificates')}</h1>

          {isOpen === 'box2' && (
            <div className="box-content open">
              <button className="btn btn-primary" onClick={(e) => {e.stopPropagation(); Openeditcertificates();}}>Redigera certifikat</button>
              <button className="btn btn-primary" onClick={(e) => {e.stopPropagation(); openCertificates();}}>Lägg till certifikat</button>
              <button className='btn btn-primary' onClick={(e) => {e.stopPropagation(); Openfordeletecertificates();}}>Radera certifikat</button>
              <button className='btn btn-primary' onClick={(e) => {e.stopPropagation(); viewCourses();}}>Se alla certifikat</button>              
                              
            </div>                    
            )}      

          {editpanel && (<div>            
              <form onSubmit={Editcertificate} className='d-flex justify-content-center flex-column align-items-center'>
              <h3 className='text-center'>Redigera Certifikat</h3>
              <button className="btn btn-primary" onClick={() => setEditpanel(false)}>Go Back</button>

              <label>Certifikat ID:</label>
              <input className="text-center" type="number" value={certId} onChange={(e) => setCertId(e.target.value)}></input>

              <select className="text-center my-2" value={selectedcourse} onChange={(e) => setSelectedcourse(e.target.value)}>
              <option value="">-- Välj kurs --</option>
              {coursenames.map((coursename, index) => (
                <option key={index} value={coursename.id}>{coursename.name}</option>
              ))}
              </select>

              <label>Nytt namn på certifikatet:</label>
              <input className="text-center" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>

              <label>Nytt pris:</label>
              <input className="text-center" type="number" value={price} onChange={(e) => setPrice(e.target.value)}></input>
              <button className='btn btn-primary' type="submit">Redigera certifikat</button>
            </form>
          </div>)}  

          {response && <p className="text-center" style={{ color: 'green' }}>{response}</p>}
          
          {displaycertificates && (<div onClick={(e) => e.stopPropagation()} className='d-flex flex-column justify-content-center align-items-center'>
            <h3 className='text-center'>Lägg till certifikat</h3>
            <button className="btn btn-primary" onClick={() => setDisplaycertificates(false)}>Go Back</button>
            <form onSubmit={addCertificate} className='d-flex justify-content-center flex-column align-items-center'>
              <select className="text-center my-2" value={selectedcourse} onChange={(e) => setSelectedcourse(e.target.value)}>
              <option value="">-- Välj kurs --</option>
              {coursenames.map((coursename, index) => (
                <option key={index} value={coursename.id}>{coursename.name}</option>
              ))}
              </select>
              <label>Namn:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

              <label>Pris:</label>
              <input className='text-center' type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                       
              <button type="submit" className="btn btn-primary mt-3">Skicka</button>
            </form>
            {response && (<p style={{color: 'green'}}>Certifikatet har lagts till</p>)}
            {error && <p style={{color: 'green'}}>Det gick av någon anledning inte att lägga till certifikatet</p>}
          </div>)}     

          {deletepanel && (            
            <form onSubmit={DeleteCertificate} className='d-flex justify-content-center flex-column align-items-center'>
              <h3 className='text-center'>Radera Certifikat</h3>
              <button className="btn btn-primary" onClick={() => setDeletepanel(false)}>Go Back</button>
              <label>Certifikat ID:</label>
              <input type="number" value={certId} onChange={(e) => setCertId(e.target.value)}></input>
              <button className='btn btn-primary'>Radera certifikat</button>
            </form>
          )}

          {response && <p className="text-center" style={{ color: 'green' }}>{response}</p>}
          {error && <p className="text-center" style={{ color: 'red' }}>{error}</p>}
             

          {coursesDisplayed && (
            <div className='text-center'>
              {loading && (
              <div className="text-center my-3">
                <Spinner animation="border" role="status" />
                <p>Laddar kurser...</p>
              </div>
            )}

              <FilterArrayByCourseCategory certArray={courses} />
            </div>
          )}
        </div>  

        <div className='box box3 p-2' onClick={() => toggleBox('box3')}>
          <h1>{t('edit_test_times')}</h1>

          {isOpen === 'box3' && (
            <div className="box-content open" onClick={(e) => e.stopPropagation()}>
              <button className='btn btn-primary' onClick={(e) => { e.stopPropagation(); viewTesttimes(); }}>Se alla testtillfällen</button>
              <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); openformforupdatingtesttimes(); }}>Uppdatera testtider</button>
              <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); Openformfornewtesttimes(); }}>Lägg till testtider</button>
              <button className='btn btn-primary' onClick={(e) => { e.stopPropagation(); openformDeleteTesttime(); }}>Radera en testtid</button>
            </div>
          )}

          {certsDisplayed && (
            <div onClick={e => e.stopPropagation()} className='d-flex justify-content-center flex-column align-items-center'>
              
              <button className="btn btn-primary" onClick={() => setCertsDisplayed(false)}>Go Back</button>
              <h2 className='text-center my-2'>Alla inlagda testtider</h2>
              {loadingtesttimes && (
              <div className="text-center my-3">
                <Spinner animation="border" role="status" />
                <p>Laddar testtider...</p>
              </div>
            )}

              {certificates.map((certificate, index) => (
                <div className='text-center' key={index}>
                  <p>{certificate.certName}</p>
                  <p>Test id: {certificate.id}</p>
                  <p>Testtid: {certificate.examStartingTime} - {certificate.examEndingTime}</p>
                  <p>Pris: {certificate.price} SEK</p>
                  <div className='grey_line'></div>
                </div>
              ))}
            </div>
          )}

          {addTestTimeForm && (
            <div onClick={e => e.stopPropagation()} className='d-flex justify-content-center flex-column align-items-center'>
              <h3 className='text-center'>Lägg till testtillfälle</h3>
              <button className="btn btn-primary" onClick={() => setAddTestTimeForm(false)}>Go Back</button>
              <form onSubmit={Addnewtesttime} className='d-flex flex-column justify-content-center align-items-center'>
                <label>Certiferings Id:</label>
                <input className='my-2' value={certId} onChange={(e) => setCertId(e.target.value)} type="number" />

                <label>Startdatum för test:</label>
                <input className='my-2' value={starttime} onChange={(e) => setStarttime(e.target.value)} type="datetime-local" />

                <label>Slutdatum för test:</label>
                <input className='my-2' min={starttime} value={endtime} onChange={(e) => setEndtime(e.target.value)} type="datetime-local" />
                <button type="submit" className='btn btn-primary mt-3 p-3'>Lägg till</button>
              </form>
              {response && <p>Testtiden har lagts till</p>}
              {error && <p className="error-message">{error}</p>}
            </div>
          )}

          {addUpdateTestTimeForm && (
            <div onClick={e => e.stopPropagation()} className='d-flex justify-content-center flex-column align-items-center'>
              <h3 className='text-center'>Uppdatera ett testtillfälle</h3>
              <button className="btn btn-primary" onClick={() => setAddUpdateTestTimeForm(false)}>Go Back</button>
              <form onSubmit={UpdateTesttime} className='d-flex flex-column justify-content-center align-items-center'>
                <label>Testtidens ID:</label>
                <input className='my-2' value={testTimeId} onChange={(e) => setTestTimeId(e.target.value)} type="number" />

                <label>Nytt startdatum för test:</label>
                <input className='my-2' value={starttime} onChange={(e) => setStarttime(e.target.value)} type="datetime-local" />

                <label>Nytt slutdatum för test:</label>
                <input className='my-2' min={starttime} value={endtime} onChange={(e) => setEndtime(e.target.value)} type="datetime-local" />
                <button type="submit" className='btn btn-primary mt-3 p-3'>Uppdatera</button>
              </form>
              {response && <p>Testtiden har uppdaterats</p>}
              {error && <p className="error-message">{error}</p>}
            </div>
          )}

          {deleteFormVisible && (
            <div onClick={e => e.stopPropagation()} className='d-flex justify-content-center flex-column align-items-center'>
              <h3 className='text-center'>Radera ett testtillfälle</h3>
              <button className="btn btn-primary" onClick={() => setDeleteFormVisible(false)}>Go Back</button>
              <form className='d-flex flex-column justify-content-center align-items-center' onSubmit={DeleteTesttime}>
                <label>Testtidens ID:</label>
                <input className='my-2' value={testTimeId} onChange={(e) => setTestTimeId(e.target.value)} type="number" />

                <label>Startdatum för test:</label>
                <input className='my-2' value={starttime} onChange={(e) => setStarttime(e.target.value)} type="datetime-local" />

                <label>Slutdatum för test:</label>
                <input className='my-2' min={starttime} value={endtime} onChange={(e) => setEndtime(e.target.value)} type="datetime-local" />
                <button type="submit" className='btn btn-primary mt-3 p-3'>Radera testtid</button>
              </form>
              {response && <p>Testtiden har raderats</p>}
              {error && <p className="error-message">{error}</p>}
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
  );
};

export default AdminDashboard;