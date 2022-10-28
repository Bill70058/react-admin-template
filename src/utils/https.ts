import axios from 'axios'
import { message } from 'antd';
// import cookie from '../utils/cookie'
axios.defaults.baseURL = ''
axios.interceptors.request.use(
  function (config:any) {
    console.log(config.url)
    // 请求拦截器
    // config.headers['authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImlhdCI6MTY2MDU1MDQwMSwiZXhwIjoxNjYwNTU0MDAxfQ.A-6Xllqi2Ft4IjT7cCXriSTkklQy7SYVR57TQpRugIY'
    // config.headers['Content-Type'] = 'application/json'
    if (sessionStorage.getItem('login')) {
      config.headers['authorization'] = sessionStorage.getItem('login')
    }
    return config
  },
  function (err) {
    showErrToast(err)
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  function (res) {
    if (res.data.code !== 200) {
      showErrToast(res.data.msg)
    }
    return res.data
  },
  function (err) {
    showErrToast(err)
    Promise.reject(err)
  }
)

function showErrToast(e:any) {
  if (e) {
    message.error(e)
  }
}

function getPromise(url:string, data?:object, method?:string, header?:any) {
  let params:any = null
  if (method == 'get') {
    params = {
      params: data
    }
  }
  let headers = {
    'Content-Type': 'application/json'
  }
  if (header == 'formdata') {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return new Promise((resolve:any, reject:any) => {
    axios
      .request({
        url: url,
        data: data,
        headers,
        ...params,
        method: method
      })
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  }).catch((e:any) => {
    showErrToast(e)
  })
}

const http = {
  get: (url:string, data?:object) => {
    return getPromise(url, data, 'get')
  },
  post: (url:string, data?:object, header?:object) => {
    return getPromise(url, data, 'post', header)
  },
  put: (url:string, data?:object) => {
    return getPromise(url, data, 'put')
  },
  delete: (url:string, data?:object) => {
    return getPromise(url, data, 'delete')
  }
}

export default http