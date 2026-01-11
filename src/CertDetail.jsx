import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './styling/CertDetail.css';
import { translationKeys } from './translationMap';
import { Helmet } from "react-helmet-async";

export default function CertDetail() {
const { categorySlug, certSlug, id, categoryId } = useParams();
  // const decodedCertName = decodeURIComponent(certname);
  const { t } = useTranslation();

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alltesttimes, setAlltesttimes] = useState([]);
  const [toggleTesttimes, setToggleTesttimes] = useState(false);
  const [cert, setCert] = useState(null);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [relatedCerts, setRelatedCerts] = useState([]);

  console.log("CertID i frontend:", id);


  // Hämta kategorier
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://certbe-backend.onrender.com/api/category');
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
    setLoading(true);
    try {
      
      const resAll = await axios.get('https://certbe-backend.onrender.com/api/cert');
      const allCerts = resAll.data;
      setCerts(allCerts);
     
    const certificate = allCerts.find(c => c.id === Number(id));

        if (!certificate) {
    console.error("Certifikatet hittades inte:", id);
    setLoading(false);
    return;
    }

      
      const resDetail = await axios.get(
        `https://certbe-backend.onrender.com/api/cert/${certificate.id}`
      );
      setCert(resDetail.data);
      
    } catch (err) {
      console.error('Fel vid hämtning av certifikat:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchCert();
}, [id]);


  useEffect(() => {
  if (cert) console.log(cert.linkToCertInfo);
}, [cert]);


 const descriptionKey = cert 
  ? (translationKeys[cert.description] ?? cert.description) 
  : 'loading_description';

  // Hitta vald kategori
  useEffect(() => {
    if (category.length > 0) {
      const catId = Number(categoryId);
      const foundCategory = category.find((cat) => cat.id === catId);
      setSelectedCategory(foundCategory);
    }
  }, [category, categoryId]);

  // Hämta testtider
  useEffect(() => {
    const fetchTestTimes = async () => {
      try {
        const res = await axios.get('https://certbe-backend.onrender.com/api/examdate');

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 

        const formattedTestTimes = res.data.map((testtime) => {
          const startTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examStartingTime}`;
          const endTimeString = `${testtime.testDate.split('T')[0]}T${testtime.examEndingTime}`;

          const startTime = new Date(startTimeString);
          const endTime = new Date(endTimeString);

          const testDay = new Date(
          startTime.getFullYear(),
          startTime.getMonth(),
          startTime.getDate()
        );          

          // Check if parsing was successful
        if (isNaN(startTime)) {
          console.error("Invalid start time:", startTimeString);
        }
        if (isNaN(endTime)) {
          console.error("Invalid end time:", endTimeString);
        }          

          if (testDay > today) {

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

  useEffect(() => {
  if (!cert || certs.length === 0) return;

  const filtered = certs
    .filter(c => c.categoryId === cert.categoryId && c.id !== cert.id)
    .slice(0, 3);

  setRelatedCerts(filtered);
}, [cert, certs]);




  
  return (
    <div>

          <Helmet>
  <title>
    {cert 
      ? `${cert.name} – ${selectedCategory?.name} certifiering | SCS`
      : "Certifiering | SCS"}
  </title>

  <meta
    name="description"
    content={
      cert
        ? `Boka ${cert.name} certifiering inom ${selectedCategory?.name}. Officiellt prov, flexibla datum och snabb bokning hos SCS.`
        : "Certifieringar hos SCS."
    }
  />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={cert ? `${cert.name} – ${selectedCategory?.name} certifiering | SCS` : "Certifiering | SCS"} />
  <meta property="og:description" content={cert ? `Boka ${cert.name} certifiering inom ${selectedCategory?.name}. Officiellt prov, flexibla datum och snabb bokning hos SCS.` : "Certifieringar hos SCS."} />
  <meta property="og:url" content={`https://www.scservices.se/certifiering/${selectedCategory?.slug}/${cert?.slug}/${cert?.id}/${cert?.categoryId}`} />
  <meta property="og:site_name" content="SCS" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={cert ? `${cert.name} – ${selectedCategory?.name} certifiering | SCS` : "Certifiering | SCS"} />
  <meta name="twitter:description" content={cert ? `Boka ${cert.name} certifiering inom ${selectedCategory?.name}. Officiellt prov, flexibla datum och snabb bokning hos SCS.` : "Certifieringar hos SCS."} />

  {/* Canonical */}
  <link
    rel="canonical"
    href={`https://www.scservices.se/certifiering/${selectedCategory?.slug}/${cert?.slug}/${cert?.id}/${cert?.categoryId}`}
  />

  {/* Course Schema */}
  {cert && (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        name: cert.name,
        description: cert.description,
        provider: {
          "@type": "Organization",
          name: "SCS",
          sameAs: "https://www.scservices.se",
        },
        url: `https://www.scservices.se/certifiering/${selectedCategory?.slug}/${cert.slug}/${cert.id}/${cert.categoryId}`,
      })}
    </script>
  )}

  {/* Breadcrumb Schema */}
  {cert && selectedCategory && (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Certifieringar",
            "item": "https://www.scservices.se/certifiering"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": selectedCategory.name,
            "item": `https://www.scservices.se/certifiering/${selectedCategory.slug}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": cert.name,
            "item": `https://www.scservices.se/certifiering/${selectedCategory.slug}/${cert.slug}/${cert.id}/${cert.categoryId}`
          }
        ]
      })}
    </script>
  )}
</Helmet>




      <section className="py-5 detailSection">
        <Container>
          <Row className='content'>
            <Col md={5} className="text-center">
              <h1>{cert?.name}</h1>
              <h3>
              <Link to={`/certifiering/#certifications`}>

                  {selectedCategory ? selectedCategory.name : t('loading_category')}</Link>
              </h3>
              <p>{t(descriptionKey)}</p>

            <h4>
            {cert ? (
              <a
                href={cert?.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="certiport-link"
              >
                {t('link_to_certiport', { certName: cert.name })}
              </a>
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </h4>

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
                              <strong>{cert.price * 0.5} kr</strong> {t('price_incl_vat')}
                            </>
                          ) : (
                            <>
                              {cert.price} kr {t('price_incl_vat')}
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
                            {testtime.slots === 0 
                              ? t('fully_booked') 
                              : testtime.slots > 5 
                                ? t('slotsMoreThanFive') 
                                : `${testtime.slots} ${t('slots_left')}`}
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
                          to={`/booking/${categoryId}/${encodeURIComponent(cert.name)}/${testtime.id}/${cert.isDiscount ? cert.price * 0.5 : cert.price}`}
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

                        {Number(testtime.slots) === 0 
                        ? t('fully_booked') 
                        : Number(testtime.slots) > 5 
                          ? t('slotsMoreThanFive') 
                          : `${Number(testtime.slots)} ${t('slots_left')}`}

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
                        to={`/booking/${categoryId}/${encodeURIComponent(cert.cetName)}/${testtime.id}/${cert.isDiscount ? cert.price * 0.5 : cert.price}`}
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