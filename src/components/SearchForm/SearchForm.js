import "./SearchForm.css";
import React, { useState } from 'react'
import useWindowDimensions from "../../utils/changeWindow";
import {useLocation} from "react-router-dom";

function SearchForm({findMovies, handleSmallMetr, toggleSmallMeter}) {
  const location = useLocation();
  let inputValue
  if (location.pathname === '/movies'){
    inputValue = localStorage.getItem('valInput') ? localStorage.getItem('valInput') : ''
  }
  if (location.pathname ==='/savedMovies'){
    inputValue = localStorage.getItem('valInputSavedFilms') ? localStorage.getItem('valInputSavedFilms') : ''
  }

    const windowWidth = useWindowDimensions().width >= 730
    const [val, setVal] = useState(inputValue)
  
    function writeValue(evt) {
      setVal(evt.target.value)
    }

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={(evt) => findMovies(evt, val)} noValidate>
        <div className="searchform__bar">
          <input required className="searchform__input" value={val} placeholder="Фильм" onChange={writeValue}></input>
          <button className="searchform__btn link" type="submit"></button>
        </div>
        <fieldset className="searchform__filter">
          <input className="searchform__checkbox" type="checkbox"></input>
          <h3 className="searchform__text">Короткометражки</h3>
        </fieldset>
      </form>
      <hr className="searchform__line" />
    </section>
  );
}

export default SearchForm;
