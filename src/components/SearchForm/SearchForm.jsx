import React, { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';
import useFormAndValidation from '../../hooks/use-form-and-validation';
import useWriteLocalStorage from '../../hooks/use-write-local-storage';
import useReadLocalStorage from '../../hooks/use-read-local-storage';
import './SearchForm.css';

function SearchForm(props) {
  const {
    updateMovies,
    savedMovies,
    isSavedMoviesPage = false,
  } = props;

  const initValues = useReadLocalStorage(isSavedMoviesPage);
  const writeToStorage = useWriteLocalStorage(isSavedMoviesPage);
  const [errorQuery, setErrorQuery] = useState('');

  const {
    values,
    handleChange,
    isValid,
  } = useFormAndValidation(initValues, writeToStorage);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      updateMovies(values);
      setErrorQuery('');
    } else {
      setErrorQuery('Нужно ввести ключевое слово.');
    }
  }

  useEffect(() => {
    if (typeof values.search === 'string' && !values.search.trim()) {
      updateMovies(values);
    }
  }, [values]);

  useEffect(() => {
    updateMovies(values);
  }, [values.isShortFilm, savedMovies]);

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <input
          className="search__input"
          type="text"
          name="search"
          placeholder="Фильм"
          value={values.search || ''}
          onChange={handleChange}
          required
        />
        <span className="search__input_error">{errorQuery}</span>
        <div className="search__form-controls">
          <button className="search__button" type="submit">
              Найти
          </button>
          <div className="search__delimiter"/>
          <FilterCheckbox isActive={values.isShortFilm} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
