import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import "./InfoBox.css"

export default function InfoBox({info}){
    const INIT_URL="https://images.unsplash.com/photo-1628525805814-cf9fe2582727?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const HOT_URL="https://images.unsplash.com/photo-1431727499043-70167d3d8c90?q=80&w=1882&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const COLD_URL="https://images.unsplash.com/photo-1519944159858-806d435dc86b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const RAIN_URL="https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


    return(
        <div className="InfoBox">
              
            <h1>Weather Info-{info.weather}</h1>
            <div className='cardContainer'>
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={info.humidity>80?RAIN_URL:(info.temp>15 ?HOT_URL :COLD_URL)}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {info.city}{
            info.humidiy>80?
            <AcUnitIcon/>:
            (info.temp>15? <WbSunnyIcon/>:<ThunderstormIcon/>)
         }
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
            <p>Temperate={info.temp}&deg;C</p>
            <p>Humidity={info.humidity}&deg;C</p>
            <p>Min Temp={info.tempMin}</p>
            <p>Max Temp={info.tempMax}</p>
            <p>The weather can be described as <i>{info.weather}</i> and
                 feelslike {info.feelslike}&deg;C
            </p>

        </Typography>
      </CardContent>
      <CardActions>
             
      </CardActions>
        </Card>
        </div>
        </div>
    )
}