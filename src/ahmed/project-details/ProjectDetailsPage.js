import React, { useEffect, useState, useContext } from "react";
import Footer from "../../template/Footer";
import Nav from "../../template/Nav";
import Topbar from "../../template/Topbar";
import '../assets/css/project-details.css';
import ProjectPhaseComponent from "./ProjectPhaseComponent";
import ProjectReviewComponent from "./ProjectReviewComponent";
import ProjectSubmitPhaseComponent from "./ProjectSubmitPhaseComponent";
import { Code, Paperclip, Send } from 'react-feather';
import Button from "react-bootstrap/Button";
import ProjectUploadFileComponent from "./ProjectUploadFilePhaseComponent";
import { RiseLoader } from 'react-spinners';

import { useParams } from "react-router-dom";
import { Storage } from "../../context/Store";
import LoadingMsg from "../../components/LoadingMsg";



function ProjectDetailsPage() {
    let store = useContext(Storage);
    let [baseUrl] = store.URL;
    let [timer, setTimer] = useState();
    let [projectDetails, setProjectDetails] = useState([]);
    let [phase, setPhase] = useState([]);
    let id = useParams();

    let statusColor;

    let [user_id] = store.ae_User_ID;
    let [user_type, setUserType] = useState("student");
    let [msg, setMsg] = useState("");
    let [err, setErr] = useState("");
    let [review, setReview] = useState([]);

    useEffect(() => {
        loadProjectDetails();
        loadPhases();
        loadReview();
    }, []);

    let openResource = (e) => {
        window.open(e, '_blank')
    };

    let loadProjectDetails = () => {
        let url = baseUrl + "/students/" + user_id + "/assessments/" + id.id + "?type=projects";
        fetch(url)
            .then((e) => e.json())
            .then(res => {
                if (!res.msg) {
                    setProjectDetails([res])
                }
            })
    };

    let loadPhases = () => {
        let url = baseUrl + "/students/" + user_id + "/assessments/" + id.id + "?type=projects";
        fetch(url)
            .then((e) => e.json())
            .then(res => setPhase(res.phases))
    };

    let postReview = () => {
        let data = { user_id, user_type, msg }
        let url = baseUrl + "/forums";

        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(e => e.json())
            .then(result => {
                setErr(result.msg)
            })
        setMsg("")
    };

    let loadReview = () => {
        let url = baseUrl + "/forums?batch=batch_10&slot=weekday";
        fetch(url)
            .then((e) => e.json())
            .then((res) => setReview(res))
    };

    return <>
        <div id="wrapper" className="page-wrapper">
            <Nav />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {projectDetails.length === 0 ?
                        <Topbar pageName="Project Details" /> :
                        projectDetails.map((e, i) => {
                            return (
                                <Topbar pageName="Project Details" subName={e.title} />
                            )
                        })}

                    <div className="container">

                        {projectDetails.length === 0 ?
                            <LoadingMsg /> :
                            <div className="row mb-3 g-3">
                                <div className="col-md-8">
                                    <div className="project-details-ah px-4 py-3">
                                        {projectDetails.map((e, i) => {
                                            if (e.status === "CURRENT") {
                                                statusColor = "#FEC400"
                                            } else if (e.status === "COMPLATED") {
                                                statusColor = "#00A52E"
                                            } else if (e.status === "APPROVED") {
                                                statusColor = "#00AFEF"
                                            } else {
                                                statusColor = "#FF5A5A"
                                            };
                                            return (<>
                                                <div className="project-grid-status-ah flex-btw-ah">
                                                    <span style={{ backgroundColor: statusColor }}>
                                                        <Code />
                                                    </span>
                                                    <p style={{ backgroundColor: statusColor }}>{e.status}</p>
                                                </div>

                                                <div className="project-grid-header-ah mt-3">
                                                    <h1>{e.title}</h1>
                                                </div>

                                                <div id="duration-Start-ah" className="card-sub-ah flex-wrap-ah mb-3">
                                                    <section className="flex-wrap-ah mr-4">
                                                        <h6>duration:</h6>
                                                        <p>{e.duration}</p>
                                                    </section>

                                                    <section className="flex-wrap-ah mr-4">
                                                        <h6>start date:</h6>
                                                        <p style={{ textTransform: "capitalize" }}>{e.start_date}</p>
                                                    </section>
                                                    <section className="flex-wrap-ah">
                                                        <h6>est end date:</h6>
                                                        <p style={{ textTransform: "capitalize" }}>{e.end_date}</p>
                                                    </section>
                                                </div>

                                                <div className="about-course-ah">
                                                    <h6>project instructions</h6>
                                                    <p>
                                                        {e.descp}
                                                    </p>
                                                </div>

                                                <div>
                                                    <Button className="shadow py-2" variant="" id="btn-resources-ah" onClick={() => openResource(e.resource_links)}>
                                                        <Paperclip id="clip-resources-ah" />
                                                        download resources
                                                    </Button>
                                                </div>
                                            </>
                                            )
                                        })}

                                        {phase.map((e, i) => {
                                            let pendingStatus;
                                            let currentStatus;

                                            if (e.status === "PENDING") {
                                                pendingStatus = "flex"
                                                currentStatus = "none"
                                            } else {
                                                pendingStatus = "none"
                                                currentStatus = "flex"
                                            };

                                            let countDownDate = new Date(e.end_date).getTime();
                                            if (e.status === "CURRENT") {
                                                setInterval(function () {
                                                    // Get today's date and time
                                                    let now = new Date().getTime();
                                                    // Find the distance between now and the count down date
                                                    let distance = countDownDate - now;
                                                    // Time calculations for days, hours, minutes and seconds
                                                    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                                    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                                                    setTimer(days + "d " + hours + "hr " + minutes + "m " + seconds + "s ")
                                                    if (distance < 0) return setTimer("Expired")
                                                }, 1000);
                                            };

                                            return (
                                                <ProjectPhaseComponent
                                                    taskData={e.tasks}
                                                    phaseNo={e.name}
                                                    countDownTimer={timer}
                                                    startDate={e.start_date}
                                                    eventKey={i}
                                                    currentPhase={currentStatus}
                                                    pendingPhase={pendingStatus}
                                                />
                                            )
                                        })}


                                        <div className="mt-5">
                                            {/* review section */}
                                            <div className="mb-3">
                                                <h6 id="project-review-ah">reviews</h6>
                                                <p>{err}</p>
                                                <div className="post-forum-ah">
                                                    <input type="text" placeholder="Type here to post to forum" value={msg} onChange={(e) => setMsg(e.target.value)} />
                                                    <button>
                                                        <Send style={{ color: "white" }} onClick={() => postReview()} />
                                                    </button>
                                                </div>

                                                {/* <div className="forum-body-ah mt-3">
                                                    {review.map((e, i) => {
                                                        let showTrainer;
                                                        if (e.user_type === "trainer") {
                                                            showTrainer = "flex"
                                                        } else {
                                                            showTrainer = "none"
                                                        }
                                                        return (
                                                            <ProjectReviewComponent
                                                                key={i}
                                                                image={e.avatar}
                                                                name={e.name}
                                                                time={e.created_at}
                                                                body={e.msg}
                                                                trainer={showTrainer}
                                                            />
                                                        )
                                                    })}
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-4">
                                    <div className="project-details-ah pb-3">
                                        <div className="py-3 submit-card-header-ah" style={{ borderBottom: "1px solid silver" }}>
                                            <h1 className="mx-4">submit phase</h1>
                                        </div>

                                        <div className="pt-2 submit-card-body-ah" >
                                            <p className="mx-5">
                                                Make sure to zip the entire project folder and upload the zipped file using the box below
                                            </p>

                                            {/* upload of file section */}
                                            {phase.map((e, i) => {
                                                let color;
                                                let btn;
                                                let show;
                                                if (e.submitted < e.submission_trials) {
                                                    color = "#00AFEF";
                                                    btn = false;
                                                } else if (e.submitted === e.submission_trials) {
                                                    color = "#FF0000";
                                                    btn = true;
                                                }

                                                if (e.status === "EXPIRED") {
                                                    color = "#FF0000";
                                                    btn = true;
                                                } else if (e.status === "PENDING") {
                                                    show = "none"
                                                }
                                                return (
                                                    <ProjectSubmitPhaseComponent
                                                        currentSubmission={e.submitted}
                                                        maxSubmission={e.submission_trials}
                                                        phaseNo={e.name}
                                                        color={color}
                                                        disableBtn={btn}
                                                        index={i}
                                                        showSubmit={show}
                                                        assessment={id.id}
                                                        phaseId={e.id}
                                                    />
                                                )
                                            })}


                                            {/* submitted files section */}
                                            {phase.map((e, i) => {
                                                if (e.is_submitted === true)
                                                    return (
                                                        <ProjectUploadFileComponent
                                                            key={i}
                                                            files={e.submissions}
                                                        />
                                                    )
                                            })}


                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    </>
}

export default ProjectDetailsPage;
