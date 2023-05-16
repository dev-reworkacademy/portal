import React, { useEffect, useState } from "react";
import { DollarSign, UserCheck } from "react-feather";

   
function Dashboard_Accounts(props) {
  let accountDetails = [
    {
      id: 1,
      title: "Course fee",
      details: props.course_fee,
      icon: DollarSign
    },
    {
      id: 2,
      title: "Amount paid",
      details: props.amount_paid,
      icon: DollarSign
    },
    {
      id: 3,
      title: "Amount Owing",
      details: props.balance,
      icon: DollarSign
    },
    {
      id: 4,
      title: "Attendance",
      details: `${props.attendanceProgress}%`,
      icon: UserCheck
    }
  ];

  return (
    <div className="row">
      {" "}
      {accountDetails?.map((e) => {
        let progressdisplay;
        let paddings;
        if (e.details.includes("%")) {
          progressdisplay = "block";
        } else progressdisplay = "none";

        if (e.details.includes("%")) {
          paddings = "0px";
        } else paddings = "10px";
        return (
          <div class="col-xl-3 col-md-6 col-sm-6 mb-4 " key={e.id} >
            <div class="card  shadow py-2">
              <div class="card-body ">
                <div class="row no-gutters align-items-center my-1">
                  <div
                    class="col mr-2 "
                    style={{ paddingBottom: `${paddings}` }}
                  >
                    <h3 class=" text-xs font-weight-bold text-primary text-uppercase mb-1 my-2 small-card-title">
                      {e.title}
                    </h3>
                    <div class="h5 mb-0 font-weight-bold text-gray-800 my-2">
                      {e.details}
                      <div
                        class="progress"
                        style={{
                          height: "10px",
                          border: "1px solid #00AFEF",
                          padding: "2px",
                          borderRadius: "20px",
                          display: `${progressdisplay}`,
                          backgroundColor: "white"
                        }}
                      >
                        <div
                          class="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${e.details}`,
                            height: "4px",
                            borderRadius: "20px"
                          }}
                          aria-valuenow={`${e.details}`}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="card-icon bg-info p-2">
                      <e.icon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard_Accounts;
