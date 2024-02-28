


import { Drawer } from '@mui/material';
import styles from './index.module.css'
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessageList, getMessageRecord, notification, pushMessage } from '../../server';
import UserInfo from '../UserInfo';
import Avatar from '../Avatar';
import { navContext } from '../../context/nav'
import classNames from 'classnames';
import MessageInput from '../MessageInput';


export default function Notification(props) {
    const { onClose = () => { }, targetUser } = props;
    const [isFirst, setIsFirst] = useState(!!targetUser)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [current, setCurrent] = useState()
    const [list, setList] = useState([])
    const [msgList, setMsgList] = useState([])
    const navigator = useNavigate()
    const [state] = useContext(navContext)
    const { user = {} } = state;
    const { uid } = user;

    useEffect(() => {
        getMessageList().then(res => {
            setList(res)
        })
        if (isFirst) {
            setCurrent({
                user: targetUser
            })
        }
    }, [])

    const handleSelect = (msg, index) => {
        setSelectedIndex(index)
        setCurrent(msg)
        refresh(msg)
    }

    const refresh = (msg) => {
        getMessageRecord(msg.id).then(res => {
            setMsgList(res)
        })
    }

    const handleMessageSuccess = () => {
        if (isFirst) {
            setIsFirst(false)
            getMessageList().then(res => {
                setList(res)
                setCurrent(res[0])
                refresh(res[0])
            })

        }else{
            refresh(current)
        }

        
    }
    return (

        <Drawer
            open={true}
            onClose={onClose}
        >
            <div className={styles.container}>
                <div className={styles.panel}>
                    <div className={styles.title}>私信 </div>
                    {list.map((item, index) => {
                        return (
                            <div
                                onClick={() => { handleSelect(item, index) }}
                                className={classNames(styles.item, selectedIndex === index ? styles.active : null)}>
                                <div className={styles.itemLeft}>
                                    <Avatar value={item.user.avatar}></Avatar>
                                </div>
                                <div className={styles.itemRight}>
                                    <div>{item.user.nickname}</div>
                                    <div>
                                        <span>{item.latestMessage.message}</span>
                                        <span className={styles.itemTime}>({item.latestMessage.timeAgo})</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
                {current && <div className={styles.messageDetail}>
                    <div className={styles.user}>
                        <UserInfo user={current.user}></UserInfo>
                    </div>
                    <div className={styles.msgList}>
                        {
                            msgList.map(item => {
                                return (<div className={classNames(styles.msg, item.user.uid === uid ? styles.my : styles.you)}>
                                    <Avatar value={item.user.avatar}></Avatar>
                                    <span>{item.user.uid === uid ? '我' : item.user.nickname}</span>
                                    :
                                    <span className={styles.msgText}>
                                        {item.content}
                                    </span>
                                </div>)
                            })
                        }
                    </div>
                    <div className={styles.inputContainer}>
                        <MessageInput user={current.user} onSuccess={handleMessageSuccess}></MessageInput>
                    </div>
                </div>}
            </div>
        </Drawer>

    )
}