//  https://openweathermap.org/current
//  https://openweathermap.org/current#multi
//  https://home.openweathermap.org/api_keys
//  romero ark sirome4179@farebus.com senha:romero1234?

import { 
  TOKEN_API_OPEN_WEATHER, 
  URL_API_OPEN_WEATHER, 
  APPID_TOKEN,
  LANG,
  URL_AR, 
  URL_FORECAST
} from './token.js';

import { tempNow, airQuality, visible ,sunTime, weather, openWeatherMap, mostrandoHorarioLocal } from './htmlRender.js';

const lang = 'pt_br';

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
  
  sessionStorage.setItem("searchCity", inputSearchCity.value);
  
  window.location.reload(false)
}



function toCall() {
  const getItemSearchCity = sessionStorage.getItem("searchCity");
  
  if(getItemSearchCity == null) return
  
  getApi(getItemSearchCity)
  getApiDaysTemp(getItemSearchCity)
  
}
toCall()



async function getApi(city) {
  const req = await fetch(`${URL_API_OPEN_WEATHER}${city}${APPID_TOKEN}${TOKEN_API_OPEN_WEATHER}${LANG}${lang}`)
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
  const req = fetch(`${URL_AR}lat=${lat}&lon=${lon}&start=${sunrise}&end=${sunset}${APPID_TOKEN}${TOKEN_API_OPEN_WEATHER}&lang=${lang}`);
  const res = await (await req).json();

  airQuality(res)
}



async function getApiDaysTemp(city) {
  const req = await fetch(`${URL_FORECAST}${city}&cnt=8&appid=${TOKEN_API_OPEN_WEATHER}&units=metric&lang=${lang}`);
  const res = await req.json();

  if(!req.ok) {
    throw Error(res.statusText), alert('Nome de cidade Invalida')
  }
  
  return weather(res)
}
