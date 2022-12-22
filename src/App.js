import "./App.css";
import AddressList from "./components/AddressList";
import AddressMap from "./components/AddressMap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Papa from "papaparse";
import { calcularDistancia } from "./utils";

//Plaza
const sampleHome = {
  lat: -34.54295340866218,
  lon: -58.71187638934445,
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
    <div className="App">
      <AddressList
        studentsList={studentsList}
        errorsList={errorsList}
        onFileChange={handleFileChange}
      ></AddressList>
      <AddressMap studentsList={studentsList} home={sampleHome}></AddressMap>
    </div>
  );
}

export default App;
