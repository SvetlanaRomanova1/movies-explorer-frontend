import React, {useState} from 'react';
import './MoviesCard.css';
import DeleteIconMovies from "../svg/DeleteIconMovies";

function MoviesCard({id, title, duration, image, isSavedMoviesPage}) {
    const [isActive, setIsActive] = useState(false);

    const onClick = () => {
        setIsActive(!isActive);
    }

    const saveCardClass = isActive ? 'movies-card__save' : ''

    return (
        <article className={`movies-card ${saveCardClass}`}>
            <div className="movies-card__image" style={{backgroundImage: `url(${image})`}}/>
            {!isSavedMoviesPage && <button
                onClick={onClick}
                className="movies-card__button_action"
            >
                Сохранить
            </button>}
            {isSavedMoviesPage && (
                <button className="movies-card__button_action movies-card__button_color movies-card__button_delete">
                    <DeleteIconMovies/>
                </button>
            )}
            <div className="movies-card__context">
                <p className="movies-card__title">{title}</p>
                <span className="movies-card__duration">{duration}</span>
            </div>

        </article>
    );
}

export default MoviesCard;
