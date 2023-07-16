import React, { useEffect, useState, useCallback } from "react";
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
import moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUserContext';


function App() {
  const [isBurger, setIsBurger] = useState(false);
  const [infoMessage, setInfoMessage] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorAuth, setErrorAuth] = useState('');
  const [movies, setMovies] = useState([]);
  const [errorMovies, setErrorMovies] = useState('');
  const [toggleSmallMeter, setToggleSmallMeter] = useState(false)
  const [reactionsOnSearch, setReactionsOnSearch] = useState(false)
  const [research, setReSearch] = useState(false)
  const navigate = useNavigate();

  const handleSetUserData = useCallback(async () => {
    setIsLoaderActive(true);
    try {
      const user = await newMainApi.getUserInfo();
      if(user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.log(`Ошибка вывода данных юзера: ${err}`)
    } finally {
      setIsLoaderActive(false);
    }
  }, []);

  useEffect(() => {
    handleSetUserData();
  },[handleSetUserData]);

  function handleLogin(email, password) {
    setIsLoaderActive(true);
    return newMainApi.authorization(email, password)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        navigate('/movies', {replace: true})
        }
      )
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoaderActive(false)
      })}
  

  function handleRegister(name, email, password) {
    setIsLoaderActive(true);
    return newMainApi.register(name, email, password)
      .then(()=> 
        navigate("/signin", { replace: true })
      )
      .catch((err) => {
        setErrorAuth(err)
      })
      .finally(() => {
        setIsLoaderActive(false)
      })
    };

    
  function handleLogout() {
    localStorage.clear()
    setIsLoggedIn(false)
    navigate("/")
  }
  

  function findAllMovies(e, val) {
    setIsLoaderActive(true)
    e.preventDefault()
    if(!val){
      setIsLoaderActive(false)
      setErrorMovies("Введите значение")
      return null
    }
    val = val.toLowerCase()
    moviesApi.getMovies()
    .then(res => {
      let list = res.filter(el => el.nameRU.toLowerCase().includes(val))
      if( list.length === 0 ){
        setErrorMovies("Ничего не найдено")
        return null
      }
      const isSmallMeter = localStorage.getItem('smallMeter')
      if(isSmallMeter === 'false'){
        localStorage.setItem('findList', JSON.stringify(list))
        localStorage.setItem('valInput', val)
        localStorage.setItem('numberOfMoviesDisplayed', '0')
        setReactionsOnSearch(!reactionsOnSearch)
      }else{
        list = list.filter(el => el.duration < 40)
        localStorage.setItem('findList', JSON.stringify(list))
        localStorage.setItem('valInput', val)
        localStorage.setItem('numberOfMoviesDisplayed', '0')
        setReactionsOnSearch(!reactionsOnSearch)
      }
      refresh()
    })
      .catch(err => console.log(err))
      .finally(() => setIsLoaderActive(false))
  }

  function findMainMovies(e, val) {
    e.preventDefault()
    val = val.toLowerCase()
    localStorage.setItem('valInputSavedFilms', val)
    const saveFilms = JSON.parse(localStorage.getItem('savedMoviesList'))
    const isSmallMeter = localStorage.getItem('smallMeter')
    let list = saveFilms.filter(el => el.nameRU.toLowerCase().includes(val))
    if(isSmallMeter === 'false'){
      localStorage.setItem('SavedFilmlistMatchInput', JSON.stringify(list))
      setReactionsOnSearch(!reactionsOnSearch)
    }else{
      list = saveFilms.filter(el => el.duration < 40)
      localStorage.setItem('SavedFilmlistMatchInput', JSON.stringify(list))
      setReactionsOnSearch(!reactionsOnSearch)
    }
    if( saveFilms.length === 0  || list.length===0){
      setErrorMovies('Ничего не найдено.')
      return null
    }
  }

  function handleSmallMetr() {
    setToggleSmallMeter(!toggleSmallMeter)
    return toggleSmallMeter
  }

  function refresh() {
    setReSearch(!research)
  }

  function movieSave(id) {
    setIsLoaderActive(true)
    const targetMovie = JSON.parse(localStorage.getItem('findList')).filter(el => el.id === id)[0]
    newMainApi.postMovie(targetMovie)
    .then(res => {
      newMainApi.getSavedFilms()
        .then(res => {
          let filmWithOwner = res.filter(el => el.owner === currentUser._id)
          if(!filmWithOwner){

          }else{
            localStorage.setItem('savedMoviesList', JSON.stringify(filmWithOwner))
          }
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoaderActive(false))
    })
  }

  function deleteMovie(movieId) {
    setIsLoaderActive(true)
    deleteMovie(movieId)
      .then(res => {
        const listBeforeDelete = JSON.parse(localStorage.getItem('savedMoviesList'))
        const listWithDelete = listBeforeDelete.filter(el => el._id !== movieId)
        localStorage.setItem('savedMoviesList', JSON.stringify(listWithDelete))
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoaderActive(false))
  }

  const handleBurger = () => {
    setIsBurger(!isBurger)
  }; 

  return (
    <div className='page' >
      {isLoaderActive ? (<Preloader />) : (
        <CurrentUserContext.Provider value={currentUser}>
       <Routes>
        <Route path="/" element={<><Header isBurger={isBurger} onBurgerClick={handleBurger} /><Main /><Footer /></>} />
        <Route path="/signin" element={
            isLoggedIn? <Navigate to='/'/> : <Login errorAuth={errorAuth} onSubmit = {handleLogin}/>} />
          <Route path="/signup" element=
           {isLoggedIn? <Navigate to='/'/> : <Register errorAuth={errorAuth} onSubmit={handleRegister}/>} />
            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile errorAuth={errorAuth} onLogout={handleLogout}/></ProtectedRoute>} />
            <Route path="/movies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header onBurgerClick={handleBurger} />
              <Movies
                findMovies={findAllMovies}
                handleSmallMetr={handleSmallMetr}
                toggleSmallMeter={toggleSmallMeter}
                movieSave={movieSave}
                deleteMovie={deleteMovie} />
              <Footer />
            </ProtectedRoute>} />
            <Route path="/saved-movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Header onBurgerClick={handleBurger} />
                <SavedMovies 
                  findMovies={findMainMovies}
                  handleSmallMetr={ handleSmallMetr }
                  toggleSmallMeter={toggleSmallMeter}
                  deleteMovie={deleteMovie}
                />
                <Footer />
              </ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
      </Routes>
      <BurgerMenu isBurger={isBurger} onClose={handleBurger} />
      </CurrentUserContext.Provider>
      )}
    </div> 
  );
}

export default App;