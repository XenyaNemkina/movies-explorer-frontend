import "./Promo.css";
import globusLogo from "../../images/logo_globus.svg";

function Promo() {
  return (
    <section className="promo">
      <img className="promo__img" src={globusLogo} alt="Глобус из слов Веб"></img>
      <div className="promo__text">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__link" href="#" >Узнать больше</a>
      </div>
    </section>
  )
  };

  export default Promo;