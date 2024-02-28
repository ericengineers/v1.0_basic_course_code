const a={
    name:'zhangsan',
    sex:'male',
    age:14
}

const b={}

b.name='lisi'
const arr=['height','weight']
b[arr[0]]='瞎写'
b[arr[1]]='120'
// delete a.age

console.log(a);
console.log(b);


// 合并
// const o=Object.assign(a,b)
const o={...a,...b}
console.log('合并之后的对象：',o);

o.name='1234243243'
// 冻结
// Object.freeze(o)
console.log('object.keys',Object.keys(o));
// for (const key of Object.keys(o)) {
//     console.log(key,o[key]);
// }
// for (const value of Object.values(o)) {
//     console.log(value);
// }

// for (const [key,value] of Object.entries(o)) {
//     console.log('遍历');
//     console.log(key,value);
// }







