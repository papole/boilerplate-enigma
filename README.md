# API

  1 - Ejecutar comando 
  ```bash 
    make start
  ```
  esta acción inicia un contenedor Docker con una base de datos mariadb en el puerto 3307
  
  2 - Ir al directorio de la api 
  ```bash
    cd api && nvm use && npm install
  ```  
  3 - ejecutar las migrations 
  ```bash
    npm run migration:run
  ```
  4 - Iniciar servidor. El servidor escuchara en el puerto 3000
  ```bash
    npm start
  ```

  5 - Para el test ejecutar este comando 
  ```bash
    npm run test:e2e
  ```
  
# Frontend

  1 - Ir al directorio del front `cd frontend`
  
  2 - Ejecutar comando `nvm use`
  
  3 - Instalar las dependencias `npm install`

  4 - Iniciar el front `npm start` este comando compila e inicia el front en el puerto `3001`
