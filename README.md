# Clima tempo

## Criando docker com nginx ou frontend estaticos no firebase hosting ou usando functions firebase no backend

Uso:
- 1. container docker com nginx, Com frontend estatico.
- 2. hosting no firebase, Site estatico no hosting.
- 3. functions do firebase, Chamadas na api openweathermap no Backend.

## Começar a usar

Clonar o repositorio:

```bash
git clone https://github.com/liliul/docker_nginx_app_climaTempo.git
```

---

Virificar versão do nodejs em .nvmrc

Usar .nvmrc:

```bash
nvm use
```

---

Instalar os pacotes nodejs

Usar o comando:

```bash
npm install
```
---

### DEV Iniciando desenvolvimento do frontend

```bash

# inciando desenvolvimento do frontend
# index.html descomentar js e css e src/index.js comentar import css

# descomentar em src/index.js
import './hook/api.js';
import { geo } from './hook/geolocation.js';

# em env.js coloca api key // src/hook/env.js
export const TOKEN_API_OPEN_WEATHER="";

# usar npm // sass e live-server instalados globalmente
npm i -g sass live-server

# rodar
npm run dev

# em index.html e pasta src/ onde fica os arquivos do frontend

```
---

### DEV Iniciando desenvolvimento com functions firebase e hosting localmente.

```bash
# descomontar em src/index.js
import './functions/functionsApi.js';
import { geo } from './functions/functionsGeolocation.js';

# colocar api key em functions/.env // criar .env
OPENWEATHER_API_KEY=

# antes de rodar o npm autorizar script com chmod +x functions.sh

# criar build na pasta public
# para gerar a build na pasta public em index.html js e css tem que ta comentado
# em src/index.js no import css descomentado
npm run dev:fc

# rodar projeto
firebase emulators:start

[GET]
# devtools em: http://localhost:4000
# frontend em: http://localhost:5000
# backend  em: http://127.0.0.1:5001/climatempo-6f654/us-central1/weather?lat=41.85&lon=-87.65
# backend  em: http://127.0.0.1:5001/climatempo-6f654/us-central1/forecast?lat=41.85&lon=-87.65
# backend  em: http://127.0.0.1:5001/climatempo-6f654/us-central1/airPollution?lat=41.85&lon=-87.65
# backend  em: http://127.0.0.1:5001/climatempo-6f654/us-central1/weatherSearch?q=chicago
# backend  em: http://127.0.0.1:5001/climatempo-6f654/us-central1/forecastSearch?q=chicago


# deploy para firebase

# deploy para functions no firebase
firebase deploy --only functions

# envia tudo — Hosting + Functions de uma vez
firebase deploy

```
---

### DEV Criar container docker

Para criar o bundle webpack e criar container docker do nginx e transferir a pasta dist do bundle do webpack na pasta html do nginx

Camando bash:

```bash
# criar docker com nginx
# index.html comentar js e css e src/index.js descomentado import css

# descomentar em src/index.js
import './hook/api.js';
import { geo } from './hook/geolocation.js';

# inicar a criação do container docker do climaTempo
source docker.sh
```
---

### Deploy para firebase hosting

```bash
# index.html comentar js e css e src/index.js descomentar o import css

# descomentar em src/index.js
import './hook/api.js';
import { geo } from './hook/geolocation.js';

# rodar o script shell hosting.sh
npm run dev:hs
```
