import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormAndValidation from '../../hooks/use-form-and-validation';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext, SetCurrentUserContext } from '../../constexts/CurrentUserContext';
import './Profile.css';

function Profile({ setSaveIds }) {
  const setCurrentUser = useContext(SetCurrentUserContext);
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
  } = useFormAndValidation();

  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setValues((prevState) => ({ ...prevState, ...currentUser }));
  }, [currentUser]);

  const handleProfile = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email } = values;

    mainApi
      .editUserInfo({ name, email })
      .then(() => {
        setCurrentUser((prevUser) => ({ ...prevUser, name, email }));
        resetForm();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Ошибка входа:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    setSaveIds(new Map());
    setCurrentUser((state) => ({ ...state, isAuthenticated: false }));
    navigate('/');
    mainApi.signout();
  };

  return (
        <div className="profile">
            <h2 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h2>

            <form className="profile__form" onSubmit={handleProfile}>
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
                        disabled={!isValid || isLoading}
                        onClick={handleProfile}
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
