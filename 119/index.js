



const ajax=new XMLHttpRequest();
ajax.open('get','http://127.0.0.1/api/sns',true);
ajax.send(null)
ajax.onreadystatechange=function(){
    if(ajax.readyState===4){
        if(ajax.status===200){
            console.log(ajax.responseText);
            
        }
    }
}