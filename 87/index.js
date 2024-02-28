
function up(str){
    setTimeout(() => {
        if(str.indexOf('我的')>-1){
            str+='新拼接的尾巴！'
        }else{
            str+='没有尾巴?'
        }
    
        
    }, 10000);
}

const name='我的你好'
// console.log(newStr);
const jump=true;

function addkey(o){
    let flag=true;
    let {name,age}=o
    console.log(typeof o);
    if(typeof o === 'object'&&o!==null){
        o.level='sss'
    }else{
        console.log('不符合入参数据类型');
    }

    if(name.indexOf('我的')>-1){
        name+='新拼接的尾巴！'
    }else{
        name+='没有尾巴?'
    }

    o.name=name
    console.log('jump',jump);
}

const you={
    name:'zs',
    age:18
}

// console.log(flag);

// addkey(you)
console.log(addkey(you));
console.log(you);




const pUp=(str)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(str.indexOf('我的')>-1){
                str+='新拼接的尾巴！'
            }else{
                str+='没有尾巴?'
            }
            
            resolve(str)
            
        }, 10000);
      
    
    })
}


pUp('异步参数').then((res)=>{
    console.log('异步执行完的结果：',res)
})
addkey({
    a:1,
    b:2,
    name:'zhangsan',
    sex:'male'
})//快速执行