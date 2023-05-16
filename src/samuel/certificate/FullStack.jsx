import React from 'react'
import ".././assets/css/certificate.css";
import rwkLogo from ".././assets/images/rwklogo.png";

import {Page, Text, Image, Document, StyleSheet} from "@react-pdf/renderer"



const FullStack = ({ full_name,course_title,director,trainer,date_issued,studentId, certificateId  }) => {

  return (
     <div>
    <Document>
      <Page>
      <div className='_sam-fullstack-background pt-5'>
      <div className="_sam-custom">
        <div className="_sam-certificate-header d-flex">
          <div className='_sam-rwk-logo'>
            <img src={rwkLogo}  />
          </div>
          <Text><div className='mt-1 text-white _sam_med'><p>REWORK ACADEMY</p></div></Text>
        </div>
       <Text>
       <div className="_sam_med-award">
          <p className='text-center text-white'>This certificate is awarded to</p>
        </div>
       </Text>

       <Text>
       <div className='_sam-certificate-holder '>
          <p className='_text-after text-white text-center'>{full_name}</p>
        </div>
       </Text>
       <Text>
       <div className='_border-bottom-sam'></div>
        <div className='_up-until'>
          <p className='text-center text-white'>Up on the successful completion of</p>
        </div>
        <div className='_up-until-completion'>
          <p className='text-center text-white'>{course_title}</p>
        </div>

        <div className="_sam-signature d-flex justify-content-between">
        <div className="director sign_custom text-white">Director: <img className='sign-des' src={director}/></div>
          <div className="head_training sign_custom text-white">Head of training: <img className='sign-des' src={trainer}/></div>
        </div>

        <div className='_student-info-certificate text-white d-flex justify-content-evenly'>
          <p className=' text-white'>
            Student Id: <span>{studentId}</span>
          </p>

          <p className=' text-white'>
            Certificate Id: <span>{certificateId}</span>
          </p>

          <p className=' text-white'>
          Date Issued: <span>{date_issued}</span>
          </p>
        </div>
       </Text>
        <button className='_pdf-certificate'>download</button>
      </div>
      
    </div>
  </Page>
  </Document>
 </div>
  )
}

export default FullStack