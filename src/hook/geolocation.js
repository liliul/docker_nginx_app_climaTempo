import { LANG, TOKEN_API_OPEN_WEATHER, UNITS, URL_AR, URL_FORECAST, URL_WHEATER } from './env.js';

import { airQuality, openWeatherMap, sunTime, tempNow, visible, weather } from './htmlRender.js';


export const geo = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(pos) {
      
      await getApis(pos.coords.latitude, pos.coords.longitude)
    })
  }
}

async function getApis(lat, lon) {
  const [reqApi1, reqApi2, reqApi3] = await Promise.all([
    fetch(`${URL_WHEATER}lat=${lat}&lon=${lon}&appid=${TOKEN_API_OPEN_WEATHER}&lang=${LANG}`),
    fetch(`${URL_AR}lat=${lat}&lon=${lon}&appid=${TOKEN_API_OPEN_WEATHER}&lang=${LANG}`),
    fetch(`${URL_FORECAST}lat=${lat}&lon=${lon}&cnt=8&appid=${TOKEN_API_OPEN_WEATHER}&units=${UNITS}&lang=${LANG}`),
  ])

  const resApi1 = await reqApi1.json();
  const resApi2 = await reqApi2.json();
  const resApi3 = await reqApi3.json();

  tempNow(resApi1)
  airQuality(resApi2)
  visible(resApi1)
  sunTime(resApi1)   
  openWeatherMap(resApi1)
  weather(resApi3)
}