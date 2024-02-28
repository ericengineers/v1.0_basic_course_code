import { useEffect, useState } from "react";
export default function Router(props){
    const {config={}}=props;
    const [page,setPage]=useState(config[props.default]);
    useEffect(()=>{
        const urlHash=window.location.hash.split('#')[1]
        if(config[urlHash]){
            setPage(config[urlHash])
        }
        window.addEventListener('hashchange',e=>{
            const {newURL}=e;
            const currentHash=newURL.split('#')[1]
            setPage(config[currentHash])
        })
    })
    return page
}
export const push=(path)=>{
    window.location.hash=path;
}