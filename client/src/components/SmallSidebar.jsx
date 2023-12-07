import styles from "./css/SmallSidebar.module.css";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  const sidebarClass = showSidebar
    ? `${styles["sidebar-container"]} ${styles["show-sidebar"]}`
    : `${styles["sidebar-container"]} `;
  return (
    <aside className={styles["small-aside"]}>
      <div className={sidebarClass}>
        <div className={styles.content}>
          <button
            type="button"
            className={styles["close-btn"]}
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
        <NavLinks />
        </div>
      </div>
    </aside>
  );
};
export default SmallSidebar;
