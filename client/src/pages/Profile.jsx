import { useOutletContext } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useNavigation, Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import styles from "./css/AddJob.module.css";

export const action = (queryClient)=>async ({request})=>{
const formData = await request.formData();
const file  = formData.get('avatar');
if(file && file.size > 500000){
  toast.error('Image size too large, need to smaller than 0.5Mb.')
  return null
}
try {
  await customFetch.patch('/users/update-user', formData);
  toast.success('Profile updated successfully');
  queryClient.invalidateQueries(['user']);
  return redirect('/dashboard')
} catch (error) {
  toast.error(error?.response?.data?.msg);
  return null;
}
}


const Profile = () => {
  const { user } = useOutletContext();
  const { email, lastName, location, name } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className={styles["profile-section"]}>
      <Form
        method="post"
        className={` ${styles["profile-form"]}}`}
        encType="multipart/form-data"
      >
        <h4 className={`form-title ${styles["profile-title"]}`}>Profile</h4>
        <div className={styles["form-center"]}>
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB)
            </label>
            <input
            type='file'
            id='avatar'
            name='avatar'
            className='form-input'
            accept='image/*'
            />
          </div>
          <FormRow
            type="text"
            name="name"
            className={styles.row}
            defaultValue={name}
          />
          <FormRow
            type="text"
            name="lastName"
            className={styles.row}
            labelText='Last Name'
            defaultValue={lastName}
          />
          <FormRow
            type="email"
            name="email"
            defaultValue={email}
            className={styles.row}
          />
          <FormRow
            type="text"
            name="location"
            defaultValue={location}
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
export default Profile;
