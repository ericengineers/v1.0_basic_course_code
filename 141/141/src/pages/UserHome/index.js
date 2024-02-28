
import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './index.module.css'
import { getMarkedPostList, getPostList, getUserDetail } from '../../server'
import { useNavigate, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import useFollow from '../../hooks/useFollow'
import PostDetail from '../../components/PostDetail'
import { navContext } from '../../context/nav'
export default function UserHome() {
    const { uid } = useParams()
    const [detailVisible, setDetailVisible] = useState(false)
    const [data, setData] = useState({})
    const [detail, setDetail] = useState({})
    const [tabIndex, setTabIndex] = useState(0)
    const [contentList, setContentList] = useState([])
    const { interaction = {}, stats = {} } = detail;
    const { followStatus = false } = interaction;
    const { postPublishCount, followMeCount, followUserCount } = stats;
    const [status, dispatch] = useFollow({ id: uid, type: 'user', status: followStatus })
    const [state] = useContext(navContext)
    const { user } = state;
    const navigator=useNavigate()
    useEffect(() => {
        getUserDetail(uid).then(res => {
            setDetail(res)
        })
    }, [])

    useEffect(() => {
        if (tabIndex === 0) {
            getPostList(uid).then(res => {
                const { code, data } = res.data;
                if (code === 0) {
                    const { list } = data;

                    setContentList(list.map(item => {
                        const { likeCount, commentCount, files = {} } = item;

                        return {
                            pid: item.pid,
                            likes: likeCount,
                            comments: commentCount,
                            img: files.images[0]?.imageRatioUrl,
                            data: item
                        }
                    }))
                }
            })
        } else {
            getMarkedPostList(uid).then(res => {
                setContentList(res.map(item => {
                    const { likeCount, commentCount, files = {} } = item;

                    return {
                        pid: item.pid,
                        likes: likeCount,
                        comments: commentCount,
                        img: files.images[0]?.imageRatioUrl,
                        data: item
                    }
                }))
            })
        }
    }, [tabIndex])

    const handleSendMessage = () => {
        window.dispatchEvent(new CustomEvent('openMsg', {
            detail: { user: detail }
        }))
    }
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.avatar}>
                    <Avatar value={detail.avatar} size={3} type={1}></Avatar>
                </div>
                <div className={styles.infoContent}>
                    <div className={styles.interaction}>
                        <div className={styles.nikname}>{detail.nickname}</div>
                        {detail.uid !== user.uid && <>
                            <div onClick={dispatch} className={classNames(styles.followBtn, status ? '' : styles.active)}>{status ? '已关注' : '关注'}</div>
                            <div onClick={handleSendMessage} className={styles.messageBtn}>发消息</div>
                        </>}
                        {detail.uid === user.uid &&
                            <div onClick={()=>{navigator('/user/edit')}} className={styles.btn}>编辑主页</div>
                        }
                        <div className={styles.moreBtn}>
                            <svg aria-label="更多选项" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24"
                                role="img" viewBox="0 0 24 24" width="24">
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <circle cx="6" cy="12" r="1.5"></circle>
                                <circle cx="18" cy="12" r="1.5"></circle>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.data}>

                        <div className={styles.item}>{postPublishCount}<span className={styles.bold}>贴子</span></div>
                        <div className={styles.item}>{followMeCount}<span className={styles.bold}>粉丝</span></div>
                        <div className={styles.item}>{followUserCount}<span className={styles.bold}>关注</span></div>
                    </div>
                    <div className={styles.userBrief}>
                        {detail.bio}
                    </div>
                </div>
            </div>
            <div className={styles.tabs}>
                <div onClick={() => { setTabIndex(0) }} className={classNames(styles.tab, tabIndex === 0 ? styles.selected : '')}>
                    <i class="icofont-duotone icofont-media"></i>
                    <span style={{ marginLeft: '6px' }}>贴子</span>
                </div>
                <div onClick={() => { setTabIndex(1) }} className={classNames(styles.tab, tabIndex === 1 ? styles.selected : '')}>
                    <i class="icofont-duotone icofont-bookmark"></i>
                    <span style={{ marginLeft: '6px' }}>收藏</span></div>
            </div>
            <div className={styles.content}>
                {
                    contentList.map(item => {
                        return (
                            <div onClick={() => { setDetailVisible(true); setData(item.data) }} className={styles.contentItem}>
                                <img src={item.img} alt="" />
                                <div className={styles.maskContainer}>
                                    <div className={styles.mask}></div>
                                    <div className={styles.maskData}>
                                        <div className={styles.maskDataItem}>
                                            <i class="icofont-heart"></i>
                                            <span style={{ marginLeft: '6px' }}>{item.likes}</span>
                                        </div>
                                        <div className={styles.maskDataItem}>
                                            <i class="icofont-ui-messaging"></i>
                                            <span style={{ marginLeft: '6px' }}>{item.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {detailVisible && <PostDetail data={data} onClose={() => { setDetailVisible(false) }} />}
        </div>
    )
}