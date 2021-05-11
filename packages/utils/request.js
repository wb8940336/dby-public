/*
 * @Description: 
 * @Author: 子非鱼
 * @Date: 2020-12-29 13:03:25
 * @LastEditTime: 2021-04-19 10:49:26
 * @LastEditors: 子非鱼
 */
import axios from "axios";
import { Message } from "element-ui";
import Store from "@/store";
import $api from "@/config/api.js";
import encrypt, { encryptAES, encryptBase64 } from "@/utils/encrypt.js"

const env = process.env.NODE_ENV;
const service = axios.create({
    baseURL: $api.baseUrl,
    //withCredentials: true,
    timeout: 5000
})


//请求拦截处理
service.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

service.interceptors.response.use((res) => {
    //token过期 强制退出登录;
    if (res.data && res.data.code == 401) {
        Message.error(res.data.message);
        Store.dispatch("user/outLogin");
        return;
    }
    return res;
}, (err) => {
    let errMessage = {
        504: '504 服务器出错',
        503: '503 服务器错误',
        404: '404 服务器接口暂无',
        403: '403 权限不足,请联系管理员!',
        401: '401 登录次数过多！请稍后再试',
        100: '100 继续 Continue',
        101: '101 交换协议 Switching Protocols',
        201: '201 创造的 Created',
        202: '202 接受 Accepted',
        203: '203 那些信息 Non-Authoritative Information',
        204: '204 没有内容 No Content',
        205: '205 重置内容 Reset Content',
        206: '206 部分内容 Partial Content',
        300: '300 多项选择 Multiple Choice',
        301: '301 搬到永久 Moved Permanently',
        302: '302 发现 Found',
        303: '303 看到其他 See Other',
        304: '304 不修改 Not Modified',
        305: '305 使用代理 Use Proxy',
        307: '307 临时重定向 Temporary Redirect',
        400: '400 错误请求 Bad Request',
        402: '402 付款要求 Payment Required',
        405: '405 方法不允许 Method Not Allowed',
        406: '406 不能接受的 Not Acceptable',
        407: '407 需要代理身份验证 Proxy Authentication Required',
        408: '408 请求超时 Request Timeout',
        409: '409 冲突 Conflict',
        410: '410 消失 Gone',
        411: '411 长度要求 Length Required',
        412: '412 失败的前提 Precondition Failed',
        413: '413 请求实体太大 Request Entity Too Large',
        414: '414 Request-URI太长 Request-URI Too Long',
        415: '415 不支持的媒体类型 Unsupported Media Type',
        416: '416 请求的范围不能满足 Requested Range Not Satisfiable',
        417: '417 期望失败 Expectation Failed',
        422: '422 Unprocessable实体 Unprocessable Entity',
        500: '500 内部服务器错误 Internal Server Error',
        501: '501 未实现 Not Implemented',
        502: '502 错误网关 Bad Gateway',
        505: '505 不支持HTTP版本 HTTP Version Not Supported'
    }
    let message = "";
    try {
        if (err.response) {
            message = errMessage[err.response.status]
            Message.error(message);
        } else {
            Message.error("网络开小差");
        }
    } catch (error) {

    }
    return Promise.reject(err);
})

let request = ({
    url,
    data = {},
    params = {},
    method = "POST",
    responseType = "JSON",
    headers,
    showMessage = true,
    opLog = ""
}) => {
    return new Promise((resolve, reject) => {
        let requestParams = {
            url,
            method,
            responseType,
            data,
            params,
            headers: {
                token: localStorage.getItem("token") || "",
                'X-Ca-Stage': process.env.VUE_APP_STAGE,//对应环境
                "Content-Type": "application/json;charset=UTF-8"
            }
        }
        if (opLog) {
            requestParams.headers.opLog = encryptBase64(`buttonCode=${opLog}`)
        }
        if (data) requestParams.data = data;
        if (params) requestParams.params = params; //POST请求GET传参处理
        if (headers) {
            requestParams.headers = Object.assign({}, requestParams.headers, headers)
        }
        service(requestParams).then(res => {
            if (res.data && res.data.success) {
                resolve(res.data);
            } else {
                if (showMessage) Message.error(res.data.message || "请求失败");
                reject(res.data);
            }
        }).catch(err => {
            reject(err);
        })
    })
};
request.get = ({
    url,
    data = {},
    params = {},
    responseType = "JSON",
    headers,
    showMessage = true
}) => request({
    url,
    data,
    params,
    method: "GET",
    responseType,
    headers,
    showMessage
})
request.post = ({
    url,
    data = {},
    params = {},
    responseType = "JSON",
    headers,
    showMessage = true
}) => request({
    url,
    data,
    params,
    method: "POST",
    responseType,
    headers,
    showMessage
})
export default request;
