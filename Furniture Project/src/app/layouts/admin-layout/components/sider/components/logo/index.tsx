import React from 'react';
import logo from 'assets/images/logo.svg';

import './logo.css';

export const Logo = () => {
  return (
    <div className="sidebar-logo-container">
      <img src={logo} className="sidebar-logo" alt="logo" />
      <h1 className="sidebar-title">FURNITURE</h1>
    </div>
  );
};
