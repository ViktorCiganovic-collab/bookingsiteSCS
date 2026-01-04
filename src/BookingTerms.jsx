import React from 'react';
import { useTranslation } from 'react-i18next';
import './styling/Accessibility.css';
import { Helmet } from "react-helmet-async";

const BookingTermsPage = () => {
  const { t } = useTranslation();

  const updatedDate = '15 oktober 2025'; // uppdatera efter behov
  const contactEmail = 'info@scservices.se';
  const contactPhone = '+46 709 797 303';

  return (
    <div className="bookingTermsPage d-flex flex-column align-items-center justify-content-center mx-auto me-auto w-100">

      <Helmet>
  <title>Bokningsvillkor | Scandinavian Certification Services</title>

  <meta
    name="description"
    content="Läs våra bokningsvillkor för certifieringar hos Scandinavian Certification Services. Information om avbokning, betalningsvillkor, tidsfrister och kontaktuppgifter."
  />

  {/* Canonical */}
  <link rel="canonical" href="https://www.scservices.se/booking-terms" />

  {/* Open Graph */}
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Bokningsvillkor | Scandinavian Certification Services" />
  <meta property="og:description" content="Information om avbokningsregler, betalningsvillkor och bokningsprocessen hos SCS." />
  <meta property="og:url" content="https://www.scservices.se/booking-terms" />
  <meta property="og:site_name" content="SCS" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Bokningsvillkor | Scandinavian Certification Services" />
  <meta name="twitter:description" content="Läs våra bokningsvillkor för certifieringar och prov." />

  {/* Breadcrumbs */}
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
          "name": "Bokningsvillkor",
          "item": "https://www.scservices.se/booking-terms"
        }
      ]
    })}
  </script>
      </Helmet>


      <div className='partOne'>
        <h1>{t('bookingTermsTitle')}</h1>
        <p><em>{t('bookingTermsLastUpdated', { date: updatedDate })}</em></p>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="cancellation-policy-title">
          <h2 id="cancellation-policy-title">{t('bookingTermsCancellationTitle')}</h2>
          <p>{t('bookingTermsCancellationText')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="booking-deadline-title">
          <h2 id="booking-deadline-title">{t('bookingTermsBookingDeadlineTitle')}</h2>
          <p>{t('bookingTermsBookingDeadlineText')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="transaction-fee-title">
          <h2 id="transaction-fee-title">{t('bookingTermsTransactionFeeTitle')}</h2>
          <p>{t('bookingTermsTransactionFeeText')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="payment-terms-title">
          <h2 id="payment-terms-title">{t('bookingPaymentTermsTitle')}</h2>
          <p>{t('bookingPaymentTermsText')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="additional-info-title">
          <h2 id="additional-info-title">{t('bookingTermsAdditionalInfoTitle')}</h2>
          <ul>
            <li>{t('bookingTermsAdditionalInfoItem1')}</li>
            <li>{t('bookingTermsAdditionalInfoItem2')}</li>
            <li>{t('bookingTermsAdditionalInfoItem3')}</li>
          </ul>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="contact-title">
          <h2 id="contact-title">{t('bookingTermsContactTitle')}</h2>
          <p>{t('bookingTermsContactText')}</p>
          <address>
            <p>{t('bookingTermsContactEmail', { email: contactEmail })}</p>
            <p>{t('bookingTermsContactPhone', { phone: contactPhone })}</p>
          </address>
        </section>
      </div>

    </div>
  );
};

export default BookingTermsPage;
