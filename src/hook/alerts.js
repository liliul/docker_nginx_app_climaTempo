import { TOKEN_API_OPEN_WEATHER, URL_FORECAST_SEARCH, UNITS, LANG } from "./env.js";
import { acessarLocalStorage, guardarNoLocalStorage } from "./localStorage.js";
import { calcularChuvaPop, timeStamp } from "./utils.js";


export class ElementHTML {
    constructor(alertContainer) {
        this.alertContainer = document.getElementById(alertContainer)
    }

    render() {
        const tempsAlert = acessarLocalStorage('alert:temp') || []
        
        this.alertNotificationTemplate(tempsAlert)
    }

    alertNotificationTemplate(tempsAlert) {
        if (!this.alertContainer) return

        const resultTemp = tempsAlert.flatMap(item => item.tmp.map(t => t))

        this.alertContainer.innerHTML = `
           <section id='notify' class='notification'>
                <div>
                    <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="var(--icon-svg-day)" stroke="none" stroke-width="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        <circle cx="19" cy="5" r="3" fill="${resultTemp.length === 0 ? 'var(--icon-svg-day)' : '#ff3b30'}" stroke="none"></circle>
                    </svg>
                </div>

                <div id='cards-temp' style='display: none;'>
                    <h1 class='alert-h1'>Alerta de temperatura</h1>
                    <section class='container-cards'>
                        ${resultTemp.length === 0 ? '<span class="alert-fk" >Sem Alerta...</span>' : this.cardAlertTempTemplate(tempsAlert)}
                    </section>
                </div>
           </section>
        `

        this.eventAlertsOpenCloseCard()
    }

    cardAlertTempTemplate(tempsAlert) {
        return tempsAlert.map(items => { 
            return (`
                <article class='card'>
                    <small><b>city</b>: ${items.city} <b>${items.uf}</b></small>
                    ${items.tmp.map(temps => {
                        return (`
                            <div class='cards-temps'>
                                <small class='temps-small'><b>sensação termica: </b>${temps.newtmp}°</small>
                                <small class='temps-small'><b>hora: </b>${timeStamp(temps.dt, items.timezone)}</small>
                                <small class='temps-small'><b>chuva: </b>${calcularChuvaPop(temps.pop)}%</small>
                            </div> 
                        `)
                    }).join('')}
                    <small><b>em: </b> ${items.created_at}<small>
                </article>
                `)
            }).join('')
    }

    eventAlertsOpenCloseCard() {
        const notify = this.alertContainer.querySelector('#notify')
        const cardTemp = this.alertContainer.querySelector('#cards-temp')

        if (!notify || !cardTemp) return 

        notify.addEventListener('click', (e) => {
            e.stopPropagation()

            if (cardTemp.style.display === 'none') {
                cardTemp.style.display = 'block'
            } else {
                cardTemp.style.display = 'none'
            }
        })

        document.addEventListener('click', (e) => {
            if (!cardTemp.contains(e.target)) {
                cardTemp.style.display = 'none'
            }
        })
    }

    cardsNotification() {
        document.getElementById('alerts').innerHTML = ''
        const alerts = document.getElementById('alerts')
        const temps = acessarLocalStorage('alert:temp') || []
        const resultTemp = temps.flatMap(item => item.tmp.map(t => t))

        const notify = document.createElement('section')
        notify.classList.add('notification')
        notify.setAttribute('id', 'notify')
        notify.innerHTML = `
           <div>
                <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="var(--icon-svg-day)" stroke="none" stroke-width="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    <circle cx="19" cy="5" r="3" fill="${resultTemp.length === 0 ? 'var(--icon-svg-day)' : '#ff3b30'}" stroke="none"></circle>
                </svg>
           </div>

        `

        const containerDiv = document.createElement('div')
        containerDiv.setAttribute('id', 'cards-temp')
        containerDiv.style.display = 'none'
        
        const monteCards = resultTemp.length === 0 ? '<span class="alert-fk" >Sem Alerta...</span>' : temps.map(items => { 
            return (`
                <article class='card'>
                    <small><b>city</b>: ${items.city} <b>${items.uf}</b></small>
                    ${items.tmp.map(temps => {
                        return (`
                            <div class='cards-temps'>
                                <small class='temps-small'><b>sensação termica: </b>${temps.newtmp}°</small>
                                <small class='temps-small'><b>hora: </b>${timeStamp(temps.dt, items.timezone)}</small>
                                <small class='temps-small'><b>chuva: </b>${calcularChuvaPop(temps.pop)}%</small>
                            </div> 
                        `)
                    }).join('')}
                    <small><b>em: </b> ${items.created_at}<small>
                </article>
                `)
            }).join('')
            
            containerDiv.innerHTML = `
                <h1 class='alert-h1'>Alerta de temperatura</h1>
                <section class='container-cards'>${monteCards}</section>
            `
            notify.appendChild(containerDiv)
            alerts.appendChild(notify)

        notify.addEventListener('click', (e) => {
            e.stopPropagation()

            if (containerDiv.style.display === 'none') {
                containerDiv.style.display = 'block'
            } else {
                containerDiv.style.display = 'none'
            }
        })

        document.addEventListener('click', (e) => {
            if (!containerDiv.contains(e.target)) {
                containerDiv.style.display = 'none'
            }
        })

    } 
}

export class AlertTemperature {
    constructor() {
        this.tempDB = acessarLocalStorage('alert:temp') || []
    }

    async temperatureListForecast(response) {
        const resultWeather = response.list.filter(weather => {
            const temps = parseFloat(weather.main.feels_like.toFixed())

            return temps <= 15 || temps >= 32
        }).map(weather => {
            const newTemps = parseFloat(weather.main.feels_like.toFixed())

            return {
                newtmp: newTemps,
                pop: weather.pop,
                dt: weather.dt,
                dttxt: weather.dt_txt
            } 
        })

        const date = new Date()
        const formatoData = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long',  
            year: 'numeric',
            hour: '2-digit',    
            minute: '2-digit'
        })        

        const tempsJson = { 
            city: response.city.name,
            uf: response.city.country,
            timezone: response.city.timezone,
            tmp: resultWeather,
            created_at: formatoData.format(date)
        }

        this.tempDB = [tempsJson]
        guardarNoLocalStorage('alert:temp', JSON.stringify(this.tempDB))
        elementHTML.render()
    }

    updateGetItemLocalStorage() {
        return guardarNoLocalStorage('alert:temp', JSON.stringify(this.tempDB)) || []
    }
}

const elementHTML = new ElementHTML('alerts')
elementHTML.render()
