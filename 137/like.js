// class组件
// 数据驱动视图
class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false, data: [] };
    }

    componentDidMount() {
        fetch('/api/main/list').then(res => res.json()).then(res => {
            console.log(res);
            debugger
            this.setState({ ...this.state, data: res.data })
        })
    }

    // shouldComponentUpdate(nextProps,nexState){
    //     console.log(this.props,nextProps);
    //     if(this.props.name===nextProps.name&&this.state.liked===nexState.liked){
    //         return false
    //     }else{
    //         return true
    //     }
    // }

    // 勾子函数
    componentDidUpdate() {
        console.log(123131);
    }
    componentWillUnmount() {
        console.log('我被卸载了');
    }
    // 必须要有render方法，且只能在render方法里返回dom实例
    render() {


        return (
            this.state.data.map(item => {
                return (
                    <button key={item.postId} onClick={() => this.setState({ liked: true })}>like:{this.props.name}</button>
                )
            })
        )
    }
}

