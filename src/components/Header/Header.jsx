import './Header.css';
import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import logoHeader from '../../image/logo-header.svg'
import Navigation from "../Navigation/Navigation";
import MenuMobile from "../MenuMobile/MenuMobile";

const headerEndpoints = ['/movies', '/saved-movies', '/profile', '/'];

function Header({isAuthenticated}) {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    }

    if (!headerEndpoints.includes(location.pathname)) {
        return null
    }


    return (
        <header className={`header ${isHomePage ? "header__pink" : "header__white"}`}>
            <div className="header__container">
                <Link className="header__logo" to="/">
                    <img src={logoHeader} alt="Логотип"/>
                </Link>
                <Navigation
                    isHeader
                    isHomePage={isHomePage}
                    isAuthenticated={isAuthenticated}
                />
                {isAuthenticated && (
                    <button className="header__menu-mobile-button" onClick={toggleMobileMenu}>
                        <span className="header__menu-mobile-icon"/>
                        <span className="header__menu-mobile-icon"/>
                        <span className="header__menu-mobile-icon"/>
                    </button>
                )}
                {isMobileMenuOpen && <MenuMobile setMobileMenuOpen={setMobileMenuOpen}/>}
            </div>
        </header>
    )
}

export default Header;
