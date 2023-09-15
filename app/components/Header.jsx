"use client";

import styles from "./Components.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { signOut } from "next-auth/react";

const home = { route: "/" };
const links = [
  {
    label: "CARGAR PERSONA",
    route: "/cargarPersona",
  },
  {
    label: "GESTIONAR PERSONAS",
    route: "/gestionarPersonas",
  },
];

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a className={styles.brand} href={home.route}>
          CASA BETHEL
        </a>
        <ul className={styles.list}>
          {links.map(({ label, route }) => (
            <li key={route}>
              <a className={styles.button} href={route}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <button className={styles.logOutButton} onClick={() => signOut({ callbackUrl: 'https://bethel-app.netlify.app' })}>CERRAR<br/>SESIÓN</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
