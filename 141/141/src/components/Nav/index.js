import { useContext } from 'react'
import {navContext} from '../../context/nav'
export function Nav(props){
    const [state,dispatch]=useContext(navContext)
    const {navs}=state
    console.log(state);
    return (
        navs.map(item=><div onClick={()=>{dispatch({type:'flag',flag:88888});props.onJump&&props.onJump(item)}}>.---------------{item.url}</div>)
    )
}