import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './styling/CertDetail.css';

export default function CertDetail() {
  const { certname, description, certtestprice, certcategory } = useParams();
  const decodedCertName = decodeURIComponent(certname);
  const { t } = useTranslation();

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 

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
 
  return (
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
          <td>Öppen</td>
        </tr>
        <tr>
          <td><strong>Längd</strong></td>
          <td>1 tillfälle, 01:15 h</td>
        </tr>
        <tr>
          <td><strong>Ditt pris</strong></td>
          <td>750 kr exkl. moms</td>
        </tr>
        <tr>
          <td><strong>Ord.pris</strong></td>
          <td>{certtestprice} kr exkl. moms</td>
        </tr>
        <tr>
          <td><strong>Rabatt</strong></td>
          <td>Kampanj, 50%</td>
        </tr>
        <tr>
          <td><strong>Klippkort</strong></td>
          <td>Ja</td>
        </tr>
        <tr>
          <td><strong>Planerad</strong></td>
          <td>1 orter</td>
        </tr>
        <tr>
          <td><strong>Antal tillfällen</strong></td>
          <td>9 tillfällen</td>
        </tr>
      </tbody>
    </table>
    <Button variant="primary" className="w-100">
      Boka certifiering
    </Button>
  </div>
</Col>


      
        </Row>
      </Container>
    </section>
  );
}
