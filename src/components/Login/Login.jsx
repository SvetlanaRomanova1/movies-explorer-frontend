import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeLogo from '../WelcomeLogo/WelcomeLogo.jsx';
import AuthenticationButtons from '../AuthenticationButtons/AuthenticationButtons.jsx';
import useFormAndValidation from '../../hooks/use-form-and-validation';
import mainApi from '../../utils/MainApi';
import { SetCurrentUserContext } from '../../constexts/CurrentUserContext';
import './Login.css';

function Login() {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormAndValidation();

  const [isLoading, setIsLoading] = useState();
  const setCurrentUser = useContext(SetCurrentUserContext);
  const [apiError, setApiError] = useState();

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = values;

    mainApi
      .signin({ email, password })
      .then(() => {
        setCurrentUser((state) => ({ ...state, isAuthenticated: true }));
        resetForm();
        navigate('/movies');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Ошибка входа:', error);
        setApiError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
        <div className="login">
            <form className="login__form" onSubmit={handleLogin} noValidate>
                <WelcomeLogo title="Рады видеть!"/>
                <div className="login__form-container">
                    <label className="login__label">
                        <span className="login__text-input">E-mail</span>
                        <input
                            type="email"
                            name="email"
                            className="login__input"
                            value={values.email || ''}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && (
                            <span className="login__input_error">{errors.email}</span>
                        )}
                    </label>
                    <label className="login__label">
                        <span className="login__text-input">Пароль</span>
                        <input
                            type="password"
                            name="password"
                            className="login__input"
                            value={values.password || ''}
                            onChange={handleChange}
                            minLength="8"
                            required
                        />
                        {errors.password && (
                            <span className="login__input_error">{errors.password}</span>
                        )}
                    </label>
                </div>
                <span className="login__input_error login__input-errors-api">{apiError}</span>
                <AuthenticationButtons
                    submitButtonText="Войти"
                    subtitle="Ещё не зарегистрированы?"
                    register="Регистрация"
                    isValid={isValid}
                    isLoading={isLoading}
                />
            </form>
        </div>
  );
}

export default Login;
