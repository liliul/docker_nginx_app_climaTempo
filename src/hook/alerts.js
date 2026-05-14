import { TOKEN_API_OPEN_WEATHER, URL_FORECAST_SEARCH, UNITS, LANG } from "./env.js";


class Message {
    send(msg) {
        console.log('Alerta: ', msg)
    } 
}

class Alert {

    async forecast(city) {
        const temp = await this.fetchGetApiDaysTemp(city)
        
        let db = []

        temp.list.map(weather => {
            if(weather.main.feels_like.toFixed() < 15) {
                db.push(weather.main.feels_like)
            }
        })

        console.log(db);
        
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

const alert = new Alert()
alert.forecast('paranacity')