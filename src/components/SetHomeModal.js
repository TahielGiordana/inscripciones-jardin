import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";

// Permite actualizar la ubicación del jardín ingresando las coordenadas correspondientes

export default function SetHomeModal(props) {
  const [show, setShow] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleLatChange = (e) => {
    setLat(e.target.value);
  };
  const handleLonChange = (e) => {
    setLon(e.target.value);
  };

  return (
    <Container>
      <Button
        variant="dark"
        className="rounded-circle d-flex justify-content-center align-items-center"
        style={{ width: "40px", height: "40px" }}
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faMapLocationDot} />
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Ubicación del Jardín</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Latitud"
              className="mb-2"
              onChange={handleLatChange}
            />
            <Form.Control
              type="text"
              placeholder="Longitud"
              onChange={handleLonChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.setHome({ lat: lat, lon: lon });
              handleClose();
            }}
          >
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
