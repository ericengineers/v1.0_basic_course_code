import { useContext, useEffect, useState } from "react"
import Menu from "../../components/Menu"
import PostList from "../../components/PostList"
import Right from "../../components/Right"
import { push } from "../../router"
import './index.css'
import { useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom"
import { navContext } from "../../context/nav"
import { getMarkedUserList, getPostList } from "../../server"
import Avatar from "../../components/Avatar"
export default function Home() {
    const { visitId } = useParams()
    const [params] = useSearchParams()
    const [postList, setPostList] = useState([])
    const [markedList, setMarkedList] = useState([])
    const [state, dispatch] = useContext(navContext)
    const navigator =useNavigate()

    const getList = () => {
        getPostList().then(res => {
            const { code, data } = res.data;
            if (code === 0) {
                const { list } = data;
                setPostList(list)
            }
        })
    }
    const getMarkedUsers = () => {
        getMarkedUserList().then(res => {
            setMarkedList(res)
        })
    }
    useEffect(() => {
        getList()
        getMarkedUsers()
        window.addEventListener('HOME_POST_REFRESH', () => {
            getList()
        })
    }, [])

    const handleToUserHome =(u)=>{
        navigator('/user/home/'+u.uid)
    }
    

    return (
        <div className="main">
            <div className="content">
                <div className="my-follow-user">
                    {
                        markedList.map(m => (<div className="user">
                            <div onClick={()=>{handleToUserHome(m)}} className="avator">
                                <div className="tx">
                                    <img src={m.avatar} alt="" srcset="" />
                                </div>
                            </div>
                            <div className="nikname">{m.nickname}</div>
                        </div>))
                    }
                </div>
                <PostList data={postList}></PostList>

            </div>
            <Right></Right>
        </div>
    )
}