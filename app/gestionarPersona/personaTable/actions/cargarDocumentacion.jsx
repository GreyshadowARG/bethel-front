import style from "../../gestionarPersona.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import axios from "../../../../config/axios";

import { useState, useEffect } from "react";

const CargarDocumentacion = ({ props }) => {
  const [accion, setAccion] = useState("CargarDocumentacion");
  const [success, setSuccess] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState("");

  // URLS
  const NEWDOCUMENTACION_URL = "api/persona/newDocumentacion/";
  //const GETMOVIMIENTOS_URL = "api/persona/getAllMovimientos/" + props;
  //const DELETEMOVIMIENTO_URL = `api/persona/eliminarMovimiento/${props}/`;

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
      await axios.post(NEWDOCUMENTACION_URL, {
        headers: { "Content-Type": 'multipart/form-data' },
      });
      console.log("algopaso")
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const resetData = () => {
    setLoadData(true);
    setSuccess(false);
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
      {accion == "CargarDocumentacion" && (
        <>
          <div className={style.menu_gestion}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setAccion("DocumentosCargados");
              }}
            >
              Documentos cargados
            </button>
          </div>
          <hr />
          {success == false ? (
            <>
              <form
                onSubmit={handleSubmit}
              >
                <Container>
                  <h5>Carga de archivos</h5>
                  <Row>
                    <Col>
                      <label>
                        Especifique el tipo de documento que va a cargar
                      </label>
                      <br />
                      <select
                        value={tipoDocumento}
                        onChange={(e) => setTipoDocumento(e.target.value)}
                      >
                        <option value="---">---</option>
                        <option value="Documentación Particular">
                          Documentación Particular
                        </option>
                        <option value="Documentación Judicial">
                          Documentación Judicial
                        </option>
                        <option value="Documentación Educacion">
                          Documentación Educacion
                        </option>
                        <option value="Documentación Salud">
                          Documentación Salud
                        </option>
                        <option value="Otros">Otros</option>
                      </select>
                      {tipoDocumento == "Documentación Particular" && (
                        <p>(dni, acta, carnet vacunación, etc)</p>
                      )}
                    </Col>
                  </Row>

                  <br />
                  <Row>
                    <Col>
                      <input type="file" name="upload" multiple />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <button className="btn btn-success">
                        Cargar movimiento
                      </button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </>
          ) : (
            <h5>El documento se ha cargado exitosamente.</h5>
          )}
        </>
      )}
      {accion == "DocumentosCargados" && (
        <>
          <div className={style.menu_gestion}>
            <button
              id={style.bold}
              className="btn btn-success"
              onClick={() => setAccion("CargarDocumentacion")}
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
                    <div key={index}>
                      <h5 id={style.bold}>Registro {elemento.fecha_egreso}</h5>
                      <table className={style.table}>
                        <tbody>
                          <tr>
                            <th>Tipo de egreso</th>
                            <th>Fecha Egreso</th>
                            <th>Fecha Regreso</th>
                            <th>Nombre persona a cargo</th>
                          </tr>
                          <tr className={style.tr}>
                            <td className={style.td}>{elemento.tipo_egreso}</td>
                            <td className={style.td}>
                              {elemento.fecha_egreso}
                            </td>
                            <td className={style.td}>
                              {elemento.fecha_regreso}
                            </td>
                            <td className={style.td}>
                              {elemento.nombre_persona_a_cargo}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {elemento.descripcion_visita != "" && (
                        <table>
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
                        </table>
                      )}
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
                      <hr />
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

export default CargarDocumentacion;
