import React, { useEffect, useState, useContext } from "react";
import Footer from "../../template/Footer";
import Nav from "../../template/Nav";
import Topbar from "../../template/Topbar";
import '../assets/css/payment.css';
import PaymentComponent from "./PaymentComponent";
import { SyncLoader } from 'react-spinners';

import { Storage } from "../../context/Store";
import LoadingMsg from "../../components/LoadingMsg";

function PaymentPage() {
    let store = useContext(Storage);
    let [baseUrl] = store.URL;
    let [payments, SetPayment] = useState([]);
    let [user_id] = store.ae_User_ID;

    useEffect(() => {
        loadPaymentDetails();
    }, []);

    let loadPaymentDetails = () => {
        let url = baseUrl + "/students/" + user_id + "/payments";
        fetch(url)
            .then((e) => e.json())
            .then(res => SetPayment([res]))
    };

    return <>
        <div id="wrapper" className="page-wrapper">
            <Nav />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar pageName="Payments" />

                    <div className="container">

                        <div className="row mx-0" style={{ justifyContent: "space-between" }}>
                            {
                                payments.map((x, i) => {
                                    return (<>
                                        <div class="col-md-4 mb-4">
                                            <div class="card  shadow py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center my-1" style={{ textAlign: 'center' }}>
                                                        <div class="col mr-2 ">
                                                            <h3 class=" text-xs font-weight-bold text-primary text-uppercase mb-1 my-2 small-card-title">
                                                                Course Fee
                                                            </h3>
                                                            <div class="h5 mb-0 font-weight-bold my-2" style={{ color: "#000000" }}>
                                                                ₦ {x.summary.course_fee}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-md-4 mb-4">
                                            <div class="card  shadow py-2" style={{ color: 'white', background: '#00AFEF' }}>
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center my-1" style={{ textAlign: 'center' }}>
                                                        <div class="col mr-2 ">
                                                            <h3 class=" text-xs font-weight-bold text-uppercase mb-1 my-2 small-card-title">
                                                                Amount Paid
                                                            </h3>
                                                            <div class="h5 mb-0 font-weight-bold my-2">
                                                                ₦ {x.summary.amount_paid}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-4 mb-4">
                                            <div class="card  shadow py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center my-1" style={{ textAlign: 'center' }}>
                                                        <div class="col mr-2 ">
                                                            <h3 class=" text-xs font-weight-bold text-primary text-uppercase mb-1 my-2 small-card-title">
                                                                Balance
                                                            </h3>
                                                            <div class="h5 mb-0 font-weight-bold my-2" style={{ color: "#000000" }}>
                                                                ₦ {x.summary.balance}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    )
                                })
                            }
                        </div>

                        {payments.length == 0 ?
                            <LoadingMsg/>:
                            payments.map((e, i) => {
                                return (
                                    <PaymentComponent
                                        data={e.data}
                                    />
                                )
                            })
                        }

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    </>
}

export default PaymentPage;
