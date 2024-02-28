import { useEffect, useState } from "react";
import { reaction } from "../server";

/**
 * 
 * @param {id,type,status} props 
 * id:目标 FsID
 * user 传参 uid 或 username
 * group 传参 gid
 * hashtag 传参 hid
 * post 传参 pid
 * comment 传参 cid
 * type:user,group,hashtag,post,comment
 * @returns state,dispatch
 */

export default function useFollow(props) {
    const { id, type, status } = props;
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(status)
    }, [status])



    const dispatch = () => {
        
            reaction({
                interactionType: 'follow',
                markType: type,
                fsid: id

            }).then(() => {
                setState(!state)
            })
     
    }

    return [state, dispatch];
}