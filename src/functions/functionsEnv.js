const DEV  = 'http://127.0.0.1:5001/climatempo-6f654/us-central1';
const PROD = 'https://climatempo-6f654.web.app.cloudfunctions.net';

const BASE = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' ? DEV : PROD;

export const URL_WHEATER_FUNCTIONS  = `${BASE}/weather?`;
export const URL_FORECAST_FUNCTIONS = `${BASE}/forecast?`;
export const URL_AR_FUNCTIONS       = `${BASE}/airPollution?`;