# Client Gateway - README

## Descripción

Este documento proporciona instrucciones para instalar las dependencias y configurar el entorno del proyecto **Client Gateway**.

## Instalación de Dependencias

1. Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.
2. Navega al directorio del proyecto:
  ```bash
  cd /Users/gabrielalejandrogomez/source/microservices/products-app/client-geteway
  ```
3. Instala las dependencias del proyecto ejecutando:
  ```bash
  npm install
  ```

## Scripts Disponibles

- **Iniciar el proyecto**:
  ```bash
  npm start
  ```
  Este comando inicia el servidor de desarrollo.

- **Construir para producción**:
  ```bash
  npm run build
  ```
  Genera una versión optimizada del proyecto.

- **Ejecutar pruebas**:
  ```bash
  npm test
  ```
  Ejecuta las pruebas unitarias del proyecto.

## Requisitos Previos

- Asegúrate de tener configurado un entorno de desarrollo compatible.
- Verifica que las versiones de Node.js y npm sean compatibles con el proyecto.

## Notas Adicionales

- Si encuentras problemas al instalar las dependencias, intenta limpiar la caché de npm:
  ```bash
  npm cache clean --force
  ```
- Consulta la documentación del proyecto para más detalles sobre la configuración.
