import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import iconAccount from '../../image/icon-profile.svg'
import './Navigation.css';

function Navigation({isAuthenticated, isHeader, setMobileMenuOpen, isHomePage}) {
    const navigationMobile = isHeader ? '' : 'navigation__mobile_menu';
    const navigationPink = isHomePage ? 'navigation__pink' : '';
    const navigationAuthenticated = !isAuthenticated && isHomePage ? 'navigation__authenticated': ''

    const onClick = () => {
        setMobileMenuOpen && setMobileMenuOpen(false)
    }

    return (
        <nav className={`navigation ${navigationMobile} ${navigationPink} ${navigationAuthenticated}`}>
            {isAuthenticated ? (
                <>
                    {!isHeader &&
                    <NavLink
                        to="/" className="navigation__link_movies"
                        onClick={onClick}
                    >
                        Главная
                    </NavLink>}
                    <NavLink
                        to="/movies" className="navigation__link_movies"
                        onClick={onClick}
                    >
                        Фильмы
                    </NavLink>
                    <NavLink
                        to="/saved-movies" className="navigation__link_movies navigation__save_movies"
                        onClick={onClick}
                    >
                        Сохраненные фильмы
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className="navigation__link_account active__link"
                        onClick={onClick}
                    >
                        Аккаунт
                        <img className="navigation__icon_account" src={iconAccount} alt="иконка профиль"/>
                    </NavLink>
                </>
            ) : (
                <>
                    <Link to="/signup" className="navigation__link_registration">
                        Регистрация
                    </Link>
                    <Link to="/signin" className="navigation__link_login">
                        Войти
                    </Link>
                </>
            )}
        </nav>
    );
}

export default Navigation;
