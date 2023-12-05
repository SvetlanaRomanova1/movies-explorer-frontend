import React, {useState} from 'react';
import './MoviesCard.css';

function MoviesCard({ id, title, duration, image }) {
    const [isActive, setIsActive] = useState(false);

    const onClick = () => {
        setIsActive(!isActive);
    }

    const saveCardClass = isActive ? 'movies-card__save' : ''

    return (
        <article className={`movies-card ${saveCardClass}`}>
            <div className="movies-card__image" style={{ backgroundImage: `url(${image})` }} />
            <button
                onClick={onClick}
                className="movies-card__button_save"
            >Сохранить</button>
            <div className="movies-card__context">
                <p className="movies-card__title">{title}</p>
                <span className="movies-card__duration">{duration}</span>
            </div>
        </article>
    );
}

export default MoviesCard;
