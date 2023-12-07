import styles from './css/BigSidebar.module.css';
import NavLinks from './NavLinks';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';

const BigSideBar = () => {
    const {showSidebar} = useDashboardContext();
    const sidebarClass = showSidebar
    ? `${styles["sidebar-container"]}`
    : `${styles["sidebar-container"]} ${styles["show-sidebar"]}`;
  return (
    <aside className={styles['big-aside']}>
        <div className={sidebarClass}>
            <div className={styles.content}>
                <header className={styles.header}><Logo/></header>
            </div>
            <NavLinks className={styles['nav-link-big']} isBigSidebar />
        </div>
    </aside>
  )
}
export default BigSideBar