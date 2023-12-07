import { Link, useRouteError } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import styles from "./css/Error.module.css";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <main className={styles.main}>
        <div>
          <img src={img} alt="error img" className={styles["error-img"]} />
          <h3>ohh! Page not found.</h3>
          <p>Sorry, we couldn't find the page you are looking for....</p>
          <Link to="/dashboard">Back home</Link>
        </div>
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <h1>Error Page</h1>
      <Link to="/">Back Home</Link>
    </main>
  );
};
export default Error;
