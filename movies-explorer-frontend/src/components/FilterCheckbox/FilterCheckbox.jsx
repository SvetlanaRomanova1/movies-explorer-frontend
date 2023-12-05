import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <label className="filter">
            <input
                className="filter__checkbox"
                type="checkbox"
            />
            <div className="filter__track">
                <div className="filter__thumb"/>
            </div>
            <span className="filter__text">Короткометражки</span>
        </label>
    );
}

export default FilterCheckbox;
