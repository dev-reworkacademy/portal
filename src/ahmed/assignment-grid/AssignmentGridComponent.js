import React from "react";
import { Code, Paperclip, MessageCircle } from "react-feather";
import { Link } from "react-router-dom";

function AssignmentGridComponent(props) {
  let statusColor = props.statusColor;
  let openResource = () => {
    window.open(props.resources, "_blank");
  };
  return (
    <>
      <div className="project-grid-ah">
        <Link to={"/assignment-details/" + props.id} className="link-ah">
          <div className="card-body">
            <div className="project-grid-status-ah flex-btw-ah">
              <span style={{ backgroundColor: statusColor }}>
                <Code />
              </span>
              <p style={{ backgroundColor: statusColor }}>{props.status}</p>
            </div>
            <div className="project-grid-header-ah mt-2">
              <h2>{props.title}</h2>
              <p>({props.topic})</p>
            </div>

            <div>
              <div
                className="project-grid-timer-ah"
                style={{ display: props.currentDisplay }}
              >
                <span className="flex">
                  <h6 style={{ color: "#00AFEF" }}>end date:</h6>
                  <p>{props.end}</p>
                </span>
                <h4>{props.countDown}</h4>
              </div>

              <div
                className="project-grid-timer-ah"
                style={{ display: props.submitDisplay }}
              >
                <span className="flex">
                  <h6 style={{ color: statusColor }}>submitted date:</h6>
                  <p>{props.sumbit}</p>
                </span>
                <h4 style={{ color: statusColor }}>
                  submitted awaiting approval.............
                </h4>
              </div>

              <div
                className="project-grid-timer-ah"
                style={{ display: props.approveDisplay }}
              >
                <span className="flex">
                  <h6 style={{ color: statusColor }}>submitted date:</h6>
                  <p>{props.approve}</p>
                </span>
                <h4 style={{ color: statusColor }}>assignment approved</h4>
              </div>

              <div
                className="project-grid-timer-ah"
                style={{ display: props.expiredDisplay }}
              >
                <span className="flex">
                  <h6 style={{ color: statusColor }}>expected date:</h6>
                  <p>Mar 28, 2023</p>
                </span>
                <h4 style={{ color: statusColor }}>assignment expired</h4>
              </div>
            </div>
          </div>
        </Link>
        <hr />

        <div className="card-body">
          <div className="project-grid-content">
            <Link to={"/assignment-details/" + props.id} className="link-ah">
              <section>
                <p>{props.note}</p>
              </section>
              <span className="flex-btw-ah">
                <p>Task to do</p>
                <h6>{props.totalTask}</h6>
              </span>
              <span className="flex-btw-ah">
                <p>Task Pending</p>
                <h6>{props.pending}</h6>
              </span>
              <span className="flex-btw-ah">
                <p>Completed Progress</p>
                <h6>{props.completed}</h6>
              </span>
            </Link>
            <span className="flex-btw-ah">
              <Paperclip
                width="16px"
                height="16px"
                style={{ cursor: "pointer" }}
                onClick={openResource}
              />
              <div className="flex" style={{ alignContent: "center" }}>
                <MessageCircle width="16px" height="16px" />
                <h6 style={{ marginLeft: "4px" }}>{props.chat}</h6>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignmentGridComponent;
