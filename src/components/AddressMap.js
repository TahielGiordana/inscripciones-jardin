import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../react-leaflet.css";
import L from "leaflet";
import { Button, Container } from "react-bootstrap";

delete L.Icon.Default.prototype._getIconUrl;

//Importar icono del marcador
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

//Update the map center
function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

export default function AddressMap(props) {
  return (
    <MapContainer
      center={[props.home.lat, props.home.lon]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[props.home.lat, props.home.lon]}>
        <Popup style={{ filter: "hue-rotate(120deg)" }}>Home</Popup>
      </Marker>
      {props.studentsList.map((student) => {
        const dir = student["ubicacion"];
        return (
          <Marker position={[dir.lat, dir.lon]} key={student["dni"]}>
            <Popup>
              {student["nombre"] +
                " " +
                student["apellido"] +
                " - " +
                student["dni"]}
              <br />
              {student["direccion"] +
                " - " +
                student["distancia"].toFixed(2) +
                " Km"}
            </Popup>
          </Marker>
        );
      })}
      <SetViewOnClick coords={[props.home.lat, props.home.lon]} />
    </MapContainer>
  );
}
