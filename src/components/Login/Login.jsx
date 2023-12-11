import WelcomeLogo from "../WelcomeLogo/WelcomeLogo";
import AuthenticationButtons from "../AuthenticationButtons/AuthenticationButtons";
import './Login.css';

function Login () {
    return(
        <main className="login">
            <form className="login__form">
                <WelcomeLogo title="Рады видеть!" />
                <div className="login__form-container">
                    <label className="login__label">
                        <p className="login__text_input">E-mail</p>
                        <input
                            type="email"
                            className="login__input"
                            value="123@mail.ru"
                            required
                        />
                    </label>
                    <label className="login__label">
                        <p className="login__text_input">Пароль</p>
                        <input
                            type="password"
                            className="login__input"
                            required
                        />
                    </label>
                </div>
                <AuthenticationButtons
                    submitButtonText="Войти"
                    subtitle="Ещё не зарегистрированы?"
                    register="Регистрация"
                />
            </form>
        </main>
    )
}

export default Login;
