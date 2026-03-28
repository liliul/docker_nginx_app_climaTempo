import {
  URL_AR_FUNCTIONS,
  URL_FORECAST_SEARCH_FUNCTIONS,
  URL_WHEATER_SEARCH_FUNCTIONS
} from './functionsEnv.js';

import { airQuality, mostrandoHorarioLocal, openWeatherMap, sunTime, tempNow, visible, weather } from '../hook/htmlRender.js';

const inputSearchCity  = document.getElementById('input-search-city');
const buttonSearchCity = document.getElementById('button-search-city');

buttonSearchCity.addEventListener('click', searchCity);
inputSearchCity.addEventListener('keydown', (e) => {
  
  if(e.key === "Enter") {
    searchCity()
  }
})

function searchCity() {
  const cityLowerCase = inputSearchCity.value.toLowerCase();

  if(!inputSearchCity.value) return
  if(cityLowerCase === sessionStorage.getItem("searchCity")) return
  
  sessionStorage.setItem("searchCity", cityLowerCase);
  
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
  const req = await fetch(`${URL_WHEATER_SEARCH_FUNCTIONS}${city}`)
  const res = await req.json();
  if(!req.ok) return

  tempNow(res)
  visible(res)
  sunTime(res)

  openWeatherMap(res)

  getApiAirQuality(res.coord.lat,res.coord.lon)

  mostrandoHorarioLocal(res.dt, res.timezone)
}

async function getApiAirQuality(lat, lon) {
  const req = fetch(`${URL_AR_FUNCTIONS}lat=${lat}&lon=${lon}`);
  const res = await (await req).json();

  airQuality(res)
}

async function getApiDaysTemp(city) {
  const req = await fetch(`${URL_FORECAST_SEARCH_FUNCTIONS}${city}`);
  const res = await req.json();

  if(!req.ok) {
    throw Error(res.statusText), alert('Nome de cidade Invalida')
  }
  
  return await weather(res)
}
