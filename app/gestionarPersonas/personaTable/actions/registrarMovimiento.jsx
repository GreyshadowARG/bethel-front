import style from "../../gestionarPersona.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import axios from "../../../../config/axios";

import { useState, useEffect } from "react";

const RegistrarMovimiento = ({ props }) => {
  const [accion, setAccion] = useState("Movimientos");
  const [success, setSuccess] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [tipoEgreso, setTipoEgreso] = useState("");
  const [arrayMovimientos, setArrayMovimientos] = useState([]);
  const [fechaEgresoProv, setFechaEgresoProv] = useState("");
  const [fechaRegresoProv, setFechaRegresoProv] = useState("");
  const [nombreGrupoFam, setNombreGrupoFam] = useState("");
  const [vinculo, setVinculo] = useState("");
  const [datosContacto, setDatosContacto] = useState("");
  const [descripcionVisita, setDescripcionVisita] = useState("");

  // URLS
  const NEWMOVIMIENTO_URL = "api/persona/newMovimiento/" + props;
  const GETMOVIMIENTOS_URL = "api/persona/getAllMovimientos/" + props;
  const DELETEMOVIMIENTO_URL = `api/persona/eliminarMovimiento/${props}/`;

  useEffect(() => {
    const getMovimientos = async () => {
      try {
        const fetchMovimientos = await axios.get(GETMOVIMIENTOS_URL);

        setArrayMovimientos(fetchMovimientos.data);
        console.log(fetchMovimientos.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovimientos();
    setLoadData(false);
  }, [loadData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        NEWMOVIMIENTO_URL,
        JSON.stringify({
          tipo_egreso: tipoEgreso,
          fecha_egreso: fechaEgresoProv,
          fecha_regreso: fechaRegresoProv,
          nombre_persona_a_cargo: nombreGrupoFam,
          vinculo: vinculo,
          datos_contacto: datosContacto,
          descripcion_visita: descripcionVisita,
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
    setTipoEgreso("");
    setFechaEgresoProv("");
    setFechaRegresoProv("");
    setNombreGrupoFam("");
    setVinculo("");
    setDatosContacto("");
    setDescripcionVisita("");
  };

  const handleDelete = async (string) => {
    try {
      await axios.delete(DELETEMOVIMIENTO_URL + string, {
        headers: { "Content-Type": "application/json" },
      });
      setLoadData(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {accion == "RegistrarMovimiento" && (
        <>
          <div className={style.menu_gestion}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setAccion("Movimientos");
                resetData();
              }}
            >
              Movimientos registrados
            </button>
          </div>
          <hr />
          {success == false ? (
            <form onSubmit={handleSubmit}>
              <Container>
                <h5>Registro de movimiento</h5>
                <Row>
                  <Col>
                    <label>Tipo de egreso:</label>
                    <br />
                    <select
                      value={tipoEgreso}
                      onChange={(e) => setTipoEgreso(e.target.value)}
                    >
                      <option value="---">---</option>
                      <option value="Egreso Provisorio">
                        Egreso provisorio
                      </option>
                      <option value="Sin autorización">Sin autorización</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Fecha egreso:</label>
                    <br />
                    <input
                      type="date"
                      value={fechaEgresoProv}
                      onChange={(e) => setFechaEgresoProv(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <label>Fecha regreso:</label>
                    <br />
                    <input
                      type="date"
                      value={fechaRegresoProv}
                      onChange={(e) => setFechaRegresoProv(e.target.value)}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Nombre y Apellido del grupo familiar a cargo:</label>
                    <br />
                    <input
                      type="text"
                      value={nombreGrupoFam}
                      onChange={(e) => {
                        setNombreGrupoFam(e.target.value);
                      }}
                    />
                  </Col>
                  <Col>
                    <label>Vinculo:</label>
                    <br />
                    <input
                      type="text"
                      value={vinculo}
                      onChange={(e) => {
                        setVinculo(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Datos de contacto:</label>
                    <br />
                    <input
                      type="text"
                      value={datosContacto}
                      onChange={(e) => {
                        setDatosContacto(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Descripción de la visita:</label>
                    <br />
                    <textarea
                      className={style.textarea}
                      value={descripcionVisita}
                      onChange={(e) => {
                        setDescripcionVisita(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <hr />
                <button className="btn btn-success">Cargar movimiento</button>
              </Container>
            </form>
          ) : (
            <h5>El movimiento se ha cargado exitosamente.</h5>
          )}
        </>
      )}
      {accion == "Movimientos" && (
        <>
          <div className={style.menu_gestion}>
            <button
              id={style.bold}
              className="btn btn-success"
              onClick={() => setAccion("RegistrarMovimiento")}
            >
              + Registrar movimiento
            </button>
          </div>
          <hr />
          {arrayMovimientos.length == 0 ? (
            <p>No hay movimientos cargados.</p>
          ) : (
            <>
              <Col>
                {arrayMovimientos.toReversed().map((elemento, index) => {
                  return (
                    <div className={style.movimiento_container} key={index}>
                      <h5 id={style.bold}>Registro {elemento.fecha_egreso}</h5>
                      <div>
                        <div className={style.actionsRow}>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Tipo de egreso</span>
                              <br />
                              {elemento.tipo_egreso}
                            </p>
                          </div>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Fecha de egreso</span>
                              <br />
                              {elemento.fecha_egreso}
                            </p>
                          </div>
                          {elemento.fecha_regreso != "" && (
                            <div className={style.actionsCol}>
                              <p>
                                <span id={style.bold}>Fecha de regreso</span>
                                <br />
                                {elemento.fecha_regreso}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className={style.actionsRow}>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Persona a cargo</span>
                              <br />
                              {elemento.nombre_persona_a_cargo}
                            </p>
                          </div>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Vínculo</span>
                              <br />
                              {elemento.vinculo}
                            </p>
                          </div>
                          <div className={style.actionsCol}>
                            <p>
                              <span id={style.bold}>Datos contato</span>
                              <br />
                              {elemento.datos_contacto}
                            </p>
                          </div>
                        </div>
                        <div className={style.actionsRow}>
                          <p id={style.paddingLeft}>
                            <span id={style.bold}>Descripción</span>
                            <br />
                            {elemento.descripcion_visita}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(elemento._id);
                          }}
                        >
                          Eliminar movimiento
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

export default RegistrarMovimiento;
