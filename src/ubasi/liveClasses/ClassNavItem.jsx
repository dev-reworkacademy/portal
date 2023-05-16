import React from "react";
import { Users, Star, PlayCircle } from "react-feather";

const ClassNavItem = (props) => {
  const { data,isEnrolled } = props;


  switch (props.nav) {
    case "Instructor":
      return (
        <div className="text-dark mt-2" style={{minHeight:"20vh"}}>
          <h4 className="fw-bold my-2">Instructor</h4>
          <div className="d-flex flex-row align-items-center mb-3">
            <img
              className="rounded-circle me-4"
              style={{ width: "150px", height: "150px" }}
              src={data?.trainer?.avatar}
              alt="instructorImg"
            />
            <span className="d-flex flex-column">
              <h5 className="fw-bold text-dark">{data?.trainer?.name}</h5>
              <p>{data?.trainer?.caption}</p>
              <span className="my-2">
                <Users size={"16px"} /> {data?.trainer?.class_taught} classes
                taught
              </span>
              <span className="my-2">
                <Star size={"16px"} /> {data?.trainer?.rating}Instructor Rating
              </span>
              <span className="my-2">
                <PlayCircle size={"16px"} /> 12 Courses
              </span>
            </span>
          </div>

          <p>{data?.trainer?.bio}</p>
        </div>
      );
      break;
    case "Class Recording":
      return <div className="text-dark mt-2" style={{minHeight:"20vh"}}>
        {
          isEnrolled?<>
            <h4 className="fw-bold">Class Recordings</h4>
        {data?.recording_link}
          </>:<h6 className="text-warning">Please enroll for class to access Recordings</h6>
        }
        
        </div>;
      break;
    case "Objective":
      return (
        <div className="text-dark mt-2" style={{minHeight:"20vh"}}>
          <h4 className="fw-bold">What you'll learn</h4>
          <ul style={{ listStyle: "" }}>
            {data?.objectives?.length > 0
              ? data?.objectives?.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))
              : null}
          </ul>
        </div>
      );
      break;
    default:
      return (
        <div className="text-dark mt-2" style={{minHeight:"20vh"}}>
          <h4 className="fw-bold">{data?.title}</h4>
          <p className="">
            {data?.descp}
          </p>
        </div>
      );
      break;
  }
};

export default ClassNavItem;
