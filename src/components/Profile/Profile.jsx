import './Profile.css';

function Profile() {
    return (
        <main className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            <form className="profile__form">
                <div className="profile__label_wrapper">
                    <div className="profile__label_context">
                        <label className="profile__label_text">
                            Имя
                        </label>
                        <input
                            type="text"
                            className="profile__input"
                            name="name"
                            value="Виталий"
                            required
                        />
                    </div>
                    <div className="profile__delimiter"/>
                    <div className="profile__label_context">
                        <label className="profile__label_text">
                            E-mail
                        </label>
                        <input
                            type="email"
                            className="profile__input"
                            name="email"
                            value="poooochta@mail.ru"
                            required
                        />
                    </div>
                </div>
            </form>
            <div className="profile__container_button">
                <button className="profile__button_edit">
                    Редактировать
                </button>
                <button className="profile__button_exit">
                    Выйти из аккаунта
                </button>
            </div>
        </main>
    )
}

export default Profile;
