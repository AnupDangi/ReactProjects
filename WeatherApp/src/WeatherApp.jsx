import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo]=useState({
        city:"Delhi",
        feelslike:21.4,
        temp:22.35,
        humidity:29,
        tempMax:22.35,
        tempMin:22.35,
        weather:"scatter clouds",
    });

    const updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }

    return(
        <div>
             <SearchBox updateInfo={updateInfo}/>
             <InfoBox info={weatherInfo}/>   
        </div>
    )
}