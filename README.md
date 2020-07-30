# Media server

## Estado del build
[![Build Status](https://travis-ci.com/chotuve-grupo10/chotuve-media-server.svg?branch=dev)](https://travis-ci.com/chotuve-grupo10/chotuve-media-server)

## Cobertura actual
[![codecov](https://codecov.io/gh/chotuve-grupo10/chotuve-media-server/branch/dev/graph/badge.svg)](https://codecov.io/gh/chotuve-grupo10/chotuve-media-server)

## Descripción
Este servidor será el encargado de proveer los distintos recursos multimedia que los [App Server](https://github.com/chotuve-grupo10/chotuve-application-server) puedan llegar a solicitar.

## Contenidos
1. [Correr el server localmente](#set-up-para-correr-el-app-server-localmente)
2. [Tests](#tests)
3. [CI/CD del server](#CI/CD)

## Set up para correr el app server localmente

Para poder correr el server localmente usaremos **Docker**. A continuación detallamos los comandos a ejecutar:

1. Buildear la imagen ejecutando en el directorio raiz del repo
```docker build . -t media-server```

2. Corremos el container ejecutando
```docker run -p 3000:3000 --name media-server media-server```

3. Si queremos eliminar el container creado
```docker rm -f media-server```

## Tests

1. Seteamos variables de entorno:
    - Windows: ```$env:FIREBASE_CREDENTIALS="./chotuve-android-app-firebase-adminsdk-2ry62-8af953dc1c.json"```
    - Windows: ```$env:TOKEN_SECRET="secret"```
    - Linux: ```export FIREBASE_CREDENTIALS="./chotuve-android-app-firebase-adminsdk-2ry62-8af953dc1c.json"```
    - Linux: ```export TOKEN_SECRET="secret"```

2. Ejecutamos los tests:
```npm test```

## CI/CD

### CI

Cada push que se haga al repo (sin importar la rama) lanzará un build en [Travis](https://travis-ci.com/).


### CD

Una vez que se haya terminado una tarea, se deberá crear un pull request para mergear a dev. Este pull request deberá ser revisado por al menos un miembro del equipo y deberá ser aprobado. Dejamos a continuación las direcciones del auth server tanto de desarrollo como productivo:

- [Media server dev](https://chotuve-media-server-dev.herokuapp.com/)

- [Media server prod](https://chotuve-media-server-produ.herokuapp.com/)