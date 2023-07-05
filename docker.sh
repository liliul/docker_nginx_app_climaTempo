#!/bin/bash 

# docker cp index.html climaTempo:/usr/share/nginx/html

#docker cp . climaTempo:/usr/share/nginx/html

# yarn webpack para criar pasta dist eo bundles
#yarn webpack

#cp -r /home/liliu/Documentos/docker/nginx/src/assets /home/liliu/Documentos/docker/nginx/dist/src

# geran pasta dist com bundle webpack
yarn wpack

# variavel para o caminho das pastas 
assetsDir=${PWD}/src/assets
#echo $assetsDir
distDir=${PWD}/dist/src
#echo $distDir

# copiar pasta assets em dist/src
cp -r $assetsDir $distDir

docker run -d -p 8000:80 --name climaTempo nginx

cd '/home/liliu/Documentos/docker/nginx/dist'
#live-server --port=8081 --no-browser

docker cp . climaTempo:/usr/share/nginx/html
