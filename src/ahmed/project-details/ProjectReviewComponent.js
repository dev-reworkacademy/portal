import React from "react";

function ProjectReviewComponent(props) {
  return (
    <>
      <div className="forum-msgs-ah mt-4 me-2 px-4 py-2">
        <div className="forum-msgs-header-ah">
          <div className="flex" style={{ alignItems: "center" }}>
            <img className="me-3" src={props.image} alt="" />
            <h6>{props.name}</h6>
            <h5 id="trainer-ah" style={{ display: props.trainer }}>
              trainer
            </h5>
          </div>
          <p>{props.time}</p>
        </div>
        <div className="forum-msgs-body-ah">
          <p>{props.body}</p>
        </div>
      </div>
    </>
  );
}

export default ProjectReviewComponent;
