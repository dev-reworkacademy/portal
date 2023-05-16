import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditBioModal({ bio }) {
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

  const BASE_URL = "https://reworkacademy.co/app/v2";
  const id = localStorage.getItem("userId");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bioText, setBioText] = useState(data);
  const [message, setMessage] = useState("");

  //console.log(bioText)

  const updateChange = () => {
    setBioText(bio);
    handleShow();
  };

  const updateBio = async () => {
    let res = await axios.put(BASE_URL + "/students/" + id + "/profile", {
      ...bioText
    });
    let { data } = res;
    setMessage(data.msg);
    setBioText("");
    console.log(data);
    //setShow(false)
  };

  const refresh = () => {
    window.location.reload();
    handleClose();
  };

  // console.log(bioText)
  return (
    <>
      <div className="shadow" variant="primary" onClick={updateChange}>
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
          <Modal.Title className="pb-0">Udate your biography</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1 text-end text-primary mt-0">{message}</p>
          <div class="form-floating">
            <textarea
              class="form-control _sam-outline-0"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: "200px" }}
              onChange={(e) => setBioText(e.target.value)}
              value={bioText}
            />
            <label for="floatingTextarea2">Edit Biography: </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="shadow" variant="secondary" onClick={refresh}>
            Back
          </Button>
          <Button className="shadow" variant="primary" onClick={updateBio}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBioModal;
