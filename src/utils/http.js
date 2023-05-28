import axios from 'axios';
import qs from 'qs'

const base = import.meta.env.VITE_API;

const http = axios.create({
    baseURL: "/api",
    timeout: 60000
})

// 取消重复请求
const pending = [];
// const CancelToken = axios.CancelToken;
// 移除重复请求
const removePending = (config) => {
    for (const key in pending) {
        const item = +key;
        const list = pending[key];
        // 当前请求在数组中存在时执行函数体
        if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
            list.cancel('操作太频繁，请稍后再试');// 执行取消操作
            pending.splice(item, 1);// 从数组中移除记录
        }
    }
};

function getToken() {
    return /* 'Bearer ' +  */localStorage.getItem('YYDANHONGTOKEN');
}

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        config.method === 'get' && !config?.params?.noToken && (config.headers.get['Authorization'] = getToken());
        config.method === 'post' && !config?.data?.noToken && (config.headers.post['Authorization'] = getToken());
        config.method === 'get' && config?.params?.noToken && delete config.params.noToken;
        config.method === 'post' && config?.data?.noToken && delete config.data.noToken;
        if (config.method === 'post') {
            if (config?.data?.formData === true) {
                delete config.data.formData;
                config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
                config.data = qs.stringify(config.data);
            } else if (config?.data?.isFile === true) {
                config.headers.post['Content-Type'] = 'multipart/form-data;';
                delete config.data.isFile;
            }
        }

        config?.data?.abortFlag && delete config.data.abortFlag && removePending(config);
        config?.params?.abortFlag && delete config.params.abortFlag && removePending(config);

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(response => {
    const data = response.data
    if (data.code == 401) {
        localStorage.clear();
    }
    return data
}, (err) => {
    if (err.toString().indexOf('timeout') > -1) {
        console.log('请求超时：', pending[pending.length - 1].url);
    }
    return Promise.resolve(err)
})


export default {
    get(url, params, headers) {
        return http({
            method: 'get',
            url: `${url}`,
            params: params,
            headers: headers,
        })
    },

    post(url, data) {
        return http({
            method: 'post',
            url: `${url}`,
            data: data,
        })
    },
}