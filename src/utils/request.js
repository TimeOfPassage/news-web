import axios from 'axios';

const http = axios.create({
    // ↓从环境变量读取VITE_BASE_URL
    baseURL: import.meta.env.VITE_BASE_URL,
    // ↓超时时间（10s）
    timeout: 10 * 1000,
    // ↓超时提示信息
    timeoutErrorMessage: '请求超时，请稍后再试。'
});

// ↓请求拦截器。在请求发送前，对请求配置做一些处理
http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") || undefined;
    token && (config.headers.Authorization = token);
    return config;
}, (error) => {
    return Promise.reject(error);
})

// ↓响应拦截器。在then、catch之前对响应数据做一些处理
http.interceptors.response.use((response) => {
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    if (error.response.status) {
        switch (error.response.status) {
            case 401:
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
                break;
        }
    }
    return Promise.reject(error.response);
})

export function get(url, params) {
    return new Promise((resolve, reject) => {
        http.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        http.post(url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export function uploadFile(url, file) {
    // 实例化
    let formdata = new FormData()
    formdata.append('file', file)
    return new Promise((resolve, reject) => {
        http.post(url, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data;charset=UTF-8'
            }
        }).then(res => { resolve(res.data); }).catch(err => { reject(err.data) })
    });
}

export function put(url, data) {
    return new Promise((resolve, reject) => {
        http.put(url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export function del(url, data) {
    return new Promise((resolve, reject) => {
        http.delete(url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}