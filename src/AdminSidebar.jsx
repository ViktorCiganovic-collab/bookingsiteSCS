import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './styling/AdminDashboard.css';

const AdminSidebar = ({ activeSection, setActiveSection, handleShow }) => {

  const [expanded, setExpanded] = useState({
    bookings: false,
    certificates: false,
    testtimes: false,
    categories: false,
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
            📅 Bookings
          </div>
          {expanded.bookings && (
            <>
              <Nav.Link onClick={() => setActiveSection('bookings')} className="sidebar-link">
                Visa bokningar
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('manageBookings')} className="sidebar-link">
                Hantera bokningar
              </Nav.Link>
            </>
          )}
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('certificates')}>
            🎓 Certificates
          </div>
          {expanded.certificates && (
            <>
              <Nav.Link onClick={() => setActiveSection('certificates')} className="sidebar-link">
                Visa certifikat
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('addCert')} className="sidebar-link">
                Lägg till certifikat
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('editCert')} className="sidebar-link">
                Redigera certifikat
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('deleteCert')} className="sidebar-link">
                Ta bort certifikat
              </Nav.Link>
            </>
          )}
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('testtimes')}>
            ⏰ Test Times
          </div>
          {expanded.testtimes && (
            <>
              <Nav.Link onClick={() => setActiveSection('testtimes')} className="sidebar-link">
                Visa testtider
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('addTestTime')} className="sidebar-link">
                Lägg till tid
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('editTestTime')} className="sidebar-link">
                Redigera tid
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('deleteTestTime')} className="sidebar-link">
                Ta bort tid
              </Nav.Link>
            </>
          )}
        </div>

        <div className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleSection('categories')}>
            🗂️ Categories
          </div>
          {expanded.categories && (
            <>
              <Nav.Link onClick={() => setActiveSection('categories')} className="sidebar-link">
                Visa kategorier
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('createCategory')} className="sidebar-link">
                Lägg till kategori
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('updateCategory')} className="sidebar-link">
                Redigera kategori
              </Nav.Link>
              <Nav.Link onClick={() => setActiveSection('deleteCategory')} className="sidebar-link">
                Ta bort kategori
              </Nav.Link>
            </>
          )}
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
