import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function LocationModal() {
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

  const [locations, setLocations] = useState([]);
  const [state, setState] = useState(data);
  const [message, setMessage] = useState("");

  const BASE_URL = "https://reworkacademy.co/app/v2";
  const id = localStorage.getItem("userId");

  useEffect(() => {
    let api_url = BASE_URL + "/locations";
    fetch(api_url)
      .then((e) => e.json())
      .then((res) => {
        setLocations(res);
      });
  }, []);

  const onChangeLocation = (e) => {
    let { value } = e.target;
    let location = locations.find((x) => x.state === value);
    let _state = { ...state };
    _state.state = location.state;
    _state.country = location.country;
    setState(_state);
  };

  const updateLocation = async () => {
    let res = await axios.put(BASE_URL + "/students/" + id + "/profile", state);
    let { data } = res;
    setMessage(data.msg);
    console.log(data);
    //setShow(false)
  };

  const refresh = () => {
    window.location.reload();
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
          <Modal.Title>Update your location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1 text-end text-primary mt-0">{message}</p>
          <div class="form-floating">
            <select
              class="form-select _sam-outline-0"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={onChangeLocation}
            >
              <option selected></option>
              {locations?.map((location) => {
                return (
                  <option key={location.id} value={location.state}>
                    {location.state}, {location.country}
                  </option>
                );
              })}
            </select>
            <label for="floatingSelect">Change Location: </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="shadow" variant="secondary" onClick={refresh}>
            Back
          </Button>
          <Button className="shadow" variant="primary" onClick={updateLocation}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LocationModal;
