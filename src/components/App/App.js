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
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import newMainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";


function App() {
  const [isBurger, setIsBurger] = useState(false);
  const [infoMessage, setInfoMessage] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token && !isLoggedIn) {
      handleTokenCheck(token);
    };
  }, []);
  
  const handleTokenCheck = (token) => {
    newMainApi.checkToken(token)
      .then((data) => {
        setIsLoggedIn(true);
        navigate('/', {replace: true});
      })
      .catch((err) =>{
        console.log(err)
      })
  }

  function handleLogin(email, password) {
    return newMainApi.authorization(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/movies', {replace: true})
        }
      )
      .catch((err) => {
        console.log("Что-то пошло не так! Попробуйте еще раз.")
      })}

  function handleRegister(name, email, password) {
    return newMainApi.register(name, email, password)
      .then(()=> 
        navigate("/signin", { replace: true })
      )
      .catch(() => {
       console.log("Что-то пошло не так! Попробуйте еще раз.")
      })
    };
  

  const handleBurger = () => {
    setIsBurger(!isBurger)
  }; 

  return (
    <div className='page'>
       <Routes>
        <Route path="/" element={<><Header isBurger={isBurger} onBurgerClick={handleBurger} /><Main /><Footer /></>} />
        <Route path="/signin" element={
            isLoggedIn? <Navigate to='/'/> : <Login onSubmit = {handleLogin}/>} />
          <Route path="/signup" element=
           {isLoggedIn? <Navigate to='/'/> : <Register onSubmit={handleRegister}/>} />
            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile /></ProtectedRoute>} />
            <Route path="/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Header onBurgerClick={handleBurger} /><Movies /><Footer /></ProtectedRoute>} />
            <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Header onBurgerClick={handleBurger} /><SavedMovies /><Footer /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
      </Routes>
      <BurgerMenu isBurger={isBurger} onClose={handleBurger} />
    </div> 
  );
}

export default App;