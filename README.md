# MapsApp
No usar directamente en AngularCli (a menos que estén creadas las variables de entorno), ya que las variables de entorno se crean basados en el .env

## Pasos :

1. npm install
2. Clonar el .env.template y renombrarlo a .env
3. Llenar las variables de entorno acorde. En este caso el token es de mapBox.
4. Crear Angular Envs (opcional)

```
npm run envs
```

5. Para development ejecutar :

```
  npm run start
```

6. Para producción ejecutar :

```
  npm run build
```


# EXPLICACIÓN : 

## FullScreen :

  Muestra el mapa completo. Funcionalidades básicas por defecto.

##  Zoom-Range :

  Implementación de un input type range para acercar o alejar el mapa. Conectado con ambos botones y la rueda del mouse.
  Además aparece el zoom actual y la longitud y latitud.

## Marker :

  Implementación de los markers de mapBox.
  Genera un marker o chincheta en el centro de la visualización al pulsar el boton de añadir.
  Se pueden eliminar y "volar" hacía ellos. También se pueden mover.

## Properties :

  Recreación de lo que sería distintas cards de distintas propiedades o casas, donde el mapa es una sección de dicha card.
