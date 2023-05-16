import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck } from 'react-feather';

function LargeCardComponent() {
  let CourseModule = [
    {
      id: 1,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: 'Morning',
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseAttendance: 80,
      CourseSum: '24/32',
    },
    {
      id: 2,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: 'Morning',
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseAttendance: 98,
      CourseSum: '219/21',
    },
    {
      id: 3,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: 'Morning',
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseAttendance: 71,
      CourseSum: '7/13',
    },
    {
      id: 4,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: 'Morning',
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseAttendance: 40,
      CourseSum: '4/10',
    },
    {
      id: 5,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: 'Morning',
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseAttendance: 100,
      CourseSum: '7/7',
    },
  ];
  let CourseClasses = [
    {
      id: 1,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: [
        { id: 1, session: 'Morning-Weeday' },
        { id: 2, session: 'Afternoon-Weekday' },
        { id: 3, session: 'Weekday' },
      ],
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseWeek: 12,
      CourseEstEndDate: '23 - 01 - 2022',
      CourseEstEndMonth: 6,
      CourseEstEndDay: 3,
      CourseProgress: '70%',
    },
    {
      id: 2,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: [
        { id: 1, session: 'Morning-Weeday' },
        { id: 2, session: 'Afternoon-Weekday' },
        { id: 3, session: 'Weekday' },
      ],
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseWeek: 12,
      CourseEstEndDate: '23 - 01 - 2022',
      CourseEstEndMonth: 6,
      CourseEstEndDay: 3,
      CourseProgress: '70%',
    },
    {
      id: 3,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: [
        { id: 1, session: 'Morning-Weeday' },
        { id: 2, session: 'Afternoon-Weekday' },
        { id: 3, session: 'Weekday' },
      ],
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseWeek: 12,
      CourseEstEndDate: '23 - 01 - 2022',
      CourseEstEndMonth: 6,
      CourseEstEndDay: 3,
      CourseProgress: '70%',
    },
    {
      id: 4,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: [
        { id: 1, session: 'Morning-Weeday' },
        { id: 2, session: 'Afternoon-Weekday' },
        { id: 3, session: 'Weekday' },
      ],
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseWeek: 12,
      CourseEstEndDate: '23 - 01 - 2022',
      CourseEstEndMonth: 6,
      CourseEstEndDay: 3,
      CourseProgress: '70%',
    },
    {
      id: 5,
      CourseTitle: 'HTML/CSS',
      CourseTrainer: 'Young Ayodeji',
      CoureSession: [
        { id: 1, session: 'Morning-Weeday' },
        { id: 2, session: 'Afternoon-Weekday' },
        { id: 3, session: 'Weekday' },
      ],
      CourseDetails: 'Lorem Lorem ipsum dolor sit amet',
      CourseWeek: 12,
      CourseEstEndDate: '23 - 01 - 2022',
      CourseEstEndMonth: 6,
      CourseEstEndDay: 3,
      CourseProgress: '70%',
    },
  ];
  return (
    <div
      className="row justify-content-between"
      style={{ width: '90%', margin: '0 auto', marginTop: '20px' }}
    >
      <div
        className="col col-sm-12 col-md-6 col-lg-6"
        key={CourseModule.id}
        style={{
          width: '40%',
          //   margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid rgba(4, 35, 49, 0.1)',
          borderRadius: '15px',
        }}
      >
        <div
          class="mb-4"
          style={{ lineHeight: '2px', padding: '20px 0px 0px' }}
        >
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ padding: '0px 10px' }}
          >
            <p style={{ fontSize: '14px' }}>Recent Attendance</p>
            <p>
              <Link
                style={{
                  fontSize: '10px',
                  textDecoration: 'none',
                  color: '#3751FF',
                  fontWeight: '500',
                }}
                to="/viewattendance"
              >
                View Attendance
              </Link>
            </p>
          </div>

          <div className="ae_course_task">
            {CourseModule?.map((e, i) => {
              let TaskBrdBottom;
              let TaskLength = CourseModule.length;
              let TaskLastIndex = TaskLength - 1;
              let AttendancePercent;

              if (i === TaskLastIndex) {
                TaskBrdBottom = 'none';
              } else {
                TaskBrdBottom = '1px solid #DFE0EB';
              }
              if (e.CourseAttendance <= '49') {
                AttendancePercent = '#FF5A5A';
              } else if (e.CourseAttendance <= '79') {
                AttendancePercent = '#FFA800';
              } else if (e.CourseAttendance >= '80') {
                AttendancePercent = '#00AFEF';
              } else if (e.CourseAttendance >= '100') {
                AttendancePercent = '#00AFEF';
              }
              return (
                <div
                  class="d-flex justify-content-between align-items-center "
                  key={e.CourseTaskKey}
                  style={{
                    borderBottom: `${TaskBrdBottom}`,
                    marginTop: '5px',
                    padding: '10px ',
                  }}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ width: '75%' }}
                  >
                    {' '}
                    <div
                      class="d-flex justify-content-center align-items-center"
                      style={{ width: '15%' }}
                    >
                      {' '}
                      <div
                        class="d-flex justify-content-center align-items-center"
                        style={{
                          backgroundColor: '#00AFEF',
                          border: 'none',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                        }}
                      >
                        <UserCheck color="white" size={18} />
                      </div>{' '}
                    </div>
                    <div class="ml-3">
                      <div
                        style={{
                          fontSize: '10px',
                        }}
                        class="d-flex align-items-center"
                      >
                        <p>
                          Trainer -{' '}
                          <span style={{ color: 'black', fontWeight: '500' }}>
                            {e.CourseTrainer}
                          </span>
                        </p>
                        <p className="ml-3">
                          Session -{' '}
                          <span style={{ color: 'black', fontWeight: '500' }}>
                            {e.CoureSession}
                          </span>
                        </p>
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          color: 'black',
                          fontWeight: '600',
                        }}
                      >
                        <p style={{ marginBottom: '0rem' }}>
                          {e.CourseTitle} :
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: '500',
                            }}
                          >
                            {' '}
                            {e.CourseDetails}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '10%',
                    }}
                  >
                    <p
                      style={{
                        color: `${AttendancePercent}`,
                        fontSize: '11px',
                      }}
                    >
                      {e.CourseAttendance}%
                    </p>
                    <p
                      style={{
                        marginbottom: '0',
                        fontSize: '13px',
                        color: 'black',
                        fontWeight: '600',
                      }}
                    >
                      {e.CourseSum}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="col col-sm-12 col-md-6 col-lg-6"
        key={CourseClasses.id}
        style={{
          width: '40%',
          //   margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid rgba(4, 35, 49, 0.1)',
          borderRadius: '15px',
        }}
      >
        <div
          class="mb-4"
          style={{ lineHeight: '2px', padding: '20px 0px 0px' }}
        >
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ padding: '0px 10px' }}
          >
            <p style={{ fontSize: '14px' }}>Running Classes</p>
            <p>
              <Link
                style={{
                  fontSize: '10px',
                  textDecoration: 'none',
                  color: '#3751FF',
                  fontWeight: '500',
                }}
                to="/viewattendance"
              >
                View Classes
              </Link>
            </p>
          </div>

          <div className="ae_course_task">
            {CourseClasses?.map((e, i) => {
              let TaskBrdBottom;
              let TaskLength = CourseModule.length;
              let TaskLastIndex = TaskLength - 1;
              let AttendancePercent;

              if (i === TaskLastIndex) {
                TaskBrdBottom = 'none';
              } else {
                TaskBrdBottom = '1px solid #DFE0EB';
              }
              if (e.CourseAttendance <= '49') {
                AttendancePercent = '#FF5A5A';
              } else if (e.CourseAttendance <= '79') {
                AttendancePercent = '#FFA800';
              } else if (e.CourseAttendance >= '80') {
                AttendancePercent = '#00AFEF';
              } else if (e.CourseAttendance >= '100') {
                AttendancePercent = '#00AFEF';
              }
              return (
                <div
                  style={{
                    borderBottom: `${TaskBrdBottom}`,
                    marginTop: '5px',
                    padding: '10px ',
                  }}
                >
                  {' '}
                  <div
                    class="d-flex justify-content-between align-items-center "
                    key={e.id}
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ width: '75%' }}
                    >
                      <div class="">
                        <div
                          style={{
                            fontSize: '10px',
                          }}
                          class="d-flex align-items-center"
                        >
                          <p>
                            Week -{' '}
                            <span style={{ color: 'black', fontWeight: '500' }}>
                              {e.CourseWeek}
                            </span>
                          </p>
                          <p className="ml-3">
                            Session -{' '}
                            <span style={{ color: 'black', fontWeight: '500' }}>
                              {e.CoureSession?.map((e) => {
                                return <span key={e.id}>{e.session}</span>;
                              })}
                            </span>
                          </p>
                        </div>
                        <div
                          style={{
                            fontSize: '13px',
                            color: 'black',
                            fontWeight: '600',
                          }}
                        >
                          <p style={{ marginBottom: '0rem' }}>
                            {e.CourseTitle} :
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: '500',
                              }}
                            >
                              {' '}
                              {e.CourseDetails}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                    // style={{
                    //   width: '25%',
                    // }}
                    >
                      <p
                        style={{
                          color: '#FFA800',
                          fontSize: '8px',
                        }}
                      >
                        Est End Date -{' '}
                        <span style={{ color: 'black' }}>
                          {e.CourseEstEndDate}
                        </span>
                      </p>
                      <p
                        style={{
                          marginbottom: '0',
                          fontSize: '11px',
                          color: 'black',
                          fontWeight: '600',
                        }}
                      >
                        {e.CourseEstEndMonth}M- {e.CourseEstEndDay}D Remaining
                      </p>
                    </div>
                  </div>
                  <div
                    class="progress"
                    style={{
                      height: '6px',
                      border: '1px solid #00AFEF',
                      padding: '2px',
                      borderRadius: '20px',
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${e.CourseProgress}`,
                        height: '6px',
                        borderRadius: '20px',
                        backgroundColor: 'dodgerblue',
                      }}
                      aria-valuenow={`${e.CourseProgress}`}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LargeCardComponent;
