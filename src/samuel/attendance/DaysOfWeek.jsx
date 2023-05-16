import React from 'react'
import ".././assets/css/attendance.css";
import { Check, X } from "react-feather";


const DaysOfWeek = ({ daysOfWeek}) => {



  return (
    <div className="row">
            <div className="d-flex justify-content-between _sam_days">
               {
                daysOfWeek.data.map((info)=>{
                    let status;
                    if(info.active === true){
                        return(
                            <div>
                            <p className="_sam_week m-1">{info.day}</p>
                            <div className="rounded border p-2 ">
                            <Check className="text-success" />
                            </div>
                            </div>
                        )
                    }else if(info.active === false){
                        return(
                            <div>
                            <p className="_sam_week m-1">{info.day}</p>
                            <div className="rounded border p-2 ">
                            <X className="text-danger" />
                            </div>
                        </div>
                        )
                    }
                })
               }
        </div> 
    </div>
  )
}

export default DaysOfWeek