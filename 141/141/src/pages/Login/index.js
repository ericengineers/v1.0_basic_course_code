
import { useContext, useRef, useState } from 'react'
import { Button, Alert } from '@mui/material'
import WebTitle from '../../components/webTitle'
import styles from './index.module.css'
import { login } from '../../server'
import { encode } from 'js-base64'
import { useNavigate } from 'react-router-dom'
import { navContext } from '../../context/nav'
// aa123456
// 15527332918@163.com
// 24680263@qq.com
// a1234567
// 123456@163.com
// 123451@163.com
// 123452@163.com
// 123453@163.com
// a12345678
export default function Login() {
    const [tip, setTip] = useState()
    const emailInput = useRef()
    const passwordInput = useRef()
    const navigator = useNavigate()
    const [state, dispatch] = useContext(navContext)
    const handleLogin = () => {
        if (!emailInput.current.value || !passwordInput.current.value) {
            setTip('请输入账户和密码')
            return;
        }
        login({
            type: 'email',
            account: emailInput.current.value,
            password: encode(passwordInput.current.value)
        }).then(res => {
            dispatch({ type: 'user', user: res })
            navigator('/')
        }).catch(m => {
            setTip(m)
        })
    }
    return (

        <>
            <div className={styles.wrap}>

                <div>
                    <div style={{ width: '400px', height: '445' }}>
                        <textarea style={{ width: '400px', height: '445' }} rows={24} value={`
15527332918@163.com aa123456
24680263@qq.com a1234567
123456@163.com a12345678
123451@163.com a12345678
123452@163.com a12345678
123453@163.com a12345678`}></textarea>
                    </div>
                </div>
                <div>
                    <div className={styles.container}>
                        <WebTitle></WebTitle>
                        <p>
                            注册前端社区，分享精彩技术
                        </p>
                        <input ref={emailInput} placeholder='邮箱' className='email'></input>


                        <input type='password' ref={passwordInput} placeholder="密码" className='password'></input>

                        {tip && <Alert severity="info">{tip}</Alert>}
                        <Button onClick={(handleLogin)} style={{ width: '258px', marginBottom: '30px' }} variant="contained">登录</Button>
                    </div>
                    <div className={styles.container}>
                        <p>没有账户<span onClick={() => { navigator('/reg') }} className={styles.link}>请注册</span></p>
                    </div>
                </div>
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