import "./App.css";
import AddressList from "./components/AddressList";
import AddressMap from "./components/AddressMap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Papa from "papaparse";
import { calcularDistancia } from "./utils";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import SetHomeModal from "./components/SetHomeModal";

function App() {
  const [studentsList, setStudentsList] = useState([]);
  const [errorsList, setErrorList] = useState([]);
  const [home, setHome] = useState({
    lat: -34.53424624654218,
    lon: -58.69360771069819,
  });

  const handleHomeChange = (newHome) => {
    setHome(newHome);
  };

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
                  home.lat,
                  home.lon,
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
          <AddressMap studentsList={studentsList} home={home}></AddressMap>
        </Col>
      </Row>
      <Container
        className="d-flex position-absolute top-0 end-0 gap-1 m-2 "
        style={{ zIndex: 500, width: "auto" }}
      >
        <SetHomeModal setHome={handleHomeChange} />
        <Button
          variant="dark"
          className="rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "40px", height: "40px" }}
        >
          <FontAwesomeIcon icon={faInfo} />
        </Button>
      </Container>
    </Container>
  );
}

export default App;
