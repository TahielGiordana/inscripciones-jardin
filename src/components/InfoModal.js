import { faInfo, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";

// Muestra un mensaje de ayuda explicando el funcionamiento del sistema

export default function InfoModal() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Container>
      <Button
        variant="dark"
        className="rounded-circle d-flex justify-content-center align-items-center"
        style={{ width: "40px", height: "40px" }}
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faInfo} />
      </Button>
      <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
        <Modal.Header>
          <Modal.Title>Ayuda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Listado</h5>
          <p>
            Podrá ingresar el listado de inscriptos haciendo click sobre
            "Seleccionar archivo", en la esquina superior izquierda.
          </p>
          <p>
            Es importante que el archivo se encuentre en formato <b>CSV </b>
            respetando la siguiente estructura:
          </p>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Dirección</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>DNI1</td>
                <td>Dirección1</td>
              </tr>
              <tr>
                <td>Nombre2</td>
                <td>Apellido2</td>
                <td>DNI2</td>
                <td>Dirección2</td>
              </tr>
              <tr>
                <td>Nombre3</td>
                <td>Apellido3</td>
                <td>DNI3</td>
                <td>Dirección3</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </Table>
          <p>
            Una vez cargado el archivo, se generará una lista con aquellos
            ingresantes cuya dirección fue validada, los cuales serán ordenados
            por su cercanía al jardín.
          </p>
          <p>
            Además, se mostrará una lista con aquellos ingresantes cuyas
            direcciones no pudieron ser ubicadas, para que sea posible realizar
            una búsqueda manual de las mismas
          </p>
          <h5>Ubicación</h5>
          <p>
            Tanto los ingresantes como el jardín serán señalizados en el mapa al
            momento de cargar el listado.
          </p>
          <p>
            Para actualizar la posición inicial del jardín, se deberá hacer
            click sobre <FontAwesomeIcon icon={faMapLocationDot} /> e ingresar
            las coordenadas correspondientes.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
