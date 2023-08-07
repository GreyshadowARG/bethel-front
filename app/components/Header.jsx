import styles from "./Components.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
const home = { route: "/" }
const links = [
  {
    label: "CARGAR PERSONA",
    route: "/cargarPersona",
  },
  {
    label: "GESTIONAR PERSONA",
    route: "/gestionarPersona",
  },
];

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a className={styles.brand} href={home.route}>CASA BETHEL</a>
        <ul className={styles.list}>
          {links.map(({ label, route }) => (
            <li key={route}>
              <a className={styles.button} href={route}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
