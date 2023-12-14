import './NavTab.css';
import {HashLink as Link} from "react-router-hash-link";

function NavTab() {
    return (
        <nav className="nav-tab">
            <ul className="nav-tab__lists">
                <li className="nav-tab__list">
                    <Link className="nav-tab__link" to="/#about">О проекте</Link>
                </li>
                <li className="nav-tab__list">
                    <Link className="nav-tab__link" to="/#techs">Технологии</Link>
                </li>
                <li className="nav-tab__list">
                    <Link className="nav-tab__link" to="/#student">Студент</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavTab;
