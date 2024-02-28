import { useContext, useEffect, useState } from 'react'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import CreatePost from '../CreatePost'
import { postList } from '../../server'
import SearchPanel from '../SearchPanel'
import Notification from '../Notification'
import Message from '../Message'
import Cookies from 'js-cookie'
const menus = [
    {
        name: '首页',
        path: '/',
        action: null,
        icon: 'website-name'
    },
    {
        name: '搜索',
        path: '/',
        action: 'search',
        icon: 'icofont-search-1'
    },
    {
        name: '探索',
        path: '/explore',
        action: null,
        icon: 'icofont-duotone icofont-compass'
    },
    {
        name: '消息',
        path: '/',
        action: 'message',
        icon: 'icofont-facebook-messenger'
    },
    {
        name: '通知',
        path: '/',
        action: 'news',
        icon: 'icofont-heart'
    },
    {
        name: '创建',
        path: '/',
        action: 'createPost',
        icon: 'icofont-duotone icofont-plus-circle'
    },
    {
        name: '我的',
        path: `/user/home/${Cookies.get('uid')}`,
        action: null,
        icon: 'icofont-duotone icofont-user'
    },

]

export default function Menu(props) {
    const [index, setIndex] = useState(0)
    const [reactModal, setReactModal] = useState(null)
    const loc = useLocation()


    useEffect(() => {
        window.addEventListener('openMsg', e => {
            if (e.detail.user) {
                handleClick({
                    name: '消息',
                    path: '/',
                    action: 'message',
                    icon: 'icofont-facebook-messenger'
                }, 3,e.detail.user)
            }
        })
    }, [])

    // 当路由是reg\login的时候,不要menu
    if (['/reg', '/login'].includes(loc.pathname)) {
        return null
    }

    const handlePostSuccess = () => {
        window.dispatchEvent(new Event('HOME_POST_REFRESH'))
    }

    const handleClick = (item, i, extra) => {

        setIndex(i)
        if (item.action === 'createPost') {
            // js代码
            setReactModal(<CreatePost onSuccess={handlePostSuccess} onClose={() => { setReactModal(null) }}></CreatePost>)
        } else if (item.action === 'search') {
            setReactModal(<SearchPanel onClose={() => { setReactModal(null) }}></SearchPanel>)
        } else if (item.action === 'news') {
            setReactModal(<Notification onClose={() => { setReactModal(null) }}></Notification>)
        } else if (item.action === 'message') {
            setReactModal(<Message targetUser={extra} onClose={() => { setReactModal(null) }}></Message>)
        } else {
            window.location.href = item.path
        }

    }


    return (
        <div className='page-container'>
            <div className="left">

                <h1 className='website-name'>前端技术交流社区</h1>

                <ul className="menu">
                    {
                        menus.map((item, i) => (
                            <li key={item.name} className={index === i ? 'active' : ''} onClick={() => { handleClick(item, i) }}>
                                <i className={item.icon}></i>
                                <span className="name">{item.name}</span>
                            </li>
                        ))
                    }


                </ul>
                <ul className="menu down-bottom">
                    <li>
                        <i className="icofont-duotone icofont-list"></i>
                        <span className="name">threads</span>
                    </li>
                    <li>
                        <i className="icofont-duotone icofont-list"></i>
                        <span className="name">更多</span>
                    </li>
                </ul>
            </div>
            <div>{reactModal}</div>
        </div>
    )
}