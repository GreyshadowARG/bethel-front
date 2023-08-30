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
                      <table className={style.table}>
                        <tbody>
                          <tr>
                            <th>Tipo de egreso</th>
                            <th>Fecha Egreso</th>
                            {elemento.fecha_regreso != "" && (
                              <th>Fecha Regreso</th>
                            )}
                          </tr>
                          <tr className={style.tr}>
                            <td className={style.td}>{elemento.tipo_egreso}</td>
                            <td className={style.td}>
                              {elemento.fecha_egreso}
                            </td>
                            {elemento.fecha_regreso != "" && (
                              <td className={style.td}>
                                {elemento.fecha_regreso}
                              </td>
                            )}
                          </tr>
                        </tbody>
                        {(elemento.nombre_persona_a_cargo != "" ||
                          elemento.vinculo != "" ||
                          elemento.datos_contacto != "") && (
                          <>
                            <br />
                            <tbody>
                              <tr>
                                {elemento.nombre_persona_a_cargo != "" && (
                                  <th>Persona a cargo</th>
                                )}
                                {elemento.vinculo != "" && <th>Vínculo</th>}
                                {elemento.datos_contacto != "" && (
                                  <th>Datos contacto</th>
                                )}
                              </tr>
                              <tr className={style.tr}>
                                {elemento.nombre_persona_a_cargo != "" && (
                                  <td className={style.td}>
                                    {elemento.nombre_persona_a_cargo}
                                  </td>
                                )}
                                {elemento.vinculo != "" && (
                                  <td className={style.td}>
                                    {elemento.vinculo}
                                  </td>
                                )}
                                {elemento.datos_contacto != "" && (
                                  <td className={style.td}>
                                    {elemento.datos_contacto}
                                  </td>
                                )}
                              </tr>
                            </tbody>
                            {elemento.descripcion_visita != "" && (
                              <>
                                <br />
                                <tbody>
                                  <tr>
                                    <th>Descripción</th>
                                  </tr>
                                  <tr className={style.tr}>
                                    <td id={style.td_long}>
                                      {elemento.descripcion_visita}
                                    </td>
                                  </tr>
                                </tbody>
                              </>
                            )}
                          </>
                        )}
                      </table>
                      <br />
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
