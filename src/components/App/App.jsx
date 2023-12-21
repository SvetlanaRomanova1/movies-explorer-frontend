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

const initialState = {
  isAuthenticated: false,
};

function App({ handleRegister }) {
  const [currentUser, setCurrentUser] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

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
        setCurrentUser((state) => ({ ...state, isAuthenticated: false }));
        // eslint-disable-next-line no-console
        console.error('Error fetching user info:', error);
      })
      .finally(() => setIsLoading(false));
  }, [currentUser.isAuthenticated]);

  const ProtectedSavedMovies = (
        <ProtectedRoute
            element={SavedMovies}
            isAuthenticated={currentUser.isAuthenticated}
        />
  );

  const ProtectedProfile = (
        <ProtectedRoute
            element={Profile}
            isAuthenticated={currentUser.isAuthenticated}
        />
  );

  const ProtectedMovies = (
        <ProtectedRoute
            element={Movies}
            isAuthenticated={currentUser.isAuthenticated}
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
                                element={
                                    <Register
                                        handleRegister={handleRegister}
                                    />
                                }/>
                            <Route path="/signin" element={<Login />}/>
                        </Routes>
                    </main>
                    <Footer/>
                </CurrentUserContext.Provider>
            </SetCurrentUserContext.Provider>
        </div>
  );
}

export default App;
