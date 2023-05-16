import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Check, EyeOff, Eye } from "react-feather";
import logo from "../assets/img/logo.png";
import "../assets/css/profile.css";
import { Storage } from "../../context/Store";
import { SyncLoader } from "react-spinners";

function NextOfKin({ nextStep, steps }) {
  let data = useContext(Storage);

  let [ae_user_details, ae_setUser_Details] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  let HOST = data.URL;
  let [ae_user_ID] = data.ae_User_ID;
  let [ae_user_Status] = data.ae_User_Status;

  let [AllErrors, setAllErrors] = React.useState(false);
  let navigate = useNavigate();
  let [formData, setFormData] = useState(ae_user_details.next_of_kin);
  let [isLoading, setIsLoading] = useState(false);

  console.log(formData);

  function handleTextChange(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  console.log(formData);

  function handleValidate() {
    if (
      formData.title === "" ||
      formData.first_name === "" ||
      formData.last_name === "" ||
      formData.address === "" ||
      formData.gender === "" ||
      formData.other_name === "" ||
      formData.phone === "" ||
      formData.relationship_status === ""
    ) {
      setAllErrors(true);
    }
  }

  async function handleFormPost() {
    let url = `${HOST}/students/${ae_user_ID}/register`;
    console.log(url);

    formData.reg_status = "FIRST_DEPOSIT";
    let newData={}
    newData.reg_status= "FIRST_DEPOSIT";
    newData.kin_title = formData.title;
    newData.kin_first_name = formData.first_name;
    newData.kin_last_name = formData.last_name;
    newData.kin_other_name = formData.other_name;
    newData.kin_gender = formData.gender;
    newData.kin_relationship_status = formData.relationship;
    newData.kin_phone = formData.phone;
    newData.kin_occupation = formData.occupation;
    newData.kin_address = formData.address;

    fetch(url, {
      headers: {
        "content-type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(newData)
    })
      .then((result) => result.json())
      .then(async (res) => {
        if (res.code === 404) {
          alert("error registering");
        } else if (res.code === 200) {
          ae_user_details.next_of_kin = formData;
          localStorage.setItem("user_status", formData.reg_status);
          localStorage.setItem("user", JSON.stringify(ae_user_details));
          console.log(ae_user_Status);
          nextStep("FIRST_DEPOSIT");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setIsLoading(false);
      });
  }

  async function Forward(e) {
    e.preventDefault();
    handleValidate();
    setIsLoading(true);
    await handleFormPost();
  }
  console.log(ae_user_details);
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
                    <h1 class="h4 form-title">Next Of Kin</h1>
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
                        name="title"
                        title="We need your gender"
                        className={`form-control form-control-select is-select-invalid `}
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleTextChange(e)}
                      >
                        <option>{formData.title}</option>
                        <option>Mr</option>
                        <option>Mrs.</option>
                      </select>
                    </div>

                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="kin_firstName">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={(e) => handleTextChange(e)}
                        title="Enter First Name"
                        class="form-control form-control-user"
                        id="kin_firstName"
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
                        class="form-control form-control-user"
                        id="last_name"
                        aria-describedby="nameHelp"
                        placeholder="Enter Last Name"
                      />
                    </div>

                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="kin_middleName">MIDDLE NAME</label>
                      <input
                        type="text"
                        name="other_name"
                        value={formData.other_name}
                        onChange={(e) => handleTextChange(e)}
                        title="Enter Other Name"
                        class="form-control form-control-user"
                        id="kin_middleName"
                        aria-describedby="nameHelp"
                        placeholder="Enter Other Name"
                        required
                      />
                    </div>
                  </div>
                  <div class="row d-flex">
                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="gender">GENDER</label>
                      <select
                        name="gender"
                        title="We need your gender"
                        class=" form-control form-control-select "
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => handleTextChange(e)}
                        required
                      >
                        <option>{formData.gender}</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>

                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="relationship_status">
                        Relationship STATUS
                      </label>
                      <select
                        name="relationship_status"
                        title="We need your gender"
                        class=" form-control form-control-select "
                        id="relationship_status"
                        value={formData.relationship_status}
                        onChange={(e) => handleTextChange(e)}
                        required
                      >
                        <option>{formData.relationship_status}</option>
                        <option>Parent</option>
                        <option>Sibling</option>
                        <option>Guardian</option>
                      </select>
                    </div>
                  </div>
                  <div class="row d-flex">
                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="phone">PHONE</label>
                      <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleTextChange(e)}
                        title="Phone number"
                        class="form-control form-control-user"
                        id="phone"
                        aria-describedby="nameHelp"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>

                    <div className="col col-sm-12 col-md-6 col-lg-6 form-group ae_full_width">
                      {" "}
                      <label for="exampleInputName">
                        OCCUPATION (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={(e) => handleTextChange(e)}
                        title="Kin's occupation"
                        class="form-control form-control-user"
                        id="exampleInputName"
                        aria-describedby="nameHelp"
                        placeholder="Enter Occupation"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="address">HOME ADDRESS</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={(e) => handleTextChange(e)}
                      title="Kinn Home Address"
                      class="form-control form-control-user"
                      id="address"
                      aria-describedby="nameHelp"
                      placeholder="Enter current resident address"
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
                    className={`ae_stepper_line ae_stepper_line_active`}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {" "}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_active`}
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

export default NextOfKin;
