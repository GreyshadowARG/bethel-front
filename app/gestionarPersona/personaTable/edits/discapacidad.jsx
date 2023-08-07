import style from "../../gestionarPersona.module.css";

import { useState } from "react";

import axios from "../../../../config/axios";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Discapacidad = ({ persona, getLoadData }) => {
  const [edit, setEdit] = useState("");

  const [tieneDiscapacidad, setTieneDiscapacidad] = useState("");
  const [tipoDiscapacidad, setTipoDiscapacidad] = useState("");
  const [certificadoDiscapacidad, setCertificadoDiscapacidad] = useState("");
  const [prestacionesCertificado, setPrestacionesCertificado] = useState("");
  const [fechaEmisionCertificado, setFechaEmisionCertificado] = useState("");
  const [fechaVencimientoCertificado, setFechaVencimientoCertificado] =
    useState("");
  const [curatela, setCuratela] = useState("");
  const [recibePension, setRecibePension] = useState("");
  const [acompanamientoTerapeutico, setAcompanamientoTerapeutico] =
    useState("");
  const [nombreProfesional, setNombreProfesional] = useState("");
  const [diaAtencion, setDiaAtencion] = useState("");
  const [horarioAtencion, setHorarioAtencion] = useState("");

  // URLs
  const EDITDISCAPACIDAD_URL = "api/persona/editDiscapacidad/" + persona._id;

  const setData = () => {
    setTieneDiscapacidad(persona.tiene_discapacidad);
    setTipoDiscapacidad(persona.tipo_discapacidad);
    setCertificadoDiscapacidad(persona.certificado_discapacidad);
    setPrestacionesCertificado(persona.prestaciones_certificado);
    setFechaEmisionCertificado(persona.fecha_emision_certificado);
    setFechaVencimientoCertificado(persona.fecha_vencimiento_certificado);
    setCuratela(persona.curatela);
    setRecibePension(persona.recibe_pension);
    setAcompanamientoTerapeutico(persona.acompanamiento_terapeutico);
    setNombreProfesional(persona.nombre_profesional_at);
    setDiaAtencion(persona.dia_atencion_at);
    setHorarioAtencion(persona.horario_atencion_at);
  };

  const editDiscapacidad = async (req, res, next) => {
    try {
      await axios.post(
        EDITDISCAPACIDAD_URL,
        JSON.stringify({
          tiene_discapacidad: tieneDiscapacidad,
          tipo_discapacidad: tipoDiscapacidad,
          curatela: curatela,
          recibe_pension: recibePension,
          acompanamiento_terapeutico: acompanamientoTerapeutico,
          nombre_profesional_at: nombreProfesional,
          dia_atencion_at: diaAtencion,
          horario_atencion_at: horarioAtencion,
          certificado_discapacidad: certificadoDiscapacidad,
          prestaciones_certificado: prestacionesCertificado,
          fecha_emision_certificado: fechaEmisionCertificado,
          fecha_vencimiento_certificado: fechaVencimientoCertificado,
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
        {edit == "EditarDiscapacidad" ? (
          <button
            className={style.save_button}
            onClick={() => {
              editDiscapacidad();
              setEdit("GuardarDiscapacidad");
            }}
          >
            Guardar
          </button>
        ) : (
          <button
            className={style.edit_button}
            onClick={() => {
              setData();
              setEdit("EditarDiscapacidad");
            }}
          >
            Editar
          </button>
        )}
      </div>
      {edit != "EditarDiscapacidad" && (
        <>
          <Row>
            <Col id={style.bold}>¿Tiene discapacidad?</Col>
            {persona.tiene_discapacidad == "Si" && (
              <Col id={style.bold}>Tipo discapacidad</Col>
            )}
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>{persona.tiene_discapacidad}</Col>
            {persona.tiene_discapacidad == "Si" && (
              <Col>{persona.tipo_discapacidad}</Col>
            )}
            <Col></Col>
            <Col></Col>
          </Row>
          <br />
          <br />
        </>
      )}
      {edit == "EditarDiscapacidad" && (
        <Row>
          <Col>
            <label id={style.bold}>¿Tiene discapacidad?</label>
            <br />
            <select
              value={tieneDiscapacidad}
              onChange={(e) => {
                setTieneDiscapacidad(e.target.value);
              }}
            >
              <option value="">---</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </Col>
          {tieneDiscapacidad == "Si" && (
            <Col>
              <label id={style.bold}>Tipo discapacidad</label>
              <br />
              <input
                type="text"
                value={tipoDiscapacidad}
                onChange={(e) => {
                  setTipoDiscapacidad(e.target.value);
                }}
              />
            </Col>
          )}
          <Col></Col>
          <Col></Col>
        </Row>
      )}
      {edit != "EditarDiscapacidad" && (
        <>
          <Row>
            <Col id={style.bold}>¿Curatela?</Col>
            <Col id={style.bold}>¿Recibe pensión?</Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>{persona.curatela}</Col>
            <Col>{persona.recibe_pension}</Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <br />
          <br />
        </>
      )}
      {edit == "EditarDiscapacidad" && (
        <>
          <br />
          <br />
          <br />
          <Row>
            <Col>
              <label id={style.bold}>¿Curatela?</label>
              <br />
              <select
                value={curatela}
                onChange={(e) => {
                  setCuratela(e.target.value);
                }}
              >
                <option value="">---</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </Col>
            <Col>
              <label id={style.bold}>¿Recibe pensión?</label>
              <br />
              <select
                value={recibePension}
                onChange={(e) => {
                  setRecibePension(e.target.value);
                }}
              >
                <option value="">---</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </>
      )}
      {edit != "EditarDiscapacidad" && (
        <>
          <Row>
            <Col id={style.bold}>¿Recibe compañamiento terapéutico?</Col>
            {persona.acompanamiento_terapeutico == "Si" && (
              <Col id={style.bold}>Nombre del profesional</Col>
            )}
          </Row>
          <Row>
            <Col>{persona.acompanamiento_terapeutico}</Col>
            {persona.acompanamiento_terapeutico == "Si" && (
              <Col>{persona.nombre_profesional_at}</Col>
            )}
          </Row>
        </>
      )}
      {edit == "EditarDiscapacidad" && (
        <>
          <br />
          <br />
          <br />
          <Row>
            <Col>
              <label id={style.bold}>¿Recibe acompañamiento terapéutico?</label>
              <br />
              <select
                value={acompanamientoTerapeutico}
                onChange={(e) => {
                  setAcompanamientoTerapeutico(e.target.value);
                }}
              >
                <option value="">---</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </Col>
            {acompanamientoTerapeutico == "Si" && (
              <Col>
                <label id={style.bold}>Nombre del profesional</label>
                <br />
                <input
                  type="text"
                  value={nombreProfesional}
                  onChange={(e) => {
                    setNombreProfesional(e.target.value);
                  }}
                />
              </Col>
            )}
          </Row>
        </>
      )}
      {edit != "EditarDiscapacidad" && (
        <>
          {persona.acompanamiento_terapeutico == "Si" && (
            <>
              <br />
              <br />
              <Row>
                <Col id={style.bold}>Día de atención</Col>
                <Col id={style.bold}>Horario</Col>
                <Col></Col>
              </Row>
            </>
          )}
          {persona.acompanamiento_terapeutico == "Si" && (
            <>
              <Row>
                <Col>{persona.dia_atencion_at}</Col>
                <Col>{persona.horario_atencion_at}</Col>
                <Col></Col>
              </Row>
            </>
          )}
        </>
      )}
      {edit == "EditarDiscapacidad" && (
        <>
          {acompanamientoTerapeutico == "Si" && (
            <>
              <br />
              <br />
              <br />
              <Row>
                <Col>
                  <label id={style.bold}>Día de atención</label>
                  <br />
                  <input
                    type="text"
                    value={diaAtencion}
                    onChange={(e) => {
                      setDiaAtencion(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label id={style.bold}>Horario</label>
                  <br />
                  <input
                    type="text"
                    value={horarioAtencion}
                    onChange={(e) => {
                      setHorarioAtencion(e.target.value);
                    }}
                  />
                </Col>
                <Col></Col>
              </Row>
            </>
          )}
        </>
      )}
      {edit != "EditarDiscapacidad" && (
        <>
          <br />
          <br />
          <Row>
            <Col id={style.bold}>¿Tiene Certificado?</Col>
            {persona.certificado_discapacidad == "Si" && (
              <Col id={style.bold}>Prestaciones del Certificado</Col>
            )}
            <Col></Col>
          </Row>
          <Row>
            <Col>{persona.certificado_discapacidad}</Col>
            {persona.certificado_discapacidad == "Si" && (
              <>
                <Col>{persona.prestaciones_certificado}</Col>
                <Col></Col>
              </>
            )}
          </Row>
          {persona.certificado_discapacidad == "Si" && (
            <>
              <br />
              <br />
              <Row>
                <Col id={style.bold}>Fecha Emisión</Col>
                <Col id={style.bold}>Fecha vencimiento</Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>{persona.fecha_emision_certificado}</Col>
                <Col>{persona.fecha_vencimiento_certificado}</Col>
                <Col></Col>
              </Row>
            </>
          )}
        </>
      )}
      {edit == "EditarDiscapacidad" && (
        <>
          <br />
          <br />
          <br />
          <Row>
            <Col>
              <label id={style.bold}>¿Tiene Certificado?</label>
              <br />
              <select
                value={certificadoDiscapacidad}
                onChange={(e) => {
                  setCertificadoDiscapacidad(e.target.value);
                }}
              >
                <option value="">---</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </Col>
            {certificadoDiscapacidad == "Si" && (
              <Col>
                <label id={style.bold}>Prestaciones del Certificado</label>
                <br />
                <input
                  type="text"
                  value={prestacionesCertificado}
                  onChange={(e) => {
                    setPrestacionesCertificado(e.target.value);
                  }}
                />
              </Col>
            )}
            <Col></Col>
          </Row>
        </>
      )}
      {edit == "EditarDiscapacidad" && (
        <>
          {certificadoDiscapacidad == "Si" && (
            <>
              <br />
              <br />
              <br />
              <Row>
                <Col>
                  <label id={style.bold}>Fecha emisión</label>
                  <br />
                  <input
                    type="date"
                    value={fechaEmisionCertificado}
                    onChange={(e) => {
                      setFechaEmisionCertificado(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label id={style.bold}>Fecha vencimiento</label>
                  <br />
                  <input
                    type="date"
                    value={fechaVencimientoCertificado}
                    onChange={(e) => {
                      setFechaVencimientoCertificado(e.target.value);
                    }}
                  />
                </Col>
                <Col></Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Discapacidad;
