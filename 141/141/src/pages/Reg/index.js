
import { Button, Alert } from '@mui/material'
import WebTitle from '../../components/webTitle'
import styles from './index.module.css'
import { register, sendCode } from '../../server'
import { useEffect, useRef, useState } from 'react'
import { encode } from 'js-base64'
import VerifyCodeInput from '../../components/VerifyCodeInput'
import { useNavigate } from 'react-router-dom'
// aa123456
// 15527332918@163.com
// 24680263@qq.com
// a1234567
export default function Reg() {
    const [tip, setTip] = useState()
    const [hasSendCode, setHasSendCode] = useState()
    const [code, setCode] = useState()
    const emailInput = useRef()
    const nickNameInput = useRef()
    const passwordInput = useRef()
    const confirmPasswordInput = useRef()

    const navigator = useNavigate()

    const handleRegister = () => {
        // 第一步,查看5个空是不是都填了
        if (!emailInput.current.value || !code|| !nickNameInput.current.value || !passwordInput.current.value || !confirmPasswordInput.current.value) {
            setTip('请确保信息都输入')
            return;
        }
        // 第二步,检验验证码

        if (!hasSendCode) {
            setTip('请发送验证码,并正确填写')
            return;
        }


        // 第三步,查看密码是否相等

        if (passwordInput.current.value !== confirmPasswordInput.current.value) {
            setTip('2次密码不相同')
            return;
        }

        // 调用接口
        register({
            type: 'email',
            account: emailInput.current.value,
            verifyCode: code,
            password: encode(passwordInput.current.value),
            nickname: nickNameInput.current.value
        })
    }
    useEffect(() => {

    }, [])
    return (
        <>
            <div className={styles.container}>
                <WebTitle></WebTitle>
                <p>
                    注册前端社区，分享精彩技术
                </p>
                <input ref={emailInput} placeholder='邮箱' className='email'></input>
                <VerifyCodeInput
                    email={emailInput}
                    onChange={(t)=>{
                        console.log('验证码输入框：',t);
                        setCode(t)
                    }}
                    onSuccess={() => {
                        setHasSendCode(true)
                    }} onFail={(msg) => {
                        setTip(msg)
                    }}></VerifyCodeInput>
                <input ref={nickNameInput} placeholder="昵称" className='nikname'></input>
                <input type='password' ref={passwordInput} placeholder="密码" className='password'></input>
                <div className='small-tip' style={{ width: '258px', textAlign: 'left' }}>密码必须包含: 数字 小写字母 长度: 8~32</div>
                <input type='password' ref={confirmPasswordInput} placeholder="确认密码" className='password'></input>
                <p className='small-tip'>
                    使用我们服务的用户可能已经把你的联系方式上传到社区
                </p >
                <p className="small-tip" >注册即表示你同意我们的条款、隐私权政策和Cookie 政策。</p>
                {tip && <Alert severity="info">{tip}</Alert>}
                <Button onClick={handleRegister} style={{ width: '258px', marginBottom: '30px' }} variant="contained">注册</Button>
            </div>
            <div className={styles.container}>
                <p>有账户了吗?<span onClick={()=>{navigator('/login')}} className={styles.link}>请登录</span></p>
            </div>
            <div className={styles.footer}>
                <div className="small-tip">meta</div>
                <div className="small-tip">关于</div>
                <div className="small-tip">博客</div>
                <div className="small-tip">工作</div>
                <div className="small-tip">帮助</div>
                <div className="small-tip">API</div>
                <div className="small-tip">隐私</div>
                <div className="small-tip">条款</div>
                <div className="small-tip">地点</div>



            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }} className="small-tip">
                © 2024 front end from Meta
            </div>
        </>
    )
}