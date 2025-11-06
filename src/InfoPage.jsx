import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './styling/InfoPage.css';
import malmö_testcenterImg from './media/malmötestcenter.jpeg'
import FAQSection from './services/FAQAccordion';
import { useTranslation, Trans  } from 'react-i18next';
import { BsInfoCircle } from 'react-icons/bs';

const InfoPage = () => {

const { t } = useTranslation();

return (
    <div className='infoPage'>
   <section className="infoPageSectionOne">
  <h1 data-aos="fade-right" data-aos-duration="1000">{t('infoPage.title')}</h1>
  <p className="lead mt-3">
    {t('infoPage.subtitle')}
  </p>

  <div className="certBenefits mt-4 text-center" data-aos="fade-up" data-aos-duration="1000">
    <h3>✅ {t('infoPage.benefits.title')}</h3>
          <ul className='list-unstyled'>
            <li><strong>{t('infoPage.benefits.safe')}</strong> {t('infoPage.benefits.safeDesc')} <a
            href="https://www.lexicon.se/Utbildningar/IT/IT-proffs-utbildning/certifieringar/?gad_source=1&gad_campaignid=23053720699&gclid=CjwKCAjw6P3GBhBVEiwAJPjmLiOQ2UI07VSYHodmL8wI282W427H7W2gIPruq269AXRzEiBE50PxghoCd48QAvD_BwE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-inline-flex align-items-center"
          >  <BsInfoCircle className="me-2 text-white" /> </a></li>

            <li><strong>{t('infoPage.benefits.fast')}</strong> {t('infoPage.benefits.fastDesc')}</li>
            <li><strong>{t('infoPage.benefits.variety')}</strong> {t('infoPage.benefits.varietyDesc')}</li>
            <li><strong>{t('infoPage.benefits.support')}</strong> {t('infoPage.benefits.supportDesc')}</li>
          </ul>
  </div>
</section>


        <section className="infoPageSectionTwo w-100">
      <Row className="d-flex justify-content-center text-start px-3 py-4 py-md-5">
        <Col lg={5} md={10} xs={12}>
          <h2>{t('title')}</h2>
          <h4>{t('intro')}</h4>

          <p>
            <Trans i18nKey="paragraph1" components={{ strong: <strong /> }} />
          </p>

          <p>{t('paragraph2')}</p>

          <p>{t('paragraph3')}</p>

          <h3 className="mt-4">{t('testCenterTitle')}</h3>
          <p>{t('malmo_testcenter_hint')}</p>       

          <p>
            <Trans
              i18nKey="bookingInfo"
              components={{
                strong: <strong />,
                a: <a href="mailto:certifiering@lexicon.se" />
              }}
            />
          </p>

          <h3 className="mt-4">{t('certificationsTitle')}</h3>
          <p>{t('certificationsDescription')}</p>
          <ul>
            <li>{t('certificationsList1')}</li>
            <li>{t('certificationsList2')}</li>
            <li>{t('certificationsList3')}</li>
            <li>{t('certificationsList4')}</li>
            <li>{t('certificationsList5')}</li>
          </ul>

          <p>
            <Trans
              i18nKey="certificationsMoreInfo"
              components={{ Link: <Link to="/cert" /> }}
            />
          </p>
        </Col>
      </Row>
    </section>

    <section className='infoPageSectionThree w-100'>
        <Row className="d-flex justify-content-center p-5">
            <Col lg={4} xs={12} className='mb-4'> 
                <img src={malmö_testcenterImg} alt="Testcenter i Malmö" className='img-fluid rounded shadow-sm w-100'></img>
            </Col>

            <Col lg={4}>
            <h2>{t('infoPage.testCenterSection.title')}</h2>
            <h3>{t('infoPage.testCenterSection.city')}</h3>
            <p>{t('infoPage.testCenterSection.description')}</p>
            <ul>
              <li>{t('infoPage.testCenterSection.providers.pearson')}</li>
              <li>{t('infoPage.testCenterSection.providers.psi')}</li>
              <li>{t('infoPage.testCenterSection.providers.kryterion')}</li>
              <li>{t('infoPage.testCenterSection.providers.certiport')}</li>
              <li>{t('infoPage.testCenterSection.providers.cips')}</li>
              <li>{t('infoPage.testCenterSection.providers.meazure')}</li>
            </ul>

            <h4>{t('infoPage.testCenterSection.addressTitle')}</h4>
            <p>{t('infoPage.testCenterSection.address')}</p>

            <h4>{t('infoPage.testCenterSection.hoursTitle')}</h4>
            <p>{t('infoPage.testCenterSection.hours')}</p>            


           <div className="map-container mt-4">
  <h4>{t('infoPage.map.title')}</h4>

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

<section className='faqSection w-100'>
    <Row className='d-flex justify-content-center px-2 py-4 py-md-5'>
    <Col lg={6} md={6} xs={12}>
    <FAQSection />
    </Col>
    </Row>
</section>

<section className="infoPageSectionContact w-100">
  <Row className="d-flex justify-content-center px-3 py-4 py-md-5">
    <Col lg={4}>
      <h2>{t('infoPage.contact.title')}</h2>

            <p>
        {t('infoPage.contact.pearson')} <strong>{t('infoPage.contact.pearsonService')}</strong> {t('infoPage.contact.pearsonPhone') && 'på telefon'}
        <a href="tel:+4620798690"> {t('infoPage.contact.pearsonPhone')}</a>.
      </p>

      <p>
        {t('infoPage.contact.booking')} <strong>{t('infoPage.contact.bookingPortal')}</strong> {t('infoPage.contact.bookingOrg') && 'via vår webbsida eller genom att kontakta '}
        <strong>{t('infoPage.contact.bookingOrg')}</strong> på telefon.
      </p>


    <p>
        {t('infoPage.contact.other')} <a href="mailto:certifiering@lexicon.se">certifiering@lexicon.se</a>.
      </p>


      <h3 className="mt-4">Stockholm</h3>
     <p>
        <strong>{t('infoPage.contact.stockholm.name')}</strong><br />
        {t('infoPage.contact.stockholm.address')}<br />
        Tel: <a href="tel:+46851161100">{t('infoPage.contact.stockholm.phone')}</a><br />
        {t('infoPage.contact.stockholm.hours')}
      </p>


      <h3 className="mt-4">{t('infoPage.contact.malmö.title')}</h3>
      <p>
        <strong>{t('infoPage.contact.malmö.name')}</strong><br />
        {t('infoPage.contact.malmö.address')}<br />
        Tel: <a href="tel:+46406655650">{t('infoPage.contact.malmö.phone')}</a><br />
        {t('infoPage.contact.malmö.hours')}
      </p>

    
    </Col>
  </Row>
</section>



    </div>
  );
};

export default InfoPage;

