
// const p=document.createElement('p')
// p.innerText='我是p的文本'
// console.log(p);
// document.querySelector('.left').appendChild(p)
// document.querySelector('.left').innerHTML='<p>我是p的文本</p>'

// insertBefore

// const beforeEle=document.createElement('div')
// beforeEle.className='before'
// const left=document.querySelector('.left')
// left.parentNode.insertBefore(beforeEle,left)

const afterEle=document.createElement('div')
afterEle.className='after'
const left=document.querySelector('.left')
left.parentNode.insertBefore(afterEle,left.nextSibling)

