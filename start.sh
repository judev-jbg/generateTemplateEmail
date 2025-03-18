#!/bin/bash
# Instalar Chrome
npx puppeteer browsers install chrome
# Configurar la ruta al ejecutable de Chrome
export PUPPETEER_EXECUTABLE_PATH=$(node -e "console.log(require('puppeteer').executablePath())")
# Iniciar la aplicación
yarn start


