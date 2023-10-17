import style from "../../../gestionarPersona.module.css";
import { useState } from 'react'

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DatosPersonales = ({ persona }) => {
  const datosPersonales = persona.persona_datos
  
  return (
    <>
      <Row>
        <Col id={style.bold}>Nombre</Col>
        <Col id={style.bold}>Motivo de pasividad</Col>
        <Col id={style.bold}>Fecha pasividad</Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>{persona.nombre}</Col>
        <Col>{persona.motivo_pasividad}</Col>
        <Col>{persona.fecha}</Col>
        <Col></Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col id={style.bold}>Detalles de pasividad</Col>
      </Row>
      <Row>
        <Col>{persona.detalles}</Col>
      </Row>
      <br />
      <br />
      <hr />
      <Row>
        <Col id={style.bold}>Fecha nacimiento</Col>
        <Col id={style.bold}>Fecha ingreso al hogar</Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
      <Col>{datosPersonales?.fecha_nacimiento}</Col>
      <Col>{datosPersonales?.fecha_ingreso}</Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default DatosPersonales;
