import { useNavigate,Link } from 'react-router-dom'
import {push} from '../../router'
export default function Home(props){
    const nav=useNavigate()
    return (
        <>
        <div style={{height:'400px',border:'1px solid #333'}}>个人中心</div>
        <Link to={`/home`} state={{a:1}}>跳到首页</Link>
        {/* <button onClick={() => {nav('/home',{state:{name:'zs'}})}}>跳到首页</button> */}
        </>
    )
}