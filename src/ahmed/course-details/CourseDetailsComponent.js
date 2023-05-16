import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { BookOpen, Send, CheckCircle, Loader } from "react-feather";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import { Storage } from "../../context/Store";

function CourseDetailsComponent(props) {
  let store = useContext(Storage);
  const [assignment, setAssignment] = useState(
    "active-tab-assignment-project-forum"
  );
  const [assignmentTabBody, setAssignmentTab] = useState("block");
  const [projectTabBody, setProjectTab] = useState("none");
  const [project, setProject] = useState("");
  const [forum, setForum] = useState("");
  const [forumTabBody, setForumTab] = useState("none");
  let [timer_assignment_ah, setAssignmentTimer] = useState();
  let [timer_project_ah, setProjectTimer] = useState();
  let [user_id] = store.ae_User_ID;
  let baseUrl = store.URL;
  let [user_type, setUserType] = useState("student");
  let [msg, setMsg] = useState("");
  let [err, setErr] = useState("");

  let task = props.taskData;
  let assignment_details = props.assignmentData;
  let project_details = props.projectData;
  let forum_details = props.forum;

  let switchToAssignment = () => {
    setAssignment("active-tab-assignment-project-forum");
    setProject("");
    setForum("");
    setAssignmentTab("block");
    setProjectTab("none");
    setForumTab("none");
  };

  let switchToProject = () => {
    setAssignment("");
    setProject("active-tab-assignment-project-forum");
    setForum("");
    setAssignmentTab("none");
    setProjectTab("block");
    setForumTab("none");
  };

  let switchToForum = () => {
    setAssignment("");
    setProject("");
    setForum("active-tab-assignment-project-forum");
    setForumTab("block");
    setAssignmentTab("none");
    setProjectTab("none");
  };

  let openResource = (e) => {
    window.open(e, "_blank");
  };

  let postReview = () => {
    let data = { user_id, user_type, msg };
    let url = baseUrl + "/forums";

    fetch(url, {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((e) => e.json())
      .then((result) => {
        setErr(result.msg);
      });
    setMsg("");
  };

  return (
    <>
      <div>
        <div className="row mx-3 mb-3">
          <div className="col-lg-8">
            <div className="mb-3 pb-3 main-course-details-container-ah">
              <div>
                <div className="card-ah">
                  <div className="card-img-ah">
                    <span style={{ left: "24px" }}>
                      <p>{props.status}</p>
                    </span>
                    <img src={props.img} alt="" />
                  </div>
                  <div className="card-content-ah mt-5">
                    <h3>{props.title}</h3>

                    <div
                      id="duration-Start-ah"
                      className="card-sub-ah flex-wrap-ah mb-3"
                    >
                      <section
                        className="flex-wrap-ah mr-4"
                        style={{ display: props.startDisplay }}
                      >
                        <h6>duration:</h6>
                        <p>{props.duration}</p>
                      </section>

                      <section
                        className="flex-wrap-ah mr-4"
                        style={{ display: props.startDisplay }}
                      >
                        <h6>start date:</h6>
                        <p style={{ textTransform: "capitalize" }}>
                          {props.startDate}
                        </p>
                      </section>
                      <section className="flex-wrap-ah">
                        <h6>est end date:</h6>
                        <p style={{ textTransform: "capitalize" }}>
                          {props.endDate}
                        </p>
                      </section>
                    </div>

                    <div className="about-course-ah">
                      <h6>about course:</h6>
                      <p>{props.about}</p>
                    </div>

                    <div
                      className="class-days-section-ah row g-3"
                      style={{ display: props.hideSection }}
                    >
                      <div className="col-md-3 col-6 p-0 text-center">
                        <section>
                          <h5>class days</h5>

                          <div
                            className="flex"
                            style={{
                              flexWrap: "wrap",
                              justifyContent: "space-evenly"
                            }}
                          >
                            {props.days.map((e, i) => {
                              return <p>{e}</p>;
                            })}
                          </div>
                        </section>
                      </div>

                      <div className="col-md-2 col-6 p-0 text-center">
                        <section id="location-section-ah">
                          <h5>location</h5>
                          <div
                            className="flex"
                            style={{
                              flexWrap: "wrap",
                              justifyContent: "space-evenly"
                            }}
                          >
                            {props.location.map((e, i) => {
                              return <p>{e}</p>;
                            })}
                          </div>
                        </section>
                      </div>

                      <div className="col-md-2 col-6 p-0 text-center">
                        <section>
                          <h5>room</h5>
                          <p>{props.room}</p>
                        </section>
                      </div>

                      <div className="col-md-2 col-6 p-0 text-center">
                        <section id="trainer-section-ah">
                          <h5>trainer</h5>
                          <p>{props.trainer}</p>
                        </section>
                      </div>

                      <div className="col-md-3 col-6 p-0 text-center">
                        <section id="time-section-ah">
                          <h5>time</h5>

                          <div
                            className="flex"
                            style={{
                              flexWrap: "wrap",
                              justifyContent: "center"
                            }}
                          >
                            {props.time.map((e, i) => {
                              return (
                                <>
                                  <p>{e.from}</p>
                                  <p>-</p>
                                  <p>{e.to}</p>
                                </>
                              );
                            })}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="assignment-project-tab-ah mt-5"
                style={{ display: props.hideSection1 }}
              >
                <div className="assignment-project-tab-header-ah flex">
                  <span className={assignment} onClick={switchToAssignment}>
                    <h6>assignment</h6>
                    <p>1</p>
                  </span>
                  <span className={project} onClick={switchToProject}>
                    <h6>project</h6>
                    <p>1</p>
                  </span>
                  <span className={forum} onClick={switchToForum}>
                    <h6>forum</h6>
                    <p>5</p>
                  </span>
                </div>

                {/* assignment accordion section */}
                <div
                  className="assignment-accordion-ah mt-4 px-3"
                  style={{ display: assignmentTabBody }}
                >
                  {assignment_details.map((e, i) => {
                    let color;
                    let submitDisplay;
                    let currentDisplay;
                    if (e.status == "CURRENT") {
                      submitDisplay = "none";
                      currentDisplay = "block";
                    } else if (e.status == "COMPLETED") {
                      color = "#00A52E";
                      submitDisplay = "block";
                      currentDisplay = "none";
                    } else if (e.status == "APPROVED") {
                      color = "#00AFEF";
                      submitDisplay = "block";
                      currentDisplay = "none";
                    } else if (e.status == "EXPIRED") {
                      color = "#FF5A5A";
                      submitDisplay = "block";
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
                        setAssignmentTimer(
                          days +
                            "d " +
                            hours +
                            "hr " +
                            minutes +
                            "m " +
                            seconds +
                            "s "
                        );
                        if (distance < 0) return setAssignmentTimer("Expired");
                      }, 1000);
                    }
                    return (
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey={i} id="acc" className="mb-4">
                          <Accordion.Header className="flex accordion-head-ah">
                            <h5 className="col-lg-5">{e.title}</h5>

                            <p className="col-lg-3">{e.deadline}</p>

                            <p
                              className="col-lg-3"
                              style={{ display: currentDisplay }}
                            >
                              {timer_assignment_ah}
                            </p>

                            <p
                              className="col-lg-3"
                              style={{
                                color: color,
                                fontWeight: "700",
                                display: submitDisplay
                              }}
                            >
                              {e.status}
                            </p>
                          </Accordion.Header>
                          <Accordion.Body className="accordion-body-ah">
                            {e.descp}
                          </Accordion.Body>
                          <Accordion.Body
                            className="flex"
                            style={{
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              gap: "20px"
                            }}
                          >
                            <div>
                              <span
                                class="btn btn-primary btn-user btn-block shadow-lg"
                                onClick={() => openResource(e.resource_links)}
                              >
                                Download Resources
                              </span>
                            </div>
                            <div>
                              <Link to="/assignment-details">
                                <span
                                  class="btn btn-primary btn-user btn-block shadow-lg"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  go to the assignment page
                                </span>
                              </Link>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    );
                  })}
                </div>

                {/* project accordion section */}
                <div
                  className="assignment-accordion-ah mt-4 px-3"
                  style={{ display: projectTabBody }}
                >
                  {project_details.map((e, i) => {
                    let color;
                    let submitDisplay;
                    let currentDisplay;
                    if (e.status == "CURRENT") {
                      submitDisplay = "none";
                      currentDisplay = "block";
                    } else if (e.status == "COMPLETED") {
                      color = "#00A52E";
                      submitDisplay = "block";
                      currentDisplay = "none";
                    } else if (e.status == "APPROVED") {
                      color = "#00AFEF";
                      submitDisplay = "block";
                      currentDisplay = "none";
                    } else if (e.status == "EXPIRED") {
                      color = "#FF5A5A";
                      submitDisplay = "block";
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
                        setProjectTimer(
                          days +
                            "d " +
                            hours +
                            "hr " +
                            minutes +
                            "m " +
                            seconds +
                            "s "
                        );
                        if (distance < 0) return setProjectTimer("Expired");
                      }, 1000);
                    }
                    return (
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey={i} id="acc" className="mb-4">
                          <Accordion.Header className="flex accordion-head-ah">
                            <h5 className="col-lg-5">{e.title}</h5>

                            <p className="col-lg-3">{e.deadline}</p>

                            <p
                              className="col-lg-3"
                              style={{ display: currentDisplay }}
                            >
                              {timer_project_ah}
                            </p>

                            <p
                              className="col-lg-3"
                              style={{
                                color: color,
                                fontWeight: "700",
                                display: submitDisplay
                              }}
                            >
                              {e.status}
                            </p>
                          </Accordion.Header>
                          <Accordion.Body className="accordion-body-ah">
                            {e.descp}
                          </Accordion.Body>
                          <Accordion.Body
                            className="flex"
                            style={{
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              gap: "20px"
                            }}
                          >
                            <div>
                              <span
                                class="btn btn-primary btn-user btn-block shadow-lg"
                                onClick={() => openResource(e.resource_links)}
                              >
                                Download Resources
                              </span>
                            </div>
                            <div>
                              <Link to="/assignment-details">
                                <span
                                  class="btn btn-primary btn-user btn-block shadow-lg"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  go to the assignment page
                                </span>
                              </Link>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    );
                  })}
                </div>

                {/* forum section */}
                <div className="mt-4 mb-3" style={{ display: forumTabBody }}>
                  <div className="container">
                    <p>{err}</p>
                    <div className="post-forum-ah">
                      <input
                        type="text"
                        placeholder="Type here to post to forum"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      <button>
                        <Send
                          style={{ color: "white" }}
                          onClick={() => postReview()}
                        />
                      </button>
                    </div>

                    <div className="forum-body-ah mt-3">
                      {forum_details.map((e, i) => {
                        let showTrainer;
                        if (e.user_type === "trainer") {
                          showTrainer = "flex";
                        } else {
                          showTrainer = "none";
                        }
                        return (
                          <div className="forum-msgs-ah mt-4 px-4 py-2">
                            <div className="forum-msgs-header-ah">
                              <div className="flex">
                                <img className="me-3" src={e.avatar} alt="" />
                                <h6>{e.name}</h6>
                                <h5
                                  id="trainer-ah"
                                  style={{ display: showTrainer }}
                                >
                                  {e.user_type}
                                </h5>
                              </div>
                              <p>{e.created_at}</p>
                            </div>

                            <div className="forum-msgs-body-ah">
                              <p>{e.msg}</p>
                            </div>
                          </div>
                        );
                      })}

                      {/* <div className="forum-msgs-ah mt-4 px-4 py-2">
                                            <div className="forum-msgs-header-ah">
                                                <div className="flex">
                                                    <img className="me-3" src={img4} alt="" />
                                                    <h6>mr james kalu</h6>
                                                </div>
                                                <p>2hrs ago</p>
                                            </div>

                                            <div className="forum-msgs-body-ah">
                                                <p>New-overview App Ui, Ui Ux, Web App, Form Design, Ui. Dribbble ... Project submission form. rypearts.com Ui Forms, Pattern Meaning, Web Design Tips.
                                                    New-overview App Ui, Ui Ux, Web App, Form Design, Ui. Dribbble ... Project submission form. rypearts.com Ui Forms, Pattern Meaning, Web Design Tips.
                                                    Web Design Tips.
                                                    New-
                                                </p>
                                            </div>
                                        </div>

                                        <div className="forum-msgs-ah mt-4 px-4 py-2">
                                            <div className="forum-msgs-header-ah">
                                                <div className="flex">
                                                    <img className="me-3" src={img3} alt="" />
                                                    <h6>admin</h6>
                                                </div>
                                                <p>4hrs ago</p>
                                            </div>

                                            <div className="forum-msgs-body-ah">
                                                <p>New-overview App Ui, Ui Ux, Web App, Form Design, Ui. Dribbble ... Project submission form. rypearts.com Ui Forms, Pattern Meaning, Web Design Tips.
                                                    New-overview App Ui, Ui Ux, Web App, Form Design, Ui. Dribbble ... Project submission form. rypearts.com Ui Forms, Pattern Meaning, Web Design Tips.
                                                    Web Design Tips.
                                                    New-
                                                </p>
                                            </div>
                                        </div>

                                        <div className="forum-msgs-ah mt-4 px-4 py-2">
                                            <div className="forum-msgs-header-ah">
                                                <div className="flex">
                                                    <img className="me-3" src={img2} alt="" />
                                                    <h6>samuel</h6>
                                                </div>
                                                <p>2hrs ago</p>
                                            </div>

                                            <div className="forum-msgs-body-ah">
                                                <p>New-overview App Ui, Ui Ux, Web App, Form Design, Ui. Dribbble ... Project submission form. rypearts.com Ui Forms, Pattern Meaning, Web Design Tips.
                                                    New-overview App Ui, Ui Ux, Web App, Form Design, Ui. Dribbble ... Project submission form. rypearts.com Ui Forms, Pattern Meaning, Web Design Tips.
                                                    Web Design Tips.
                                                    New-
                                                </p>
                                            </div>
                                        </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-3`">
            <div className="course-days-ah">
              <div className="py-2">
                <div className="container days-header-ah">
                  <p>current module</p>
                  <h4>use external javascript files.</h4>

                  <div className="card-sub-ah flex">
                    <BookOpen
                      style={{
                        height: "20px",
                        width: "20px",
                        color: "black",
                        marginRight: "10px"
                      }}
                    />
                    <p>
                      Modules {props.current} of {props.total}
                    </p>
                  </div>
                  <div
                    style={{
                      border: "1px solid #00AFEF",
                      padding: "2px 6px",
                      borderRadius: "20px",
                      display: props.progressDisplay,
                      marginBottom: "15px"
                    }}
                  >
                    <ProgressBar
                      now={props.progress}
                      style={{ height: "6px", color: "#00AFEF" }}
                    />
                  </div>
                </div>

                <hr style={{ borderBottom: "1px solid grey" }} />

                <div className="container days-body-ah">
                  <h6>module breakdown</h6>
                  {task.map((e, i) => {
                    let arr = e.topics;
                    return (
                      <div className="day-activity-ah">
                        <h5 className="mb-3">{e.title}</h5>
                        {arr.map((x, i) => {
                          let done;
                          let pending;
                          if (x.completed == true) {
                            done = "block";
                            pending = "none";
                          } else if (x.completed == false) {
                            done = "none";
                            pending = "block";
                          }
                          return (
                            <div className="flex">
                              <Loader
                                id="day-loader-ah"
                                style={{ display: pending }}
                              />
                              <CheckCircle
                                id="day-check-ah"
                                style={{ display: done }}
                              />
                              <p>{x.topic}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetailsComponent;
