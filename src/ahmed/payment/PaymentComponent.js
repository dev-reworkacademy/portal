import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import flutter from "../assets/img/flutter.png";
import paystack from "../assets/img/paystack.png";
import { Storage } from "../../context/Store";
// import axios from "axios";

function PaymentComponent(props) {
  let store = useContext(Storage);
  const [show, setShow] = useState(false);
  const [showTransfer, setTransfer] = useState("active-tab");
  const [showTransferBody, setTransferBody] = useState("block");
  const [showCardBody, setCardBody] = useState("none");
  const [showCard, setCard] = useState("inactive-tab");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [requestData, setRequestData] = useState(props.data);
  const [paginate, setPaginate] = useState({
    current: 1,
    limit: 10,
    pages: 14,
    total: 133
  });
  const [refreshKey, setRefreshKey] = useState(0);

  let baseUrl = store.URL;

  // useEffect(() => {
  //     axios.get(baseUrl + `?page=${paginate.current}&limit=${paginate.limit}&type=all_time&status=${paginate.pages}`)
  //         .then((res) => {

  //             let requestData = res.data.data
  //             if (!requestData) {

  //                 console.log("waitung for data");
  //             } else {
  //                 setRequestData(requestData)
  //                 setPaginate(res.data.paginate)
  //             }
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         })

  // }, [refreshKey]);

  let transferTab = () => {
    setTransfer("active-tab");
    setCard("inactive-tab");
    setTransferBody("block");
    setCardBody("none");
  };

  let cardTab = () => {
    setCard("active-tab");
    setTransfer("inactive-tab");
    setTransferBody("none");
    setCardBody("block");
  };

  //Refresh Use-effect
  const refreshPageData = () => {
    setRefreshKey((refreshKey) => refreshKey + 1);
  };

  //UPDATE PAGE
  const updatePaginate = (data) => {
    setPaginate({
      page: data,
      limit: paginate.limit,
      pages: paginate.pages,
      total: paginate.total
    });
    refreshPageData();
  };

  return (
    <>
      <div>
        <div className="row mx-3">
          <div className="card o-hidden border-0">
            <div className="card-body p-3">
              <div className="mb-3" style={{ float: "right" }}>
                <Link
                  class="btn btn-primary btn-icon-split shadow"
                  onClick={handleShow}
                >
                  <span class="text">+</span>
                  <span class="text">Make Payment</span>
                </Link>
              </div>

              <Table hover responsive="md">
                <thead
                  className="text-white"
                  style={{ background: "#353535", textTransform: "uppercase" }}
                >
                  <tr>
                    <th>s/n</th>
                    <th>amount</th>
                    <th>date</th>
                    <th>method</th>
                    <th>status</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {requestData.map((e, i) => {
                    let statusColor;
                    let showReceipt;
                    let method;
                    if (e.status === "APPROVED") {
                      statusColor = "#2DB563";
                    } else if (e.status === "PENDING") {
                      statusColor = "#FFB906";
                      showReceipt = "hidden";
                    }

                    if (e.method === "BANK_DEPOSIT") {
                      method = "bank deposit";
                    } else if (e.method === "CARD") {
                      method = "card";
                    } else if (e.method === "BANK_TRANSFER") {
                      method = "bank transfer";
                    } else {
                      method = "cash";
                    }

                    return (
                      <tr>
                        <td>
                          <p id="table-sn-ah">{i + 1}</p>
                        </td>
                        <td id="table-amount-ah">₦ {e.amount}</td>
                        <td id="table-date-ah">{e.date}</td>
                        <td id="table-date-ah">{method}</td>
                        <td
                          id="table-approve-ah"
                          style={{ color: statusColor }}
                        >
                          {e.status}
                        </td>
                        <td>
                          <p
                            id="table-receipt-ah"
                            style={{ visibility: showReceipt }}
                          >
                            <Link to={"/receipt/" + e.id}>print receipt</Link>
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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
        <div className="p-3" style={{ color: "black" }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ margin: "0 auto" }}>
              Select Means Of Payment
            </Modal.Title>
          </Modal.Header>
          <p style={{ textAlign: "center", fontSize: "12px" }}>
            Choose between methods below to make your payments.... Both payments
            take 24hrs for confirmation
          </p>
          <div className="tab-change-ah flex">
            <h3 className={showCard} onClick={cardTab}>
              credit / debit card
            </h3>
            <h3 className={showTransfer} onClick={transferTab}>
              bank transfer
            </h3>
          </div>

          <div style={{ display: showTransferBody }}>
            <Modal.Body>
              <h6>Please make your transfer to the bank details below</h6>

              <h5>Bank Name : GTBank</h5>
              <br />
              <h5>Account Name : </h5>
              <h4>REWORK TECHNOLOGIES</h4>
              <br />
              <h5>Account Number : 0500709165</h5>
              <br />
              <div>
                <div
                  style={{
                    textAlign: "center",
                    border: "1px dashed black",
                    padding: "20px",
                    borderRadius: "10px"
                  }}
                >
                  <label
                    for="proof"
                    style={{ fontWeight: "700", cursor: "pointer" }}
                  >
                    {/* <UploadCloud width={50} height={22} style={{ width: "100px" }} /> */}
                    <svg
                      width="50"
                      height="22"
                      viewBox="0 0 40 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.375 29.125V20.875H26.875L20 12.625L13.125 20.875H18.625V29.125H11.75V29.0563C11.519 29.07 11.299 29.125 11.0625 29.125C8.32746 29.125 5.70443 28.0385 3.77046 26.1045C1.83649 24.1706 0.75 21.5475 0.75 18.8125C0.75 13.5215 4.75125 9.2095 9.8855 8.61825C10.3356 6.26506 11.5917 4.14227 13.4377 2.615C15.2837 1.08773 17.6041 0.251452 20 0.25C22.3962 0.251341 24.717 1.08752 26.5635 2.61475C28.4099 4.14198 29.6665 6.26483 30.1173 8.61825C35.2515 9.2095 39.2473 13.5215 39.2473 18.8125C39.2473 21.5475 38.1608 24.1706 36.2268 26.1045C34.2928 28.0385 31.6698 29.125 28.9348 29.125C28.7038 29.125 28.481 29.07 28.2473 29.0563V29.125H21.375Z"
                        fill="#474747"
                      />
                    </svg>
                    <br />
                    Please upload proof of transfer
                  </label>
                </div>
                <input type="file" id="proof" style={{ display: "none" }} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="shadow w-100 py-2" variant="primary">
                Upload Payment
              </Button>
            </Modal.Footer>
          </div>
          {/* Card section */}
          <div style={{ display: showCardBody }}>
            <Modal.Body>
              <p className="my-3 text-center paywith-ah">pay with</p>
              <div className="card-payment-options">
                <span>
                  <img src={paystack} alt="" />
                </span>
                <span>
                  <img src={flutter} alt="" />
                </span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="shadow w-100 py-2" variant="primary">
                Make Payment
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PaymentComponent;
