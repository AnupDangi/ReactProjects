import { useState,useEffect } from 'react'
// import './App.css'
import ImageSlider from './components/ImageSlider'
function App() {
  const [limit,setLimit]=useState(null);
  async function getNoofImages(){
    let noOfImages=window.prompt("How many images slider you want to build?");
    console.log(parseInt(noOfImages));
    setLimit(noOfImages);
  }

  useEffect(()=>{
      getNoofImages();
  },[]);

  return (
    <>  
        <ImageSlider url={"https://picsum.photos/v2/list"} limit={limit} page={'1'}/>
    </>
  )
}

export default App
