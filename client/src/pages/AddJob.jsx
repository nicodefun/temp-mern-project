import FormRow from "../components/FormRow";
import {
  useOutletContext,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import styles from "./css/AddJob.module.css";
import { JOB_STATUS, JOB_TYPE } from "../../../util/constants";
import FormRowSelect from "../components/FormRowSelect";

export const action = async ({request})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(typeof(data));
  try {
    await customFetch.post('/jobs', data);
    toast.success('Job added successfully');
    return redirect('allJobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}


const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className={styles["add-section"]}>
      <Form method="post" className={` ${styles["add-form"]}}`}>
        <h4 className={`form-title ${styles["add-title"]}`}>add job</h4>
        <div className={styles["form-center"]}>
          <FormRow type="text" name="position" className={styles.row} />
          <FormRow type="text" name="company" className={styles.row} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
            className={styles.row}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
            className={styles.row}
          />
           <FormRowSelect
            name="jobType"
            labelText="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
            className={styles.row}
          />
          <button
            type="submit"
            className={ `${styles["form-btn"]} btn btn-block`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </section>
  );
};

export default AddJob;
