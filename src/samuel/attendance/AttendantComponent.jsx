import ".././assets/css/attendance.css";
import { Check, X } from "react-feather";
import DaysOfWeek from "./DaysOfWeek";

function AttendantComponent({ progress,total_classes,total_attended,total_weeks,status,date,attend}) {

    const determineStatus=()=>{
      
      if(status === true){
        return(
          <div className="col-lg-12 col-md-6 col-sm-12 _sam_my_custom_card bg-white mb-3 pt-3 border">
        <p className="_sam_sm-text text-center">Today Attendance</p>
          <p className="_sam_sm-text text-center _sam_sm-sub-text">{date}</p>
            <button className="btn _sam_rework-btn text-white _sam_btnWidth mx-auto d-flex">Present 
             <div><Check className="text-white position-absolute _check-btn-present" size={24} /></div>
            </button>
        </div>
        )
      }else if(status === false){
        return(
          <div className="col-lg-12 col-md-6 col-sm-12 _sam_my_custom_card bg-white mb-3 pt-3 border">
          <p className="_sam_sm-text text-center">Today Attendance</p>
            <p className="_sam_sm-text text-center _sam_sm-sub-text">{date}</p>
              <button className="btn _sam_rework-btn text-white _sam_btnWidth mx-auto d-flex bg-danger">Absent 
               <div><X className="text-white  position-absolute _check-btn-present" size={24} /></div>
              </button>
          </div>
        )
      }
    }
    
  return (
    <div className="row">
      <div className="col-lg-3 col-sm-12 p-0">
       <div className="container">
       <div className="row">
        <div className="col-lg-12 col-md-6 col-sm-12 _sam_my_custom_card bg-white mb-3 pt-4 border">
        <p className="text-center _sam_sm-text">Attendance Percentage</p>
          <h1 className="_sam_attendance_text">{progress}%</h1>
        </div>
        <div className="col-lg-12 col-md-6 col-sm-12 _sam_my_custom_card bg-white mb-3 pt-3 border d-flex justify-content-center flex-column">
        <p className="_sam_sm-text">Attendance Summary</p>
          <div className="d-flex justify-content-between ">
            <p className="m-0 _sam_sm-test-summary">Total Classes</p>
            <p className="_sam_attendance-count m-0">{total_classes}</p>
          </div>
          <div className="d-flex justify-content-between  ">
            <p className="m-0 _sam_sm-test-summary">Total Attended</p>
            <p className="_sam_attendance-count m-0">{total_attended}</p>
          </div>
          <div className="d-flex justify-content-between ">
            <p className="m-0 _sam_sm-test-summary">Total Weeks</p>
            <p className="_sam_attendance-count m-0">{total_weeks}</p>
          </div>
        </div>
        <>

            { determineStatus() }

        </>
       </div>
       </div>
      </div>
      <div className="col-lg-8 col-md-12 bg-white rounded p-3 mg-top">
      <p className="_sam_sm-text">Daliy Attendance</p>
        <div className="row">
        {attend.attendance.map((daysOfWeek)=>{
            return(
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="bg-white mb-3 pt-4 border rounded pb-2" key={daysOfWeek.id}>
                    <p className="_sam_week">{daysOfWeek.week}</p>
                   
                    <DaysOfWeek
                      daysOfWeek={daysOfWeek}
                     />
                </div>
                </div>
            )
        })}
        </div>
      </div>
    </div>
  );
}
export default AttendantComponent;


