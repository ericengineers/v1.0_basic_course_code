
import { useRef, useState } from 'react'
import styles from './index.module.css'
import Emoji from '../Emoji'

export default function TextArea(props) {
    const [wordCount, setWordCount] = useState(0)
    const textRef = useRef()
    const { onChange } = props;
    const handleChange = (e) => {

        setWordCount(e.target.value.length)
        onChange && onChange(e.target.value)
    }

    const handleEmojiSlect = (emoji) => {
        const value = textRef.current.value;
        textRef.current.value = value + emoji

        setWordCount(textRef.current.value.length)
        onChange && onChange(textRef.current.value)
    }
    const handleEmojiClose = () => {
        setTimeout(() => {
            textRef.current.focus()
        }, 0);
    }

    return (
        <div className={styles.container}>
            <textarea placeholder='写点什么……' ref={textRef} onChange={handleChange} name="textarea" rows="10" cols="40"></textarea>
            <div className={styles.info}>
                <Emoji onSelect={handleEmojiSlect} onClose={handleEmojiClose}></Emoji>
                <span>{wordCount}/2200</span>
            </div>
        </div>
    )
}