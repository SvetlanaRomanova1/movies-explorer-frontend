import './MenuMobile.css';
import React from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import CloseIcon from '../svg/CloseIcon.jsx';

function MenuMobile({ setMobileMenuOpen }) {
  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="menu__mobile-container">
      <button className="menu__mobile-button-close" onClick={handleCloseMenu}>
        <CloseIcon />
      </button>
      <Navigation setMobileMenuOpen={setMobileMenuOpen} />
    </div>
  );
}

export default MenuMobile;
