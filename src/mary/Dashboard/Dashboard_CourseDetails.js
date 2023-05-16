import React, { useState } from 'react';
import { Check } from 'react-feather';
import { Link } from 'react-router-dom';
import img1 from '../assets/img/fullstack.png';


function Dashboard_CourseDetails(props) {
  
  let arr = [];
  for (let i = 0; i < props.ChecklistsInfo.length; i++) {
    if (props.ChecklistsInfo[i].completed == true) {
      arr.push(i);
    }
  }
  console.log(arr.length);
  let checkListprogress = props.ChecklistProgress;
  console.log(checkListprogress);
  let progressBorderTop;
  let progressBorderRight;
  let progressBorderBottom;
  let progressBorderLeft;
  let progressPercent;

  if (checkListprogress <= 50) {
    progressBorderTop = '5px solid #00AFEF';
    progressBorderRight = '5px solid #fff';
    progressBorderBottom = '5px solid #fff';
    progressBorderLeft = '5px solid #fff';
    progressPercent = `${props.ChecklistProgress}%`;
  } else if (checkListprogress <= 75) {
    progressBorderTop = '5px solid #00AFEF';
    progressBorderRight = '5px solid #00AFEF';
    progressBorderBottom = '5px solid #00AFEF';
    progressBorderLeft = '5px solid #fff';
    progressPercent = `${props.ChecklistProgress}%`;
  } else {
    progressBorderTop = '5px solid #00AFEF';
    progressBorderRight = '5px solid #00AFEF';
    progressBorderBottom = '5px solid #00AFEF';
    progressBorderLeft = '5px solid #00AFEF';
    progressPercent = `${props.ChecklistProgress}%`;
  }

  return (
    <div className="row">
      <div class=" col-sm-12 col-md-12 col-lg-6">
        <div class="card mb-4">
          <div class="card-header"><p style={{fontSize:'14px',paddingTop:'0px'}}>Getting Started Check List</p></div>
          <div class="card-body row">
            <div class="col col-sm-4 col-md-4 col-lg-4">
              {' '}
              <div
                class=""
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  borderTop: `${progressBorderTop}`,
                  borderRight: `${progressBorderRight}`,
                  borderBottom: `${progressBorderBottom}`,
                  borderLeft: `${progressBorderLeft}`,
                  padding: '5px',
                }}
              >
                <div
                  class="d-flex justify-content-center align-items-center "
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#00AFEF',
                    color: '#fff',
                    fontSize: '22px',
                  }}
                >
                  {progressPercent}
                </div>
              </div>
            </div>
            <div class="col col-sm-8 col-md-8 col-lg-8">
              {' '}
              {props.ChecklistsInfo?.map((e, i) => {
                return (
                  <div
                    key={e.id}
                    class="px-4"
                    style={{
                      borderBottom: `${i == 2 ? 'none' : '1px solid #DFE0EB'}`,
                      paddingTop: `12px`,
                      //   paddingBottom: '0px',
                    }}
                  >
                    <div class="d-flex justify-content-left align-items-center ">
                      <p
                        class="d-flex justify-content-center align-items-center"
                        style={{
                          backgroundColor: `${
                            e.completed == true ? '#00AFEF' : 'white'
                          }`,
                          border: `${
                            e.completed == true ? 'none' : '2px solid gray'
                          }`,
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                        }}
                      >
                        {e.completed == true ? (
                          <Check color="white" size={18} />
                        ) : (
                          ''
                        )}
                      </p>{' '}
                      <p
                        class="ml-4"
                        style={{
                          fontSize: '14px',
                          color: 'black',
                          fontWeight: '900',
                        }}
                      >
                        {e.task}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div class=" col-sm-12 col-md-12 col-lg-6">
        <div class="card mb-4 pb-3">
          <div className="card-header d-flex justify-content-between align-items-center" >
            <p style={{fontSize:'14px'}}>Course Details</p>
            <p><Link style={{fontSize:'14px',textDecoration:"none"}} to="/modules">View Modules </Link></p>
          </div>
          <div className="card-body row">
            <div className="col col-sm-6 col-md-6 col-lg-4">
              <div className="ae_dashboard_course_logo">
                <img src={props.CourseImg} />
              </div>
            </div>
            <div className="col col-sm-6 col-md-6 col-lg-8 ae_dashboard_course_txt">
              <h1
                style={{
                  fontWeight: '700',
                  fontSize: '21px',
                  lineHeight: '29px',
                  letterSpacing: '0.4px',
                  color: '#000',
                }}
              >
                {props.Coursename}
              </h1>
              <p><span>Start-Date:</span> {props.CourseStartDate} - <span>End-Date:</span> {props.CourseEndDate}</p>
              <div className='ae_dashboard_remain'>
                <h5>{props.CourseMonthRemaining} Remaining</h5>{' '}
                <div
                  class="progress"
                  style={{
                    height: '10px',
                    border: '1px solid #00AFEF',
                    padding: '2px',
                    borderRadius: '20px',

                    backgroundColor: 'white',
                  }}
                >
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${props.CourseProgress}%`,
                      height: '4px',
                      borderRadius: '20px',
                    }}
                    //   aria-valuenow={`${e.details}`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard_CourseDetails;
