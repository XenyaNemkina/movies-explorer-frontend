import React, { useEffect, useState } from "react";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
// import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", maxwidth: "1280px", margin: "0 auto" }}>
      <header className="header">
      </header>
      <Movies />
      <Footer />      
    </div>
   /* <div className='page'>
       <Routes>
        <Route path="/" element={<><Header /><Main /><Footer /></>} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <InfoTooltip />
    </div> */
  );
}

export default App;
