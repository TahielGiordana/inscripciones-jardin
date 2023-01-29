import "./App.css";
import AddressList from "./components/AddressList";
import AddressMap from "./components/AddressMap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Papa from "papaparse";
import { calcularDistancia } from "./utils";
import { Col, Container, Row } from "react-bootstrap";
import SetHomeModal from "./components/SetHomeModal";
import InfoModal from "./components/InfoModal";

const getHome = () => {
  let home = { lat: -34.534361277085296, lon: -58.6935997561191 }; //Default home
  if (localStorage.getItem("homeLat") && localStorage.getItem("homeLon")) {
    home.lat = localStorage.getItem("homeLat");
    home.lon = localStorage.getItem("homeLon");
    return home;
  } else {
    return home;
  }
};

function App() {
  const [home, setHome] = useState(getHome());
  const [studentsList, setStudentsList] = useState([]);
  const [errorsList, setErrorList] = useState([]);

  const handleHomeChange = (newHome) => {
    setHome(newHome);
    localStorage.setItem("homeLat", newHome.lat);
    localStorage.setItem("homeLon", newHome.lon);
    studentsList.forEach(
      (student) =>
        (student["distancia"] = calcularDistancia(
          newHome.lat,
          newHome.lon,
          student["ubicacion"].lat,
          student["ubicacion"].lon
        ))
    );
  };

  const handleFileChange = async (e) => {
    const csvFile = e.target.files[0];
    setStudentsList([]);
    setErrorList([]);
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
        <InfoModal />
      </Container>
    </Container>
  );
}

export default App;
