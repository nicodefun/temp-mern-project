import JobInfo from "./JobInfo";
import { Link, Form } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import styles from "./css/Job.module.css";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

// createdAt: "2023-12-05T12:48:48.538Z"
const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <article className={styles["job-article"]}>
      <header>
        <div className={styles["main-icon"]}>{company.charAt(0)}</div>
        <div className={styles.info}>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className={styles["article-content"]}>
        <div className={styles["content-center"]}>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`${styles.status} ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className={styles["job-actions"]}>
          <Link to={`../editJob/${_id}`} className={`btn ${styles["edit-btn"]}`}>
            Edit
          </Link>
          <Form method='post' action={`../deleteJob/${_id}`}>
            <button type="submit" className={`btn ${styles["delete-btn"]}`}>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </article>
  );
};
export default Job;
