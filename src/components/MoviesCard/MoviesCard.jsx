import React, {useState} from 'react';
import './MoviesCard.css';
import DeleteIconMovies from "../svg/DeleteIconMovies";

function MoviesCard({id, title, duration, image, isSavedMoviesPage}) {
    const [isActive, setIsActive] = useState(false);
    const [moviesCardHovered, setMoviesCardHovered] = useState('')

    const onClick = () => {
        setIsActive(!isActive);
    }

    const saveCardClass = isActive ? 'movies-card__save' : ''


    const onMouseOver = (e) => {
       setMoviesCardHovered('movies-card-hovered');
    }

    const onMouseLeave = (e) => {
        setMoviesCardHovered('');
    }

    return (
        <div
            className={`movies-card ${saveCardClass} ${moviesCardHovered}`}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            <div className="movies-card__image" style={{backgroundImage: `url(${image})`}}/>
            {!isSavedMoviesPage && <button
                onClick={onClick}
                className={`movies-card__button-action`}
            >
                Сохранить
            </button>}
            {isSavedMoviesPage && (
                <button
                    className={`movies-card__button-action movies-card__button-color movies-card__button-delete`}>
                    <DeleteIconMovies/>
                </button>
            )}
            <div className="movies-card__context">
                <p className="movies-card__title">{title}</p>
                <span className="movies-card__duration">{duration}</span>
            </div>

        </div>
    );
}

export default MoviesCard;
