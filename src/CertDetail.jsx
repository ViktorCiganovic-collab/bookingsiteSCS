import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './styling/CertDetail.css';
import Table from 'react-bootstrap/Table';
import { FaCheck } from 'react-icons/fa';

export default function CertDetail() {
  const { certname, description, certtestprice, certcategory } = useParams();
  const decodedCertName = decodeURIComponent(certname);
  const { t } = useTranslation();

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [alltesttimes, setAlltesttimes] = useState([]);
  const [toggleTesttimes, setToggleTesttimes] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5011/api/category');
        setCategory(res.data);
      } catch (error) {
        console.error('Kunde inte hämta kurser:', error);
        setCategory([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category.length > 0) {
      // certcategory kommer från url som string, så konvertera till number om id är number
      const catId = Number(certcategory);
      const foundCategory = category.find((cat) => cat.id === catId);
      setSelectedCategory(foundCategory);
    }
  }, [category, certcategory]);

  useEffect(() => {
  axios.get('http://localhost:5011/api/examdate')
    .then((res) => {
      const formattedTestTimes = res.data.map((testtime) => {
        // Combine testDate (YYYY-MM-DD) with time (HH:mm:ss)
        const startTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examStartingTime}`;
        const endTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examEndingTime}`;

        
        
        // Check the strings before creating Date objects
        console.log("Start time string:", startTimeString);
        console.log("End time string:", endTimeString);
        
        const startTime = new Date(startTimeString);  // Parse the combined string
        const endTime = new Date(endTimeString);      // Parse the combined string

        // Check if parsing was successful
        if (isNaN(startTime)) {
          console.error("Invalid start time:", startTimeString);
        }
        if (isNaN(endTime)) {
          console.error("Invalid end time:", endTimeString);
        }

        // Format the start and end times if valid
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

        // Return the formatted testtime object
        return {
          ...testtime,
          formattedStartTime,
          formattedEndTime,
        };
      });

      setAlltesttimes(formattedTestTimes);  // Store the formatted times in state
    })
    .catch(err => console.error("Error fetching exam dates:", err));
}, []);


 
  return (
    <div>
    <section className="py-5 detailSection">
      <Container>
        <Row>
          <Col md={5} className='text-center'>
          <h1>{decodedCertName}</h1>
          <h3>Kurskategori:{' '}
              {selectedCategory ? selectedCategory.name : 'Laddar kategori...'}</h3>
          <p>{description}</p>
          </Col>

          <Col md={5}>
  <div className="bg-light p-4 rounded shadow-sm">
    <h5 className="mb-4 text-dark">Kursfakta</h5>
    <table className="table table-borderless table-sm mb-4">
      <tbody>
        <tr>
          <td><strong>Typ</strong></td>
          <td>Online</td>
        </tr>
        <tr>
          <td><strong>Längd</strong></td>
          <td>1 tillfälle, 01:15 h</td>
        </tr>
        
        <tr>
          <td><strong>Ord.pris</strong></td>
          <td>    {alltesttimes.length > 0 && alltesttimes[0].price
      ? `${alltesttimes[0].price} kr exkl. moms`
      : 'Pris ej tillgängligt'}</td>
        </tr>
        <tr>
          <td><strong>Rabatt</strong></td>
          <td>{alltesttimes.some((test) => test.discountActive) ? 'Kampanj – upp till 50% på vissa testtider (se nedan)' : 'Nej'}</td>
        </tr>
        <tr>
          <td><strong>Klippkort</strong></td>
          <td><FaCheck style={{ color: 'green' }} /></td>
        </tr>        
        <tr>
          <td><strong>Antal tillfällen</strong></td>
          <td>{alltesttimes.length} tillfällen</td>
        </tr>
      </tbody>
    </table>
    <Button variant="primary" className="w-100" onClick={() => setToggleTesttimes(!toggleTesttimes)}>
      Boka certifiering
    </Button>
  </div>
</Col>


      
        </Row>

        {toggleTesttimes && (

          <Row>
          <Col md={12}>
          <Table striped bordered hover className="mt-4 rounded-5">
            <thead>
              <tr>
              <th>Testdatum</th>    
              <th>Platser kvar</th>
              <th>Ditt pris</th>
              <th>Boka tid</th>
              </tr>                   
            </thead>

            <tbody>
              {alltesttimes.map((testtime, index) => (
                <tr key={testtime.id}>
                  <td>{testtime.formattedStartTime} - {testtime.formattedEndTime}</td>
                  <td>{testtime.slots}</td>                    
                  <td>{testtime.finalPrice} SEK</td>
                  <td><button className="btn btn-primary" style={{ padding: "5px", borderRadius: "5px" }}>Länk</button></td>               
                </tr>
              ))}

            </tbody>
          </Table>
          </Col>
        </Row>

        )}
        
      </Container>
    </section>
   
    </div>

    
  );
}
