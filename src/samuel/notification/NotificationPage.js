import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Footer from "./../../template/Footer";
import Nav from "./../../template/Nav";
import Topbar from "./../../template/Topbar";
import NotificationComponent from './NotificationComponent';
import LoadingMsg from '../../components/LoadingMsg';



const NotificationPage = () => {

  const BASE_URL = " https://reworkacademy.co/app/v2"
  const user_id = localStorage.getItem("userId");

    const [notifications , setNotifications] = useState([]);
    const [isRead , setIsRead] = useState(false);



    useEffect(() =>{  
            const getNotify = async () =>{
                let api_url =  BASE_URL + "/students/" + user_id + "/notice";
                try {
                    const res = await axios.get(api_url)
                    console.log(res.data.data)
                    setNotifications(res.data.data)
                } catch (err) {
                    console.log(err)
                }
            }
            getNotify()     
    },[])

    const readMessage = async(id) => {
      const  note_url = BASE_URL + "/notice/" + id + "/is-read";
      try {
          const res = await axios.put(note_url);
          const notices = [...notifications]
          const notice = notices.find(x=>x.id === id);
          notice.is_read = true;
          setNotifications(notices)
          setIsRead(res.data)
          console.log(notice)
      } catch (err) {
          
      }
  }


    return (
        <div id="wrapper" className="page-wrapper">
          <Nav />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar pageName="Notification" />
              <div className="container-fluid">
              <p className="p-2 _sam_notify_header">All Notifications</p>
              {
                notifications.length>0?
               notifications.map((notification)=>{
                let _message;
                let bGcolor;
                if(notification.is_read === false){
                     bGcolor = "#ffffff"
                    _message = <span className='round color-danger'>New message</span>
                }else if(notification.is_read === true){
                    bGcolor = "#f0f1e7"
                    _message = <span className='color-primary'>Viewed</span>
                }
                return(
                   
                 <NotificationComponent 
                  key={notification.id}
                  caption={notification.caption}
                  status={_message}
                  message={notification.descp}
                  time={notification.created_at}
                  notification={notification}
                  bGcolor={bGcolor}
                  readMessage={()=>readMessage(notification.id)}
                 />
                )
          }): <LoadingMsg/>
        }
              </div>
            </div>
    
            <Footer />
          </div>
        </div>
      );
}

export default NotificationPage