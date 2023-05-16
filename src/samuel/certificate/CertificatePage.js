import React from 'react'

import Footer from "./../../template/Footer";
import Nav from "./../../template/Nav";
import Topbar from "./../../template/Topbar";
import CertificateComponent from './CertificateComponent';

const CertificatePage = () => {
  return (
    <div id="wrapper" className="page-wrapper">
    <Nav />
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Topbar pageName="Certificate" />
        <div className="container-fluid">
        <CertificateComponent />
        </div>
      </div>

      <Footer />
    </div>
  </div>
  )
}

export default CertificatePage