import React, { useEffect, useRef, useState } from 'react'
import './Wheather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Wheather = () => {
      const inputref = useRef()
      const [weatherData ,setweatherData] = useState(false);

      const allicons = {
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
        
      }

      const search = async (city)=> {
        if(city === ""){
          alert("Enter City Name");
            return;
          
        }
        try{
          const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f60a467ca9e86716bef9285fe3912948`;

          const response = await fetch(url);
          const data = await response.json();
          console.log(data)

          if(!response.ok){
            alert(data.message);
            return;
          }
          
      
          const icon = allicons[data.weather[0].icon] || clear_icon;
          setweatherData({
            humidity:data.main.humidity,
            windSpeed:data.wind.speed,
            temprature:Math.floor(data.main.temp),
            location:data.name,
            icon : icon
          })



        } catch (error){
            setweatherData(false);
            console.error("Error in fetching weather data");
        }
      }

        useEffect(()=>{
            search("London")
        },[])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputref} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick={()=> search(inputref.current.value)} />
      </div>
      {
        weatherData?<><img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temprature'>{weatherData.temprature}°c</p>
        <p className='location'>{weatherData.location}</p>
  
        <div className="wheathr-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
          
        </div></> :
        <></>
      }
      
    </div>
  )
}

export default Wheather
