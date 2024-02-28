const renderDate = (time) => {

    const now = new Date().getTime()
    const gapTime = now - time;
    // 小于1分钟渲染秒
    if (gapTime < 60000) {
        return gapTime + '秒'
    }
    // 小于1小时渲染分
    if (gapTime < 3600000) {
        return Math.ceil(gapTime / (1000 * 60)) + '分'
    }
    // 小于1天渲染小时
    if (gapTime < 3600000 * 24) {
        return Math.ceil(gapTime / 3600000) + '小时'
    }
    // 小于1周渲染天
    if (gapTime < 3600000 * 24 * 7) {
        return Math.ceil(gapTime / (3600000 * 24)) + '天'
    }
    // 小于1月渲染周
    if (gapTime < 3600000 * 24 * 30) {
        return Math.ceil(gapTime / (3600000 * 24 * 7)) + '周'
    }
}

let status = false;
const modal = document.querySelector('.modal')
let commentContainer;
// document.addEventListener('wheel', (e) => {
//     if (status) {
//         e.preventDefault();
//     }


// }, { passive: false })




const renderComments = (postid) => {
    fetch('/api/comment/list', {
        params: `postId=${postid}`
    }).then(res => {
        return res.json()
    }).then(res => {
        if (True(res.success)) {
            let str = '';
            res.data.forEach(item => {
                str = str + `
                
                <div class="item">
                            <div class="tx">
                                <img width="30" src="${item.tx}" alt="" srcset="">
                            </div>
                            <div class="nikname">
                                <div style="color: #3c3939;font-weight: bold;">
                                    <span >${item.name}</span>
                                    <span class="comment-text">${item.text}</span>
                                </div>
                                <div style="font-size: 8px;margin-top: 6px;"><span>${renderDate(item.createDate)}</span><span style="margin-left:6px;">${item.likes > 0 ? item.likes + '次赞' : ''}</span>
                                       <span style="color: #000;margin-left: 10px;">回复</span></div>
                                       <div class="checkMore" style="margin:10px 0;cursor: pointer;">${item.comment_count>0?'----查看回复':''}</div>
                            </div>
                            <div class="btn">
                                <i class="icofont-heart ${item.has_like?' active':''}"></i>
                            </div>
                        </div>
                `
            })
            commentContainer.innerHTML=str;
        }
    })
}


const closeModal = () => {
    status = false
    modal.style.display = "none";
    document.body.style.overflow='unset'
}
const openModal = (postid) => {
    status = true;
    modal.style.display = 'block'
    document.body.style.overflow='hidden'
    // 此时，modal被打开，dom被渲染，是拿容器的最佳时机
    commentContainer = document.querySelector('.comment-list')
    renderComments(postid)
}

//  通过自定义事件，解决异步之间依赖的时序问题
window.addEventListener('listRenderDid', () => {
    document.querySelectorAll('.comment-num').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!status) {
                const { target = {} } = e;
                const { postid } = target.dataset;
                openModal(postid)
            }
        })
    })
})

document.querySelector('.modal .mask').addEventListener('click', () => {
    closeModal()
})
document.querySelector('.modal .close').addEventListener('click', () => {
    closeModal()
})