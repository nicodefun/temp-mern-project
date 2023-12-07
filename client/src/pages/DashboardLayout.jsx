import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom";
import styles from "./css/Dashboard.module.css";
import SmallSidebar from "../components/SmallSidebar";
import BigSideBar from "../components/BigSidebar";
import NavBar from "../components/NavBar";
import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from "../utils/checkDefaultTheme";
import customFetch from "../utils/customFetch";
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    // console.log(data);
    return data;
  } catch (err) {
    return redirect("/");
  }
};

const DashboardContext = createContext({
  user: "",
  showSidebar: false,
  isDarkTheme: false,
  toggleDarkTheme: () => {},
  toggleSidebar: () => {},
  logoutUser: () => {},
});

const DashboardLayout = () => {
  const {user} = useLoaderData();
  const navigate = useNavigate();
  // console.log(user);

  // const user = { name: "Yonnie" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const themeStatus = !isDarkTheme;
    setIsDarkTheme(themeStatus);
    document.body.classList.toggle("dark-theme", themeStatus);
    localStorage.setItem("darkTheme", themeStatus);
  };
  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const logoutUser = async() => {
    navigate('/');
    await customFetch.get('/auth/logout')
    toast.success('logging out...')
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <section>
        <main className={styles.dashboard}>
          <SmallSidebar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className={styles["dashboard-page"]}>
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </section>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
