import './Header.css';
import React from 'react';
import {Link} from 'react-router-dom';
import logoHeader from '../../image/logo-header.svg'
import Navigation from "../Navigation/Navigation";


function Header({isAuthenticated}) {

    return (
        <header className={`header ${isAuthenticated ? "header__auth" : "header__non-auth"}`}>
            <div className="header__container">
                <Link className="header__logo" to="/">
                    <img src={logoHeader} alt="Логотип"/>
                </Link>
                <Navigation isAuthenticated={isAuthenticated}/>
            </div>
        </header>
    )
}

export default Header;
