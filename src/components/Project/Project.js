import "./Project.css";

function Project() {
  return (
    <section className="project">
      <h2 className="section__title">О проекте</h2>
      <div className="project__table">
        <div className="project__table-cell">
          <h3 className="project__table-heading">Дипломный проект включал 5 этапов</h3>
          <p className="project__table-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__table-cell">
          <h3 className="project__table-heading">На выполнение диплома ушло 5 недель</h3>
          <p className="project__table-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project__duration">
        <div className="project__duration-dev">
          <div className="project__duration-quantity project__duration-quantity_black">1 неделя</div>
          <p className="project__duration-text">Back-end</p>
        </div>
        <div className="project__duration-dev">
          <div className="project__duration-quantity">4 недели</div>
          <p className="project__duration-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default Project;
