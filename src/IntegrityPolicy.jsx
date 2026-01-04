import React from 'react';
import { useTranslation } from 'react-i18next';
import './styling/Accessibility.css';
import { Helmet } from "react-helmet-async";

const IntegrityPolicy = () => {
  const { t } = useTranslation();

  const updatedDate = '19 november 2025';
  const contactEmail = 'info@scservices.se';
  const publishedDate = '11 november 2025';

  return (
    <div className="accessibilityPage d-flex flex-column align-items-center justify-content-center mx-auto me-auto w-100">

      <Helmet>
  <title>Integritetspolicy | Scandinavian Certification Services</title>

  <meta
    name="description"
    content="Läs vår integritetspolicy för att förstå hur Scandinavian Certification Services hanterar personuppgifter, datasäkerhet och dina rättigheter enligt GDPR."
  />

  {/* Canonical */}
  <link rel="canonical" href="https://www.scservices.se/integrity-policy" />

  {/* Open Graph */}
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Integritetspolicy | Scandinavian Certification Services" />
  <meta property="og:description" content="Information om hur vi hanterar personuppgifter, datasäkerhet och GDPR‑rättigheter." />
  <meta property="og:url" content="https://www.scservices.se/integrity-policy" />
  <meta property="og:site_name" content="SCS" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Integritetspolicy | Scandinavian Certification Services" />
  <meta name="twitter:description" content="Läs om hur vi skyddar dina personuppgifter och följer GDPR." />

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
          "name": "Integritetspolicy",
          "item": "https://www.scservices.se/integrity-policy"
        }
      ]
    })}
  </script>
</Helmet>


      <div className='partOne'>
        <h1>{t('privacy_title')}</h1>
        <p><em>{t('privacyLastUpdated', { date: updatedDate })}</em></p>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="intro-title">
          <h2 id="intro-title">{t('privacy_intro_title')}</h2>
          <p>{t('privacy_intro')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="data-collected-title">
          <h2 id="data-collected-title">{t('privacy_data_collected_title')}</h2>
          <ul>
            <li>{t('privacy_data_collected_1')}</li>
            <li>{t('privacy_data_collected_2')}</li>
            <li>{t('privacy_data_collected_3')}</li>
          </ul>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="usage-title">
          <h2 id="usage-title">{t('privacy_usage_title')}</h2>
          <ul>
            <li>{t('privacy_usage_1')}</li>
            <li>{t('privacy_usage_2')}</li>
            <li>{t('privacy_usage_3')}</li>
            <li>{t('privacy_usage_4')}</li>
          </ul>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="sharing-title">
          <h2 id="sharing-title">{t('privacy_sharing_title')}</h2>
          <p>{t('privacy_sharing_text')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="legal-title">
          <h2 id="legal-title">{t('privacy_legal_title')}</h2>
          <ul>
            <li>{t('privacy_legal_1')}</li>
            <li>{t('privacy_legal_2')}</li>
          </ul>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="storage-title">
          <h2 id="storage-title">{t('privacy_storage_title')}</h2>
          <p>{t('privacy_storage_text')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="security-title">
          <h2 id="security-title">{t('privacy_security_title')}</h2>
          <p>{t('privacy_security_text')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="rights-title">
          <h2 id="rights-title">{t('privacy_rights_title')}</h2>
          <ul>
            <li>{t('privacy_rights_1')}</li>
            <li>{t('privacy_rights_2')}</li>
            <li>{t('privacy_rights_3')}</li>
            <li>{t('privacy_rights_4')}</li>
          </ul>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="contact-title">
          <h2 id="contact-title">{t('privacy_contact_title')}</h2>
          <address>
            <p>{t('privacy_contact_1')}</p>
            <p>📧 info@scservices.se</p>
            <p>📞 +46 709 797 303</p>
            <p>{t('privacy_contact_4')}</p>
            <p>Org.nr: 559389-0592</p>
          </address>
          <p>{t('privacyTechPublished', { publishedDate })}</p>
        </section>
      </div>

    </div>
  );
};

export default IntegrityPolicy;
