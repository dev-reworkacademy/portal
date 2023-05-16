import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Check, EyeOff, Eye } from "react-feather";
import logo from "../assets/img/logo.png";
import "../assets/css/profile.css";
import { Storage } from "../../context/Store";
import axios from "axios";
import { SyncLoader } from "react-spinners";

function Personal({ nextStep, steps }) {
  let data = useContext(Storage);
  let [ae_user_details, ae_setUser_Details] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  let HOST = data.URL;
  let [ae_user_ID] = data.ae_User_ID;
  let [ae_user_Status] = data.ae_User_Status;

  let [AllErrors, setAllErrors] = React.useState(false);
  let [formData, setFormData] = useState(ae_user_details);
  let [isLoading, setIsLoading] = useState(false);

  function handleTextChange(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleValidate() {
    if (
      formData.first_name === "" ||
      formData.last_name === "" ||
      formData.title === "" ||
      formData.other_name === "" ||
      formData.gender === "" ||
      formData.married === "" ||
      formData.phone === "" ||
      formData.reg_status === ""
    ) {
      setAllErrors(true);
    }
  }

  async function handleFormPost() {
    let url = `${HOST}/students/${ae_user_ID}/register`;
    console.log(url);

    let newData = {};
    newData.reg_status = "LOCATION";
    formData.reg_status = "LOCATION";
    newData.title = formData.title;
    newData.first_name = formData.first_name;
    newData.last_name = formData.last_name;
    newData.other_name = formData.other_name;
    newData.gender = formData.gender;
    newData.married = formData.married;
    newData.phone = formData.phone;
    newData.birth_date = formData.birth_date;
    setIsLoading(true);
    console.log(newData);
    console.log("Posting here");

    await axios.put(url, newData)
    .then((res)=>{
      if (res.code === 404) {
        alert("error registering");
      } else if (res.code === 200) {
        //   alert('post');
        localStorage.setItem("user_status", formData.reg_status);
        localStorage.setItem("user", JSON.stringify(formData));

        console.log(ae_user_Status);
        nextStep("LOCATION");
      }
    }).catch((err) => {
      alert(err.message)
      setIsLoading(false);
      console.log(err);
      setIsLoading(false);
    });

   
      
  }

  async function Forward(e) {
    e.preventDefault();
    handleValidate();
   
    // alert('here');
    await handleFormPost();
  }
  // console.log(ae_user_details);
  // console.log(formData);
  return (
    <div id="wrapper" className="page-wrapper mary_bg_color">
      <div
        id="ae_multiform"
        className="d-flex justify-content-center ae_step_container"
      >
        {formData ? (
          <div className="ae_stepForm d-flex shadow-lg">
            <div class="card o-hidden ">
              <div class="card-body">
                <div class="ae_body">
                  <div class="text-center">
                    <div class="ae_logIn_logo">
                      <img src={logo} />
                    </div>
                    <h1 class="h4 form-title">Personal Information</h1>
                    <p class="mb-2 form-description ae_personalForm">
                      We need more information from you,please fill
                    </p>
                    <p class="mb-2 form-description ae_personalForm">
                      in the fields below.
                    </p>
                  </div>
                </div>
                <form class="user pt-4">
                  <div class="row d-flex">
                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="title">Title</label>
                      <select
                        className={`form-control form-control-select ${
                          AllErrors
                            ? formData.title === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        } `}
                        name="title"
                        title="We need your gender"
                        id="title"
                        type="select"
                        value={formData.title}
                        onChange={(e) => handleTextChange(e)}
                        required
                      >
                        <option>{formData.title}</option>
                        <option value="mr">Mr</option>
                        <option value="mrs">Mrs.</option>
                      </select>
                    </div>

                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="first_name">Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={(e) => handleTextChange(e)}
                        title="Enter First Name"
                        class={`form-control form-control-user ${
                          AllErrors
                            ? formData.first_name === ""
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        id="first_name"
                        aria-describedby="nameHelp"
                        placeholder="Enter First Name"
                        required
                      />
                    </div>
                  </div>
                  <div class="row d-flex">
                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="last_name">LAST NAME</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={(e) => handleTextChange(e)}
                        title="Enter Last Name"
                        class={`form-control form-control-user ${
                          AllErrors
                            ? formData.last_name === ""
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        id="last_name"
                        aria-describedby="nameHelp"
                        placeholder="Enter Last Name"
                        required
                      />
                    </div>

                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="other_name">MIDDLE NAME</label>
                      <input
                        type="text"
                        name="other_name"
                        value={formData.other_name}
                        onChange={(e) => handleTextChange(e)}
                        title="Enter Middle Name"
                        class={`form-control form-control-user ${
                          AllErrors
                            ? formData.other_name === ""
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        id="other_name"
                        aria-describedby="nameHelp"
                        placeholder="Enter Middle Name"
                        required
                      />
                    </div>
                  </div>
                  <div class="row d-flex">
                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="exampleSelectGender">GENDER</label>
                      <select
                        name="gender"
                        title="please provide your gender"
                        class={`form-control form-control-select ${
                          AllErrors
                            ? formData.gender === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        }`}
                        id="exampleSelectGender"
                        required
                        value={formData.gender}
                        onChange={(e) => handleTextChange(e)}
                      >
                        <option>{formData.gender}</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="exampleSelectMarital">MARITAL STATUS</label>
                      <select
                        name="married"
                        title="Provide your marital status"
                        class={`form-control form-control-select ${
                          AllErrors
                            ? formData.status === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        }`}
                        id="exampleSelectMarital"
                        required
                        value={formData.status}
                        onChange={(e) => handleTextChange(e)}
                      >
                        <option>{formData.married}</option>
                        <option value="married">Married</option>
                        <option vlaue="single">Single</option>
                        <option value="divorced">Divorced</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPhone">PHONE</label>
                    <input
                      class={`form-control form-control-user ${
                        AllErrors
                          ? formData.phone === ""
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleTextChange(e)}
                      title="Phone number"
                      id="exampleInputPhone"
                      aria-describedby="nameHelp"
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputDOB">DATE OF BIRTH</label>
                    <input
                      type="text"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={(e) => handleTextChange(e)}
                      title="Date of birth"
                      class={`form-control form-control-user ${
                        AllErrors
                          ? formData.birth_date === ""
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="exampleInputDOB"
                      aria-describedby="nameHelp"
                      placeholder="dd-mm-yyyy"
                      min="1997-01-01"
                      max="2030-12-31"
                      required
                    />
                  </div>

                  <button
                    onClick={Forward}
                    class="btn btn-primary btn-user btn-block shadow-lg mt-5 ae_step_btn"
                  >
                    {isLoading ? (
                      <SyncLoader size={8} color="white" />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </form>

                <div class="text-center p-4">
                  <p class="mb-2 form-description small">
                    Have a registered account?{" "}
                    <span>
                      {" "}
                      <Link to="/login" style={{ color: "#3751FF" }}>
                        Sign In
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="ae_stepper">
              <div className="ae_stepper_items">
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div className="ae_stepper_circle ae_circle_active"></div>
                    </div>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      {" "}
                      <p>Personal</p>
                    </Link>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_inactive`}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_inactive
                   `}
                      ></div>
                    </div>{" "}
                    <p>Location</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_inactive `}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_inactive `}
                      ></div>
                    </div>{" "}
                    <p>Course / Session</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_inactive`}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_inactive`}
                      ></div>
                    </div>{" "}
                    <p>Next of Kin</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_inactive `}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_inactive `}
                      ></div>
                    </div>{" "}
                    <p>First Deposit</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_inactive `}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_inactive`}
                      ></div>
                    </div>{" "}
                    <p>Account Confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SyncLoader color="white" size={8} />
        )}
      </div>
    </div>
  );
}

export default Personal;
