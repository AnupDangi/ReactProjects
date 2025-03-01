import './App.css'
import Lottery from './Lottery'
function App() {

  //ask user to bet the sum number 
  let sum=prompt("Enter the sum value you expect");
  let count=prompt("Enter the number times you want to bet");

   return (
    <>
      
      <Lottery n={3} winningSum={parseInt(sum)}count={count}/>
    </> 
  )
}

export default App
