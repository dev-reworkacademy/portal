import React from "react";

function Dashboard_AccountTimer(props) {
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const [Odays, setODays] = React.useState(0);
  const [Ohours, setOHours] = React.useState(0);
  const [Ominutes, setOMinutes] = React.useState(0);
  const [Oseconds, setOSeconds] = React.useState(0);

  const [deadline, setDeadline] = React.useState(props.PaymentDue);
  let ParsedDeadline = Date.parse(deadline);
  let Todaydate = Date.now();

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };
  React.useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  const getOverDue = () => {
    const time = Date.now() - Date.parse(deadline);

    setODays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setOHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setOMinutes(Math.floor((time / 1000 / 60) % 60));
    setOSeconds(Math.floor((time / 1000) % 60));
  };
  React.useEffect(() => {
    const interval = setInterval(() => getOverDue(deadline), 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {" "}
      {ParsedDeadline > Todaydate ? (
        <div class="card mb-4">
          <div class="card-header text-center">
            <p className="ae_deadline">Next Due Date For Payment</p>
            <div className="d-flex justify-content-around align-items-center ae_countdown  ae_deadline">
              <div>
                <h1>{days}</h1>
                <h6>DAYS</h6>
              </div>
              <div>
                <h1>{hours}</h1>
                <h6>HR</h6>
              </div>
              <div>
                <h1>{minutes}</h1>
                <h6>MIN</h6>
              </div>
              <div>
                <h1>{seconds}</h1>
                <h6>SEC</h6>
              </div>
            </div>
          </div>

          <div class="card-body ae_countdown_upload">
            <p className="text-center text-primary ae_font_weight ae_countdown_txt ae_deadline">
              {deadline}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
      {ParsedDeadline < Todaydate ? (
        <div>
          {/* `
          <div class="card mb-4">
            <div class="card-header text-center">
              <p className="ae_deadline">Next Due Date For Payment</p>
              <div className="d-flex justify-content-around align-items-center ae_countdown  ae_deadline">
                <div>
                  <h1>{days}</h1>
                  <h6>DAYS</h6>
                </div>
                <div>
                  <h1>{hours}</h1>
                  <h6>HR</h6>
                </div>
                <div>
                  <h1>{minutes}</h1>
                  <h6>MIN</h6>
                </div>
                <div>
                  <h1>{seconds}</h1>
                  <h6>SEC</h6>
                </div>
              </div>
            </div>

            <div class="card-body ae_countdown_upload">
              <p className="text-center text-primary ae_font_weight ae_countdown_txt ae_deadline">
                {deadline}
              </p>
            </div>
          </div>
          ` */}
          <div class="card mb-4">
            <div class="card-header text-center ">
              <p className=" ae_deadline ae_font_weight text-danger">
                Payment Over Due
              </p>
              <div className="d-flex justify-content-around align-items-center ae_countdown ae_deadline ">
                <div>
                  <h1>{Odays}</h1>
                  <h6>DAYS</h6>
                </div>
                <div>
                  <h1>{Ohours}</h1>
                  <h6>HR</h6>
                </div>
                <div>
                  <h1>{Ominutes}</h1>
                  <h6>MIN</h6>
                </div>
                <div>
                  <h1>{Oseconds}</h1>
                  <h6>SEC</h6>
                </div>
              </div>
            </div>

            <div class="card-body ae_countdown_upload">
              <p className="text-center text-danger ae_font_weight ae_countdown_txt ae_deadline">
                {deadline}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard_AccountTimer;
