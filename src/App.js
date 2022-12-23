import "./App.css";
import AddressList from "./components/AddressList";
import AddressMap from "./components/AddressMap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Papa from "papaparse";
import { calcularDistancia } from "./utils";
import { Col, Container, Row } from "react-bootstrap";

//Plaza
const sampleHome = {
  lat: -34.53424624654218,
  lon: -58.69360771069819,
};

function App() {
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
    <Container className="App" fluid>
      <Row>
        <Col xs={8} lg={5}>
          <AddressList
            studentsList={studentsList}
            errorsList={errorsList}
            onFileChange={handleFileChange}
          ></AddressList>
        </Col>
        <Col>
          <AddressMap
            studentsList={studentsList}
            home={sampleHome}
          ></AddressMap>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
