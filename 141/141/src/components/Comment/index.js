

import useLike from '../../hooks/useLike';
import { getCommentSubList } from '../../server';
import UserInfo from '../UserInfo';

import './index.css'
import { useEffect, useState } from 'react';
export default function Comment(props) {
    const [hasSub, setHasSub] = useState(false)
    const [sub, setSub] = useState([])
    const { data = {}, onReply = () => { }, level = 1 } = props;
    const { cid, interaction, author, commentCount = 0 } = data;
    const { likeStatus } = interaction

    const [like, dispatchLike] = useLike({ id: cid, type: 'comment', status: likeStatus })

    const handleCommentReply = () => {
        onReply(cid, author)
    }

    const handleOpenSub = () => {
        if (commentCount > 0) {
            getCommentSubList(cid).then(res => {
                const { code, data } = res.data;
                if (code === 0) {
                    const { list } = data;
                    setSub(list)
                    setHasSub(!hasSub)
                }
            })
        }

    }

    return (
        <div class="comment-item-container">
            <div className='comment-item'>
                <UserInfo user={data.author}></UserInfo>
                <div className="comment-text">{data.content}</div>
                <div className='comment-op'>
                    <div style={{ marginTop: '6px' }}><span>{data.createdTimeAgo}</span>
                        {level < 3 && <span
                            onClick={handleCommentReply}
                            style={{ color: '#000', marginLeft: '10px', cursor: 'pointer' }}>回复</span>}
                    </div>
                </div>

                <div class="btn">
                    <i onClick={() => {
                        dispatchLike()
                    }} className={`icofont-heart ${like ? 'active' : ''}`} ></i>
                </div>
            </div>



            {commentCount > 0 &&
                <div className='comment-sub-list'>
                    <div onClick={handleOpenSub}>--------{hasSub ? '隐藏回复' : '查看回复'}({commentCount})</div>
                    <div style={{ display: hasSub ? 'block' : 'none' }}>
                        {sub.filter(s => s.replyToComment === null || s.replyToComment?.cid === cid).map(item => {
                            return (
                                <Comment key={item.cid} level={level + 1} data={item} onReply={(cid, author) => { onReply(cid, author) }}></Comment>
                            )
                        })}
                    </div>
                </div>
            }




        </div>
    )
}