import { Routes, Route } from 'react-router-dom';
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
import './App.css';
import MoviesApi from '../../utils/MoviesApi';
import transformMovies from '../../utils/transformMovies';
import useUpdateMovies from '../../hooks/use-update-movies';

const initialState = {
  isAuthenticated: false,
};

function App({ handleRegister }) {
  const [currentUser, setCurrentUser] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [saveIds, setSaveIds] = useState(new Map());

  const {
    filteredMovies,
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
        setCurrentUser((prevState) => ({
          ...prevState,
          moviesError: '',
        }));
        // MoviesApi для получения списка фильмов
        const data = await MoviesApi.getMovies();
        const transformData = transformMovies(data);
        setSavedMovies(transformData);
      } catch (error) {
        setCurrentUser((prevState) => ({
          ...prevState,
          moviesError: error,
        }));
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
  }, []);

  const ProtectedSavedMovies = (
    <ProtectedRoute
      element={SavedMovies}
      isAuthenticated={currentUser.isAuthenticated}
      updateMovies={updateMovies}
      removeMoviesById={removeMoviesById}
      filteredMovies={filteredMovies}
      saveIds={saveIds}
      setSaveIds={setSaveIds}
      savedMovies={savedMovies}
    />
  );

  const ProtectedProfile = (
    <ProtectedRoute
      element={Profile}
      isAuthenticated={currentUser.isAuthenticated}
      setSaveIds={setSaveIds}
    />
  );

  const ProtectedMovies = (
    <ProtectedRoute
      element={Movies}
      isAuthenticated={currentUser.isAuthenticated}
      isLoading={isLoading}
      updateMovies={updateMovies}
      removeMoviesById={removeMoviesById}
      filteredMovies={filteredMovies}
      saveIds={saveIds}
      setSaveIds={setSaveIds}
      savedMovies={savedMovies}
    />
  );

  const ProtectedRegister = (
    <ProtectedRoute
      isAuthenticated={!currentUser.isAuthenticated}
      element={Register}
      handleRegister={handleRegister}
    />
  );

  const ProtectedLogin = (
    <ProtectedRoute
      element={Login}
      isAuthenticated={!currentUser.isAuthenticated}

    />
  );

  if (isLoading) {
    return <Preloader/>;
  }

  return (
    <div className="App">
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header/>
          <main>
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
          <Footer/>
        </CurrentUserContext.Provider>
      </SetCurrentUserContext.Provider>
    </div>
  );
}

export default App;
