import './style/css/index.css';

import './hook/themes.js';

import './hook/api.js';

import { geo } from './hook/geolocation.js';

const inputSearchCity  = document.getElementById('input-search-city');

inputSearchCity.addEventListener('click', geo)