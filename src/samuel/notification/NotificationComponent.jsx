import React from "react";
import ReadMore from "./ReadMore";
import ".././assets/css/notify.css";

const NotificationComponent = ({caption, status, message, time,bGcolor, readMessage}) => {

  return (
    <div className="container-fluid bg-white p-0">
      <div className="col-md-12 col-lg-12 col-sm-12 _sam_notify_card_w-100 p-0 border-bottom mb-2" >
        <div className="card border-0 rounded-0" style={{backgroundColor: bGcolor}}>
          <div className="card-header m-0 d-flex justify-content-between" style={{backgroundColor: bGcolor}}>
            <p className="m-0 _sam_title_p">{caption}</p>
           <div className="d-flex justify-content-between status_width">
            {/* <span className="card _sam_status">{status}</span> */}
            <span className="m-0 _sam_notify_time_span">{time}</span>
           </div>
          </div>
          <div className="card-body _sam_notify_content position-relative _sam_pb_relative">
            <ReadMore
              limit={100}
              text={message}
              readMessage={readMessage}
            />
          </div>
        </div>
      </div>


    </div>
  );
};

export default NotificationComponent;
