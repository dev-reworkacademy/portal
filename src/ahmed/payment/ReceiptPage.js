import React, { useContext, useEffect, useState } from "react";
import "../assets/css/receipt.css";
import img1 from "../assets/img/academy-logo.png";
import img2 from "../assets/img/rework-image-cut.png";
import Footer from "../../template/Footer";
import Nav from "../../template/Nav";
import Topbar from "../../template/Topbar";
import { useParams } from "react-router-dom";
import { Storage } from "../../context/Store";

function ReceiptPage() {
  let store = useContext(Storage);
  let [baseUrl] = store.URL;
  let [receipt, setReceipt] = useState([]);
  let id = useParams();

  let printReceipt = () => {
    let printContents = document.getElementById("receipt_ah").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  useEffect(() => {
    loadReceiptDetails();
  }, []);

  let loadReceiptDetails = () => {
    let url = baseUrl + "/payments/" + id.id + "/info";
    console.log(url)
    fetch(url)
      .then((e) => e.json())
      .then((res) => setReceipt(res));
  };

  return (
    <>
      <div id="wrapper" className="page-wrapper">
        <Nav />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar pageName="Receipt" />

            <div className="container">
              <div className="receipt mb-3" id="receipt_ah">
                <div className="receipt-container" id="receipt">
                  <div className="receipt-header">
                    <div className="receipt-header1">
                      <img src={img1} alt="Rework Logo" />
                    </div>
                    <div className="reciept-header-address">
                      <p className="reciept-header-address-txt">
                        House 5, block C, Aknaton estate,
                      </p>
                      <p className="reciept-header-address-txt">
                        Da akun Adewel street, opp Dominion chapel church
                      </p>
                      <p className="reciept-header-address-txt">
                        Off Dunamis church road, by old Federal Secretariat
                      </p>
                      <p className="reciept-header-address-txt">
                        Durumi 1, Area 1, Abuja
                      </p>
                      <div>
                        <div className="reciept-header-address-sub">
                          <p>
                            <span>Email</span>
                            <span>info@reworktechnologies.com</span>
                          </p>
                          <p>
                            <span>Tel:</span>
                            <span>0703 561 6891</span>
                          </p>
                        </div>
                        <div className="reciept-header-address-no">
                          <p>{receipt.receipt_no}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="receipt-btn btn-outline">
                    <button>Receipt</button>
                  </div>
                  <div className="receipt-form">
                    <div className="reciept-forms-date reciept-forms">
                      <p>Date:</p>
                      <div className="reciept-forms-dash">
                        {receipt.date_paid}
                      </div>
                    </div>
                    <div className="reciept-forms">
                      <p>Received from:</p>
                      <div className="reciept-forms-dash">
                        {receipt.full_name}
                      </div>
                    </div>
                    <div className="reciept-forms">
                      <p>The sum of:</p>
                      <div className="reciept-forms-dash">
                        {receipt.amount_words}
                      </div>
                    </div>
                    <div className="reciept-forms reciept-forms-payment-txt">
                      <div className="reciept-forms-dash mt-3"></div>
                      <div className="reciept-forms-sum">
                        Naira:<p> {receipt.amount}</p>
                      </div>
                      <div className="reciept-forms-sum">
                        Kobo:<p>00</p>
                      </div>
                    </div>
                    <div className="reciept-forms-payment-container">
                      <div className="reciept-forms reciept-forms-payment">
                        <p>Being payment for:</p>
                        <div className="reciept-forms-dash">{receipt.text}</div>
                      </div>
                    </div>
                    <div className="reciept-forms">
                      <p>Mode of Payment:</p>
                      <div className="reciept-forms-dash">
                        {receipt.payment_mode}
                      </div>
                    </div>
                    <div className="reciept-forms-sub">
                      <div className="reciept-forms-sub-sign">
                        <div className="reciept-forms-dash reciept-signature">
                          <img
                            src={receipt.customer_signature}
                            alt="User Signature"
                          />
                        </div>
                        <p>Customer's Signature</p>
                      </div>
                      <div className="reciept-amount">
                        <div className="receipt-amount-sub">
                          <span>₦ {receipt.amount}</span>
                          <span>
                            <span className="reciept-amount-kobo">:</span>
                            <span>00K</span>
                          </span>
                        </div>
                        <p className="reciept-amount-sub-txt">
                          <i>No refund after payment has been made</i>
                        </p>
                      </div>
                      <div className="reciept-forms-sub-sign">
                        <div className="reciept-forms-dash reciept-signature">
                          <img
                            src={receipt.admin_signature}
                            alt="Admin Signature"
                          />
                        </div>
                        <p>Rework Academy Ltd.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <img src={img2} alt="" />
                  <p>A Rework Technologies Company</p>
                </div>
                <div className="receipt-download-btn">
                  <button onClick={printReceipt} id="receipt-btn">
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default ReceiptPage;
