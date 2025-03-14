import { useState } from 'react'
import './App.css'
import StarRating from './components/StarRating';

function App() {

  function getNumberOfStars(){
      const countOfStars=window.prompt("Enter the number of stars");
      console.log(countOfStars);
      return parseInt(countOfStars,10);
    }

  return (
    <div>
      <StarRating noOfStars={getNumberOfStars()}/>
    </div>
  )
}

export default App
