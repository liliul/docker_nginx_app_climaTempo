#!/bin/bash 

# desenvolvimento
rm -rf dist public
echo "Excluindo pasta dist e public"

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

# verificar se pasta public existe
set -e # parar se der erro

publicRoot="./public"

if [ ! -d "$publicRoot" ]; then
    echo "Pasta $publicRoot não encontrada"
    mkdir -p "$publicRoot"
    echo "Pasta $publicRoot criada com sucesso"
else
    echo "A pasta $publicRoot ja existe"
fi

# variavel para o caminho das pastas 
publicDir=${PWD}/public

distDir=${PWD}/dist/*

# copiar arquivos dentro da pasta dist e enviar para public
cp -rv $distDir $publicDir


echo "-----------------Functions-------------------"