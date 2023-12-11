import './Promo.css';
import iconPromo from '../../image/promo-icon.svg'

function Promo() {

    return (
        <section className="promo">
            <div className="promo__container">
                <div className="promo__wrapper">
                    {/*<img className="promo__icon" src={iconPromo} alt=""/>*/}
                    <h2 className="promo__title">
                        <span className="promo__title_block">Учебный проект студента</span>
                        факультета Веб-разработки.
                    </h2>
                </div>
            </div>
        </section>
    )
}

export default Promo;
