import { TOKEN_API_OPEN_WEATHER, URL_FORECAST_SEARCH, UNITS, LANG } from "./env.js";
import { acessarLocalStorage, guardarNoLocalStorage } from "./localStorage.js";


class ElementHTML {
    message() {
        const temps = acessarLocalStorage('alert:temp')
        
        console.log('temp',temps);

        const message = document.createElement('section')
        const containerDiv = document.createElement('div')
        
        const alerts = temps.map(items => {
            return (`
                <p>${items.tmp}</p>
                <span>${items.data}</span>
            `)
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
            if(weather.main.feels_like.toFixed() < 15) {
                this.tempDB.push({tmp: weather.main.feels_like, data: new Date()})
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
elementHTML.message()