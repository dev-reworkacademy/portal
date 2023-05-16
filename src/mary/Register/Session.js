import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UploadCloud } from "react-feather";
import logo from "../assets/img/logo.png";
import "../assets/css/profile.css";
import { Storage } from "../../context/Store";
import { SyncLoader } from "react-spinners";
import axios from "axios";


function Session({ nextStep, steps }) {
  let [uploadStatus, setUploadStatus] = useState(false);
  let [certificate, setCertificate] = useState("");
  let data = useContext(Storage);

  let [ae_user_details, ae_setUser_Details] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  let HOST = data.URL;
  let [ae_user_ID] = data.ae_User_ID;
  let [ae_user_Status] = data.ae_User_Status;

  let [AllErrors, setAllErrors] = React.useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [formData, setFormData] = useState(ae_user_details);

  console.log(ae_user_details);

  const handleChange = (e) => {
    let Imgfile = e.target.files[0].name;
    setCertificate(e.target.files[0]);
    console.log(certificate);
    setUploadStatus(true);
  };
  function handleTextChange(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  console.log(formData);

  function handleValidate() {
    if (
      formData.education === "" ||
      formData.course.name === "" ||
      formData.session === "" ||
      formData.occupation === "" ||
      formData.certificate === ""
    ) {
      setAllErrors(true);
    }
  }

  async function handleCrtificatUpload() {
    let url = `${HOST}/students/${ae_user_ID}/resources`;
    console.log(url);

    var imgFormData = new FormData();
    imgFormData.append('certificate', certificate); 

    await axios
        .putForm(url, imgFormData)
        .then((res) => {
          console.log(res.data);
          alert("Cetificate Updated")
          
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
        });
  }

  async function handleFormPost() {
    let url = `${HOST}/students/${ae_user_ID}/register`;
    console.log(url);

    formData.reg_status = "NEXT_KIN";
    
    formData.course.name = formData.course.name;
    formData.session = formData.session;
    formData.education = formData.education;
    formData.occupation = formData.occupation;
    console.log(formData);

    fetch(url, {
      headers: {
       "content-type": "multipart/form-data"
      },
      method: "PUT",
      body: JSON.stringify(formData)
    })
      .then((result) => result.json())
      .then(async (res) => {
        if (res.code === 404) {
          alert("error registering");
        } else if (res.code === 200) {
          //   alert('post');
          localStorage.setItem("user_status", formData.reg_status);
          localStorage.setItem("user", JSON.stringify(formData));
          console.log(ae_user_Status);
          nextStep("NEXT_KIN");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function Forward(e) {
    e.preventDefault();
    handleValidate();
    setIsLoading(true);
    // alert('here');
    await handleCrtificatUpload();
    await handleFormPost();
  }
 
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
                    <h1 class="h4 form-title">Course / Session</h1>
                    <p class="mb-2 form-description ae_personalForm">
                      We need more information from you,please fill
                    </p>
                    <p class="mb-2 form-description ae_personalForm">
                      in the fields below.
                    </p>
                  </div>
                </div>
                <form class="user pt-4" enctype="multipart/form-data">
                  <div class="row">
                    <div className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width">
                      {" "}
                      <label for="course">INTERESTED COURSE</label>
                      <select
                        name="course"
                        title="We need your gender"
                        className={`form-control  ${
                          AllErrors
                            ? formData.course.name === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        } `}
                        id="course"
                        required
                        value={formData.course.name}
                        onChange={(e) => handleTextChange(e)}
                      >
                        <option>{formData.course.name}</option>
                        <option value="Fullstack web development">
                          Fullstack web development
                        </option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Mobile App Development">
                          Mobile App Development
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width">
                      {" "}
                      <label for="session">SELECT SESSION</label>
                      <select
                        name="session"
                        title="session is needed"
                        className={`form-control ${
                          AllErrors
                            ? formData.session === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        } `}
                        id="session"
                        required
                        value={formData.session}
                        onChange={(e) => handleTextChange(e)}
                      >
                        <option>{formData.session}</option>
                        <option value="WEEKDAY">WEEKDAY</option>
                        <option value="WEEKEND">WEEKEND</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width">
                      {" "}
                      <label for="education">
                        ENTER HIGHEST LEVEL OF EDUCATION
                      </label>
                      {/* <div class="form-floating"> */}
                      <select
                        name="education"
                        title="We need your gender"
                        className={`form-control  ${
                          AllErrors
                            ? formData.education === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        } `}
                        id="education"
                        required
                        value={formData.education}
                        onChange={(e) => handleTextChange(e)}
                      >
                        <option>Enter your recent certification</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="PHD">PHD</option>
                      </select>
                      {/* <label for="floatingTextarea2">Comments</label> */}
                      {/* </div> */}
                    </div>
                    <div className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width">
                      {" "}
                      <label for="occupation">CURRENT OCCUPATION</label>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={(e) => handleTextChange(e)}
                        title="Enter First Name"
                        className={`form-control  ${
                          AllErrors
                            ? formData.occupation === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        } `}
                        id="occupation"
                        required
                        aria-describedby="nameHelp"
                        placeholder="Enter your current occupation"
                      />
                    </div>
                  </div>
                  <div className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width ae_session_upload">
                    <div className="text-center">
                      <div className="ae_upload">
                        {uploadStatus ? (
                          ""
                        ) : (
                          <UploadCloud size={"50px"} color="#a5abc0" />
                        )}
                      </div>
                      <label
                        for="certificate"
                        style={{ color: `${uploadStatus ? "black" : ""}` }}
                      >
                        {uploadStatus
                          ? `${certificate.name}`
                          : " Please upload your certificate"}
                      </label>
                      <br />
                      <input
                        title="Please upload your certificate"
                        type="file"
                        id="certificate"
                        required
                        style={{ display: "none", cursor: "pointer" }}
                        onChange={handleChange}
                      />
                    </div>
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
              <div className="container-fluid ae_stepper_items">
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div className="ae_stepper_circle ae_circle_active"></div>
                    </div>
                    <p>Personal</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_active`}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_active
                   `}
                      ></div>
                    </div>{" "}
                    <p>Location</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_active `}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_active `}
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

export default Session;
