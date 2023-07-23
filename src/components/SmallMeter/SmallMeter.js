import React from "react";
import "./SmallMeter.css";

function SmallMeter({ handleSmallMetr, toggleSmallMeter }) {
  const isChecked = localStorage.getItem('smallMeter') === 'false' || localStorage.getItem('smallMeter') === false ? false : true
  localStorage.setItem('smallMeter', toggleSmallMeter.toString())

  function actionSmallMetr(e) {
    localStorage.setItem('smallMeter', handleSmallMetr().toString())
  }

  return (
    <div className="searchform__filter">
      <button className={`searchform__checkbox ${isChecked ? 'checked' : ''}`} type="button" onClick={actionSmallMetr}/>
      <p className={`searchform__text ${isChecked ? 'checked' : ''}`}>Короткометражки</p>
    </div>
  )
}

export default SmallMeter;
