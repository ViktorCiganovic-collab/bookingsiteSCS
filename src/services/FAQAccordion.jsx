import React from 'react';
import { Accordion } from 'react-bootstrap';

const FAQSection = () => {
  return (
    <div className="faq-section p-5">
      <h2>Vanliga frågor och svar</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Hur bokar jag ett certifieringstest?</Accordion.Header>
          <Accordion.Body>
            Du bokar testet via vår webbsida under "Mina sidor" eller genom att kontakta oss via e-post.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Kan jag skriva testet hemifrån?</Accordion.Header>
          <Accordion.Body>
            Ja, du kan välja att skriva testet på distans. Du behöver en stabil internetuppkoppling, webbkamera och mikrofon.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Vad händer om jag behöver avboka?</Accordion.Header>
          <Accordion.Body>
            Du kan avboka via Mina sidor eller genom att kontakta Scandinavian Certification Services på telefon.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Hur förvarar jag mina personliga saker?</Accordion.Header>
          <Accordion.Body>
            Vi erbjuder skåp med nyckel när du kommer hit.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Ska jag ha anteckningsblock och penna med mig?</Accordion.Header>
          <Accordion.Body>
            Nej, det får du av oss om din certifiering tillåter användningen av anteckningsblock & penna.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Behöver jag ta med mig egen dator?</Accordion.Header>
          <Accordion.Body>
            Nej, vi har en sal med datorer där certifieringen skrivs.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>Får jag ha mat eller dryck i testsalen?</Accordion.Header>
          <Accordion.Body>
            Nej, men om du har ett längre prov med raster inkluderat kan du placera ät- och drickbart i vår lounge så att du har tillgång till det under rasten.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>När bör jag vara på plats hos er?</Accordion.Header>
          <Accordion.Body>
            Senast 30 minuter innan din bokade tid.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>Två stycken legitimation, behövs det?</Accordion.Header>
          <Accordion.Body>
            I din bekräftelse står det om du behöver både en primär och en sekundär legitimation. Om det prov du ska skriva kräver sekundär legitimation (alla gör inte det) så räcker det med t.ex. ett betalkort som innehåller ditt fullständiga namn och en handskriven signatur som andra leg.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>Finns parkering utanför?</Accordion.Header>
          <Accordion.Body>
            Ja, det finns gott om parkeringsplatser. (Gäller Johanneshovs testcenter.)
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="10">
          <Accordion.Header>Vem kan jag vända mig till under certifieringstillfället vid frågor?</Accordion.Header>
          <Accordion.Body>
            När du besöker oss möts du av en testadministratör som finns tillgänglig under hela din certifiering.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQSection;

