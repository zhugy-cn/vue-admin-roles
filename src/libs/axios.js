import axios from 'axios'
import store from '@/store'
import router from '../router'
import { baseURL } from '@/config'
import { Message, MessageBox } from 'element-ui'


// 创建axios实例
const ajax = axios.create({
  baseURL,
  timeout: 5000,
})

// 请求 拦截器
ajax.interceptors.request.use(config => {
  if (store.token) {
    config.headers['x-access-token'] = store.getters.token
  }
  return config;
}, error => {
  console.log('请求拦截器', error)
});

// 响应 拦截器
ajax.interceptors.response.use(response => {
  const { data } = response
  if (data.code === 0) {
    return response.data.data
  } else {
    let errorMsg = data.message
    if (data.code === 30002 || data.code === 40000) {
      MessageBox.alert(errorMsg, '警告', {
        confirmButtonText: '确定',
        callback: () => {
          router.push("/login")
        }
      });
    } else {
      Message.error(errorMsg)
    }
    return Promise.reject(errorMsg)
  }
}, error => {
  let errorMsg = error.message
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    console.log(error.response.data);
  } else {
    // 服务器没有响应
    console.log('Error', errorMsg);
  }
  Message.error(errorMsg)
  return Promise.reject(errorMsg)
});
export default ajax;
