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
const GETTURNOS_URL = "api/alerts/getTurnos";

export default function HomePage() {
  const [hoyBirthArray, setHoyBirthArray] = useState([]);
  const [proxSemBirthArray, setProxSemBirthArray] = useState([]);
  const [proxMesBirthArray, setProxMesBirthArray] = useState([]);
  const [hoyCertArray, setHoyCertArray] = useState([]);
  const [proxSemCertArray, setProxSemCertArray] = useState([]);
  const [proxMesCertArray, setProxMesCertArray] = useState([]);
  const [hoyTurnosArray, setHoyTurnosArray] = useState([]);
  const [proxSemTurnosArray, setProxSemTurnosArray] = useState([]);
  const [proxMesTurnosArray, setProxMesTurnosArray] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchBirthdays = await axios.get(GETBIRTHDAYS_URL);
      const fetchCertif = await axios.get(GETCERTIF_URL);
      const fetchTurnos = await axios.get(GETTURNOS_URL);

      setHoyBirthArray(fetchBirthdays.data.hoy);
      setProxSemBirthArray(fetchBirthdays.data.proxSem);
      setProxMesBirthArray(fetchBirthdays.data.proxMes);
      setHoyCertArray(fetchCertif.data.hoy);
      setProxSemCertArray(fetchCertif.data.proxSem);
      setProxMesCertArray(fetchCertif.data.proxMes);
      setHoyTurnosArray(fetchTurnos.data.hoy);
      setProxSemTurnosArray(fetchTurnos.data.proxSem);
      setProxMesTurnosArray(fetchTurnos.data.proxMes);
    };

    getData();
  }, []);

  return (
    <>
      <h2 id={style.bold}>GESTIÓN BETHEL</h2>
      <hr />
      <section>
        <Row>
          <Col>
            <h3 id={style.bold} className={style.categoryTitleBirth}>
              CUMPLEAÑOS
            </h3>
            {hoyBirthArray.length > 0 && (
              <>
                <h5 className={style.categoryTitleBirth} id={style.bold}>
                  HOY
                </h5>
                {hoyBirthArray.map((element, index) => {
                  return (
                    <div className={style.categoryBodyBirth} key={index}>
                      <Row>
                        <Col id={style.bold}>{element.nombre}</Col>
                        <Col>{element.casa}</Col>
                        <Col>{element.fecha_nacimiento}</Col>
                      </Row>
                    </div>
                  );
                })}
                <br />
              </>
            )}
            {proxSemBirthArray.length > 0 && (
              <>
                <h5 className={style.categoryTitleBirth} id={style.bold}>
                  PRÓXIMOS 7 DIAS
                </h5>
                {proxSemBirthArray.map((element, index) => {
                  return (
                    <div className={style.categoryBodyBirth} key={index}>
                      <Row>
                        <Col id={style.bold}>{element.nombre}</Col>
                        <Col>{element.casa}</Col>
                        <Col>{element.fecha_nacimiento}</Col>
                      </Row>
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
                    <div className={style.categoryBodyBirth} key={index}>
                      <Row>
                        <Col id={style.bold}>{element.nombre}</Col>
                        <Col>{element.casa}</Col>
                        <Col>{element.fecha_nacimiento}</Col>
                      </Row>
                    </div>
                  );
                })}
              </>
            )}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <section>
              <h3 className={style.categoryTitleCertif} id={style.bold}>
                VENCIMIENTO DE CERTIFICADOS
              </h3>
              {hoyCertArray.length > 0 && (
                <>
                  <h5 className={style.categoryTitleCertif} id={style.bold}>
                    HOY
                  </h5>
                  {hoyCertArray.map((element, index) => {
                    return (
                      <div className={style.categoryBodyCertif} key={index}>
                        <Row>
                          <Col id={style.bold}>{element.nombre}</Col>
                          <Col>{element.prestaciones_certificado}</Col>
                          <Col></Col>
                          <Col>{element.fecha_vencimiento_certificado}</Col>
                        </Row>
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
                      <div className={style.categoryBodyCertif} key={index}>
                        <Row>
                          <Col id={style.bold}>{element.nombre}</Col>
                          <Col>{element.prestaciones_certificado}</Col>
                          <Col></Col>
                          <Col>{element.fecha_vencimiento_certificado}</Col>
                        </Row>
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
                      <div className={style.categoryBodyCertif} key={index}>
                        <Row>
                          <Col id={style.bold}>{element.nombre}</Col>
                          <Col>{element.prestaciones_certificado}</Col>
                          <Col></Col>
                          <Col>{element.fecha_vencimiento_certificado}</Col>
                        </Row>
                      </div>
                    );
                  })}
                </>
              )}
            </section>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <section>
              <h3 className={style.categoryTitleTurnos} id={style.bold}>
                TURNOS MEDICOS Y JUDICIALES
              </h3>
              {hoyTurnosArray.length > 0 && (
                <>
                  <h5 className={style.categoryTitleTurnos} id={style.bold}>
                    HOY
                  </h5>
                  {hoyTurnosArray.map((element, index) => {
                    return (
                      <div className={style.categoryBodyTurnos} key={index}>
                        <Row>
                          <Col id={style.bold}>{element.nombre}</Col>
                          <Col>{element.tipo_turno}</Col>
                          <Col>{element.lugar_turno}</Col>
                          <Col>{element.dia_turno}</Col>
                        </Row>
                      </div>
                    );
                  })}
                </>
              )}
              {proxSemTurnosArray.length > 0 && (
                <>
                  <h5 className={style.categoryTitleTurnos} id={style.bold}>
                    PRÓXIMOS 7 DIAS
                  </h5>
                  {proxSemTurnosArray.map((element, index) => {
                    return (
                      <div className={style.categoryBodyTurnos} key={index}>
                        <Row>
                          <Col id={style.bold}>{element.nombre}</Col>
                          <Col>{element.tipo_turno}</Col>
                          <Col>{element.lugar_turno}</Col>
                          <Col>{element.dia_turno}</Col>
                        </Row>
                      </div>
                    );
                  })}
                </>
              )}
              {proxMesTurnosArray.length > 0 && (
                <>
                  <h5 className={style.categoryTitleTurnos} id={style.bold}>
                    PRÓXIMOS 30 DIAS
                  </h5>
                  {proxMesTurnosArray.map((element, index) => {
                    return (
                      <div className={style.categoryBodyTurnos} key={index}>
                        <Row>
                          <Col id={style.bold}>{element.nombre}</Col>
                          <Col>{element.tipo_turno}</Col>
                          <Col>{element.lugar_turno}</Col>
                          <Col>{element.dia_turno}</Col>
                        </Row>
                      </div>
                    );
                  })}
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
