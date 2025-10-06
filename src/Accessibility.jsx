import React from 'react';
import { useTranslation } from 'react-i18next';
import './styling/Accessibility.css';

const AccessibilityPage = () => {
  const { t } = useTranslation();

  const updatedDate = '6 oktober 2025';
  const contactEmail = 'kontakt@scs.se';
  const contactPhone = '+46 123 456 789';
  const publishedDate = '1 januari 2024';
  const lastTestDate = '1 oktober 2025';

  return (
    <div className="accessibilityPage d-flex flex-column align-items-center justify-content-center mx-auto me-auto w-100">

      <div className='partOne'>
        <h1>{t('accessibilityTitle')}</h1>
        <p><em>{t('accessibilityLastUpdated', { date: updatedDate })}</em></p>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="about-title">
          <h2 id="about-title">{t('accessibilityAboutTitle')}</h2>
          <p>{t('accessibilityAboutText')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="how-accessible-title">
          <h2 id="how-accessible-title">{t('accessibilityHowAccessibleTitle')}</h2>
          <p>{t('accessibilityHowAccessibleText')}</p>

          <h3>{t('accessibilityImprovementsPlannedTitle')}</h3>
          <ul>
            <li>{t('accessibilityImprovementContrast')}</li>
            <li>{t('accessibilityImprovementAltText')}</li>
            <li>{t('accessibilityImprovementFocus')}</li>
            <li>{t('accessibilityImprovementAria')}</li>
          </ul>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="compliance-title">
          <h2 id="compliance-title">{t('accessibilityComplianceTitle')}</h2>
          <p>{t('accessibilityComplianceText')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="report-title">
          <h2 id="report-title">{t('accessibilityReportTitle')}</h2>
          <p>{t('accessibilityReportText')}</p>
          <address>
            <p>{t('accessibilityReportEmail', { email: contactEmail })}</p>
            <p>{t('accessibilityReportPhone', { phone: contactPhone })}</p>
          </address>
          <p>{t('accessibilityReportThanks')}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="oversight-title">
          <h2 id="oversight-title">{t('accessibilityOversightTitle')}</h2>
          <p>{t('accessibilityOversightText')}</p>
          <p>{t('accessibilityOversightAgency')}</p>
          <a href="https://www.digg.se/tillsyn" target="_blank" rel="noopener noreferrer">
            {t('accessibilityOversightLink')}
          </a>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="tech-info-title">
          <h2 id="tech-info-title">{t('accessibilityTechTitle')}</h2>
          <p>{t('accessibilityTechBuiltWith')}</p>
          <p>{t('accessibilityTechFrontend')}</p>
          <p>{t('accessibilityTechBackend')}</p>
          <p>{t('accessibilityTechPublished', { publishedDate })}</p>
          <p>{t('accessibilityTechLastTested', { lastTestDate })}</p>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="plans-title">
          <h2 id="plans-title">{t('accessibilityPlansTitle')}</h2>
          <ul>
            <li>{t('accessibilityPlanWcag')}</li>
            <li>{t('accessibilityPlanAutoTesting')}</li>
            <li>{t('accessibilityPlanBookingSupport')}</li>
            <li>{t('accessibilityPlanTraining')}</li>
          </ul>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="closing-title">
          <h2 id="closing-title">Avslutande text</h2>
          <p><strong>{t('accessibilityClosing')}</strong></p>
        </section>
      </div>

    </div>
  );
};

export default AccessibilityPage;
