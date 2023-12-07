import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import styles from './css/NavLink.module.css';
const NavLinks = (props) => {
    const { toggleSidebar, user } = useDashboardContext();
    
  return (
    <div className={styles["nav-links"]}>
    {links.map((link) => {
      const { text, path, icon } = link;
      const {role} = user;
      if(path === 'admin' && role !==  'admin') return;
      return (
        <NavLink
          to={path}
          key={text}
          className={`${styles["nav-link"]} ${props.className}`}
          onClick={props.isBigSidebar ? null : toggleSidebar}
          end
        >
          <span className={styles.icon}>{icon}</span>
          {text}
        </NavLink>
      );
    })}
  </div>
  );
};
export default NavLinks;
