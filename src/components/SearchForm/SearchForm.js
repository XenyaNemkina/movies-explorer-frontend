import "./SearchForm.css";
import find from "../../images/find.svg"

function SearchForm() {
  return(
    <section className="searchform">
      <form className="searchform__form">
        <div className="searchform__bar">
          <input required className="searchform__input" placeholder="Фильм"></input> 
          <button className="searchform__btn" type="submit"></button>
        </div>
        <fieldset className="searchform__filter">
          <input className="searchform__checkbox" type="checkbox"></input>
          <h3 className="searchform__text">Короткометражки</h3>
        </fieldset>
      </form>
      <hr className="searchform__line" />
    </section>
  )
}

export default SearchForm;