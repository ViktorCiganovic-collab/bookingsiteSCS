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
        <span><em>{t('accessibilityLastUpdated', { date: updatedDate })}</em></span>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="about-title">
          <h2 id="about-title">{t('accessibilityAboutTitle')}</h2>
          <span>{t('accessibilityAboutText')}</span>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="how-accessible-title">
          <h2 id="how-accessible-title">{t('accessibilityHowAccessibleTitle')}</h2>
          <span>{t('accessibilityHowAccessibleText')}</span>

          <h3>{t('accessibilityImprovementsPlannedTitle')}</h3>
          <span>
            {t('accessibilityImprovementContrast')}<br/>
            {t('accessibilityImprovementAltText')}<br/>
            {t('accessibilityImprovementFocus')}<br/>
            {t('accessibilityImprovementAria')}
          </span>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="compliance-title">
          <h2 id="compliance-title">{t('accessibilityComplianceTitle')}</h2>
          <span>{t('accessibilityComplianceText')}</span>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="report-title">
          <h2 id="report-title">{t('accessibilityReportTitle')}</h2>
          <span>{t('accessibilityReportText')}</span>
          <address>
            <span>{t('accessibilityReportEmail', { email: contactEmail })}</span><br />
            <span>{t('accessibilityReportPhone', { phone: contactPhone })}</span>
          </address>
          <span>{t('accessibilityReportThanks')}</span>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="oversight-title">
          <h2 id="oversight-title">{t('accessibilityOversightTitle')}</h2>
          <span>{t('accessibilityOversightText')}</span><br/>
          <span>{t('accessibilityOversightAgency')}</span><br/>
          <a href="https://www.digg.se/tillsyn" target="_blank" rel="noopener noreferrer">
            {t('accessibilityOversightLink')}
          </a>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="tech-info-title">
          <h2 id="tech-info-title">{t('accessibilityTechTitle')}</h2>
          <span>{t('accessibilityTechBuiltWith')}</span><br/>
          <span>{t('accessibilityTechFrontend')}</span><br/>
          <span>{t('accessibilityTechBackend')}</span><br/>
          <span>{t('accessibilityTechPublished', { publishedDate })}</span><br/>
          <span>{t('accessibilityTechLastTested', { lastTestDate })}</span>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-labelledby="plans-title">
          <h2 id="plans-title">{t('accessibilityPlansTitle')}</h2>
          <span>
            {t('accessibilityPlanWcag')}<br/>
            {t('accessibilityPlanAutoTesting')}<br/>
            {t('accessibilityPlanBookingSupport')}<br/>
            {t('accessibilityPlanTraining')}
          </span>
        </section>
      </div>

      <div className="sectionWrapper">
        <section aria-label="Avslutande text">
          <span><strong>{t('accessibilityClosing')}</strong></span>
        </section>
      </div>

    </div>
  );
};

export default AccessibilityPage;
