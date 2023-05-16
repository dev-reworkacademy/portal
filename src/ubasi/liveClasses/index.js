import React from "react";
import Nav from "../../template/Nav";
import Topbar from "../../template/Topbar";
import Footer from "../../template/Footer";
import '../assets/css/live-classes.css'
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <div id="wrapper" className="page-wrapper">
      <Nav />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar pageName="Live Classes" />
          <div className="container-fluid" style={{}}>
            <Outlet/>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default index;
