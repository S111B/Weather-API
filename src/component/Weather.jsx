import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snowy_icon from '../assets/snowy.png'
import wind_icon from '../assets/wind.png'
import humidty_icon from '../assets/humidty.png'
const Weather = () => { 

  const inputRef= useRef()

  const[ weatherData, setWeatherData]=useState(false);

  const allicons={
    "01d":clear_icon,
    "01n":clear_icon,
"02d":cloudy_icon,
"02n":cloudy_icon,
"03d":cloudy_icon,
"03n":cloudy_icon,
"04d":drizzle_icon,
"04n":drizzle_icon,
"09d":rain_icon,
"09n":rain_icon,
"10d":rain_icon,
"10n":rain_icon,
"13d":snowy_icon,
"13n":snowy_icon,
  }

const search = async(city)=>{ 
  if(city===""){
    alert(" Enter city name");
    return
  }
   try {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}$units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const response= await fetch(url);
    const data = await response.json();

if(!response.ok){
  alert(data.message);
  return;
}

    console.log(data);
    setWeatherData({
      humidity:data.main.humidity,
      windSpeed:data.wind.speet,
      temperature:Math.floor(data.main.temp,),
      location:data.name,
      icon:icon
    })
    
    
   } catch (error) {
    setWeatherData(false);
    console.error(" Error is fetching weather data")
   }
}

useEffect(()=>{
  search("");
},[])

  return (
    <div className='weather'>
     <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={search_icon}alt="" onClick={()=>search(inputRef.current.value)}/>
     </div>
{weatherData?<>
  <img src={weatherData.icon} alt="" className='weather-icon'/>
     <p className='tamperature'>{weatherData.temperature}°c</p>
     <p className='Location'>{weatherData.location}</p>
     <div className="weather-data">
    <div className="col">
      <img src={humidty_icon} alt="" className='humidty'/>
      <div>
        <p>{weatherData.humidity}%</p>
        <span>Humidty</span>
      </div>
    </div>
    <div className="col">
      <img src={wind_icon} alt=""className='wind' />
      <div>
        <p>{weatherData.windSpeed}Km/h</p>
        <span>Wind Speed</span>
      </div>
    </div>
     </div>
</>:<>

</>}

     
    </div>
   
  )
}

export default Weather
