import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox({ onChange }) {
  const [isActive, setIsActive] = useState(false);
  const filterCheckbox = isActive ? 'filter__thumb-checked' : '';
  const filterTrack = isActive ? 'filter__track-checked' : '';

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
        <>
            <label className="filter">
                <input
                    name="isShortFilm"
                    onClick={onClick}
                    onChange={onChange}
                    className="filter__checkbox"
                    type="checkbox"
                />
                <span className={`${filterTrack} filter__track`}>
                    <span className={`${filterCheckbox} filter__thumb`}/>
                </span>
                <span className="filter__text">Короткометражки</span>
            </label>
        </>

  );
}

export default FilterCheckbox;
