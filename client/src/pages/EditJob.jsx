import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";
import styles from "./css/AddJob.module.css";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../util/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";

const singleJobQuery = (id) => {
  return {
    queryKey: ["jobs", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader = (queryClient) => async (loaderData) => {
  const { params } = loaderData;
  // console.log(params);
  try {
    await queryClient.ensureQueryData(singleJobQuery(params.id));
    return params.id;
    // const { data } = await customFetch.get(`/jobs/${params.id}`);
    // console.log(data);
    // return data;
  } catch (err) {
    // console.log(err)
    toast.error(err?.response?.data?.msg);
    return redirect("/dashboard/allJobs");
  }
};

export const action = (queryClient) => async (data) => {
  const { request, params } = data;
  const formData = await request.formData();
  const inputData = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, inputData);
    queryClient.invalidateQueries(["jobs"]);
    queryClient.invalidateQueries(["job"]);
    toast.success("Job edited successfully.");
    return redirect("/dashboard/allJobs");
    // console.log(inputData);
    // return null;
  } catch (err) {
    toast.error(err?.response?.data?.msg);
    console.log(err);
    return err;
  }
};

const EditJob = () => {
  // const params = useParams();
  // const { theJob: job } = useLoaderData();
  const id= useLoaderData();
  const { data } = useQuery(singleJobQuery(id));
  // console.log(data);
  const { theJob: job } = data;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // console.log(job);
  return (
    <section className={styles["edit-section"]}>
      <Form method="post" className={` ${styles["edit-form"]}}`}>
        <h4 className={`form-title ${styles["edit-title"]}`}>Edit job</h4>
        <div className={styles["form-center"]}>
          <FormRow
            type="text"
            name="position"
            className={styles.row}
            defaultValue={job.position}
          />
          <FormRow
            type="text"
            name="company"
            className={styles.row}
            defaultValue={job.company}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
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
            className={`${styles["form-btn"]} btn btn-block`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </section>
  );
};
export default EditJob;
