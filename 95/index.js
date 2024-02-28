const reg=/去人/ig;
const r=new RegExp('去人')

// console.log(reg.test('我的你去人的他的去人'));

// String
const i='我的你去人的他的去人'.matchAll(reg)
console.log(i.next());
console.log(i.next());
console.log(i.next());
