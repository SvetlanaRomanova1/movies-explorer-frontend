import './Portfolio.css';

function Portfolio() {
  return (
        <div className="portfolio">
                <h3 className="portfolio__text">Портфолио</h3>
                <ul className="portfolio__list-project">
                    <li className="portfolio__item-project">
                        <a className="portfolio__link-project" href="https://github.com/SvetlanaRomanova1/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
                    </li>
                    <li className="portfolio__item-project"><a className="portfolio__link-project" href="https://github.com/SvetlanaRomanova1/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a></li>
                    <li className="portfolio__item-project"><a className="portfolio__link-project" href="https://github.com/SvetlanaRomanova1/react-mesto-api-full-gha" target="_blank" rel="noreferrer">Одностраничное приложение</a></li>
                </ul>
        </div>
  );
}

export default Portfolio;
