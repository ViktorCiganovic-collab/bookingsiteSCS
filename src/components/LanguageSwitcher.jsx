import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation(); // Använd i18n från react-i18next för att byta språk

  // Funktion för att ändra språket
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {i18n.language.toUpperCase()} {/* Visar aktuell språkförkortning */}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLanguageChange('sv')}>Svenska</Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange('da')}>Dansk</Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange('no')}>Norsk</Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange('fi')}>Suomi</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
