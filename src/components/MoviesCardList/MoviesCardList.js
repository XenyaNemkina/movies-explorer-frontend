import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import {useEffect, useState} from "react";
import useWindowDimensions from '../../utils/changeWindow'

function MoviesCardList({ isSaved, saveMovie, deleteMovie}) {
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
  let displaySearchSavedMovies
  if(localStorage.getItem('valueInputSavedMovies')?.length){
    displaySearchSavedMovies = JSON.parse(localStorage.getItem('SavedMovieslistMatchInput'))
  }



  const [limitCoin, setLimitCoin] = useState(Number(numberOfMoviesDisplayed))
  const [buttonVisible, setButtonVisible] = useState(false)

  function renderLimiter(value= 0) {
    setLimitCoin((prev)=> prev + rowNumber)
    localStorage.setItem('numberOfMoviesDisplayed', (+limitCoin + rowNumber).toString())
  }

  function disableButton(value){
    setButtonVisible(value)
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
      <div className='movieslist__items'>
        {
          displaySearchSavedMovies?.length && isSaved ?
            displaySearchSavedMovies?.map(el => <MoviesCard
              data={el}
              id ={el.movieId? el.movieId : el._id}
              key={el.movieId + Math.random()}
              isSaved={true}
              deleteMovie={deleteMovie}
            />)
            :

          isSaved ? savedList?.map(el => <MoviesCard
            data={el}
            id ={el.movieId? el.movieId : el._id}
            key={el.movieId + Math.random()}
            isSaved={true}
            deleteMovie={deleteMovie}
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
              return <MoviesCard data={el} key={el.id} saveMovie={saveMovie} id = {el.id} isLike={isLike}  deleteMovie={deleteMovie} />
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

                return <MoviesCard data={el} key={el.id} saveMovie={saveMovie} id = {el.id} isLike={isLike} deleteMovie={deleteMovie} />
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
                  return <MoviesCard data={el} key={el.id} saveMovie={saveMovie} id = {el.id} isLike={isLike} deleteMovie={deleteMovie} />
                })
                : null
        }
      </div>
      {isSaved || !findList || buttonVisible ? null : <button type="button" className="movieslist__morebtn" onClick={renderLimiter}>Ещё</button>}

    </section>
    );
  }
  


export default MoviesCardList;
