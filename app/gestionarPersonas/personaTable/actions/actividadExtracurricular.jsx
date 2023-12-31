import style from "../../gestionarPersona.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import axios from "../../../../config/axios";

import { useState, useEffect } from "react";

const ActividadExtracurricular = ({ props }) => {
  const [accion, setAccion] = useState("Actividades");
  const [success, setSuccess] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [arrayActividades, setArrayActividades] = useState([]);
  const [nombreActividad, setNombreActividad] = useState("");
  const [lugarActividad, setLugarActividad] = useState("");
  const [diaActividad, setDiaActividad] = useState("");
  const [horarioActividad, setHorarioActividad] = useState("");
  const [detallesActividad, setDetallesActividad] = useState("");

  // URLS
  const NEWACTIVIDAD_URL = "api/persona/newActividad/" + props;
  const GETACTIVIDADES_URL = "api/persona/getAllActividades/" + props;
  const DELACTIVIDAD_URL = `api/persona/eliminarActividad/${props}/`;

  useEffect(() => {
    const getActividades = async () => {
      try {
        const fetchActividades = await axios.get(GETACTIVIDADES_URL);

        setArrayActividades(fetchActividades.data);
      } catch (error) {
        console.log(error);
      }
    };

    getActividades();
    setLoadData(false);
  }, [loadData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        NEWACTIVIDAD_URL,
        JSON.stringify({
          nombre_actividad: nombreActividad,
          dia_actividad: diaActividad,
          lugar_actividad: lugarActividad,
          horario_actividad: horarioActividad,
          detalles_actividad: detallesActividad,
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
    setNombreActividad("");
    setLugarActividad("");
    setDiaActividad("");
    setHorarioActividad("");
    setDetallesActividad("");
  };

  const handleDelete = async (string) => {
    try {
      await axios.delete(DELACTIVIDAD_URL + string, {
        headers: { "Content-Type": "application/json" },
      });
      setLoadData(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {accion == "RegistrarActividad" && (
        <>
          <div className={style.menu_gestion}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setAccion("Actividades");
                resetData();
              }}
            >
              Actividades registradas
            </button>
          </div>
          <hr />
          {success == false ? (
            <form onSubmit={handleSubmit}>
              <Container>
                <h5>Registro de Actividades</h5>
                <Row>
                  <Col>
                    <label>Actividad</label>
                    <br />
                    <input
                      type="text"
                      value={nombreActividad}
                      onChange={(e) => {
                        setNombreActividad(e.target.value);
                      }}
                    />
                  </Col>
                  <Col>
                    <label>Lugar</label>
                    <br />
                    <input
                      type="text"
                      value={lugarActividad}
                      onChange={(e) => {
                        setLugarActividad(e.target.value);
                      }}
                    />
                  </Col>
                  <Col>
                    <label>Detalles:</label>
                    <br />
                    <input
                      type="text"
                      value={detallesActividad}
                      onChange={(e) => setDetallesActividad(e.target.value)}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Día:</label>
                    <br />
                    <input
                      type="text"
                      value={diaActividad}
                      onChange={(e) => setDiaActividad(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <label>Horario:</label>
                    <br />
                    <input
                      type="text"
                      value={horarioActividad}
                      onChange={(e) => setHorarioActividad(e.target.value)}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <hr />
                <button className="btn btn-success">Cargar actividad</button>
              </Container>
            </form>
          ) : (
            <h5>La actividad se ha cargado exitosamente.</h5>
          )}
        </>
      )}
      {accion == "Actividades" && (
        <>
          <div className={style.menu_gestion}>
            <button
              id={style.bold}
              className="btn btn-success"
              onClick={() => setAccion("RegistrarActividad")}
            >
              + Registrar Actividad
            </button>
          </div>
          <hr />
          {arrayActividades.length == 0 ? (
            <p>No hay actividades cargadas.</p>
          ) : (
            <>
              <Col>
                {arrayActividades.toReversed().map((elemento, index) => {
                  return (
                    <div className={style.actividad_container} key={index}>
                      <h5 id={style.bold}>
                        Actividad {elemento.nombre_actividad}
                      </h5>
                      <div>
                        <div className={style.actionsRow}>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Tipo de actividad</span>
                              <br />
                              {elemento.nombre_actividad}
                            </p>
                          </div>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Lugar</span>
                              <br />
                              {elemento.lugar_actividad}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className={style.actionsRow}>
                            <div className={style.actionsCol}>
                              <p>
                                <span id={style.bold}>Fecha</span>
                                <br />
                                {elemento.dia_actividad}
                              </p>
                            </div>
                            <div className={style.actionsCol}>
                              <p>
                                <span id={style.bold}>Horario</span>
                                <br />
                                {elemento.horario_actividad} hs
                              </p>
                            </div>
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
                          Eliminar actividad
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

export default ActividadExtracurricular;
