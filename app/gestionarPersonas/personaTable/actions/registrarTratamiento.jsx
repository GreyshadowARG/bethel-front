import style from "../../gestionarPersona.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import axios from "../../../../config/axios";

import { useState, useEffect } from "react";

const RegistrarTratamiento = ({ props }) => {
  const [accion, setAccion] = useState("Tratamientos");
  const [success, setSuccess] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [arrayTratamientos, setArrayTratamientos] = useState([]);
  const [recibeTratamiento, setRecibeTratamiento] = useState("");
  const [otroTratamientoRecibe, setOtroTratamientoRecibe] = useState("");
  const [profesionalTratamiento, setProfesionalTratamiento] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinalizacion, setFechaFinalizacion] = useState("");
  const [diaTratamiento, setDiaTratamiento] = useState("");
  const [horaTratamiento, setHoraTratamiento] = useState("");
  const [tratMedEsp, setTratMedEsp] = useState("");
  const [tratamientoEspecial, setTratamientoEspecial] = useState("");

  // URLS
  const NEWTRATAMIENTO_URL = "api/persona/newTratamiento/" + props;
  const GETTRATAMIENTO_URL = "api/persona/getAllTratamientos/" + props;
  const DELETETRATAMIENTO_URL = `api/persona/eliminarTratamiento/${props}/`;

  useEffect(() => {
    const getTratamiento = async () => {
      try {
        const fetchTratamientos = await axios.get(GETTRATAMIENTO_URL);

        setArrayTratamientos(fetchTratamientos.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTratamiento();
    setLoadData(false);
  }, [loadData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        NEWTRATAMIENTO_URL,
        JSON.stringify({
          recibe_tratamiento:
            recibeTratamiento == "Otro"
              ? otroTratamientoRecibe
              : recibeTratamiento,
          fecha_inicio: fechaInicio,
          fecha_finalizacion: fechaFinalizacion,
          profesional_tratamiento: profesionalTratamiento,
          dia_tratamiento: diaTratamiento,
          hora_tratamiento: horaTratamiento,
          tratamiento_especial: tratMedEsp == "Si" ? tratamientoEspecial : "No",
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const resetData = () => {
    setLoadData(true);
    setSuccess(false);
    setRecibeTratamiento("");
    setProfesionalTratamiento("");
    setFechaInicio("");
    setFechaFinalizacion("");
    setDiaTratamiento("");
    setHoraTratamiento("");
    setTratamientoEspecial("");
    setOtroTratamientoRecibe("");
  };

  const handleDelete = async (string) => {
    try {
      await axios.delete(DELETETRATAMIENTO_URL + string, {
        headers: { "Content-Type": "application/json" },
      });
      setLoadData(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {accion == "RegistrarTratamiento" && (
        <>
          <div className={style.menu_gestion}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setAccion("Tratamientos");
                resetData();
              }}
            >
              Tratamientos registrados
            </button>
          </div>
          <hr />
          {success == false ? (
            <form onSubmit={handleSubmit}>
              <Container>
                <h5>Registro de Tratamiento</h5>
                <Row>
                  <Col>
                    <label>Tratamiento que recibe:</label>
                    <br />
                    <select
                      value={recibeTratamiento}
                      onChange={(e) => setRecibeTratamiento(e.target.value)}
                    >
                      <option value="Ninguno" defaultValue>
                        Ninguno
                      </option>
                      <option value="Psicológico">Psicológico</option>
                      <option value="Psiquiatría">Psiquiatría</option>
                      <option value="Psicomotricidad">Psicomotricidad</option>
                      <option value="Fonoaudiología">Fonoaudiología</option>
                      <option value="Kinesiología">Kinesiología</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </Col>
                  {recibeTratamiento === "Otro" && (
                    <Col>
                      <label>Especifique el tratamiento:</label>
                      <br />
                      <input
                        type="text"
                        value={otroTratamientoRecibe}
                        onChange={(e) => {
                          setOtroTratamientoRecibe(e.target.value);
                        }}
                      />
                    </Col>
                  )}
                  <Col>
                    <label>Fecha de inicio:</label>
                    <br />
                    <input
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <label>Fecha de finalización:</label>
                    <br />
                    <input
                      type="date"
                      value={fechaFinalizacion}
                      onChange={(e) => setFechaFinalizacion(e.target.value)}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Nombre del profesional:</label>
                    <br />
                    <input
                      type="text"
                      value={profesionalTratamiento}
                      onChange={(e) =>
                        setProfesionalTratamiento(e.target.value)
                      }
                    />
                  </Col>
                  <Col>
                    <label>Día del tratamiento:</label>
                    <br />
                    <input
                      type="text"
                      value={diaTratamiento}
                      onChange={(e) => setDiaTratamiento(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <label>Horario del tratamiento:</label>
                    <br />
                    <input
                      type="text"
                      value={horaTratamiento}
                      onChange={(e) => {
                        setHoraTratamiento(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Tratamiento médico especial:</label>
                    <br />
                    <select
                      value={tratMedEsp}
                      onChange={(e) => {
                        setTratMedEsp(e.target.value);
                      }}
                    >
                      <option value="---">---</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                  </Col>
                  {tratMedEsp === "Si" && (
                    <Col>
                      <label>Especificar tratamiento especial:</label>
                      <br />
                      <input
                        type="text"
                        value={tratamientoEspecial}
                        onChange={(e) => {
                          setTratamientoEspecial(e.target.value);
                        }}
                      />
                    </Col>
                  )}
                </Row>
                <hr />
                <button className="btn btn-success">Cargar tratamiento</button>
              </Container>
            </form>
          ) : (
            <h5>El tratamiento se ha cargado exitosamente.</h5>
          )}
        </>
      )}
      {accion == "Tratamientos" && (
        <>
          <div className={style.menu_gestion}>
            <button
              id={style.bold}
              className="btn btn-success"
              onClick={() => setAccion("RegistrarTratamiento")}
            >
              + Registrar Tratamiento
            </button>
          </div>
          <hr />
          {arrayTratamientos.length == 0 ? (
            <p>No hay tratamientos cargados.</p>
          ) : (
            <>
              <Col>
                {arrayTratamientos.toReversed().map((elemento, index) => {
                  return (
                    <div className={style.tratamientos_container} key={index}>
                      <h5 id={style.bold}>Registro {index + 1}</h5>
                      <div>
                        <div className={style.actionsRow}>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Recibe tratamiento</span>
                              <br />
                              {elemento.recibe_tratamiento}
                            </p>
                          </div>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Fecha de inicio</span>
                              <br />
                              {elemento.fecha_inicio}
                            </p>
                          </div>
                          {elemento.fecha_finalizacion != "" && (
                            <div className={style.actionsCol}>
                              <p>
                                <span id={style.bold}>
                                  Fecha de finalización
                                </span>
                                <br />
                                {elemento.fecha_finalizacion}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className={style.actionsRow}>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Profesional</span>
                              <br />
                              {elemento.profesional_tratamiento}
                            </p>
                          </div>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Día</span>
                              <br />
                              {elemento.dia_tratamiento}
                            </p>
                          </div>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Horario</span>
                              <br />
                              {elemento.hora_tratamiento}
                            </p>
                          </div>
                        </div>
                      </div>
                      {elemento.tratamiento_especial != "No" && (
                        <>
                          <div className={style.actionsRow}>
                            <p id={style.paddingLeft}>
                              <span id={style.bold}>Tratamiento especial</span>
                              <br />
                              {elemento.tratamiento_especial}
                            </p>
                          </div>
                        </>
                      )}
                      <div className={style.cardButtons}>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(elemento._id);
                          }}
                        >
                          Eliminar tratamimento
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Col>
            </>
          )}
        </>
      )}
    </>
  );
};

export default RegistrarTratamiento;
