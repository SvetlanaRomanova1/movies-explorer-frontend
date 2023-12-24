import './AboutProject.css';
import SectionHeader from '../SectionHeader/SectionHeader.jsx';

function AboutProject() {
  return (
    <div className="about-project" id="about">
      <SectionHeader>
                О проекте
      </SectionHeader>
      <div className="about-project__content">
        <div className="about-project__section">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__transfer">
                        Составление плана, работу над бэкендом,
                      вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__section">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__transfer">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
                      было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__content-time">
        <div>
          <h4 className="about-project__time-backend">1 неделя</h4>
          <p className="about-project__subject">Back-end</p>
        </div>
        <div>
          <h4 className="about-project__time-frontend" >4 недели</h4>
          <p className="about-project__subject">Front-end</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
