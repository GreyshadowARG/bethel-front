"use client";

import style from "./cargarPersona.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { useState } from "react";
import axios from "../../config/axios";

import styles from "./cargarPersona.module.css";

// URLs
const NEWPERSONA_URL = "api/persona/newPersona";

export default function CargarPersonas() {
  //datos personales
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [sexo, setSexo] = useState("");
  const [dni, setDni] = useState("");
  const [casa, setCasa] = useState("");
  const [peso, setPeso] = useState("");
  const [talle, setTalle] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("");
  const [tieneObraSocial, setTieneObraSocial] = useState("");
  const [obraSocial, setObraSocial] = useState("");
  const [nombreObraSocial, setNombreObraSocial] = useState("");
  const [numeroAfiliado, setNumeroAfiliado] = useState("");
  const [codigoAfiliado, setCodigoAfiliado] = useState("");
  // datos ingreso
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [documentacionIngreso, setDocumentacionIngreso] = useState("");
  const [otraDocumentacionIngreso, setOtraDocumentacionIngreso] = useState("");
  const [areaPideIngreso, setAreaPideIngreso] = useState("");

  const [areaPideIngresoDetalles, setAreaPideIngresoDetalles] = useState("");
  const [condicionSenaf, setCondicionSenaf] = useState("");
  const [condicionSenafOtro, setCondicionSenafOtro] = useState("");
  const [motivoIngreso, setMotivoIngreso] = useState("");
  const [otraAreaIngreso, setOtraAreaIngreso] = useState("");
  // datos escolaridad
  const [concurreInstitucionEducativa, setConcurreInstitucionEducativa] =
    useState("");
  const [maestraIntegradora, setMaestraIntegradora] = useState("");
  const [nombreMaestraIntegradora, setNombreMaestraIntegradora] = useState("");
  const [telMaestraIntegradora, setTelMaestraIntegradora] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [nivelEscolar, setNivelEscolar] = useState("");
  const [nivelEducativo, setNivelEducativo] = useState("");
  const [ultimoNivelEducativo, setUltimoNivelEducativo] = useState("");
  const [nombreEstablecimientoEducativo, setNombreEstablecimientoEducativo] =
    useState("");
  const [
    domicilioEstablecimientoEducativo,
    setDomicilioEstablecimientoEducativo,
  ] = useState("");
  const [
    telefonoEstablecimientoEducativo,
    setTelefonoEstablecimientoEducativo,
  ] = useState("");
  // datos sobre discapacidad
  const [tieneDiscapacidad, setTieneDiscapacidad] = useState("");
  const [certificadoDiscapacidad, setCertificadoDiscapacidad] = useState("");
  const [prestacionesCertificado, setPrestacionesCertificado] = useState("");
  const [tipoDiscapacidad, setTipoDiscapacidad] = useState("");
  const [fechaEmisionCertificado, setFechaEmisionCertificado] = useState("");
  const [fechaVencimientoCertificado, setFechaVencimientoCertificado] =
    useState("");
  const [curatela, setCuratela] = useState("");
  const [recibePension, setRecibePension] = useState("");
  const [acompanamientoTerapeutico, setAcompanamientoTerapeutico] =
    useState("");
  const [nombreAcompTerapeutico, setNombreAcompTerapeutico] = useState("");
  const [diaAtencionAcomTer, setDiaAtencionAcomTer] = useState("");
  const [horarioAtencionAcomTer, setHorarioAtencionAcomTer] = useState("");
  // Tratamientos
  const [tratamientoRecibe, setTratamientoRecibe] = useState("Ninguno");
  const [otroTratamientoRecibe, setOtroTratamientoRecibe] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinalizacion, setFechaFinalizacion] = useState("");
  const [nombreProfesional, setNombreProfesional] = useState("");
  const [diaTratamiento, setDiaTratamiento] = useState("");
  const [horaTratamiento, setHoraTratamiento] = useState("");
  const [tratMedEsp, setTratMedEsp] = useState("");
  const [tratamientoMedEspecial, setTratamientoMedEspecial] = useState("");
  // Datos padre
  const [nombrePadre, setNombrePadre] = useState("");
  const [dniPadre, setDniPadre] = useState("");
  const [vivePadre, setVivePadre] = useState("");
  const [domicilioPadre, setDomicilioPadre] = useState("");
  const [telPadre, setTelPadre] = useState("");
  // Datos madre
  const [nombreMadre, setNombreMadre] = useState("");
  const [dniMadre, setDniMadre] = useState("");
  const [viveMadre, setViveMadre] = useState("");
  const [domicilioMadre, setDomicilioMadre] = useState("");
  const [telMadre, setTelMadre] = useState("");
  // Datos Referente significativo
  const [nombreReferente, setNombreReferente] = useState("");
  const [viveReferente, setViveReferente] = useState("");
  const [descripcionReferente, setDescripcionReferente] = useState("");
  const [dniReferente, setDniReferente] = useState("");
  const [domicilioReferente, setDomicilioReferente] = useState("");
  const [telReferente, setTelReferente] = useState("");
  // Trabajo social
  const [situacionFamiliar, setSituacionFamiliar] = useState("");
  const [recibeVisitas, setRecibeVisitas] = useState("");
  const [tipoVinculoSelect, setTipoVinculoSelect] = useState("");
  const [tipoVinculo, setTipoVinculo] = useState("");
  const [nombreVinculoVisita, setNombreVinculoVisita] = useState("");
  const [frecuenciaVisita, setFrecuenciaVisita] = useState("");
  const [procesoRevinculacion, setProcesoRevinculacion] = useState("");
  const [success, setSuccess] = useState(false);

  const resetInputs = () => {
    setNombre("");
    setApellido("");
    setSexo("");
    setDni("");
    setCasa("");
    setPeso("");
    setTalle("");
    setFechaNacimiento("");
    setEdad("");
    setTieneObraSocial("");
    setObraSocial("");
    setNombreObraSocial("");
    setNumeroAfiliado("");
    setCodigoAfiliado("");
    setFechaIngreso("");
    setDocumentacionIngreso("");
    setOtraDocumentacionIngreso("");
    setAreaPideIngreso("");
    setAreaPideIngresoDetalles("");
    setCondicionSenaf("");
    setCondicionSenafOtro("");
    setMotivoIngreso("");
    setOtraAreaIngreso("");
    setConcurreInstitucionEducativa("");
    setModalidad("");
    setMaestraIntegradora("");
    setNombreMaestraIntegradora("");
    setTelMaestraIntegradora("");
    setNivelEscolar("");
    setNivelEducativo("");
    setUltimoNivelEducativo("");
    setNombreEstablecimientoEducativo("");
    setDomicilioEstablecimientoEducativo("");
    setTelefonoEstablecimientoEducativo("");
    setTieneDiscapacidad("");
    setTipoDiscapacidad("");
    setCertificadoDiscapacidad("");
    setPrestacionesCertificado("");
    setFechaEmisionCertificado("");
    setFechaVencimientoCertificado("");
    setCuratela("");
    setRecibePension("");
    setAcompanamientoTerapeutico("");
    setNombreAcompTerapeutico("");
    setDiaAtencionAcomTer("");
    setHorarioAtencionAcomTer("");
    setTratamientoRecibe("Ninguno");
    setOtroTratamientoRecibe("");
    setFechaInicio("");
    setFechaFinalizacion("");
    setNombreProfesional("");
    setDiaTratamiento("");
    setHoraTratamiento("");
    setTratMedEsp("");
    setTratamientoMedEspecial("");
    setNombrePadre("");
    setVivePadre("");
    setDniPadre("");
    setDomicilioPadre("");
    setTelPadre("");
    setNombreMadre("");
    setViveMadre("");
    setDniMadre("");
    setDomicilioMadre("");
    setTelMadre("");
    setNombreReferente("");
    setDescripcionReferente("");
    setViveReferente("");
    setDniReferente("");
    setDomicilioReferente("");
    setTelReferente("");
    setSituacionFamiliar("");
    setRecibeVisitas("");
    setTipoVinculoSelect("");
    setTipoVinculo("");
    setNombreVinculoVisita("");
    setFrecuenciaVisita("");
    setProcesoRevinculacion("");
    setSuccess(false);
  };

  const handleFechaNacimiento = (e) => {
    let fecha = new Date(e.target.value);
    let month_diff = Date.now() - fecha.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);
    console.log(age);
    setFechaNacimiento();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        NEWPERSONA_URL,
        JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          sexo: sexo,
          dni: dni,
          casa: casa,
          peso: peso,
          talle: talle,
          fecha_nacimiento: fechaNacimiento,
          edad: edad,
          obra_social: obraSocial,
          nombre_obra_social: nombreObraSocial,
          numero_afiliado: numeroAfiliado,
          codigo_afiliado: codigoAfiliado,
          fecha_ingreso: fechaIngreso,
          documentacion_ingreso:
            documentacionIngreso == "Otro"
              ? otraDocumentacionIngreso
              : documentacionIngreso,
          area_pide_ingreso:
            areaPideIngreso == "Otro" ? otraAreaIngreso : areaPideIngreso,
          detalle_area:
            areaPideIngreso != "Otro" || areaPideIngreso != "SENAF"
              ? areaPideIngresoDetalles
              : "",
          condicion:
            condicionSenaf == "Otro" ? setCondicionSenafOtro : condicionSenaf,
          motivo_ingreso: motivoIngreso,
          concurre_institucion_educativa: concurreInstitucionEducativa,
          maestra_integradora: maestraIntegradora,
          nombre_maestra_integradora: nombreMaestraIntegradora,
          telefono_maestra_integradora: telMaestraIntegradora,
          modalidad: modalidad,
          ultimo_nivel_escolar: ultimoNivelEducativo,
          nivel_escolar: nivelEscolar,
          nivel_educativo: nivelEducativo,
          nombre_establecimiento_educativo: nombreEstablecimientoEducativo,
          domicilio_establecimiento_educativo:
            domicilioEstablecimientoEducativo,
          telefono_establecimiento_educativo: telefonoEstablecimientoEducativo,
          tiene_discapacidad: tieneDiscapacidad,
          tipo_discapacidad: tipoDiscapacidad,
          certificado_discapacidad: certificadoDiscapacidad,
          prestaciones_certificado: prestacionesCertificado,
          fecha_emision_certificado: fechaEmisionCertificado,
          fecha_vencimiento_certificado: fechaVencimientoCertificado,
          curatela: curatela,
          recibe_pension: recibePension,
          acompanamiento_terapeutico: acompanamientoTerapeutico,
          nombre_profesional_at: nombreAcompTerapeutico,
          dia_atencion_at: diaAtencionAcomTer,
          horario_atencion_at: horarioAtencionAcomTer,
          recibe_tratamiento:
            tratamientoRecibe == "Otro"
              ? otroTratamientoRecibe
              : tratamientoRecibe,
          fecha_inicio: fechaInicio,
          fecha_finalizacion: fechaFinalizacion,
          profesional_tratamiento: nombreProfesional,
          dia_tratamiento: diaTratamiento,
          hora_tratamiento: horaTratamiento,
          tratamiento_especial: tratamientoMedEspecial,
          nombre_padre: nombrePadre,
          vive_padre: vivePadre,
          dni_padre: dniPadre,
          domicilio_padre: domicilioPadre,
          tel_padre: telPadre,
          nombre_madre: nombreMadre,
          vive_madre: viveMadre,
          dni_madre: dniMadre,
          domicilio_madre: domicilioMadre,
          tel_madre: telMadre,
          nombre_referente: nombreReferente,
          vive_referente: viveReferente,
          descripcion_referente: descripcionReferente,
          dni_referente: dniReferente,
          domicilio_referente: domicilioReferente,
          tel_referente: telReferente,
          situacion_familiar_en_institucion: situacionFamiliar,
          recibe_visitas: recibeVisitas,
          tipo_vinculo: tipoVinculo == "Otro" ? tipoVinculo : tipoVinculoSelect,
          nombre_viculo: nombreVinculoVisita,
          frecuencia_visita: frecuenciaVisita,
          proceso_revinculacion: procesoRevinculacion,
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

  return (
    <section>
      {success ? (
        <div className={styles.newPersona_success}>
          <h5>
            Se ha ingresado un nuevo registro bajo el nombre {nombre} {apellido}
            .
          </h5>
          <br />
          <br />
          <button className="btn btn-success" onClick={resetInputs}>
            Cargar nueva persona
          </button>
        </div>
      ) : (
        <>
          <h2 id={style.bold}>NUEVO INRESO</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <h5>Datos Personales</h5>
                <Col>
                  <label>Nombre:</label>
                  <br />
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Apellido:</label>
                  <br />
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => {
                      setApellido(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Sexo:</label>
                  <br />
                  <select
                    value={sexo}
                    onChange={(e) => {
                      setSexo(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <label>Dni:</label>
                  <br />
                  <input
                    type="text"
                    value={dni}
                    onChange={(e) => {
                      setDni(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Casa:</label>
                  <br />
                  <select
                    value={casa}
                    onChange={(e) => {
                      setCasa(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="Casa 2">Casa 2</option>
                    <option value="Casa 5">Casa 5</option>
                    <option value="Casa 6">Casa 6</option>
                    <option value="Casa 8">Casa 8</option>
                    <option value="Casa 9">Casa 9 (Ascochinga)</option>
                    <option value="Casa 14">Casa 14</option>
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <label>Peso:</label>
                  <br />
                  <input
                    type="text"
                    value={peso}
                    onChange={(e) => {
                      setPeso(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Talle(altura en cm):</label>
                  <br />
                  <input
                    type="text"
                    value={talle}
                    onChange={(e) => {
                      setTalle(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <label>Fecha de nacimiento:</label>
                  <br />
                  <input
                    type="date"
                    value={fechaNacimiento}
                    onChange={(e) => {
                      let fecha = new Date(e.target.value);
                      let month_diff = Date.now() - fecha.getTime();
                      let age_dt = new Date(month_diff);
                      let year = age_dt.getUTCFullYear();
                      let age = Math.abs(year - 1970);
                      setEdad(age)
                      setFechaNacimiento(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Edad:</label>
                  <br />
                  <input
                    type="text"
                    value={edad}
                    onChange={(e) => {
                      setEdad(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <label>¿Tiene obra social?</label>
                  <br />
                  <select
                    value={tieneObraSocial}
                    onChange={(e) => {
                      setTieneObraSocial(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </Col>
                {tieneObraSocial === "Si" && (
                  <Col>
                    <label>Prestadora</label>
                    <br />
                    <select
                      value={obraSocial}
                      onChange={(e) => {
                        setObraSocial(e.target.value);
                      }}
                    >
                      <option value="">---</option>
                      <option value="APROSS">APROSS</option>
                      <option value="PROSAD">PROSAD</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </Col>
                )}
              </Row>
              {obraSocial === "APROSS" && tieneObraSocial == "Si" && (
                <>
                  <br />
                  <Row>
                    <Col>
                      <label>Número de APROSS:</label>
                      <br />
                      <input
                        type="text"
                        value={numeroAfiliado}
                        onChange={(e) => {
                          setNumeroAfiliado(e.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <label>Código de APROSS:</label>
                      <br />
                      <input
                        type="text"
                        value={codigoAfiliado}
                        onChange={(e) => {
                          setCodigoAfiliado(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {obraSocial === "PROSAD" && tieneObraSocial == "Si" && (
                <>
                  <br />
                  <Row>
                    <Col>
                      <label>Número de Afiliado:</label>
                      <br />
                      <input
                        type="text"
                        value={numeroAfiliado}
                        onChange={(e) => {
                          setNumeroAfiliado(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {obraSocial === "Otro" && tieneObraSocial == "Si" && (
                <>
                  <br />
                  <Row>
                    <Col>
                      <label>Nombre de prestadora:</label>
                      <br />
                      <input
                        type="text"
                        value={nombreObraSocial}
                        onChange={(e) => {
                          setNombreObraSocial(e.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <label>Número de afiliado:</label>
                      <br />
                      <input
                        type="text"
                        value={numeroAfiliado}
                        onChange={(e) => {
                          setNumeroAfiliado(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </>
              )}
              <hr />
              <Row>
                <h5>Datos del ingreso</h5>
                <Col>
                  <label>Fecha de ingreso:</label>
                  <br />
                  <input
                    type="date"
                    value={fechaIngreso}
                    onChange={(e) => setFechaIngreso(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Documentacion de ingreso:</label>
                  <br />
                  <select
                    value={documentacionIngreso}
                    onChange={(e) => {
                      setDocumentacionIngreso(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="DNI">DNI</option>
                    <option value="Informe médico">Informe médico</option>
                    <option value="Carnet vacunación">Carnet vacunación</option>
                    <option value="Partida nacimiento">
                      Partida nacimiento
                    </option>
                    <option value="Otros">Otros</option>
                  </select>
                  {documentacionIngreso == "Otros" && (
                    <>
                      <br />
                      <input
                        type="text"
                        value={otraDocumentacionIngreso}
                        onChange={(e) =>
                          setOtraDocumentacionIngreso(e.target.value)
                        }
                      />
                    </>
                  )}
                </Col>
                <Col>
                  <label>Area que pide el ingreso:</label>
                  <br />
                  <select
                    value={areaPideIngreso}
                    onChange={(e) => {
                      setAreaPideIngreso(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="SENAF">SENAF</option>
                    <option value="UDER">UDER</option>
                    <option value="Juzgado">Juzgado</option>
                    <option value="Otro">Otro</option>
                  </select>
                </Col>
              </Row>
              {areaPideIngreso === "SENAF" && (
                <>
                  <br />
                  <Row>
                    <Col>
                      <label>Condición:</label>
                      <br />
                      <select
                        value={condicionSenaf}
                        onChange={(e) => {
                          setCondicionSenaf(e.target.value);
                        }}
                      >
                        <option value="">---</option>
                        <option value="Medida vigente">Medida vigente</option>
                        <option value="Pedido de cese">Pedido de cese</option>
                        <option value="Cese de medida">Cese de medida</option>
                        <option value="Ratificación de cese de medida">
                          Ratificación de cese de medida
                        </option>
                        <option value="Adoptabilidad">Adoptabilidad</option>
                        <option value="Otro">Otro</option>
                      </select>
                      {condicionSenaf == "Otro" && (
                        <>
                          <br />
                          <input
                            type="text"
                            value={condicionSenafOtro}
                            onChange={(e) =>
                              setCondicionSenafOtro(e.target.value)
                            }
                          />
                        </>
                      )}
                    </Col>
                    <Col>
                      <label>Motivo de ingreso:</label>
                      <br />
                      <input
                        type="text"
                        value={motivoIngreso}
                        onChange={(e) => setMotivoIngreso(e.target.value)}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {areaPideIngreso === "UDER" && (
                <>
                  <br />
                  <Row>
                    <Col>
                      <label>Nombre dependencia UDER:</label>
                      <br />
                      <input
                        type="text"
                        value={areaPideIngresoDetalles}
                        onChange={(e) =>
                          setAreaPideIngresoDetalles(e.target.value)
                        }
                      />
                    </Col>
                    <Col>
                      <label>Motivo de ingreso:</label>
                      <br />
                      <input
                        type="text"
                        value={motivoIngreso}
                        onChange={(e) => setMotivoIngreso(e.target.value)}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {areaPideIngreso === "Juzgado" && (
                <>
                  <br />
                  <Row>
                    <Col>
                      <label>Juzgado:</label>
                      <br />
                      <input
                        type="text"
                        value={areaPideIngresoDetalles}
                        onChange={(e) =>
                          setAreaPideIngresoDetalles(e.target.value)
                        }
                      />
                    </Col>
                    <Col>
                      <label>Motivo de ingreso:</label>
                      <br />
                      <input
                        type="text"
                        value={motivoIngreso}
                        onChange={(e) => setMotivoIngreso(e.target.value)}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {areaPideIngreso === "Otro" && (
                <>
                  <br />
                  <Row>
                    <Col>
                      <label>¿Cual?:</label>
                      <br />
                      <input
                        type="text"
                        value={otraAreaIngreso}
                        onChange={(e) => setOtraAreaIngreso(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <label>Motivo de ingreso:</label>
                      <br />
                      <input
                        type="text"
                        value={motivoIngreso}
                        onChange={(e) => setMotivoIngreso(e.target.value)}
                      />
                    </Col>
                  </Row>
                </>
              )}
              <hr />
              <Row>
                <h5>Datos sobre Escolaridad</h5>
                <Col>
                  <label>¿Concurre a Institución educativa?:</label>
                  <br />
                  <select
                    value={concurreInstitucionEducativa}
                    onChange={(e) => {
                      setConcurreInstitucionEducativa(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </Col>
                {concurreInstitucionEducativa === "No" && (
                  <>
                    <br />
                    <Col>
                      <label>Modalidad:</label>
                      <br />
                      <select
                        value={modalidad}
                        onChange={(e) => {
                          setModalidad(e.target.value);
                        }}
                      >
                        <option value="">---</option>
                        <option value="Escuela común">Escuela común</option>
                        <option value="Escuela especial">
                          Escuela especial
                        </option>
                      </select>
                    </Col>
                  </>
                )}

                {concurreInstitucionEducativa === "Si" && (
                  <Col>
                    <label>Modalidad:</label>
                    <br />
                    <select
                      value={modalidad}
                      onChange={(e) => {
                        setModalidad(e.target.value);
                      }}
                    >
                      <option value="">---</option>
                      <option value="Escuela común">Escuela común</option>
                      <option value="Escuela especial">Escuela especial</option>
                    </select>
                  </Col>
                )}
                {concurreInstitucionEducativa === "Finalizado" && (
                  <Col>
                    <label>Modalidad:</label>
                    <br />
                    <select
                      value={modalidad}
                      onChange={(e) => {
                        setModalidad(e.target.value);
                      }}
                    >
                      <option value="">---</option>
                      <option value="Escuela común">Escuela común</option>
                      <option value="Escuela especial">Escuela especial</option>
                    </select>
                  </Col>
                )}
              </Row>
              {concurreInstitucionEducativa === "No" && (
                <>
                  <br />

                  <Row>
                    <Col>
                      <label>Último Nivel Educativo</label>
                      <br />
                      <select
                        value={ultimoNivelEducativo}
                        onChange={(e) =>
                          setUltimoNivelEducativo(e.target.value)
                        }
                      >
                        <option value="">---</option>
                        <option value="Guardería">Guardería</option>
                        <option value="Jardín">Jardín</option>
                        <option value="1er grado">1er grado</option>
                        <option value="2do grado">2do grado</option>
                        <option value="3er grado">3er grado</option>
                        <option value="4to grado">4to grado</option>
                        <option value="5to grado">5to grado</option>
                        <option value="6to grado">6to grado</option>
                        <option value="1er año">1er año</option>
                        <option value="2do año">2do año</option>
                        <option value="3er año">3er año</option>
                        <option value="4to año">4to año</option>
                        <option value="5to año">5to año</option>
                        <option value="6to año">6to año</option>
                      </select>
                    </Col>
                    <Col>
                      <label>Nombre establecimiento Educativo:</label>
                      <br />
                      <input
                        type="text"
                        value={nombreEstablecimientoEducativo}
                        onChange={(e) =>
                          setNombreEstablecimientoEducativo(e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                </>
              )}
              {concurreInstitucionEducativa === "Si" && (
                <>
                  <br />
                  <Row>
                    <Row>
                      <Col>
                        <label>Maestra integradora:</label>
                        <br />
                        <select
                          value={maestraIntegradora}
                          onChange={(e) =>
                            setMaestraIntegradora(e.target.value)
                          }
                        >
                          <option value="">---</option>
                          <option value="Si">Si</option>
                          <option value="No">No</option>
                        </select>
                      </Col>
                      {maestraIntegradora == "Si" && (
                        <>
                          <Col>
                            <label>Nombre Maestra Integradora:</label>
                            <br />
                            <input
                              type="text"
                              value={nombreMaestraIntegradora}
                              onChange={(e) =>
                                setNombreMaestraIntegradora(e.target.value)
                              }
                            />
                          </Col>
                          <Col>
                            <label>Teléfono Maestra Integradora:</label>
                            <br />
                            <input
                              type="text"
                              value={telMaestraIntegradora}
                              onChange={(e) =>
                                setTelMaestraIntegradora(e.target.value)
                              }
                            />
                          </Col>
                        </>
                      )}
                    </Row>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <label>Nivel Escolar que cursa:</label>
                      <br />
                      <select
                        value={nivelEscolar}
                        onChange={(e) => setNivelEscolar(e.target.value)}
                      >
                        <option value="">---</option>
                        <option value="Inicial">Inicial</option>
                        <option value="Primario">Primario</option>
                        <option value="Secundario">Secundario</option>
                        <option value="Acelerado">Acelerado</option>
                      </select>
                    </Col>
                    <Col>
                      <label>Nivel Educativo:</label>
                      <br />
                      <select
                        value={nivelEducativo}
                        onChange={(e) => setNivelEducativo(e.target.value)}
                      >
                        <option value="">---</option>
                        <option value="Guardería">Guardería</option>
                        <option value="Jardín">Jardín</option>
                        <option value="1er grado">1er grado</option>
                        <option value="2do grado">2do grado</option>
                        <option value="3er grado">3er grado</option>
                        <option value="4to grado">4to grado</option>
                        <option value="5to grado">5to grado</option>
                        <option value="6to grado">6to grado</option>
                        <option value="1er año">1er año</option>
                        <option value="2do año">2do año</option>
                        <option value="3er año">3er año</option>
                        <option value="4to año">4to año</option>
                        <option value="5to año">5to año</option>
                        <option value="6to año">6to año</option>
                      </select>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <label>Nombre establecimiento Educativo:</label>
                      <br />
                      <input
                        type="text"
                        value={nombreEstablecimientoEducativo}
                        onChange={(e) =>
                          setNombreEstablecimientoEducativo(e.target.value)
                        }
                      />
                    </Col>
                    <Col>
                      <label>Domicilio Establecimiento Educativo:</label>
                      <br />
                      <input
                        type="text"
                        value={domicilioEstablecimientoEducativo}
                        onChange={(e) => {
                          setDomicilioEstablecimientoEducativo(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <label>Teléfono establecimiento Educativo:</label>
                      <br />
                      <input
                        type="text"
                        value={telefonoEstablecimientoEducativo}
                        onChange={(e) =>
                          setTelefonoEstablecimientoEducativo(e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                </>
              )}
              {concurreInstitucionEducativa === "Finalizado" && (
                <>
                  <br />

                  <Row>
                    <Col>
                      <label>Nivel Escolar finalizado:</label>
                      <br />
                      <select
                        value={nivelEscolar}
                        onChange={(e) => setNivelEscolar(e.target.value)}
                      >
                        <option value="">---</option>
                        <option value="Primario">Primario</option>
                        <option value="Secundario">Secundario</option>
                        <option value="Acelerado">Acelerado</option>
                      </select>
                    </Col>
                    <Col>
                      <label>Nombre establecimiento Educativo:</label>
                      <br />
                      <input
                        type="text"
                        value={nombreEstablecimientoEducativo}
                        onChange={(e) =>
                          setNombreEstablecimientoEducativo(e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                </>
              )}
              <hr />
              <Row>
                <h5>Datos sobre discapacidad</h5>
                <Col>
                  <label>¿Tiene discapacidad?:</label>
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
                    <label>Tipo de Discapacidad:</label>
                    <br />
                    <input
                      type="text"
                      value={tipoDiscapacidad}
                      onChange={(e) => setTipoDiscapacidad(e.target.value)}
                    />
                  </Col>
                )}
              </Row>
              <br />
              <Row>
                <Col>
                  <label>¿Certificado de Discapacidad?:</label>
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
                {certificadoDiscapacidad === "Si" && (
                  <Col>
                    <label>Prestaciones del certificado:</label>
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
              </Row>
              {certificadoDiscapacidad === "Si" && (
                <>
                  <br />
                  <Row>
                    <Col>
                      <label>Fecha emisión certificado:</label>
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
                      <label>Fecha vencimiento certificado:</label>
                      <br />
                      <input
                        type="date"
                        value={fechaVencimientoCertificado}
                        onChange={(e) => {
                          setFechaVencimientoCertificado(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </>
              )}
              <br />
              <Row>
                <Col>
                  <label>Tiene curatela:</label>
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
                    <option value="En trámite">En trámite</option>
                  </select>
                </Col>
                <Col>
                  <label>Recibe pensión:</label>
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
                    <option value="En trámite">En trámite</option>
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <label>Recibe acompañamiento terapéutico:</label>
                  <br />
                  <select
                    value={acompanamientoTerapeutico}
                    onChange={(e) =>
                      setAcompanamientoTerapeutico(e.target.value)
                    }
                  >
                    <option>---</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </Col>
                {acompanamientoTerapeutico === "Si" && (
                  <Col>
                    <label>Nombre y Apellido del profesional:</label>
                    <br />
                    <input
                      type="text"
                      value={nombreAcompTerapeutico}
                      onChange={(e) => {
                        setNombreAcompTerapeutico(e.target.value);
                      }}
                    />
                  </Col>
                )}
              </Row>
              <br />
              {acompanamientoTerapeutico === "Si" && (
                <>
                  <Row>
                    <Col>
                      <label>Dia de atención:</label>
                      <br />
                      <input
                        type="text"
                        value={diaAtencionAcomTer}
                        onChange={(e) => {
                          setDiaAtencionAcomTer(e.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <label>Horario de atención:</label>
                      <br />
                      <input
                        type="text"
                        value={horarioAtencionAcomTer}
                        onChange={(e) => {
                          setHorarioAtencionAcomTer(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                  <br />
                </>
              )}
              <hr />
              <Row>
                <h5>Tratamientos</h5>
                <br />
                <Row>
                  <Col>
                    <label>¿Recibe tratamiento?</label>
                    <br />
                    <select
                      value={tratamientoRecibe}
                      onChange={(e) => setTratamientoRecibe(e.target.value)}
                    >
                      <option value="Ninguno" defaultValue>
                        Ninguno
                      </option>
                      <option value="Psicológico">Psicológico</option>
                      <option value="Psiquiatría">Psiquiatría</option>
                      <option value="Psicomotricidad">Psicomotricidad</option>
                      <option value="Fisioterapia">Fisioterapia</option>
                      <option value="Fonoaudiología">Fonoaudiología</option>
                      <option value="Kinesiología">Kinesiología</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </Col>
                  {tratamientoRecibe === "Otro" && (
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
                </Row>
                {tratamientoRecibe !== "Ninguno" && (
                  <>
                    <br />
                    <br />
                    <br />
                    <Row>
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
                    <br />
                    <br />
                    <Row>
                      <Col>
                        <label>Nombre del profesional:</label>
                        <br />
                        <input
                          type="text"
                          value={nombreProfesional}
                          onChange={(e) => setNombreProfesional(e.target.value)}
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
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Row>
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
                  </>
                )}
                <br />
                <br />
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
                        value={tratamientoMedEspecial}
                        onChange={(e) => {
                          setTratamientoMedEspecial(e.target.value);
                        }}
                      />
                    </Col>
                  )}
                </Row>
              </Row>
              <hr />
              <Row>
                <h5>Datos Padre Biológico</h5>
                <Col>
                  <label>Nombre y Apellido:</label>
                  <br />
                  <input
                    type="text"
                    value={nombrePadre}
                    onChange={(e) => {
                      setNombrePadre(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>¿Vive?:</label>
                  <br />
                  <select
                    value={vivePadre}
                    onChange={(e) => {
                      setVivePadre(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <label>DNI:</label>
                  <br />
                  <input
                    type="text"
                    value={dniPadre}
                    onChange={(e) => {
                      setDniPadre(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Domicilio del padre:</label>
                  <br />
                  <input
                    type="text"
                    value={domicilioPadre}
                    onChange={(e) => {
                      setDomicilioPadre(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Teléfono de contacto:</label>
                  <br />
                  <input
                    type="text"
                    value={telPadre}
                    onChange={(e) => {
                      setTelPadre(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <h5>Datos Madre Biológica</h5>
                <Col>
                  <label>Nombre y Apellido:</label>
                  <br />
                  <input
                    type="text"
                    value={nombreMadre}
                    onChange={(e) => {
                      setNombreMadre(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>¿Vive?:</label>
                  <br />
                  <select
                    value={viveMadre}
                    onChange={(e) => {
                      setViveMadre(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <label>DNI:</label>
                  <br />
                  <input
                    type="text"
                    value={dniMadre}
                    onChange={(e) => {
                      setDniMadre(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Domicilio de la madre:</label>
                  <br />
                  <input
                    type="text"
                    value={domicilioMadre}
                    onChange={(e) => {
                      setDomicilioMadre(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Teléfono de contacto:</label>
                  <br />
                  <input
                    type="text"
                    value={telMadre}
                    onChange={(e) => {
                      setTelMadre(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <h5>Datos del referente significativo</h5>
                <Col>
                  <label>Nombre y Apellido:</label>
                  <br />
                  <input
                    type="text"
                    value={nombreReferente}
                    onChange={(e) => {
                      setNombreReferente(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Descripción:</label>
                  <br />
                  <input
                    type="textarea"
                    value={descripcionReferente}
                    onChange={(e) => {
                      setDescripcionReferente(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>¿Vive?:</label>
                  <br />
                  <select
                    value={viveReferente}
                    onChange={(e) => {
                      setViveReferente(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <label>DNI:</label>
                  <br />
                  <input
                    type="text"
                    value={dniReferente}
                    onChange={(e) => {
                      setDniReferente(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Domicilio del referente:</label>
                  <br />
                  <input
                    type="text"
                    value={domicilioReferente}
                    onChange={(e) => {
                      setDomicilioReferente(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <label>Teléfono de contacto:</label>
                  <br />
                  <input
                    type="text"
                    value={telReferente}
                    onChange={(e) => {
                      setTelReferente(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <h5>Trabajo Institucional</h5>
                <Col>
                  <label>Situación familiar en la Institución:</label>
                  <br />
                  <select
                    value={situacionFamiliar}
                    onChange={(e) => {
                      setSituacionFamiliar(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="Con cuidados parentales">
                      Con cuidados parentales
                    </option>
                    <option value="Sin cuidados parentales">
                      Sin cuidados parentales
                    </option>
                  </select>
                </Col>
                <Col>
                  <label>Recibe visitas:</label>
                  <br />
                  <select
                    value={recibeVisitas}
                    onChange={(e) => {
                      setRecibeVisitas(e.target.value);
                    }}
                  >
                    <option value="">---</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </Col>
              </Row>
              {recibeVisitas === "Si" && (
                <>
                  <br />
                  <Row>
                    <Col>
                      <label>Tipo de vínculo</label>
                      <br />
                      <select
                        value={tipoVinculoSelect}
                        onChange={(e) => {
                          setTipoVinculoSelect(e.target.value);
                        }}
                      >
                        <option value="Familia nuclear">Familia nuclear</option>
                        <option value="Familia extensa">Familia extensa</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </Col>
                    {tipoVinculoSelect === "Otro" && (
                      <Col>
                        <label>Especifique el tipo de vínculo:</label>
                        <br />
                        <input
                          type="text"
                          value={tipoVinculo}
                          onChange={(e) => {
                            setTipoVinculo(e.target.value);
                          }}
                        />
                      </Col>
                    )}
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <label>Nombre y apellido:</label>
                      <br />
                      <input
                        type="text"
                        value={nombreVinculoVisita}
                        onChange={(e) => {
                          setNombreVinculoVisita(e.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <label>Frecuencia de visita:</label>
                      <br />
                      <input
                        type="text"
                        value={frecuenciaVisita}
                        onChange={(e) => {
                          setFrecuenciaVisita(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </>
              )}
              <br />
              <Row>
                <Col>
                  <label>Proceso de revinculación:</label>
                  <br />
                  <select
                    value={procesoRevinculacion}
                    onChange={(e) => setProcesoRevinculacion(e.target.value)}
                  >
                    <option value="---">---</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </Col>
              </Row>
              <hr />
              <button className="btn btn-success">Cargar datos</button>
            </Container>
          </form>
        </>
      )}
    </section>
  );
}
