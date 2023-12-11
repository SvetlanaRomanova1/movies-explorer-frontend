import './FilterCheckbox.css';
import {useState} from "react";

function FilterCheckbox() {
    const [isActive, setIsActive] = useState(false);
    const filterCheckbox = isActive ? 'filter__thumb-checked' : '';
    const filterTrack = isActive ? 'filter__track-checked' : '';

    const onClick = () => {
        setIsActive(!isActive)
    }

    return (
        <label className="filter">
            <input
                onClick={onClick}
                className="filter__checkbox"
                type="checkbox"
            />
            <div className={`${filterTrack} filter__track`}>
                <div className={`${filterCheckbox} filter__thumb`}/>
            </div>
            <span className="filter__text">Короткометражки</span>
        </label>
    );
}

export default FilterCheckbox;
