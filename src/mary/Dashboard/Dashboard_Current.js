import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'react-feather';

function Dashboard_Current(props) {
  if (props.CourseStatus) {
    function truncate_with_ellipsis(s, maxLength) {
      if (s!=null && s.length > maxLength) {
        return s.substring(0, maxLength) + '...';
      }
      return s;
    }
    let truncatedTxt = truncate_with_ellipsis(props.CourseDetails, 220);
    return (
      <div >
          <div class="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p style={{fontSize:'14px'}}>Current Module</p>
              <p><Link style={{fontSize:'14px',textDecoration:"none"}} to={`/module-details-${props.CourseTitle}`}>View Module</Link></p>
            </div>
            <div className="card-body">
              <div className="ae_dashboard_course_txt">
                <h1
                  style={{
                    fontWeight: '700',
                    fontSize: '21px',
                    lineHeight: '29px',
                    letterSpacing: '0.4px',
                    color: '#000',
                  }}
                >
                  {props.CourseTitle}
                </h1>
                <p>
                  <span>Start-Date:</span> {props.CourseStartDate}
                  <span> - End-Date:</span> {props.CourseEndDate}
                </p>
                <div className="ae_dashboard_remain">
                  <p>{truncatedTxt}</p>
                </div>
              </div>
              <div className="ae_course_task">
                {props.CourseTasks?.map((e, i) => {
                  let TaskBg;
                  let TaskBorder;
                  let TaskBtn;
                  let TaskColor;
                  let TaskBrdBottom;

                  let TaskLength = props.CourseTasks.length;
                  let TaskLastIndex = TaskLength - 1;

                  if (i == TaskLastIndex) {
                    TaskBrdBottom = 'none';
                  } else {
                    TaskBrdBottom = '1px solid #DFE0EB';
                  }
                  if (e.status == 'completed') {
                    TaskBg = '#00AFEF';
                    TaskBorder = 'none';
                    TaskBtn = '#29CC97';
                    TaskColor = 'white';
                  } else if (e.status == 'ongoing') {
                    TaskBg = '#FEC400';
                    TaskBorder = 'none';
                    TaskBtn = '#FEC400';
                    TaskColor = 'white';
                  } else {
                    TaskBg = 'white';
                    TaskBorder = '2px solid #DFE0EB';
                    TaskBtn = 'whitesmoke';
                    TaskColor = 'gray';
                  }
                  return (
                    <div
                      class="d-flex justify-content-between align-items-center "
                      key={e.type}
                      style={{
                        borderBottom: `${TaskBrdBottom}`,
                        marginTop: '10px',
                      }}
                    >
                      <div className="d-flex align-items-center">
                        {' '}
                        <p
                          class="d-flex justify-content-center align-items-center"
                          style={{
                            backgroundColor: `${TaskBg}`,
                            border: `${TaskBorder}`,
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                          }}
                        >
                          {e.status == 'completed' ? (
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
                          {e.type}
                        </p>
                      </div>
                      <p
                        style={{
                          backgroundColor: `${TaskBtn}`,
                          padding: '2px 10px',
                          borderRadius: '8px',
                          color: `${TaskColor}`,
                          fontSize: '11px',
                        }}
                      >
                        {e.status}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Dashboard_Current;
