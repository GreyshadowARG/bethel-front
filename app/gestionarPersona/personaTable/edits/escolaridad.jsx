import style from "../../gestionarPersona.module.css";

import { useState } from "react";

import axios from "../../../../config/axios";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Escolaridad = ({ persona, getLoadData }) => {
  const [edit, setEdit] = useState("");

  const [concurreInstitucionEducativa, setConcurreInstitucionEducativa] =
    useState("");
  const [modalidad, setModalidad] = useState("");
  const [ultimoNivelEscolar, setUltimoNivelEscolar] = useState("");
  const [nivelEscolar, setNivelEscolar] = useState("");
  const [nivelEducativo, setNivelEducativo] = useState("");
  const [maestraIntegradora, setMaestraIntegradora] = useState("");
  const [nombreMaestraIntegradora, setNombreMaestraIntegradora] = useState("");
  const [telMaestraIntegradora, setTelMaestraIntegradora] = useState("");
  const [nombreEstablEd, setNombreEstablEd] = useState("");
  const [domicilioEstablEd, setDomicilioEstablEd] = useState("");
  const [telEstablEd, setTelEstablEd] = useState("");

  // URLs
  const EDITESCOLARIDAD_URL = "api/persona/editEscolaridad/" + persona._id;

  const setData = () => {
    setConcurreInstitucionEducativa(persona.concurre_institucion_educativa);
    setUltimoNivelEscolar(persona.ultimo_nivel_escolar);
    setNivelEscolar(persona.nivel_escolar);
    setNivelEducativo(persona.nivel_educativo);
    setMaestraIntegradora(persona.maestra_integradora);
    setNombreMaestraIntegradora(persona.nombre_maestra_integradora);
    setTelMaestraIntegradora(persona.telefono_maestra_integradora);
    setModalidad(persona.modalidad);
    setNombreEstablEd(persona.nombre_establecimiento_educativo);
    setDomicilioEstablEd(persona.domicilio_establecimiento_educativo);
    setTelEstablEd(persona.telefono_establecimiento_educativo);
  };

  const editEscolaridad = async (req, res, next) => {
    try {
      await axios.post(
        EDITESCOLARIDAD_URL,
        JSON.stringify({
          concurre_institucion_educativa: concurreInstitucionEducativa,
          ultimo_nivel_escolar: ultimoNivelEscolar,
          nivel_escolar: nivelEscolar,
          nivel_educativo: nivelEducativo,
          maestra_integradora: maestraIntegradora,
          nombre_maestra_integradora: nombreMaestraIntegradora,
          telefono_maestra_integradora: telMaestraIntegradora,
          modalidad: modalidad,
          nombre_establecimiento_educativo: nombreEstablEd,
          domicilio_establecimiento_educativo: domicilioEstablEd,
          telefono_establecimiento_educativo: telEstablEd,
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
      <div className={style.menu_gestion}>
        {edit == "EditarEscolaridad" ? (
          <button
            className={style.save_button}
            onClick={() => {
              editEscolaridad();
              setEdit("GuardarEscolaridad");
            }}
          >
            Guardar
          </button>
        ) : (
          <button
            className={style.edit_button}
            onClick={() => {
              setData();
              setEdit("EditarEscolaridad");
            }}
          >
            Editar
          </button>
        )}
      </div>
      <Row>
        {edit != "EditarEscolaridad" && (
          <>
            <Row>
              <Col id={style.bold}>Concurre</Col>
              <Col id={style.bold}>Modalidad</Col>
              <Col id={style.bold}>Nivel Escolar</Col>
              <Col id={style.bold}>Nivel Educativo</Col>
            </Row>

            <Row>
              <Col>{persona.concurre_institucion_educativa}</Col>
              <Col>{persona.modalidad}</Col>
              <Col>{persona.nivel_escolar}</Col>
              <Col>{persona.nivel_educativo}</Col>
            </Row>
            <br />
            <br />
          </>
        )}
        {edit == "EditarEscolaridad" && (
          <Row>
            <Col>
              <label id={style.bold}>Concurre</label>
              <br />
              <select
                value={concurreInstitucionEducativa}
                onChange={(e) => {
                  setConcurreInstitucionEducativa(e.target.value);
                }}
              >
                <option value="">---</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </Col>
            <Col>
              <label id={style.bold}>Modalidad</label>
              <br />
              <select
                value={modalidad}
                onChange={(e) => {
                  setModalidad(e.target.value);
                }}
              >
                <option value="">---</option>
                <option value="Escuela común">Escuela común</option>
                <option value="Escuela especial">Escuela especial</option>
              </select>
            </Col>
            <Col>
              <label id={style.bold}>Nivel Escolar</label>
              <br />
              <select
                value={nivelEscolar}
                onChange={(e) => setNivelEscolar(e.target.value)}
              >
                <option value="">---</option>
                <option value="Inicial">Inicial</option>
                <option value="Primario">Primario</option>
                <option value="Secundario">Secundario</option>
                <option value="Acelerado">Acelerado</option>
              </select>
            </Col>
            <Col>
              <label id={style.bold}>Nivel Educativo</label>
              <br />
              <select
                value={nivelEducativo}
                onChange={(e) => setNivelEducativo(e.target.value)}
              >
                <option value="">---</option>
                <option value="Guardería">Guardería</option>
                <option value="Jardín">Jardín</option>
                <option value="1er grado">1er grado</option>
                <option value="2do grado">2do grado</option>
                <option value="3er grado">3er grado</option>
                <option value="4to grado">4to grado</option>
                <option value="5to grado">5to grado</option>
                <option value="6to grado">6to grado</option>
                <option value="1er año">1er año</option>
                <option value="2do año">2do año</option>
                <option value="3er año">3er año</option>
                <option value="4to año">4to año</option>
                <option value="5to año">5to año</option>
                <option value="6to año">6to año</option>
              </select>
            </Col>
          </Row>
        )}
      </Row>
      <br />
      <br />
      <br />
      <Row>
        <Row>
          <Col id={style.bold}>Maestra Integradora</Col>
          {persona.maestra_integradora == "Si" && (
            <>
              <Col id={style.bold}>Nombre Maestra Integradora</Col>
              <Col id={style.bold}>Teléfono Maestra Integradora</Col>
            </>
          )}
        </Row>
        {edit != "EditarEscolaridad" && (
          <>
            <Row>
              <Col>{persona.maestra_integradora}</Col>
              {persona.maestra_integradora == "Si" && (
                <>
                  <Col>{persona.nombre_maestra_integradora}</Col>
                  <Col>{persona.telefono_maestra_integradora}</Col>
                </>
              )}
            </Row>
          </>
        )}
        {edit == "EditarEscolaridad" && (
          <Row>
            <Col>
              <select
                value={maestraIntegradora}
                onChange={(e) => setMaestraIntegradora(e.target.value)}
              >
                <option value="">---</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </Col>
            {maestraIntegradora == "Si" && (
              <>
                <Col>
                  <input
                    type="text"
                    value={nombreMaestraIntegradora}
                    onChange={(e) => {
                      setNombreMaestraIntegradora(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <input
                    type="text"
                    value={telMaestraIntegradora}
                    onChange={(e) => setTelMaestraIntegradora(e.target.value)}
                  />
                </Col>
              </>
            )}
          </Row>
        )}
        <br />
        <br />
      </Row>
      <br />
      <br />
      <br />
      <Row>
        <Row>
          <Col id={style.bold}>Nombre establecimiento</Col>
          <Col id={style.bold}>Domicilio</Col>
          <Col id={style.bold}>Telefono</Col>
          <Col></Col>
        </Row>
        {edit == "EditarEscolaridad" && (
          <Row>
            <Col>
              <input
                type="text"
                value={nombreEstablEd}
                onChange={(e) => setNombreEstablEd(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                value={domicilioEstablEd}
                onChange={(e) => {
                  setDomicilioEstablEd(e.target.value);
                }}
              />
            </Col>
            <Col>
              <input
                type="text"
                value={telEstablEd}
                onChange={(e) => setTelEstablEd(e.target.value)}
              />
            </Col>
            <Col></Col>
          </Row>
        )}
        {edit != "EditarEscolaridad" && (
          <Row>
            <Col>{persona.nombre_establecimiento_educativo}</Col>
            <Col>{persona.domicilio_establecimiento_educativo}</Col>
            <Col>{persona.telefono_establecimiento_educativo}</Col>
            <Col></Col>
          </Row>
        )}
      </Row>
    </>
  );
};

export default Escolaridad;
