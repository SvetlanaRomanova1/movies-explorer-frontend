import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import './Techs.css';

function Techs() {
  return (
    <div className="techs" id="techs">
      <SectionHeader>
                Технологии
      </SectionHeader>
      <div>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className="techs__container-transfer">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">MongoDB</li>
      </ul>
    </div>
  );
}

export default Techs;
