import Nav from "./template/Nav";
import Footer from "./template/Footer";
import Topbar from "./template/Topbar";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Check } from "react-feather";
import Table from "react-bootstrap/Table";
import AppModal from "./components/AppModal";


function Sample() {
  return (
    <div id="wrapper" className="page-wrapper">
      <Nav />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar pageName="Sample Page" />

          <div className="container-fluid">
            {/* PAGE CONTENT SHOW START FROM HERE */}

            <h1>Enter Page Content Here</h1>
            <div class="row">
              <div class="col-md-4">
                <div class="card o-hidden border-0">
                  <div class="card-body p-3">
                    <div class="">
                      <div class="text-center">
                        <h1 class="h4 form-title">Sample Form</h1>
                        <p class="mb-2 form-description">Description</p>
                      </div>
                      <form class="user">
                        <div class="form-group">
                          <label for="exampleInputName">Name</label>
                          <input
                            type="text"
                            title="Please we need your name"
                            class="form-control form-control-user"
                            id="exampleInputName"
                            aria-describedby="nameHelp"
                            placeholder="Enter Name"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputEmail">Email</label>
                          <input
                            type="email"
                            title="Please we need your email"
                            class="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                          />
                        </div>

                        <div class="form-group">
                          <label for="exampleSelectGender">Gender</label>
                          <select
                            name="gender"
                            title="We need your gender"
                            class=" form-control form-control-select "
                            id="exampleSelectGender"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <Link
                          href="login.html"
                          class="btn btn-primary btn-user btn-block shadow-lg"
                        >
                          Reset Password
                        </Link>
                      </form>
                      <hr />
                      <div class="text-center">
                        <Link class="small" href="register.html">
                          Create an Account!
                        </Link>
                      </div>
                      <div class="text-center">
                        <Link class="small" href="login.html">
                          Already have an account? Login!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card  shadow py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center my-1">
                      <div class="col mr-2 ">
                        <h3 class=" text-xs font-weight-bold text-primary text-uppercase mb-1 my-2 small-card-title">
                          Earnings (Monthly)
                        </h3>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 my-2">
                          ₦40,000
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="card-icon bg-info p-2">
                          <Calendar />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <Link href="#" class="btn btn-primary btn-icon-split shadow">
                  <span class="text">Split Button Primary</span>
                  <span class="icon text-white-50">
                    <Check />
                  </span>
                </Link>
                <br />
                <br />
                <Link href="#" class="btn btn-white  shadow">
                  <Check className="text-success" />
                </Link>
                <br />
                <br />

                <h4>App Sample Modal</h4>
                <AppModal />
              </div>

              <div class="col-md-4">
                <div class="card mb-4">
                  <div class="card-header">Default Card Example</div>
                  <div class="card-body">
                    This card uses Bootstrap's default styling with no utility
                    classes added. Global styles are the only things modifying
                    the look and feel of this default card example.
                  </div>
                </div>
              </div>
            </div>

            {/* sample module manipulation */}
            <Link to="/phases"> Click to View Module Manipulation</Link>
            <Link to="/largecards"> Click to View Large cards with and without progress bar</Link>
            <Link to="/smallcards"> Click to View Small Cards</Link>
            <Link to="/chart"> Click to View Chart</Link>


            {/* SAMPLE TABLE START */}
            <br />
            <br />
            <h4>App Sample Table</h4>
            <div className="card o-hidden border-0">
              <div className="card-body p-3">
                <Table hover responsive="md">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td colSpan={2}>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>

            {/* SAMPLE TABLE ENDS */}

            {/* PAGE CONTENT ENDS HERE */}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Sample;
