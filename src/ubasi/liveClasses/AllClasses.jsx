import React, { useContext } from "react";
import { Clock } from "react-feather";
import { Link } from "react-router-dom";
import { useFetchAStudentClassesData } from "../hooks/ReactQuery";
import { Storage } from '../../context/Store';
  
const AllClasses = () => {
  let data = useContext(Storage);
 let userId = data.ae_User_ID;

  const studentId = '1odi4e7wlfc14uv6';///<===this is dummy used for testing
  // load all live classes
  const {isLoading:fetchingClasses, data:allClasses, isError:fetchingClassesError,} = useFetchAStudentClassesData(studentId);
 
  return (
    <div className="">
      <div>
        <span className="d-flex flex-column text-dark fw-bold">
          Countdown To Project
          <p className="text-secondary">8 days, 4 hours, 12 minutes</p>
        </span>
        <span></span>
      </div>
      <div className="row g-3">
        {allClasses?.data?.data?.length > 0 ?allClasses?.data?.data?.map((data, index) => (
          <Link to={`${index}`} key={index} state={{data,studentId}} className="col-12 col-sm-6 col-md-4 col-lg-3" >
            <div className="card position-relative" style={{height:"35vh"}}>
              <span
                className={`${
                  data?.status === "completed"
                    ? "bg-success"
                    : data?.status === "upcoming"
                    ? "bg-warning"
                    : "bg-danger d-flex align-items-center justify-content-center"
                } text-white position-absolute top-0 start-0 p-1 text-center `}
                style={{borderTopLeftRadius:"5px", width:"35%", fontSize:"12px"}}
              >
                {data?.status === "LIVE"?(<div className="rounded-circle bg-white me-1" style={{width:"5px", height:"5px",margin:"0",padding:"0"}}/>):null}
                {data?.status}
              </span>
              <img
                // style={{ width: "95%", height: "auto", objectFit: "contain" }}
                className="rounded-top"
                src={data?.icon}
                alt="classImg"
                style={{height:"70%"}}
              />
              <div className="card-body" style={{height:"15%"}}>
                <h6 className="fw-bold text-dark overflow-hidden text-nowrap" style={{fontSize:"14px",width:"97%", textOverflow:"ellipsis", display:"inline-block"}}>{data?.title}</h6>
                <span className="text-secondary d-flex align-items-center" style={{fontSize:"12px"}}>
                    <Clock size={"12px"}/>{data?.date}
                </span>
              </div>
            </div>
          </Link>
        )):fetchingClasses?<>
        <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
        </>:fetchingClassesError?<>
        <h6 className="text-danger">
          Error fetching classes 
        </h6>
        </>:<>
            <h6 className="test-warning">No Live Classes found for this student</h6>
        </>
        }
      </div>
    </div>
  );
};

export default AllClasses;