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

```zsh
nvm use
```

### Usando yarn para instalar os pacotes nodejs

Usar o comando:

```zsh
yarn # npm install
```

### Iniciar desenvolvimento 

```zsh

# antes de rodar o npm autorizar script chmod +x dev.sh
npm run dev:sh

```

Para criar o bundle webpack e criar container docker do nginx e transferir a pasta dist do bundle do webpack na pasta html do nginx

Camando bash:

```bash
source docker.sh
```
