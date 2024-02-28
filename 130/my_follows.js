(function dd(){
    const container=document.querySelector('.my-follow-user');

    const renderMyFollows=(list)=>{
        let domStr='';
        list.forEach(item => {
          domStr=domStr+`
          <div class="user">
          <div class="avator">
              <div class="tx">
                  <img width="44" src="${item.tx}" alt="" srcset="">
              </div>
          </div>
          <div class="nikname">${item.name}</div>
      </div>`
        });
    
        container.innerHTML=domStr;
    }
    
    // 调用接口，拿 到数据，执行渲染方法
    // 1、api跨域时，需要api的headers里追加2个key value
    // Access-Control-Allow-Credentials 
    // Access-Control-Allow-Origin
    // 2、fetch 第一个结果需要序列化
    // 3、innerHTml来给于dom容器子nodes
    // 4、``  和${}来操作string的拼接
    fetch('http://localhost:3001/my/follows').then((res)=>{
        return res.json()
    }).then((res)=>{
        const {success=false,data=[]}=res;
        if(success&&Array.isArray(data)){
            renderMyFollows(data)
        }
    })
})()