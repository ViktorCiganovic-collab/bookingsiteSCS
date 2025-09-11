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
          <Accordion.Header>{t('faq_storage_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_storage_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>{t('faq_notes_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_notes_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>{t('faq_computer_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_computer_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>{t('faq_food_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_food_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>{t('faq_arrival_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_arrival_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>{t('faq_id_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_id_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>{t('faq_parking_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_parking_answer')}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="10">
          <Accordion.Header>{t('faq_support_question')}</Accordion.Header>
          <Accordion.Body>{t('faq_support_answer')}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQSection;
