import style from "../gestionarPersona.module.css";
import { useState, useEffect } from "react";
import axios from "../../../config/axios";

// actions
import RegistrarMovimiento from "./actions/registrarMovimiento";
import RegistrarTratamiento from "./actions/registrarTratamiento";
import CargarDocumentacion from "./actions/cargarDocumentacion";
import ActividadExtracurricular from "./actions/actividadExtracurricular";
import CargarTurno from "./actions/cargarTurno";

// edits
import DatosPersonales from "./edits/datosPersonales";
import ObraSocial from "./edits/obraSocial";
import Ingreso from "./edits/ingreso";
import Escolaridad from "./edits/escolaridad";
import Discapacidad from "./edits/discapacidad";
import Familiares from "./edits/familiares";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const GestionPersona = ({ props }) => {
  const [accion, setAccion] = useState("");
  const [loadData, setLoadData] = useState(false);

  const [persona, setPersona] = useState([]);
  const [datosMadre, setDatosMadre] = useState([]);
  const [datosPadre, setDatosPadre] = useState([]);
  const [datosReferente, setDatosReferente] = useState([]);

  const getLoadData = (state) => {
    setLoadData(state);
  };

  //URL
  const GETPERSONABYID_URL = "api/persona/getPersonaById/" + props;

  useEffect(() => {
    const getPersona = async () => {
      const fetchPersona = await axios.get(GETPERSONABYID_URL);

      setPersona(fetchPersona.data);
      setDatosMadre(fetchPersona.data.datos_madre_biologica);
      setDatosPadre(fetchPersona.data.datos_padre_biologico);
      setDatosReferente(fetchPersona.data.datos_referente_significativo);
    };
    setLoadData(false);

    getPersona();
  }, [loadData]);

  return (
    <>
      <Container>
        <Row className={style.menu_gestion}>
          <Col>
            <h2>
              {persona.nombre} {persona.apellido}
            </h2>
          </Col>
        </Row>
        {accion != "" && (
          <>
            <Row>
              <Col>
                <button
                  className="btn btn-secondary"
                  onClick={() => setAccion("")}
                >
                  Datos principales
                </button>
              </Col>
            </Row>
            <br />
          </>
        )}
        {accion === "CargarDocumentacion" && (
          <CargarDocumentacion props={persona._id} />
        )}
        {accion === "ActividadExtracurricular" && (
          <ActividadExtracurricular props={persona._id} />
        )}
        {accion === "RegistrarMovimiento" && (
          <RegistrarMovimiento props={persona._id} />
        )}
        {accion === "RegistrarTratamiento" && (
          <RegistrarTratamiento props={persona._id} />
        )}
        {accion === "CargarTurno" && <CargarTurno props={persona} />}

        {accion === "" && (
          <>
            <div className={style.menu_gestion}>
              <button
                className="btn btn-info"
                onClick={() => setAccion("CargarDocumentacion")}
              >
                Cargar Documentación
              </button>
            </div>
            <br />
            <div className={style.menu_gestion}>
              <button
                className="btn btn-primary"
                onClick={() => setAccion("RegistrarMovimiento")}
              >
                Movimientos
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setAccion("RegistrarTratamiento")}
              >
                Tratamientos
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setAccion("ActividadExtracurricular")}
              >
                Actividad Extracurricular
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setAccion("CargarTurno")}
              >
                Turnos
              </button>
            </div>
            <hr />
            <Row>
              <h5>DATOS PERSONALES</h5>
            </Row>
            <Row>
              <DatosPersonales persona={persona} getLoadData={getLoadData} />
            </Row>
            <hr />
            <Row>
              <h5>OBRA SOCIAL</h5>
            </Row>
            <Row>
              <ObraSocial persona={persona} getLoadData={getLoadData} />
            </Row>
            <hr />
            <Row>
              <h5>INGRESO</h5>
            </Row>
            <Row>
              <Ingreso persona={persona} getLoadData={getLoadData} />
            </Row>
            <hr />
            <Row>
              <h5>ESCOLARIDAD</h5>
            </Row>
            <Row>
              <Escolaridad getLoadData={getLoadData} persona={persona} />
            </Row>
            <hr />
            <Row>
              <h5>DISCAPACIDAD</h5>
            </Row>
            <Row>
              <Discapacidad getLoadData={getLoadData} persona={persona} />
            </Row>
            <hr />
            <Row>
              <h5>FAMILIARES</h5>
            </Row>
            <Row>
              <Familiares
                personaId={persona._id}
                datosPadre={datosPadre}
                datosMadre={datosMadre}
                datosReferente={datosReferente}
                getLoadData={getLoadData}
              />
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default GestionPersona;
