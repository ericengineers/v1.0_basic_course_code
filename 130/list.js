(function dd() {
    const container = document.querySelector('.list');
   
    const refresh = () => {
        fetch('http://localhost:3001/main/list').then((res) => {
            return res.json()
        }).then((res) => {
            const { success = false, data = [] } = res;
            if (success && Array.isArray(data)) {
                renderList(data)
            }
        })
    }

    const renderNum = (num) => {
        num = Number(num)
        if (num > 9999 && num < 100000) {
            return `1万${num - 10000}`
        } else if (num > 99999) {
            return `10万${num - 100000}`
        } else {
            return num
        }
    }

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

    const renderList = (list) => {
        let domStr = '';
        let postContainer;
        list.forEach(item => {
            postContainer = document.createElement('div')
            postContainer.className = 'post'
            postContainer.addEventListener('click', (e) => {
                console.log(e);
                const { target = {} } = e;
                const { type } = target.dataset || {}
                if (type) {
                    switch (type) {
                        case 'like':
                            fetch('/api/reaction/like', {
                                method: 'POST',
                                body: JSON.stringify({
                                    postId: item.postId
                                })
                            }).then(res => {
                               return res.json()
                            }).then(res => {
                                if (True(res.success)) {
                                    refresh()
                                }
                            })
                            break;
                        case 'mark':
                            fetch('/api/reaction/mark', {
                                method: 'POST',
                                body: JSON.stringify({
                                    postId: item.postId
                                })
                            })
                            break;


                        case 'comment':
                            const text = document.querySelector('.post .comment_input').value;
                            fetch('/api/reaction/comment', {
                                method: 'POST',
                                body: JSON.stringify({
                                    postId: item.postId,
                                    commentText: text
                                })
                            })
                            break;
                        default:
                            ;
                    }
                }
            })
            domStr = domStr + `
      <div class="user-info">

          <div class="tx">
              <img width="20" src="${item.tx}" alt="" srcset="">
          </div>

          <div class="nikname">${item.name}</div>
          <div style="font-size: 8px;margin: 0 2px;">•</div>
          <div class="create-date">
              ${renderDate(item.createDate)}
          </div>
          <div style="font-size: 8px;margin: 0 2px;">•</div>
          <div class="follow">
             ${item.has_follow ? '已关注' : '关注'}
          </div>
          <div class="operation">
              <svg aria-label="更多选项" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16"
                  role="img" viewBox="0 0 24 24" width="24">
                  <title>更多选项</title>
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
              </svg>
          </div>
      </div>
      <div class="picture-container">
          <swiper-container class="mySwiper"  pagination="true" navigation="true">
              `;



            item.imgs.forEach(img => {
                domStr = domStr + `
            <swiper-slide>
            <img src="${img}" alt="">
          </swiper-slide>
     `
            })


            domStr = domStr + `
          </swiper-container>
      </div>
      <div class="reaction">
          <div>
              <i data-type="like" class="icofont-heart ${item.has_liked ? 'active' : ''}"></i>
          </div>
          <div>
              <i data-type="comment" class="icofont-ui-messaging ${item.has_comment ? 'active' : ''}"></i> 
          </div>
          <div>
              <i data-type="share" class="icofont-share-alt ${item.has_share ? 'active' : ''}"></i>
          </div>
          <div class="mark">
              <i data-type="mark" class="icofont-book-mark ${item.has_mark ? 'active' : ''}"></i>
          </div>
      </div>
      <div class="reaction-data">
          <div style="font-weight: bold;color: black  ;"">
              ${renderNum(item.likes)}次赞
          </div>
          <div class="comment-num">
              全部${item.comments}评论
          </div>
          <div class="comment">
              <input class="comment_input" type="text" placeholder="添加评论">
              <div data-type="comment" data-postid="${item.postId}" class="ok-btn">发布</div>
          </div>
      </div>
     `
        });
        postContainer.innerHTML = domStr
        container.appendChild(postContainer)
        window.dispatchEvent(new Event('listRenderDid'))
    }



    refresh()
})()