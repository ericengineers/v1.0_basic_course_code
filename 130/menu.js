window.onload = function () {
    let index = 0;
    const menus = document.querySelectorAll('.menu .name') || []

    // 状态改变函数
    const activeMenu = function () {
        const curentMenu = menus[index]
        if (curentMenu) {
            console.log(curentMenu.className);
            // 移除之前的active
            menus.forEach(item=>{
                item.className='name'
            })
            curentMenu.className = curentMenu.className + ' active'

        }

    }
  


    // 初始化menu，默认index为0，即选中第一个
    activeMenu()

    // 当menu点击时，改变状态
    
    document.querySelectorAll('.menu li').forEach((item,i)=>{
        item.addEventListener('click',()=>{
            index=i;
            activeMenu()
        })
    })

  

  



}