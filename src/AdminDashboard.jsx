import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styling/AdminDashboard.css';
import { useTranslation } from 'react-i18next'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './components/AuthProvider';
import axios from "axios";


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

    const Openformfornewtesttimes = () => {
    setAddTestTimeForm(!addTestTimeForm);
    }

    const openformforupdatingtesttimes = () => {
    setAddUpdateTestTimeForm(!addUpdateTestTimeForm);
    setAddTestTimeForm(false);
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
      setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);      
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
        setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
  }

    }

    const openformDeleteTesttime = async () => {
        setDeleteFormVisible(!deleteFormVisible);
        setAddUpdateTestTimeForm(false);
        setAddTestTimeForm(false);

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

            const deletedTesttime = {
            id: Number(testTimeId),  // testtidens id
            examStartingTime: starttime,
            examEndingTime: endtime,
        };

        try {
        
        const res = await axios.delete(`http://3.90.225.16:5011/api/ExamDate/${testTimeId}`)
        
        setResponse('Testtiden har raderats!');
        setError(null);

        }   

        catch (error) {
        setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
  }
    }

    const viewTesttimes = async () => {
  const newState = !certsDisplayed;
  setCertsDisplayed(newState);

  if (newState) {
    try {
      const result = await axios.get('http://3.90.225.16:5011/api/ExamDate');
      setCertificates(result.data);
      console.log(result.data);
      setError(null);
    } catch (error) {
      setError(`Något gick fel: ${error.message || "Vänligen försök igen senare."}`);
    }
  }
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
                        <button className="btn btn-primary">Redigera certifikat</button>
                        <button className="btn btn-primary">Lägg till certifikat</button>
                        <button className='btn btn-primary'>Se alla certifikat</button>
                    </div>
                )}
            </div>  

            <div className='box box3 p-2' onClick={() => toggleBox('box3')}>
                <h1>{t('edit_test_times')}</h1>

                    {isOpen === 'box3' && (
                    <div className={`box-content open`}>
                        <button className='btn btn-primary'  onClick={(e) => {e.stopPropagation(); viewTesttimes();}}>Se alla testtillfällen</button>
                        <button className="btn btn-primary" onClick={openformforupdatingtesttimes}>Uppdatera testtider</button>
                        <button className="btn btn-primary" onClick={Openformfornewtesttimes}>Lägg till testtider</button>
                        <button className='btn btn-primary' onClick={openformDeleteTesttime}>Radera en testtid</button>
                    </div>
                )}
                {certsDisplayed && (<div onClick={e => e.stopPropagation()} className='d-flex justify-content-center flex-column align-items-center'>

                    <button className="btn btn-primary" onClick={() => setCertsDisplayed(!certsDisplayed)}>Go Back</button>
                    <h2 className='text-center my-2'>Alla inlagda testtider</h2>

                      {certificates.map((certificate, index) => (
                        <div className='text-center'>
                        <p key={index}>{certificate.certName}</p>
                        <p>Test id: {certificate.id}</p>
                        <p>Testtid: {certificate.examStartingTime} - {certificate.examEndingTime}</p>
                        <p>Pris: {certificate.price} SEK</p>
                        <p></p>
                        <div className='grey_line'></div>
                        </div>
                    ))}

                </div>)}
                {/* Form for adding test times */}
                {addTestTimeForm && (
                    <div className='d-flex justify-content-center flex-column align-items-center'>
                    <h3 className='text-center'>Lägg till testtillfälle</h3>
                    <button className="btn btn-primary" onClick={() => setAddTestTimeForm(!addTestTimeForm)}>Go Back</button>
                    <form onSubmit={Addnewtesttime} className='d-flex flex-column justify-content-center align-items-center'>

                        <label htmlFor="name">Cert Id:</label>
                        <input className='my-2' value={certId} onChange={(event) => setCertId(event.target.value)} type="number"></input>
                        
                        <label htmlFor="name">Startdatum för test:</label>
                        <input className='my-2' value={starttime} onChange={(event) => setStarttime(event.target.value)} type="datetime-local"></input>
                        
                        <label htmlFor="name">Slutdatum för test:</label>
                        <input className='my-2' min={starttime} value={endtime} onChange={(event) => setEndtime(event.target.value)} type="datetime-local"></input>
                        <button type="submit" className='btn btn-primary mt-3 p-3'>Lägg till</button>
                    </form>
                    {response && <p>Testtiden har lagts till</p>}
                    {error && <p className="error-message">{error}</p>}
                    </div>
                )}
                {/* Form for adding test times */}
                {addUpdateTestTimeForm && (
                                        <div onClick={e => e.stopPropagation()} className='d-flex justify-content-center flex-column align-items-center'>
                    <h3 className='text-center'>Uppdatera ett testtillfälle</h3>
                    <button className="btn btn-primary" onClick={() => setAddUpdateTestTimeForm(!addUpdateTestTimeForm)}>Go Back</button>
                    <form onSubmit={UpdateTesttime} className='d-flex flex-column justify-content-center align-items-center'>

                        <label>Testtidens ID:</label>
                        <input className='my-2' value={testTimeId} onChange={(e) => setTestTimeId(e.target.value)} type="number" />
                        
                        <label htmlFor="name">Nytt startdatum för test:</label>
                        <input className='my-2' value={starttime} onChange={(event) => setStarttime(event.target.value)} type="datetime-local"></input>
                        
                        <label htmlFor="name">Nytt slutdatum för test:</label>
                        <input className='my-2' min={starttime} value={endtime} onChange={(event) => setEndtime(event.target.value)} type="datetime-local"></input>
                        <button type="submit" className='btn btn-primary mt-3 p-3'>Lägg till</button>
                    </form>
                    {response && <p>Testtiden har lagts till</p>}
                    {error && <p className="error-message">{error}</p>}
                    </div>
                )}
                {deleteFormVisible && (<div onClick={e => e.stopPropagation()} className='d-flex justify-content-center flex-column align-items-center'>
                    <button className="btn btn-primary" onClick={() => setDeleteFormVisible(false)}>Go Back</button>
                    <form className='d-flex flex-column justify-content-center align-items-center' onSubmit={DeleteTesttime}>
                        <label>Testtidens ID:</label>
                        <input className='my-2' value={testTimeId} onChange={(e) => setTestTimeId(e.target.value)} type="number" />

                        <label htmlFor="name">startdatum för test:</label>
                        <input className='my-2' value={starttime} onChange={(event) => setStarttime(event.target.value)} type="datetime-local"></input>

                        <label htmlFor="name">Slutdatum för test:</label>
                        <input className='my-2' min={starttime} value={endtime} onChange={(event) => setEndtime(event.target.value)} type="datetime-local"></input>
                        <button type="submit" className='btn btn-primary mt-3 p-3'>Radera testtid</button>
                    </form>
                    {response && <p>Testtiden har raderats</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>)}
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