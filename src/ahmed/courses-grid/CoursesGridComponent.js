import React from "react";
import { BookOpen, Clock } from "react-feather";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";

function CoursesGridComponent(props) {
  return (
    <>
      <Link to={"/course-details/" + props.alias} className="link-ah">
        <div className="card-ah">
          <div className="card-img-ah">
            <span>
              <p>{props.status}</p>
            </span>
            <img src={props.img} alt="" />
          </div>
          <div className="card-content-ah">
            <h3>{props.title}</h3>
            <div className="card-sub-ah flex">
              <BookOpen style={{ height: "20px", width: "20px" }} />
              <p>
                Modules {props.presentModule} of {props.totalModule}
              </p>
            </div>
            <div
              style={{
                border: "1px solid #00AFEF",
                padding: "2px 6px",
                borderRadius: "20px",
                display: props.progressDisplay,
                marginBottom: "15px"
              }}
            >
              <ProgressBar
                now={props.progress}
                style={{ height: "6px", color: "#00AFEF" }}
              />
            </div>
            <div className="card-sub-ah flex">
              <Clock style={{ height: "20px", width: "20px" }} />
              <p>{props.duration}</p>
            </div>
            <span className="flex" style={{ display: props.startDisplay }}>
              <h6>est start date:</h6>
              <p>{props.startDate}</p>
            </span>
            <span className="flex">
              <h6>est end date:</h6>
              <p>{props.endDate}</p>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CoursesGridComponent;
