# chotuve-media-server

## Docker
- Para buildear la imagen ejectuamos:
```docker build . -t media-server```
- Para levantar el container ejecutamos:  ```docker run -p 3000:3000 --name media-server media-server```

## Ejecutar tests localmente
- Para poder ejecutar los tests localmente, es necesario setear la variable de entorno:
    - Windows: ```$env:FIREBASE_CREDENTIALS="./chotuve-android-app-firebase-adminsdk-2ry62-8af953dc1c.json"```
    - Linux: ```export FIREBASE_CREDENTIALS="./chotuve-android-app-firebase-adminsdk-2ry62-8af953dc1c.json"```