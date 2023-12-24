import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found">
      <div className="not-found__description">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
      <button className="not-found__button" onClick={goBack}>
                Назад
      </button>
    </div>
  );
}

export default NotFound;
