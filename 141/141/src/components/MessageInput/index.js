import { useEffect, useRef, useState } from "react";
import { publishComment, pushMessage } from "../../server";
import Emoji from "../Emoji";
import styles from './index.module.css'
import { Snackbar } from "@mui/material";
export default function MessageInput(props) {
    const { user,onSuccess=()=>{} } = props;
    const {uid}=user;
    const commentRef = useRef()
    const [visible, setVisible] = useState()
    const handleEmojiChange = (emo) => {
        commentRef.current.value += emo;
        setTimeout(() => {
            commentRef.current.focus()
        }, 0)
    }

    const handlePublishComment = () => {

       
        pushMessage({
            uidOrUsername:uid,
            message:commentRef.current.value

        }).then(res => {
            onSuccess()
            setVisible(true)
            setTimeout(() => {
                setVisible(false)
            }, 2000);
        })

    }


    useEffect(()=>{

        const handle=(e)=>{
            if(e.keyCode===13){
                
                handlePublishComment()
            }
        }
        window.addEventListener('keypress',handle)

        return ()=>{
            window.removeEventListener('keypress',handle)
        }
    },[])
    return (
        <div className={styles.message}>
            <textarea rows={5   } ref={commentRef} type="text" placeholder="添加评论" />
            <Emoji onSelect={handleEmojiChange}></Emoji>
            <div onClick={handlePublishComment} className={styles.okBtn}>发布</div>
            
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={visible}
                message="评论发表成功~"
            />
        </div>
    )
}