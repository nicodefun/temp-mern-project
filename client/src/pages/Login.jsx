import { Link, redirect, Form, useNavigation , useNavigate} from "react-router-dom";
import styles from "./css/Form.module.css";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post("/auth/login", data);
    toast.success('successful login!')
    return redirect("/dashboard");
  } catch (err) {
    toast.error(err?.response?.data?.msg || "Something  went wrong...");
    return err;
  }
};

const Login = () => {
  //test user
  const navigate = useNavigate();
  const loginTestUser = async()=>{
    try{
      const data ={
        email: "test@test.com",
        password: "secret123",
      }
      await customFetch.post("/auth/login", data);
    toast.success('Take a demo drive.')
    navigate('/dashboard')
    
    }catch(err){
      toast.error(err?.response?.data?.msg || "Something  went wrong...");
    }
  }
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className={styles["register-section"]}>
      <Form method='post' className={`form ${styles["register-form"]}`}>
        <Logo className={styles["register-logo"]} />
        <h4>Login</h4>
        <FormRow name="email" type="email" />
        <FormRow name="password" type="password" />
        <button
          type="submit"
          className={`btn btn-block ${styles["form-btn"]}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting" : "submit"}
        </button>
        <button
          type="button"
          className={`btn btn-block ${styles["explore-btn"]}`}
          onClick={loginTestUser}
        >
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className={styles["member-btn"]}>
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
