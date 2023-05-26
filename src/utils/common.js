import axios from "axios";
// import qs from 'qs';
// import {  loadEnv } from 'vite'
// const env = loadEnv(mode, process.cwd());

export const getUrlParmas = (name) => {
    let query = location.search;
    let searchParams = new URLSearchParams(query);
    return searchParams.get(name);
}

// 节流
export const throttle = (fn, wait) => {
    let flag = false;
    return function() {
        if (flag) return;
        flag = true;
        fn.call(this, arguments);
        let timer = setTimeout(() => {
            flag = false;
            clearTimeout(timer)
        }, wait)
    }
}
// 防抖
export const debounce = (fn, wait) => {
    let timer = null;
    return function() {
        let ctx = this;
        let args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(ctx, args)
        }, wait)
    }
}

/**
 *  元素垂直滚动到指定位置
 *  selector [需要滚动的元素]
 *  pos      [滚动结束位置]
 *  duration [滚动持续时间]
 */
export const scrollTo = (selector, pos = 0, duration = 150) => {
    let dom = '', //需要滚动的元素
        scrollTop = 0,
        disAverage = 0, //1m需要滚动的距离
        scrollDirection = 1, //1向下 0向上
        innerHeight = window.innerHeight, //浏览器可用高度
        clientHeight = document.body.clientHeight || document.documentElement.clientHeight, //页面高度
        htmlMaxScrollH = clientHeight - innerHeight - 1, //html元素最高可以滚动的距离
        maxFlag = selector == 'html' || selector == 'body' //用于判断滚动对象是否为html body

    if (!selector) return;

    dom = document.querySelector(selector);
    scrollTop = dom.scrollTop;

    if (!dom) return;

    pos = Math.ceil(pos);

    disAverage = Math.ceil((scrollTop - pos) / (duration / 16.7)); //60hz刷新率的屏幕刷新间隔16.7ms

    if (disAverage == 0) {
        return
    }

    if (scrollTop >= pos) {
        scrollDirection = 0;
    }

    window.scrollToAnimationFrame && cancelAnimationFrame(window.scrollToAnimationFrame)

    window.scrollToAnimationFrame = requestAnimationFrame(function handle() {
        scrollTop = dom.scrollTop;
        // console.log(scrollDirection, scrollTop,  pos)

        //scrollDirection && (scrollTop >= pos || maxFlag && scrollTop >= htmlMaxScrollH) 向下滚(滚动条离元素顶部距离大于等于传入的位置或者滚动元素为根元素且滚动条离元素顶部距离大于等于最大滚动距离）
        //!scrollDirection && scrollTop <= pos  向上滚(滚动条离元素顶部距离小于等于传入的位置)
        if (scrollDirection && (scrollTop >= pos || maxFlag && scrollTop >= htmlMaxScrollH) || !scrollDirection && scrollTop <= pos) {
            cancelAnimationFrame(window.scrollToAnimationFrame)
        } else {
            dom.scrollTo(0, scrollTop - disAverage);
            requestAnimationFrame(handle)
        }
    })
}


//判断点击事件是否在指定节点内
export const isClickInQrDom = (dom = null, callback) => {
    if (!dom) return console.error(new Error('未传入节点'));
    document.addEventListener('click', function(e) {
        if (!dom.contains(e.target)) {
            callback && callback(true)
        } else {
            callback && callback(false)
        }
    })
}


// 判断是否是同一天
export const isSameDay = (t) => {
    return new Date(Number(t)).toDateString() === new Date().toDateString()
}

// 把字符串转换为字符集 --start
// 字符串转16进制，以 , 间隔
const str2hex = str => {
    const res = []
    for (let i = 0; i < str.length; i++) {
        res.push(str.charCodeAt(i).toString(16))
    }
    return res.join()
}
// 16进制转字符串，以 , 间隔
const hex2str = hex => {
    const arr = hex.split(',')
    let res = ''
    for (let i = 0; i < arr.length; i++) {
        res += String.fromCharCode(parseInt(arr[i], 16))
    }
    return res
}
export const strUnicode = str => {
    return hex2str(str2hex(str))
}
// 把字符串转换为字符集 --end

// 生成uuid
export const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// 引入图片
export const getAssetsImages = (name) => {
    return new URL(`/src/assets/${name}`,
        import.meta.url).href;
}
// 图片加载失败
export function imgError(e, file = getAssetsImages("dhicon.png")) {
    let img = e.srcElement;
    img.src = file;
    img.onerror = null
}

// 去除对象里空元素
export function ObjKeys(obj) {
    Object.keys(obj).map((item) => {
        if (obj[item] === '' || obj[item] === null || obj[item] === undefined) {
            delete obj[item]
        }
    });
    return obj
}
// 导出excl
export function exportExcl(url, params, successCallback, errorCallback) {
    axios({
        method: "get",
        url: import.meta.env.VITE_API + url,
        params,
        responseType: "blob",
        header: {
            headers: {
                'Content-Type': 'application/x-download'
            }
        },
    }).then((res) => {
        successCallback && successCallback(res)
    }).catch(() => {
        errorCallback && errorCallback()
    });
}