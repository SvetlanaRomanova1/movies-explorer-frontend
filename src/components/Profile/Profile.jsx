import './Profile.css';
import {useState} from "react";

function Profile() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            <form className="profile__form">
                <div className="profile__label-wrapper">
                    <div className="profile__label-context">
                        <label className="profile__label-text">
                            Имя
                        </label>
                        <input
                            type="text"
                            className="profile__input"
                            name="name"
                            value="Виталий"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="profile__delimiter"/>
                    <div className="profile__label-context">
                        <label className="profile__label-text">
                            E-mail
                        </label>
                        <input
                            type="email"
                            className="profile__input"
                            name="email"
                            value="poooochta@mail.ru"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </form>
            <div className="profile__container-button">
                <button className="profile__button-edit">
                    Редактировать
                </button>
                <button className="profile__button-exit">
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    )
}

export default Profile;
