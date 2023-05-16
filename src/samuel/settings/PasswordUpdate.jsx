import React, {useState, useEffect} from 'react'
import ".././assets/css/passwordupdate.css";
import axios from 'axios'
import { RiseLoader } from 'react-spinners';


const PasswordUpdate = () => {

  const BASE_URL = "https://reworkacademy.co/app/v2"
  //const user_id = 123
  const [email, setEmail] = useState('')
  const [old_passwd, setOld_passwd] = useState('')
  const [new_passwd, setNew_passwd] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const [success, setSucces] = useState(false)
  const [notSuccessful, setNotSuccessfull] = useState(false)


  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(email === ""){
      setError(true)
    }else if(!isEmail){
      setError(true)
    }else if(old_passwd.length < 3 || ""){
      setError(true)
      return;
    }else if(new_passwd.length < 3 || ""){
      setError(true)
      return;
    }else{
      setIsLoading(true)
      try {
          let api_url =  BASE_URL + "/accounts/change-passwd";
          const data = {
            email: email,
            old_passwd: old_passwd,
            new_passwd: new_passwd
          }
          const res = await axios.post(api_url,{data})
          console.log(res)
      } catch (err) {
          console.log(err)
      }
    }
    
    setIsLoading(false)
    //setSucces(true)
    setError("")
    setEmail("")
    setOld_passwd("")
    setNew_passwd("")
}



function isEmail(val) {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!regEmail.test(val)){
    setError(true)
    return;
  }
}

  return (
    <form onSubmit={handleSubmit}>
      {isLoading ? <div className='position-absolute d-flex justify-content-center _sam-spiner'>
         <RiseLoader size={25} color="#00AFEF" className='position-absolute top-50 start-50 translate-middle color-primary' />
      </div> : null}
      <div className='_sam_container bg-white pt-4 pb-2 mx-0'>
    <div className="col-md-12">
    <div className="card mb-4">
      <div className="card-header border-bottom">
        <p className='my-0 text-secondary form-text'>Please provide your <span className='text-dark text-bold'>Current Password</span> to update your password</p>
      </div>
      <div className="card-body">
      <div className='my-3'>
      <label for="inputPassword5" className="form-label text-dark text-capitalize">Email Address</label>
      <input value={email} type="email" id="inputEmail5" className="form-control _sam-form-focus" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
        { error && email == "" ? <p className='text-danger mt-3 _sam-error'>Invalid email address</p>: ""}
        {/* { !isEmail && email == "" ? <p className='text-danger mt-3 _sam-error'>Wrong email format</p>: ""} */}
    </div>

    <div className='my-3'>
      <label for="inputPassword5" className="form-label text-dark text-capitalize">Current Password</label>
      <input value={old_passwd} type="password" id="inputPassword5" className="form-control _sam-form-focus" placeholder="Enter current password" aria-describedby="passwordHelpBlock" onChange={(e) => setOld_passwd(e.target.value)}  />
      { error && old_passwd.length < 3 ? <p className='text-danger mt-3 _sam-error'>Invalid or weak password strength</p>: ""}
    </div>

    <div className='my-3'>
      <label for="inputPassword5" className="form-label text-dark text-capitalize">New Password</label>
      <input value={new_passwd} type="password" id="inputPassword5" className="form-control _sam-form-focus" placeholder="Enter new password" aria-describedby="passwordHelpBlock" onChange={(e) => setNew_passwd(e.target.value)} />
      { error && new_passwd.length < 3 ? <p className='text-danger mt-3 _sam-error'>Invalid or weak password strength</p>: ""}
    </div>

    <div className='d-flex justify-content-between'>
      <button disabled={!email || !new_passwd || !old_passwd} class="btn btn-primary btn-icon-split shadow mb-5 mt-3">
          <span class="text">Update Password</span>
      </button>
        <div>
           
          {/* {
            success ? <p className='text-primary mt-4'>You have successfully Change your password</p> : <p className='text-primary mt-4'>Error changing your password</p>
          } */}
           
        </div>
      </div>
      </div>
    </div>
  </div>
  </div>
  </form>
  )
}

export default PasswordUpdate