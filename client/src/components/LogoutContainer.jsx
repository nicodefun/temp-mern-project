import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import styles from "./css/LogoutContainer.module.css";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  const dropdownClass = showLogout
    ? `${styles.dropdown} ${styles["show-dropdown"]}`
    : `${styles.dropdown}`;
  return (
    <div className={styles["logout-container"]}>
      <button
        className={`btn ${styles["logout-btn"]}`}
        onClick={() => {
          setShowLogout((prev) => !prev);
        }}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className={styles['avatar-img']} />
        ) : (
          <FaUserCircle />
        )}

        {user?.name}
        <FaCaretDown />
      </button>
      <div className={dropdownClass}>
        <button
          type="button"
          className={styles["dropdown-btn"]}
          onClick={logoutUser}
        >
          logout
        </button>
      </div>
    </div>
  );
};
export default LogoutContainer;
