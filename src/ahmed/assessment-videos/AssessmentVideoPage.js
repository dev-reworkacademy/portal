import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../template/Footer";
import Nav from "../../template/Nav";
import Topbar from "../../template/Topbar";
import "../assets/css/course-details.css";
import { Storage } from "../../context/Store";
import AssessmentVidsComponent from "./AssessmentVideoComponent";

function AssessmentVideoPage() {
    let store = useContext(Storage);
    let [baseUrl] = store.URL;
    let [user_id] = store.ae_User_ID;
    let [module, setModule] = useState([]);
    let [forum, setForum] = useState([]);

    let loadUserModule = () => {
        let url = `${baseUrl}/students/${user_id}/self-pace/current-module`;
        console.log(url);
        fetch(url)
            .then((e) => e.json())
            .then(res => setModule(res))
    };

    let loadForum = () => {
        let url = baseUrl + "/forums?batch=batch_10&slot=weekday";
        fetch(url)
            .then((e) => e.json())
            .then((res) => setForum(res));
    };
    
    // let loadCurrentModule = (a) => {
    //     let url = `${baseUrl}/students/${user_id}/self-pace/modules/${a}`;
    //     fetch(url)
    //         .then((e) => e.json())
    //         .then(res => setModule(res))
    // };



    useEffect(() => {
        loadUserModule();
        loadForum();
    }, []);
    return (
        <>
            <div id="wrapper" className="page-wrapper">
                <Nav />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar pageName="Assessment Videos" />

                        <div className="container" style={{ background: "white" }}>
                            <AssessmentVidsComponent
                                content={module}
                                forum={forum}
                            />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default AssessmentVideoPage;
