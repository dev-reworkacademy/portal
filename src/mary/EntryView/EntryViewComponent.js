import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Storage } from '../../context/Store';
import { UploadCloud } from 'react-feather';
import '../assets/css/entryView.css';
import axios from 'axios';
import LoadingMsg from "../../components/LoadingMsg";
import {SyncLoader} from 'react-spinners'
function EntryViewComponent() {
  let data = useContext(Storage);
  const [baseUrl] = useState('https://reworkacademy.co/app/v2/');
  let [ae_fullStack, ae_setFullStack] = data.ae_FullStackState;
  let [ae_user_ID] = data.ae_User_ID;
  let [
    ae_projectAssigned,
    ae_setprojectAssigned,
  ] = data.ae_ProjectAssignedState;
  let [
    ae_projectSubmitted,
    ae_setprojectSubmitted,
  ] = data.ae_ProjectSubmittedstate;
  let [projectFile, setprojectFile] = useState('');
  const [phase_id, setPhaseId] = useState('');
  const [assessment_id, setAssessmentId] = useState('');
  let fileName;
  let [uploadStatus, setUploadStatus] = useState(false);
  let [imagePreview, setImagePreview] = useState('');
  let [userProject, setUserProject] = useState({});
  let [projectMsg, setProjectMsg] = useState('');
  let [isLoading, setIsLoading] = useState(false);
 
  const [deadline, setDeadline] = useState(Date.now());
  const [timer, setTimer] = useState(0)
  let [projectExpired, setExpired] = useState(false);
  let [countDownTime, setCountDownTime] = useState('');
  const [coutDown, setCountDown] = useState(0);
  let interval;


  let viewStudentProject = () => {
    setIsLoading(true)
    let url =
      baseUrl + `students/${ae_user_ID}/assessments?type=current_project`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (ae_user_ID) {
          setUserProject(res);
          setPhaseId(res.phases[0].id);
          setAssessmentId(res.id);
          setDeadline(res.end_date_timestamp);

        }
        if (ae_user_ID && res.type === 'NOT_ASSIGNED') {
          setProjectMsg(res.msg);
        }
        setIsLoading(false)
      });

  };

  useEffect(() => {
    viewStudentProject() 

  }, []);

  useEffect(() => {
    setInterval(function () {
      setCountDown(coutDown+1);
      const time = new Date(parseInt(deadline)).getTime() - Date.now();
      let days,hours,minutes,seconds;
      if (time <= 0) {
        days=0;
        hours=0
        minutes=0;
        seconds=0; 
      } else {
        days=Math.floor(time / (1000 * 60 * 60 * 24));
        hours=Math.floor((time / (1000 * 60 * 60)) % 24);
        minutes=Math.floor((time / 1000 / 60) % 60);
        seconds=Math.floor((time / 1000) % 60);
      }
        setCountDownTime(<><div>
          <h1>{days}</h1>
          <h4>DAYS</h4>
        </div>
          <div>
            <h1>{hours}</h1>
            <h4>HR</h4>
          </div>
          <div>
            <h1>{minutes}</h1>
            <h4>MIN</h4>
          </div>
          <div>
            <h1>{seconds}</h1>
            <h4>SEC</h4>
          </div></>)
  
      }, 1000) 

  }, [coutDown]);

  const handleChange = (e) => {
    fileName = e.target.files[0].name;
    setprojectFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));

    setUploadStatus(true);
  };

  //   const handleProjectSubmit = () => {
  //     ae_setprojectSubmitted(true);
  //   };
  async function handleProjectSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    let url = `${baseUrl}assessments/submit`;
    console.log(phase_id);
    var entryFormData = new FormData();

    entryFormData.append('resource', projectFile);
    entryFormData.append('assessment_id', assessment_id);
    entryFormData.append('phase_id', phase_id);
    entryFormData.append('user_id', ae_user_ID);

    console.log(entryFormData);
    await axios
      .post(url, entryFormData)
      .then((res) => {
        if (res.status === 200) {

          setIsLoading(false)
          ae_setprojectSubmitted(true);
        } else {
          alert('Error Uploading Project... Please try again');
          setIsLoading(false)
          ae_setprojectSubmitted(false);
        }
      })
      .catch((err) => {
        console.log(err);
        // setIsLoading(false);
      });
  }
  const downloadTxtFile = () => {
    // text content
    const texts = ['line 1', 'line 2', 'line 3'];
    // file object
    const file = new Blob(texts, { type: 'text/plain' });
    // anchor link
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = '100ideas-' + Date.now() + '.txt';
    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const loadProjectResourcesView=()=>{
    if(userProject.title == null){
      return (<div className="text-center" >
      <h4>Project Not assigned !</h4>
      <p>Complete assessment class to get your project</p><br /><br /></div>)
    }else{
      return (<>
        <p>(Duration: {userProject.duration})</p><br />
        <p>Brief Description:</p>
        {userProject.descp}

        {userProject.phases?.map((e) => {

          return (
            <button
              className="mt-3 mb-4 col col-sm-12 col-md-8 col-lg-8  btn btn-primary btn-user btn-block shadow-lg py-3"
              id="downloadBtn"
              value="download"
            >
              <link size="12px" />
              <a
                href={userProject.resource_links}
                download
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Click here to download resources
              </a>
            </button>
          );
        })}
      </>)
    }
  }

  

  return (
    <>
      {isLoading?<LoadingMsg/>:<><div className="ae_entry_view row d-flex ">
        {ae_projectSubmitted === true ? (
          ''
        ) : (
          <div className="ae_entry_main col col-sm-12 col-md-6 col-lg-6">
            {userProject ? (

              <div class="card mb-4">
                <div class="card-header">
                  <p className="ae_entry_title">Project Information</p>
                  <div className="ae_entry_main_title">
                    <h1>{userProject.title}</h1>
                  </div>
                </div>
                <div class="card-body">
                  {loadProjectResourcesView() }

                </div>
              </div>
            ) : (
              <div class="card mb-4">
                <div class="card-body">
                  <p>Message:</p>
                  {projectMsg}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="ae_entry_side  col col-sm-12 col-md-6 col-lg-6 ">
          <div className="row">
            {' '}
            {ae_projectSubmitted === true ? (
              ''
            ) : (
              <div class="col col-sm-12 col-md-12 col-lg-12">
                
                 {new Date(parseInt(deadline)).getTime() - Date.now() <=0? <div class="card mb-4">
                 <div class="card-header text-center">
                   <p className="ae_font_weight">Project Status</p>
                   <h1 className='text-danger'>Project Expired</h1>
                 </div>
                 <hr />
               </div> : 
                <form
                  onSubmit={handleProjectSubmit}
                  enctype="multipart/form-data"
                >
                  <div class="card mb-4">
                    <div class="card-header text-center">
                      <p className="ae_font_weight">Count Down Timer</p>
                      <div className="d-flex justify-content-around align-items-center ae_countdown">
                        
                        
                        {countDownTime}
                      </div>
                    </div>
                    <hr />
                    {userProject.title == null ? <></> : <div class="card-body ae_countdown_upload">
                      <p className="text-center text-black ae_font_weight ae_countdown_txt">
                        Submit Your Project
                      </p>
                      <div
                        for="assessmentproject"
                        className="col col-sm-12 col-md-12 col-lg-12 form-group ae_full_width ae_session_upload"
                      >
                        {uploadStatus ? (
                          <div className="text-center ">
                            <br />{' '}
                            <div className="ae_upload_name">
                              <label for="assessmentproject">
                                <p>{projectFile.name}</p>
                              </label>{' '}
                            </div>
                            <label for="assessmentproject">
                              {' '}
                              <p>FILE UPLOADED SUCCESSFULLY</p>
                            </label>
                          </div>
                        ) : (
                          <div className="text-center py-1 ">
                            {/* <label for="assessmentproject" > */}
                            <div className="ae_upload ">
                              <label for="assessmentproject">
                                <UploadCloud size={'40px'} color="black" />
                              </label>
                            </div>
                            <br />
                            {/* </label> */}
                            <label
                              for="assessmentproject"
                              className="ae_font_weight text-black"
                            >
                              Click here to upload your zip folder
                            </label>
                            <br />
                            <input
                              title="Click here to upload your zip folder"
                              type="file"
                              id="assessmentproject"
                              style={{ display: 'none', cursor: 'pointer' }}
                              onChange={handleChange}
                            />
                          </div>
                        )}
                      </div>
                      <div className="ae_countdown_btn">
                        {' '}
                        <button
                          className="mt-3 mb-2 col col-sm-12 col-md-12 col-lg-12  btn btn-primary btn-user btn-block shadow-lg py-3"
                          type="submit"
                        >
                          {/* <link size="12px" /> */}


                          {isLoading ? (
                            <SyncLoader size={8} color="white" />
                          ) : (
                            " Submit Project"
                          )}
                        </button>
                      </div>
                    </div>}

                  </div>
                </form>}

              </div>
            )}
          </div>
        </div>
      </div>
      {ae_projectSubmitted === false ? (
        ''
      ) : (
        <div className="ae_entry_submit">
          {' '}
          <div class="col col-sm-12 col-md-12 col-lg-12">
            <div class="card mb-4 text-center text-black ae_font_weight">
              <div class="card-header">
                <svg
                  width="209"
                  height="209"
                  viewBox="0 0 209 209"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M131.499 11.3645C127.983 7.76629 123.784 4.90718 119.147 2.95515C114.51 1.00312 109.53 -0.00244141 104.499 -0.00244141C99.4684 -0.00244141 94.4883 1.00312 89.8516 2.95515C85.2149 4.90718 81.0151 7.76629 77.4991 11.3645L69.3742 19.6984L57.7486 19.5547C52.7162 19.4951 47.7228 20.4424 43.0619 22.3407C38.401 24.2391 34.1667 27.0503 30.6081 30.6089C27.0494 34.1676 24.2383 38.4018 22.3399 43.0628C20.4415 47.7237 19.4943 52.7171 19.5538 57.7494L19.6844 69.375L11.3767 77.4999C7.7785 81.016 4.91938 85.2157 2.96735 89.8524C1.01533 94.4892 0.00976563 99.4693 0.00976562 104.5C0.00976563 109.531 1.01533 114.511 2.96735 119.148C4.91938 123.785 7.7785 127.984 11.3767 131.5L19.6975 139.625L19.5538 151.251C19.4943 156.283 20.4415 161.277 22.3399 165.937C24.2383 170.598 27.0494 174.833 30.6081 178.391C34.1667 181.95 38.401 184.761 43.0619 186.659C47.7228 188.558 52.7162 189.505 57.7486 189.446L69.3742 189.315L77.4991 197.623C81.0151 201.221 85.2149 204.08 89.8516 206.032C94.4883 207.984 99.4684 208.99 104.499 208.99C109.53 208.99 114.51 207.984 119.147 206.032C123.784 204.08 127.983 201.221 131.499 197.623L139.624 189.302L151.25 189.446C156.282 189.505 161.276 188.558 165.937 186.659C170.598 184.761 174.832 181.95 178.39 178.391C181.949 174.833 184.76 170.598 186.659 165.937C188.557 161.277 189.504 156.283 189.445 151.251L189.314 139.625L197.622 131.5C201.22 127.984 204.079 123.785 206.031 119.148C207.983 114.511 208.989 109.531 208.989 104.5C208.989 99.4693 207.983 94.4892 206.031 89.8524C204.079 85.2157 201.22 81.016 197.622 77.4999L189.301 69.375L189.445 57.7494C189.504 52.7171 188.557 47.7237 186.659 43.0628C184.76 38.4018 181.949 34.1676 178.39 30.6089C174.832 27.0503 170.598 24.2391 165.937 22.3407C161.276 20.4424 156.282 19.4951 151.25 19.5547L139.624 19.6853L131.499 11.3775V11.3645ZM135.248 89.5305L96.0609 128.718C95.4542 129.326 94.7334 129.809 93.94 130.138C93.1465 130.467 92.2958 130.637 91.4367 130.637C90.5777 130.637 89.727 130.467 88.9335 130.138C88.14 129.809 87.4193 129.326 86.8126 128.718L67.2189 109.124C66.6116 108.517 66.1299 107.796 65.8013 107.003C65.4726 106.209 65.3035 105.359 65.3035 104.5C65.3035 103.641 65.4726 102.791 65.8013 101.998C66.1299 101.204 66.6116 100.483 67.2189 99.876C67.8261 99.2687 68.547 98.787 69.3404 98.4584C70.1338 98.1298 70.9842 97.9606 71.843 97.9606C72.7018 97.9606 73.5521 98.1298 74.3456 98.4584C75.139 98.787 75.8599 99.2687 76.4671 99.876L91.4367 114.859L126 80.2822C127.227 79.0558 128.89 78.3669 130.624 78.3669C132.359 78.3669 134.022 79.0558 135.248 80.2822C136.475 81.5086 137.164 83.172 137.164 84.9064C137.164 86.6407 136.475 88.3041 135.248 89.5305Z"
                    fill="#329666"
                  />
                </svg>
              </div>
              <div class="card-body">
                Project Submitted Successfully... <br />
                Please check your email for approval, <br />then login again to complete your application.<br /><br />
              </div>
            </div>
          </div>
        </div>
      )}</>}
    </>
  );
}

export default EntryViewComponent;
