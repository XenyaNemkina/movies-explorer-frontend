import "./Main.css";
import Promo from "../Promo/Promo";
import Project from "../Project/Project";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main() {
  return(
    <main className="content">
      <Promo />
      <Project />
      <Techs />
      <AboutMe />
    </main>
  )
}

export default Main;