import React from 'react';
import './styling/About.css';
import backgroundVideoAbout from './assets/background_one.mp4';
import { useTranslation } from 'react-i18next'; // Importera useTranslation


const About = () => {

const { t } = useTranslation(); // translation hook

  return (
    <div className='aboutSectionOne'>

        <video
        className="backgroundVideo"
        autoPlay
        muted
        loop
        playsInline
        >
        <source src={backgroundVideoAbout} type="video/mp4" />
        Your browser does not support the video tag.
        </video>

        <div className="overlayContent">
        <h1>{t('about')}</h1>
        <p>{t('about_tagline')}</p>
        </div>


    </div>
  )
}

export default About;