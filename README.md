# Listado por Cercanía al Jardín

El objetivo de este proyecto es facilitar el proceso de inscripción de un Jardín de Infantes. El usuario debe cargar un archivo .csv con el listado de postulantes, los cuáles serán ordenados priorizando la cercanía a la institución y se mostrará su ubicación en un mapa.

## Índice
1. [Subir Listado](#subir-listado)
2. [Obtener Direcciones](#obtener-direcciones)
3. [Calcular Distancia](#calcular-distancia)
4. [Mostrar Lista](#mostrar-lista)
5. [Mostrar Mapa](#mostrar-mapa)
6. [Planificación](#planificación)

## Subir Listado

Para la correcta lectura del listado, el mismo debe seguir el siguiente formato:
| Nombre | Apellido | DNI | Dirección |
|--------|----------|-----|-----------|
| Nombre1 | Apellido1 | DNI1 | Dirección1 |
| Nombre2 | Apellido2 | DNI2 | Dirección2 |
| ... | ... | ... | ... |

Luego, utilizo [Papa Parse](https://www.papaparse.com/) para parsear el archivo y obtener los datos de cada postulante.

## Obtener Direcciones

Cada dirección es validada mediante el uso de la API [Georef](https://datosgobar.github.io/georef-ar-api/), si se encuentra la dirección se procede a calcular la distancia hasta el jardín, en caso contrario las direcciones no validadas se agregan a un listado para ser revisadas manualmente.

## Calcular Distancia

Mediante la fórmula Haversine obtengo la distancia en kilómetros entre dos coordenadas :
```
function calcularDistancia(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radio de la tierra en kilómetros
  var dLat = deg2rad(lat2 - lat1); 
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in KM
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180); //Paso a radianes
}
```
Luego agrego el resultado al listado de postulantes.

## Mostrar Lista
En el estado de la App se almacena la lista de postulantes cuyas direcciones fueron validadas, y además una lista de aquellos cuyas direcciones no pudieron encontrarse. Ambas se muestran mediante el uso de un ListGroup, donde cada ListGroup.Item representa los datos obtenidos de cada entrada.


## Mostrar Mapa
El mapa se muestra mediante el uso de [Leaflet](https://leafletjs.com/) y [React Leaflet](https://react-leaflet.js.org/). Al cargar la página se crea un marcador indicando la posición del jardín. Luego, una vez se carga el listado, se crean marcadores dinámicamente en aquellas direcciones validadas.

## Planificación:

### Principal
- [x] Permitir al usuario la carga del listado
- [x] Parsear el archivo csv
- [x] Validar las direcciones
- [x] Calcular la distancia de cada alumno al jardín
- [x] Ordenar el listado por menor distancia
- [x] Mostrar la lista de alumnos y la lista de errores
- [x] Mostrar las ubicaciones en un mapa
- [ ] Cambiar ubicación inicial

### Opcional

- [x] Listado con aquellos alumnos con direcciones no válidas
- [ ] Crear una lista de excedentes
- [ ] Cambiar límite de lista de inscriptos
- [ ] Mensaje de ayuda
