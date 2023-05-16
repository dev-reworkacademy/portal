import React, {useState, useEffect} from "react";
import axios from "axios";
import Footer from "./../../template/Footer";
import Nav from "./../../template/Nav";
import Topbar from "./../../template/Topbar";
import AttendantComponent from "./AttendantComponent";
import LoadingMsg from "../../components/LoadingMsg";
const AttendancePage = () => {

  const BASE_URL = "https://reworkacademy.co/app/v2"
  const user_id = localStorage.getItem("userId")
  const [attendance, setAttendance] = useState([])


  useEffect(() => {
    let api_url =  BASE_URL + "/students/" + user_id + "/attendance";
    console.log(api_url);
    fetch(api_url)
  .then((e) => e.json())
  .then((res) => {
    setAttendance([res]);
    console.log(res)
  });
  
}, [])


  return (
    <div id="wrapper" className="page-wrapper">
      <Nav />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar pageName="Attendance" />
          <div className="container-fluid">
            { attendance.length==0?<LoadingMsg/>:
              attendance?.map((attend)=>{
                return (
                  attend.today===null?<AttendantComponent
                  progress={0}
                  total_classes={0}
                  total_attended={0}
                  total_weeks={0}
                  status={true}
                  date={""}
                  attend={attend}
                  /> : <AttendantComponent
                   progress={attend.progress}
                   total_classes={attend.total_classes??0}
                   total_attended={attend.total_attended??0}
                   total_weeks={attend.total_weeks??0}
                   status={attend.today.active}
                   date={attend.today.date??""}
                   attend={attend}
                   />
                )
              })
            }
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AttendancePage;
