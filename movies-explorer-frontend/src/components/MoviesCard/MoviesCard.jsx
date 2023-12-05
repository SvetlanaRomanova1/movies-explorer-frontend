import React from 'react';
import './MoviesCard.css';

function MoviesCard({ id, title, duration, image }) {
    return (
        <article className="movies-card">
            <div className="movies-card__image" style={{ backgroundImage: `url(${image})` }} />
            <button className="movies-card__button_save">Сохранить</button>
            <div className="movies-card__context">
                <p className="movies-card__title">{title}</p>
                <span className="movies-card__duration">{duration}</span>
            </div>
        </article>
    );
}

export default MoviesCard;
