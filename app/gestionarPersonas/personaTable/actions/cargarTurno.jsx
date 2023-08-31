import style from "../../gestionarPersona.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import axios from "../../../../config/axios";

import { useState, useEffect } from "react";

const CargarTurno = ({ props }) => {
  const [accion, setAccion] = useState("Turnos");
  const [success, setSuccess] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [arrayTurnos, setArrayTurnos] = useState([]);
  const [tipoTurno, setTipoTurno] = useState("");
  const [detalles, setDetalles] = useState("");
  const [lugarTurno, setLugarTurno] = useState("");
  const [diaTurno, setDiaTurno] = useState("");
  const [horaTurno, setHoraTurno] = useState("");

  // URLS
  const NEWTURNO_URL = "api/turnos/newTurno/";
  const GETTURNOS_URL = "api/turnos/getTurnosByPersona/" + props._id;
  const DELTURNO_URL = `api/turnos/eliminarTurno/`;

  useEffect(() => {
    const getTurnos = async () => {
      try {
        const fetchTurnos = await axios.get(GETTURNOS_URL);
        setArrayTurnos(fetchTurnos.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTurnos();
    setLoadData(false);
  }, [loadData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        NEWTURNO_URL,
        JSON.stringify({
          userId: props._id,
          nombre: props.nombre + " " + props.apellido,
          tipo_turno: tipoTurno,
          detalles: detalles,
          lugar_turno: lugarTurno,
          dia_turno: diaTurno,
          hora_turno: horaTurno,
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
    setTipoTurno("");
    setDetalles("");
    setLugarTurno("");
    setDiaTurno("");
    setHoraTurno("");
  };

  const handleDelete = async (string) => {
    try {
      await axios.delete(DELTURNO_URL + string, {
        headers: { "Content-Type": "application/json" },
      });
      setLoadData(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {accion == "CargarTurno" && (
        <>
          <div className={style.menu_gestion}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setAccion("Turnos");
                resetData();
              }}
            >
              Turnos registrados
            </button>
          </div>
          <hr />
          {success == false ? (
            <form onSubmit={handleSubmit}>
              <Container>
                <h5>Registro de Turnos</h5>
                <Row>
                  <Col>
                    <label>Tipo de turno</label>
                    <br />
                    <select
                      value={tipoTurno}
                      onChange={(e) => setTipoTurno(e.target.value)}
                    >
                      <option value="---">---</option>
                      <option value="Turno Médico">Turno Médico</option>
                      <option value="Turno Judicial">Turno Judicial</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Detalles</label>
                    <br />
                    <input
                      type="text"
                      value={detalles}
                      onChange={(e) => {
                        setDetalles(e.target.value);
                      }}
                    />
                  </Col>
                  <Col>
                    <label>Lugar:</label>
                    <br />
                    <input
                      type="text"
                      value={lugarTurno}
                      onChange={(e) => setLugarTurno(e.target.value)}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Día:</label>
                    <br />
                    <input
                      type="date"
                      value={diaTurno}
                      onChange={(e) => setDiaTurno(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <label>Horario:</label>
                    <br />
                    <input
                      type="text"
                      value={horaTurno}
                      onChange={(e) => setHoraTurno(e.target.value)}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <hr />
                <button className="btn btn-success">Cargar turno</button>
              </Container>
            </form>
          ) : (
            <h5>El turno se ha cargado exitosamente.</h5>
          )}
        </>
      )}
      {accion == "Turnos" && (
        <>
          <div className={style.menu_gestion}>
            <button
              id={style.bold}
              className="btn btn-success"
              onClick={() => setAccion("CargarTurno")}
            >
              + Cargar Turno
            </button>
          </div>
          <hr />
          {arrayTurnos.length == 0 ? (
            <p>No hay turnos cargados.</p>
          ) : (
            <>
              <Col>
                {arrayTurnos.toReversed().map((elemento, index) => {
                  return (
                    <div className={style.turno_container} key={index}>
                      <h5 id={style.bold}>
                        {elemento.tipo_turno} {elemento.dia_turno}
                      </h5>
                      <div>
                        <div className={style.actionsRow}>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Descripción</span>
                              <br />
                              {elemento.detalles}
                            </p>
                          </div>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Lugar</span>
                              <br />
                              {elemento.lugar_turno}
                            </p>
                          </div>
                        </div>
                        <div className={style.actionsRow}>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Fecha</span>
                              <br />
                              {elemento.dia_turno}
                            </p>
                          </div>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Horario</span>
                              <br />
                              {elemento.hora_turno} hs
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(elemento._id);
                          }}
                        >
                          Eliminar turno
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

export default CargarTurno;
