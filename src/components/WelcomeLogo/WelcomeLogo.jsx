import './WelcomeLogo.css';
import { Link } from 'react-router-dom';
import logoRegisterPage from '../../image/logo-header.svg';

function WelcomeLogo(props) {
  return (
    <>
      <Link to="/" className="welcome__link">
        <img src={logoRegisterPage} alt="Логотип"/>
      </Link>
      <h2 className="welcome__title">{props.title}</h2>
    </>
  );
}

export default WelcomeLogo;
