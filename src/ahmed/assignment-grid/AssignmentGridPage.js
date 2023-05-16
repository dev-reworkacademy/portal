import React, { useEffect, useState, useContext } from "react";
import Footer from "../../template/Footer";
import Nav from "../../template/Nav";
import Topbar from "../../template/Topbar";
import "../assets/css/project-grid.css";
import AssignmentGridComponent from "./AssignmentGridComponent";
import { RiseLoader } from "react-spinners";
import { Storage } from "../../context/Store";
import LoadingMsg from "../../components/LoadingMsg";
function AssignmentGridPage() {
  let store = useContext(Storage);
  let [baseUrl] = store.URL;
  let [timer_ah, setTimer] = useState();
  let [assignment, setAssignment] = useState([]);
  let [course, setCourse] = useState("");

  useEffect(() => {
    loadAssignments();
    getUSer();
  }, []);

  let [user_id] = store.ae_User_ID;

  let loadAssignments = () => {
    let url = baseUrl + "/students/" + user_id + "/assessments?type=assignment";
    fetch(url)
      .then((e) => e.json())
      .then((res) => setAssignment(res));
  };

  let getUSer = () => {
    let url = baseUrl + "/students/" + user_id + "/info";
    fetch(url)
      .then((e) => e.json())
      .then((res) => setCourse(res.course.name));
  };
  return (
    <>
      <div id="wrapper" className="page-wrapper">
        <Nav />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar pageName={"Assignments - " + course} />

            <div className="container-fluid">
              <div className="row">
                {assignment.length == 0 ? (
                  <LoadingMsg/>
                ) : (
                  assignment.map((e, i) => {
                    let color;
                    let submitDisplay;
                    let approveDisplay;
                    let expiredDisplay;
                    let currentDisplay;
                    if (e.status == "CURRENT") {
                      color = "#FEC400";
                      submitDisplay = "none";
                      approveDisplay = "none";
                      expiredDisplay = "none";
                      currentDisplay = "block";
                    } else if (e.status == "COMPLETED") {
                      color = "#00A52E";
                      submitDisplay = "block";
                      approveDisplay = "none";
                      expiredDisplay = "none";
                      currentDisplay = "none";
                    } else if (e.status == "APPROVED") {
                      color = "#00AFEF";
                      submitDisplay = "none";
                      approveDisplay = "block";
                      expiredDisplay = "none";
                      currentDisplay = "none";
                    } else if (e.status == "EXPIRED") {
                      color = "#FF5A5A";
                      submitDisplay = "none";
                      approveDisplay = "none";
                      expiredDisplay = "block";
                      currentDisplay = "none";
                    }

                    let countDownDate = new Date(e.end_date).getTime();
                    if (e.status == "CURRENT") {
                      setInterval(function () {
                        // Get today's date and time
                        let now = new Date().getTime();
                        // Find the distance between now and the count down date
                        let distance = countDownDate - now;
                        // Time calculations for days, hours, minutes and seconds
                        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        let hours = Math.floor(
                          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                        );
                        let minutes = Math.floor(
                          (distance % (1000 * 60 * 60)) / (1000 * 60)
                        );
                        let seconds = Math.floor(
                          (distance % (1000 * 60)) / 1000
                        );
                        setTimer(
                          days +
                            "d " +
                            hours +
                            "hr " +
                            minutes +
                            "m " +
                            seconds +
                            "s "
                        );
                        if (distance < 0) return setTimer("Expired");
                      }, 1000);
                    }

                    return (
                      <div class="col-lg-4 col-md-6">
                        <div class="card mb-4">
                          <div className="">
                            <AssignmentGridComponent
                              key={i}
                              id={e.id}
                              countDown={timer_ah}
                              statusColor={color}
                              title={e.title}
                              topic={e.module}
                              status={e.status}
                              end={e.end_date}
                              sumbit={e.submitted_date}
                              approve={e.submitted_date}
                              note={e.descp}
                              totalTask={e.total_task}
                              pending={e.total_pending}
                              completed={e.total_completed}
                              chat={e.remarks}
                              resources={e.resource_links}
                              submitDisplay={submitDisplay}
                              approveDisplay={approveDisplay}
                              expiredDisplay={expiredDisplay}
                              currentDisplay={currentDisplay}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default AssignmentGridPage;
