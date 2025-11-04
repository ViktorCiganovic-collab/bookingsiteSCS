import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './styling/CertDetail.css';
import { translationKeys } from './translationMap';

export default function CertDetail() {
  const { certname, description, certcategory, certtestprice, certid } = useParams();
  const decodedCertName = decodeURIComponent(certname);
  const { t } = useTranslation();

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alltesttimes, setAlltesttimes] = useState([]);
  const [toggleTesttimes, setToggleTesttimes] = useState(false);
  const [cert, setCert] = useState();
  const [loading, setLoading] = useState(false);

  // Hämta kategorier
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://scservices.se/api/category');
        setCategory(res.data);
      } catch (error) {
        console.error('Kunde inte hämta kurser:', error);
        setCategory([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCert = async () => {
    try {
      const res = await axios.get(`https://scservices.se/api/cert/${certid}`);
      setCert(res.data);
    } catch (err) {
      console.error('Fel vid hämtning av certifikat:', err);
    }
  };
    fetchCert();
  }, [certid]);

  const descriptionKey = translationKeys[description] || description;

  // Hitta vald kategori
  useEffect(() => {
    if (category.length > 0) {
      const catId = Number(certcategory);
      const foundCategory = category.find((cat) => cat.id === catId);
      setSelectedCategory(foundCategory);
    }
  }, [category, certcategory]);

  // Hämta testtider
  useEffect(() => {
    const fetchTestTimes = async () => {
      try {
        const res = await axios.get('https://scservices.se/api/examdate');

        const formattedTestTimes = res.data.map((testtime) => {
          const startTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examStartingTime}`;
          const endTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examEndingTime}`;

          const startTime = new Date(startTimeString);
          const endTime = new Date(endTimeString);

          const now  = Date.now();
          const examStart = startTime.getTime();

          if (now < examStart) {

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
        } return null;
        }).filter(times => times != null)

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

  // Inaktivera loading när data är laddad
  useEffect(() => {
    if (toggleTesttimes && alltesttimes.length > 0) {
      setLoading(false);
    }
  }, [toggleTesttimes, alltesttimes]);

  return (
    <div>
      <section className="py-5 detailSection">
        <Container>
          <Row className='content'>
            <Col md={5} className="text-center">
              <h1>{decodedCertName}</h1>
              <h3>
                {t('course_category')}: {selectedCategory ? selectedCategory.name : t('loading_category')}
              </h3>
              <p>{t(descriptionKey)}</p>
            </Col>

            <Col md={5}>
              <div className="bg-light p-4 rounded courseFacts">
                <h5 className="mb-4 text-dark">{t('course_facts')}</h5>
                <table className="table table-borderless table-sm mb-4">
                  <tbody>
                    <tr>
                      <td><strong>{t('type')}</strong></td>
                      <td>Online</td>
                    </tr>
                    <tr>
                      <td><strong>{t('length')}</strong></td>
                      <td>1 {t('session')}, 01:15 h</td>
                    </tr>
                    <tr>
                    <td><strong>{t('regular_price')}</strong></td>
                    <td>
                      {cert ? (
                        <>
                          {cert.isDiscount ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                                {cert.price} kr
                              </span>{' '}
                              <span className="badge bg-success ms-2">-50%</span>{' '}
                              <strong>{cert.price * 0.5} kr</strong> exkl. moms
                            </>
                          ) : (
                            <>
                              {cert.price} kr exkl. moms
                            </>
                          )}
                        </>
                      ) : (
                        <Spinner animation="border" size="sm" />
                      )}
                    </td>
                  </tr>

                    <tr>
                    <td><strong>{t('discount')}</strong></td>
                    <td>
                      {cert ? (
                        cert.isDiscount ? (
                          <span className="badge bg-success">{t('campaign_info')}</span>
                        ) : (
                          <span className="text-muted">Nej</span>
                        )
                      ) : (
                        <Spinner animation="border" size="sm" />
                      )}
                    </td>
                  </tr>

                    <tr>
                      <td><strong>{t('number_of_sessions')}</strong></td>
                      <td>
                        {alltesttimes.length === 0 ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          `${alltesttimes.length} ${alltesttimes.length > 1 ? t('sessions') : t('session')}`
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
                  style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '1rem' }}
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{' '}
                      {t('loading_cert', 'Laddar certifikat...')}
                    </>
                  ) : (
                    t('book_certification')
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
                {/* Desktop/tabell-layout */}
                <div className="responsive-table-wrapper d-none d-md-block">
                  <Table striped bordered hover className="mt-4 rounded-5">
                    <thead>
                      <tr>
                        <th>{t('test_date')}</th>
                        <th>{t('slots_left')}</th>
                        <th>{t('your_price')}</th>
                        <th>{t('book_header')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alltesttimes.map((testtime) => (
                        <tr key={testtime.id}>
                          <td>{testtime.formattedStartTime} - {testtime.formattedEndTime}</td>
                          <td>
                            <span className={`slots-badge ${testtime.slots === 0 ? "full" : ""}`}>
  {testtime.slots > 0 ? `${testtime.slots} ${t('slots_left')}` : t('fully_booked')}
</span>
                          </td>
                          <td>
                            {cert.isDiscount ? cert.price * 0.5 : cert.price} SEK{' '}
                            {cert.isDiscount && (
                              <span className="discount-badge">
                                -{50}%
                              </span>
                            )}
                          </td>
                          <td>
                          <Link
                          to={`/booking/${certcategory}/${encodeURIComponent(certname)}/${testtime.id}/${cert.isDiscount ? cert.price * 0.5 : cert.price}`}
                          className="btn btn-primary"
                          role="button"
                        >
                          {t('book_time')}
                        </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {/* Mobil/kort-layout */}
                <div className="d-md-none">
                  {alltesttimes.map((testtime) => (
                    <div className="mobile-card" key={testtime.id}>
                      <h5>{testtime.formattedStartTime} - {testtime.formattedEndTime}</h5>
                      <div className='slotsDIv'>
                        <span className={`slots-badge ${testtime.slots === 0 ? "full" : ""}`}>
                        {testtime.slots > 0 ? `${testtime.slots} ${t('slots_left')}` : t('fully_booked')}
                      </span>
                      </div>
                      <p className="price">
                        {cert.isDiscount ? cert.price * 0.5 : cert.price} SEK{' '}
                        {cert.isDiscount && (
                          <span className="discount-badge">
                            -{50}%
                          </span>
                        )}
                      </p>
                           <Link
                        to={`/booking/${certcategory}/${encodeURIComponent(certname)}/${testtime.id}/${cert.isDiscount ? cert.price * 0.5 : cert.price}`}
                        className="btn btn-primary w-100 mt-2"
                        role="button"
                      >
                        {t('book_time')}
                      </Link>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
}
