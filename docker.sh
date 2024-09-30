#!/bin/bash 

# criar pasta dist com bundle webpack
if [ -x "$(command -v yarn)" ]; then
	yarn wpack
elif [ -x "$(command -v npm)" ]; then
	npm run wpack
else 
	echo "O node js nao esta instalado na maquina"	
fi 

# variavel para o caminho das pastas 
assetsDir=${PWD}/src/assets

distDir=${PWD}/dist/src

# copiar pasta assets em dist/src
cp -r $assetsDir $distDir

# criar container docker nginx 
docker run -d -p 8000:80 --name climaTempo nginx

# caminho para pasta do projeto
distVar=${PWD}
# vai para past dist
cd "$distVar/dist"

# copia todo conteudo da pasta dist para a pasta html do container nginx
docker cp . climaTempo:/usr/share/nginx/html
