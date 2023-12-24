import { Link } from 'react-router-dom';
import './AuthenticationButtons.css';

function AuthenticationButtons(props) {
  const {
    submitButtonText,
    subtitle,
    login,
    register,
    className = '',
    isValid,
  } = props;

  return (
    <div className={`authentication__button-container ${className}`}>
      <button type="submit"
        className={`authentication__button ${!isValid ? 'authentication__button_disabled' : ''}`}
        disabled={!isValid}>
        {submitButtonText}
      </button>
      <div className="authentication__info-container">
        <p className="authentication__description">
          {subtitle}
        </p>
        <Link to="/signin" className="register__link-exit">
          {login}
        </Link>
        <Link to="/signup" className="register__link-exit">
          {register}
        </Link>
      </div>
    </div>
  );
}

export default AuthenticationButtons;
