# Nginx no docker

### Iniciando o projeto

### Clonar o repositorio:

```bash
git clone https://github.com/liliul/docker_nginx_app_climaTempo.git
```

### Criar env com tokens

```bash
# criar em src/hook/env.js

export const TOKEN_API_OPEN_WEATHER="";
export const APPID_TOKEN="&appid=";
export const LANG="pt_br";
export const UNITS="metric"

export const URL_API_OPEN_WEATHER_SEARCH ="https://api.openweathermap.org/data/2.5/weather?q=";
export const URL_AR ="https://api.openweathermap.org/data/2.5/air_pollution?";
export const URL_WHEATER ="https://api.openweathermap.org/data/2.5/weather?";
export const URL_FORECAST_SEARCH ="https://api.openweathermap.org/data/2.5/forecast?q=";
export const URL_FORECAST ="https://api.openweathermap.org/data/2.5/forecast?"

```

### Virificar versão do nodejs em .nvmrc

Usar .nvmrc:

```bash
nvm use
```

### Usando yarn para instalar os pacotes nodejs

Usar o comando:

```bash
yarn # npm install
```

### Iniciar desenvolvimento com functions e hosting

```bash

# antes de rodar o npm autorizar script chmod +x dev.sh
npm run dev:sh

# rodar projeto
firebase emulators:start
# devtools em: http://localhost:4000
# frontend em: http://localhost:5000
# backend  em: http://127.0.0.1:5001/climatempo-6f654/us-central1/weather?lat=41.85&lon=-87.65
# backend  em: http://127.0.0.1:5001/climatempo-6f654/us-central1/forecast?lat=41.85&lon=-87.65
# backend  em: http://127.0.0.1:5001/climatempo-6f654/us-central1/airPollution?lat=41.85&lon=-87.65

# deploy para firebase
# envia tudo — Hosting + Functions de uma vez
firebase deploy
# ou separado se quiser mais controle
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only hosting,functions

```

Para criar o bundle webpack e criar container docker do nginx e transferir a pasta dist do bundle do webpack na pasta html do nginx

Camando bash:

```bash
source docker.sh
```
