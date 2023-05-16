import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../template/Footer";
import Nav from "../../template/Nav";
import Topbar from "../../template/Topbar";
import "../assets/css/course-details.css";
import CourseDetailsComponent from "./CourseDetailsComponent";
import { Storage } from "../../context/Store";

function CourseDetailsPage() {
  let store = useContext(Storage);
  let [baseUrl] = store.URL;
  let [user_id] = store.ae_User_ID;
  let [courseDetail, setCourseDetail] = useState([]);
  let [taskProgress, setTaskProgress] = useState([]);
  let [moduleAssignment, setModuleAssignment] = useState([]);
  let [projects, setProjects] = useState([]);
  let [forum, setForum] = useState([]);
  let alias = useParams();
  let batch = localStorage.getItem("userBatch").toLowerCase().replace(" ", "_");
  let slot = localStorage.getItem("userSlot").toLowerCase();

  useEffect(() => {
    loadCourseSummary();
    loadCourseTaskProgress();
    loadAssignments();
    loadProjects();
    loadForum();
  }, []);

  let loadCourseSummary = () => {
    let url =
      baseUrl +
      "/modules/summary?batch=" +
      batch +
      "&slot=" +
      slot +
      "&alias=" +
      alias.alias;
    fetch(url)
      .then((e) => e.json())
      .then((res) => setCourseDetail(res));
  };

  let loadCourseTaskProgress = () => {
    let url =
      baseUrl +
      "/modules/progress?batch=" +
      batch +
      "&slot=" +
      slot +
      "&alias=" +
      alias.alias;
    fetch(url)
      .then((e) => e.json())
      .then((res) => setTaskProgress(res.data));
  };

  let loadAssignments = () => {
    let url = baseUrl + "/students/" + user_id + "/assessments?type=assignment";
    fetch(url)
      .then((e) => e.json())
      .then((res) => setModuleAssignment(res));
  };

  let loadProjects = () => {
    let url = baseUrl + "/students/" + user_id + "/assessments?type=project";
    fetch(url)
      .then((e) => e.json())
      .then((res) => setProjects(res));
  };

  let loadForum = () => {
    let url = baseUrl + "/forums?batch=batch_10&slot=weekday";
    fetch(url)
      .then((e) => e.json())
      .then((res) => setForum(res));
  };

  return (
    <>
      <div id="wrapper" className="page-wrapper">
        <Nav />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {courseDetail.map((e, i) => {
              return (
                <Topbar key={i} pageName="Course Details" subName={e.module} />
              );
            })}

            <div className="container">
              {courseDetail.map((e, i) => {
                let hide;
                let hide1;
                if (e.status === "CURRENT") {
                  hide = "flex";
                  hide1 = "block";
                } else {
                  hide = "none";
                  hide1 = "none";
                }
                return (
                  <CourseDetailsComponent
                    key={e.id}
                    status={e.status}
                    img={e.img}
                    title={e.module}
                    duration={e.duration}
                    startDate={e.start_date}
                    endDate={e.estimated_end_date}
                    about={e.descp}
                    days={e.class_days}
                    location={e.location}
                    room={e.room}
                    trainer={e.trainer}
                    time={e.time}
                    total={e.topics_total}
                    current={e.topics_completed}
                    progress={e.progress}
                    assignmentData={moduleAssignment}
                    taskData={taskProgress}
                    projectData={projects}
                    forum={forum}
                    hideSection={hide}
                    hideSection1={hide1}
                  />
                );
              })}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default CourseDetailsPage;
