import React from "react";
import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdEmail, MdLock } from "react-icons/md";

// this is just a variable that hold the name of the system
const systemName = "System Name";
//With the description you can just set it to and empty string if you dont have any use of it
const description = `You can input your description here !! You can input your
description here !! You can input your description here !!`;
// const description = ``;
function App() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required").label("Email"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Email", values.email, "Password:", values.password);

      //  previewing the retrieved data from the form you will have to remove the line below since it wont be useful
      alert(`Email: ${values.email}\nPassword: ${values.password}`);

      // here is where you submit the form data to a backend server here if needed
    },
  });

  return (
    <div className="App">
      <div className="formSide container">
        <form onSubmit={formik.handleSubmit} method="post" className="form">
          <p
            className="header"
            style={{ paddingBottom: description === "" ? 30 : 0 }}
          >
            Login to {systemName}
          </p>
          {description !== "" && <p className="description">{description}</p>}
          <div className="inputGroup">
            <label className="label">
              <MdEmail size={20} style={{ color: "black", paddingRight: 5 }} />
              Email
            </label>
            <input
              type="email"
              name="email"
              {...formik.getFieldProps("email")}
              placeholder="youremail@mail.com"
              className={`${
                formik.touched.email && formik.errors.email ? "error-input" : ""
              }`}
            />
          </div>
          <div className="error-container first">
            {formik.touched.email && formik.errors.email && (
              <p className="error">{formik.errors.email}</p>
            )}
          </div>
          <div className="inputGroup">
            <label className="label">
              <MdLock size={20} style={{ color: "black", paddingRight: 5 }} />
              Password
            </label>
            <input
              name="password"
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="Your password"
              className={`${
                formik.touched.password && formik.errors.password
                  ? "error-input"
                  : ""
              }`}
            />
          </div>
          <div className="error-container">
            {formik.touched.password && formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
          </div>

          <input type="submit" value="Log In" className="button" />
        </form>
      </div>
      {/* to replace the background image of the div below look for that class in the app.css file and change the image to the image of your hoice */}
      <div className="imageSide" />
    </div>
  );
}

export default App;
