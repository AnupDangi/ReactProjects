import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';
import InfoBox from './InfoBox';

export default function SearchBox({updateInfo}){
    let[city,setCity]=useState("");
    let[err,setErr]=useState(false);

    const API_KEY="01bf27b17a3c06a3a5a9390c0c391198";
    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    

    let handleChange=(event)=>{
        setCity(event.target.value);
    }

    let getWeatherInfo= async(city)=>{
            let response=await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse=await response.json();
            // console.log(jsonResponse);
            let result={
                city:city,
                temp:jsonResponse.main.temp,
                tempMin:jsonResponse.main.temp_min,
                tempMax:jsonResponse.main.temp_max,
                humidiy:jsonResponse.main.humidity,
                feelsLike:jsonResponse.main.feels_like,
                weather:jsonResponse.weather[0].description,
            }
            console.log(result);
            return result;
    };


    let handleSubmit=async(event)=>{
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
            let newinfo=await getWeatherInfo(city);
            updateInfo(newinfo);
        }
        catch(err){
            setErr(true);
         }
    };

    return(
        <div className='SearchBox'>
            <h3>Search for the Weather</h3>

            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" 
               variant="outlined" required 
               value={city}
               onChange={handleChange}/>
               <br /><br /><br />
            <Button variant="contained" type="submit">
                Search
            </Button>
            {err && <p style={{color:"red"}}>No Such place exits</p>}
            </form>
        </div>
    );
}