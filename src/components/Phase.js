import React, { useEffect, useState } from "react";
import "../ahmed/assets/css/phases.css";
import { Edit2, X, PlusSquare, ChevronDown, ArrowDownCircle } from "react-feather";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CreateSubLevel from "./sub-level";

function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <button id="view_phase_breakdown_ah" type="button" onClick={decoratedOnClick}>
            <ChevronDown />
        </button>
    );
};

function ManagePhases() {
    let breakdown = "task breakdown";
    let moduleTitle = "manage module"
    let firstLabel = "module";
    let secondLabel = "task";
    let firstPlaceholder = "enter module name";
    let secondPlaceholder = "enter day e.g day-1";

    let [phaseData, setPhaseData] = useState([
        {
            "id": "1x",
            "name": "HTML / CSS",
            "phaseTask": [{
                "name": "day-1",
                "subLevel": [{
                    "name": "what is HTML?",
                    "subLevel": [{
                        "name": "HTML tags",
                        "subLevel": []
                    }]
                }]
            },
            { "name": "day-2", "subLevel": [{ "name": "CSS", "subLevel": [] }] },
            { "name": "day-3", "subLevel": [{ "name": "CSS animation", "subLevel": [] }] }]
        },
        {
            "id": "2x",
            "name": "beginner javascript",
            "phaseTask": [{
                "name": "day-1",
                "subLevel": [{
                    "name": "what is javascript?",
                    "subLevel": [{
                        "name": "variable declaration",
                        "subLevel": []
                    },
                    { "name": "javascript operations", "subLevel": [] }]
                }, { "name": "dom manipulation", "subLevel": [] },
                { "name": "string manipulation", "subLevel": [] }]
            },
            { "name": "day-2", "subLevel": [{ "name": "dom manipulation", "subLevel": [] }] },
            { "name": "day-3", "subLevel": [{ "name": "string manipulation", "subLevel": [] }] }]
        },
        {
            "id": "3x",
            "name": "Database Design & modeling",
            "phaseTask": [{
                "name": "day-1",
                "subLevel": [{
                    "name": "revision",
                    "subLevel": [{
                        "name": "basic arithmetic",
                        "subLevel": [{
                            "name": "addition",
                            "subLevel": [{ "name": "addition of 2 numbers", "subLevel": [] }, { "name": "addition of numbers and letters", "subLevel": [] }]
                        }, { "name": "subtraction", "subLevel": [] }]
                    }, { "name": "advance arithmetic", "subLevel": [] }
                        , { "name": "summary", "subLevel": [] }]
                }, { "name": "advanced database", "subLevel": [] }]
            },
            { "name": "day-2", "subLevel": [{ "name": "wait for femi", "subLevel": [] }] },
            {
                "name": "day-3", "subLevel": [{ "name": "introduction to database", "subLevel": [] },
                { "name": "database management system", "subLevel": [] },
                {
                    "name": "types of databases", "subLevel": [
                        { "name": "what is data?", "subLevel": [] },
                        { "name": "what is database?", "subLevel": [] },
                        {
                            "name": "types of databases", "subLevel": [
                                { "name": "distributed databases", "subLevel": [] },
                                { "name": "relational databases", "subLevel": [] },
                                { "name": "centralized", "subLevel": [] }
                            ]
                        }
                    ]
                }]
            }]
        },
    ]);
    let [phaseName, setPhaseName] = useState("");
    let [taskName, setTaskName] = useState("");
    let [mobileHide, setMobile] = useState("yes");
    let [mobileHide2, setMobile2] = useState("no");
    let [mobileHide3, setMobile3] = useState("no");
    let [mobileHide4, setMobile4] = useState("yes");
    let [subTask, setSubTask] = useState("");
    let [phaseId, setPhaseId] = useState("");
    let [reload, setReload] = useState("");
    let [hideUpdate, setHideUpdate] = useState("none");
    let [hideUpdateTask, setHideUpdateTask] = useState("none");
    let [showUpdate, setShowUpdate] = useState("block");
    let [showUpdateTask, setShowUpdateTask] = useState("block");

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);


    let [phaseTasks, setPhaseTasks] = useState({ "name": phaseData[0].name, "tasks": phaseData[0].phaseTask });
    let [subLevel, setSubLevel] = useState("");

    let deletePhase = (e) => {
        console.log(e)
        handleShow()
    };

    let deleteTask = (e) => {
        console.log(e)
        handleShow()
    };

    let editPhase = (e) => {
        setHideUpdate("block")
        setShowUpdate("none")
        setPhaseName(e)
        setHideUpdateTask("none")
        setShowUpdateTask("block")
        setTaskName("")
    };

    let editTask = (e) => {
        setHideUpdateTask("block")
        setShowUpdateTask("none")
        setTaskName(e.name)
        setHideUpdate("none")
        setShowUpdate("block")
        setPhaseName("")
    };

    let cancelEditPhase = () => {
        setHideUpdate("none")
        setShowUpdate("block")
        setPhaseName("")
    };

    let cancelEditTask = () => {
        setHideUpdateTask("none")
        setShowUpdateTask("block")
        setTaskName("")
    };

    let [arr, setArr] = useState([])
    let createSubLevel = (e) => {

        arr.push({ "name:": subLevel, "subLevel": [] })
        console.log(subLevel)
    };

    let createPhase = () => {
        console.log('phase created')
    };


    let loadTask = (a, b) => {
        setPhaseTasks({ "name": a, "tasks": b })
        setHideUpdateTask("none")
        setShowUpdateTask("block")
        setTaskName("")
        setMobile("no")
        setMobile2("yes")
    };

    let hideSummary = () => {
        setMobile("yes")
        setMobile2("no")
        setMobile3("no")
        setMobile4("yes")
    };

    let showSummary = () => {
        setMobile("no")
        setMobile2("no")
        setMobile3("yes")
        setMobile4("no")
    };


    return (<>
        <div className="container">
            <div className="row mt-3 gy-3">

                <div className="mobile_btn_ah">
                    <button className={mobileHide4} onClick={showSummary}>show summary</button>
                    <button className={mobileHide3} onClick={hideSummary}>hide summary</button>
                </div>

                {/* manage phases */}
                <div className={"col-lg-4 col-md-6" + " " + mobileHide}>
                    <div className="p-2 main_phase_container_ah" >
                        <h4 className="mb-5">{moduleTitle}</h4>
                        <div className="input_phase_ah mb-3">
                            <label className="mb-2">{firstLabel}</label>
                            <span className="flex">
                                <input type="text" placeholder={firstPlaceholder} value={phaseName} onChange={(e) => setPhaseName(e.target.value)} />
                                <PlusSquare id="plus_ah" style={{ display: showUpdate }} onClick={() => createPhase()} />
                            </span>
                            <div className="update-section-ah">
                                <p id="update_btn_ah" style={{ display: hideUpdate }}>update </p>
                                <p id="update_btn_ah" style={{ display: hideUpdate }} onClick={() => cancelEditPhase()}>cancel </p>
                            </div>
                        </div>

                        <div className="main_phase_container_scroll_ah">

                            {phaseData.map((e, i) => {
                                return <div id="module_name_ah" className="single_phase_header_ae p-2 mb-3" key={i} onClick={() => loadTask(e.name, e.phaseTask, i)}>
                                    <p>{e.name}</p>
                                    <span className="flex">
                                        <Edit2 className="phase_icon" width="14px" height="14px" onClick={() => editPhase(e.name)} />
                                        <X className="phase_icon" width="14px" height="14px" onClick={() => deletePhase(e.id)} />
                                    </span>
                                </div>
                            })}


                        </div>
                    </div>
                </div>

                {/* manage tasks */}
                <div className={"col-lg-4 col-md-6" + " " + mobileHide2}>

                    <div className="p-2 main_phase_container_ah" >
                        <h4>{phaseTasks.name}</h4>
                        <h5 className="mb-4"> {breakdown}</h5>
                        <div className="input_phase_ah mb-3">
                            <label className="mb-2">{secondLabel}</label>
                            <span className="flex">
                                <input type="text" placeholder={secondPlaceholder} value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                                <PlusSquare id="plus_ah" style={{ display: showUpdateTask }} />
                            </span>
                            <div className="update-section-ah">
                                <p id="update_btn_ah" style={{ display: hideUpdateTask }}>update </p>
                                <p id="update_btn_ah" style={{ display: hideUpdateTask }} onClick={() => cancelEditTask()}>cancel </p>
                            </div>
                        </div>
                        <div className="main_phase_container_scroll_ah">
                            {phaseTasks.tasks.map((e, i) => {
                                return <>
                                    <div className="single_phase_ae p-2 mb-3" key={i}>

                                        <div className="single_phase_header_ae" >
                                            <p>{e.name}</p>
                                            <span className="flex">
                                                <ArrowDownCircle className="phase_icon" width="14px" height="14px" onClick={handleShow2} />
                                                <Edit2 className="phase_icon" width="14px" height="14px" onClick={() => editTask(e)} />
                                                <X className="phase_icon" width="14px" height="14px" onClick={() => deleteTask(i)} />
                                            </span>
                                        </div>

                                        <ul>
                                            {
                                                e.subLevel.map((a, b) => {
                                                    return <>
                                                        <CreateSubLevel
                                                            sub={a.subLevel}
                                                            name={a.name}
                                                            create={handleShow2}
                                                            edit={() => editTask(a)}
                                                        />
                                                    </>
                                                })
                                            }
                                        </ul>

                                    </div>
                                </>
                            })}

                        </div>
                    </div>


                </div>

                {/* full project breakdown */}
                <div className={"col-lg-4 col-md-6" + " " + mobileHide3}>
                    <div className="p-2 main_phase_break_container_ah" >
                        <h4 className="mb-5">full project breakdown</h4>
                        <Accordion defaultActiveKey={0} >
                            {phaseData.map((e, i) => {
                                return <Card id="phase_border" className="mb-2" key={i}>
                                    <Card.Header
                                        className="phase_break_header_ah"
                                        style={{ borderBottom: "1px solid silver" }}
                                    >
                                        <h4>{e.name}</h4>
                                        <CustomToggle eventKey={i} />
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={i}>
                                        {/* <Card.Body className="phase_list_ah p-2">
                                            {e.phaseTask.map((f, j) => {
                                                return <ul>
                                                    <li key={j}>{f.name}</li>
                                                    {f.subLevel.map((x, y) => {
                                                        return <>
                                                            <CreateSubLevel
                                                                name={x.name}
                                                                sub={x.subLevel}
                                                                display="none"
                                                            />
                                                        </>
                                                    })}
                                                </ul>
                                            })}
                                        </Card.Body> */}

                                        <Card.Body className="phase_list_ah p-2">
                                            <ul>
                                                {e.phaseTask.map((f, j) => {
                                                    return <>
                                                        <li key={j}>{f.name}</li>
                                                        <ol>
                                                            {f.subLevel.map((x, y) => {
                                                                return <>
                                                                    <CreateSubLevel
                                                                        name={x.name}
                                                                        sub={x.subLevel}
                                                                        display="none"
                                                                    />
                                                                </>
                                                            })}
                                                        </ol>
                                                    </>
                                                })}
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            })}

                        </Accordion>
                    </div>
                </div>

            </div>
        </div>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>Do you really want to delete?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button className="shadow" variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="shadow" variant="danger">
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal
            show={show2}
            onHide={handleClose2}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>Add Sub-level task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input style={{ width: "100%", outline: "none" }} type="text" placeholder="Sub-Level Task" value={subLevel} onChange={(e) => setSubLevel(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button className="shadow" variant="secondary" onClick={handleClose2}>
                    Cancel
                </Button>
                <Button className="shadow" variant="primary" onClick={() => createSubLevel()}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
};

export default ManagePhases;