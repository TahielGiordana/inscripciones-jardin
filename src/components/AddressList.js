import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";

export default function AddressList(props) {
  const handleChange = (e) => {
    props.onFileChange(e);
  };

  return (
    <Container
      className="address-list p-2 d-flex flex-column align-items-stretch "
      style={{
        maxHeight: "100vh",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <Row>
        <Col>
          <Form.Group className="mb-2">
            <Form.Label className="text-light">Cargar listado:</Form.Label>
            {/* Carga del archivo csv con el listado de inscriptos*/}
            <Form.Control type="file" accept=".csv" onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {props.studentsList.length !== 0 ? (
          <Col>
            <p className="text-light">Listado por cercanía:</p>
            <ListGroup
              as={"ol"}
              numbered
              style={{
                maxHeight: "75vh",
                overflow: "auto",
              }}
            >
              {/*Ordeno la lista por cercanía y renderizo la lista */}
              {props.studentsList
                .sort((a, b) => {
                  return a["distancia"] - b["distancia"];
                })
                .map((student) => (
                  <ListGroup.Item key={student["dni"]}>
                    <span>
                      <strong>
                        {student["nombre"] + " " + student["apellido"]}
                      </strong>
                      {" - " + student["dni"]}
                    </span>
                    <p>{student["direccion"] + " - " + student["localidad"]}</p>
                    <p>{student["distancia"].toFixed(2) + " Km"}</p>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        ) : (
          <></>
        )}
        {props.errorsList.length !== 0 ? (
          <Col>
            <p className="text-light">No se encontró la dirección:</p>
            <ListGroup
              numbered
              as={"ol"}
              style={{
                maxHeight: "75vh",
                overflow: "auto",
              }}
            >
              {props.errorsList.map((student) => (
                <ListGroup.Item
                  key={student["dni"]}
                  className="text-danger"
                  style={{
                    maxHeight: "75vh",
                    overflow: "auto",
                  }}
                >
                  <span>
                    <strong>
                      {student["nombre"] + " " + student["apellido"]}
                    </strong>
                    {" - " + student["dni"]}
                  </span>
                  <p>{student["direccion"]}</p>
                  <p>{student["localidad"]}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
}
