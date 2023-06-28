import "./Footer.css";

function Footer() {
  return(
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__columns">
        <p className="footer__year">&#169; {new Date().getFullYear()}</p>
        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/XenyaNemkina">Github</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;