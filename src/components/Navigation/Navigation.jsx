import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import iconAccount from '../../image/icon-profile.svg';
import { CurrentUserContext } from '../../constexts/CurrentUserContext';
import './Navigation.css';

function Navigation({ isHeader, setMobileMenuOpen, isHomePage }) {
  const navigationMobile = isHeader ? '' : 'navigation__mobile-menu';
  const navigationPink = isHomePage ? 'navigation__pink' : '';
  const { isAuthenticated } = useContext(CurrentUserContext);
  const navigationAuthenticated = !isAuthenticated && isHomePage ? 'navigation__authenticated' : '';

  const onClick = () => {
    // eslint-disable-next-line no-unused-expressions
    setMobileMenuOpen && setMobileMenuOpen(false);
  };

  return (
        <nav className={`navigation ${navigationMobile} ${navigationPink} ${navigationAuthenticated}`}>
            {isAuthenticated ? (
                <>
                    {!isHeader
                    && <NavLink
                        to="/"
                        className="navigation__link-movies"
                        onClick={onClick}
                    >
                        Главная
                    </NavLink>}
                    <NavLink
                        to="/movies" className="navigation__link-movies"
                        onClick={onClick}
                    >
                        Фильмы
                    </NavLink>
                    <NavLink
                        to="/saved-movies" className="navigation__link-movies navigation__save-movies"
                        onClick={onClick}
                    >
                        Сохраненные фильмы
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className="navigation__link-account active__link"
                        onClick={onClick}
                    >
                        Аккаунт
                        <img className="navigation__icon_account" src={iconAccount} alt="иконка профиль"/>
                    </NavLink>
                </>
            ) : (
                <>
                    <Link to="/signup" className="navigation__link-registration">
                        Регистрация
                    </Link>
                    <Link to="/signin" className="navigation__link-login">
                        Войти
                    </Link>
                </>
            )}
        </nav>
  );
}

export default Navigation;
