"use client";

import style from "./gestionarPersona.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "../../config/axios";
import { useState, useEffect } from "react";

import GestionPersona from "./personaTable/personaTable";
import GestionPasiva from "./personaTable/pasivaTable";

// URLs
const GETALLPERSONAS = "api/persona/getAllPersonas";
const GETPERSONABYID = "api/persona/getPersonaById/";
const GETPOBLACIONPASIVA = "api/pasividad/getPoblacionPasiva";
const GETPASIVABYID = "api/pasividad/getPasivaById/";

export default function BuscarPersona() {
  const [loadData, setLoadData] = useState(true);
  const [query, setQuery] = useState("");
  const [finalQuery, setFinalQuery] = useState("");
  const [personas, setPersonas] = useState([]);
  const [mayores18, setMayores18] = useState([]);
  const [menores18, setMenores18] = useState([]);
  const [tieneDiscapacidad, setTieneDiscapacidad] = useState([]);
  const [noTieneDiscapacidad, setNoTieneDiscapacidad] = useState([]);
  const [tieneCuratela, setTieneCuratela] = useState([]);
  const [noTieneCuratela, setNoTieneCuratela] = useState([]);
  const [curatelaEnTramite, setCuratelaEnTramite] = useState([]);
  const [recibePension, setRecibePension] = useState([]);
  const [noRecibePension, setNoRecibePension] = useState([]);
  const [pensionEnTramite, setPensionEnTramite] = useState([]);
  const [personaById, setPersonaById] = useState([]);
  const [pasivaById, setPasivaById] = useState([]);
  const [filterType, setFilterType] = useState("---");
  const [singlePersonaMode, setSinglePersonaMode] = useState(false);
  const [singlePasivaMode, setSinglePasivaMode] = useState(false);
  const [casa, setCasa] = useState("Casa 2");
  const [edad, setEdad] = useState("Menores de 18");
  const [discapacidad, setDiscapacidad] = useState("No");
  const [curatela, setCuratela] = useState("No");
  const [pension, setPension] = useState("No");
  const [poblacionPasiva, setPoblacionPasiva] = useState([]);

  useEffect(() => {
    const getAllPersonas = async () => {
      try {
        const fetchPersonas = await axios.get(GETALLPERSONAS);
        const fetchPasiva = await axios.get(GETPOBLACIONPASIVA);
        setPersonas(fetchPersonas.data);
        setPoblacionPasiva(fetchPasiva.data);
        getEdades();
        getDiscapacidad();
        getCuratela();
        getPension();
        setLoadData(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllPersonas();
  }, [loadData]);

  useEffect(() => {
    const checkQuery = async () => {
      const queryCorrect =
        query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
      setFinalQuery(queryCorrect);
    };

    checkQuery();
  }, [query]);

  const handleClick = async (id) => {
    try {
      const fetchPersonaById = await axios.get(GETPERSONABYID + id);
      setPersonaById(fetchPersonaById.data);
      setSinglePersonaMode(true);
      setSinglePasivaMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickPasiva = async (id) => {
    try {
      const fetchPersonaById = await axios.get(GETPASIVABYID + id);
      setPasivaById(fetchPersonaById.data);
      setSinglePasivaMode(true);
      setSinglePersonaMode(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getEdades = () => {
    const mayores18 = [];
    const menores18 = [];

    personas.forEach((persona) => {
      if (persona.edad >= 18) {
        mayores18.push(persona);
      } else if (persona.edad < 18) {
        menores18.push(persona);
      }
    });

    setMayores18(mayores18);
    setMenores18(menores18);
  };

  const getDiscapacidad = () => {
    const tieneDiscapacidad = [];
    const noTieneDiscapacidad = [];

    personas.forEach((persona) => {
      if (persona.tiene_discapacidad == "Si") {
        tieneDiscapacidad.push(persona);
      } else {
        noTieneDiscapacidad.push(persona);
      }
    });

    setTieneDiscapacidad(tieneDiscapacidad);
    setNoTieneDiscapacidad(noTieneDiscapacidad);
  };

  const getCuratela = () => {
    const tieneCuratela = [];
    const noTieneCuratela = [];
    const curatelaEnTramite = [];

    personas.forEach((persona) => {
      if (persona.curatela == "Si") {
        tieneCuratela.push(persona);
      } else if (persona.curatela == "En trámite") {
        curatelaEnTramite.push(persona);
      } else {
        noTieneCuratela.push(persona);
      }
    });

    setTieneCuratela(tieneCuratela);
    setNoTieneCuratela(noTieneCuratela);
    setCuratelaEnTramite(curatelaEnTramite);
  };

  const getPension = () => {
    const recibePension = [];
    const noRecibePension = [];
    const pensionEnTramite = [];

    personas.forEach((persona) => {
      if (persona.recibe_pension == "Si") {
        recibePension.push(persona);
      } else if (persona.recibe_pension == "En trámite") {
        pensionEnTramite.push(persona);
      } else {
        noRecibePension.push(persona);
      }
    });

    setRecibePension(recibePension);
    setNoRecibePension(noRecibePension);
    setPensionEnTramite(pensionEnTramite);
  };

  return (
    <section>
      <h2 className={style.h2} id={style.bold}>
        GESTIÓN DE PERSONAS
      </h2>
      <hr />
      {singlePersonaMode === true ? (
        <button
          className="btn btn-info"
          onClick={() => {
            setLoadData(true);
            setSinglePersonaMode(false);
          }}
        >
          Volver a la lista
        </button>
      ) : (
        <>
          <div className={style.row_buscador}>
            <div className={style.row_buscador}>
              <p id={style.bold}>Buscar por apellido:</p>
              <input
                type="text"
                placeholder="Escribir apellido"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            <div className={style.row_buscador}>
              <p id={style.bold}>Filtrar por:</p>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                }}
              >
                <option value="---" defaultValue>
                  --- sin filtros
                </option>
                <option value="Casa">Casa</option>
                <option value="Edad">Edad</option>
                <option value="Discapacidad">¿Tiene discapacidad?</option>
                <option value="Curatela">¿Tiene curatela?</option>
                <option value="Pensión">¿Tiene pensión?</option>
                <option value="Pasiva">Población pasiva</option>
              </select>
              {filterType == "Casa" && (
                <select
                  value={casa}
                  onChange={(e) => {
                    setCasa(e.target.value);
                  }}
                >
                  <option value="Casa 2" defaultValue>
                    Casa 2
                  </option>
                  <option value="Casa 5">Casa 5</option>
                  <option value="Casa 6">Casa 6</option>
                  <option value="Casa 8">Casa 8</option>
                  <option value="Casa 9">Casa 9 (Ascochinga)</option>
                  <option value="Casa 14">Casa 14</option>
                </select>
              )}
              {filterType == "Edad" && (
                <select
                  value={edad}
                  onChange={(e) => {
                    setEdad(e.target.value);
                  }}
                >
                  <option value="Mayores de 18" defaultValue>
                    Mayores 18
                  </option>
                  <option value="Menores de 18">Menores 18</option>
                </select>
              )}
              {filterType == "Discapacidad" && (
                <select
                  value={discapacidad}
                  onChange={(e) => {
                    setDiscapacidad(e.target.value);
                  }}
                >
                  <option value="No" defaultValue>
                    No
                  </option>
                  <option value="Si">Si</option>
                </select>
              )}
              {filterType == "Curatela" && (
                <select
                  value={curatela}
                  onChange={(e) => {
                    setCuratela(e.target.value);
                  }}
                >
                  <option value="No" defaultValue>
                    No
                  </option>
                  <option value="Si">Si</option>
                  <option value="En trámite">En trámite</option>
                </select>
              )}
              {filterType == "Pensión" && (
                <select
                  value={pension}
                  onChange={(e) => {
                    setPension(e.target.value);
                  }}
                >
                  <option value="No" defaultValue>
                    No
                  </option>
                  <option value="Si">Si</option>
                  <option value="En trámite">En trámite</option>
                </select>
              )}
            </div>
          </div>
        </>
      )}
      <hr />
      {singlePersonaMode === false && (
        <>
          {filterType !== "Pasiva" ? (
            <div className={style.trTitle}>
              <p className={style.th} id={style.bold}>
                Nombre
              </p>
              <p className={style.th} id={style.bold}>
                Apellido
              </p>
              {discapacidad != "Si" ? (
                <p className={style.th} id={style.bold}>
                  Edad
                </p>
              ) : (
                <p className={style.th} id={style.bold}>
                  Discapacidad
                </p>
              )}
              <p className={style.th} id={style.bold}>
                Casa
              </p>
              <p className={style.th} id={style.bold}>
                Accion
              </p>
            </div>
          ) : (
            <div className={style.trTitle}>
              <p className={style.th} id={style.bold}>
                Nombre
              </p>
              <p className={style.th} id={style.bold}>
                Motivo
              </p>
              <p className={style.th} id={style.bold}>
                Fecha
              </p>
              <p className={style.th} id={style.bold}>
                Accion
              </p>
            </div>
          )}

          {loadData ? (
            <>
              <div className="text-center" id={style.loadingSpinner}>
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                {filterType == "---" &&
                  personas
                    .filter((persona) => persona.apellido.includes(finalQuery))
                    .map((persona) => (
                      <div className={style.trBody} key={persona._id}>
                        <p className={style.td}>{persona.nombre}</p>
                        <p className={style.td}>{persona.apellido}</p>
                        <p className={style.td}>{persona.edad}</p>
                        <p className={style.td}>{persona.casa}</p>
                        <div className={style.tdButton}>
                          <button
                            className={style.buttonGestionar}
                            onClick={() => handleClick(persona._id)}
                          >
                            Gestionar
                          </button>
                        </div>
                      </div>
                    ))}
                {filterType == "Casa" &&
                  personas
                    .filter((persona) => persona.casa.includes(casa))
                    .filter((persona) => persona.apellido.includes(finalQuery))
                    .map((persona) => (
                      <div className={style.trBody} key={persona._id}>
                        <p className={style.td}>{persona.nombre}</p>
                        <p className={style.td}>{persona.apellido}</p>
                        <p className={style.td}>{persona.edad}</p>
                        <p className={style.td} id={style.bold}>
                          {persona.casa}
                        </p>
                        <div className={style.tdButton}>
                          <button
                            className={style.buttonGestionar}
                            onClick={() => handleClick(persona._id)}
                          >
                            Gestionar
                          </button>
                        </div>
                      </div>
                    ))}
                {filterType == "Edad" && (
                  <>
                    {edad == "Mayores de 18" &&
                      mayores18
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td} id={style.bold}>
                              {persona.edad}
                            </p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                    {edad == "Menores de 18" &&
                      menores18
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td} id={style.bold}>
                              {persona.edad}
                            </p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                  </>
                )}
                {filterType == "Discapacidad" && (
                  <>
                    {discapacidad == "Si" &&
                      tieneDiscapacidad
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td} id={style.bold}>
                              {persona.tipo_discapacidad}
                            </p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                    {discapacidad == "No" &&
                      noTieneDiscapacidad
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td}>{persona.edad}</p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                  </>
                )}
                {filterType == "Curatela" && (
                  <>
                    {curatela == "Si" &&
                      tieneCuratela
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td}>{persona.edad}</p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                    {curatela == "No" &&
                      noTieneCuratela
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td}>{persona.edad}</p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                    {curatela == "En trámite" &&
                      curatelaEnTramite
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td}>{persona.edad}</p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                  </>
                )}
                {filterType == "Pensión" && (
                  <>
                    {pension == "Si" &&
                      recibePension
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td}>{persona.edad}</p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                    {pension == "No" &&
                      noRecibePension
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td}>{persona.edad}</p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                    {pension == "En trámite" &&
                      pensionEnTramite
                        .filter((persona) =>
                          persona.apellido.includes(finalQuery)
                        )
                        .map((persona) => (
                          <div className={style.trBody} key={persona._id}>
                            <p className={style.td}>{persona.nombre}</p>
                            <p className={style.td}>{persona.apellido}</p>
                            <p className={style.td}>{persona.edad}</p>
                            <p className={style.td}>{persona.casa}</p>
                            <div className={style.tdButton}>
                              <button
                                className={style.buttonGestionar}
                                onClick={() => handleClick(persona._id)}
                              >
                                Gestionar
                              </button>
                            </div>
                          </div>
                        ))}
                  </>
                )}
                {filterType == "Pasiva" &&
                  poblacionPasiva.map((persona) => (
                    <div className={style.trBody} key={persona._id}>
                      <p className={style.td}>{persona.nombre}</p>
                      <p className={style.td}>{persona.motivo_pasividad}</p>
                      <p className={style.td}>{persona.fecha}</p>
                      <div className={style.tdButton}>
                        <button
                          className={style.buttonGestionar}
                          onClick={() => handleClickPasiva(persona._id)}
                        >
                          Ver datos
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </>
      )}
      {(singlePersonaMode === true && singlePasivaMode === false) && (
        <>
          <GestionPersona props={personaById._id} />
        </>
      )}
      {(singlePasivaMode === true && singlePersonaMode === true) &&(
        <>
          <GestionPasiva props={pasivaById._id} />
        </>
      )}

    </section>
  );
}
