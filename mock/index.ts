import Mock from 'mockjs'

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
})

Mock.mock('/user/login', 'post', (params: any) => {
  return {
    data: { token: '123' },
    status: 200,
    message: 'success'
  }
})

export default {}
