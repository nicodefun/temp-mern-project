import main from "../assets/images/main.svg";
import Logo from "../components/Logo";
import styles from "./css/Landing.module.css";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <section>
      <nav className={styles.nav}>
        <Logo />
      </nav>
      <div className={`container ${styles.page}`}>
        <div className={styles.info}>
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            officiis quas maxime aperiam corrupti repudiandae. Dolor praesentium
            dolore dignissimos totam similique minima quidem sint odio minus
            officiis iste voluptates incidunt aliquid, facilis id. Iste quos
            eius, repellendus sint facere quaerat repudiandae, saepe vero nisi
            id repellat laboriosam adipisci voluptate eos.
          </p>
          <Link to="/register" className={`btn ${styles["register-link"]}`}>
            Register
          </Link>
          <Link to="login" className={`btn ${styles["login-link"]}`}>
            Login / Demo user
          </Link>
        </div>
        <img
          src={main}
          alt="main-image"
          className={`img ${styles["main-img"]}`}
        />
      </div>
    </section>
  );
};
export default Landing;
