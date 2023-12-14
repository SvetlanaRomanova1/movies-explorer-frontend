import './AboutMe.css';
import SectionHeader from "../SectionHeader/SectionHeader";
import avatarImage from '../../image/avatar.svg'

function AboutMe() {
    return (
        <div className="about-me" id="student">
            <SectionHeader>
                Студент
            </SectionHeader>
            <div className="about-me__wrapper">
                <div className="about-me__content">
                 <div>
                     <h3 className="about-me__name">Светлана</h3>
                     <p className="about-me__description">Фронтенд-разработчик, 27 лет</p>
                     <span className="about-me__text">
                 Я живу в городе Москва. Стремлюсь начать свою карьеру в сфере веб-разработки в качестве JavaScript разработчика.
                    Имею базовые знания в области веб-технологий и опыт работы с  JavaScript.
                    Готова к активному обучению, развитию и вкладу в проекты.
                    В свободное время занимаюсь изучением новых технологий по программированию, особенно JavaScript.
                    Учусь применять знания на практике в небольших проектах

                </span>
                 </div>
                    <a className="about-me__link"
                       href="https://github.com/SvetlanaRomanova1?tab=repositories">Github</a>
                </div>
                <div className="about-me__avatar">
                    <img className="about-me__avatar-image" src={avatarImage} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default AboutMe;
