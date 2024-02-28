import { useContext, useEffect, useState } from 'react'
import './index.css'
import { navContext } from '../../context/nav'
import useAccount from '../../hooks/useAccount'
import { getRecommendUserList } from '../../server'
import RecommendUser from '../RecommendUser'
export default function Right() {
    const [recommendList, setRecommendList] = useState([])
    const [state] = useContext(navContext)
    const [logout] = useAccount()
    const { user = {} } = state;
    const { uid } = user;



    useEffect(() => {
        getRecommendUserList().then(res => {
            setRecommendList(res)
        })
    }, [])

    return (
        <div className="right">
            <div className="mine">
                <div className="re-user">
                    <div className="tx">
                        <img src={user.avatar} alt="" />
                    </div>
                    <div className="nikname">
                        <div style={{ color: '#000', fontWeight: 'bold' }}>{user.nickname}</div>
                        <div>{user.roleName}</div>
                    </div>
                    <div onClick={logout} className="btn">
                        切换
                    </div>
                </div>
            </div>
            <div className="re-title">
                <div>为你推荐</div>
                <div style={{ color: '#000' }}>查看全部</div>
            </div>
            <div className="recommend">
                {
                    recommendList.map(item => (
                        <RecommendUser data={item}></RecommendUser>
                    ))
                }



            </div>
            <div className="about">
                <a href="">关于</a>
                <span style={{ fontSize: '4px' }}>•</span>
                <a href="">帮助</a>
                <span style={{ fontSize: '4px' }}>•</span>
                <a href="">新闻中心</a>
                <span style={{ fontSize: '4px' }}>•</span>
                <a href="">api</a>
                <span style={{ fontSize: '4px' }}>•</span>
                <a href="">工作</a>
                <span style={{ fontSize: '4px' }}>•</span>
                <a href="">隐私</a>
                <span style={{ fontSize: '4px' }}>•</span>
                <a href="">条款</a>
            </div>
            <div className="version">
                © 2024 INSTAGRAM FROM META
            </div>
        </div>
    )
}