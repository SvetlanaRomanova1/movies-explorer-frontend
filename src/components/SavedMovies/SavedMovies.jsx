import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import mainApi from '../../utils/MainApi';
import useUpdateMovies from '../../hooks/use-update-movies';

function SavedMovies() {
  const {
    filteredMovies,
    setFilteredMovies,
    updateMovies,
    setSavedMovies,
    removeMoviesById,
  } = useUpdateMovies();

  // Функция для обновления списка сохраненных фильмов
  const updateSavedMovies = () => {
    mainApi.getSaveMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setFilteredMovies(movies);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Ошибка при получении сохраненных фильмов:', error);
      });
  };

  useEffect(() => {
    // Вызываем функцию обновления при монтировании компонента
    updateSavedMovies();
  }, []);

  return (
    <>
      <SearchForm updateMovies={updateMovies}/>
      <MoviesCardList
        removeMoviesById={removeMoviesById}
        isSavedMoviesPage
        movies={filteredMovies}
      />
    </>
  );
}

export default SavedMovies;
