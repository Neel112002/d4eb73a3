import React from 'react';
import './css/Footer.css';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="nav-icon">
          <i className="ti ti-phone-incoming fs-3"></i>
          <span className="badge">12</span>
        </div>
        <div className="nav-icon">
          <i className="ti ti-user fs-3"></i>
        </div>
  
        <div className="center-button position-absolute top-0 start-50 translate-middle bg-success d-flex justify-content-center align-items-center rounded-circle" style={{ width: '65px', height: '65px' }}>
          <i className="ti ti-menu fs-3 text-white"></i>
        </div>
  
        <div className="nav-icon">
          <i className="ti ti-settings fs-3"></i>
        </div>
        <div className="nav-icon">
          <i className="ti ti-analyze fs-3 text-success"></i>
        </div>
      </footer>
    );
  };

export default Footer;
