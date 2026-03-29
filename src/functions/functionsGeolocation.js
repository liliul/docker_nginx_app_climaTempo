import { airQuality, mostrandoHorarioLocal, openWeatherMap, sunTime, tempNow, visible, weather } from '../hook/htmlRender.js';
import { URL_AR_FUNCTIONS, URL_FORECAST_FUNCTIONS, URL_WHEATER_FUNCTIONS } from './functionsEnv.js';

export const geo = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(pos) {
      
      await getApis(pos.coords.latitude, pos.coords.longitude)
    })
  }
}

async function getApis(lat, lon) {
  try {

    const requests = await Promise.all([
      fetch(`${URL_WHEATER_FUNCTIONS}lat=${lat}&lon=${lon}`),
      fetch(`${URL_AR_FUNCTIONS}lat=${lat}&lon=${lon}`),
      fetch(`${URL_FORECAST_FUNCTIONS}lat=${lat}&lon=${lon}`),

    ])

    requests.forEach((res) => {
      if (!res.ok) {
        throw new Error(`Erro na API: getApis em requests chamando as apis. status: ${res.status}`)
      }
    })

    const [resApi1, resApi2, resApi3] = await Promise.all(
      requests.map((res) => res.json())
    )

    tempNow(resApi1)
    airQuality(resApi2)
    visible(resApi1)
    sunTime(resApi1)   
    openWeatherMap(resApi1)
    weather(resApi3)
    mostrandoHorarioLocal(resApi1.dt, resApi1.timezone)

  } catch (error) {
    console.error("Erro ao buscar dados:", error)   
  }
}