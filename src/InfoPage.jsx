import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './styling/InfoPage.css';
import malmö_testcenterImg from './assets/malmötestcenter.jpeg'
import FAQSection from './services/FAQAccordion';

const InfoPage = () => {
  return (
    <div className='infoPage'>
   <section className="infoPageSectionOne">
  <h1 data-aos="fade-right" data-aos-duration="1000">Information om certifiering</h1>
  <p className="lead mt-3">
    Gör din certifiering på dina villkor – online eller i våra lokaler. Snabbt, säkert och professionellt.
  </p>

  <div className="certBenefits mt-4" data-aos="fade-up" data-aos-duration="1000">
    <h3>✅ Varför certifiera dig via oss?</h3>
    <ul>
      <li><strong>Tryggt & flexibelt:</strong> Certifiera dig hemifrån eller på plats i Malmö.</li>
      <li><strong>Snabba besked:</strong> Resultat direkt efter avslutat test.</li>
      <li><strong>Brett utbud:</strong> Välj bland 100+ certifieringar inom IT, programmering och Office.</li>
      <li><strong>Personlig kontakt:</strong> Vår support hjälper dig hela vägen.</li>
    </ul>
  </div>
</section>


      <section className="infoPageSectionTwo w-100">
        <Row className="d-flex justify-content-center p-5">
          <Col md={6}>
            <h2>Så går certifieringstesterna till</h2>
            <h4>
              Hos Scandinavian Certification Services genomförs certifieringstester digitalt via Certiports plattform. Du kan välja att skriva testet hemifrån eller på plats hos vårt testcenter i Malmö.
            </h4>

            <p>
              Testerna är <strong>tidsstyrda</strong> och sker helt online. Du loggar in via Certiports system med en personlig inloggning som tillhandahålls vid bokning. Bokningsbekräftelse skickas till din e-post några dagar innan testdagen.
            </p>

            <p>
              Varje certifiering har ett visst antal frågor och en fastställd tidsgräns. Resultatet visas direkt efter avslutat test.
            </p>

            <p>
              För distansprov krävs en stabil internetuppkoppling, webbkamera, mikrofon och en lugn miljö fri från störningar.
            </p>

            <h3 className="mt-4">Testcenter i Malmö</h3>
            <p>
              Om du föredrar att skriva testet på plats erbjuder vi:
              <ul>
                <li>Ergonomisk arbetsplats</li>
                <li>Hjälp från våra testadministratörer</li>
                <li>Teknisk support vid behov</li>
                <li>Möjlighet att komma i god tid för att förbereda dig</li>
              </ul>
            </p>

            <p>
              Vi rekommenderar att du bokar testet minst <strong>fyra arbetsdagar i förväg</strong>. Kontakta oss på&nbsp;
              <a href="mailto:certifiering@lexicon.se">certifiering@lexicon.se</a> för bokning och eventuell fakturering.
            </p>

            <h3 className="mt-4">Exempel på certifieringar</h3>
            <p>
              Du kan certifiera dig inom flera områden, till exempel:
              <ul>
                <li>Python – grundläggande programmering</li>
                <li>HTML & CSS – webbutveckling</li>
                <li>Cybersecurity – IT-säkerhet</li>
                <li>Databaser (SQL) – databasdesign och frågor</li>
                <li>Microsoft Word, Excel, PowerPoint – Office-kompetens</li>
              </ul>
              För fullständig lista över tillgängliga certifieringar, <Link to="/cert">klicka här</Link>.
            </p>
          </Col>
        </Row>
      </section>

    <section className='infoPageSectionThree w-100'>
        <Row className="d-flex justify-content-center p-5">
            <Col md={5}>
                <img src={malmö_testcenterImg} alt="Testcenter i Malmö" className='img-fluid'></img>
            </Col>

            <Col md={5}>
            <h2>Testcenter</h2>
            <h3>Malmö</h3>
            <p>
                På Lexicons mysiga testcenter i centrala Malmö träffar du <strong>Emelie Ahlcrona</strong> som tacksamt tar emot dig.
                Här kan du skriva certifieringar från:
            </p>
            <ul>
                <li>Pearson Vue</li>
                <li>PSI</li>
                <li>Kryterion</li>
                <li>Certiport</li>
                <li>CIPS</li>
                <li>Meazure Learning</li>
            </ul>

            <h4>Adress</h4>
            <p>
                <strong>Lexicon Malmö</strong><br />
                Södergatan 24, Malmö<br />
                Tel: <a href="tel:+46406655650">040–665 56 50</a>
            </p>

            <h4>Öppettider</h4>
            <p>Måndag – Fredag: 08.00–17.00</p>

           <div className="map-container mt-4">
  <h4>Hitta till oss</h4>
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
    <Row className='d-flex justify-content-center p-5'>
    <Col md={6}>
    <FAQSection />
    </Col>
    </Row>
</section>

<section className="infoPageSectionContact w-100">
  <Row className="d-flex justify-content-center p-5">
    <Col md={6}>
      <h2>Kontakt</h2>

      <p>
        Frågor gällande din specifika certifiering eller ditt konto hos Pearson VUE, såsom avbokning eller ändringar av befintlig bokning, hänvisar vi till
        <strong> Pearson VUE Customer Service</strong> på telefon
        <a href="tel:+4620798690"> 020–79 86 90</a>.
      </p>

      <p>
        Du kan även hantera din bokning, inklusive avbokning, direkt på <strong>Mina sidor</strong> via vår webbsida eller genom att kontakta
        <strong> Scandinavian Certification Services</strong> på telefon.
      </p>

      <p>
        Har du övriga frågor kring din kommande vistelse hos oss? Kontakta Lexicon på
        <a href="mailto:certifiering@lexicon.se"> certifiering@lexicon.se</a>.
      </p>

      <h3 className="mt-4">Stockholm</h3>
      <p>
        <strong>Lexicon IT-Proffs</strong><br />
        Bolidenvägen 14, 1 tr<br />
        Tel: <a href="tel:+46851161100">08–511 611 00</a><br />
        Öppettider: Torsdag – Fredag 09.00–17.00
      </p>

      <h3 className="mt-4">Malmö</h3>
      <p>
        <strong>Lexicon</strong><br />
        Södergatan 24, Malmö<br />
        Tel: <a href="tel:+46406655650">040–665 56 50</a><br />
        Öppettider: Måndag – Fredag 08.00–17.00
      </p>
    </Col>
  </Row>
</section>



    </div>
  );
};

export default InfoPage;

