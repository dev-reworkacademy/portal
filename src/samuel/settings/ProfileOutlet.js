import React, {useEffect, useState} from 'react'
import Footer from "./../../template/Footer";
import Nav from "./../../template/Nav";
import Topbar from "./../../template/Topbar";
import {Camera} from "react-feather"

import ".././assets/css/profile.css";
import BasicInfo from "./BasicInfo";
import Bio from "./Bio";
import { event } from 'jquery';
import axios from 'axios';


const ProfileOutlet = () => {

  const BASE_URL = " https://reworkacademy.co/app/v2"
  const user_id = localStorage.getItem("userId")

  const [profileInfo, setProfileInfo] = useState([])
  const [file, setFile] = useState("")
  const [preview, setPreview] = useState("")
  const [uploadProgress, setUploadProgress] = useState('')

  useEffect(() => {
    let api_url =  BASE_URL + "/students/" + user_id + "/profile";
   
    fetch(api_url)
      .then((e) => e.json())
      .then((res) => {
        setProfileInfo([res]);
      });
  }, [])
  
  const handleChange =(e)=>{
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    const filePreview = URL.createObjectURL(selectedFile)
    setPreview(filePreview)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    axios.post(BASE_URL + '/students' + '/img', formData, {
      onUploadProgress: (e) =>{
        const totalUpload = Math.floor((e.loaded / e.total * 100))
        setUploadProgress(totalUpload)
      },
    })
    .then((res)=>console.log(res))
    .catch((err) => console.log(err))
  }

  return (
    <div id="wrapper" className="page-wrapper">
      <Nav />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar pageName="Profile" />
          <div className="container _container-95 bg-white mb-3 pt-0 pr-0 pl-0 pb-5">
            {/* {uploadProgress && <h1>{uploadProgress}% uploaded</h1>} */}
           {
            profileInfo?.map((profile)=>{
              return(
                <div className="_sam_profile_image_holder rounded-top position-relative d-flex justify-content-center">
               {file &&  <img src={preview} alt="profile" className='_object-fit rounded-top '/>}
                <img src={profile.banner} alt="profile" className='_object-fit rounded-top '/>
                <div className='_sam-camera'>
                    <label>
                     <Camera size={30} color="white" cursor="pointer"/>
                     <input type="file" accept="image/png, image/jpg, image/gif, image/jpeg" 
                     className='_sam_file'
                     name='file'
                      onChange={(e)=>handleChange(e)}
                      />
                    </label>
                </div>
                <div className="position-absolute overflow-hidden d-flex justify-content-center rounded-circle top-100 start-50 translate-middle _sam_user_image_holder">
                  <img src={profile.avatar} alt='user' />
                  <div className='text-bg'>
                  <label className='_sam-label'>
                       Upload photo
                    <input type="file" accept="image/png, image/jpg, image/gif, image/jpeg" className='_sam_file'/>
                  </label>
                  </div>
                </div>
              </div>
              )
            })
           }
            <div className="container _sam_mt_100">
              {
                profileInfo?.map((profile)=>{
                  return(
                    <div className="d-flex flex-column border-bottom">
                    <h2 className="text-center m-0">{profile.user_name}</h2>
                    <p className="text-center m-0 mb-2">
                      {profile.current_course}
                    </p>
                  </div>
                  )
                })
              }

              
                <div className="contianer-fluid">
                <div className="row mt-3 gx-5">
                    <div className="col-lg-4">
                        {
                          profileInfo?.map((profile)=>{
                            return(
                              <BasicInfo 
                                key={profile.id}
                                full_name={profile.full_name}
                                bio={profile.bio}
                                currentCurses={profile.current_course}
                                location={profile.location}
                                language={profile.primary_language}
                                certificate={profile.certificate}
                                link1={profile.social_links.twitter}
                                link2={profile.social_links.facebook}
                                link3={profile.social_links.instagram}
                                link4={profile.social_links.linkedin}
                                avatar={profile.avatar}
                                banner={profile.banner}
                                profile={profile}
                               />
                            )
                          })
                        }
      
                    </div>
                    <div className="col-lg-7">
                        <div className='container ml-5 _sam-small-screen'>
                          {
                            profileInfo?.map((profile)=>{
                              return(
                                <Bio 
                                  key={profile.id}
                                  bio={profile.bio}
                                  profile={profile}
                                />
                              )
                            })
                          }
                        </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
);
}

export default ProfileOutlet