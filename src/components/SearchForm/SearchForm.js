import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find from "../../images/find.svg"

function SearchForm() {
  return(
    <section className="searchform">
      <form className="searchform__form">
        <input required className="searchform__input" placeholder="Фильм"></input> 
        <button className="searchform__btn" type="submit"></button>
        <span className="searchform__input_error"></span>
        
      </form>
      <FilterCheckbox />
      <hr className="searchform__line" />
    </section>
  )
}

export default SearchForm;