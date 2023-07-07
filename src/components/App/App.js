import React, { useEffect, useState } from "react";
import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import { Routes, Route } from 'react-router-dom';
import BurgerMenu from "../BurgerMenu/BurgerMenu";


function App() {
  const [isBurger, setIsBurger] = useState(false);

  const handleBurger = () => {
    setIsBurger(!isBurger)
  }; 

  return (
    <div className='page'>
       <Routes>
        <Route path="/" element={<><Header isBurger={isBurger} onBurgerClick={handleBurger} /><Main /><Footer /></>} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<><Header onBurgerClick={handleBurger} /><Movies /><Footer /></>} />
        <Route path="/saved-movies" element={<><Header onBurgerClick={handleBurger} /><SavedMovies /><Footer /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BurgerMenu isBurger={isBurger} onClose={handleBurger} />
    </div> 
  );
}

export default App;
