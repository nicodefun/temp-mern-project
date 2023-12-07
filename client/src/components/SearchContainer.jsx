
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import styles from "../pages/css/AddJob.module.css";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../util/constants";
import { useAllJobsContext } from "../pages/AllJobs";
import { Form, Link, useNavigation, useSubmit } from "react-router-dom";

const SearchContainer = () => {
  const {searchValues} = useAllJobsContext();
  const submit = useSubmit();

  const debounce = (onChangeFunction)=>{
    let timeout;
    return (e)=>{
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(()=>{
        onChangeFunction(form)
      }, 2000)
    }
  }
  // const isSubmitting = navigation.state === "submitting";
  return (
    <section className={styles["search-container"]}>
      <Form method="get" className={` ${styles["search-form"]}}`}>
        <h4 className={`form-title ${styles["search-title"]}`}>Search Job</h4>
        <div className={styles["form-center"]}>
          <FormRow
            type="search"
            name="search"
            className={styles.row}
            defaultValue={searchValues.search}
            // onChange={(e)=>{
            //   submit(e.currentTarget.form)
            // }}
            onChange={debounce((formData)=>{
              submit(formData)
            })}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={searchValues.jobStatus}
            className={styles.row}
            onChange={(e)=>{
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={searchValues.jobType}
            className={styles.row}
            onChange={(e)=>{
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            name="sort"
            list={[...Object.values(JOB_SORT_BY)]}
            defaultValue={searchValues.sort}
            className={styles.row}
            onChange={(e)=>{
              submit(e.currentTarget.form)
            }}
          />
          <Link to="/dashboard/allJobs" className={`${styles["form-btn"]} btn delete-btn`}>
            Reset Search Value
          </Link>
          {/* <button
            type="submit"
            className={`${styles["form-btn"]} btn btn-block`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting" : "submit"}
          </button> */}
        </div>
      </Form>
    </section>
  );
};
export default SearchContainer;
