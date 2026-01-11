
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './styling/InfoPage.css';
import malmö_testcenterImg from './media/malmötestcenter.jpeg'
import FAQSection from './services/FAQAccordion';
import { useTranslation, Trans  } from 'react-i18next';
import { BsInfoCircle } from 'react-icons/bs';
import { Helmet } from "react-helmet-async";

const InfoPage = () => {

const { t } = useTranslation();

return (
    <div className='infoPage'>

      <Helmet>
  {/* Title */}
  <title>How Certiport Exams Work – Information & Requirements | SCS</title>

  {/* Meta Description */}
  <meta
    name="description"
    content="Learn how Certiport IT certification exams work with SCS Sweden. Remote and on-site testing, requirements, practice tests, booking details and Malmö test center information."
  />

  {/* Canonical */}
  <link rel="canonical" href="https://www.scservices.se/info" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="How Certiport Exams Work – Information & Requirements | SCS" />
  <meta property="og:description" content="Everything you need to know about Certiport IT certifications with SCS Sweden. Remote exams, Malmö test center, requirements, booking and practice materials." />
  <meta property="og:url" content="https://www.scservices.se/info" />
  <meta property="og:site_name" content="Scandinavian Certification Services" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="How Certiport Exams Work – Information & Requirements | SCS" />
  <meta name="twitter:description" content="Learn how to take Certiport IT certification exams with SCS. Remote testing, requirements, practice tests and Malmö test center details." />

  {/* Breadcrumbs */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Certifications",
          item: "https://www.scservices.se/certifiering"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Information",
          item: "https://www.scservices.se/info"
        }
      ]
    })}
  </script>
</Helmet>




   <section className="infoPageSectionOne">
  <div className="textInfo">
    <h1 data-aos="fade-right" data-aos-duration="1000">
      {t('info_title')}
    </h1>

    <p className="lead mt-3">
      {t('info_subtitle')}
    </p>

    <div
      className="certBenefits mt-4 text-center"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h3>✅ {t('info_benefits_title')}</h3>

      <ul className="list-unstyled">
        <li>
          <strong>{t('info_benefits_safe')}</strong> {t('info_benefits_safeDesc')}
          <a
            href="https://www.lexicon.se/Utbildningar/IT/IT-proffs-utbildning/certifieringar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-inline-flex align-items-center"
          >
            <BsInfoCircle className="me-2 text-white" />
          </a>
        </li>

        <li>
          <strong>{t('info_benefits_fast')}</strong> {t('info_benefits_fastDesc')}
        </li>

        <li>
          <strong>{t('info_benefits_variety')}</strong> {t('info_benefits_varietyDesc')}
        </li>

        <li>
          <strong>{t('info_benefits_support')}</strong> {t('info_benefits_supportDesc')}
        </li>
      </ul>
    </div>
  </div>
</section>

<section className="infoPageSectionTwo w-100">
<Row className="d-flex justify-content-center text-start px-4 px-md-5 py-4 py-md-5">
    <Col lg={4} md={10} xs={12} className="infoCenteredBlock" style={{ maxWidth: '760px' }}>
      <h2>{t('info_section_title')}</h2>
      <h4>{t('info_section_intro')}</h4>

      <p>
        <Trans i18nKey="info_section_paragraph1" components={{ strong: <strong /> }} />
      </p>

      <p>{t('info_section_paragraph2')}</p>
      <p>{t('info_section_paragraph3')}</p>
      <p>{t('info_section_paragraph4')}</p>

      <h3 className="mt-4">{t('info_testcenter_title')}</h3>
      <p>{t('info_testcenter_hint')}</p>

      <p>
        <Trans
          i18nKey="info_booking_info"
          components={{
            strong: <strong />,
            a: <a href="mailto:certifiering@lexicon.se" />
          }}
        />
      </p>

      <h3 className="mt-4">{t('info_certifications_title')}</h3>
      <p>{t('info_certifications_description')}</p>

      <ul>
        <li>{t('info_certifications_list1')}</li>
        <li>{t('info_certifications_list2')}</li>
        <li>{t('info_certifications_list3')}</li>
        <li>{t('info_certifications_list4')}</li>
        <li>{t('info_certifications_list5')}</li>
      </ul>

      <p>
        <Trans
          i18nKey="info_certifications_moreinfo"
          components={{ Link: <Link to="/certifiering" /> }}
        />
      </p>
    </Col>
  </Row>
</section>

<section className="infoPageSectionThree w-100">
  <Row className="d-flex justify-content-center p-5">
    <Col lg={4} xs={12} className="mb-4">
      <img
        src={malmö_testcenterImg}
        alt="Testcenter i Malmö"
        className="img-fluid rounded shadow-sm w-100"
      />
    </Col>

    <Col lg={4}>
      <h2>{t('info_testcenter_section_title')}</h2>
      <h3>{t('info_testcenter_section_city')}</h3>
      <p>{t('info_testcenter_section_description')}</p>

      <ul>
        <li>{t('info_testcenter_section_provider_pearson')}</li>
        <li>{t('info_testcenter_section_provider_psi')}</li>
        <li>{t('info_testcenter_section_provider_kryterion')}</li>
        <li>{t('info_testcenter_section_provider_certiport')}</li>
        <li>{t('info_testcenter_section_provider_cips')}</li>
        <li>{t('info_testcenter_section_provider_meazure')}</li>
      </ul>

      <h4>{t('info_testcenter_section_address_title')}</h4>
      <p>{t('info_testcenter_section_address')}</p>

      <h4>{t('info_testcenter_section_hours_title')}</h4>
      <p>{t('info_testcenter_section_hours')}</p>

      <div className="map-container mt-4">
        <h4>{t('info_map_title')}</h4>

        <iframe
          title="Lexicon Malmö karta"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2253.8761975458087!2d12.998680277077886!3d55.60416827302959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a3fd19acbf09%3A0x7fb40fa47def1af1!2sLexicon%20Malm%C3%B6!5e0!3m2!1ssv!2sse!4v1757580595564!5m2!1ssv!2sse"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </Col>
  </Row>
</section>

<section className="faqSection w-100">
  <Row className="d-flex justify-content-center px-2 py-4 py-md-5">
    <Col lg={6} md={6} xs={12}>
      <FAQSection />
    </Col>
  </Row>
</section>

<section className="infoPageSectionContact w-100">
  <Row className="d-flex justify-content-center px-3 py-4 py-md-5">
    <Col lg={4}>
      <h2>{t('info_contact_title')}</h2>

      <p>
        {t('info_contact_pearson')} <strong>{t('info_contact_pearsonService')}</strong>{' '}
        <a href="tel:+4620798690">{t('info_contact_pearsonPhone')}</a>.
      </p>

      <p>
        {t('info_contact_booking')} <strong>{t('info_contact_bookingPortal')}</strong>{' '}
        {t('info_contact_bookingOrg')} .
      </p>

      <p>
        {t('info_contact_other')}{' '}
        <a href="mailto:certifiering@lexicon.se">certifiering@lexicon.se</a>.
      </p>

      <h3 className="mt-4">Stockholm</h3>
      <p>
        <strong>{t('info_contact_stockholm_name')}</strong>
        <br />
        {t('info_contact_stockholm_address')}
        <br />
        Tel: <a href="tel:+46851161100">{t('info_contact_stockholm_phone')}</a>
        <br />
        {t('info_contact_stockholm_hours')}
      </p>

      <h3 className="mt-4">{t('info_contact_malmo_title')}</h3>
      <p>
        <strong>{t('info_contact_malmo_name')}</strong>
        <br />
        {t('info_contact_malmo_address')}
        <br />
        Tel: <a href="tel:+46406655650">{t('info_contact_malmo_phone')}</a>
        <br />
        {t('info_contact_malmo_hours')}
      </p>
    </Col>
  </Row>
</section>




    </div>
  );
};

export default InfoPage;

