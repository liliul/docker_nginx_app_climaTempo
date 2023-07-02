import { TOKEN_API_OPEN_WEATHER, APPID_TOKEN, URL_AR } from './token.js';

import { tempNow, airQuality, visible ,sunTime, weather, openWeatherMap } from './htmlRender.js';


const geo = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(pos) {
      console.log(pos.coords.latitude, pos.coords.longitude)
      
      await getApis(pos.coords.latitude, pos.coords.longitude)
    })
  }
}
geo()

async function getApis(lat, lon) {
  const [reqApi1, reqApi2, reqApi3] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${TOKEN_API_OPEN_WEATHER}&lang=pt_br`),
    fetch(`${URL_AR}lat=${lat}&lon=${lon}${APPID_TOKEN}${TOKEN_API_OPEN_WEATHER}&lang=pt_br`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&appid=${TOKEN_API_OPEN_WEATHER}&units=metric&lang=pt_br`),
  ])

  const resApi1 = await reqApi1.json();
  const resApi2 = await reqApi2.json();
  const resApi3 = await reqApi3.json();
  console.log(resApi1, resApi2, resApi3);

  tempNow(resApi1)
  airQuality(resApi2)
  visible(resApi1)
  sunTime(resApi1)   
  openWeatherMap(resApi1)
  weather(reqApi3)
}