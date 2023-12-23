import './FilterCheckbox.css';

function FilterCheckbox({ onChange, isActive }) {
  const filterCheckbox = isActive ? 'filter__thumb-checked' : '';
  const filterTrack = isActive ? 'filter__track-checked' : '';

  return (
    <>
      <label className="filter">
        <input
          name="isShortFilm"
          className="filter__checkbox"
          type="checkbox"
          onChange={onChange}
          checked={Boolean(isActive)}
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
