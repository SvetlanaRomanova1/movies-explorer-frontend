import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { CurrentUserContext, SetCurrentUserContext } from '../../constexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import Movies from '../Movies/Movies.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import MoviesApi from '../../utils/MoviesApi';
import transformMovies from '../../utils/transformMovies';
import useUpdateMovies from '../../hooks/use-update-movies';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';
import './App.css';

const initialState = {
  isAuthenticated: true,
};

function App({ handleRegister }) {
  const [currentUser, setCurrentUser] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [saveIds, setSaveIds] = useState(new Map());
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });
  const navigate = useNavigate();

  const {
    updateMovies,
    setSavedMovies,
    removeMoviesById,
    savedMovies,
  } = useUpdateMovies(currentUser);

  useEffect(() => {
    // Получаем информацию о текущем пользователе при загрузке компонента
    setIsLoading(true);
    mainApi.getUserInfo()
      .then((userInfo) => {
        setCurrentUser({
          ...userInfo,
          isAuthenticated: true,
        });
      })
      .catch((error) => {
        setCurrentUser((state) => ({
          ...state,
          isAuthenticated: false,
        }));
        // eslint-disable-next-line no-console
        console.error('Error fetching user info:', error);
      })
      .finally(() => setIsLoading(false));
  }, [currentUser.isAuthenticated]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // MoviesApi для получения списка фильмов
        const data = await MoviesApi.getMovies();
        const transformData = transformMovies(data);
        setSavedMovies(transformData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Ошибка при загрузке фильмов:', error);
      }
    };
    function fetchSaveMovies() {
      return mainApi
        .getSaveMovies()
        // eslint-disable-next-line no-shadow
        .then((movies) => {
          setSaveIds(new Map(movies.map((move) => ([move.movieId, move._id]))));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Ошибка при получении сохраненных фильмов:', error);
        });
    }
    setIsLoading(true);
    Promise.all([fetchMovies(), fetchSaveMovies()]).finally(() => setIsLoading(false));
  }, [currentUser.isAuthenticated]);

  const handleProfile = (form) => (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email } = form.values;
    mainApi
      .editUserInfo({ name, email })
      .then(() => {
        setCurrentUser((prevUser) => ({ ...prevUser, name, email }));
        form.resetForm();
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Ваши данные обновлены!',
        });
      })
      .catch((error) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: error,
        });
        // eslint-disable-next-line no-console
        console.error('Ошибка входа:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function closeInfoTooltip() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  const handleLogout = () => {
    setCurrentUser((state) => ({ ...state, isAuthenticated: false }));
    navigate('/');
    mainApi.signout()
      .catch((error) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: error,
        });
      });
  };

  const onSaveMovie = (data) => {
    mainApi.saveNewMovies(data)
      .then((res) => {
        setSaveIds((prevState) => new Map(prevState).set(res.movieId, res._id));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Ошибка при сохранении фильма:', error);
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: error,
        });
      });
  };

  const onDeleteMovie = (movieId, id) => {
    mainApi.deleteMovies(saveIds.get(movieId))
      .then(() => {
        setSaveIds((prevState) => {
          prevState.delete(id);
          return new Map(prevState);
        });
        removeMoviesById(id);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Ошибка удаления фильма:', error);
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: error,
        });
      });
  };

  const onSignIn = ({ email, password }, setApiError) => {
    setIsLoading(true);
    mainApi
      .signin({ email, password })
      .then(() => {
        setCurrentUser((state) => ({ ...state, isAuthenticated: true }));
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

  const onRegistration = (values, setApiError) => {
    const { name, email, password } = values;
    setIsLoading(true);
    mainApi
      .signup({ name, email, password })
      .then(() => {
        mainApi.signin({ email, password })
          .then(() => setCurrentUser((state) => ({ ...state, isAuthenticated: true })))
          .then(() => navigate('/movies'));
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

  const ProtectedSavedMovies = (
    <ProtectedRoute
      element={SavedMovies}
      isAuthenticated={currentUser.isAuthenticated}
      updateMovies={updateMovies}
      removeMoviesById={removeMoviesById}
      saveIds={saveIds}
      setSaveIds={setSaveIds}
      savedMovies={savedMovies}
      onDeleteMovie={onDeleteMovie}
    />
  );

  const ProtectedProfile = (
    <ProtectedRoute
      element={Profile}
      isAuthenticated={currentUser.isAuthenticated}
      setSaveIds={setSaveIds}
      handleProfile={handleProfile}
      isLoading={isLoading}
      handleLogout={handleLogout}
    />
  );

  const ProtectedMovies = (
    <ProtectedRoute
      element={Movies}
      isAuthenticated={currentUser.isAuthenticated}
      isLoading={isLoading}
      updateMovies={updateMovies}
      saveIds={saveIds}
      setSaveIds={setSaveIds}
      savedMovies={savedMovies}
      onSaveMovie={onSaveMovie}
      onDeleteMovie={onDeleteMovie}
    />
  );

  const ProtectedRegister = (
    <ProtectedRoute
      isAuthenticated={!currentUser.isAuthenticated}
      element={Register}
      handleRegister={handleRegister}
      onRegistration={onRegistration}
      isLoading={isLoading}
    />
  );

  const ProtectedLogin = (
    <ProtectedRoute
      element={Login}
      isAuthenticated={!currentUser.isAuthenticated}
      onSignIn={onSignIn}
      isLoading={isLoading}
    />
  );

  return (
    <div className="App">
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header/>
          <main>
            <InfoTooltip
              status={isInfoTooltip}
              onClose={closeInfoTooltip}
            />
            <Routes>
              <Route path="/" element={<Main/>} index={true}/>
              <Route path="/movies" element={ProtectedMovies}/>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/saved-movies" element={ProtectedSavedMovies}/>
              <Route path="/profile" element={ProtectedProfile}/>
              <Route
                path="/signup"
                element={ProtectedRegister}/>
              <Route path="/signin" element={ProtectedLogin}/>
            </Routes>
          </main>
          <Preloader isLoading={isLoading}/>
          <Footer/>
        </CurrentUserContext.Provider>
      </SetCurrentUserContext.Provider>
    </div>
  );
}

export default App;
