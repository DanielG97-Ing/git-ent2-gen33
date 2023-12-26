import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState() 
  const [isLoading, setIsLoading] = useState(true) 

  const success = position =>{
    //console.log(position)
    //Agregar pantalla de carga
    //Documentacion se encuentra en = https://openweathermap.org/current para conseguir el APIKEY
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj)
  }
  
  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  console.log(coords)
  
  useEffect(() => {
    if(coords){
      const APIKEY = '530eff3468bb6e3c592ef5932723bfd2'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      
      axios.get(url)
        .then(res => {
          const celsius = (res.data.main.temp -273.15).toFixed(2)
          const fahrenheit = (celsius*(9/5)+32).toFixed(2)
          setTemp({ celsius, fahrenheit })
          setWeather(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  },[coords])
  
  console.log(weather)
  
  return (
    <div className='app'>
      {
        isLoading
        ? <h2 className='app_loader'>Loading...</h2>
        :(
          <WeatherCard 
            weather={weather}
            temp={temp}
          />
        )
      }
    </div>
  )
}

export default App
