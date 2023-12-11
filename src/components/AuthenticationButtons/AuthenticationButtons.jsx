import {Link} from "react-router-dom";
import './AuthenticationButtons.css';

function AuthenticationButtons (props) {
    const {
        submitButtonText,
        subtitle,
        login,
        register,
        className = ''
    } = props;

    return (
        <div className={`authentication__button-container ${className}`}>
            <button className="authentication__button">
                {submitButtonText}
            </button>
            <div className="authentication__info-container">
                <p className="authentication__description">
                    {subtitle}
                </p>
                <Link to="/signin" className="register__link_exit">
                    {login}
                </Link>
                <Link to="/signup" className="register__link_exit">
                    {register}
                </Link>
            </div>
        </div>
    )
}

export default AuthenticationButtons;
