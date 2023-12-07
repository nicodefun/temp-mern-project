import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import StatItem from "../components/StatItem";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import styles from "./css/StatsContainer.module.css";
import { redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/app-stats");
    return data;
  } catch (err) {
    toast.error("You are not authorized to view this page.");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();
  // console.log(jobs);
  return (
    <section className={styles["stat-container"]}>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </section>
  );
};

export default Admin;
