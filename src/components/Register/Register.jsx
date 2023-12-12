import './Register.css';
import WelcomeLogo from "../WelcomeLogo/WelcomeLogo";
import AuthenticationButtons from "../AuthenticationButtons/AuthenticationButtons";

function Register(props) {
    return (
        <div className="register">
            <form className="register__form">
                <WelcomeLogo
                    title="Добро пожаловать!"
                />
                <div className="register__form-container">
                    <label className="register__label">
                        <span className="register__text-input">Имя</span>
                        <input
                            type="text"
                            className="register__input"
                            name="name"
                            minLength="2"
                            maxLength="30"
                            value="Виталий"
                            required
                        />
                    </label>
                    <label className="register__label">
                        <span className="register__text-input">E-mail</span>
                        <input
                            type="email"
                            className="register__input"
                            value="123@mail.ru"
                            required
                        />
                    </label>
                    <label className="register__label">
                        <span className="register__text-input">Пароль</span>
                        <input
                            type="password"
                            className="register__input"
                            required
                        />
                    </label>
                </div>
                <AuthenticationButtons
                    submitButtonText="Зарегистрироваться"
                    subtitle="Уже зарегистрированы?"
                    login="Войти"
                />
            </form>
        </div>
    )
}

export default Register;
