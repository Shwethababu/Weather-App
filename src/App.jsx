import { useState, useEffect } from 'react'
import searchIcon from "./assets/search.png";
import cloudsIcon from "./assets/clouds.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import mistIcon from "./assets/mist.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import clearIcon from "./assets/clear.png";
import snowIcon from "./assets/snow.png";
// import PropTypes from "prop-types";


import './App.css'
const WeatherDetails =({icon,temp,city,country,lat,long , humidity , wind}) =>{
  return (
    <>
  <div className="image">
    <img src={icon} alt="Image"/>

  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitude </span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="long">longitude </span>
      <span>{long}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="humidity" className="icon"/>
      <div className="data">
        <div className="humidity-percent">{humidity}%</div>
        <div className="text">Humidity</div>
      </div>
    </div>
    <div className="element">
      <img src={windIcon} alt="wind" className="icon"/>
      <div className="data">
        <div className="wind-percent">{wind} km/h</div>
        <div className="text">Wind Speed</div>
      </div>
    </div>
  </div>
  </>
  )
};

// WeatherDetails.propTypes = {
//   icon:PropTypes.string,isRequired,
//   temp:PropTypes.number.isRequired,
//   city:PropTypes.string.isRequired,
//   country:PropTypes.string.isRequired,
//   humidity: PropTypes.number.isRequired,
//   wind:PropTypes.number.isRequired,
//   lat:PropTypes.number.isRequired,
//   long:PropTypes.number.isRequired,

// }
function App() {
  let api_key = "acbd4857321882a1746caf90e3f837e8";
  const [text,setText] = useState("Chennai");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city,setCity] = useState("Chennai")
  const [country, setCountry]= useState("In");
  const [lat,setLat] = useState(0);
  const [long,setLong] = useState(0);
  const [humidity, setHumidity]= useState(0);
  const[wind,setWind] = useState(0);
  const[cityNotFound, setCityNotFound] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const weatherIconMap ={
      "01d": clearIcon,
      "01n": clearIcon,
      "02d": cloudsIcon,
      "02n": cloudsIcon,
      "03d": drizzleIcon,
      "03n": drizzleIcon,
      "04d": drizzleIcon,
      "04n": drizzleIcon,
      "09d": rainIcon,
      "09n": rainIcon,
      "10d": rainIcon,
      "10n": rainIcon,
      "13d": snowIcon,
      "13n": snowIcon,
      "50d":mistIcon,
      "50n":mistIcon,

  }

  
   
  
  
  const search =async () => {
    setLoading(true);
    let api_key = "acbd4857321882a1746caf90e3f837e8"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      //console.log(data);
      if(data.cod === "404") {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity (data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon (weatherIconMap[weatherIconCode] || clearIcon)
      setCityNotFound(false)
    }
    catch(error) {
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching the data");
    }finally {
      setLoading(false);
    }
  }

  const handleCity = (e) => {
      setText(e.target.value);
  }

  const handleKeyDown = (e) => {
     if(e.key === "Enter")
     {
      search();
     }
  }

  useEffect(function () {
    search();
  },[]);
  

  return (
    <>
      <div className="container">
        <div className ="input-container">
          <input type="text" className="cityInput" placeholder="Search City" onChange={handleCity} value={text} onKeyDown ={handleKeyDown}/>
          <div className="searchIcon" onClick = {() => search()}>
            <img src={searchIcon} alt="Search Icon"/>
          </div>
        </div>  

        {loading && <div className="loading-message">
          Loading...
        </div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}

      {!loading && !cityNotFound && <WeatherDetails icon={icon}
        temp={temp}
        city ={city}
          country ={country}
          lat={lat} 
          long={long}
            humidity ={humidity} 
            wind ={wind} />}
        <p className="copyright">
        Designed by <span>Shwetha</span>
      </p>
      
      </div>
      
    </>
  )
}

export default App
