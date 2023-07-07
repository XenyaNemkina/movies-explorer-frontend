import "./Promo.css";
import globusLogo from "../../images/logo_globus.svg";

function Promo() {
  const scrollPage = () => {
    const btn = document.getElementById("btn");
    btn.scrollIntoView();
  };

  return (
    <section className="promo">
      <img className="promo__img" src={globusLogo} alt="Глобус из слов Веб"></img>
      <div className="promo__text">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className="promo__btn link" id="btn" type="button" onClick={scrollPage}>
          Узнать больше
        </button>
      </div>
    </section>
  );
}

export default Promo;
