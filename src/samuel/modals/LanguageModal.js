import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function LanguageModal() {

  const data = {
    first_name:"",
    last_name:"",
    other_name:"",
    user_name:"",
    bio:"",
    state:"",
    country:"",
    primary_language:"",
    other_language:[],
    certificate:"",
    social_links:{
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: ""
  
  }
}


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [languages, setLanguages] = useState([])
  const [otherLanguage, setOtherLanguage] = useState(data)
  const [message, setMessage] = useState('')

  const BASE_URL = "https://reworkacademy.co/app/v2"
  const id = localStorage.getItem("userId")

  useEffect(() => {
    let api_url = BASE_URL + "/languages"
    fetch(api_url)
    .then((e) => e.json())
    .then((res) => {
        setLanguages(res);
    });
  }, [])


  const onchangeLanguage = (e) => {
    let {value} = e.target;
    let language = languages.find(x => x.otherLanguage === value)
    let _otherLanguage = {...otherLanguage};
    _otherLanguage.other_language = language.other_language;
    setOtherLanguage(_otherLanguage)
  }

  const addLanguag = async() =>{
    let res = await axios.put(BASE_URL + '/students/' + id + '/profile',otherLanguage);
    let {data} = res
    setMessage(data.msg)
    console.log(data)
    //setShow(false)
  }

  const refresh=()=>{
    window.location.reload();
    handleClose()
  }

  return (
    <>
      <div className="shadow" variant="primary" onClick={handleShow}>
        Add
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Primary Language Spoken</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className="mb-1 text-end text-primary mt-0">{message}</p>
        <div class="form-floating">
            <select class="form-select _sam-outline-0" id="floatingSelect" aria-label="Floating label select example" onChange={onchangeLanguage}>
              <option selected></option>
              {
                languages?.map((language) => {
                  return(
                    <option key={language.id} value={language.name}>{language.name}</option>
                  )
                })
              }
            </select>
            <label for="floatingSelect">Add language: </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="shadow" variant="secondary" onClick={refresh}>
            Back
          </Button>
          <Button className="shadow" variant="primary" onClick={addLanguag}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LanguageModal;
