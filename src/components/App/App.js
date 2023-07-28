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
import { newMainApi } from "../../utils/MainApi";
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
  const [currentUser, setCurrentUser] = useState();
  const [errorAuth, setErrorAuth] = useState('');
  const [movies, setMovies] = useState([]);
  const [errorMovies, setErrorMovies] = useState('');
  const [toggleSmallMeter, setToggleSmallMeter] = useState(false)
  const [reactionsOnSearch, setReactionsOnSearch] = useState(false)
  const [research, setReSearch] = useState(false);
  const [text, setText] = useState('')
  const navigate = useNavigate();

    //Регистрация пользователя
    async function handleRegister(name, email, password) {
      setIsLoaderActive(true);
      try {
        const user = await newMainApi.register(name, email, password);
        console.log(user);
        if(user) {
          setCurrentUser(user);
          console.log(user);
          setIsLoggedIn(true);
          navigate('/signin', {replace: true})
        }
      } catch (err) {
          setErrorAuth(err);
          console.log(err);
        } finally {
          setIsLoaderActive(false)
        }
    }
  
    //Логин
    async function handleLogin(email, password) {
      setIsLoaderActive(true);
      try {
        const user = await newMainApi.login(email, password);
        if(user) {
            console.log(user)
            console.log(currentUser);
            setIsLoggedIn(true);
            navigate('/movies', {replace: true});
          }
        } catch (err) {
        console.log(err);
      } finally {
        setIsLoaderActive(false);
      }
    }

    const handleSetUserData = useCallback(async () => {
      setIsLoaderActive(true);
      try {
        const user = await newMainApi.getUserInfo();
        if(user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
          navigate('/movies', {replace: true});
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

    //Выход из профиля и обнуление стейтов
    async function handleLogout() {
      setIsLoaderActive(true);
      try {
        await newMainApi.logOut();
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.clear();
        navigate('/', {replace: true});
      } catch(err) {
        console.log(`Ошибка с выходом из аккаунта: ${err}`)
      } finally {
        setIsLoaderActive(false);
      }
    }
  
/* !!! */
  function findAllMovies(evt, value) {
    setIsLoaderActive(true)
    evt.preventDefault()
    if(!value){
      setIsLoaderActive(false)
      setText('Введите значение.')
      return null
    }
    value = value.toLowerCase()
    moviesApi.getMovies()
    .then(res => {
      let list = res.filter(el => el.nameRU.toLowerCase().includes(value))
      if( list.length === 0 ){
        setText('Ничего не найдено.')
        console.log('this it')
        return null
      }
      const IsSmallMeter = localStorage.getItem('smallMeter')
      if(IsSmallMeter === 'false'){
        localStorage.setItem('findList', JSON.stringify(list))
        localStorage.setItem('valueInput', value)
        localStorage.setItem('numberOfMoviesDisplayed', '0')
        setReactionsOnSearch(!reactionsOnSearch)
      }else{
        list = list.filter(el => el.duration < 40)
        localStorage.setItem('findList', JSON.stringify(list))
        localStorage.setItem('valueInput', value)
        localStorage.setItem('numberOfMoviesDisplayed', '0')
        setReactionsOnSearch(!reactionsOnSearch)
      }
      refresh()
    })
      .catch(err => console.log(err))
      .finally(() => setIsLoaderActive(false))
  }

  function findSavedMovies(evt, value) {
    evt.preventDefault()
    value = value.toLowerCase()
    localStorage.setItem('valueInputSavedMovies', value)
    const saveMovies = JSON.parse(localStorage.getItem('savedMoviesList'))

    const IsSmallMeter = localStorage.getItem('smallMeter')
    let list = saveMovies.filter(el => el.nameRU.toLowerCase().includes(value))
    if(IsSmallMeter === 'false'){
      localStorage.setItem('SavedMovielistMatchInput', JSON.stringify(list))
      setReactionsOnSearch(!reactionsOnSearch)
    }else{
      list = saveMovies.filter(el => el.duration < 40)
      localStorage.setItem('SavedMovieslistMatchInput', JSON.stringify(list))
      setReactionsOnSearch(!reactionsOnSearch)
    }
    if( saveMovies.length === 0  || list.length===0){
      setText('Ничего не найдено.')
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

  function saveMovie(id) {
    setIsLoaderActive(true)
    const targetFilm = JSON.parse(localStorage.getItem('findList')).filter(el => el.id === id)[0]
    newMainApi.postMovie(targetFilm).then(res => {
      newMainApi.getSavedFilms()
        .then(res => {
          let movieWithOwner = res.filter(el => el.owner === currentUser._id)
          if(!movieWithOwner){
          }else{
            localStorage.setItem('savedMoviesList', JSON.stringify(movieWithOwner))
          }
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoaderActive(false))
    })
  }

  function deleteMovie(cardId) {
    setIsLoaderActive(true)
    deleteMovie(cardId)
      .then(res => {
        const listBeforeDelete = JSON.parse(localStorage.getItem('savedMoviesList'))
        const listWithDelete = listBeforeDelete.filter(el => el._id !== cardId)
        localStorage.setItem('savedMoviesList', JSON.stringify(listWithDelete))
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoaderActive(false))
  }

/* !!! */
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
            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile currentUser={currentUser} errorAuth={errorAuth} onLogout={handleLogout}/></ProtectedRoute>} />
            <Route path="/movies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header onBurgerClick={handleBurger} />
              <Movies
                 findMovies={findAllMovies}
                 handleSmallMetr={handleSmallMetr}
                 toggleSmallMeter={toggleSmallMeter}
                 saveMovie={saveMovie}
                 deleteMovie={deleteMovie} />
              <Footer />
            </ProtectedRoute>} />
            <Route path="/saved-movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Header onBurgerClick={handleBurger} />
                <SavedMovies   
                  findMovies={findSavedMovies}
                  handleSmallMetr={ handleSmallMetr }
                  toggleSmallMeter={toggleSmallMeter}
                  deleteMovie={deleteMovie} /> 
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