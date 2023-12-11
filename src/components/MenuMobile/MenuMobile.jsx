import './MenuMobile.css';
import Navigation from "../Navigation/Navigation";
import React from "react";
import CloseIcon from "../svg/CloseIcon";

function MenuMobile({setMobileMenuOpen}) {

    const handleCloseMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <div className="menu__mobile_container">
                <button className="menu__mobile-button_close" onClick={handleCloseMenu}>
                    <CloseIcon />
                </button>
                <Navigation setMobileMenuOpen={setMobileMenuOpen} isAuthenticated={true}/>
        </div>
    )
}

export default MenuMobile;
