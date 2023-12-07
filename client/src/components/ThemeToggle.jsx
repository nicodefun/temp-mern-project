import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useDashboardContext } from "../pages/DashboardLayout";
import styles from "./css/ThemeToggle.module.css";
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <button className={styles["toggle-btn"]} onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className={styles["toggle-icon"]} />
      ) : (
        <BsFillMoonFill className={styles["toggle-icon"]} />
      )}
    </button>
  );
};
export default ThemeToggle;
