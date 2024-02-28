


import { Drawer } from '@mui/material';
import styles from './index.module.css'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from '../../server';
import UserInfo from '../UserInfo';
import Avatar from '../Avatar';

const actionTypes = {
    1: '点赞',
    2: "点踩",
    3: "关注",
    4: "屏蔽",
    5: "发表",
    6: "编辑",
    7: "删除",
    8: "置顶",
    9: "设精",
    10: "管理"
}

export default function Notification(props) {
    const { onClose = () => { } } = props;
    const [list, setList] = useState([])
    const navigator = useNavigate()

    useEffect(() => {
        notification().then(res => {
            setList(res)
        })
    }, [])

    const renderAction = (action) => {
        const { type, actionObject, actionType, actionInfo, content, timeAgo } = action;
        let str = null

        switch (type) {
            case 1:
                str = <div className={styles.actionType}>
                    <div className={styles.actionTime}>系统给你发了一条消息  {timeAgo}</div>
                    <div className={styles.actionContent}>{content}</div>
                </div>
                break;
            case 3:
                str = <div className={styles.actionType}>
                    <div className={styles.actionTime}>点赞了你的贴子  {timeAgo}</div>
                    <div className={styles.actionContent}>{content}</div>
                </div>
                break;
            case 5:
                str = <div className={styles.actionType}>
                    <div className={styles.actionTime}>关注了你的贴子  {timeAgo}</div>
                    <div className={styles.actionContent}>{content}</div>
                </div>
                break;
            case 8:
                str = <div className={styles.actionType}>
                    <div className={styles.actionTime}>评论了你的贴子  {timeAgo}</div>
                    <div className={styles.actionContent}>"{content}"</div>
                </div>
                break;

        }


        return str;
    }

    return (
        <div className={styles.container}>
            <Drawer
                open={true}
                onClose={onClose}
            >
                <div className={styles.panel}>
                    <div className={styles.title}>通知 </div>
                    {list.map(item => {
                        return (
                            <div className={styles.item}>
                                <div>
                                    <UserInfo user={item.actionUser}></UserInfo>
                                </div>
                                <div>{renderAction(item)}</div>
                                <div className={styles.content}>
                                    <Avatar value={item.actionInfo.author.avatar}></Avatar>
                                    <div className={styles.contentText}>{item.actionInfo.content}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Drawer>
        </div>
    )
}