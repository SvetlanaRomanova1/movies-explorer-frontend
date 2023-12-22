import React, { useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';
import useFormAndValidation from '../../hooks/use-form-and-validation';
import './SearchForm.css';

function SearchForm({ updateMovies, savedMovies }) {
  const {
    values,
    handleChange,
    errors,
  } = useFormAndValidation(true);

  function handleSubmit(e) {
    e.preventDefault();
    updateMovies(values);
  }

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
                <span className="search__input_error">{errors.search}</span>
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
