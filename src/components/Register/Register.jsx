import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeLogo from '../WelcomeLogo/WelcomeLogo.jsx';
import AuthenticationButtons from '../AuthenticationButtons/AuthenticationButtons.jsx';
import useFormAndValidation from '../../hooks/use-form-and-validation';
import mainApi from '../../utils/MainApi';
import { SetCurrentUserContext } from '../../constexts/CurrentUserContext';
import './Register.css';

function Register() {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormAndValidation();
  const setCurrentUser = useContext(SetCurrentUserContext);
  const [isLoading, setIsLoading] = useState();
  const [apiError, setApiError] = useState();

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, email, password } = values;

    mainApi
      .signup({ name, email, password })
      .then(() => {
        mainApi.signin({ email, password })
          .then(() => setCurrentUser((state) => ({ ...state, isAuthenticated: true })))
          .then(() => navigate('/movies'));
        resetForm();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Ошибка регистрации:', error);
        setApiError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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
