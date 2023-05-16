import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard_Notification(props) {

  return (
    <div>
      <div class="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <p style={{ fontSize: '14px' }}>Notifications</p>
          <p>
            <Link
              style={{ fontSize: '12px', textDecoration: 'none' }}
              to="/notifications"
            >
              View All Notifications
            </Link>
          </p>
        </div>

        {props.Notifications?.map((e, i) => {
          function truncate_with_ellipsis(s, maxLength) {
            if (s.length > maxLength) {
              return s.substring(0, maxLength) + '...';
            }
            return s;
          }
          let truncatedTxt = truncate_with_ellipsis(e.descp, 220);

          if (i <= 1) {
            return (
              <div
                className="card-body"
                key={e.id}
                style={{ borderBottom: `${i <= 0 ? '1px solid #DFE0EB' : ''}` }}
              >
                <div className="ae_dashboard_course_txt">
                  <div className="d-flex justify-content-between align-items-center">
                    {' '}
                    <h1
                      style={{
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '29px',
                        letterSpacing: '0.4px',
                        color: '#000',
                      }}
                    >
                      {e.caption}
                    </h1>{' '}
                    <h1
                      style={{
                        fontWeight: '700',
                        fontSize: '14px',
                        lineHeight: '29px',
                        letterSpacing: '0.4px',
                        color: 'gray',
                      }}
                    >
                      {e.created_at}
                    </h1>
                  </div>

                  <div className="ae_dashboard_remain">
                    <p>{truncatedTxt}</p>
                  </div>
                  <Link
                    style={{ fontSize: '12px', textDecoration: 'none' }}
                    to="/notifications"
                  >
                    View More
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Dashboard_Notification;
