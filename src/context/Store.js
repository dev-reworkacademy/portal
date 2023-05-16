import React, { useState, createContext } from "react";

export const Storage = createContext();
const StoreContext = ({ children }) => {
  let [ae_fullStack, ae_setFullStack] = useState("");
  let [ae_projectAssigned, ae_setprojectAssigned] = useState(true);
  let [ae_projectSubmitted, ae_setProjectSubmitted] = useState(false);
  let [ae_fullStackAccepted, ae_setFullStackAccepted] = useState(false);
  let [ae_user_ID, ae_setUser_ID] = useState(localStorage.getItem('userId'));
  let [ae_user_Status, ae_setUser_Status] = useState(
    localStorage.getItem('user_status'),
  );
  let [ae_user_details, ae_setUser_Details] = useState({});
  let [steps, setStep] = useState(localStorage.getItem('user_status'));
  console.log(process.env)
 
  let [HOST] = useState("https://reworkstaging.name.ng/api/v2");
  let state = {
    ae_FullStackState: [ae_fullStack, ae_setFullStack],
    ae_ProjectAssignedState: [ae_projectAssigned, ae_setprojectAssigned],
    ae_ProjectSubmittedstate: [ae_projectSubmitted, ae_setProjectSubmitted],
    ae_FullStackAccepted: [ae_fullStackAccepted, ae_setFullStackAccepted],
    // ae_User_ID: ae_user_ID,
    ae_User_ID: [ae_user_ID, ae_setUser_ID],
    ae_User_Details: [ae_user_details, ae_setUser_Details],
    ae_User_Status: [ae_user_Status, ae_setUser_Status],
    URL: [HOST],
    ae_Form_Step: [steps, setStep]
  };

  return <Storage.Provider value={state}>{children}</Storage.Provider>;
};
export default StoreContext;
