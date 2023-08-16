import React, { useEffect, useState } from "react";
import "./App.css";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [isBurger, setIsBurger] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorAuth, setErrorAuth] = useState("");
  const [toggleSmallMeter, setToggleSmallMeter] = useState(false);
  const [research, setReSearch] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState("");
  
  const handleGetUserInfo = (token) => {
    return newMainApi.getUserInfo(token).then((user) => {
      setIsLoggedIn(true);
      setCurrentUser(user);
      return user;
    });
  };
  
  const handleGetSavedMovies = () => {
    return newMainApi
      .getSavedMovies()
      .then((res) => {
        if (!res) {
          setText("Ничего не найдено");
        } else {
          localStorage.setItem("savedMoviesList", JSON.stringify(res));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoaderActive(false));
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleGetUserInfo(token)
        .then(handleGetSavedMovies)
        .catch((err) => console.log(err))
        .finally(() => setIsLoaderActive(false));
    }
    
  }, []);

  function handleLogin(email, password) {
    setErrorAuth("");
    return newMainApi
      .authorization(email, password)
      .then(data => {
        localStorage.setItem("token", data.token);
        if (data.token) {
          return handleGetUserInfo(data.token)
            .then(handleGetSavedMovies)
            .then(() => {
              navigate("/movies", {
                replace: true
              });
            });
        }
      })
      .catch(err => {
        setErrorAuth(err);
      })
  }
  
  function handleRegister(name, email, password) {
    setIsLoaderActive(true);
    setErrorAuth("");
    return newMainApi
      .register(name, email, password)
      .then(user => {
        if (user) {
          return handleLogin(email, password).then(() => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            navigate("/movies", {
              replace: true
            });
          });
        }
      })
      .catch(err => {
        setErrorAuth(err);
      })
      .finally(() => {
        setIsLoaderActive(false);
      });
  }

  function handleUpdateUser(userData) {
    setIsLoaderActive(true);
    newMainApi
      .setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        setIsSuccess("Данные профиля успешно изменены");
        setTimeout(() => {
          setIsSuccess("");
        }, 3000);
      })
      .catch((err) => {
        setErrorAuth(err);
      })
      .finally(() => {
        setIsLoaderActive(false);
      });
  }
  //Выход из профиля и обнуление стейтов
  async function handleLogout() {
    setIsLoaderActive(true);
    try {
      await newMainApi.logOut();
      setIsLoggedIn(false);
      setCurrentUser(null);
      localStorage.clear();
      navigate("/", { replace: true });
    } catch (err) {
      setErrorAuth(`Ошибка с выходом из аккаунта: ${err}`);
    } finally {
      setIsLoaderActive(false);
    }
  }

function setTextMovies(text) {
  setText(text)
}

  /* !!! */
 /* useEffect(() => {
    const value = localStorage.getItem("valueInput");
    const isSmallMeter = localStorage.getItem("smallMeter");
    const moviesList = JSON.parse(localStorage.getItem("findList"));
      if (isSmallMeter === "false") {
        localStorage.setItem("findList", JSON.stringify(moviesList));
        localStorage.setItem("valueInput", value);
        localStorage.setItem("numberOfMoviesDisplayed", "0");
        } else {
        const list = moviesList.filter((el) => el.duration < 40);
        localStorage.setItem("findList", JSON.stringify(list));
        localStorage.setItem("valueInput", value);
        localStorage.setItem("numberOfMoviesDisplayed", "0");
    }}, [toggleSmallMeter])
*/
  async function findAllMovies() {
    try {
      const moviesData = await moviesApi.getMovies();
      localStorage.setItem("allMovies", JSON.stringify(moviesData));
      localStorage.setItem("smallMeter", false);
      return moviesData;
    } catch (err) {
      console.log(err);
      throw err;
    } 
  }

  async function findMovies(evt, value) {
    evt.preventDefault();
    setIsLoaderActive(true);
    let allMovies = JSON.parse(localStorage.getItem("allMovies"));
    if (!allMovies) {
      try {
        allMovies = await findAllMovies();
      } catch (err) {
        setText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      }
    }

    if (!value) {
      setTextMovies("Введите значение.");
      setIsLoaderActive(false);
      return;
    }
  
    value = value.toLowerCase();
    let list = allMovies.filter((el) => el.nameRU.toLowerCase().includes(value));
  
    if (list.length === 0) {
      localStorage.setItem("findList", JSON.stringify(0));
      setTextMovies("Ничего не найдено.");
    } else {
      const isSmallMeter = localStorage.getItem("smallMeter");
      if (isSmallMeter === "false") {
        setText("");
        localStorage.setItem("findList", JSON.stringify(list));
        localStorage.setItem("valueInput", value);
        localStorage.setItem("numberOfMoviesDisplayed", "0");
        refresh();
        } else {
        setText("");
        list = list.filter((el) => el.duration < 40);
        localStorage.setItem("findList", JSON.stringify(list));
        localStorage.setItem("valueInput", value);
        localStorage.setItem("numberOfMoviesDisplayed", "0");
      refresh();
    }}
      setIsLoaderActive(false);
  }
  

  async function findSavedMovies(evt, value) {
    evt.preventDefault();
    value = value.toLowerCase();
    localStorage.setItem("valueInputSavedMovies", value);
    const saveMovies = JSON.parse(localStorage.getItem("savedMoviesList"));
    const isSmallMeter = localStorage.getItem("smallMeter");
    let list = saveMovies.filter((el) => el.nameRU.toLowerCase().includes(value));
    if (isSmallMeter === "false") {
      setText("");
      localStorage.setItem("SavedMovieslistMatchInput", JSON.stringify(list));
    } else {
      setText("");
      list = saveMovies.filter((el) => el.duration < 40);
      localStorage.setItem("SavedMovieslistMatchInput", JSON.stringify(list));
    }
    if (saveMovies.length === 0 || list.length === 0) {
      setText("Ничего не найдено.");
      localStorage.setItem("SavedMovieslistMatchInput", JSON.stringify(0));
      return null;
    }
    refresh()
  }

  function setMoviesWithSmallMeter() {
    console.log("tut")
    const allMovies = JSON.parse(localStorage.getItem("allMovies"))
    const value = localStorage.getItem("valueInput");
    const list = allMovies.filter((el) => el.nameRU.toLowerCase().includes(value));
    const isSmallMeter = localStorage.getItem("smallMeter");
    console.log(isSmallMeter)
    if (isSmallMeter === "false") {
      console.log("1")
      localStorage.setItem("findList", JSON.stringify(list));
      localStorage.setItem("numberOfMoviesDisplayed", "0");
    } else {
      console.log("2")
      const filteredList = list.filter((el) => el.duration < 40);
      localStorage.setItem("findList", JSON.stringify(filteredList));
      localStorage.setItem("numberOfMoviesDisplayed", "0");
    }
  }

  function handleSmallMetr() {
    setToggleSmallMeter(!toggleSmallMeter);
    localStorage.setItem("smallMeter", (!toggleSmallMeter).toString());
    setMoviesWithSmallMeter();
    return toggleSmallMeter;
  }

  async function saveMovie(data) {
    try {
      setIsLoaderActive(true);
      const targetFilm = JSON.parse(localStorage.getItem("findList")).filter((el) => el.id === data.id)[0];
      const response = await newMainApi.postMovie(targetFilm);

      const savedMoviesList = JSON.parse(localStorage.getItem("savedMoviesList")) || [];
      savedMoviesList.push(response);
      localStorage.setItem("savedMoviesList", JSON.stringify(savedMoviesList));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoaderActive(false);
    }
  }

  function deleteMovie(movieId) {
    setIsLoaderActive(true);
    newMainApi
      .deleteMovie(movieId)
      .then((res) => {
        const listBeforeDelete = JSON.parse(localStorage.getItem("savedMoviesList"));
        const listWithDelete = listBeforeDelete.filter((el) => el._id !== movieId);
        localStorage.setItem("savedMoviesList", JSON.stringify(listWithDelete));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoaderActive(false));
  }

  
  function refresh() {
    setReSearch(!research)
  }

  /* !!! */
  const handleBurger = () => {
    setIsBurger(!isBurger);
  };

  return (
    <div className="page">
      {isLoaderActive ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header isBurger={isBurger} isLoggedIn={isLoggedIn} onBurgerClick={handleBurger} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route path="/signin" element={isLoggedIn ? <Navigate to="/" /> : <Login errorAuth={errorAuth} onSubmit={handleLogin} />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Register errorAuth={errorAuth} onSubmit={handleRegister} />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile isSuccess={isSuccess} currentUser={currentUser} onUpdateUser={handleUpdateUser} errorAuth={errorAuth} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Header onBurgerClick={handleBurger} isLoggedIn={isLoggedIn} />
                  <Movies findMovies={findMovies} handleSmallMetr={handleSmallMetr} toggleSmallMeter={toggleSmallMeter} saveMovie={saveMovie} deleteMovie={deleteMovie} text={text} />
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Header onBurgerClick={handleBurger} isLoggedIn={isLoggedIn} />
                  <SavedMovies findMovies={findSavedMovies} handleSmallMetr={handleSmallMetr} toggleSmallMeter={toggleSmallMeter} deleteMovie={deleteMovie} text={text} />
                  <Footer />
                </ProtectedRoute>
              }
            />
          </Routes>
          <BurgerMenu isBurger={isBurger} onClose={handleBurger} />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
