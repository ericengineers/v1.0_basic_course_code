import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css'
import useLike from '../../hooks/useLike';
import useFollow from '../../hooks/useFollow';
import UserInfo from '../UserInfo';
import CommentInput from '../CommentInput';
import { getCommentList } from '../../server';
import Comment from '../Comment';
export default function PostDetail(props) {
    const [commentList, setCommentList] = useState([])

    const { onClose = () => { } } = props
    const { data } = props
    const { author, content, createdTimeAgo, commentCount, likeCount, files, pid } = data;
    const { nickname, avatar, uid, interaction, fsid, username } = author;
    const { followStatus: followStatusForUser } = interaction;
    const { followStatus, likeStatus } = data.interaction || {};
    const { images = [] } = files || {}
    const [hasLike, dispatchLike] = useLike({ id: pid, type: 'post', status: likeStatus })
    const [hasFollow, dispatchFollow] = useFollow({ id: pid, type: 'post', status: followStatus })
    const [hasFollowForUser, dispatchFollowForUser] = useFollow({ id: uid, type: 'user', status: followStatusForUser })
    const [commentId, setCommentId] = useState(pid)
    const [commentType, setCommentType] = useState('post')
    const [commentUser, setCommentUser] = useState({})

    const refresh = () => {
        getCommentList(pid).then(res => {
            const { code, data } = res.data;
            if (code === 0) {
                const { list } = data;
                setCommentList(list)
            }
        })

    }
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        refresh()
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])


    const handleCommentReply = (id, commentAuthor) => {
        setCommentId(id)
        setCommentType('comment')
        setCommentUser(commentAuthor)
    }

    return (
        <div class="modal">
            <div class="mask" ></div>
            <div class="close" onClick={onClose}>x</div>
            <div class="content">
                <div class="post-detail">


                    <Swiper
                        style={{ width: '700px' }}
                    // spaceBetween={50}
                    // slidesPerView={3}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            images.map(image => {
                                return (
                                    <SwiperSlide>
                                        <div className='post-img-container'><img src={image.imageBigUrl} /></div>
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>



                </div>
                <div class="comment-detail">
                    <div class="user-info">
                        <UserInfo user={author}></UserInfo>
                        <div class="operation">
                            <svg aria-label="更多选项" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16"
                                role="img" viewBox="0 0 24 24" width="24">
                                <title>更多选项</title>
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <circle cx="6" cy="12" r="1.5"></circle>
                                <circle cx="18" cy="12" r="1.5"></circle>
                            </svg>
                        </div>
                    </div>

                    <div class="comment-list">
                        {
                            commentList.map(item => {
                                return (
                                    <Comment key={item.cid} data={item} onReply={handleCommentReply}></Comment>
                                )
                            })
                        }
                    </div>

                    <div class="reaction">
                        <div class="icons">
                            <div>
                                <i onClick={() => { dispatchLike() }} className={`icofont-heart ${hasLike ? 'active' : ''}`}></i>
                            </div>
                            <div>
                                <i class="icofont-ui-messaging"></i>
                            </div>
                            <div>
                                <i class="icofont-share-alt"></i>
                            </div>
                            <div class="mark">
                                <i onClick={() => { dispatchFollow() }} className={`icofont-book-mark ${hasFollow ? 'active' : ''}`}></i>
                            </div>
                        </div>

                        <div style={{ fontWeight: 'bold', color: '#000', fontSize: '14px' }}>
                            {likeCount}次赞
                        </div>
                        <div
                            style={{ color: ' rgb(67, 63, 63)', fontSize: '10px', borderBottom: ' rgb(219, 219, 219) solid 1px', paddingBottom: '10px' }}>
                            {createdTimeAgo}
                        </div>
                        {commentType === 'comment' && <div style={{ fontSize: '12px', display: 'flex', }}
                        ><span>正在回复 “{commentUser.nickname}” 的评论</span>
                            <span style={{ color: 'rgb(0, 149, 246)', marginLeft: '20px' }} onClick={() => { setCommentType('post') }}>取消</span>
                        </div>}
                        <CommentInput onSuccess={refresh} level={1} type={commentType} commentId={commentId} pid={pid}></CommentInput>
                    </div>

                </div>

            </div>
        </div>
    )
}