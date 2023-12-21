import React, { useContext, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import MoviesApi from '../../utils/MoviesApi';
import { SetCurrentUserContext } from '../../constexts/CurrentUserContext';
import transformMovies from '../../utils/transformMovies';
import useUpdateMovies from '../../hooks/use-update-movies';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const setCurrentUser = useContext(SetCurrentUserContext);

  const {
    filteredMovies,
    setFilteredMovies,
    updateMovies,
    setSavedMovies,
    removeMoviesById,
  } = useUpdateMovies();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setCurrentUser((prevState) => ({
          ...prevState,
          moviesError: '',
        }));
        setIsLoading(true);
        // MoviesApi для получения списка фильмов
        const data = await MoviesApi.getMovies();
        const transformData = transformMovies(data);
        setSavedMovies(transformData);
        setFilteredMovies(transformData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setCurrentUser((prevState) => ({
          ...prevState,
          moviesError: error,
        }));
        // eslint-disable-next-line no-console
        console.error('Ошибка при загрузке фильмов:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="main">
      <SearchForm
        updateMovies={updateMovies}
      />
      <MoviesCardList
        removeMoviesById={removeMoviesById}
        isLoading={isLoading}
        movies={filteredMovies}
      />
    </div>
  );
}

export default Movies;
