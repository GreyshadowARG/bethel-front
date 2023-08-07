import style from "../../gestionarPersona.module.css";

import { useState } from "react";

import axios from "../../../../config/axios";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ObraSocial = ({ persona, getLoadData }) => {
  const [edit, setEdit] = useState("");

  const [obraSocial, setObraSocial] = useState("");
  const [nombreObraSocial, setNombreObraSocial] = useState("");
  const [numeroAfiliado, setNumeroAfiliado] = useState("");
  const [codigoAfiliado, setCodigoAfiliado] = useState("");

  // URLs
  const EDITOBRASOCIAL_URL = "api/persona/editObraSocial/" + persona._id;

  const setData = () => {
    setObraSocial(persona.obra_social);
    setNombreObraSocial(persona.nombre_obra_social);
    setNumeroAfiliado(persona.numero_afiliado);
    setCodigoAfiliado(persona.codigo_afiliado);
  };

  const editObraSocial = async () => {
    try {
      await axios.post(
        EDITOBRASOCIAL_URL,
        JSON.stringify({
          obra_social: obraSocial == "Otro" ? nombreObraSocial : obraSocial,
          nombre_obra_social: nombreObraSocial,
          numero_afiliado: numeroAfiliado,
          codigo_afiliado: codigoAfiliado,
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
    <>
      <Row>
        <div className={style.menu_gestion}>
          {edit == "EditarObraSocial" ? (
            <button
              className={style.save_button}
              onClick={() => {
                editObraSocial();
                setEdit("GuardarObraSocial");
              }}
            >
              Guardar
            </button>
          ) : (
            <button
              className={style.edit_button}
              onClick={() => {
                setData();
                setEdit("EditarObraSocial");
              }}
            >
              Editar
            </button>
          )}
        </div>
        {edit != "EditarObraSocial" && (
          <>
            <Row>
              {obraSocial != "APROSS" && (
                <>
                  <Col id={style.bold}>Prestadora</Col>
                  <Col id={style.bold}>Número afiliado</Col>
                  <Col></Col>
                </>
              )}
              {obraSocial == "APROSS" && (
                <>
                  <Col id={style.bold}>Prestadora</Col>
                  <Col id={style.bold}>Número afiliado</Col>
                  <Col id={style.bold}>Código afiliado</Col>
                </>
              )}
            </Row>
            <Row>
              {obraSocial != "APROSS" && (
                <>
                  <Col>{persona.obra_social}</Col>
                  <Col>{persona.numero_afiliado}</Col>
                  <Col></Col>
                </>
              )}
              {obraSocial == "APROSS" && (
                <>
                  <Col>{persona.obra_social}</Col>
                  <Col>{persona.numero_afiliado}</Col>
                  <Col>{persona.codigo_afiliado}</Col>
                </>
              )}
            </Row>
          </>
        )}
        {edit == "EditarObraSocial" && (
          <>
            {obraSocial == "PROSAD" && (
              <Row>
                <Col>
                  <label id={style.bold}>Prestadora</label>
                  <br />
                  <select
                    defaultValue={obraSocial}
                    onChange={(e) => {
                      setObraSocial(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="APROSS">APROSS</option>
                    <option value="PROSAD">PROSAD</option>
                    <option value="Otro">Otro</option>
                  </select>
                </Col>
                <Col>
                  <label id={style.bold}>Número afiliado</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={numeroAfiliado}
                    onChange={(e) => {
                      setNumeroAfiliado(e.target.value);
                    }}
                  />
                </Col>
                <Col></Col>
              </Row>
            )}
            {obraSocial == "APROSS" && (
              <>
                <Col>
                  <label id={style.bold}>Prestadora</label>
                  <br />
                  <select
                    defaultValue={obraSocial}
                    onChange={(e) => {
                      setObraSocial(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="APROSS">APROSS</option>
                    <option value="PROSAD">PROSAD</option>
                    <option value="Otro">Otro</option>
                  </select>
                </Col>
                <Col>
                  <label id={style.bold}>Número afiliado</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={numeroAfiliado}
                    onChange={(e) => {
                      setNumeroAfiliado(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label id={style.bold}>Código afiliado</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={codigoAfiliado}
                    onChange={(e) => {
                      setCodigoAfiliado(e.target.value);
                    }}
                  />
                </Col>
              </>
            )}
            {(obraSocial != "PROSAD") & (obraSocial != "APROSS") && (
              <>
                <Col>
                  <label id={style.bold}>Prestadora</label>
                  <br />
                  <select
                    defaultValue={obraSocial}
                    onChange={(e) => {
                      setObraSocial(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="APROSS">APROSS</option>
                    <option value="PROSAD">PROSAD</option>
                    <option value="Otro">Otro</option>
                  </select>
                </Col>
                <Col>
                  <label id={style.bold}>¿Cuál?</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={nombreObraSocial}
                    onChange={(e) => {
                      setNombreObraSocial(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label id={style.bold}>Número afiliado</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={numeroAfiliado}
                    onChange={(e) => {
                      setNumeroAfiliado(e.target.value);
                    }}
                  />
                </Col>
              </>
            )}
          </>
        )}
      </Row>
    </>
  );
};

export default ObraSocial;
