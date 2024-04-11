import { Component } from "react";

// 定义一个函数
export default function(Com){

    // 返回一个组件
    return class DataParse extends Component{

        parseData={}

        constructor(props){
            super(props)
            this.handleParse()
        }

        handleParse(){
            const arr=[]
            const {data}=this.props;
            for(let key in data){
                arr.push(data[key])
            }
            this.parseData=arr;
        }


        render(){
            // 赋予额外的属性
            return <Com {...this.props} {...{parseData:this.parseData}} />
        }
    }
}






// 定义一个函数
export default function(Com){

    // 返回一个组件
    return class DataParse extends Com{

        parseData={}

        constructor(props){
            this.handleParse()
            super({...props,parseData:this.parseData})
           
        }

        handleParse(){
            const arr=[]
            const {data}=this.props;
            for(let key in data){
                arr.push(data[key])
            }
            this.parseData=arr;
        }

        render(){
            return super.render()
          }
    }
}