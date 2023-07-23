import './LabelSearch.css'

function LabelSearch({writeValue, value}) {
  return (
    <label className="searchform__bar">
      <input className="searchform__input" type="text" value={value || ""} placeholder="Фильм" onChange={writeValue}/>
      <button className="searchform__btn link" type="submit"/>
    </label>
  )
}

export default LabelSearch;