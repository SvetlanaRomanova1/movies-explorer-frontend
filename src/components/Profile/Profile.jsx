import React, { useContext, useEffect } from 'react';
import useFormAndValidation from '../../hooks/use-form-and-validation';
import { CurrentUserContext } from '../../constexts/CurrentUserContext';
import './Profile.css';

function Profile({ handleProfile, isLoading, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const form = useFormAndValidation();

  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
  } = form;

  useEffect(() => {
    setValues((prevState) => ({ ...prevState, email: currentUser.email, name: currentUser.name }));
  }, [currentUser]);

  const isDisabled = !isValid
    || isLoading
    || (values.name === currentUser.name && values.email === currentUser.email);

  return (
    <div className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h2>

      <form className="profile__form" onSubmit={handleProfile(form)}>
        <div className="profile__label-wrapper">
          <div className="profile__label-context">
            <label className="profile__label-text">
              Имя
            </label>
            {errors.name && (
              <span className="edit__input_error">{errors.name}</span>
            )}
            <input
              type="text"
              className="profile__input"
              name="name"
              value={values.name || ''}
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="profile__delimiter"/>
          <div className="profile__label-context">
            <label className="profile__label-text">
                            E-mail
            </label>
            {errors.email && (
              <span className="edit__input_error">{errors.email}</span>
            )}
            <input
              type="email"
              className="profile__input"
              name="email"
              value={values.email || ''}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </form>
      <div className="profile__container-button">
        <button className="profile__button-edit"
          type="submit"
          disabled={isDisabled}
          onClick={handleProfile(form)}
        >
          {isLoading ? 'Идет сохранение...' : 'Редактировать'}
        </button>
        <button className="profile__button-exit" onClick={handleLogout}>
                    Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export default Profile;
