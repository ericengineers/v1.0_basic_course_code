import axios from "axios"
import { deviceInfo } from "./static";
import { encode } from "js-base64";
import { getUTCZeroTime, signature } from "./util";
import Cookies from "js-cookie";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const timezoneOffsetInHours = new Date().getTimezoneOffset() / -60;
    const utcTimezone = (timezoneOffsetInHours > 0 ? '+' : '') + timezoneOffsetInHours.toString();
    // 必要头信息
    let headers = {
        'X-Fresns-App-Id': 'MMVKEYNO',
        'X-Fresns-Client-Platform-Id': 4,
        'X-Fresns-Client-Version': '1.0',
        'X-Fresns-Signature-Timestamp': getUTCZeroTime(),
    }

    const aid = Cookies.get('aid');
    const aidToken = Cookies.get('aidToken');
    const uid = Cookies.get('uid');
    const uidToken = Cookies.get('uidToken')

    if (aid) {
        headers['X-Fresns-Aid'] = aid;
        headers['X-Fresns-Aid-Token'] = aidToken
    }

    if (uid) {
        headers['X-Fresns-Uid'] = uid;
        headers['X-Fresns-Uid-Token'] = uidToken;
    }

    const signStr = signature(headers);

    headers['X-Fresns-Signature'] = signStr;
    headers = { ...headers, ...{ 'X-Fresns-Client-Timezone': utcTimezone, 'X-Fresns-Client-Device-Info': encode('{"networkIpv4": "127.0.0.1"}'), } }
    console.log(config);
    config.headers = { ...config.headers, ...headers };
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});



export const register = (params) => {
    axios.post('/api/v2/account/register', params).then(res => {

    })
}

export const sendCode = (params) => {
    return axios.post('/api/v2/common/send-verify-code', params)
}
export const userDetail = (params) => {
    return axios.get('/api/v2/account/detail')
}

export const login = (params) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v2/account/login', params).then(res => {
            const { code, data = {}, message } = res.data;

            if (code === 0) {
                const { detail = {}, sessionToken } = data
                const { aid, token } = sessionToken;
                const { users = [] } = detail;
                const [user] = users
                Cookies.set('aid', aid)
                Cookies.set('aidToken', token)
                axios.post('/api/v2/user/auth', {
                    uidOrUsername: user.uid
                }).then(res => {
                    const { code, data, message } = res.data;
                    if (code === 0) {
                        const { detail, sessionToken } = data;
                        const { uid, token } = sessionToken;
                        Cookies.set('uid', uid)
                        Cookies.set('uidToken', token)

                        resolve(detail)

                    } else {
                        reject(message)
                    }
                })

            } else {

                reject(message)
            }
        }).catch(e => {
            reject('网络错误')
        })
    })
}

export const getEmoji = () => {
    return Promise.resolve(["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😶‍🌫️", "😶‍🌫", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "🙂‍↔️", "🙂‍↔", "🙂‍↕️", "🙂‍↕", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "☹", "😮", "😯", "😲", "😳", "🥺", "🥹", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬"])
}

export const publishPost = (params) => {
    return axios.post('/api/v2/editor/post/quick-publish', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const publishComment = (params) => {
    return axios.post(`/api/v2/editor/${params.type}/quick-publish`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export const getPostList = (uid) => {
    return axios.get('/api/v2/post/list', {
        params: {
            uidOrUsername: uid,
        }
    })
}

export const upload = (id, file) => {
    return new Promise((r, e) => {
        axios.post('/api/v2/common/upload-file', {

            usageType: 7,
            tableName: 'post_logs',
            tableColumn: 'id',
            tableId: id,
            uploadMode: 'file',
            type: 'image',
            file: file,

        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { fid, imageBigUrl } = data;
                r({ fid, url: imageBigUrl })
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })
}

export const uploadAvatar = (uid,file) => {
    return new Promise((r, e) => {
        axios.post('/api/v2/common/upload-file', {

            usageType: 5,
            tableName: 'user',
            tableColumn: 'id',
            tableId: uid,
            uploadMode: 'file',
            type: 'image',
            file: file,

        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { fid, imageBigUrl } = data;
                r({ fid, url: imageBigUrl })
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })
}


export const createDraft = () => {
    return new Promise((r, e) => {
        axios.get('/api/v2/editor/post/drafts').then(result => {
            const { code, data } = result.data;
            const { list = [] } = data;
            if (list.length > 0) {
                r(list[0])
            } else {
                axios.post("/api/v2/editor/post/create", {
                    createType: 1
                }).then(res => {
                    const { code, data = {}, message } = res.data;
                    if (code === 0) {
                        const { detail } = data;
                        const { id } = detail;
                        r({ id })
                    } else {
                        e(message)
                    }
                })
            }


        })
    })
}


export const updateDraft = (params) => {
    return new Promise((r, e) => {
        axios.put(`/api/v2/editor/post/${params.id}`, params, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data?.code === 0) {
                axios.post(`/api/v2/editor/post/${params.id}`).then(result => {
                    if (result.data?.code === 0) {
                        r()
                    } else {
                        e(result.data?.message)
                    }
                })
            } else {
                e(res.data.message)
            }
        })
    })
}

export const deleteDraft = (id) => {
    return new Promise((r, e) => {

        axios.delete(`/api/v2/editor/post/${id}`).then(res => {
            const { code } = res.data;
            if (code === 0) {
                r()
            } else {
                e()
            }
        })
    })
}

export const reaction = (params) => {
    return new Promise((r, e) => {
        axios.post('/api/v2/user/mark', params).then(res => {
            const { code } = res.data
            if (code === 0) {
                r()
            }
        })
    })
}

export const getDirectUser = (uid) => {
    return new Promise((r, e) => {
        axios.get(`/api/v2/user/${uid}/detail`).then(res => {
            const { code, data } = res.data || {};
            if (code === 0) {
                const { detail } = data;
                r(detail)
            }
        })
    })
}


export const getCommentList = (id) => {
    return axios.get('/api/v2/comment/list', {
        params: {
            pid: id,
        }
    })
}


export const getCommentSubList = (id) => {
    return axios.get('/api/v2/comment/list', {
        params: {
            cid: id,
        }
    })
}



export const getMarkedUserList = () => {
    return new Promise((r, e) => {
        axios.get(`/api/v2/user/${Cookies.get('uid')}/mark/follow/users`).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { list } = data;
                r(list)
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })
}

export const getRecommendUserList = (id) => {
    return new Promise((r, e) => {
        axios.get('/api/v2/user/list', {
            params: {
                postCountGt: 2,
                postCountLt: 100
            }
        }).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { list } = data;

                r(list.filter(i => i.interaction.followStatus === false))
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })

}

export const getUserDetail = (uid) => {
    return new Promise((r, e) => {
        axios.get(`/api/v2/user/${uid}/detail`).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { detail } = data;
                r(detail)
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })
}

export const getMarkedPostList = (uid) => {
    return new Promise((r, e) => {
        axios.get(`/api/v2/user/${uid}/mark/follow/posts`).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { list } = data;

                r(list)
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })

}

export const searchPost = (key) => {
    return new Promise((r, e) => {
        axios.get(`/api/v2/search/posts`, {
            params: {
                searchKey: key
            }
        }).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { list } = data;

                r(list)
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })

}
export const notification = () => {
    return new Promise((r, e) => {
        axios.get(`/api/v2/notification/list`).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { list } = data;

                r(list)
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })

}

export const getMessageList = () => {
    return new Promise((r, e) => {
        axios.get(`/api/v2/conversation/list`).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { list } = data;

                r(list)
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })

}


export const getMessageRecord = (id) => {
    return new Promise((r, e) => {
        axios.get(`/api/v2/conversation/${id}/messages`,{
            params:{
                orderDirection:'asc'
            }
        }).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                const { list } = data;

                r(list)
            } else {
                e(message)
            }
        }).catch(error => {
            e(error)
        })
    })

}


export const pushMessage = (params) => {
    return new Promise((r, e) => {
        axios.post('/api/v2/conversation/send-message', params).then(res => {
            const { code, data, message } = res.data;
            if (code === 0) {
                r()
            } else {
                e(message)
            }
        })
    })
}


export const updateUser = (params) => {
    return new Promise((r, e) => {
        axios.put(`/api/v2/user/edit`, params, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data?.code === 0) {
                r()
            } else {
                e(res.data.message)
            }
        })
    })
}
