import { useRef, useState } from "react";
import { publishComment } from "../../server";
import Emoji from "../Emoji";
import './index.css'
import { Snackbar } from "@mui/material";
export default function CommentInput(props) {
    const { pid, commentId, type = 'post', onSuccess = () => { } } = props;
    const commentRef = useRef()
    const [visible, setVisible] = useState()
    const handleEmojiChange = (emo) => {
        commentRef.current.value += emo;
        setTimeout(() => {
            commentRef.current.focus()
        }, 0)
    }

    const handlePublishComment = () => {

        let params = {};
        if (type === 'post') {
            params = {
                type: 'comment',
                commentPid: pid,
                content: commentRef.current.value
            }
        } else if (type === 'comment') {
            params = {
                type: 'comment',
                commentPid: pid,
                commentCid: commentId,
                content: commentRef.current.value
            }
        }
        publishComment(params).then(res => {
            onSuccess()
            setVisible(true)
            setTimeout(() => {
                setVisible(false)
            }, 2000);
        })

    }
    return (
        <div class="comment">
            <input ref={commentRef} type="text" placeholder="添加评论" />
            <div onClick={handlePublishComment} class="ok-btn">发布</div>
            <Emoji onSelect={handleEmojiChange}></Emoji>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={visible}
                message="评论发表成功~"
            />
        </div>
    )
}