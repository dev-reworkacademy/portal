import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Send, ChevronDown, UploadCloud, Link as Links, Play, Circle, CheckCircle, Paperclip, Briefcase, Edit } from "react-feather";
import { Storage } from "../../context/Store";
import Card from "react-bootstrap/Card";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Button from "react-bootstrap/Button";
import "../assets/css/classwork.css"

function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <button
            id="view_phase_breakdown_ah"
            type="button"
            onClick={decoratedOnClick}
            style={{ background: "whitesmoke" }}
        >
            <ChevronDown />
        </button>
    );
};

function ClassworkComponent(props) {
    let store = useContext(Storage);
    const [project, setProject] = useState([
        {
            "day": "day 1",
            "lectures": "3 lectures",
            "content": [
                {
                    "topic": "working with html tags",
                    "duration": "30 min",
                    "status": "done",
                    "resource": true,
                    "status2": "lecture",
                },
                {
                    "topic": "creating registration form",
                    "duration": "24 min",
                    "status": "done",
                    "resource": false,
                    "status2": "lecture",
                }, {
                    "topic": "build a page",
                    "duration": "24 min",
                    "status": "pending",
                    "resource": false,
                    "status2": "classwork",
                },
                {
                    "topic": "build three pages",
                    "duration": "24 min",
                    "status": "pending",
                    "resource": true,
                    "status2": "assignment",
                }
            ],

        },
        {
            "day": "day 2",
            "lectures": "4 lectures",
            "content": [
                {
                    "topic": "working with html tagsbkbsbfks fsskbfsb sbkbsfsbkfsf sfbksbbs skkb",
                    "duration": "30 min",
                    "status": "pending",
                    "resource": true,
                    "status2": "lecture",
                },
                {
                    "topic": "creating registration form",
                    "duration": "24 min",
                    "status": "pending",
                    "resource": false,
                    "status2": "lecture",
                }, {
                    "topic": "build a page",
                    "duration": "24 min",
                    "status": "pending",
                    "resource": false,
                    "status2": "classwork",
                },
                {
                    "topic": "build three pages",
                    "duration": "24 min",
                    "status": "pending",
                    "resource": true,
                    "status2": "assignment",
                }
            ],

        },
        {
            "day": "day 3",
            "lectures": "2 lectures",
            "content": [
                {
                    "topic": "working with html tags",
                    "duration": "30 min",
                    "status": "pending",
                    "resource": true,
                    "status2": "lecture",
                },
                {
                    "topic": "creating registration form",
                    "duration": "24 min",
                    "status": "pending",
                    "resource": false,
                    "status2": "lecture",
                }, {
                    "topic": "build a page",
                    "duration": "24 min",
                    "status": "pending",
                    "resource": false,
                    "status2": "classwork",
                },
                {
                    "topic": "build three pages",
                    "duration": "24 min",
                    "status": "pending",
                    "resource": true,
                    "status2": "assignment",
                }
            ],

        }
    ]);
    const [forum, setForum] = useState("");
    let [user_id] = store.ae_User_ID;
    let baseUrl = store.URL;
    let [user_type, setUserType] = useState("student");
    let [msg, setMsg] = useState("");
    let [err, setErr] = useState("");

    let forum_details = props.forum;

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

                                <div className="flex-btw-ah" style={{ color: "black", paddingTop: "20px", fontWeight: "600" }}>
                                    <span >
                                        <Edit />
                                    </span>
                                    <p >Classwork</p>
                                </div>

                                <div className="project-grid-header-ah mt-3">
                                    <h1>Loan Application</h1>
                                </div>

                                <div className="about-course-ah">
                                    <h6>classwork instructions</h6>
                                    <p>
                                        New-overview App Ui, Ui Ux, Web App, Form Design, Ui. Dribbble ... Project submission form. rypearts.com Ui Forms, Pattern Meaning, Web Design Tips.
                                        New-overview App Ui, Ui Ux, Web App, Form Design, Ui. Dribbble ... Project submission form. rypearts.com Ui Forms, Pattern Meaning, Web Design Tips.
                                    </p>
                                </div>

                                <div style={{ color: "#00afef", float: "right", fontWeight: "600" }}>Submission (1/3)</div>
                                <br />
                                <br />

                                <div className="flex-btw-ah">
                                    <Button className="shadow py-2" variant="" id="btn-resources-ah" onClick={() => alert("REWORK")}>
                                        <Paperclip id="clip-resources-ah" />
                                        download resources
                                    </Button>
                                    <input type={"file"} id="classwork" style={{ display: "none" }} />
                                    <label for="classwork" id="classworklabel" >
                                        <UploadCloud size={'15px'} /><br />
                                        upload classwork
                                    </label>
                                    {/* <Button className="shadow py-2" variant="danger" id="btn-resources-ah" onClick={() => alert("REWORK U")}>
                                       
                                    </Button> */}
                                </div>
                            </div>

                            <div className="assignment-project-tab-ah mt-3">
                                <div className="flex-btw-ah px-3 pt-3">
                                    <h4 style={{ color: "black" }}>Assessment Forum</h4>
                                    <div className="flex" style={{ alignItems: "baseline" }}>
                                        <Links size={"15px"} style={{ marginRight: "5px" }} />
                                        <p style={{ color: "#1E78FF", cursor: "pointer", fontSize: "13px" }}>Whatsapp Group Link</p>
                                    </div>
                                </div>

                                {/* forum section */}
                                <div className="mt-1 mb-3">
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


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"col-lg-4 col-md-6"}>
                        <div className="p-2 main_phase_break_container_ah">
                            <h4 className="mb-5">assessment contents</h4>
                            <Accordion defaultActiveKey={0}>
                                {project?.map((e, i) => {
                                    return (
                                        <Card style={{ borderRadius: "5px", background: "whitesmoke" }} className="mb-3" key={i}>
                                            <Card.Header
                                                className="phase_break_header_ah"
                                                style={{ borderBottom: "1px solid silver", background: "whitesmoke" }}
                                            >
                                                <div>
                                                    <h5 style={{ fontSize: "18px", fontWeight: "500" }}>{e.day}</h5>
                                                    <p style={{ fontSize: "12px" }}>{e.lectures}</p>
                                                </div>
                                                <CustomToggle eventKey={i} />
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={i}>


                                                <Card.Body className="">
                                                    <ol>
                                                        {e.content?.map((f, j) => {
                                                            let showDone;
                                                            let boldDone;
                                                            let showDone1;
                                                            let showDone2;
                                                            let showDone3;
                                                            let showDone4;
                                                            let colorDone;
                                                            let colorDone1;
                                                            if (f.status === "done") {
                                                                showDone = true; colorDone = "#00afef";
                                                            } else {
                                                                showDone = false
                                                            }

                                                            if (f.status2 === "classwork") {
                                                                colorDone1 = "#00afef"
                                                                showDone2 = true
                                                            } else if (f.status2 === "assignment") {
                                                                boldDone = 700
                                                                showDone4 = true
                                                            } else {
                                                                showDone3 = true
                                                            }

                                                            if (f.status2 === "lecture") {
                                                                showDone1 = true
                                                            } else {
                                                                showDone1 = false
                                                            }
                                                            return (
                                                                <>
                                                                    <div className="flex mb-1" key={j} style={{ color: colorDone1, height: "30px", alignItems: "center", fontWeight: boldDone }} >
                                                                        <div className="flex" style={{ width: "80%" }} >
                                                                            <div style={{ marginLeft: "-40px", display: "flex", width: "15%" }}>
                                                                                {showDone ? <CheckCircle width={"50%"} color={colorDone} /> : <Circle width={"50%"} />}
                                                                                {showDone2 ? <Edit width={"50%"} style={{ marginLeft: "5px" }} /> : null}
                                                                                {showDone3 ? <Play width={"50%"} style={{ marginLeft: "5px" }} /> : null}
                                                                                {showDone4 ? <Briefcase width={"50%"} style={{ marginLeft: "5px" }} /> : null}

                                                                            </div>
                                                                            <li style={{ marginLeft: "8px", fontSize: "13px", width: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", listStyle: "inside", listStyleType: "decimal" }} key={j}>{f.topic}</li>
                                                                        </div>
                                                                        <div style={{ width: "15%" }}>
                                                                            {showDone1 ? <p style={{ fontSize: "10px", width: "100%", marginTop: "12px" }} >{f.duration}</p> :
                                                                                < Paperclip style={{ cursor: "pointer", float: "right" }} size={"45%"} />}
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            );
                                                        })}
                                                    </ol>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    );
                                })}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClassworkComponent;
