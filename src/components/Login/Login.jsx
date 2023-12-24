import React, { useState } from 'react';
import WelcomeLogo from '../WelcomeLogo/WelcomeLogo.jsx';
import AuthenticationButtons from '../AuthenticationButtons/AuthenticationButtons.jsx';
import useFormAndValidation from '../../hooks/use-form-and-validation';
import './Login.css';

function Login({ onSignIn, isLoading }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormAndValidation();

  const [apiError, setApiError] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    onSignIn(values, setApiError);
    resetForm();
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
              disabled={isLoading}
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
              disabled={isLoading}
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
