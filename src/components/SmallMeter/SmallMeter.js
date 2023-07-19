import './SmallMeter.css'
import React from "react";

function SmallMeter({ handleSmallMetr, toggleSmallMeter }) {
  const isChecked = localStorage.getItem('smallMeter') === 'false' || localStorage.getItem('smallMeter') === false ? false : true
  localStorage.setItem('smallMeter', toggleSmallMeter.toString())

  function actionSmallMetr(e) {
    localStorage.setItem('smallMeter', handleSmallMetr().toString())
  }

  return (
    <div className='formSearch__toggle'>
      <button className={`formSearch__check ${isChecked ? 'checked' : ''}`} type="button" onClick={actionSmallMetr}/>
      <p className="formSearch__description-check">Короткометражки</p>
    </div>
  )
}

export default SmallMeter