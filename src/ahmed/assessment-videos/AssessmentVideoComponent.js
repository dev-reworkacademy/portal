import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Send, ChevronDown, Clock, Link as Links, Play, Circle, CheckCircle, Paperclip, Briefcase, Edit, UploadCloud } from "react-feather";
import { Storage } from "../../context/Store";
import Card from "react-bootstrap/Card";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Button from "react-bootstrap/Button";

function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <button
            id="view_phase_breakdown_ah"
            type="button"
            onClick={decoratedOnClick}
            style={{ background: "whitesmoke", height: "fit-content" }}
        >
            <ChevronDown size={"16px"} />
        </button >
    );
};

function AssessmentVidsComponent(props) {
    let store = useContext(Storage);
    let [user_id] = store.ae_User_ID;
    
    let baseUrl = store.URL;
    let [user_type, setUserType] = useState("student");
    let [msg, setMsg] = useState("");
    let [err, setErr] = useState("");
    let [index, setIndex] = useState(0);
    let [index1, setIndex1] = useState(0);
    let assessment = props.content;
    console.log(assessment?.lectures?.[0]?.lessons?.[0]?.video_url, "herere")
    let forum_details = props.forum;
    let postToForum = () => {
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


    let [item, setItem] = useState(true)
    let [item2, setItem2] = useState(true)

    let changeView = (e, f) => {
        setIndex1(f)
        if (e.toLowerCase() === "video") {
            setItem(true)
        } else {
            setItem(false)
        }

        if (e.toLowerCase() === "classwork") {
            setItem2(true)
        } else if (e.toLowerCase() === "assignment") {
            setItem2(false)
        }
    };

    let changeDay = (e) => {
        setIndex(e)
    }
    return (
        <>
            <div>
                <div className="row mx-3 mb-3">
                    <div className="col-lg-7">
                        <div className="mb-3 pb-3 main-course-details-container-ah">

                            {item ? <div>
                                <div className="card-ah">
                                    <video width="100%" height="450px" controls autoplay  >
                                        <source src={assessment?.lectures?.[0]?.lessons?.[0]?.video_url} />
                                    </video>
                                    <div className="about-course-ah mt-3 p-3" style={{ borderBottom: "1px solid #C6C6C6" }}>
                                        <div className="flex-btw-ah" style={{ color: "black" }}>
                                            <h4 style={{ textTransform: "capitalize", fontWeight: "600" }}>{assessment?.lectures?.[0]?.lessons?.[0]?.title}</h4>
                                            <span><Clock size="16px" style={{ marginRight: "5px" }} />{assessment?.lectures?.[0]?.lessons?.[0]?.video_duration}mins</span>
                                        </div>
                                        <p>{assessment?.lectures?.[0]?.lessons?.[0]?.descp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                                :
                                <div>
                                    {item2 ? <div className="flex-btw-ah" style={{ color: "black", paddingTop: "20px", fontWeight: "600" }}>
                                        <span >
                                            <Edit />
                                        </span>
                                        <p>Classwork</p>
                                    </div> :
                                        <div className="flex-btw-ah" style={{ color: "black", paddingTop: "20px", fontWeight: "600" }}>
                                            <span >
                                                <Briefcase />
                                            </span>
                                            <p>Assignment</p>
                                        </div>}


                                    <div className="project-grid-header-ah mt-3">
                                        <h1>{assessment?.lectures?.[0]?.lessons?.[0]?.title}</h1>
                                    </div>

                                    <div className="about-course-ah">
                                        {item2 ? <h6>classwork instructions</h6> : <h6>assignment instructions</h6>}

                                        <p>{assessment?.lectures?.[0]?.lessons?.[0]?.descp}</p>
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
                                        {item2 ? <label for="classwork" id="classworklabel" >
                                            <UploadCloud size={'15px'} /><br />
                                            upload classwork
                                        </label> :
                                            <label for="classwork" id="classworklabel" >
                                                <UploadCloud size={'15px'} /><br />
                                                upload assignment
                                            </label>}

                                    </div>
                                </div>

                            }



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
                                                    onClick={() => postToForum()}
                                                />
                                            </button>
                                        </div>

                                        <div className="forum-body-ah mt-2">
                                            {/* {forum_details?.map((e, i) => {
                                                let showTrainer;
                                                if (e.user_type === "trainer") {
                                                    showTrainer = "flex";
                                                } else {
                                                    showTrainer = "none";
                                                }
                                                return (
                                                    <div className="forum-msgs-ah mt-3 px-2 pt-2">
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
                                            })} */}


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"col-lg-5 col-md-6"}>
                        <div className="p-2 main_phase_break_container_ah">
                            <h4 className="mb-3">assessment contents</h4>
                            <Accordion defaultActiveKey={0}>
                                {assessment?.lectures?.map((e, i) => {
                                    return (
                                        <Card style={{ borderRadius: "5px", background: "whitesmoke" }} className="mb-3" key={i}>
                                            <Card.Header
                                                className="flex-btw-ah"
                                                style={{ borderBottom: "1px solid silver", background: "whitesmoke", height: "65px", alignItems: "center" }}
                                            >
                                                <div className="mt-2">
                                                    <h5 style={{ fontSize: "18px", fontWeight: "500" }}>{e.title}</h5>
                                                    <p style={{ fontSize: "12px" }}>{`${e.lessons.length} Lectures`}</p>
                                                </div>
                                                <CustomToggle eventKey={i} onClick={() => alert("read")} />
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={i}>


                                                <Card.Body className="ps-3">
                                                    <ol>
                                                        {e.lessons?.map((f, j) => {
                                                            let showDone;
                                                            let boldDone;
                                                            let showDone1;
                                                            let showDone2;
                                                            let showDone3;
                                                            let showDone4;
                                                            let colorDone;
                                                            let colorDone1;
                                                            let showText;
                                                            if (f.is_completed) {
                                                                showDone = true;
                                                                colorDone = "#00afef";
                                                            } else {
                                                                showDone = false
                                                            }

                                                            if (f.lesson_type.toLowerCase() === "classwork") {
                                                                colorDone1 = "#00afef"
                                                                showDone2 = true
                                                                showText = `Classwork: ${f.title}`
                                                            } else if (f.lesson_type.toLowerCase() === "assignment") {
                                                                boldDone = 700
                                                                showDone4 = true
                                                                showText = `Assignment: ${f.title}`
                                                            } else {
                                                                showDone3 = true
                                                                showText = `${f.title}`
                                                            }

                                                            if (f.lesson_type.toLowerCase() === "video") {
                                                                showDone1 = true
                                                            }
                                                            return (
                                                                <>
                                                                    <div className="flex mb-1" key={j} style={{ color: colorDone1, height: "30px", fontWeight: boldDone, cursor: "pointer", justifyContent: "space-between" }} >
                                                                        <div className="flex" style={{ width: "84%", alignItems: "center" }} onClick={() => changeView(f.lesson_type, j)} >
                                                                            <div style={{ marginLeft: "-40px", display: "flex", width: "15%" }}>
                                                                                {showDone ? <CheckCircle width={"50%"} color={colorDone} /> : <Circle width={"50%"} />}
                                                                                {showDone2 ? <Edit width={"50%"} style={{ marginLeft: "5px" }} /> : null}
                                                                                {showDone3 ? <Play width={"50%"} style={{ marginLeft: "5px" }} /> : null}
                                                                                {showDone4 ? <Briefcase width={"50%"} style={{ marginLeft: "5px" }} /> : null}
                                                                            </div>
                                                                            <li className="ms-4" style={{ fontSize: "12px" }}>
                                                                                {showText}
                                                                            </li>

                                                                        </div>
                                                                        <div style={{ width: "15%" }}>
                                                                            {showDone1 ? <p style={{ fontSize: "10px", width: "100%", marginTop: "12px", textTransform: "lowercase" }} >{f.video_duration} mins</p> :
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

export default AssessmentVidsComponent;
