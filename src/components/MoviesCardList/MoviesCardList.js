import "./MoviesCardList.css";
import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowDimensions from "../../utils/changeWindow";

function MoviesCardList({ isSaved, postLike, testRender, deleteCard}) {
  const [numberOfMoviesDisplayed, setNumberOfMoviesDisplayed] = useState(localStorage.getItem('numberOfMoviesDisplayed'))
  let windowWidth = useWindowDimensions().width
  let rowNumber
  if(windowWidth<700){
    rowNumber = 5
  }
  else if(windowWidth>=700 && windowWidth<850){
    rowNumber = 2
  }
  else if(windowWidth>=850 && windowWidth<1140){
    rowNumber = 3
  }
  else {
    rowNumber = 4
  }

  if (+numberOfMoviesDisplayed < 4){
    localStorage.setItem('numberOfMoviesDisplayed', rowNumber.toString())
    setNumberOfMoviesDisplayed(rowNumber.toString())
  }

  const findList = JSON.parse(localStorage.getItem('findList'))
  const savedList = JSON.parse(localStorage.getItem('savedMoviesList'))
  let displaySearchSavedFilms
  if(localStorage.getItem('valInputSavedFilms')?.length){
    displaySearchSavedFilms = JSON.parse(localStorage.getItem('SavedFilmlistMatchInput'))
  }



  const [limitCoin, setLimitCoin] = useState(Number(numberOfMoviesDisplayed))
  const [buttonVisible, setButtonVisible] = useState(false)

  function renderLimiter(val= 0) {
    setLimitCoin((prev)=> prev + rowNumber)
    localStorage.setItem('numberOfMoviesDisplayed', (+limitCoin + rowNumber).toString())
  }

  function disableButton(val){
    setButtonVisible(val)
  }

  useEffect(()=> {
    if(Number(localStorage.getItem('numberOfMoviesDisplayed')) === 0){
      localStorage.setItem('numberOfMoviesDisplayed', rowNumber.toString())
      setLimitCoin(rowNumber)
      disableButton(false)
  }}, [localStorage.getItem('numberOfMoviesDisplayed'), windowWidth])

  if(limitCoin >= findList?.length){
    setLimitCoin(findList.length - 1)
    disableButton(true)
  }

  return (
    <section className="movieslist">
      <ul className="movieslist__items">
      {
          displaySearchSavedFilms?.length && isSaved ?
            displaySearchSavedFilms?.map(el => <MoviesCard
              data={el}
              id ={el.movieId? el.movieId : el._id}
              key={el.movieId + Math.random()}
              isSaved={true}
              testRender={testRender}
              deleteCard={deleteCard}
            />)
            :

          isSaved ? savedList?.map(el => <MoviesCard
            data={el}
            id ={el.movieId? el.movieId : el._id}
            key={el.movieId + Math.random()}
            isSaved={true}
            testRender={testRender}
            deleteCard={deleteCard}
          />)
          :
          findList?.length - limitCoin <= 1 ?
            findList?.map((el) => {
              let isLike
              if(savedList){
                isLike = savedList.filter(savedListEl => savedListEl.movieId === el.id)
              }else{
                isLike = savedList?.filter(savedListEl => savedListEl.movieId === el.id)
              }
              return <MoviesCard data={el} key={el.id} postLike={postLike} id = {el.id} isLike={isLike} deleteCard={deleteCard}/>
            })
            :
            findList?.length > 4 ?
              findList.slice(0, limitCoin).map((el) => {
                let isLike
                if(savedList){
                  isLike = savedList.filter(savedListEl => savedListEl.movieId === el.id)
                }else{
                  isLike = savedList?.filter(savedListEl => savedListEl.movieId === el.id)
                }

                return <MoviesCard data={el} key={el.id} postLike={postLike} id = {el.id} isLike={isLike} deleteCard={deleteCard}/>
              })
              :
              findList?.length<4 && findList?.length>0 ?
                findList.map((el) => {
                  let isLike
                  if(savedList){
                    isLike = savedList.filter(savedListEl => savedListEl.movieId === el.id)
                  }else{
                    isLike = savedList?.filter(savedListEl => savedListEl.movieId === el.id)
                  }
                  return <MoviesCard data={el} key={el.id} postLike={postLike} id = {el.id} isLike={isLike} deleteCard={deleteCard}/>
                })
                : null
        }
      </ul>
      <button className="movieslist__morebtn link" type="button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
