import React from 'react';
import './Navigation.css';
import {Link, NavLink} from 'react-router-dom';
import iconAccount from '../../image/icon-profile.svg'

function Navigation({isAuthenticated}) {

    return (
        <nav className="navigation">
            {isAuthenticated ? (
                <>
                    <NavLink to="/movies" className="navigation__link_movies" activeClassName="active__link">
                        Фильмы
                    </NavLink>
                    <NavLink to="/saved-movies" className="navigation__link_movies">
                        Сохраненные фильмы
                    </NavLink>
                    <NavLink to="/profile" className="navigation__link_account active__link">
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
