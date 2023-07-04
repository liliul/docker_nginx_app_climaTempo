#!/bin/bash 

# docker cp index.html climaTempo:/usr/share/nginx/html

#docker cp . climaTempo:/usr/share/nginx/html

docker run -d -p 8000:80 --name climaTempo nginx

cd '/home/liliu/Documentos/docker/nginx/dist'

docker cp . climaTempo:/usr/share/nginx/html