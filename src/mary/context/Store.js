import React, { useState, createContext } from "react";

export const Storage = createContext();
const StoreContext = ({ children }) => {
  let [fullStack, setFullStack] = useState(true);
  let [projectAssigned, setprojectAssigned] = useState(true);
  let [projectSubmitted, setProjectSubmitted] = useState(false);
  let [fullStackAccepted, setFullStackAccepted] = useState(false);
  let [ae_user_ID, ae_setUser_ID] = useState(localStorage.getItem("userId"));
  let [ae_user_Status, ae_setUser_Status] = useState(
    localStorage.getItem("user_status")
  );
  let [userInfo, setUserInfo] = useState([]);
  let [ae_user_details, ae_setUser_Details] = useState({});
  let [steps, setStep] = useState(localStorage.getItem("user_status"));
  let [HOST] = useState("https://reworkacademy.co/app/v2");
  let state = {
    fullStackState: [fullStack, setFullStack],
    ProjectAssignedState: [projectAssigned, setprojectAssigned],
    ProjectSubmittedstate: [projectSubmitted, setProjectSubmitted],
    FullStackAccepted: [fullStackAccepted, setFullStackAccepted],
    URL: [HOST],
    ae_User_ID: [ae_user_ID, ae_setUser_ID],
    ae_User_Details: [ae_user_details, ae_setUser_Details],
    ae_User_Status: [ae_user_Status, ae_setUser_Status],
    ae_Form_Step: [steps, setStep],
    ae_User_Info: [userInfo, setUserInfo]
  };

  return <Storage.Provider value={state}>{children}</Storage.Provider>;
};
export default StoreContext;
