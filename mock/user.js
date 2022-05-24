const date = new Date()
let user = {
  name: '传说中的腿腿',
  date: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'),
  renew: '350',
  money: 750,
  member: 400,
  times: 44,
  phone: '13333333333',
  address: '北京市朝阳区',
  mail: '532702231@qq.com',
  sex: '0'
}

module.exports = [
  {
    url: '/user/login',
    method: 'post',
    response: params => {
      return {
        data: { token: '123' },
        status: 200,
        message: 'success'
      }
    }
  },
  {
    url: '/user/detail',
    method: 'get',
    response: params => {
      return {
        data: user,
        status: 200,
        message: 'success'
      }
    }
  },
  {
    url: '/user/edit',
    method: 'post',
    response: params => {
      user = Object.assign(user, JSON.parse(params.body))
      return {
        data: user,
        status: 200,
        message: 'success'
      }
    }
  }
]
