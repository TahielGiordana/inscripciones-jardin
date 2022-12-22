import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";

export default function AddressList(props) {
  const handleChange = (e) => {
    props.onFileChange(e);
  };

  return (
    <div className="address-list p-3">
      <Form.Group className="mb-3">
        <Form.Label>Cargar listado:</Form.Label>
        {/* Carga del archivo csv con el listado de inscriptos*/}
        <Form.Control type="file" accept=".csv" onChange={handleChange} />
      </Form.Group>
      <ListGroup as={"ol"} className="mb-3" numbered>
        {/*Ordeno la lista por cercanía y renderizo la lista */}
        {props.studentsList
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
        {props.errorsList.map((student) => (
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
