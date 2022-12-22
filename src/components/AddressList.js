import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import Papa from "papaparse";
import { calcularDistancia } from "../utils";

//Plaza
const sampleHome = {
  lat: -34.54295340866218,
  lon: -58.71187638934445,
};

export default function AddressList() {
  const [studentsList, setStudentsList] = useState([]);
  const [errorsList, setErrorList] = useState([]);

  const handleFileChange = async (e) => {
    const csvFile = e.target.files[0];
    if (csvFile) {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          const data = results.data;
          data.forEach(async (item) => {
            const geoData = await fetch(
              `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${item["Dirección"]}&provincia=Buenos Aires&localidad=${item["Localidad"]}`
            )
              .then((res) => res.json())
              .then((res) => res);
            if (geoData.direcciones[0]) {
              const ubicacion = geoData.direcciones[0].ubicacion; //Almacena la primera dirección obtenida
              console.log(geoData);
              const newEntry = {
                nombre: item["Nombre"],
                apellido: item["Apellido"],
                dni: item["DNI"],
                direccion: item["Dirección"],
                localidad: item["Localidad"],
                ubicacion: ubicacion,
                distancia: calcularDistancia(
                  sampleHome.lat,
                  sampleHome.lon,
                  ubicacion.lat,
                  ubicacion.lon
                ),
              };
              setStudentsList((studentsList) => [...studentsList, newEntry]);
            } else {
              const newError = {
                nombre: item["Nombre"],
                apellido: item["Apellido"],
                dni: item["DNI"],
                direccion: item["Dirección"],
                localidad: item["Localidad"],
              };
              setErrorList((errorsList) => [...errorsList, newError]);
            }
          });
        },
      });
    }
  };

  return (
    <div className="address-list p-3">
      <Form.Group className="mb-3">
        <Form.Label>Cargar listado:</Form.Label>
        {/* Carga del archivo csv con el listado de inscriptos*/}
        <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
      </Form.Group>
      <ListGroup as={"ol"} className="mb-3" numbered>
        {/*Ordeno la lista por cercanía y renderizo la lista */}
        {studentsList
          .sort((a, b) => {
            return a["distancia"] - b["distancia"];
          })
          .map((student) => (
            <ListGroup.Item key={student["dni"]}>
              <span>
                <strong>{student["nombre"] + " " + student["apellido"]}</strong>
                {" - " + student["dni"]}
              </span>
              <p>{student["direccion"] + " - " + student["localidad"]}</p>
              <p>{student["distancia"].toFixed(2) + " Km"}</p>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <p>No se pudo validar la dirección:</p>
      <ListGroup as={"ol"}>
        {errorsList.map((student) => (
          <ListGroup.Item key={student["dni"]} className="text-danger">
            <p>
              <strong>{student["nombre"] + " " + student["apellido"]}</strong>
              {" - " + student["dni"]}
            </p>
            <p>{student["direccion"]}</p>
            <p>{student["localidad"]}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
