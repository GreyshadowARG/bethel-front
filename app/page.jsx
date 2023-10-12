"use client";

import style from "./page.module.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "../config/axios";

import { useState, useEffect } from "react";

// URLs
const GETBIRTHDAYS_URL = "api/alerts/getBirthdayDates";
const GETCERTIF_URL = "api/alerts/getVencimientoCertif";
const GETTURNOSMEDICOS_URL = "api/alerts/getTurnosMedicos";
const GETTURNOSJUDICIALES_URL = "api/alerts/getTurnosJudiciales";

export default function HomePage() {
  const [loadingData, setLoadingData] = useState(true);

  const [hoyBirthArray, setHoyBirthArray] = useState([]);
  const [proxSemBirthArray, setProxSemBirthArray] = useState([]);
  const [proxMesBirthArray, setProxMesBirthArray] = useState([]);
  const [hoyCertArray, setHoyCertArray] = useState([]);
  const [proxSemCertArray, setProxSemCertArray] = useState([]);
  const [proxMesCertArray, setProxMesCertArray] = useState([]);
  const [hoyTurnosMedicosArray, setHoyTurnosMedicosArray] = useState([]);
  const [proxSemTurnosMedicosArray, setProxSemTurnosMedicosArray] = useState([]);
  const [proxMesTurnosMedicosArray, setProxMesTurnosMedicosArray] = useState([]);
  const [hoyTurnosJudicialesArray, setHoyTurnosJudicialesArray] = useState([]);
  const [proxSemTurnosJudicialesArray, setProxSemTurnosJudicialesArray] = useState([]);
  const [proxMesTurnosJudicialesArray, setProxMesTurnosJudicialesArray] = useState([]);

  const OrdenarByFecha = (array) => {

  }

  useEffect(() => {
    const getData = async () => {
      const fetchBirthdays = await axios.get(GETBIRTHDAYS_URL);
      const fetchCertif = await axios.get(GETCERTIF_URL);
      const fetchTurnosMedicos = await axios.get(GETTURNOSMEDICOS_URL);
      const fetchTurnosJudiciales = await axios.get(GETTURNOSJUDICIALES_URL);

      setHoyBirthArray(fetchBirthdays.data.hoy);
      setProxSemBirthArray(fetchBirthdays.data.proxSem);
      setProxMesBirthArray(fetchBirthdays.data.proxMes);
      setHoyCertArray(fetchCertif.data.hoy);
      setProxSemCertArray(fetchCertif.data.proxSem);
      setProxMesCertArray(fetchCertif.data.proxMes);
      setHoyTurnosMedicosArray(fetchTurnosMedicos.data.hoy);
      setProxSemTurnosMedicosArray(fetchTurnosMedicos.data.proxSem);
      setProxMesTurnosMedicosArray(fetchTurnosMedicos.data.proxMes);
      setHoyTurnosJudicialesArray(fetchTurnosJudiciales.data.hoy);
      setProxSemTurnosJudicialesArray(fetchTurnosJudiciales.data.proxSem);
      setProxMesTurnosJudicialesArray(fetchTurnosJudiciales.data.proxMes);
      setLoadingData(false);
    };

    getData();
  }, []);

  return (
    <>
      <h2 className={style.h2} id={style.bold}>GESTIÓN BETHEL</h2>
      <hr />
      <section>
        <Row>
          <Col>
            <h3 id={style.bold} className={style.categoryTitleBirth}>
              CUMPLEAÑOS
            </h3>
            {loadingData ? (
              <div className="text-center" id={style.loadingSpinner}>
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            ) : (
              <>
                {hoyBirthArray.length == 0 &&
                  proxSemBirthArray.length == 0 &&
                  proxMesBirthArray.length == 0 && (
                    <div className={style.alertsRow}>
                      <p>
                        No hay fechas de cumpleaños cercanos a la fecha actual.
                      </p>
                    </div>
                  )}
                {hoyBirthArray.length > 0 && (
                  <>
                    <h5 className={style.categoryTitleBirth} id={style.bold}>
                      HOY
                    </h5>
                    {hoyBirthArray.map((element, index) => {
                      return (
                        <div className={style.alertsRow} key={index}>
                          <p className={style.alertsColStart} id={style.bold}>
                            {element.nombre}
                          </p>
                          <p className={style.alertsCol}>{element.casa}</p>
                          <p className={style.alertsColEnd} id={style.bold}>
                            {element.fecha_nacimiento}
                          </p>
                        </div>
                      );
                    })}
                  </>
                )}
                {proxSemBirthArray.length > 0 && (
                  <>
                    <h5 className={style.categoryTitleBirth} id={style.bold}>
                      PRÓXIMOS 7 DIAS
                    </h5>
                    {proxSemBirthArray.map((element, index) => {
                      return (
                        <div className={style.alertsRow} key={index}>
                          <p className={style.alertsColStart} id={style.bold}>
                            {element.nombre}
                          </p>
                          <p className={style.alertsCol}>{element.casa}</p>
                          <p className={style.alertsColEnd} id={style.bold}>
                            {element.fecha_nacimiento}
                          </p>
                        </div>
                      );
                    })}
                  </>
                )}
                {proxMesBirthArray.length > 0 && (
                  <>
                    <h5 className={style.categoryTitleBirth} id={style.bold}>
                      PRÓXIMOS 30 DIAS
                    </h5>
                    {proxMesBirthArray.map((element, index) => {
                      return (
                        <div className={style.alertsRow} key={index}>
                          <p className={style.alertsColStart} id={style.bold}>
                            {element.nombre}
                          </p>
                          <p className={style.alertsCol}>{element.casa}</p>
                          <p className={style.alertsColEnd} id={style.bold}>
                            {element.fecha_nacimiento}
                          </p>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <section>
              <h3 className={style.categoryTitleTurnos} id={style.bold}>
                TURNOS MEDICOS
              </h3>
              {loadingData ? (
                <div className="text-center" id={style.loadingSpinner}>
                  <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              ) : (
                <>
                  {hoyTurnosMedicosArray.length == 0 &&
                    proxSemTurnosMedicosArray.length == 0 &&
                    proxMesTurnosMedicosArray.length == 0 && (
                      <div className={style.alertsRowTurnos}>
                        <p>
                          No hay fechas de turnos cercanos a la fecha actual.
                        </p>
                      </div>
                    )}
                  {hoyTurnosMedicosArray.length > 0 && (
                    <>
                      <h5 className={style.categoryTitleTurnos} id={style.bold}>
                        HOY
                      </h5>
                      {hoyTurnosMedicosArray.map((element, index) => {
                        return (
                          <div className={style.alertsRowTurnos} key={index}>
                            <p
                              className={style.alertsColTurnosStart}
                              id={style.bold}
                            >
                              {element.nombre}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.tipo_turno}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.lugar_turno}
                            </p>
                            <p
                              className={style.alertsColTurnos}
                              id={style.bold}
                            >
                              {element.hora_turno} hs
                            </p>
                            <p className={style.alertsColEnd} id={style.bold}>
                              {element.dia_turno}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                  {proxSemTurnosMedicosArray.length > 0 && (
                    <>
                      <h5 className={style.categoryTitleTurnos} id={style.bold}>
                        PRÓXIMOS 7 DIAS
                      </h5>
                      {proxSemTurnosMedicosArray.map((element, index) => {
                        return (
                          <div className={style.alertsRowTurnos} key={index}>
                            <p
                              className={style.alertsColTurnosStart}
                              id={style.bold}
                            >
                              {element.nombre}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.tipo_turno}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.lugar_turno}
                            </p>
                            <p
                              className={style.alertsColTurnos}
                              id={style.bold}
                            >
                              {element.hora_turno} hs
                            </p>
                            <p className={style.alertsColEnd} id={style.bold}>
                              {element.dia_turno}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                  {proxMesTurnosMedicosArray.length > 0 && (
                    <>
                      <h5 className={style.categoryTitleTurnos} id={style.bold}>
                        PRÓXIMOS 30 DIAS
                      </h5>
                      {proxMesTurnosMedicosArray.map((element, index) => {
                        return (
                          <div className={style.alertsRowTurnos} key={index}>
                            <p
                              className={style.alertsColTurnosStart}
                              id={style.bold}
                            >
                              {element.nombre}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.tipo_turno}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.lugar_turno}
                            </p>
                            <p
                              className={style.alertsColTurnos}
                              id={style.bold}
                            >
                              {element.hora_turno} hs
                            </p>
                            <p className={style.alertsColEnd} id={style.bold}>
                              {element.dia_turno}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </section>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <section>
              <h3 className={style.categoryTitleTurnosJud} id={style.bold}>
                TURNOS JUDICIALES
              </h3>
              {loadingData ? (
                <div className="text-center" id={style.loadingSpinner}>
                  <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              ) : (
                <>
                  {hoyTurnosJudicialesArray.length == 0 &&
                    proxSemTurnosJudicialesArray.length == 0 &&
                    proxMesTurnosJudicialesArray.length == 0 && (
                      <div className={style.alertsRowTurnos}>
                        <p>
                          No hay fechas de turnos cercanos a la fecha actual.
                        </p>
                      </div>
                    )}
                  {hoyTurnosJudicialesArray.length > 0 && (
                    <>
                      <h5 className={style.categoryTitleTurnosJud} id={style.bold}>
                        HOY
                      </h5>
                      {hoyTurnosJudicialesArray.map((element, index) => {
                        return (
                          <div className={style.alertsRowTurnosJud} key={index}>
                            <p
                              className={style.alertsColTurnosStart}
                              id={style.bold}
                            >
                              {element.nombre}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.tipo_turno}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.lugar_turno}
                            </p>
                            <p
                              className={style.alertsColTurnos}
                              id={style.bold}
                            >
                              {element.hora_turno} hs
                            </p>
                            <p className={style.alertsColEnd} id={style.bold}>
                              {element.dia_turno}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                  {proxSemTurnosJudicialesArray.length > 0 && (
                    <>
                      <h5 className={style.categoryTitleTurnosJud} id={style.bold}>
                        PRÓXIMOS 7 DIAS
                      </h5>
                      {proxSemTurnosJudicialesArray.map((element, index) => {
                        return (
                          <div className={style.alertsRowTurnosJud} key={index}>
                            <p
                              className={style.alertsColTurnosStart}
                              id={style.bold}
                            >
                              {element.nombre}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.tipo_turno}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.lugar_turno}
                            </p>
                            <p
                              className={style.alertsColTurnos}
                              id={style.bold}
                            >
                              {element.hora_turno} hs
                            </p>
                            <p className={style.alertsColEnd} id={style.bold}>
                              {element.dia_turno}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                  {proxMesTurnosJudicialesArray.length > 0 && (
                    <>
                      <h5 className={style.categoryTitleTurnosJud} id={style.bold}>
                        PRÓXIMOS 30 DIAS
                      </h5>
                      {proxMesTurnosJudicialesArray.map((element, index) => {
                        return (
                          <div className={style.alertsRowTurnosJud} key={index}>
                            <p
                              className={style.alertsColTurnosStart}
                              id={style.bold}
                            >
                              {element.nombre}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.tipo_turno}
                            </p>
                            <p className={style.alertsColTurnos}>
                              {element.lugar_turno}
                            </p>
                            <p
                              className={style.alertsColTurnos}
                              id={style.bold}
                            >
                              {element.hora_turno} hs
                            </p>
                            <p className={style.alertsColEnd} id={style.bold}>
                              {element.dia_turno}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </section>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <section>
              <h3 className={style.categoryTitleCertif} id={style.bold}>
                VENCIMIENTO DE CERTIFICADOS
              </h3>
              {loadingData ? (
                <div className="text-center" id={style.loadingSpinner}>
                  <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              ) : (
                <>
                  {hoyCertArray.length == 0 &&
                    proxSemCertArray.length == 0 &&
                    proxMesCertArray.length == 0 && (
                      <div className={style.alertsRowCertif}>
                        <p>
                          No hay fechas de vencimientos de certificados cercanos
                          a la fecha actual.
                        </p>
                      </div>
                    )}
                  {hoyCertArray.length > 0 && (
                    <>
                      <h5 className={style.categoryTitleCertif} id={style.bold}>
                        HOY
                      </h5>
                      {hoyCertArray.map((element, index) => {
                        return (
                          <div className={style.alertsRowCertif} key={index}>
                            <p className={style.alertsColStart} id={style.bold}>
                              {element.nombre}
                            </p>
                            <p className={style.alertsCol}>
                              {element.prestaciones_certificado}
                            </p>
                            <p className={style.alertsColEnd} id={style.bold}>
                              {element.fecha_vencimiento_certificado}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                  {proxSemCertArray.length > 0 && (
                    <>
                      <h5 className={style.categoryTitleCertif} id={style.bold}>
                        PRÓXIMOS 7 DIAS
                      </h5>
                      {proxSemCertArray.map((element, index) => {
                        return (
                          <div className={style.alertsRowCertif} key={index}>
                            <p className={style.alertsColStart} id={style.bold}>
                              {element.nombre}
                            </p>
                            <p className={style.alertsCol}>
                              {element.prestaciones_certificado}
                            </p>
                            <p className={style.alertsColEnd} id={style.bold}>
                              {element.fecha_vencimiento_certificado}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                  {proxMesCertArray.length > 0 && (
                    <>
                      <h5 className={style.categoryTitleCertif} id={style.bold}>
                        PRÓXIMOS 30 DIAS
                      </h5>
                      {proxMesCertArray.map((element, index) => {
                        return (
                          <div className={style.alertsRowCertif} key={index}>
                            <p className={style.alertsColStart} id={style.bold}>
                              {element.nombre}
                            </p>
                            <p className={style.alertsCol}>
                              {element.prestaciones_certificado}
                            </p>
                            <p className={style.alertsColEnd} id={style.bold}>
                              {element.fecha_vencimiento_certificado}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </section>
          </Col>
        </Row>
      </section>
      <hr />
    </>
  );
}
