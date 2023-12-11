import './App.css';
import {CurrentUserContext} from "../../constexts/CurrentUserContext";
import {Routes, Route} from "react-router-dom";
import Header from "../Header/Header";
import React, {useState} from "react";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Preloader from "../ Preloader/ Preloader";
import NotFound from "../NotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";


function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <div className="App">
            <Preloader/>
            <CurrentUserContext.Provider value={currentUser}>
                <Header isAuthenticated={isAuthenticated}/>
                <Routes>
                    <Route path="/" element={<Main/>} index={true}/>
                    <Route path="/movies" element={<Movies/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/saved-movies" element={<SavedMovies/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/signup" element={<Register/>}/>
                    <Route path="/signin" element={<Login/>} />
                </Routes>
                < Footer/>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
