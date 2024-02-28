// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import './index.css'
import useLike from '../../hooks/useLike';
import useFollow from '../../hooks/useFollow';
import UserInfo from '../UserInfo';
import Emoji from '../Emoji';
import { useRef, useState } from 'react';
import { publishComment, publishPost } from '../../server';
import PostDetail from '../PostDetail';
import CommentInput from '../CommentInput';
export default function Post(props) {
    
    const [detailVisible, setDetailVisible] = useState(false)
    const { data } = props
    const { author, content, createdTimeAgo, commentCount, likeCount, files, pid } = data;
    const { nickname, avatar, uid, interaction, fsid, username } = author;
    const { followStatus: followStatusForUser } = interaction;
    const { followStatus, likeStatus } = data.interaction || {};
    const { images = [] } = files || {}
    const [hasLike, dispatchLike] = useLike({ id: pid, type: 'post', status: likeStatus })
    const [hasFollow, dispatchFollow] = useFollow({ id: pid, type: 'post', status: followStatus })
    const [hasFollowForUser, dispatchFollowForUser] = useFollow({ id: uid, type: 'user', status: followStatusForUser })

    const [commentCountDyPlus, setCommentCountDyPlus] = useState(0)

    

    const hanldeOpenDetail = () => {
        setDetailVisible(true)
    }

    return (
        <div class="post">
            <div class="user-info">

                <UserInfo user={author} showDetail></UserInfo>
                <div style={{ fontSize: "8px", margin: " 0 2px" }}>•</div>
                <div class="create-date">
                    {createdTimeAgo}
                </div>
                {/* <div style={{ fontSize: "8px", margin: " 0 2px" }}>•</div> */}
                {/* <div onClick={() => { dispatchFollowForUser() }} class="follow">
                    {hasFollowForUser ? '已关注' : '关注'}
                </div> */}
                <div class="operation">
                    <svg aria-label="更多选项" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24"
                        role="img" viewBox="0 0 24 24" width="24">
                        <title>更多选项</title>
                        <circle cx="12" cy="12" r="1.5"></circle>
                        <circle cx="6" cy="12" r="1.5"></circle>
                        <circle cx="18" cy="12" r="1.5"></circle>
                    </svg>
                </div>
            </div>
            <div class="picture-container">
                <Swiper
                    style={{ width: '468px' }}
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

                    ...
                </Swiper>
                {/* {images.map(i=>(<img src={i.imageBigUrl}></img>))} */}
            </div>
            <div class="reaction">
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
            <div>{content}</div>
            <div class="reaction-data">
                <div style={{ fontWeight: 'bold', color: '#000' }}>
                    {likeCount}次赞
                </div>
                <div onClick={hanldeOpenDetail}>
                    全部{commentCount + commentCountDyPlus}评论
                </div>
                <CommentInput pid={pid}></CommentInput>
            </div>
            {detailVisible && <PostDetail data={data} onClose={() => { setDetailVisible(false) }} />}
        </div>
    )
}