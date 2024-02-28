import { useContext, useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import { Button, Popover } from '@mui/material'
import Avatar from '../Avatar'
import { getDirectUser } from '../../server'
import useFollow from '../../hooks/useFollow'
import { useNavigate } from 'react-router-dom'
export default function UserInfo(props) {
    const userRef = useRef()

    const [visible, setVisible] = useState(false)
    const navigator =useNavigate()
    const [user, setUser] = useState({})
    const { stats = {}, interaction = {} } = user;
    const { followStatus } = interaction;
    const { postPublishCount, followMeCount, followUserCount } = stats;
    const { nickname, avatar, uid } = props.user
    const { showDetail = false,onClick } = props;
    const [state, dispatch] = useFollow({ id: uid, type: 'user', status: followStatus })

    useEffect(() => {
        if (showDetail && visible) {
            getDirectUser(uid).then(res => {
                setUser(res)
            })
        }

    }, [visible])
    return (
        <div
            // onMouseOut={() => { setVisible(false) }}
            // onClick={()=>{onClick()}}
            onMouseEnter={() => {
                setVisible(true)
            }} className={styles.user} ref={userRef}>
            <Avatar size={0} value={avatar}></Avatar>
            <div className={styles.nikName}>
                <div style={{ color: '#000', fontWeight: 'bold' }}>{nickname}</div>
            </div>
            {showDetail && <Popover
               
                open={visible}
                anchorEl={userRef.current}
                onClose={() => { setVisible(false)  }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className={styles.detail}>
                    <div className={styles.base}>
                        <Avatar size={2} value={avatar}></Avatar>
                        <div className={styles.nikName}>
                            <div style={{ color: '#000', fontWeight: 'bold' }}>{nickname}</div>
                        </div>
                    </div>
                    <div className={styles.reactionData}>
                        <div>
                            <p className={styles.data}>{postPublishCount}</p>
                            <p>贴子</p>
                        </div>
                        <div>
                            <p className={styles.data}>{followMeCount}</p>
                            <p>粉丝</p>
                        </div>
                        <div>
                            <p className={styles.data}>{followUserCount}</p>
                            <p>已关注</p>
                        </div>
                    </div>
                    <div className={styles.follow}>
                        <Button onClick={() => { dispatch() }} style={{ width: '280px' }} variant={state ? "outlined" : "contained"} startIcon={<i class="icofont-duotone icofont-add-users"></i>}>
                            {state ? '取消关注' : '关注'}
                        </Button>
                    </div>
                </div>
            </Popover>}
        </div>
    )
}