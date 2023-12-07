import styles from "./css/Form.module.css";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (err) {
    toast.error(err?.response?.data?.msg);
    return err;
  }
};

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className={styles["register-section"]}>
      <Form method="post" className={`form ${styles["register-form"]}`}>
        <Logo className={styles["register-logo"]} />
        <h4>Register</h4>
        <FormRow name="name" type="text" />
        <FormRow name="lastName" type="text" labelText="LastName" />
        <FormRow name="location" type="text" />
        <FormRow name="email" type="email" />
        <FormRow name="password" type="password" />
        <button
          type="submit"
          className={`btn btn-block ${styles["form-btn"]}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className={styles["member-btn"]}>
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
