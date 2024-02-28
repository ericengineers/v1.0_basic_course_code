
import logo from './logo.svg';
import './App.css';
import left from './assets/arrow-left.png'
import notification from './assets/notification.png'
import Ellipse from './assets/Ellipse 205.png'
import more from './assets/more.png'
import profileTick from './assets/profile-tick.png'
import instagram from './assets/instagram.png'
import Polygon from './assets/Polygon 14.png'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
       // fetch service api
    // http request fetch ajax axios
    fetch("https://6kp7fqye8x.api.quickmocker.com/api/008/info").then(res=>{
        return res.json()
    }).then(result=>{
        console.log('print:',result);
        const {success,data={}}=result;
        if(success){
            const {following,followers,likes}=data;
            // show html
            document.getElementById('following').textContent=following
            document.getElementById('followers').textContent=followers
            document.getElementById('likes').textContent=likes
        }
    })
  
  })
  


  return (
    <div>
 <div >
        <div className="header">
            <div>
                <img className="header-icon"  src={left} alt="" srcset="" />
            </div>
            <div>
                <span> falca</span>
            </div>
            <div >
                <img className="header-icon notification" src={notification} alt="" srcset="" />
                <img className="header-icon" src={more} alt="" srcset="" />
            </div>
        </div>
    </div>
    <div>
        <div className="photo-container">
            <div className="ye-line">
                <div className="circle">
                    <img src={Ellipse} alt="" />
                </div>
            </div>
            <div className="living">
                LIVE
            </div>
        </div>
    </div>
    <div className="nikname">
        @falcao8000
    </div>
    <div className="infomation">
        <div  className="info-item">
            <p className="info-item-data" id="following">583</p>
            <p className="info-item-label">Following</p>
        </div>
        <div className="info-item">
            <p className="info-item-data" id="followers">921.9K</p>
            <p className="info-item-label">Followers</p>
        </div>
        <div className="info-item">
            <p className="info-item-data" id="likes">6M</p>
            <p className="info-item-label">Likes</p>
        </div>
    </div>
    <div className="content">
        <div className="reaction">
            <div className="action-item" style={{width: "134px"}}>
               <p >Message</p>
            </div>
            <div className="action-item">
                <img src={profileTick} alt="" srcset="" />
            </div>
            <div className="action-item">
                <img src={instagram} alt="" srcset="" />
            </div>
            <div className="action-item">
                <img src={Polygon} alt="" srcset="" />
            </div>
        </div>
    </div>
    <div className="content" style={{marginTop:"16px"}}>
        <p style={{color:"#8D9295",fontSize: "14px"}}>Join my livestream everyday</p>
    </div>
    <div className="content" style={{marginTop:"20px"}} >
        <img src="./assets/link-2.png" alt="" srcset="" />
        <a href="">https://youtube.com/channel/UCMvgzN1E-...</a>
    </div>
    <div className="content" style={{marginTop:"22px"}}>
        <img src="./assets/message-question.png" alt="" srcset="" />
        <a href="" style={{color:"#FFCC00"}}>Q&A</a>
    </div>
      
    </div>
  );
}

export default App;
