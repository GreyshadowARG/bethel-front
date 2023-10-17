import style from "../../gestionarPersona.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import axios from "../../../../config/axios";

import { useState, useEffect } from "react";

const PasarPasiva = ({ props }) => {
  const [success, setSuccess] = useState(false);
  const [motivoPasividad, setMotivoPasividad] = useState("");
  const [otroMotivoPasividad, setOtroMotivoPasividad] = useState("");
  const [detalles, setDetalles] = useState("");
  const [fecha, setFecha] = useState("");

  // URLS
  const PASARPASIVA_URL = "/api/pasividad/pasarPasividad";
  const DELETERECORD_URL = "/api/persona/deletePersonaById/";

  const deleteRecord = async () => {
    try {
      await axios.delete(DELETERECORD_URL + props._id, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        PASARPASIVA_URL,
        JSON.stringify({
          id: props._id,
          nombre: props.nombre + " " + props.apellido,
          motivo_pasividad:
            motivoPasividad == "Otro" ? otroMotivoPasividad : motivoPasividad,
          fecha: fecha,
          detalles: detalles,
          persona_datos: props,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      deleteRecord();
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {success == true ? (
        <>
        <h5>Se ha registrado el paso a pasividad de {props.nombre} {props.apellido}.</h5>
        <p>
          A partir de este momento podrás encontrar a esta persona en el registro de Población pasiva.
        </p></>
      ) : (
        <>
          <hr />
          <form onSubmit={handleSubmit}>
            <Container>
              <h5>Pasar a pasividad</h5>
              <p>
                ¡Atención! Al pasar a una persona a pasividad dejará de estar en
                el registro de la <span id={style.bold}>Población común</span> y
                pasara al registro de{" "}
                <span id={style.bold}>Población pasiva</span>.
              </p>
              <Row>
                <Col>
                  <label>Motivo de pasividad:</label>
                  <br />
                  <select
                    value={motivoPasividad}
                    onChange={(e) => setMotivoPasividad(e.target.value)}
                  >
                    <option value="---">---</option>
                    <option value="Fallecimiento">Fallecimiento</option>
                    <option value="Adopción">Adopción</option>
                    <option value="Mayoría de edad">Mayoría de edad</option>
                    <option value="Otro">Otro</option>
                  </select>
                </Col>
                <Col>
                  <label>Fecha:</label>
                  <br />
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </Col>
                <Col></Col>
              </Row>
              {motivoPasividad == "Otro" && (
                <Row>
                  <Col>
                    <input
                      type="text"
                      value={otroMotivoPasividad}
                      onChange={(e) => {
                        setOtroMotivoPasividad(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              )}
              <br />
              <Row>
                <Col>
                  <label>Detalles</label>
                  <br />
                  <input
                    type="text"
                    className={style.inputDescription}
                    value={detalles}
                    onChange={(e) => {
                      setDetalles(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <hr />
              <button className="btn btn-success">
                Pasar a población pasiva
              </button>
            </Container>
          </form>
        </>
      )}
    </>
  );
};

export default PasarPasiva;
