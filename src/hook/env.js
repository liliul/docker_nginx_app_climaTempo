export const TOKEN_API_OPEN_WEATHER="9033de8545dfa66184beaa29576f414b";
export const APPID_TOKEN="&appid=";
export const LANG="pt_br";
export const UNITS="metric"

export const URL_API_OPEN_WEATHER_SEARCH ="https://api.openweathermap.org/data/2.5/weather?q=";
export const URL_AR ="https://api.openweathermap.org/data/2.5/air_pollution?";
export const URL_WHEATER ="https://api.openweathermap.org/data/2.5/weather?";
export const URL_FORECAST_SEARCH ="https://api.openweathermap.org/data/2.5/forecast?q=";
export const URL_FORECAST ="https://api.openweathermap.org/data/2.5/forecast?"

const DEV  = 'http://127.0.0.1:5001/climatempo-6f654/us-central1';
const PROD = 'https://climatempo-6f654.web.app.cloudfunctions.net';

const BASE = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' ? DEV : PROD;

export const URL_WHEATER_FUNCTIONS  = `${BASE}/weather?`;
export const URL_FORECAST_FUNCTIONS = `${BASE}/forecast?`;
export const URL_AR_FUNCTIONS       = `${BASE}/airPollution?`;