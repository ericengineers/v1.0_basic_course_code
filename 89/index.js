const num=123;
const str='你的名字，他的名字，我的名字';
console.log(num+str);
console.log(num.toString());
console.log(str.length);
console.log('indexOf',str.includes('你'));

// 字符串查询
if(str.indexOf('我')>-1){
   

}

// split
console.log('张三\n李四\n王五\n赵六'.split('\n'))

const names=['张三', '李四', '王五','赵六'];
console.log(names.join(',').split(','));

// replace
console.log(str.replace('的','略略略'));
// replaceAll
console.log(str.replaceAll('的','沙沙沙'))
// trim
console.log(' 前后有空格 ');
// slice
console.log('这是一段文本'.slice());
// 
