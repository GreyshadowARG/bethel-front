import style from "../../gestionarPersona.module.css";

import { useState } from "react";

import axios from "../../../../config/axios";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Familiares = ({
  personaId,
  datosPadre,
  datosMadre,
  datosReferente,
  getLoadData,
}) => {
  const [edit, setEdit] = useState("");

  const [nombreMadre, setNombreMadre] = useState("");
  const [viveMadre, setViveMadre] = useState("");
  const [dniMadre, setDniMadre] = useState("");
  const [domicilioMadre, setDomicilioMadre] = useState("");
  const [telMadre, setTelMadre] = useState("");
  const [nombrePadre, setNombrePadre] = useState("");
  const [vivePadre, setVivePadre] = useState("");
  const [dniPadre, setDniPadre] = useState("");
  const [domicilioPadre, setDomicilioPadre] = useState("");
  const [telPadre, setTelPadre] = useState("");
  const [nombreReferente, setNombreReferente] = useState("");
  const [viveReferente, setViveReferente] = useState("");
  const [descripcionReferente, setDescripcionReferente] = useState("");
  const [dniReferente, setDniReferente] = useState("");
  const [domicilioReferente, setDomicilioReferente] = useState("");
  const [telReferente, setTelReferente] = useState("");

  // URLs
  const EDITFAMILIARES_URL = "api/persona/editFamiliares/" + personaId;

  const setData = () => {
    setNombreMadre(datosMadre.nombre_madre);
    setViveMadre(datosMadre.vive_madre);
    setDniMadre(datosMadre.dni_madre);
    setDomicilioMadre(datosMadre.domicilio_madre);
    setTelMadre(datosMadre.telefono_madre);
    setNombrePadre(datosPadre.nombre_padre);
    setVivePadre(datosPadre.vive_padre);
    setDniPadre(datosPadre.dni_padre);
    setDomicilioPadre(datosPadre.domicilio_padre);
    setTelPadre(datosPadre.telefono_padre);
    setNombreReferente(datosReferente.nombre_referente);
    setDescripcionReferente(datosReferente.descripcion_referente);
    setViveReferente(datosReferente.vive_referente);
    setDniReferente(datosReferente.dni_referente);
    setDomicilioReferente(datosReferente.domicilio_referente);
    setTelReferente(datosReferente.telefono_referente);
  };

  const editFamiliares = async (req, res, next) => {
    try {
      await axios.post(
        EDITFAMILIARES_URL,
        JSON.stringify({
          nombre_madre: nombreMadre,
          vive_madre: viveMadre,
          dni_madre: dniMadre,
          domicilio_madre: domicilioMadre,
          telefono_madre: telMadre,
          nombre_padre: nombrePadre,
          vive_padre: vivePadre,
          dni_padre: dniPadre,
          domicilio_padre: domicilioPadre,
          telefono_padre: telPadre,
          nombre_referente: nombreReferente,
          descripcion_referente: descripcionReferente,
          vive_referente: viveReferente,
          dni_referente: dniReferente,
          domicilio_referente: domicilioReferente,
          telefono_referente: telReferente,
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
      <Row>
        <div className={style.menu_gestion}>
          {edit == "EditarFamiliares" ? (
            <button
              className={style.save_button}
              onClick={() => {
                editFamiliares();
                setEdit("GuardarFamiliares");
              }}
            >
              Guardar
            </button>
          ) : (
            <button
              className={style.edit_button}
              onClick={() => {
                setData();
                setEdit("EditarFamiliares");
              }}
            >
              Editar
            </button>
          )}
        </div>
      </Row>
      <h5>Padre biológico</h5>
      <Row>
        <Col id={style.bold}>Nombre</Col>
        <Col id={style.bold}>¿Vive?</Col>
        <Col id={style.bold}>DNI</Col>
      </Row>
      {edit != "EditarFamiliares" && (
        <Row>
          <Col>{datosPadre.nombre_padre}</Col>
          <Col>{datosPadre.vive_padre}</Col>
          <Col>{datosPadre.dni_padre}</Col>
        </Row>
      )}
      {edit == "EditarFamiliares" && (
        <>
          <Row>
            <Col>
              <input
                type="text"
                defaultValue={nombrePadre}
                onChange={(e) => {
                  setNombrePadre(e.target.value);
                }}
              />
            </Col>
            <Col>
              <select
                defaultValue={vivePadre}
                onChange={(e) => {
                  setVivePadre(e.target.value);
                }}
              >
                <option value="">---</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </Col>
            <Col>
              <input
                type="text"
                defaultValue={dniPadre}
                onChange={(e) => {
                  setDniPadre(e.target.value);
                }}
              />
            </Col>
          </Row>
        </>
      )}
      <br />
      <br />
      <Row>
        <Col id={style.bold}>Domicilio</Col>
        <Col id={style.bold}>Telefono</Col>
        <Col></Col>
      </Row>
      {edit != "EditarFamiliares" && (
        <Row>
          <Col>{datosPadre.domicilio_padre}</Col>
          <Col>{datosPadre.telefono_padre}</Col>
          <Col></Col>
        </Row>
      )}
      {edit == "EditarFamiliares" && (
        <Row>
          <Col>
            <input
              type="text"
              defaultValue={domicilioPadre}
              onChange={(e) => {
                setDomicilioPadre(e.target.value);
              }}
            />
          </Col>
          <Col>
            <input
              type="text"
              defaultValue={telPadre}
              onChange={(e) => {
                setTelPadre(e.target.value);
              }}
            />
          </Col>
          <Col></Col>
        </Row>
      )}
      <br />
      <br />
      <br />
      <h5>Madre biológica</h5>
      <Row>
        <Col id={style.bold}>Nombre</Col>
        <Col id={style.bold}>¿Vive?</Col>
        <Col id={style.bold}>DNI</Col>
      </Row>
      {edit != "EditarFamiliares" && (
        <Row>
          <Col>{datosMadre.nombre_madre}</Col>
          <Col>{datosMadre.vive_madre}</Col>
          <Col>{datosMadre.dni_madre}</Col>
        </Row>
      )}
      {edit == "EditarFamiliares" && (
        <Row>
          <Col>
            <input
              type="text"
              defaultValue={nombreMadre}
              onChange={(e) => {
                setNombreMadre(e.target.value);
              }}
            />
          </Col>
          <Col>
            <select
              defaultValue={viveMadre}
              onChange={(e) => {
                setViveMadre(e.target.value);
              }}
            >
              <option value="">---</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </Col>
          <Col>
            <input
              type="text"
              defaultValue={dniMadre}
              onChange={(e) => {
                setDniMadre(e.target.value);
              }}
            />
          </Col>
        </Row>
      )}
      <br />
      <br />
      <Row>
        <Col id={style.bold}>Domicilio</Col>
        <Col id={style.bold}>Telefono</Col>
        <Col></Col>
      </Row>
      {edit != "EditarFamiliares" && (
        <Row>
          <Col>{datosMadre.domicilio_madre}</Col>
          <Col>{datosMadre.telefono_madre}</Col>
          <Col></Col>
        </Row>
      )}
      {edit == "EditarFamiliares" && (
        <Row>
          <Col>
            <input
              type="text"
              defaultValue={domicilioMadre}
              onChange={(e) => {
                setDomicilioMadre(e.target.value);
              }}
            />
          </Col>
          <Col>
            <input
              type="text"
              defaultValue={telMadre}
              onChange={(e) => {
                setTelMadre(e.target.value);
              }}
            />
          </Col>
          <Col></Col>
        </Row>
      )}
      <br />
      <br />
      <br />
      <h5>Referente significativo</h5>
      <Row>
        <Col id={style.bold}>Nombre</Col>
        <Col id={style.bold}>¿Vive?</Col>
        <Col id={style.bold}>DNI</Col>
      </Row>
      {edit != "EditarFamiliares" && (
        <Row>
          <Col>{datosReferente.nombre_referente}</Col>
          <Col>{datosReferente.vive_referente}</Col>
          <Col>{datosReferente.dni_referente}</Col>
        </Row>
      )}
      {edit == "EditarFamiliares" && (
        <Row>
          <Col>
            <input
              type="text"
              defaultValue={nombreReferente}
              onChange={(e) => {
                setNombreReferente(e.target.value);
              }}
            />
          </Col>
          <Col>
            <select
              defaultValue={viveReferente}
              onChange={(e) => {
                setViveReferente(e.target.value);
              }}
            >
              <option value="">---</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </Col>
          <Col>
            <input
              type="text"
              defaultValue={dniReferente}
              onChange={(e) => {
                setDniReferente(e.target.value);
              }}
            />
          </Col>
        </Row>
      )}
      <br/>
      <br/>
      <Row>
        <Col id={style.bold}>Domicilio</Col>
        <Col id={style.bold}>Telefono</Col>
        <Col></Col>
      </Row>
      {edit != "EditarFamiliares" && (
        <Row>
          <Col>{datosReferente.domicilio_referente}</Col>
          <Col>{datosReferente.telefono_referente}</Col>
          <Col></Col>
        </Row>
      )}
      {edit == "EditarFamiliares" && (
        <Row>
          <Col>
            <input
              type="text"
              defaultValue={domicilioReferente}
              onChange={(e) => {
                setDomicilioReferente(e.target.value);
              }}
            />
          </Col>
          <Col>
            <input
              type="text"
              defaultValue={telReferente}
              onChange={(e) => {
                setTelReferente(e.target.value);
              }}
            />
          </Col>
          <Col></Col>
        </Row>
      )}
      <br />
      <br />
      <Row>
        <Col id={style.bold}>Descripción</Col>
      </Row>
      {edit != "EditarFamiliares" && (
        <Row>
          <Col className={style.inputDescription}>{datosReferente.descripcion_referente}</Col>
        </Row>
      )}
      {edit == "EditarFamiliares" && (
        <Row>
          <Col>
            <input
              type="text"
              className={style.inputDescription}
              defaultValue={descripcionReferente}
              onChange={(e) => {
                setDescripcionReferente(e.target.value);
              }}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Familiares;
