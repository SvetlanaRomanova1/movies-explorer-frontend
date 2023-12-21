import React from 'react';
import Promo from '../Promo/Promo.jsx';
import NavTab from '../NavTab/NavTab.jsx';
import AboutProject from '../AboutProject/AboutProject.jsx';
import Techs from '../Techs/Techs.jsx';
import AboutMe from '../AboutMe/AboutMe.jsx';
import Portfolio from '../Portfolio/Portfolio.jsx';

function Main() {
  return (
        <>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </>
  );
}

export default Main;
