import React, { useContext, useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Delimiter from '../Delimiter/Delimiter.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { CurrentUserContext } from '../../constexts/CurrentUserContext';
import useMediaQuery from '../../hooks/use-media-query';
import {
  EIGHT_CARDS,
  FIVE_CARDS,
  MEDIA_QUERIES,
  THREE_CARDS,
  TWELVE_CARDS,
  TWO_CARDS,
} from '../../constant';
import './MoviesCardList.css';

function MoviesCardList(props) {
  const {
    isSavedMoviesPage,
    movies,
    isLoading,
    saveIds,
    onSaveMovie,
    onDeleteMovie,
  } = props;

  const [visibleMovies, setVisibleMovies] = useState(EIGHT_CARDS);
  const currentUser = useContext(CurrentUserContext);
  const isWideScreen = useMediaQuery(MEDIA_QUERIES.WIDE_SCREEN);
  const isMediumScreen = useMediaQuery(MEDIA_QUERIES.MEDIUM_SCREEN);
  const isSmallScreen = useMediaQuery(MEDIA_QUERIES.SMALL_SCREEN);

  useEffect(() => {
    const handleResize = () => {
      if (isWideScreen) {
        setVisibleMovies(TWELVE_CARDS);
      } else if (isMediumScreen) {
        setVisibleMovies(EIGHT_CARDS);
      } else if (isSmallScreen) {
        setVisibleMovies(FIVE_CARDS);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isWideScreen, isMediumScreen, isSmallScreen]);

  const incrementVisibleMovies = (increment) => {
    setVisibleMovies((prevVisibleMovies) => {
      const nextVisibleMovies = prevVisibleMovies + increment;
      return nextVisibleMovies > movies.length ? movies.length : nextVisibleMovies;
    });
  };

  const showMoreMovies = () => {
    if (isMediumScreen || isSmallScreen) {
      incrementVisibleMovies(TWO_CARDS);
    } else {
      incrementVisibleMovies(THREE_CARDS);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (currentUser.moviesError) {
    return (
      <p className="movies__nothing-found">
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер
        недоступен. Подождите немного и попробуйте ещё раз"
      </p>
    );
  }

  if (movies.length === 0) {
    return <p className="nothing__found">"Ничего не найдено"</p>;
  }

  return (
    <div className="movies__card">
      <Delimiter />
      <div className="movies__list">
        {movies.slice(0, visibleMovies).map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            id={movie.id || movie._id}
            movieId={movie.movieId || movie.id}
            title={movie.nameRU}
            duration={movie.duration}
            url={movie.url || movie.image}
            country={movie.country}
            isSavedMoviesPage={isSavedMoviesPage}
            director={movie.director}
            year={movie.year}
            description={movie.description}
            trailerLink={movie.trailerLink}
            thumbnail={movie.thumbnail}
            nameRU={movie.nameRU}
            nameEN={movie.nameEN}
            isSaveMovie={saveIds?.has(movie.id)}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
          />
        ))}
      </div>
      {visibleMovies < movies.length && (
        <div className="movies__wrapper-button">
          <button className="movies__button" onClick={showMoreMovies}>
            Ещё
          </button>
        </div>
      )}
    </div>
  );
}

export default MoviesCardList;
