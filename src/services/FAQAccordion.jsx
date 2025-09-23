import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <div className="faq-section p-5">
      <h2>{t('faq_title')}</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t('faq_booking_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_booking_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>{t('faq_remote_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_remote_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>{t('faq_cancel_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_cancel_answer')}</Accordion.Body>
        </Accordion.Item>       
    
        <Accordion.Item eventKey="3">
          <Accordion.Header>{t('faq_id_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_id_answer')}</Accordion.Body>
        </Accordion.Item>
        

        <Accordion.Item eventKey="4">
          <Accordion.Header>{t('faq_support_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_support_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>{t('faq_malmo_info_heading')}</Accordion.Header>
          <Accordion.Body>{t('faq_malmo_info_body')}</Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
};

export default FAQSection;
