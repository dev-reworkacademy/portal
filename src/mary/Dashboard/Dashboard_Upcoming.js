import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/img/javascript.png';

function Dashboard_Upcoming(props) {
  if (props.CourseStatus) {
    function truncate_with_ellipsis(s, maxLength) {
      if (s !=null &&s.length > maxLength) {
        return s.substring(0, maxLength) + '...';
      }
      return s;
    }
    let truncatedTxt = truncate_with_ellipsis(props.CourseDetails, 220);
    return (


        <div >
          <div class="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p style={{ fontSize: '14px' }}>Upcoming Module</p>
              <p>
                <Link
                  style={{ fontSize: '14px', textDecoration: 'none' }}
                  to="Course-page/Upcoming Course-Details"
                >
                  View Details
                </Link>
              </p>
            </div>
            <div className=" row card-body">
              <div className="col col-sm-4 col-md-4 col-lg-4">
                <div className="ae_dashboard_course_logo">
                  <img src={props.CourseImg} />
                </div>
              </div>
              <div className="col col-sm-8 col-md-8 col-lg-8 ae_dashboard_course_txt">
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
            </div>
          </div>
        </div>
     
    );
  }
}

export default Dashboard_Upcoming;
