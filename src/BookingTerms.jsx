import React from 'react';
import { useTranslation } from 'react-i18next';
import './styling/Accessibility.css';

const BookingTermsPage = () => {
  const { t } = useTranslation();

  const updatedDate = '15 oktober 2025'; // uppdatera efter behov
  const contactEmail = 'malmo@lexicon.se';
  const contactPhone = '+46 40 665 56 50';

  return (
    <div className="bookingTermsPage d-flex flex-column align-items-center justify-content-center mx-auto me-auto w-100">

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
