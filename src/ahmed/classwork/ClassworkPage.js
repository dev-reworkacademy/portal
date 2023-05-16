import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../template/Footer";
import Nav from "../../template/Nav";
import Topbar from "../../template/Topbar";
import "../assets/css/course-details.css";
import { Storage } from "../../context/Store";
import ClassworkComponent from "./ClassworkComponent";

function ClassworkPage() {
    let store = useContext(Storage);
    let [baseUrl] = store.URL;
    let [user_id] = store.ae_User_ID;
    let [courseDetail, setCourseDetail] = useState([]);
    let [taskProgress, setTaskProgress] = useState([]);
    let [moduleAssignment, setModuleAssignment] = useState([]);
    let [projects, setProjects] = useState([]);
    let [forum, setForum] = useState([]);

    useEffect(() => {
    }, []);
    return (
        <>
            <div id="wrapper" className="page-wrapper">
                <Nav />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar pageName="Assessment Videos" />

                        <div className="container" style={{ background: "white" }}>
                            <ClassworkComponent
                                forum={[
                                    {
                                        "avatar": "https://cdn4.buysellads.net/uu/1/87972/1617110193-Ad18.png",
                                        "name": "Ahmed",
                                        "user_type": "trainer",
                                        "created_at": "3m",
                                        "msg": "testing done"
                                    }, {
                                        "avatar": "https://cdn4.buysellads.net/uu/1/87972/1617110193-Ad18.png",
                                        "name": "Young",
                                        "user_type": "student",
                                        "created_at": "3m",
                                        "msg": "testing done"
                                    }, {
                                        "avatar": "https://cdn4.buysellads.net/uu/1/87972/1617110193-Ad18.png",
                                        "name": "Young",
                                        "user_type": "student",
                                        "created_at": "3m",
                                        "msg": "testing done"
                                    }, {
                                        "avatar": "https://cdn4.buysellads.net/uu/1/87972/1617110193-Ad18.png",
                                        "name": "Young33",
                                        "user_type": "student",
                                        "created_at": "3m",
                                        "msg": "testing done"
                                    }, {
                                        "avatar": "https://cdn4.buysellads.net/uu/1/87972/1617110193-Ad18.png",
                                        "name": "Young55",
                                        "user_type": "trainer",
                                        "created_at": "3m",
                                        "msg": "testing done"
                                    }, {
                                        "avatar": "https://cdn4.buysellads.net/uu/1/87972/1617110193-Ad18.png",
                                        "name": "Young4",
                                        "user_type": "student",
                                        "created_at": "3m",
                                        "msg": "testing done"
                                    }, {
                                        "avatar": "https://cdn4.buysellads.net/uu/1/87972/1617110193-Ad18.png",
                                        "name": "Young2",
                                        "user_type": "student",
                                        "created_at": "3m",
                                        "msg": "testing done"
                                    }

                                ]}
                            />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default ClassworkPage;
