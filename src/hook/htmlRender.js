import { kelvinCelsius, visibility, byId, timeStamp, convertWindSpeedKm, horarioLocal } from './utils.js';

export function tempNow(res) {

    byId('iconTempNow').innerHTML = `
        <img src="./src/assets/iconsTemp/${res.weather[0].icon}.svg" />
    `;

    const cityLocate = document.getElementById('cityLocate');
    const temp = document.getElementById('temp');
    const tempMaxMix = document.getElementById('tempMaxMin');
    const humidity = document.getElementById('humidity');
    const clouds = document.getElementById('clouds');

    cityLocate.textContent = res.name + ' ' + res.sys.country;

    temp.innerHTML = `
      <h1 id="temp" class="h1-temp">
        ${kelvinCelsius(res.main.feels_like).toFixed(0)}
        <span class="span-temp">°C</span>
      </h1>
    `

    tempMaxMix.innerHTML = `
        ${kelvinCelsius(res.main.temp_min).toFixed(0)}°
        <b class="temp-b">${kelvinCelsius(res.main.temp_max).toFixed(0)}°</b>
    `

    const windSpeed = document.getElementById('windSpeed');

    windSpeed.textContent = convertWindSpeedKm(res.wind.speed).toFixed(0) + 'km/h';
    humidity.textContent = res.main.humidity + '%';
    clouds.textContent = res.clouds.all + '%'
}

export function airQuality(res) {
    const airAqi = document.getElementById('air-aqi');
    airAqi.textContent = res.list[0].main.aqi;

    const airComponents = byId('air-components');
    airComponents.innerHTML = `
        <div class="info-num">
            <p class="p-info-num">${res.list[0].components.pm2_5}</p>

            <span class="span-info-num">PM2.5</span>
        </div>

        <div class="info-num">
            <p class="p-info-num">${res.list[0].components.co}</p>

            <span class="span-info-num">CO</span>
        </div>

        <div class="info-num">
            <p class="p-info-num">${res.list[0].components.so2}</p>

            <span class="span-info-num">SO2</span>
        </div>

        <div class="info-num">
            <p class="p-info-num">${res.list[0].components.pm10}</p>

            <span class="span-info-num">PM10</span>
        </div>

        <div class="info-num">
            <p class="p-info-num">${res.list[0].components.o3}</p>

            <span class="span-info-num">O₃</span>
        </div>    
    `
}

export async function openWeatherMap(res) {

    var map = await L.map('openWeather-maps').setView([res.coord.lat, res.coord.lon], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([res.coord.lat, res.coord.lon]).addTo(map)
}

export function visible(res) {
    const visible = document.getElementById('visible')

    visible.innerHTML = `
        <div class="visible-content">
            <h1 class="visible-info">${visibility(res.visibility).toFixed(0)}</h1>
            <b class="visible-info2">km/h</b>
        </div>
    `
}


export function sunTime(res) {
    const coords = document.getElementById('coordenadas');

    coords.innerHTML = `
        <svg width="230" height="120" viewBox="0 0 250 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 122C16 108.08 18.7418 94.296 24.0688 81.4355C29.3958 68.575 37.2037 56.8896 47.0467 47.0466C56.8897 37.2036 68.5751 29.3957 81.4356 24.0687C94.2961 18.7418 108.08 16 122 16C135.92 16 149.704 18.7418 162.565 24.0688C175.425 29.3958 187.11 37.2037 196.953 47.0467C206.796 56.8897 214.604 68.5751 219.931 81.4356C225.258 94.2961 228 108.08 228 122" stroke="#F6C833" stroke-width="2" stroke-dasharray="2 13"/>
            <path d="M24.0688 81.4355C18.7418 94.296 16 108.08 16 122L175 122V30.2013C171.002 27.8928 166.848 25.8432 162.565 24.0688C149.704 18.7418 135.92 16 122 16C108.08 16 94.2961 18.7418 81.4356 24.0687C68.5751 29.3957 56.8897 37.2036 47.0467 47.0466C37.2037 56.8896 29.3958 68.575 24.0688 81.4355Z" fill="url(#paint0_linear_328_81)"/>
            <line opacity="0.4" x1="14" y1="121.5" x2="230" y2="121.5" stroke="#F6C833"/>
            <path d="M180.143 28.796C181 31.9967 179.101 35.2865 175.902 36.1438C172.7 37.0016 169.411 35.1022 168.553 31.9015C167.695 28.7003 169.595 25.4104 172.796 24.5527C175.995 23.6954 179.285 25.5948 180.143 28.796Z" fill="#F6C833"/>
            <line x1="228" y1="126" x2="228" y2="118" stroke="#E5BB46" stroke-width="2"/>
            <line x1="16" y1="126" x2="16" y2="118" stroke="#E5BB46" stroke-width="2"/>
            <defs>
            <linearGradient id="paint0_linear_328_81" x1="175" y1="16" x2="175" y2="124" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FBDB60" stop-opacity="0.2"/>
            <stop offset="1" stop-color="#FBDB60" stop-opacity="0"/>
            </linearGradient>
            </defs>
        </svg>

        <section class="sectionTime">
            <div class="sttleDivCoords">
                <strong class="styleCoords">${timeStamp(res.sys.sunrise, res.timezone)}</strong> 
                <small class="stylePCoords">Am</small>
            </div>

            <div class="sttleDivCoords">
                <strong class="styleCoords">${timeStamp(res.sys.sunset, res.timezone)}</strong> 
                <p class="stylePCoords">Tr</p>
            </div>
        </section>
    `
}

export function weather(res) {
    const weather = document.getElementById('weather');
    weather.innerHTML = ""

    const timezoneWeather = res.city.timezone;

    res.list.map((list) => {

        const article = document.createElement('article');
        article.classList.add('days');

        article.innerHTML = `
            <header class="h-days">
                <h3 class="h3-days">${list.weather[0].description}</h3>
            </header>

            <section class="main-days">
                <img src="./src/assets/iconsTemp/${list.weather[0].icon}.svg" />                      
            </section>

            <footer class="foo-days">
                <p class="foo-p-days">${list.main.temp_max.toFixed()}° <span class="s-foo-days">${convertWindSpeedKm(list.wind.speed).toFixed()}km/h</span></p>
            </footer>
            <small class="foo-data">${timeStamp(list.dt, timezoneWeather)}</small>
        `
        weather.append(article);
    })
}

export function mostrandoHorarioLocal(dt, timezone) {
    const constHorarioLocal = horarioLocal(dt, timezone)

    return document.getElementById('horariLocalId').textContent = constHorarioLocal;
}
