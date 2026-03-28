import './style/css/index.css';

// import './functions/functionsApi.js';
// import { geo } from './functions/functionsGeolocation.js';

import './hook/api.js';
import { geo } from './hook/geolocation.js';

import './hook/themes.js';

const inputSearchCity  = document.getElementById('input-search-city');
let geoSearchBoolen = false;

inputSearchCity.addEventListener('click', () => {
    if (!geoSearchBoolen) {
        geoSearchBoolen = true;
        geo();
    }
})