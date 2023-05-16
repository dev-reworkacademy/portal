import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Check, EyeOff, Eye } from "react-feather";
import logo from "../assets/img/logo.png";
import "../assets/css/profile.css";
import { Storage } from "../../context/Store";
import { SyncLoader } from "react-spinners";

function Location({ nextStep, steps }) {
  let data = useContext(Storage);
  let [isLoading, setIsLoading] = useState(false);
  let [ae_user_details, ae_setUser_Details] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  let HOST = data.URL;
  let [ae_user_ID] = data.ae_User_ID;
  let [ae_user_Status] = data.ae_User_Status;

  let [AllErrors, setAllErrors] = React.useState(false);
  let [formData, setFormData] = useState(ae_user_details);

  console.log(ae_user_details);

  function handleTextChange(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  console.log(formData);

  function handleValidate() {
    if (formData.country === "" || formData.state === "" || formData.address) {
      setAllErrors(true);
    }
  }

  async function handleFormPost() {
    let url = `${HOST}/students/${ae_user_ID}/register`;
    console.log(url);
    let newData = {};
    formData.reg_status = "COURSE_SESSION";
    newData.reg_status = "COURSE_SESSION";
    newData.country = formData.country;
    newData.state = formData.state;
    newData.address = formData.address;
    console.log(newData);
    console.log("Posting here");

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
          //   alert('post');
          localStorage.setItem("user_status", formData.reg_status);
          localStorage.setItem("user", JSON.stringify(formData));

          console.log(ae_user_Status);
          nextStep("COURSE_SESSION");
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
    // alert('here');
    await handleFormPost();
  }

  console.log(ae_user_details);
  console.log(formData);

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
                    <h1 class="h4 form-title">Location</h1>
                    <p class="mb-2 form-description ae_personalForm">
                      We need more information from you,please fill
                    </p>
                    <p class="mb-2 form-description ae_personalForm">
                      in the fields below.
                    </p>
                  </div>
                </div>
                <form class="user pt-4">
                  <div class="row">
                    <div className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width mt-3">
                      {" "}
                      <label for="country">COUNTRY OF RESIDENCE</label>
                      <select
                        className={`form-control form-control-select ${
                          AllErrors
                            ? formData.country === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        } `}
                        name="country"
                        title="select your country"
                        class=" form-control form-control-select "
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleTextChange(e)}
                        required
                      >
                        <option>{formData.country}</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Aland Islands">Aland Islands</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BQ">
                          Bonaire, Sint Eustatius and Saba
                        </option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BV">Bouvet Island</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">
                          British Indian Ocean Territory
                        </option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CV">Cape Verde</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CD">
                          Congo, Democratic Republic of the Congo
                        </option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Cote D'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CW">Curacao</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FK">Falkland Islands (Malvinas)</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="TF">French Southern Territories</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GG">Guernsey</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HM">
                          Heard Island and Mcdonald Islands
                        </option>
                        <option value="VA">
                          Holy See (Vatican City State)
                        </option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran, Islamic Republic of</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JE">Jersey</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KP">
                          Korea, Democratic People's Republic of
                        </option>
                        <option value="KR">Korea, Republic of</option>
                        <option value="XK">Kosovo</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">
                          Lao People's Democratic Republic
                        </option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libyan Arab Jamahiriya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macao</option>
                        <option value="MK">
                          Macedonia, the Former Yugoslav Republic of
                        </option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MQ">Martinique</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="YT">Mayotte</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">
                          Micronesia, Federated States of
                        </option>
                        <option value="MD">Moldova, Republic of</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MS">Montserrat</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="AN">Netherlands Antilles</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="NU">Niue</option>
                        <option value="NF">Norfolk Island</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau</option>
                        <option value="PS">
                          Palestinian Territory, Occupied
                        </option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PN">Pitcairn</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="QA">Qatar</option>
                        <option value="RE">Reunion</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russian Federation</option>
                        <option value="RW">Rwanda</option>
                        <option value="BL">Saint Barthelemy</option>
                        <option value="SH">Saint Helena</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="MF">Saint Martin</option>
                        <option value="PM">Saint Pierre and Miquelon</option>
                        <option value="VC">
                          Saint Vincent and the Grenadines
                        </option>
                        <option value="WS">Samoa</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="CS">Serbia and Montenegro</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SX">Sint Maarten</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="GS">
                          South Georgia and the South Sandwich Islands
                        </option>
                        <option value="SS">South Sudan</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SJ">Svalbard and Jan Mayen</option>
                        <option value="SZ">Swaziland</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syrian Arab Republic</option>
                        <option value="TW">Taiwan, Province of China</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania, United Republic of</option>
                        <option value="TH">Thailand</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TG">Togo</option>
                        <option value="TK">Tokelau</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TC">Turks and Caicos Islands</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UM">
                          United States Minor Outlying Islands
                        </option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Viet Nam</option>
                        <option value="VG">Virgin Islands, British</option>
                        <option value="VI">Virgin Islands, U.s.</option>
                        <option value="WF">Wallis and Futuna</option>
                        <option value="EH">Western Sahara</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width mt-2 mb-4">
                      {" "}
                      <label for="state">STATE OF RESIDENCE</label>
                      <select
                        className={`form-control form-control-select ${
                          AllErrors
                            ? formData.state === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        } `}
                        name="state"
                        title="provide your state"
                        class=" form-control form-control-select "
                        id="state"
                        value={formData?.state}
                        onChange={(e) => handleTextChange(e)}
                        required
                      >
                        <option>{formData.state}</option>
                        <option value="FCT">FCT</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Port Harcourt">PortHarcort</option>
                        <option value="Benin">Benin</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width mb-3">
                      {" "}
                      <label for="exampleSelectGender">HOME ADDRESS</label>
                      {/* <div class="form-floating"> */}
                      <textarea
                        name="address"
                        className={`form-control form-control-user ${
                          AllErrors
                            ? formData.address === ""
                              ? "is-select-invalid"
                              : "is-select-valid"
                            : ""
                        } `}
                        placeholder="Please Enter Your Residential Address..."
                        id="floatingTextarea2"
                        value={formData.address}
                        style={{ height: "100px" }}
                        onChange={(e) => handleTextChange(e)}
                        required
                      ></textarea>
                      {/* <label for="floatingTextarea2">Comments</label> */}
                      {/* </div> */}
                    </div>
                  </div>

                  <button
                    onClick={Forward}
                    class="btn btn-primary btn-user btn-block shadow-lg mt-5 ae_step_btn"
                  >
                    {isLoading ? <SyncLoader color="white" size={8} /> : "Continue"}
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
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      {" "}
                      <p>Personal</p>
                    </Link>
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
                    <Link
                      to="/register/location"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p>Location</p>
                    </Link>
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
                    <Link
                      to="/register/course"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p>Course / Session</p>
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
                        className={`ae_stepper_circle ae_circle_inactive`}
                      ></div>
                    </div>{" "}
                    <Link
                      to="/register/kinDetails"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p>Next of Kin</p>
                    </Link>
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
                    <Link
                      to="/register/deposit"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p>First Deposit</p>
                    </Link>
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
                    <Link
                      to="/register/accountconfirmation"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p>Account Confirmation</p>
                    </Link>
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

export default Location;
