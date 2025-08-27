import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './styling/CertDetail.css';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CertDetail() {
  const { certname, description, certtestprice, certcategory } = useParams();
  const decodedCertName = decodeURIComponent(certname);
  const { t } = useTranslation();

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alltesttimes, setAlltesttimes] = useState([]);
  const [toggleTesttimes, setToggleTesttimes] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hämta kategorier
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

  // Hitta vald kategori
  useEffect(() => {
    if (category.length > 0) {
      const catId = Number(certcategory);
      const foundCategory = category.find((cat) => cat.id === catId);
      setSelectedCategory(foundCategory);
    }
  }, [category, certcategory]);

  // Hämta testtider direkt när sidan laddas
  useEffect(() => {
    const fetchTestTimes = async () => {
      try {
        const res = await axios.get('http://localhost:5011/api/examdate');

        const formattedTestTimes = res.data.map((testtime) => {
          const startTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examStartingTime}`;
          const endTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examEndingTime}`;

          const startTime = new Date(startTimeString);
          const endTime = new Date(endTimeString);

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

          return {
            ...testtime,
            formattedStartTime,
            formattedEndTime,
          };
        });

        setAlltesttimes(formattedTestTimes);
      } catch (error) {
        console.error('Fel vid hämtning av testtider:', error);
      }
    };

    fetchTestTimes();
  }, []);

  // Klickhantering för att visa/dölja tider
  const handleToggleBooking = () => {
    if (alltesttimes.length === 0) {
      setLoading(true);
    }
    setToggleTesttimes((prev) => !prev);
  };

  // Inaktivera loading när data är laddad och listan visas
  useEffect(() => {
    if (toggleTesttimes && alltesttimes.length > 0) {
      setLoading(false);
    }
  }, [toggleTesttimes, alltesttimes]);

  return (
    <div>
      <section className="py-5 detailSection">
        <Container>
          <Row>
            <Col md={5} className="text-center">
              <h1>{decodedCertName}</h1>
              <h3>
                Kurskategori:{' '}
                {selectedCategory ? selectedCategory.name : 'Laddar kategori...'}
              </h3>
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
  <td>
    {alltesttimes.length === 0 ? (
      <Spinner animation="border" size="sm" />
    ) : alltesttimes[0].price ? (
      `${alltesttimes[0].price} kr exkl. moms`
    ) : (
      'Pris ej tillgängligt'
    )}
  </td>
</tr>

<tr>
  <td><strong>Rabatt</strong></td>
  <td>
    {alltesttimes.length === 0 ? (
      <Spinner animation="border" size="sm" />
    ) : alltesttimes.some((test) => test.discountActive) ? (
      'Kampanj – upp till 50% på vissa testtider (se nedan)'
    ) : (
      'Nej'
    )}
  </td>
</tr>

<tr>
  <td><strong>Antal tillfällen</strong></td>
  <td>
    {alltesttimes.length === 0 ? (
      <Spinner animation="border" size="sm" />
    ) : (
      `${alltesttimes.length} tillfällen`
    )}
  </td>
</tr>

                  </tbody>
                </table>

                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleToggleBooking}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{' '}
                      {t('loading_cert', 'Laddar certifikat...')}
                    </>
                  ) : (
                    'Boka certifiering'
                  )}
                </Button>
              </div>
            </Col>
          </Row>

          {loading && (
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">{t('loading_bookings', 'Laddar bokningar...')}</p>
            </div>
          )}

          {toggleTesttimes && !loading && (
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
                    {alltesttimes.map((testtime) => (
                      <tr key={testtime.id}>
                        <td>{testtime.formattedStartTime} - {testtime.formattedEndTime}</td>
                        <td>{testtime.slots}</td>
                        <td>{testtime.finalPrice} SEK</td>
                        <td>
                          <Link to={`/booking/${certcategory}/${encodeURIComponent(certname)}/${testtime.id}/${testtime.finalPrice}`}>
                          <button className="btn btn-primary" style={{ padding: '5px', borderRadius: '5px' }}>
                            {t('book_time')}
                          </button>
                          </Link>
                        </td>
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
