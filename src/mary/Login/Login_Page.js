import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Check, EyeOff, Eye } from 'react-feather';
import '../assets/css/profile.css';
import LoginComponent from './Login_Component';


function LoginPage() {
  return (
    <div id="content-wrapper" className="d-flex flex-column ">
      <div id="content">
        <div className="container-fluid">
    
             <LoginComponent />
      
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
