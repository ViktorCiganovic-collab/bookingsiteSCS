import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './styling/AdminDashboard.css';

const AdminSidebar = ({ activeSection, setActiveSection, handleShow, handleCloseSidebar }) => {

  const [expanded, setExpanded] = useState({
    bookings: false,
    certificates: false,
    testtimes: false,
    categories: false,
    statistics: false,
    logout: false,
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="adminSidebar">
      <Nav className="flex-column">

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('bookings')}>
            📅 Bokningar
          </div>
          {expanded.bookings && (
            <>
              <Nav.Link onClick={() => {setActiveSection('bookings'); handleCloseSidebar(); }} className="sidebar-link">
                Visa bokningar
              </Nav.Link>
                <Nav.Link onClick={() => {setActiveSection('cancellations'); handleCloseSidebar();}} className="sidebar-link">
                Visa avbokningar
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('deleteBookings'); handleCloseSidebar();}} className="sidebar-link">
                Ta bort bokning
              </Nav.Link>
            </>
          )}
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('certificates')}>
            🎓 Certifieringar
          </div>
          {expanded.certificates && (
            <>
              <Nav.Link onClick={() => {setActiveSection('certificates'); handleCloseSidebar();}} className="sidebar-link">
                Visa certifikat
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('addCert'); handleCloseSidebar();}} className="sidebar-link">
                Lägg till certifikat
              </Nav.Link>              
              <Nav.Link onClick={() => {setActiveSection('editCert'); handleCloseSidebar();}} className="sidebar-link">
                Redigera certifikat
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('deleteCert'); handleCloseSidebar();}} className="sidebar-link">
                Ta bort certifikat
              </Nav.Link>
            </>
          )}
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('testtimes')}>
            ⏰ Testtider
          </div>
          {expanded.testtimes && (
            <>
              <Nav.Link onClick={() => {setActiveSection('testtimes'); handleCloseSidebar();}} className="sidebar-link">
                Visa testtider
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('addTestTime'); handleCloseSidebar();}} className="sidebar-link">
                Lägg till tid
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('addDiscount'); handleCloseSidebar();}} className="sidebar-link">
                Aktivera rabatt
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('editTestTime'); handleCloseSidebar();}} className="sidebar-link">
                Redigera tid
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('deleteTestTime'); handleCloseSidebar();}} className="sidebar-link">
                Ta bort tid
              </Nav.Link>
            </>
          )}
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('categories')}>
            🗂️ Kategorier
          </div>
          {expanded.categories && (
            <>
              <Nav.Link onClick={() => {setActiveSection('categories'); handleCloseSidebar();}} className="sidebar-link">
                Visa kategorier
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('createCategory'); handleCloseSidebar();}} className="sidebar-link">
                Lägg till kategori
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('updateCategory'); handleCloseSidebar();}} className="sidebar-link">
                Redigera kategori
              </Nav.Link>
              <Nav.Link onClick={() => {setActiveSection('deleteCategory'); handleCloseSidebar();}} className="sidebar-link">
                Ta bort kategori
              </Nav.Link>
            </>
          )}
        </div>

        <div className='sidebar-group'>
          <div>
            <div className="sidebar-title" onClick={() => toggleSection('statistics')}>
              📊 Statistik
            </div>
            {expanded.statistics && (
              <>
              <Nav.Link onClick={() => {setActiveSection('bookingsPerCert'); handleCloseSidebar();}} className="sidebar-link">
                Bokningar per certifiering
              </Nav.Link>

               <Nav.Link onClick={() => {setActiveSection('bookingsperweek_month'); handleCloseSidebar();}} className="sidebar-link">
                Bokningar per vecka/månad
              </Nav.Link>
              
              </>
            )}        
            
          </div>



        </div>

        <div className="sidebar-group">
          <div
            className="sidebar-title text-danger"
            onClick={handleShow}
            style={{ cursor: 'pointer' }}
          >
            🚪 Logga ut
          </div>
        </div>

      </Nav>
    </div>
  );
};

export default AdminSidebar;
