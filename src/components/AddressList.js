import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import Papa from "papaparse";

export default function AddressList() {
  const [csvFile, setCsvFile] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const csvFile = e.target.files[0];
    if (csvFile) {
      setCsvFile();
      const parsedData = Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          setData(results.data);
          console.log(results.data);
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
      <ListGroup as={"ol"}>
        {data.map((student, index) => (
          <ListGroup.Item key={index}>
            <p>
              <strong>{student["Nombre"] + " " + student["Apellido"]}</strong>
              {" - " + student["DNI"]}
            </p>
            <p>{student["Dirección"]}</p>
          </ListGroup.Item>
        ))}
        <ListGroup.Item as={"li"}></ListGroup.Item>
      </ListGroup>
    </div>
  );
}
