import React from "react";

function AssignmentUploadFileComponent(props) {
  let phaseFilesData = props.files;
  let openResource = (e) => {
    window.open(e, "_blank");
  };
  return (
    <>
      {phaseFilesData.map((e, i) => {
        if (phaseFilesData.length - 1 === i)
          return (
            <div
              className="phase-submission-files-ah flex m-3 p-2"
              onClick={() => openResource(e.file_name)}
            >
              <svg
                width="54"
                height="68"
                viewBox="0 0 54 68"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.58333 3.83337C3.36158 3.83337 0.75 6.45837 0.75 9.66671V33V44.6667V62.1667C0.75 65.375 3.36158 68 6.58333 68H47.4167C50.6396 68 53.25 65.375 53.25 62.1667V44.6667V33V21.3334L35.75 3.83337H6.58333Z"
                  fill="#95A5A6"
                />
                <path
                  d="M6.58333 0.916626C3.36158 0.916626 0.75 3.54163 0.75 6.74996V30.0833V41.75V59.25C0.75 62.4583 3.36158 65.0833 6.58333 65.0833H47.4167C50.6396 65.0833 53.25 62.4583 53.25 59.25V41.75V30.0833V18.4166L35.75 0.916626H6.58333Z"
                  fill="#BDC3C7"
                />
                <path
                  d="M53.25 18.4166L35.75 0.916626V12.5833C35.75 15.7916 38.3604 18.4166 41.5833 18.4166H53.25Z"
                  fill="#95A5A6"
                />
                <path
                  d="M9.5 21.3334V24.25H44.5V21.3334H9.5ZM9.5 30.0834V33H44.5V30.0834H9.5ZM9.5 38.8334V41.75H44.5V38.8334H9.5ZM9.5 47.5834V50.5H44.5V47.5834H9.5Z"
                  fill="#95A5A6"
                />
              </svg>

              <div>
                <h5>{e.name}</h5>
                <p>{e.submitted_date}</p>
              </div>
            </div>
          );
      })}
    </>
  );
}

export default AssignmentUploadFileComponent;
