import style from "../gestionarPersona.module.css";
import { useState, useEffect } from "react";
import axios from "../../../config/axios";

// edits
import DatosPersonales from "./edits/pasiva/datosPersonales";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const GestionPasiva = ({ props }) => {
  const [loadData, setLoadData] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const [persona, setPersona] = useState([]);

  const getLoadData = (state) => {
    setLoadData(state);
  };

  //URL
  const GETPASIVABYID_URL = "api/pasividad/getPasivaById/" + props;
  const DELETEPASIVABYID_URL = "api/pasividad/deletePasivaById/" + props;

  useEffect(() => {
    const getPersona = async () => {
      const fetchPersona = await axios.get(GETPASIVABYID_URL);

      setPersona(fetchPersona.data);
    };
    setLoadData(false);

    getPersona();
  }, [loadData]);

  const handleEliminar = async () => {
    try {
      await axios.delete(DELETEPASIVABYID_URL);
      setDeleteState(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row className={style.menu_gestion}>
          <Col>
            <h2>{persona.nombre}</h2>
          </Col>
        </Row>
        {deleteState === false && (
          <div className={style.menu_gestion}>
            <button
              className="btn btn-warning"
              onClick={() => handleEliminar(props)}
            >
              Eliminar del registro
            </button>
          </div>
        )}
        <hr />
        {deleteState === false ? (
          <>
            <Row>
              <h5>DATOS PERSONALES</h5>
            </Row>
            <Row>
              <DatosPersonales persona={persona} />
            </Row>
          </>
        ) : (
          <p>Se ha eliminado a esta persona del registro completamente.</p>
        )}
      </Container>
    </>
  );
};

export default GestionPasiva;
