import React, { useState } from 'react';
import DeleteIconMovies from '../svg/DeleteIconMovies.jsx';
import transformDuration from '../../utils/transformDuration';
import mainApi from '../../utils/MainApi';
import './MoviesCard.css';

function MoviesCard(props) {
  const {
    id,
    duration,
    url,
    isSavedMoviesPage,
    country,
    director,
    year,
    description,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    isSaveMovie,
    saveIds,
    setSaveIds,
    movieId,
    removeMoviesById,
  } = props;

  const [moviesCardHovered, setMoviesCardHovered] = useState('');

  const saveCardClass = !isSavedMoviesPage && isSaveMovie ? 'movies-card__save' : '';

  const onMouseOver = () => {
    setMoviesCardHovered('movies-card-hovered');
  };

  const onMouseLeave = () => {
    setMoviesCardHovered('');
  };

  const handleDeleteMovie = (e) => {
    e.preventDefault();
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
      });
  };
  const handleSaveMovies = (e) => {
    e.preventDefault();
    if (isSaveMovie) {
      handleDeleteMovie(e);
      return;
    }
    mainApi.saveNewMovies({
      id,
      duration,
      image: url,
      country,
      director,
      year,
      description,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
    })
      .then((res) => {
        setSaveIds((prevState) => new Map(prevState).set(res.movieId, res._id));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Ошибка при сохранении фильма:', error);
      });
  };

  return (
        <div
            className={`movies-card ${saveCardClass} ${moviesCardHovered}`}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
          <div className="movies-card__image-wrap">
            <a target="_blank" rel="noreferrer" href={trailerLink}>
              <div className="movies-card__image" style={{ backgroundImage: `url(${url})` }}/>
            </a>
          </div>
            {!isSavedMoviesPage && <button
                onClick={(e) => {
                  handleSaveMovies(e);
                }}
                className={'movies-card__button-action'}
            >
                Сохранить
            </button>}
            {isSavedMoviesPage && (
                <button
                    onClick={handleDeleteMovie}
                    className={'movies-card__button-action movies-card__button-color movies-card__button-delete'}>
                    <DeleteIconMovies/>
                </button>
            )}
            <div className="movies-card__context">
                <p className="movies-card__title">{nameRU || nameEN}</p>
                <span className="movies-card__duration">{transformDuration(duration)}</span>
            </div>
        </div>
  );
}

export default MoviesCard;
