El objetivo del siguiente proyecto es facilitar el proceso de inscripción de un Jardín de Infantes.
El sistema debe recibir el listado de postulantes en formato csv, y ordenarlo en base a la distancia entre el jardín y su domicilio.
Para esto el sistema deberá validar las direcciones, calcular la distancia hasta el jardín y crear un listado de alumnos priorizando los que se encuentran más cercanos al jardín.
Como hay un límite de inscripciones, el resto de alumnos deben ubicarse en una lista de excedentes en caso de que se abra una vacante.
Además, es deseable que se muestren las direcciones de los alumnos en un mapa.

Planificación:

1. Permitir al usuario la carga del listado
2. Parsear el archivo csv
3. Validar las direcciones
4. Calcular la distancia de cada alumno al jardín
5. Ordenar el listado por menor distancia
6. Mostrar la lista de alumnos y la lista de excedentes
7. Mostrar las ubicaciones en un mapa
   //Opcional//
8. Mover alumnos entre la lista de inscriptos y excedentes
9. Mensaje de ayuda
10. Listado con aquellos alumnos con direcciones no válidas

Modelo de CSV:
Nombre | Apellido | DNI | Dirección
