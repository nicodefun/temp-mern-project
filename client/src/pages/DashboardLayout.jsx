import {
  Outlet,
  useLoaderData,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import styles from "./css/Dashboard.module.css";
import SmallSidebar from "../components/SmallSidebar";
import BigSideBar from "../components/BigSidebar";
import NavBar from "../components/NavBar";
import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from "../utils/checkDefaultTheme";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ['user'],
  queryFn: async ()=>{
    const { data } = await customFetch.get("/users/current-user");
    return data;
  }
}

export const loader =(queryClient)=> async () => {
  try {
    return await queryClient.ensureQueryData(userQuery)
    // const { data } = await customFetch.get("/users/current-user");
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

const DashboardLayout = ({queryClient}) => {
  // const { user } = useLoaderData();
  const {user} = useQuery(userQuery).data;
  const navigate = useNavigate();
  // console.log(user);
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  // console.log(isPageLoading)
  // const user = { name: "Yonnie" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);
  const toggleDarkTheme = () => {
    const themeStatus = !isDarkTheme;
    setIsDarkTheme(themeStatus);
    document.body.classList.toggle("dark-theme", themeStatus);
    localStorage.setItem("darkTheme", themeStatus);
  };
  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("logging out...");
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);


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
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </section>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
