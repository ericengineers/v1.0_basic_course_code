(function d() {
    const container = document.querySelector('.recommend')
    const renderMyFollows = (list) => {
        let domStr = '';
        list.forEach(item => {
            domStr = domStr + `
          <div class="re-user">
                        <div class="tx">
                            <img width="30" src="${item.tx}" alt="" srcset="">
                        </div>
                        <div class="nikname">
                            <div style="color: #000;font-weight: bold;">${item.name}</div>
                            <div>热门</div>
                        </div>
                        <div data-userId="${item.userId}" data-type="follow" class="btn">
                            关注
                        </div>
                    </div>`
        });

        container.innerHTML = domStr;

        container.addEventListener('click', (e) => {
            const { target } = e;
            const { className } = target;
            if (className !== 'btn') return;
            debugger
            const { userid, type } = target.dataset;
            if (type === 'follow') {
                fetch('/api/follow', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: userid
                    })
                })
            }
        })
    }


    fetch('/api/recommend/list').then((res) => {
        return res.json()
    }).then((res) => {
        const { success = false, data = [] } = res;
        if (success && Array.isArray(data)) {
            renderMyFollows(data)
        }
    })




})()