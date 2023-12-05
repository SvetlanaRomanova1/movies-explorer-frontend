import './App.css';
import {CurrentUserContext} from "../../constexts/CurrentUserContext";
import {Routes, Route} from "react-router-dom";
import Header from "../Header/Header";
import React, {useState} from "react";
import Navigation from "../Navigation/Navigation";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Preloader from "../ Preloader/ Preloader";

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <div className="App">
            <Preloader />
            <CurrentUserContext.Provider value={currentUser}>
                <Header isAuthenticated={isAuthenticated}/>
                <Routes>
                    <Route path="/" element={<Main/>}>

                    </Route>
                    <Route path ="/movies" element={<Movies/>}>

                    </Route>
                </Routes>
                < Footer />
            </CurrentUserContext.Provider>

        </div>
    );
}

export default App;
