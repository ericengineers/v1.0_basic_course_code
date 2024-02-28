import md5 from "./md5";
export const signature = (headers) => {
    let str = ''
    // 对键从小到大排序
    const arr = Object.keys(headers).sort();
    // 序列化
    arr.forEach((item, index) => {
        if (index > 0) {
            str += '&'
        }
        str += `${item}=${headers[item]}`
    })
    // 追加密钥
    str += `&AppSecret=${'lL7qvrt2Uzd3jATFPMIDd7wcxhqZUEdh'}`
    //md5 32位小写加密
    return md5(str,32)

}

export const getUTCZeroTime = () => {
    let now = new Date();
    
    const utc8Timestamp = Date.now();
    const utcTimestamp = utc8Timestamp - 8 * 60 * 60 * 1000;
    return utcTimestamp;
}