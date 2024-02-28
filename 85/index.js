const m = new Map()

m.set('name', 'zhangsan')
m.set('sex', 'male')


console.log(m);

console.log(m.get('sex'));

// 本身就是一个遍历函数
m.forEach(function(value,key){
    console.log('foreach:',key,value);
})

console.log('size:',m.size);
m.delete('name')

console.log('删除后：', m);
console.log(m.has('name'));
console.log('size:',m.size);
m.clear()
console.log('清除后：', m);
console.log('size:',m.size);