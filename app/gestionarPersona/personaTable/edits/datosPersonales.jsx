import style from "../../gestionarPersona.module.css";

import { useState } from "react";

import axios from "../../../../config/axios";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DatosPersonales = ({ persona, getLoadData }) => {
  const [edit, setEdit] = useState("");

  const [sexo, setSexo] = useState("");
  const [dni, setDni] = useState("");
  const [casa, setCasa] = useState("");
  const [peso, setPeso] = useState("");
  const [talle, setTalle] = useState("");
  const [edad, setEdad] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // URLs
  const EDITDATOSPERSONALES_URL =
    "api/persona/editDatosPersonales/" + persona._id;

  const changeFormatDate = (fecha) => {
    const stringDay = String(fecha);
    const daySplit = stringDay.split("-");
    let finalDate = "";

    const day = daySplit[0];
    const month = daySplit[1];
    const year = daySplit[2];
    finalDate = `${year}-${month}-${day}`;

    return finalDate;
  };

  const editDatosPersonales = async () => {
    try {
      await axios.post(
        EDITDATOSPERSONALES_URL,
        JSON.stringify({
          sexo: sexo,
          dni: dni,
          casa: casa,
          peso: peso,
          talle: talle,
          edad: edad,
          fecha_nacimiento: fechaNacimiento,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Datos Editados");
      getLoadData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const setData = () => {
    setSexo(persona.sexo);
    setDni(persona.dni);
    setCasa(persona.casa);
    setPeso(persona.peso);
    setTalle(persona.talle);
    setEdad(persona.edad);
    setFechaNacimiento(persona.fecha_nacimiento);
  }

  return (
    <>
      <Row>
        <div className={style.menu_gestion}>
          {edit == "EditarDatosPersonales" ? (
            <button
              className={style.save_button}
              onClick={() => {
                editDatosPersonales();
                setEdit("GuardarDatosPersonales");
              }}
            >
              Guardar
            </button>
          ) : (
            <button
              className={style.edit_button}
              onClick={() => {
                setData();
                setEdit("EditarDatosPersonales");
              }}
            >
              Editar
            </button>
          )}
        </div>
      </Row>
      <Row>
        <Row>
          <Col id={style.bold}>Sexo</Col>
          <Col id={style.bold}>Dni</Col>
          <Col id={style.bold}>Edad</Col>
          <Col id={style.bold}>Casa</Col>
        </Row>

        {edit == "EditarDatosPersonales" ? (
          <>
            <Row>
              <Col>
                <select
                  defaultValue={sexo}
                  onChange={(e) => {
                    setSexo(e.target.value);
                  }}
                >
                  <option value="">---</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </Col>
              <Col>
                <input
                  type="text"
                  defaultValue={dni}
                  onChange={(e) => {
                    setDni(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  defaultValue={edad}
                  onChange={(e) => {
                    setEdad(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <select
                  defaultValue={casa}
                  onChange={(e) => {
                    setCasa(e.target.value);
                  }}
                >
                  <option value="">---</option>
                  <option value="Casa 2">Casa 2</option>
                  <option value="Casa 5">Casa 5</option>
                  <option value="Casa 6">Casa 6</option>
                  <option value="Casa 8">Casa 8</option>
                  <option value="Casa 9">Casa 9 (Ascochinga)</option>
                  <option value="Casa 14">Casa 14</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col>
                <label id={style.bold}>Peso</label>
                <input
                  type="text"
                  defaultValue={peso}
                  onChange={(e) => {
                    setPeso(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <label id={style.bold}>Talle (Altura)</label>
                <input
                  type="text"
                  defaultValue={talle}
                  onChange={(e) => {
                    setTalle(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <label id={style.bold}>Fecha de nacimiento</label>
                <input
                  type="date"
                  defaultValue={changeFormatDate(fechaNacimiento)}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </Col>
              <Col></Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col>{persona.sexo}</Col>
              <Col>{persona.dni}</Col>
              <Col>{persona.edad} años</Col>
              <Col>{persona.casa}</Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col id={style.bold}>Peso</Col>
              <Col id={style.bold}>Talle (Altura)</Col>
              <Col id={style.bold}>Fecha de Nacimiento</Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>{persona.peso} kg</Col>
              <Col>{persona.talle} cm</Col>
              <Col>{persona.fecha_nacimiento}</Col>
              <Col></Col>
            </Row>
          </>
        )}
      </Row>
    </>
  );
};

export default DatosPersonales;
