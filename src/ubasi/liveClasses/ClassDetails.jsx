import React, { useState } from "react";
import { useParams, useLocation, NavLink, Link } from "react-router-dom";
import {
  useCancelEnrollData,
  useClassDetailsData,
  useEnrollForClassData,
  useStudentEnrollmentData,
} from "../hooks/ReactQuery";
import ClassNavItem from "./ClassNavItem";

const ClassDetails = () => {
  // const {classId} = useParams();
  const [classNav, setNav] = useState("Description");
  const location = useLocation();

  // fetch class details
  const {
    data: details,
    isError: detailFetchError,
    isLoading: detailsFetchLoading,
  } = useClassDetailsData(location?.state?.data?.id);
  // check if student has enrolled for a class
  const {
    data: isEnrolled,
    isLoading: checkingStatus,
    isError: checkFailed,
  } = useStudentEnrollmentData({
    studentId: location?.state?.studentId,
    classId: location?.state?.data?.id,
  });
  // enroll student for class
  const {
    mutate: enrollStudent,
    isError: enrollError,
    isLoading: enrollFetching,
  } = useEnrollForClassData({
    studentId: location?.state?.studentId,
    classId: location?.state?.data?.id,
  });
  // cancel enrollment
  const {mutate:unenroll, isError:unenrollError, isLoading:unenrollLoading} = useCancelEnrollData({
    studentId: location?.state?.studentId,
    classId: location?.state?.data?.id,
  })
  
  return (
    <div className="">
      <div>
        <span className="d-flex flex-column text-dark fw-bold">
          Countdown To Project
          <p
            className="text-secondary fw-normal"
            style={{ padding: "0", margin: "0" }}
          >
            8 days, 4 hours, 12 minutes
          </p>
        </span>
        <span></span>
      </div>

      <div className="card position-relative">
        <span
          className={`${
            details?.data?.data?.status === "completed"
              ? "bg-success"
              : details?.data?.status === "upcoming"
              ? "bg-warning"
              : "bg-danger d-flex align-items-center justify-content-center"
          } text-white position-absolute top-0 start-0 p-1 text-start rounded-top `}
          style={{ width: "100%", fontSize: "12px" }}
        >
          {details?.data?.status === "Live" ? (
            <div
              className="rounded-circle bg-white me-1"
              style={{ width: "5px", height: "5px", margin: "0", padding: "0" }}
            />
          ) : null}
          {details?.data?.status}
        </span>
        <img
          className="rounded-top"
          style={{ height: "300px", objectFit: "cover" }}
          src={details?.data?.icon}
          alt="classImgBarner"
        />

        <div className="card-body  px-3 pt-3" style={{ height: "auto" }}>
          {/* ====================== */}

          <div className="row d-block d-md-flex justify-content-between border-bottom pb-2">
            <span className="col-lg-6 text-dark d-block d-md-flex  align-items-center justify-content-between">
              <h6 className="text-dark fs-6 fw-bold d-flex">
                Date:
                <p className="text-secondary fw-normal p-0 ms-1">
                  {details?.data?.date}
                  {"  "}
                  {details?.data?.start_time}
                </p>
              </h6>

              <h6 className="text-dark fs-6 fw-bold d-flex">
                Duration:
                <p className="text-secondary fw-normal p-0 ms-1">
                  {details?.data?.duration_in_hour} hours
                </p>
              </h6>

              <h6 className="text-dark fs-6 fw-bold d-flex">
                Class Size:
                <p className="text-secondary fw-normal p-0 ms-1">
                  {details?.data?.class_size}
                </p>
              </h6>
            </span>
            <span className="col-lg-4 d-block d-md-flex align-items-center justify-content-between">
              {isEnrolled ? (
                <>
                  <span className="text-success px-4">Class Enrolled</span>
                  <button
                    type="button"
                    className={`btn btn-sm btn-danger px-4`}
                    onClick={()=>unenroll({
                      studentId: location?.state?.studentId,
                      classId: location?.state?.data?.id,
                    })}
                    disabled={unenrollLoading}
                    style={{ minWidth: "30px" }}
                  >
                    {unenrollLoading ? (
                      <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : unenrollError ? (
                      "Error, Try Again"
                    ) : (
                      "Cancel Enroll"
                    )}
                  </button>
                </>
                // || enrollFetching || unenrollLoading
              ) : checkingStatus ? (
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <span />
                  <button
                    type="button"
                    className="btn btn-sm btn-primary px-4 "
                    onClick={()=>enrollStudent({
                      studentId: location?.state?.studentId,
                      classId: location?.state?.data?.id,
                    })}
                    disabled={enrollFetching}
                    style={{ minWidth: "30px" }}
                  >
                    {enrollFetching ? (
                      <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : enrollError ? (
                      "Error, Try Again"
                    ) : (
                      "Enroll for Class"
                    )}
                  </button>
                </>
              )}
            </span>
          </div>
          {/* =================== */}

          <div className="row d-block d-md-flex justify-content-between border-bottom p-1">
            <span className="col-lg-7 text-dark d-block d-md-flex align-items-center justify-content-between">
              {isEnrolled ? (
                <h6 className="text-dark fs-6 fw-bold d-flex align-items-center">
                  Venue:
                  <Link
                    to={details?.data?.meeting_link}
                    className="fw-bold p-0 ms-1"
                    target="_blank"
                    replace
                  >
                    Click Here To Attend Class
                  </Link>
                </h6>
              ) : checkingStatus?<div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>:checkFailed?<h4 className="text-danger">couldn't check if enrolled</h4>:null}
              <h6 className="text-dark fs-6 fw-bold d-flex align-items-center">
                Instructor:
                <p className="fw-normal p-0 ms-1">{details?.data?.trainer?.name}</p>
              </h6>
            </span>

            <span className="col-lg-3" />
          </div>

          {/* ==================== */}
          <div
            className="d-block d-md-flex justify-content-evenly p-1 px-4 rounded-2 mt-2"
            style={{ background: "rgb(240, 232, 232)" }}
          >
            {["Description", "Objective", "Instructor", "Class Recording"].map(
              (data, index) => (
                <>
                  <button
                    className={`btn btn-light ${
                      classNav === data ? "text-primary fw-bold" : ""
                    } bg-transparent`}
                    style={{ outline: "none", border: "none" }}
                    key={index}
                    onClick={() => setNav(data)}
                  >
                    {data}
                  </button>
                  {index !== 3 ? <div className="vr" /> : null}
                </>
              )
            )}
          </div>

          {/*======================  */}
          <ClassNavItem nav={classNav} data={details?.data} isEnrolled={isEnrolled} />
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;