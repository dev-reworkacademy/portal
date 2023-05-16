import React, { useState, useEffect, useContext } from "react";
import Dashboard_Accounts from "./Dashboard_Accounts";
import Dashboard_AccountTimer from "./Dashboard_AccountTimer";
import Dashboard_CourseDetails from "./Dashboard_CourseDetails";
import Dashboard_Current from "./Dashboard_Current";
import Dashboard_Notification from "./Dashboard_Notification";
import Dashboard_Upcoming from "./Dashboard_Upcoming";
import { Storage } from "../../context/Store";
import LoadingMsg from "../../components/LoadingMsg";

// console.log(process.env.REACT_APP_.REACT_APP_BASE_URL)
function DashboardComponent() {
  let data = useContext(Storage);
  let [userInfo, setUserInfo] = useState([]);
  let HOST = data.URL;
  let [ae_user_ID, ae_setUser_ID] = data.ae_User_ID;
  
  useEffect(() => {
    getUserInfo();
   
  }, []);

  

  let getUserInfo = () => {
    let url = HOST + `/students/${ae_user_ID}/info`;
    console.log(url);
    fetch(url)
      .then((e) => e.json())
      .then((res) => {
        setUserInfo([res]);
      });
  };

  //   console.log([userInfo.payment_due_date]);
  return (
    <div>
      {userInfo.length==0?<LoadingMsg/>:<div>
      <div>
        {/* <Dashboard_Accounts  /> */}
        {userInfo?.map((e, i) => {
          return (
            <Dashboard_Accounts
              course_fee={e.course_fee}
              amount_paid={e.amount_paid}
              balance={e.balance}
              attendanceProgress={e.attendance.progress}
            />
          );
        })}
      </div>
      <div>
        {userInfo?.map((e, i) => {
          return (
            <Dashboard_CourseDetails
              ChecklistsInfo={e.check_lists}
              ChecklistProgress={e.check_list_progress}
              Coursename={e.course.name}
              CourseImg={e.course.img}
              CourseStartDate={e.course.start_date}
              CourseEndDate={e.course.end_date}
              CourseDetails={e.course.descp}
              CourseMonthRemaining={e.course.month_remaining}
              CourseDuration={e.course.duration}
              CourseProgress={e.course.progress}
            />
          );
        })}
      </div>

      <div className="row">
        <div className="col col-sm-12 col-md-6 col-lg-6">
          {" "}
          <>
            {userInfo?.map((e, i) => {
              return (
                <Dashboard_Current
                  CourseStatus={e.module.current}
                  CourseImg={e.module.current.img}
                  CourseTitle={e.module.current.title}
                  CourseStartDate={e.module.current.start_date}
                  CourseEndDate={e.module.current.end_date}
                  CourseDetails={e.module.current.descp}
                  CourseTasks={e.module.current.assessments}
                />
              );
            })}{" "}
          </>
          <>
            {userInfo?.map((e, i) => {
              return <Dashboard_Notification Notifications={e.notification} />;
            })}
          </>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          {" "}
          {userInfo?.map((e, i) => {
            return (
              <Dashboard_Upcoming
                CourseStatus={e.module.upcoming}
                CourseImg={e.module.upcoming.img}
                CourseTitle={e.module.upcoming.title}
                CourseStartDate={e.module.upcoming.start_date}
                CourseEndDate={e.module.upcoming.end_date}
                CourseDetails={e.module.upcoming.descp}
              />
            );
          })}
          {userInfo?.map((e) => {
            return <Dashboard_AccountTimer PaymentDue={e.payment_due_date} />;
          })}
        </div>
      </div>
    </div>}
    </div>
  );
}

export default DashboardComponent;
