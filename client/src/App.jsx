import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Login,
  Register,
  Landing,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
  DeleteJob,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addJobAction } from "./pages/AddJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { action as profileAction } from "./pages/Profile";

import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { loader as adminLoader } from "./pages/Admin";
import { loader as statsLoader } from "./pages/Stats";
import { checkDefaultTheme } from "./utils/checkDefaultTheme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// export const checkDefaultTheme = () => {
//   const isDarkTheme = localStorage.getItem("darkTheme") === "true";
//   document.body.classList.toggle("dark-theme", isDarkTheme);
//   return isDarkTheme;
// };

import ErrorElement from "./components/ErrorElement";

checkDefaultTheme();

//react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      { path: "login", element: <Login />, action: loginAction(queryClient) },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          { index: true, element: <AddJob />, action: addJobAction(queryClient) },
          {
            path: "stats",
            element: <Stats />,
            // loader: statsLoader,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "allJobs",
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          { path: "admin", element: <Admin />, loader: adminLoader },
          {
            path: "editJob/:id",
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          {
            path: "deleteJob/:id",
            element: <DeleteJob />,
            action: deleteJobAction(queryClient),
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
