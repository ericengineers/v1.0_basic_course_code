// 1、onload event
window.onload=function(){
    // fetch service api
    // http request fetch ajax axios
    fetch("https://6kp7fqye8x.api.quickmocker.com/api/008/info").then(res=>{
        return res.json()
    }).then(result=>{
        console.log('print:',result);
        const {success,data={}}=result;
        if(success){
            const {following,followers,likes}=data;
            // show html
            document.getElementById('following').textContent=following
            document.getElementById('followers').textContent=followers
            document.getElementById('likes').textContent=likes
        }
    })
}