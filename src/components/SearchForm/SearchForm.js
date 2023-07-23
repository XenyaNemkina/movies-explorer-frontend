import "./SearchForm.css";
import React, { useState } from 'react'
import useWindowDimensions from "../../utils/changeWindow";
import {useLocation} from "react-router-dom";
import LabelSearch from '../LabelSearch/LabelSearch'
import SmallMeter from '../SmallMeter/SmallMeter'

  function SearchForm({findMovies, handleSmallMetr, toggleSmallMeter}) {
    const location = useLocation();
    let inputValue
    if (location.pathname === '/movies'){
      inputValue = localStorage.getItem('valueInput') ? localStorage.getItem('valueInput') : ''
    }
    if (location.pathname ==='/saved-movies'){
      inputValue = localStorage.getItem('valueInputSavedFilms') ? localStorage.getItem('valueInputSavedFilms') : ''
    }
  
    const windowWidth = useWindowDimensions().width >= 730
    const [value, setValue] = useState(inputValue)
  
    function writeValue(e) {
      setValue(e.target.value)
    }
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      findMovies(evt, value)
    }


  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit} noValidate>
      <LabelSearch writeValue={writeValue} value={value}/>
        {windowWidth && <SmallMeter
          handleSmallMetr={handleSmallMetr}
          toggleSmallMeter={toggleSmallMeter}
        />}
      </form>
      {!windowWidth && <SmallMeter
        handleSmallMetr={handleSmallMetr}
        toggleSmallMeter={toggleSmallMeter}
      />}
     <hr className="searchform__line" />
    <span className="searchform__error"></span>
    </section>
  );
}

export default SearchForm;
