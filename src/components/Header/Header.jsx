import './Header.css';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoHeader from '../../image/logo-header.svg';
import Navigation from '../Navigation/Navigation.jsx';
import MenuMobile from '../MenuMobile/MenuMobile.jsx';
import { CurrentUserContext } from '../../constexts/CurrentUserContext';
import { HEADER_ENDPOINTS } from '../../constant';

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  const isHomePage = location.pathname === '/';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!HEADER_ENDPOINTS.includes(location.pathname)) {
    return null;
  }

  return (
        <header className={`header ${isHomePage ? 'header__pink' : 'header__white'}`}>
            <div className="header__container">
                <Link className="header__logo" to="/">
                    <img src={logoHeader} alt="Логотип"/>
                </Link>
                <Navigation
                    isHeader
                    isHomePage={isHomePage}
                    isAuthenticated={currentUser.isAuthenticated}
                />
                {currentUser.isAuthenticated && (
                    <button className="header__menu-mobile-button" onClick={toggleMobileMenu}>
                        <span className="header__menu-mobile-icon"/>
                        <span className="header__menu-mobile-icon"/>
                        <span className="header__menu-mobile-icon"/>
                    </button>
                )}
                {isMobileMenuOpen && <MenuMobile setMobileMenuOpen={setMobileMenuOpen}/>}
            </div>
        </header>
  );
}

export default Header;
