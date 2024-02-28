
import './index.css'

import avatar from '../../assets/tx.png'
import plus from '../../assets/plus.png'
import heart from '../../assets/heart.png'
import msg from '../../assets/msg.png'
import share from '../../assets/share.png'

export default function Interaction(){
    return (
        <div>
            <div className="info">
                <div className="blog-name">abcdef</div>

                <div className="title">adfafasdssfsffsfsfsfffsfsafsfasfsfsfsfsffsfsfsaffsdfsdfds</div>
            </div>
            <div className="action">
                <div className="avatar">
                   <div className="photo">
                   <img src={avatar} alt="" />
                   </div>
                   <div className="mark">
                    <img src={plus} alt="" srcset="" />
                   </div>
                </div>
                <div className="action-item"><img src={heart} alt="" /><span>1.3m</span></div>
                <div className="action-item"><img src={msg} alt="" /><span>10.7m</span></div>
                <div className="action-item"><img src={share} alt="" /><span>30.9k</span></div>
            </div>
        </div>
    )
}