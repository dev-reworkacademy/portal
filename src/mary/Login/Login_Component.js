import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "react-feather";
import logo from "../assets/img/logo.png";
import "../assets/css/login.css";
import { Storage } from "../../context/Store";
import { SyncLoader } from 'react-spinners';
import axios from "axios";

function LoginComponent() {
  let data = useContext(Storage);
  let [steps, setStep] = data.ae_Form_Step;
  let navigate = useNavigate();
  let [ae_user_ID, ae_setUser_ID] = data.ae_User_ID;
  let [ae_user_Status, ae_setUser_Status] = data.ae_User_Status;
  //   let [ae_user_details, ae_setUser_Details] = data.ae_User_Details;
  let [username, setUsername] = useState("");
  let [passwd, setPasswd] = useState("");
  let [LoginMsg, setLoginMsg] = useState("");
  let [passwdHide, setPasswdHide] = useState(true);
  let [AllErrors, setAllErrors] = React.useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let HOST = data.URL;

  const handleHidepasswd = () => {
    setPasswdHide(!passwdHide);
  };

  let LoginNavigate = (e) => {
    e.preventDefault();
    let url = HOST + "/auth/login";

    let payload = {
      username,
      passwd
    };
    setIsLoading(true);
    fetch(url, {
      headers: {
        "content-type": "application/json"
      },
      method: "Post",
      body: JSON.stringify(payload)
    })
      .then((result) => result.json())
      .then(async (res) => {
        if (res.code === 404) {
          setIsLoading(false);
          setLoginMsg(res.msg);
        } else if (res.code === 200) {
          setUsername("");
          setPasswd("");
          setLoginMsg(res.msg);
          localStorage.setItem("userId", res.data.id);
          let geturl = `${HOST}/students/${res.data.id}`;
          const result = await axios.get(geturl);
          localStorage.setItem("user", JSON.stringify(result.data));
          localStorage.setItem("user_status", res.data.reg_status);
          setStep(res.data.reg_status);

          console.log(result);
           if(res.data.learning_mode==="PHYSICAL"||res.data.learning_mode==="VIRTUAL" ){
            if (
              res.data.reg_status === "ENTRY"
            ) {
              navigate("/entryview");
            } else if (res.data.reg_status === "COMPLETED") {
              navigate("/dashboard");
            } else {
              navigate("/register");
            }
           }else if(res.data.learning_mode==="SELF_PACE"){
            if ( res.data.reg_status === "COMPLETED" && res.data.has_passed_assessment===false) {
              navigate("/assessments");
            } else if (res.data.reg_status === "COMPLETED" && res.data.has_passed_assessment===true) {
              navigate("/dashboard");
            } 
           }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {" "}
      <div class="row ">
          <div class=" ae_form_container">
            <div class="card o-hidden shadow-lg " style={{border:"1px solid #eaeaea"}}>
              <div class="card-body p-3">
                <div class="">
                  <div class="text-center">
                    <div class="ae_logIn_logo">
                      <img src={logo} />
                      
                    </div>
                    <p className="text-muted"><b>REWORK ACADEMY</b></p>
                    <br/>
                    <h1 class="h4 form-title"><b>Welcome Back</b></h1>
                    <p class="mb-2 form-description">
                      Login with the fields below
                    </p>
                  </div>
                  <form class="user ">
                    <div class="form-group">
                      <label for="exampleInputName">Email</label>
                      <input
                        type="email"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        title="Please enter your username"
                        class="form-control form-control-user"
                        id="exampleInputName"
                        aria-describedby="nameHelp"
                        placeholder="Username"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputusername">Password</label>
                      <input
                        type={passwdHide ? "password" : "text"}
                        value={passwd}
                        name="passwd"
                        onChange={(e) => setPasswd(e.target.value)}
                        title="Please enter your passwd"
                        class="form-control form-control-user"
                        id="exampleInputusername"
                        aria-describedby="usernameHelp"
                        placeholder="password"
                      />
                      <span
                        onClick={handleHidepasswd}
                        className=""
                        style={{
                          position: "absolute",
                          marginTop: "-37px",
                          marginLeft: "83%"
                        }}
                      >
                        {passwdHide ? (
                          <EyeOff size={"18px"} />
                        ) : (
                          <Eye size={"18px"} />
                        )}
                      </span>
                    </div>

                    <button
                      onClick={LoginNavigate}
                      class="btn btn-primary btn-user btn-block shadow-sm mt-5"
                    >
                     {isLoading?<SyncLoader color="white" size={8} />:" Log In"}
                    </button>
                  </form>
                  <p className="ae_error_msg">{LoginMsg}</p>
                  <div class="text-center p-4">
                    <p class="mb-2 form-description small">
                      Don’t have an account?{" "}
                      <span>
                        {" "}
                        <Link to="/register" style={{ color: "#3751FF" }}>
                          Sign up
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default LoginComponent;
