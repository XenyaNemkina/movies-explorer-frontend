import "./SearchForm.css";
import React, { useState } from 'react'
import useWindowDimensions from "../../utils/changeWindow";
import {useLocation} from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";


function SearchForm({onSubmit}) { 
  const [formValue, setFormValue] = React.useState({
    searchText: "",
  });
const [error, setError ] = useState();

const handleChange = (evt) => {
  const value = evt.target.value;
  const name = evt.target.name;
  setFormValue({ ...formValue, [name]: value });
};

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!formValue.searchText) {
      setError("Ничего не найдено");
      return
    }
    onSubmit(formValue.searchText);
    setFormValue({searchText: ""})
  }


  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit} noValidate>
        <div className="searchform__bar">
          <input required className="searchform__input" type="text" name="search" value={formValue.searchText} placeholder="Фильм" onChange={handleChange}></input>
          <button className="searchform__btn link" type="submit"></button>
        </div>
      </form>
     <hr className="searchform__line" />
    <span className="searchform__error">{error}</span>
    </section>
  );
}

export default SearchForm;
