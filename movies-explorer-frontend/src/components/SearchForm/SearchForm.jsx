import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input
                    className="search__input"
                    type="text"
                    name="search"
                    placeholder="Фильм"
                    required
                />
                    <div className="search__form_controls">
                        <button className="search__button">
                            Найти
                        </button>
                        <div className="search__delimiter"/>
                        <FilterCheckbox />
                    </div>
            </form>
        </section>
    )
}

export default SearchForm;
