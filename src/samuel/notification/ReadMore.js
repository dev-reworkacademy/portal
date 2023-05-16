import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ReadMore = ({text, limit, readMessage}) => {

 const [readMore, setReadmMore] = useState(false)
 let displaybtn ="none"

 const toggleText=()=>{
    setReadmMore(prevState => !prevState)
 }
  return (
    <div className='_sam_line-hight' onClick={toggleText} style={{cursor: "pointer"}}>
        {readMore ? text : text.substr(0, limit)}
        <Link onClick={readMessage} style={{display: readMore ? displaybtn : "block"}}>{readMore ? 'Close' : '..Read more'}</Link>
    </div>
  )
}

export default ReadMore