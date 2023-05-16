import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EducationModal() {
  const data = {
    first_name: "",
    last_name: "",
    other_name: "",
    user_name: "",
    bio: "",
    state: "",
    country: "",
    primary_language: "",
    other_language: [],
    certificate: "",
    social_links: {
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: ""
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [certificates, setCertificates] = useState([]);
  const [certificate, setCertificate] = useState(data);
  const [message, setMessage] = useState("");

  const BASE_URL = "https://reworkacademy.co/app/v2";
  const id = localStorage.getItem("userId");

  useEffect(() => {
    let api_url = BASE_URL + "/certificates";
    fetch(api_url)
      .then((e) => e.json())
      .then((res) => {
        setCertificates(res);
      });
  }, []);

  const onChangeCertificate = (e) => {
    let { value } = e.target;
    let cert = certificates.find((x) => x.name === value);
    let _cert = { ...certificate };
    _cert.certificate = cert.name;
    setCertificate(_cert);
  };

  const updateCertificate = async () => {
    let res = await axios.put(
      BASE_URL + "/students/" + id + "/profile",
      certificate
    );
    let { data } = res;
    setMessage(data.msg);
    console.log(data);
    //setShow(false)
  };

  const refresh = () => {
    window.location.reload("/profile");
    handleClose();
  };

  return (
    <>
      <div className="shadow" variant="primary" onClick={handleShow}>
        Edit
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Your Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1 text-end text-primary mt-0">{message}</p>
          <div class="form-floating">
            <select
              class="form-select _sam-outline-0"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={onChangeCertificate}
            >
              <option selected></option>
              {certificates?.map((certificate) => {
                return (
                  <option key={certificate.id} value={certificate.name}>
                    {certificate.name}
                  </option>
                );
              })}
            </select>
            <label for="floatingSelect">Education / Certificates: </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="shadow" variant="secondary" onClick={refresh}>
            Back
          </Button>
          <Button
            className="shadow"
            variant="primary"
            onClick={updateCertificate}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EducationModal;
