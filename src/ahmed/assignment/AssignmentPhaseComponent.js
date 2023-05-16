import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { ChevronDown, Check, Loader, AlertTriangle } from "react-feather";
import Card from "react-bootstrap/Card";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

function CustomToggle({ eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <button id="view-project-tasks-ah" type="button" onClick={decoratedOnClick}>
      <ChevronDown />
    </button>
  );
}

function AssignmentPhaseComponent(props) {
  let tasks = props.taskData;
  return (
    <>
      <div>
        <div className="assignment-accordion-ah mt-4">
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Card id="acc" className="mb-4">
              <Card.Header
                className="project-accordion-header-ah"
                style={{ borderBottom: "1px solid silver" }}
              >
                <h4> {props.phaseNo}</h4>
                <span style={{ display: props.currentPhase }}>
                  <h6>submission time:</h6>
                  <p>{props.countDownTimer}</p>
                  <CustomToggle eventKey={props.eventKey} />
                </span>
                <span style={{ display: props.pendingPhase }}>
                  <h6>date:</h6>
                  <p>{props.startDate}</p>
                  <CustomToggle eventKey={props.eventKey} />
                </span>
              </Card.Header>
              <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body className="project-accordion-body-ah px-5 py-3">
                  <h4>tasks</h4>

                  {tasks.map((e, i) => {
                    let statusColor;
                    let iconApprove;
                    let iconWait;
                    let iconNeed;
                    let iconDefault;
                    let showRemark;
                    if (e.status === "APPROVED") {
                      iconApprove = "block";
                      iconWait = "none";
                      iconNeed = "none";
                      statusColor = "#00BF4C";
                      iconDefault = "none";
                    } else if (e.status === "WAITING") {
                      statusColor = "#FEC400";
                      iconApprove = "none";
                      iconWait = "block";
                      iconNeed = "none";
                      iconDefault = "none";
                    } else if (e.status === "NEED_ATTENTION") {
                      statusColor = "#FF5A5A";
                      iconApprove = "none";
                      iconWait = "none";
                      iconNeed = "block";
                      iconDefault = "none";
                    } else {
                      iconApprove = "none";
                      iconWait = "none";
                      iconNeed = "none";
                      iconDefault = "block";
                    }

                    if (e.remarks == "") {
                      showRemark = "none";
                    } else {
                      showRemark = "flex";
                    }

                    return (
                      <>
                        <div className="p-2 mb-3 task_card">
                          <section>
                            <div className="flex">
                              <span
                                style={{
                                  display: iconApprove,
                                  backgroundColor: statusColor
                                }}
                              >
                                <Check />
                              </span>
                              <span
                                style={{
                                  display: iconWait,
                                  backgroundColor: statusColor
                                }}
                              >
                                <Loader />
                              </span>
                              <span
                                style={{
                                  display: iconNeed,
                                  backgroundColor: statusColor
                                }}
                              >
                                <AlertTriangle
                                  width="20px"
                                  height="20px"
                                  style={{ margin: "0px 2px" }}
                                />
                              </span>
                              <span style={{ display: iconDefault }}></span>
                              <h3>{e.task}</h3>
                            </div>
                            <p style={{ color: statusColor }}>{e.status}</p>
                          </section>

                          <div
                            className="flex task_remarks"
                            style={{ display: showRemark }}
                          >
                            <p style={{ color: "#00AFEF" }}>Trainer: &nbsp; </p>
                            <p>{e.remarks}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default AssignmentPhaseComponent;
