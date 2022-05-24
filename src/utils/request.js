import axios from 'axios'
import { Message } from 'element-ui'

const baseURL = process.env.NODE_ENV === 'production' ? '' : ''

const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    config.headers.token = localStorage.getItem('token')
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.status !== 200) {
      Message({
        message: res.Message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // do something
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default instance
