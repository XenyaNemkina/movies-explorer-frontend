import "./AboutMe.css";
import fotoMe from "../../images/foto_me.jpg";
import arrowLink from "../../images/link_arrow.svg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="section__title">Студент</h2>
      <div className="about-me__student">
        <div className="about-me__info">
          <h3 className="about-me__title">Ксения</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 33 года</p>
          <p className="about-me__text">
            Живу в Липецке, получила два высших образования ЛГТУ по специальностям "Инженер-технолог" и "Бухгалтер". Замужем, двое сыновей. Работала в сфере дизайна, выбрала развитие профессии через Веб-разработку. В данный момент времени
            работаю программистом.
          </p>
          <a target="blank" className="about-me__link link" href="https://github.com/XenyaNemkina">
            Github
          </a>
        </div>
        <img className="about-me__foto" src={fotoMe} alt="фото студента"></img>
      </div>
      <div className="portfolio">
        <h2 className="portfolio_title">Портфолио</h2>
        <div className="portfolio__links">
            <a target="_blank" className="portfolio__link link" href="https://github.com/XenyaNemkina/how-to-learn">
              <p className="portfolio__name">Статичный сайт</p>
              <img className="portfolio__link_img" src={arrowLink} alt="ссылка на проект" />
            </a>
            <a target="_blank" className="portfolio__link link" href="https://github.com/XenyaNemkina/russian-travel">
              <p className="portfolio__name">Адаптивный сайт</p>
              <img className="portfolio__link_img" src={arrowLink} alt="ссылка на проект" />
            </a>
            <a target="_blank" className="portfolio__link link" href="https://mesto.xenyanemkina.nomoredomains.rocks/">
              <p className="portfolio__name">Одностраничное приложение</p>
              <img className="portfolio__link_img" src={arrowLink} alt="ссылка на проект" />
            </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
