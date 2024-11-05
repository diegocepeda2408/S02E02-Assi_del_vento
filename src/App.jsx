import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import Units from "./assets/components/units";
import VideoBackground from "./assets/components/background"
import CityDate from "./assets/components/CityDate";
import { icon1, icon2, icon3, icon4, icon5 } from "./assets/img/icons";

{/*Weather API link*/}
const url = 'https://api.openweathermap.org/data/2.5/weather'

{/*Time date API link*/}
const timeApiKey = '7DAJ9DMIUPRP'
const urlTime = `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=zone&zone=`

{/*Weather API key*/}
const apiKey = 'ed2f0e97e0d91d7df61975c44c416e45'

{/*Loading icon list*/}
const icons = [icon1, icon2, icon3, icon4, icon5]


function App() {
  {/*Weather*/}
  const [coords, setCoords] = useState({latitude: 0, longitude : 0});
  const [weather, setWeather] = useState({});
  const [unitChange, setUnitChange] = useState(0);

  {/*Current city time*/}
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('America/Bogota');
  const [formValue, setFormValue] = useState('');

  {/*Loading*/}
  const [loading, setLoading] = useState(false);
  const [getIcon, setGetIcon] = useState(icons[Math.floor(Math.random()*icons.length)])

  {/*UseEffect for weather API*/}
  useEffect(() =>{
      setLoading(true)
      setGetIcon(icons[Math.floor(Math.random()*icons.length)])
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
  
          try {
            const res = await axios.get(`${url}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            setWeather({
              city: res.data?.name,
              country: res.data?.sys?.country,
              description: res.data?.weather[0]?.description,
              id : res.data?.weather[0]?.id,
              main: res.data?.main,
              wind: res.data?.wind,
              cloud: res.data?.clouds?.all,
              icon: res.data?.weather[0]?.icon
            });
          } catch (error) {
            console.error("Error fetching weather data", error);
          } finally {
            setLoading(false)
          }
        },
        (error) => {
          console.error("Location permission denied", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert("You have denied the location request. Please allow location access to get the weather information.");
        }
        }
      );
    }, []);

    {/*UseEffect for time date API*/}
    useEffect(() => {
      axios.get(urlTime + search)
      .then((dataRes) => {
        setCity(dataRes?.data)
      })
      .catch((error) => {
          console.error("Error fetching time data: Check the list to get guidance about the city date typing way", error);
        })

    },[search])
  
  {/*Change of units function*/}
  const unitChanges = () =>{
    if(unitChange === 0){
      setUnitChange(unitChange + 1)
    } else{
      setUnitChange(unitChange - 1)
    }
  }
  
  {/*Units condition*/}
  let unit = ''
  if(unitChange === 1){
    unit = '°C'
  }else{
    unit = '°F'
  }

  {/*Call of icons*/}
  const icon = ` https://openweathermap.org/img/wn/${weather?.icon}@2x.png`

  {/*Event of submit*/}
  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(formValue)
  }

  return (
    <>
      {/* Background videos */}
      <VideoBackground videoName={weather?.id}/>


      {/* Weather card */}
      <div className="container">

        {/* Loading */}
        {loading ? (
          <div className="loading__img">
            <img className="starting__img" src={getIcon}></img>
          </div>
        ) : (
          <div className="card__container">
            <h1 className="card__title">Weather App</h1>
            <h2 className="location">{weather.city}, {weather.country}</h2>
            <div className="relative__items">
              <div className="left--column">
                <img src={icon} className="icon"/>
                <h3 className="description">{weather.description}</h3>
              </div>
              <div className="right-column">
                <p className="justify--text">Wind speed: <b>{weather.wind?.speed}m/s</b></p>
                <p className="justify--text">Clouds: <b>{weather.cloud}%</b></p>
                <p className="justify--text">Outside pressure: <b>{weather.main?.pressure}hPa</b></p>
              </div>
            </div>

            {/* Units change */}
            <Units value={unitChange} temperature={weather.main?.temp}/>
            <button className="btn" onClick={unitChanges}>Change to {unit}</button>

            {/* City date searcher */}
            <div className="main__data">
              <div className="city__title">
                <h2>City Date</h2>
                <a href="https://timezonedb.com/time-zones#google_vignette" target="_blank">Check the way to type the Time Zone</a>
              </div>
              <form onSubmit={handleSubmit}>
                <input 
                className="input" 
                type="text" 
                placeholder="Check the list (Continent/...)" 
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}/>
                <button>Apply</button>
                <CityDate Date={city} City={search}/>
              </form>
            </div>
          </div>
          )}  
      </div>
    </>
  )
}

export default App
