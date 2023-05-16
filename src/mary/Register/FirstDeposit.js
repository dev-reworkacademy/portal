import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadCloud } from 'react-feather';
import logo from '../assets/img/logo.png';
import paystack from '../assets/img/paystack.png';
import flutter from '../assets/img/flutter.png';
import '../assets/css/profile.css';
import { Storage } from '../../context/Store';
import { SyncLoader } from 'react-spinners';
import axios from 'axios';

function FirstDeposit({ nextStep, steps }) {
  let navigate = useNavigate();
  let [show, setShow] = useState(true);
  let [uploadStatus, setUploadStatus] = useState(false);
  let [proof, setProof] = useState('');
  let [paymentProof, setPaymentProof] = useState({});
  let data = useContext(Storage);

  let [ae_user_details, ae_setUser_Details] = useState(
    JSON.parse(localStorage.getItem('user')),
  );
  let HOST = data.URL;
  let [ae_user_ID] = data.ae_User_ID;
  let [ae_user_Status] = data.ae_User_Status;

  let [formData, setFormData] = useState(ae_user_details);
  let [isLoading, setIsLoading] = useState(false);
  console.log(ae_user_details);

  const handletabSwitch = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    let file = e.target.files[0].name;
    console.log(file);
    setProof(e.target.files[0].name);
    setPaymentProof(e.target.files[0])
    console.log(file);
    setUploadStatus(true);
  };



  async function handleImageUpload() {
    let url = `${HOST}/payments/${ae_user_ID}/upload`;
    var imgFormData = new FormData();
    imgFormData.append('attachment', paymentProof);
    imgFormData.append('user_id', ae_user_ID);
    imgFormData.append('method', "bank_tranfer");

    await axios
      .postForm(url, imgFormData)
      .then(async(res) => {
        console.log(res.data);
        //alert('Payment Uploaded');
        await handleFormPost();
      })
      .catch((err) => {
        console.log(err);
        alert('An error occured while uploading your payment.... please try again');
        setIsLoading(false);
      });
  }

  async function handleFormPost() {
    let url = `${HOST}/students/${ae_user_ID}/register`;
    console.log(url);

    formData.reg_status = 'UPLOAD';
    formData.avatar = proof;
    let newData = {};
    newData.reg_status = 'UPLOAD';
    console.log(newData);


    fetch(url, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(newData),
    })
      .then((result) => result.json())
      .then(async (res) => {
        if (res.code === 404) {
          alert('error registering');
        } else if (res.code === 200) {
           // alert('post Succccessfully');
          localStorage.setItem('user_status', formData.reg_status);
          localStorage.setItem('user', JSON.stringify(formData));
          console.log(ae_user_Status);
          nextStep('UPLOAD');
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
    setIsLoading(true);
    await handleImageUpload();
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
                      <img src={logo} alt="logo" />
                    </div>
                    <h1 class="h4 form-title">Make your first deposit</h1>
                    <p class="form-description ae_personalForm">
                      Select which method you
                      <br /> want to use to make payment.
                    </p>
                  </div>
                </div>
                {show ? (
                  <div className="pt-4">
                    <div className="text-center ae_stepper_flex justify-content-around ae_payment_tabs">
                      <h1
                        onClick={handletabSwitch}
                        class="h4 form-title ae_debit_font ae_debit_font_active"
                      >
                        Credit / debit card
                      </h1>
                      <h1
                        onClick={handletabSwitch}
                        class="h4 form-title ae_debit_font ae_debit_font_inactive "
                      >
                        Bank transfer
                      </h1>
                    </div>
                    <p className="my-3 text-center ae_paywith">pay with</p>
                    <div className="card-payment-options">
                      <span>
                        <img src={paystack} alt="" />
                      </span>
                      <span>
                        <img src={flutter} alt="" />
                      </span>
                    </div>
                    <button
                      onClick={Forward}
                      class="btn btn-primary btn-user btn-block shadow-lg mt-5 ae_step_btn"
                    >
                      {isLoading ? (
                        <SyncLoader size={8} color="white" />
                      ) : (
                        'Continue'
                      )}
                    </button>
                  </div>
                ) : (
                  <form class="user pt-4">
                    <div className="text-center ae_stepper_flex justify-content-around">
                      <h1
                        onClick={handletabSwitch}
                        className={`h4 form-title ae_debit_font ${
                          !show
                            ? 'ae_debit_font_inactive'
                            : 'ae_debit_font_active'
                        } `}
                      >
                        Credit / debit card
                      </h1>
                      <h1
                        style={{ padding: '0px 10px' }}
                        onClick={handletabSwitch}
                        className={`h4 form-title ae_debit_font ${
                          !show
                            ? 'ae_debit_font_active'
                            : 'ae_debit_font_inactive'
                        } `}
                      >
                        Bank transfer
                      </h1>
                    </div>
                    <div className="ae_bank_desc">
                      {' '}
                      <h6 className="mt-5">
                        Please make your transfer to the bank details below
                      </h6>
                      <h5>Bank Name : GTBank</h5>
                      <br />
                      <h5>Account Name : </h5>
                      <h4>REWORK TECHNOLOGIES</h4>
                      <br />
                      <h5>Account Number : 0500709165</h5>
                    </div>
                    <br />
                    <div
                      className={`col col-sm-12 col-md-12 col-lg-12 form-group ae_session_upload ae_full_width`}
                    >
                      {!uploadStatus ? (
                        <div className="text-center">
                          <div className="ae_upload">
                            <label for="proof">
                              {' '}
                              <UploadCloud size={'50px'} color="#a5abc0" />{' '}
                            </label>
                          </div>

                          <label
                            for="proof"
                            style={{ color: `${uploadStatus ? 'black' : ''}` }}
                          >
                            PLEASE UPLOAD PROOF OF TRANSFER
                          </label>
                          <br />
                          <input
                            title="PLEASE UPLOAD PROOF OF TRANSFER"
                            type="file"
                            id="proof"
                            style={{ display: 'none', cursor: 'pointer' }}
                            onChange={handleChange}
                          />
                        </div>
                      ) : (
                        <div className="d-flex align-items-center px-4">
                          <div className="">
                            <svg
                              width="70"
                              height="70"
                              viewBox="0 0 70 70"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_778_186)">
                                <path
                                  d="M14.5833 5.83337C11.3616 5.83337 8.75 8.45837 8.75 11.6667V35V46.6667V64.1667C8.75 67.375 11.3616 70 14.5833 70H55.4167C58.6396 70 61.25 67.375 61.25 64.1667V46.6667V35V23.3334L43.75 5.83337H14.5833Z"
                                  fill="#95A5A6"
                                />
                                <path
                                  d="M14.5833 2.91663C11.3616 2.91663 8.75 5.54163 8.75 8.74996V32.0833V43.75V61.25C8.75 64.4583 11.3616 67.0833 14.5833 67.0833H55.4167C58.6396 67.0833 61.25 64.4583 61.25 61.25V43.75V32.0833V20.4166L43.75 2.91663H14.5833Z"
                                  fill="#BDC3C7"
                                />
                                <path
                                  d="M61.25 20.4166L43.75 2.91663V14.5833C43.75 17.7916 46.3604 20.4166 49.5833 20.4166H61.25Z"
                                  fill="#95A5A6"
                                />
                                <path
                                  d="M17.5 23.3334V26.25H52.5V23.3334H17.5ZM17.5 32.0834V35H52.5V32.0834H17.5ZM17.5 40.8334V43.75H52.5V40.8334H17.5ZM17.5 49.5834V52.5H52.5V49.5834H17.5Z"
                                  fill="#95A5A6"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_778_186">
                                  <rect width="70" height="70" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div className="text-left ae_upload_msg">
                            <p>{proof}</p>
                            <br />
                            <p>Proof Of Payment</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={Forward}
                      class="btn btn-primary btn-user btn-block shadow-lg mt-5 ae_step_btn"
                    >
                      {isLoading ? (
                        <SyncLoader size={8} color="white" />
                      ) : (
                        'Continue'
                      )}
                    </button>
                  </form>
                )}

                <div class="text-center p-4">
                  <p class="mb-2 form-description small">
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
              <div className="container-fluid ae_stepper_items">
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
                    className={`ae_stepper_line ae_stepper_line_inactive `}
                  ></div>
                </div>
                <div className="ae_step_stage">
                  <div className="ae_stepper_txt ae_stepper_flex ">
                    {' '}
                    <div className="ae_stepper_circle_con">
                      <div
                        className={`ae_stepper_circle ae_circle_inactive`}
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

export default FirstDeposit;
