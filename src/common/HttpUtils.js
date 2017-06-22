/**
 * React-Native Fatch网络请求工具类
 * Songlcy create
 * params:请求参数
 * ES6 Promise 使用
 * resolve 成功时候返回
 * reject 失败时候返回
 */

import Mock  from 'mockjs'

export default class HttpUtils {
    //基于 fetch 封装的 GET请求
    static getFatch(url, params) {
        return HttpUtils.http("GET", url, params)
    }


    static http(type, url, params) {
        let httpPromise;
        if (type === "GET") {
            if(params){
                let paramsArray = [];
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&')
                } else {
                    url += '&' + paramsArray.join('&')
                }
            }
            httpPromise = fetch(BaseUrl + url);
        } else if (type === "POST") {
            httpPromise = fetch(BaseUrl + url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });
        }
        return new Promise((resolve, reject) => {
            httpPromise.then((response) => {
                if (response.ok)
                    return response.json();
                if (reject && reject !== null)
                    reject({status: response.status})
            })
                .then((response) => {
                    resolve(Mock.mock(response).data);
                })
                .catch((error) => {//密码
                    Toast.error(error.toString());
                    if (reject && reject !== null)
                        reject(error)
                }).done()
        })
    }

//基于 fetch 封装的 POST请求
    static postFatch(url, params = {}) {
        return HttpUtils.http("POST", url, params)
    }

}