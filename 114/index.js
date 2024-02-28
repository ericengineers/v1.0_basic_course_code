window.addEventListener('keyup',function(e){
    console.log(e);
    console.log('是否是组合键',e.shiftKey);
    if(e.keyCode===13){
        console.log('你按下了我的眼睛');
    }
})