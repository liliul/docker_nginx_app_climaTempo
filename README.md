### Clonar o repositorio:

```bash
git clone https://github.com/liliul/docker_nginx_app_climaTempo.git
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

<<<<<<< HEAD
### Iniciar desenvolvimento com functions e hosting

```bash
=======
### Iniciando desenvolvimento frontend

```bash

# inciando desenvolvimento do frontend
# index.html descomentar js e css e src/index.js comentar import css

# descomentar em src/index.js
import './hook/api.js';
import { geo } from './hook/geolocation.js';

# em env.js coloca api key // src/hook/env.js
export const TOKEN_API_OPEN_WEATHER="";

# usar npm // sass e live-server instalados globalmente
npm run dev

# para build // build com arquivos estaticos dentro do container docker
source docker.sh

```

### Iniciar desenvolvimento com functions 

```bash
# descomontar em src/index.js
import './functions/functionsApi.js';
import { geo } from './functions/functionsGeolocation.js';

# colocar api key em functions/.env
OPENWEATHER_API_KEY=
>>>>>>> f267afb (update: refactor functions da v2 para v1 e readme)

# antes de rodar o npm autorizar script chmod +x dev.sh
npm run dev:sh
# para gerar a build na pasta public em index.html js e css tem que ta comentado
# em src/index.js no import css descomentado

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
