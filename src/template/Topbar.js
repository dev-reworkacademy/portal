import { User, Lock, LogOut } from "react-feather";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import axios from "axios";

class Topbar extends React.Component {
  constructor() {
    super();

    axios
      .get(
        "https://reworkacademy.co/app/v2/students/" +
          localStorage.getItem("userId")
      )
      .then((res) => {
         
        this.setState({ userData: res.data });

        if (res.data.course) {
          this.setState({ courseData: res.data.course });
          this.setState({ duration: res.data.course.duration });
        }
      });

    this.state = {
      userData: {},
      courseData: {},
      duration: ""
    };
  }
  render(props) {
    const sideBarClick = () => {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");

      $("#wrapper").removeClass("page-wrapper");
      $("#wrapper").addClass("mobile-wrapper");
      $(".sidebar").addClass("mobile-sidebar");

      if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar").hide();
        $(".collapse").hide();
      } else {
        $(".sidebar").show();
        $(".collapse").show();
      }
    };

    const { pageName, subName } = this.props;

    const exitApp = () => {
      
      // eslint-disable-next-line no-restricted-globals
      if(confirm("Are you sure you want to logout from Rework Academy Portal?")){
        console.log("Entere herir i think its loging out");
        localStorage.clear();
      window.location.href = "/";
      }
    };

    return (
      <div>
        <nav className="navbar navbar-expand navbar-light  topbar mb-4 static-top  ">
          <button
            id="sidebarToggleTop"
            onClick={sideBarClick}
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>

          <h5 className="h5 topbar-heading">
            {pageName} <br /> <span className="h6 sub-heading">{subName}</span>
          </h5>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow d-sm-none">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="searchDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-search fa-fw"></i>
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <li className="nav-item dropdown no-arrow mx-1">
              {/* <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="alertsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-bell fa-fw"></i>
                <span className="badge badge-danger badge-counter">3+</span>
              </Link> */}
              <div
                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="alertsDropdown"
              >
                <h6 className="dropdown-header">Alerts Center</h6>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                >
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 12, 2019</div>
                    <span className="font-weight-bold">
                      A new monthly report is ready to download!
                    </span>
                  </div>
                </Link>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                >
                  <div className="mr-3">
                    <div className="icon-circle bg-success">
                      <i className="fas fa-donate text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 7, 2019</div>
                    $290.29 has been deposited into your account!
                  </div>
                </Link>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                >
                  <div className="mr-3">
                    <div className="icon-circle bg-warning">
                      <i className="fas fa-exclamation-triangle text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 2, 2019</div>
                    Spending Alert: We've noticed unusually high spending for
                    your account.
                  </div>
                </Link>
                <Link
                  className="dropdown-item text-center small text-gray-500"
                  to="#"
                >
                  Show All Alerts
                </Link>
              </div>
            </li>

            <li className="nav-item dropdown no-arrow mx-1">
              {/* <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="messagesDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-envelope fa-fw"></i>
                <span className="badge badge-danger badge-counter">7</span>
              </Link> */}
              <div
                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="messagesDropdown"
              >
                <h6 className="dropdown-header">Message Center</h6>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                >
                  <div className="dropdown-list-image mr-3">
                    <img
                      className="rounded-circle"
                      src="assets/img/undraw_profile_1.svg"
                      alt="..."
                    />
                    <div className="status-indicator bg-success"></div>
                  </div>
                  <div className="font-weight-bold">
                    <div className="text-truncate">
                      Hi there! I am wondering if you can help me with a problem
                      I've been having.
                    </div>
                    <div className="small text-gray-500">
                      Emily Fowler · 58m
                    </div>
                  </div>
                </Link>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                >
                  <div className="dropdown-list-image mr-3">
                    <img
                      className="rounded-circle"
                      src="assets/img/undraw_profile_2.svg"
                      alt="..."
                    />
                    <div className="status-indicator"></div>
                  </div>
                  <div>
                    <div className="text-truncate">
                      I have the photos that you ordered last month, how would
                      you like them sent to you?
                    </div>
                    <div className="small text-gray-500">Jae Chun · 1d</div>
                  </div>
                </Link>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                >
                  <div className="dropdown-list-image mr-3">
                    <img
                      className="rounded-circle"
                      src="assets/img/undraw_profile_3.svg"
                      alt="..."
                    />
                    <div className="status-indicator bg-warning"></div>
                  </div>
                  <div>
                    <div className="text-truncate">
                      Last month's report looks great, I am very happy with the
                      progress so far, keep up the good work!
                    </div>
                    <div className="small text-gray-500">
                      Morgan Alvarez · 2d
                    </div>
                  </div>
                </Link>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                >
                  <div className="dropdown-list-image mr-3">
                    <img
                      className="rounded-circle"
                      src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                      alt="..."
                    />
                    <div className="status-indicator bg-success"></div>
                  </div>
                  <div>
                    <div className="text-truncate">
                      Am I a good boy? The reason I ask is because someone told
                      me that people say this to all dogs, even if they aren't
                      good...
                    </div>
                    <div className="small text-gray-500">
                      Chicken the Dog · 2w
                    </div>
                  </div>
                </Link>
                <Link
                  className="dropdown-item text-center small text-gray-500"
                  to="#"
                >
                  Read More Messages
                </Link>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

            <li className="nav-item dropdown no-arrow profile-drop">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {this.state.userData.first_name}{" "}
                  {this.state.userData.last_name}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src="assets/img/profile-default.png"
                />
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                {window.location.pathname == "/entryview"?<div></div>:<><Link className="dropdown-item text-gray-800 " to="/profile">
                  <User className="mr-2 text-gray-800 " size={18} />
                  Profile
                </Link>
                <Link className="dropdown-item text-gray-800 " to="/password">
                  <Lock className="mr-2 text-gray-800 " size={18} />
                  Change Password
                </Link></>}

                

                <div className="dropdown-divider"></div>
                <Link
                  className="dropdown-item text-danger"
                  to="#"
                  onClick={exitApp}
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <LogOut
                    className="mr-2 text-danger " 
                    size={18}
                  />
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </nav>

        <div className="container-fluid"></div>
      </div>
    );
  }
}
export default Topbar;
