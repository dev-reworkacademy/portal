import React, { useContext, useEffect, useState } from "react";
import "../assets/css/profile.css";
import AccountConfirmation from "./AccountConfirmation";
import FirstDeposit from "./FirstDeposit";
import Location from "./Location";
import NextOfKin from "./NextOfKin";
import Personal from "./Personal";
import Session from "./Session";
import { Storage } from "../../context/Store";
import LoadingMsg from "../../components/LoadingMsg";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  let data = useContext(Storage);
  let navigate = useNavigate();
  let [steps, setStep] = useState(localStorage.getItem("user_status"));

  function nextStep(steps) {
    // steps = steps + 1;
    setStep(steps);
    console.log(steps);
  }
  // useEffect(()=>{
  //   nextStep()
  // }, [steps])

  const props = { nextStep, steps };
  console.log(steps);
  switch (steps) {
    case "PERSONAL":
      return <Personal {...props} />;
    case "LOCATION":
      return <Location {...props} />;
    case "COURSE_SESSION":
      return <Session {...props} />;
    case "NEXT_KIN":
      return <NextOfKin {...props} />;
    case "FIRST_DEPOSIT":
      return <FirstDeposit {...props} />;
    case "UPLOAD":
      return <AccountConfirmation {...props} />;
    default:
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "500px" }}
        >
          <LoadingMsg  />
        </div>
      );
  }
}

export default Register;
