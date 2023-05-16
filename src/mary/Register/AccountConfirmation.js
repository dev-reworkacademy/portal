import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'react-feather';
import logo from '../assets/img/logo.png';
import '../assets/css/profile.css';
import { Storage } from '../../context/Store';
import { SyncLoader } from 'react-spinners';
import axios from 'axios';

function AccountConfirmation({ nextStep, steps }) {
  let navigate = useNavigate();
  let [uploadStatus, setUploadStatus] = useState(false);
  let [passport, setPassort] = useState({});
  let [passportPreview, setPassortPreview] = useState('');
  let data = useContext(Storage);
  let [ae_user_details, ae_setUser_Details] = useState(
    JSON.parse(localStorage.getItem('user')),
  );
  let HOST = data.URL;
  let [ae_user_ID] = data.ae_User_ID;
  let [ae_user_Status] = data.ae_User_Status;
  let [isLoading, setIsLoading] = useState(false);
  let [formData, setFormData] = useState(ae_user_details);

  const handleChange = (e) => {
    let file = e.target.files[0].name;
    setPassort(e.target.files[0]);
    setPassortPreview(URL.createObjectURL(e.target.files[0]));

    setUploadStatus(true);
  };

  async function handleImageUpload() {
    let url = `${HOST}/students/${ae_user_ID}/resources`;

    var imgFormData = new FormData();
    imgFormData.append('avatar', passport);

    await axios
      .putForm(url, imgFormData)
      .then(async(res) => {
        console.log(res.data);
        alert('Passport Uploaded');
        await handleFormPost();
      })
      .catch((err) => {
        console.log(err);
        alert('An error occured while uploading your passport.... Please reduce size to 300KB below and upload again');
        setIsLoading(false);
      });
  }

  async function handleFormPost() {
    let url = `${HOST}/students/${ae_user_ID}/register`;
    console.log(url);
    formData.reg_status = 'COMPLETED';

    await axios
      .putForm(url, formData)
      .then((res) => {
        console.log(res.data);
        if (res.code === 404) {
          alert('error registering');
        } else if (res.data.code === 200) {
          localStorage.setItem('user_status', formData.reg_status);
          localStorage.setItem('user', JSON.stringify(formData));
          console.log(ae_user_Status);
          // nextStep("COMPLETED");
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  async function Forward(e) {
    e.preventDefault();
    setIsLoading(true);
    await handleImageUpload();
    
  }
  return (
    <div id="wrapper" className="page-wrapper mary_bg_color mb-2">
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
                    <h1 class="h4 form-title">Passport Upload / Confimation</h1>
                    <p class="mb-2 form-description ae_personalForm">
                      Please upload a passport photograph of you,{' '}
                    </p>
                  </div>
                </div>
                <form class="user pt-3">
                  <div className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width ">
                    <div className="text-center">
                      {uploadStatus ? (
                        <div className="mb-5">
                          <label for="certificate">
                            {' '}
                            <div className="ae_upload_photo_" for="certificate">
                              <img src={passportPreview} alt="passport" />
                            </div>
                          </label>
                          <p>{passport.name}</p>
                          <p>PASSPORT</p>
                        </div>
                      ) : (
                        <label for="certificate">
                          {' '}
                          <div className="ae_upload_photo_con mb-5 ">
                            {' '}
                            <div className="ae_upload_photo">
                              <User size={'80px'} color="#858796" />
                            </div>
                          </div>
                        </label>
                      )}
                      <label
                        className="mt-5"
                        for="certificate"
                        style={{ color: `${uploadStatus ? 'black' : ''}` }}
                      >
                        {uploadStatus
                          ? ''
                          : ' Please upload a passport photograph of you'}
                      </label>
                      <br />
                      <input
                        title="Please upload your certificate"
                        type="file"
                        id="certificate"
                        style={{ display: 'none', cursor: 'pointer' }}
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
                      'Check for account confirmation'
                    )}
                  </button>
                </form>

                <div class="text-center p-4">
                  <p class=" form-description small">
                    Have a registered account?{' '}
                    <span>
                      {' '}
                      <Link to="/login" style={{ color: '#3751FF' }}>
                        Sign In
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="ae_stepper">
              <div className="container-fluid ae_stepper_confirm">
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {' '}
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
                    {' '}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_active
                   `}
                      ></div>
                    </div>{' '}
                    <p>Location</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_active `}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {' '}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_active `}
                      ></div>
                    </div>{' '}
                    <p>Course / Session</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_active`}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {' '}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_active`}
                      ></div>
                    </div>{' '}
                    <p>Next of Kin</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_active `}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {' '}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_active `}
                      ></div>
                    </div>{' '}
                    <p>First Deposit</p>
                  </div>
                  <div
                    className={`ae_stepper_line ae_stepper_line_active `}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {' '}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_active`}
                      ></div>
                    </div>{' '}
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

export default AccountConfirmation;
