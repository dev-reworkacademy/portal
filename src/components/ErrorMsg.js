import React, { useState } from "react";
import ideasImage from './ideas.png';
function ErrorMsg() {
    return (
        <div className="errorComp">
            
            <img src={ideasImage} className="errorImg"/>
            <br/>
            <h4>Keep sharing ideas, while waiting</h4>
        </div>
    )
}

export default ErrorMsg;