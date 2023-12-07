import { useState } from "react";
import styles from "./css/ChartsContainer.module.css";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <section className={styles["charts-container"]}>
      <h4>Monthly Application</h4>
      <button
        type="button"
        onClick={() => {
          setBarChart((prev) => !prev);
        }}
      >
        {barChart ? `Area Chart` : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </section>
  );
};
export default ChartsContainer;
