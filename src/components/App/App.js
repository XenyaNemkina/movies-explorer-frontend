import React, { useEffect, useState } from "react";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='page'>
       <Routes>
        <Route path="/" element={<><Header /><Main /><Footer /></>} />

        <Route path="/movies" element={<><Header /><Movies /><Footer /></>} />
        <Route path="/saved-movies" element={<><Header /><SavedMovies /><Footer /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div> 
  );
}

export default App;
