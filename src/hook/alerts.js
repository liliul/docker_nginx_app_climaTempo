import { TOKEN_API_OPEN_WEATHER, URL_FORECAST_SEARCH, UNITS, LANG } from "./env.js";
import { acessarLocalStorage, guardarNoLocalStorage } from "./localStorage.js";


class ElementHTML {
    notification() {
        const temps = acessarLocalStorage('alert:temp')
        const body = document.querySelector('body')
        
        console.log('temp', temps.length);

        const message = document.createElement('section')
        message.classList.add('notification')
        message.innerHTML = `
           <div>
                <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="var(--icon-svg-day)" stroke="none" stroke-width="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    <circle cx="19" cy="5" r="3" fill="${temps.length === 0 ? 'var(--icon-svg-day)' : '#ff3b30'}" stroke="none"></circle>
                </svg>
           </div>

        `
        const containerDiv = document.createElement('div')
        containerDiv.setAttribute('id', 'cards-temp')
        // containerDiv.appendChild('<span class="close-cards">X</span>')
        containerDiv.style.display = 'none'

        const alerts = temps.length === 0 ? '<span>Sem Alerta...</span>' : temps.map(items => {
            return (`
                <article class='card'>
                    <b id='close-card-temp'>X</b>
                    <p>${items.tmp}</p>
                    <span>${items.data}</span>
                </article>
            `)
        }).join('')

        containerDiv.innerHTML = `
            <section class='container-cards'>${alerts}</section>
        `
        message.appendChild(containerDiv)

        document.getElementById('menu').appendChild(message)

        message.addEventListener('click', (e) => {
            e.stopPropagation()

            if (containerDiv.style.display === 'none') {
                containerDiv.style.display = 'block'
            } else {
                containerDiv.style.display = 'none'
            }
        })

        document.addEventListener('click', (event) => {
            if (!containerDiv.contains(event.target)) {
                containerDiv.style.display = 'none'
            }
        })

    } 
}

class AlertTemperature {
    constructor() {
        this.tempDB = []
    }

    async forecast(city) {
        const temp = await this.fetchGetApiDaysTemp(city)
        
        temp.list.map(weather => {
            if(weather.main.feels_like.toFixed() < 20) {
                this.tempDB.push({tmp: weather.main.feels_like.toFixed(), data: new Date()})
            }
        })

        console.log(this.tempDB);
        guardarNoLocalStorage('alert:temp', JSON.stringify(this.tempDB))
    }

    async fetchGetApiDaysTemp(city) {
        const req = await fetch(`${URL_FORECAST_SEARCH}${city}&cnt=8&appid=${TOKEN_API_OPEN_WEATHER}&units=${UNITS}&lang=${LANG}`);
        const res = await req.json();

        if(!req.ok) {
            throw Error(res.statusText), alert('Nome de cidade Invalida')
        }

        return res
    }

}

const alertTemperature = new AlertTemperature()
alertTemperature.forecast('paranacity')
const elementHTML = new ElementHTML()
elementHTML.notification()