import styles from "./css/Navbar.module.css";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "../components/Logo";
import LogoutContainer from "./LogoutContainer";
import { useDashboardContext } from "../pages/DashboardLayout";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <nav className={styles["nav-bar"]}>
      <div className={styles["nav-center"]}>
        <button
          type="button"
          className={styles["toggle-btn"]}
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo className={styles["nav-logo"]} />
          <h4 className={styles["logo-text"]}>dashboard</h4>
        </div>
        <div className={styles['btn-container']}>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
