import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <h2 className="footer__title">Учебный проект Яндекс.Практикум&nbsp;х BeatFilm.</h2>
                <div className="footer__delimiter" />
            </div>
            <div className="footer__wrapper">
                <p className="footer__paragraph">&copy; 2023</p>
                <ul className="footer__list">
                    <li className="footer__item">
                        <a className="footer__link" target="_blank"  href="https://practicum.yandex.ru">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" target="_blank"  href="https://github.com/SvetlanaRomanova1">Github</a>
                    </li>

                </ul>
            </div>

        </footer>
    )
}

export default Footer;
