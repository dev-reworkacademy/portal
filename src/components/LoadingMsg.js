import React, { useState } from "react";
import ideasImage from './ideas.png';
import { SyncLoader } from "react-spinners";
function LoadingMsg() {
    return (
        <div className="errorComp">
            
            <img src={ideasImage} className="errorImg"/>
            <br/>
            <h4>Keep sharing ideas, while waiting</h4>
            <br/>
            <SyncLoader color="#00AFEF" size={25} />
        </div>
    )
}

export default LoadingMsg;