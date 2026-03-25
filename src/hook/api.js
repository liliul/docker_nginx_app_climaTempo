//  https://openweathermap.org/current
//  https://openweathermap.org/current#multi
//  https://home.openweathermap.org/api_keys

import {
  LANG,
  TOKEN_API_OPEN_WEATHER,
  UNITS,
  URL_API_OPEN_WEATHER_SEARCH,
  URL_AR,
  URL_FORECAST_SEARCH
} from './env.js';


import { airQuality, mostrandoHorarioLocal, openWeatherMap, sunTime, tempNow, visible, weather } from './htmlRender.js';

const inputSearchCity  = document.getElementById('input-search-city');
const buttonSearchCity = document.getElementById('button-search-city');


buttonSearchCity.addEventListener('click', searchCity);
inputSearchCity.addEventListener('keydown', (e) => {
  
  if(e.key === "Enter") {
    searchCity()
  }
})



function searchCity() {
  if(!inputSearchCity.value) return
  if(inputSearchCity.value === sessionStorage.getItem("searchCity")) return

  sessionStorage.setItem("searchCity", inputSearchCity.value);
  
  toCall()

  inputSearchCity.value = ''
}



function toCall() {
  const getItemSearchCity = sessionStorage.getItem("searchCity");
  
  if(getItemSearchCity == null) return
  
  getApi(getItemSearchCity)
  getApiDaysTemp(getItemSearchCity)
  
}
toCall()



async function getApi(city) {
  const req = await fetch(`${URL_API_OPEN_WEATHER_SEARCH}${city}&appid=${TOKEN_API_OPEN_WEATHER}&lang=${LANG}`)
  const res = await req.json();
  if(!req.ok) return

  tempNow(res)
  visible(res)
  sunTime(res)

  openWeatherMap(res)

  getApiAirQuality(res.coord.lat,res.coord.lon,res.sys.sunrise,res.sys.sunset)

  mostrandoHorarioLocal(res.dt, res.timezone)
}



async function getApiAirQuality(lat, lon,sunrise,sunset) {
  const req = fetch(`${URL_AR}lat=${lat}&lon=${lon}&start=${sunrise}&end=${sunset}8&appid=${TOKEN_API_OPEN_WEATHER}&lang=${LANG}`);
  const res = await (await req).json();

  airQuality(res)
}



async function getApiDaysTemp(city) {
  const req = await fetch(`${URL_FORECAST_SEARCH}${city}&cnt=8&appid=${TOKEN_API_OPEN_WEATHER}&units=${UNITS}&lang=${LANG}`);
  const res = await req.json();

  if(!req.ok) {
    throw Error(res.statusText), alert('Nome de cidade Invalida')
  }
  
  return await weather(res)
}
