import React, { useState } from "react";
import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  MdEmail,
  MdLock,
  MdArrowDropDown,
  MdError,
  MdFacebook,
} from "react-icons/md";
import { countryCodes } from "./countryCodes";
import fbIcon from "./fb.svg";
import googleIcon from "./google.svg";

// this is just a variable that hold the name of the system
const systemName = "System Name";
//With the description you can just set it to and empty string if you dont have any use of it
const description = `You can input your description here !! You can input your
description here !! You can input your description here !!`;
// const description = ``;
function App() {
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string().email().required("Email is required").label("Email"),
  //     password: Yup.string().required("Password is required"),
  //   }),
  //   onSubmit: (values) => {
  //     console.log("Email", values.email, "Password:", values.password);

  //     //  previewing the retrieved data from the form you will have to remove the line below since it wont be useful
  //     alert(`Email: ${values.email}\nPassword: ${values.password}`);

  //     // here is where you submit the form data to a backend server here if needed
  //   },
  // });
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(9, "Phone must be at least 9 digits"),
  });

  const formik = useFormik({
    initialValues: {
      country: "+233",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log("Form submitted with values:", values);
      alert(`Phone Number: ${values.country}${values.phone}`);
    },
  });
  const [inputFocused, setInputFocused] = useState(false);
  // this is the state variables to control the visiblity of the country code prefix in the inputContainer
  // the below function is executed when the textinput has been focused
  const handleInputFocus = () => {
    setInputFocused(true);
  };
  const handleInputBlur = () => {
    // this line checkes wheter the value of the phone is not null to apply the inputfocus state to the prefix
    formik.values.phone ? setInputFocused(true) : setInputFocused(false);
  };
  return (
    // <div className="App">
    //   <div className="formSide container">
    //     <form onSubmit={formik.handleSubmit} method="post" className="form">
    //       <p
    //         className="header"
    //         style={{ paddingBottom: description === "" ? 30 : 0 }}
    //       >
    //         Login to {systemName}
    //       </p>
    //       {description !== "" && <p className="description">{description}</p>}
    //       <div className="inputGroup">
    //         <label className="label">
    //           <MdEmail size={20} style={{ color: "black", paddingRight: 5 }} />
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           name="email"
    //           {...formik.getFieldProps("email")}
    //           placeholder="youremail@mail.com"
    //           className={`${
    //             formik.touched.email && formik.errors.email ? "error-input" : ""
    //           }`}
    //         />
    //       </div>
    //       <div className="error-container first">
    //         {formik.touched.email && formik.errors.email && (
    //           <p className="error">{formik.errors.email}</p>
    //         )}
    //       </div>
    //       <div className="inputGroup">
    //         <label className="label">
    //           <MdLock size={20} style={{ color: "black", paddingRight: 5 }} />
    //           Password
    //         </label>
    //         <input
    //           name="password"
    //           type="password"
    //           {...formik.getFieldProps("password")}
    //           placeholder="Your password"
    //           className={`${
    //             formik.touched.password && formik.errors.password
    //               ? "error-input"
    //               : ""
    //           }`}
    //         />
    //       </div>
    //       <div className="error-container">
    //         {formik.touched.password && formik.errors.password && (
    //           <p className="error">{formik.errors.password}</p>
    //         )}
    //       </div>

    //       <input type="submit" value="Log In" className="button" />
    //     </form>
    //   </div>
    //   {/* to replace the background image of the div below look for that class in the app.css file and change the image to the image of your hoice */}
    //   <div className="imageSide" />
    // </div>
    <div className="container">
      <div className="NewApp">
        <div className="LoginFormContainer">
          <h3 className="newAppheader">Welcome to Airbnb</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="formField">
              <div className="countryPicker">
                <p className="countryLabel">Country/Region</p>
                <select
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // value={formik.values.country}
                >
                  <option value="+233">Ghana(+233)</option>
                  {countryCodes.map((country) => (
                    <option key={country?.label} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={`phoneNumberContainer ${
                  formik.touched.phone && formik.errors.phone
                    ? "error-input"
                    : ""
                }`}
              >
                {inputFocused && (
                  <p
                    className="prefix"
                    style={{
                      color: formik.values.phone ? "black" : "grey",
                    }}
                  >
                    {formik.values.country}
                  </p>
                )}
                <input
                  name="phone"
                  inputMode="tel"
                  maxLength={9}
                  style={{ paddingLeft: inputFocused ? 7 : 0 }}
                  type="tel"
                  placeholder={inputFocused ? "" : "Phone number"}
                  onChange={formik.handleChange}
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  value={formik.values.phone}
                />
              </div>
            </div>

            {formik.touched.phone && formik.errors.phone && (
              <p className="error">
                <MdError
                  size={17}
                  style={{
                    color: "rgb(255, 99, 99)",
                    paddingRight: 5,
                  }}
                />
                {formik.errors.phone}
              </p>
            )}

            <p className="privacyText">
              We'll call or text you to confirm your number. Standard message
              and data rates apply.<a href="#">Privacy Policy</a>
            </p>

            <input type="submit" value="Continue" className="button" />
          </form>
          <div className="line-container">
            <div className="left-line"></div>
            <div className="content">or</div>
            <div className="right-line"></div>
          </div>

          <div className="socialBtn">
            <img src={fbIcon} className="socialIcon" />
            <span className="socialBtnText">Continue with FaceBook</span>
          </div>

          <div className="socialBtn">
            <img src={googleIcon} className="socialIcon" />
            <span className="socialBtnText">Continue with FaceBook</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
