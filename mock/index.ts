import Mock from 'mockjs'
import user from './user'
import report from './report'

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
})

user.forEach(item => {
  Mock.mock(item.url, item.method, item.response)
})
report.forEach(item => {
  Mock.mock(item.url, item.method, item.response)
})

export default {}
