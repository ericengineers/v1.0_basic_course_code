// 数据驱动视图呢
const useState=React.useState;
const useEffect=React.useEffect;
let a=1;
function Mark(props){
    const [status,setStatus]=useState(false);
    // 
    useEffect(()=>{
        fetch('/api/my/follows').then(res => res.json()).then(res => {
            console.log(res);
            debugger
            this.setState({ ...this.state, data: res.data })
        })
        return ()=>{
            // 时机:组件要被卸载了
        }
    },[props])


    const handleClick=()=>{
       setStatus(!status)
    }
    return (
        <button onClick={handleClick}>mark:{status?'有':"没"}</button>
    )
}   