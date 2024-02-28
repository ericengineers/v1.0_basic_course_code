import { useState,useRef, useEffect } from "react"
import { Popover } from "@mui/material"
import styles from './index.module.css'
import { getEmoji } from "../../server"

export default function Emoji(props) {
    const [visible, setVisible] = useState(false)
    const anchorEl = useRef()
    const [list,setList]=useState([])
    const {onSelect,onClose}=props;
    useEffect(()=>{
        getEmoji().then(res=>{
            setList(res)
        })
    },[])
    const handleOpen = () => {
        setVisible(true)
    }

    const handleClose = () => {
        setVisible(false)
        onClose&&onClose()
    }

    const handleSelect=(item)=>{
        onSelect&&onSelect(item)
    }
   

    return (
        <>
            <div ref={anchorEl} onClick={handleOpen}>&#x1F600;</div>
            <Popover
                open={visible}
                anchorEl={anchorEl.current}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className={styles.list}>
                    {list.map(item=><i onClick={()=>{handleSelect(item)}}>{item}</i>)}
                </div>
            </Popover>
        </>

    )
}