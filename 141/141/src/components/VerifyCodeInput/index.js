
import { useRef, useState } from 'react';
import { Button } from '@mui/material'
import { sendCode } from '../../server'

import styles from './index.module.css'
export default function VerifyCodeInput(props) {
    const codeInput = useRef()
    // 0 未开始 1发送成功 2发送失败 3 已输入
    const [status, setStatus] = useState(0)
    const [hasTimeEnd, setHasTimeEnd] = useState(true)
    const [restSecond, setRestSecond] = useState(60)

    const handleSendCode = () => {

        const { email, onSuccess, onFail } = props;
        const value = email.current.value
        if (!value && !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))) {
            onFail && onFail('请输入正确的邮箱')
            return;
        }
        if (!hasTimeEnd) {
            return;
        }
        sendCode({
            type: 'email',
            useType: 1,
            templateId: 2,
            account: value
        }).then(res => {
            const { code, message = '未知错误' } = res.data;
            if (code === 0) {
                onSuccess && onSuccess()
                setStatus(1)
                timedown()
            } else {
                setStatus(2)
                onFail && onFail(message)

            }
        })

    }

    const timedown = () => {
        setHasTimeEnd(false)
        let count = 60
        const timeCut = () => {
            count = count - 1;
            setRestSecond(count)
            setTimeout(() => {
                if (count === 1) {
                    setHasTimeEnd(true)
                    setRestSecond(60)
                } else {
                    timeCut()
                }
            }, 1000);
        }
        timeCut()
    }

    const handleInputChange = (e) => {
        const { onChange } = props;
        if (status === 0) {
            return null
        } else {
            if (e.target.value) {
                setStatus(3)
            }
            onChange && onChange(e.target.value)
        }
    }
    return (
        <div className={styles.verifyCodeContainer}>
            <input disabled={status === 0 ? true : false} onChange={handleInputChange} ref={codeInput} placeholder={status === 0 ? '请先发送验证码' : '请输入验证码'} className='verifyCode'></input>
            <Button disabled={hasTimeEnd ? false : true} onClick={handleSendCode} variant="contained" className={styles.verifyCodeSend}>{hasTimeEnd ? '发送' : `${restSecond}s`}</Button>
        </div>
    )
}