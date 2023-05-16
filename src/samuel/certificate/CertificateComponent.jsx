import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiseLoader } from "react-spinners";
import ".././assets/css/certificate.css";
import DataAnalysis from "./DataAnalysis";
import FrontEnd from "./FrontEnd";
import FullStack from "./FullStack";
import LoadingMsg from '../../components/LoadingMsg';

const CertificateComponent = () => {
  const BASE_URL = " https://reworkacademy.co/app/v2";
  const user_id = localStorage.getItem("userId");

  const [certifcate, setCertificate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getCert = async () => {
      let api_url = BASE_URL + "/students/" + user_id + "/certificates";
      try {
        const res = await axios.get(api_url);
        console.log(res.data);
        setCertificate(res.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getCert();
  }, [user_id]);

  //console.log(certifcate)

  return (
    <div className="_sam_certificate_container container mg-top mb-5">
      {!isLoading ? (
        certifcate?.map((cert) => {
          if (cert.course === "FULL-STACK DEVELOPMENT WITH NODE.JS") {
            return (
              <FullStack
                full_name={cert.full_name}
                course_title={cert.course}
                director={cert.director_signature}
                trainer={cert.head_training_signature}
                date_issued={cert.date_issued}
                studentId={cert.student_id}
                certificateId={cert.certificate_id}
              />
            );
          } else if (cert.course === "FULL-STACK DEVELOPMENT WITH React JS") {
            return (
              <FrontEnd
                full_name={cert.full_name}
                course_title={cert.course}
                director={cert.director_signature}
                trainer={cert.head_training_signature}
                date_issued={cert.date_issued}
                studentId={cert.student_id}
                certificateId={cert.certificate_id}
              />
            );
          } else if (cert.course === "DATA ANALYSIS") {
            return (
              <DataAnalysis
                full_name={cert.full_name}
                course_title={cert.course}
                director={cert.director_signature}
                trainer={cert.head_training_signature}
                date_issued={cert.date_issued}
                studentId={cert.student_id}
                certificateId={cert.certificate_id}
              />
            );
          } else {
            return <div>Ooops You do not have any certificate yet....</div>;
          }
        })
      ) : (
        <div className="position-absolute ">
          <LoadingMsg/>
        </div>
      )}
    </div>
  );
};

export default CertificateComponent;
