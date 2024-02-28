
import { useContext, useEffect, useRef, useState } from 'react'
import UserInfo from '../../components/UserInfo'
import styles from './index.module.css'
import { navContext } from '../../context/nav'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import classNames from 'classnames'
import { updateUser, upload, uploadAvatar } from '../../server'

export default function UserEdit() {
    const [file, setFile] = useState([])

    const inputEle = useRef()
    const [state] = useContext(navContext)
    const { user } = state;
    const [avatarUrl, setAvatarUrl] = useState()
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        setAvatarUrl(user.avatar)
        setUserInfo({ bio: user.bio, gender: user.gender })
    }, [user])
    const handleUp = () => {
        inputEle.current.click()
        inputEle.current.addEventListener('change', (e) => {
            const { files } = e.target;
            setFile(files)
            renderFile(files)
        })

    }
    const renderFile = (files) => {
        const arr = []
        for (let i = 0; i < files.length; i++) {

            setTimeout(() => {
                uploadAvatar(user.uid, files[i]).then(res => {
                    setAvatarUrl(res.url)
                    setUserInfo({ ...userInfo, avatarFid: res.fid })
                })
            }, 0);
        }

    }
    const handleSignChange = (e) => {
        setUserInfo({ ...userInfo, bio: e.target.value })
    }

    const handleSexChange = (e) => {
        setUserInfo({ ...userInfo, gender: e.target.value })
    }

    const handleSubmit = () => {
        updateUser(userInfo).then(() => {
            window.dispatchEvent(new CustomEvent('userRefresh'))
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.pageTitle}>编辑主页</div>
            <div className={styles.userInfo}>
                <div>
                    <UserInfo user={{ ...user, avatar: avatarUrl }}></UserInfo>
                </div>
                <div style={{width:'100px'}}>
                    <Button onClick={handleUp} variant="contained" >更换头像</Button>
                    <input accept="image/png, image/jpeg" ref={inputEle} style={{ height: '0px' }} type='file'></input>
                </div>
            </div>

            <div className={styles.formItem}>
                <FormControl sx={{ m: 1, minWidth: 520 }}>
                    <div className={styles.formTitle}>个性签名</div>
                    <TextField value={userInfo.bio} onChange={handleSignChange} id="outlined-basic" variant="outlined" />
                </FormControl>
            </div>
            <div className={styles.formItem}>
                <FormControl sx={{ m: 1, minWidth: 520 }}>


                    <div className={styles.formTitle}>性别</div>
                    {user.gender && <Select
                        defaultValue={user.gender}
                        value={userInfo.gender}
                        onChange={handleSexChange}
                    >
                        <MenuItem value={2}>男</MenuItem>
                        <MenuItem value={3}>女</MenuItem>
                        <MenuItem value={1}>不公开</MenuItem>
                    </Select>}
                </FormControl>
            </div>
            <div className={classNames(styles.formItem, styles.submit)}>
                <Button onClick={handleSubmit} variant="contained">提交</Button>
            </div>

        </div>
    )
}