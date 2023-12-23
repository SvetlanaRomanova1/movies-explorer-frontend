import React, { useState } from 'react';
import WelcomeLogo from '../WelcomeLogo/WelcomeLogo.jsx';
import AuthenticationButtons from '../AuthenticationButtons/AuthenticationButtons.jsx';
import useFormAndValidation from '../../hooks/use-form-and-validation';
import './Register.css';

function Register({ onRegistration, isLoading }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormAndValidation();
  const [apiError, setApiError] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
    onRegistration(values, setApiError);
    resetForm();
  };

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleRegister} noValidate>
        <WelcomeLogo title="Добро пожаловать!" />
        <div className="register__form-container">
          <label className="register__label">
            <span className="register__text-input">Имя</span>
            <input
              type="text"
              className="register__input"
              name="name"
              minLength="2"
              maxLength="30"
              value={values.name || ''}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            {errors.name && (
              <span className="register__input_error">{errors.name}</span>
            )}
          </label>
          <label className="register__label">
            <span className="register__text-input">E-mail</span>
            <input
              type="email"
              className="register__input"
              name="email"
              value={values.email || ''}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            {errors.email && (
              <span className="register__input_error">{errors.email}</span>
            )}
          </label>
          <label className="register__label">
            <span className="register__text-input">Пароль</span>
            <input
              type="password"
              className="register__input"
              name="password"
              value={values.password || ''}
              minLength="8"
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            {errors.password && (
              <span className="register__input_error">{errors.password}</span>
            )}
          </label>
        </div>
        <span className="register__input_error register__input-errors-api">{apiError}</span>
        <AuthenticationButtons
          submitButtonText="Зарегистрироваться"
          subtitle="Уже зарегистрированы?"
          login="Войти"
          isValid={isValid}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}

export default Register;
