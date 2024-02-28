import { memo, useEffect, useMemo, useRef, useState } from "react"
import { Nav } from "../Nav";
import './index.css'

 const Footer =memo( (props) => {
    // 存储需要数据驱动视频的数据
    const [nav, setNav] = useState([])
    const [sum, setSum] = useState(0);
    let value = useRef(123)

    const count = useMemo(() => {
        console.log('我被重新执行了');
        let num = Math.random() * 100;
        for (let i = 0; i < 100; i++) {
            num += i;
        }
        return num
    }, [nav])
    useEffect(() => {
        // console.log(value);
        // value.current=456;
        setNav([
            {
                label: '关于我们',
                url: 'http://'
            },
            {
                label: '联系客服',
                url: 'http://'
            }
        ])

    }, [])
    const handleFresh = () => {
        setSum(Math.random())
    }
    const handleJump=(item)=>{
        alert(JSON.stringify(item))
    }
    return (
        <div>
            <div onClick={handleFresh} className="container">
                
                <div className="gx">更新</div>
            </div>
           
            <Nav navs={props.navs} onJump={handleJump}></Nav>
            
        </div>
    )
})
   

    export default Footer