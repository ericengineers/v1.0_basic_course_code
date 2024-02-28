import { Box, Button, Modal, Switch } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.css'
import UserInfo from "../UserInfo";
import TextArea from "../TextArea";
import { navContext } from '../../context/nav'
import { createDraft, deleteDraft, publishPost, updateDraft, upload } from "../../server";
import { Swiper, SwiperSlide } from 'swiper/react';



export default function CreatePost(props) {
    const [draft, setDraft] = useState({})
    const [step, setStep] = useState(0)
    const [file, setFile] = useState([])
    const [text, setText] = useState('')
    const [fileToView, setFileToView] = useState([])
    const inputEle = useRef(null)
    const { onSuccess, onClose } = props;

    const [visible, setVisible] = useState(true)
    const [state] = useContext(navContext)
    const { user } = state;

    const getOneDraft = () => {
        createDraft().then(res => {
            console.log('拿到草稿',res);
            setDraft({...res})
            const { files = {} } = res;
            const { images = [] } = files
            if (images.length > 0) {
                setFileToView(images)
                setStep(1)
            }
        })
    }
    useEffect(() => {
        getOneDraft()
    }, [])

    const handleClose = () => {
        onClose && onClose()
    }

    const handleUp = () => {
        inputEle.current.click()
        inputEle.current.addEventListener('change', (e) => {
            const { files } = e.target;
            setFile(files)
            renderFile(files)
            setStep(1)
        })

    }


    const handleFileChange = (e) => {
        console.log(e);
    }

    const handleTextArea = (value) => {
        setText(value)
    }

    const renderFile = (files) => {
        const arr = []
        for (let i = 0; i < files.length; i++) {

            setTimeout(() => {
                upload(draft.id, files[i]).then(res => {
                    
                    arr.push(res)
                    console.log(JSON.stringify(arr));
                    setFileToView([...arr])

                })
            }, 0);
        }

    }
    const handlBack = () => {
        setStep(0)
        setFile(null)
        setFileToView([])
        deleteDraft(draft.id).then(() => {
            getOneDraft()
        })
    }


    const handlePublish = () => {
        updateDraft({
            id: draft.id,
            content: text
        }).then(res => {

            setStep(2)
            onSuccess && onSuccess()

        })
    }
    return (
        <div>
            <Modal
                open={visible}
                onClose={handleClose}
            // aria-labelledby="parent-modal-title"
            // aria-describedby="parent-modal-description"
            >

                <div className={styles.container}>
                    <div className={styles.wrap}>
                        <div className={styles.header}>
                            {step === 0 && <>
                                <div className={styles.stepOne}> <span>创建新贴子</span></div>
                            </>}

                            {step === 1 && <>
                                <div onClick={handlBack} ><i class="icofont-arrow-left"></i>返回创建新贴子</div>
                                <div className={styles.stepOne}> <span>编辑草稿</span></div>
                                <Button onClick={handlePublish}>发布</Button>
                            </>}

                            {step === 2 && <>

                                <div className={styles.stepOne}> <span>创建新贴子</span></div>
                            </>}

                        </div>
                        <div className={styles.content}>
                            {step === 0 && <div className={styles.up}>

                                <p>把照片和视频拖放到这里</p>
                                <Button onClick={() => { handleUp() }} variant="contained">从电脑中选择</Button>
                                <input multiple onChange={handleFileChange} accept="image/png, image/jpeg" ref={inputEle} style={{ height: '0px' }} type='file'></input>

                            </div>}
                            {step === 1 && <div className={styles.post}>

                                <div className={styles.preview}>
                                    <Swiper
                                        style={{ width: '400px' }}
                                    >
                                        {
                                            fileToView?.map(image => {
                                                return (
                                                    <SwiperSlide key={image.url}>
                                                        <div className={styles.postImg}><img src={image.url || image.imageBigUrl}></img></div>
                                                    </SwiperSlide>
                                                )
                                            })
                                        }

                                    </Swiper>
                                </div>
                                <div className={styles.textArea}>
                                    <div style={{ marginTop: '10px', paddingLeft: '10px' }}>
                                        <UserInfo user={user}></UserInfo>
                                    </div>
                                    <TextArea onChange={handleTextArea}></TextArea>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
                                        <span>是否关闭评论：</span>
                                        <Switch />
                                    </div>
                                </div>


                            </div>}
                            {step === 2 && <div className={styles.up}>
                                发送成功
                            </div>}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}