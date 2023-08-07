"use client";

import style from "./gestionarPersona.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";

import axios from "../../config/axios";
import { useState, useEffect } from "react";

import GestionPersona from "./personaTable/personaTable";

// URLs
const GETALLPERSONAS = "api/persona/getAllPersonas";
const GETPERSONABYID = "api/persona/getPersonaById/";

export default function BuscarPersona() {

  const [caca, setCaca] = useState(true);
  const [query, setQuery] = useState("");
  const [personas, setPersonas] = useState([]);
  const [personaById, setPersonaById] = useState([]);
  const [singlePersonaMode, setSinglePersonaMode] = useState(false);
  
  useEffect(() => {
    const getAllPersonas = async () => {
      try {
        const fetchPersonas = await axios.get(GETALLPERSONAS);
        setPersonas(fetchPersonas.data);
        console.log("Carga")
        setCaca(false);
      } catch (err) {
        console.log(err);
      }
    };
  
    getAllPersonas();
  }, [caca]);


  const handleClick = async (id) => {
    try {
      const fetchPersonaById = await axios.get(GETPERSONABYID + id);
      setPersonaById(fetchPersonaById.data);
      setSinglePersonaMode(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <h2 id={style.bold}>GESTIÓN DE PERSONAS</h2>
      {singlePersonaMode === true ? (
        <button
          className="btn btn-info"
          onClick={() => setSinglePersonaMode(false)}
        >
          Volver a la lista
        </button>
      ) : (
        <input
          type="text"
          placeholder="Buscar por apellido"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      )}

      <hr />
      {singlePersonaMode === false && (
        <Container>
          <table className={style.table}>
            <tbody>
              <tr className={style.tr}>
                <th className={style.th}>Nombre</th>
                <th className={style.th}>Apellido</th>
                <th className={style.th}>Casa</th>
                <th className={style.th}>Acción</th>
              </tr>
              {personas
                .filter((persona) => persona.apellido.includes(query))
                .map((persona) => (
                  <tr className={style.tr} key={persona._id}>
                    <td className={style.td}>{persona.nombre}</td>
                    <td className={style.td}>{persona.apellido}</td>
                    <td className={style.td}>{persona.casa}</td>
                    <td className={style.td}>
                      <button
                        className="btn btn-success"
                        onClick={() => handleClick(persona._id)}
                      >
                        Gestionar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Container>
      )}
      {singlePersonaMode === true && (
        <>
          <GestionPersona props={personaById._id} />
        </>
      )}
    </section>
  );
}
