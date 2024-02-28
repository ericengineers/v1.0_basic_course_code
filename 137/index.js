
// 第一个api,创建dom节点  document.createElement

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            a:1,
            b:2,
            name:'lisi'
        }
    }

    // 组件被挂载在dom
    componentDidMount(){
        this.setState({a:23,b:2})
    }



    // 必须要有render方法，且只能在render方法里返回dom实例
    render() {
        console.log(this.state.a,new Date().getTime());
    //   jsx
        return (
            <div>
            <div onClick={()=>{this.setState({...this.state,name:'zhangsan'})}}>{this.state.a}</div>
               { this.state.name==='lisi'?<LikeButton name={this.state.name}></LikeButton>:null}
                <Mark></Mark>
            </div>
        )
    }
}



// Find all DOM containers, and render Like buttons into them.
const rootDom = document.querySelector('#root');

// 18版本以后的
const root = ReactDOM.createRoot(rootDom);
root.render(
   e(Container)
);
