import style from "../../gestionarPersona.module.css";

import { useState } from "react";

import axios from "../../../../config/axios";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Ingreso = ({ persona, getLoadData }) => {
  const [edit, setEdit] = useState("");

  const [fechaIngreso, setFechaIngreso] = useState("");
  const [areaPideIngreso, setAreaPideIngreso] = useState("");
  const [otraAreaIngreso, setOtraAreaIngreso] = useState("");
  const [detalleArea, setDetalleArea] = useState("");
  const [condicion, setCondicion] = useState("");
  const [motivoIngreso, setMotivoIngreso] = useState("");
  const [documentacionIngreso, setDocumentacionIngreso] = useState("");
  const [documentacionIngresoExtra, setDocumentacionIngresoExtra] =
    useState("");
  const [otraDocumentacionIngreso, setOtraDocumentacionIngreso] = useState("");

  // URLs
  const EDITINGRESO_URL = "api/persona/editIngreso/" + persona._id;

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

  const setData = () => {
    setFechaIngreso(changeFormatDate(persona.fecha_ingreso));
    setAreaPideIngreso(persona.area_pide_ingreso);
    setDetalleArea(persona.detalle_area);
    setCondicion(persona.condicion);
    setMotivoIngreso(persona.motivo_ingreso);
    setDocumentacionIngreso(persona.documentacion_ingreso);
  };

  const handleDocIngreso = () => {
    if (documentacionIngreso !== "" && documentacionIngresoExtra === "Otros") {
      return `${documentacionIngreso}, ${otraDocumentacionIngreso}`;
    } else if (
      documentacionIngreso !== "" &&
      documentacionIngresoExtra === ""
    ) {
      return `${documentacionIngreso}`;
    } else if (
      documentacionIngreso !== "" &&
      documentacionIngresoExtra !== ""
    ) {
      return `${documentacionIngreso}, ${documentacionIngresoExtra}`;
    }
  };

  const editIngreso = async (req, res, next) => {
    try {
      await axios.post(
        EDITINGRESO_URL,
        JSON.stringify({
          fecha_ingreso: fechaIngreso,
          documentacion_ingreso: documentacionIngreso === "Otros" ? otraDocumentacionIngreso : handleDocIngreso(),
          area_pide_ingreso:
            areaPideIngreso == "Otro" ? otraAreaIngreso : areaPideIngreso,
          detalle_area: detalleArea,
          condicion: condicion,
          motivo_ingreso: motivoIngreso,
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

  return (
    <Row>
      <div className={style.menu_gestion}>
        {edit == "EditarIngreso" ? (
          <>
            <button
              className={style.save_button}
              onClick={() => {
                editIngreso();
                setEdit("GuardarIngreso");
              }}
            >
              Guardar
            </button>
          </>
        ) : (
          <button
            className={style.edit_button}
            onClick={() => {
              setData();
              setEdit("EditarIngreso");
            }}
          >
            Editar
          </button>
        )}
      </div>
      <Row>
        {edit != "EditarIngreso" && (
          <>
            <Row>
              <Col id={style.bold}>Fecha de ingreso</Col>
              <Col id={style.bold}>Area que pide ingreso</Col>
              {persona.detalle_area != "" && (
                <Col id={style.bold}>Detalles del Area</Col>
              )}
              <Col></Col>
            </Row>
            <Row>
              <Col>{persona.fecha_ingreso}</Col>
              <Col>{persona.area_pide_ingreso}</Col>
              {persona.detalle_area != "" && <Col>{persona.detalle_area}</Col>}
              <Col></Col>
            </Row>
          </>
        )}
        {edit == "EditarIngreso" && (
          <>
            <Row>
              <Col>
                <label id={style.bold}>Fecha de ingreso</label>
                <br />
                <input
                  type="date"
                  defaultValue={fechaIngreso}
                  onChange={(e) => setFechaIngreso(e.target.value)}
                />
              </Col>
              <Col>
                <label id={style.bold}>Area que pide ingreso</label>
                <br />
                <select
                  defaultValue={areaPideIngreso}
                  onChange={(e) => {
                    setAreaPideIngreso(e.target.value);
                  }}
                >
                  <option value="">---</option>
                  <option value="SENAF">SENAF</option>
                  <option value="UDER">UDER</option>
                  <option value="Juzgado">Juzgado</option>
                  <option value="Otro">Otro</option>
                </select>
              </Col>
              {areaPideIngreso == "SENAF" && <Col></Col>}
              {areaPideIngreso == "Otro" && (
                <>
                  <Col>
                    <label id={style.bold}>¿Cual?:</label>
                    <br />
                    <input
                      type="text"
                      defaultValue={otraAreaIngreso}
                      onChange={(e) => setOtraAreaIngreso(e.target.value)}
                    />
                  </Col>
                </>
              )}
              {areaPideIngreso == "UDER" && (
                <Col>
                  <label id={style.bold}>Dependencia Uder:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={detalleArea}
                    onChange={(e) => setDetalleArea(e.target.value)}
                  />
                </Col>
              )}
              {areaPideIngreso == "Juzgado" && (
                <Col>
                  <label id={style.bold}>Juzgado:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={detalleArea}
                    onChange={(e) => setDetalleArea(e.target.value)}
                  />
                </Col>
              )}
            </Row>
          </>
        )}
        <br />
        <br />
        {edit != "EditarIngreso" && (
          <>
            <Row>
              <Col id={style.bold}>Condición ingreso</Col>
              <Col id={style.bold}>Motivo ingreso</Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>{persona.condicion}</Col>
              <Col>{persona.motivo_ingreso}</Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </>
        )}
        {edit == "EditarIngreso" && (
          <>
            <br />
            <Row>
              <Col>
                <label id={style.bold}>Condición</label>
                <br />
                <select
                  defaultValue={condicion}
                  onChange={(e) => {
                    setCondicion(e.target.value);
                  }}
                >
                  <option value="">---</option>
                  <option value="Medida vigente">Medida vigente</option>
                  <option value="Pedido de cese">Pedido de cese</option>
                  <option value="Cese de medida">Cese de medida</option>
                  <option value="Ratificación de cese de medida">
                    Ratificación de cese de medida
                  </option>
                  <option value="Adoptabilidad">Adoptabilidad</option>
                  <option value="Otro">Otro</option>
                </select>
              </Col>
              <Col>
                <label id={style.bold}>Motivo ingreso</label>
                <br />
                <input
                  type="text"
                  defaultValue={motivoIngreso}
                  onChange={(e) => {
                    setMotivoIngreso(e.target.value);
                  }}
                />
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </>
        )}
        <br />
        <br />
        {edit != "EditarIngreso" && (
          <>
            <Row>
              <Col id={style.bold}>Documentación ingreso</Col>
            </Row>
            <Row>
              <Col className={style.inputDescription}>
                {persona.documentacion_ingreso}
              </Col>
            </Row>
          </>
        )}
        {edit == "EditarIngreso" && (
          <>
            <br />
            <Row>
              <Col>
                <label id={style.bold}>Documentacion de ingreso:</label>
                <br />
                <select
                  value={documentacionIngreso}
                  onChange={(e) => {
                    setDocumentacionIngreso(e.target.value);
                  }}
                >
                  <option value="">---</option>
                  <option value="DNI">DNI</option>
                  <option value="Informe médico">Informe médico</option>
                  <option value="Carnet vacunación">Carnet vacunación</option>
                  <option value="Partida nacimiento">Partida nacimiento</option>
                  <option value="Otros">Otros</option>
                </select>
                {documentacionIngreso !== "" && (
                  <select
                    value={documentacionIngresoExtra}
                    onChange={(e) => {
                      setDocumentacionIngresoExtra(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="DNI">DNI</option>
                    <option value="Informe médico">Informe médico</option>
                    <option value="Carnet vacunación">Carnet vacunación</option>
                    <option value="Partida nacimiento">
                      Partida nacimiento
                    </option>
                    <option value="Otros">Otros</option>
                  </select>
                )}
                {(documentacionIngreso == "Otros" ||
                  documentacionIngresoExtra == "Otros") && (
                  <>
                    <br />
                    <input
                      className={style.inputDescription}
                      type="text"
                      value={otraDocumentacionIngreso}
                      onChange={(e) =>
                        setOtraDocumentacionIngreso(e.target.value)
                      }
                    />
                  </>
                )}
              </Col>
            </Row>
          </>
        )}
      </Row>
    </Row>
  );
};

export default Ingreso;
