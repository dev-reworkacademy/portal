import React from 'react'
import Footer from "./../../template/Footer";
import Nav from "./../../template/Nav";
import Topbar from "./../../template/Topbar";
import PasswordUpdate from './PasswordUpdate';


const PasswordOutlet = () => {
  return (
    <div id="wrapper" className="page-wrapper">
    <Nav />
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Topbar pageName="Setting / Password" />
        <div className="container-fluid">
          <PasswordUpdate />
        </div>
      </div>

      <Footer />
    </div>
  </div>
  )
}

export default PasswordOutlet