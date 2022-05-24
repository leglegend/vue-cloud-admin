const Mock = require('mockjs')
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

const list = Mock.mock({
  // 定义数据生成规则
  'dataList|150': [
    {
      'index|+1': 1,
      email: '@email',
      phone: /^1[34578]\d{9}$/,
      name: '@cname', // 随机生成1个中文名字
      date: '@date' // 默认日期格式 yyyy-MM-dd
    }
  ],
  total: 150
})

function queryUser (params) {
  const { page, pageSize } = params
  const queryList = list.dataList.filter(item => {
    if (params.keyWord && item.name.indexOf(params.keyWord) < 0 && item.phone.indexOf(params.keyWord) < 0) {
      return false
    }
    if (params.beginDate && item.date < params.beginDate) {
      return false
    }
    if (params.endDate && item.date > params.endDate) {
      return false
    }
    return true
  })

  return {
    list: queryList.slice((page - 1) * pageSize, page * pageSize),
    total: queryList.length
  }
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
  },
  {
    url: '/user/query',
    method: 'post',
    response: params => {
      const data = queryUser(JSON.parse(params.body))
      return {
        data: {
          dataList: data.list,
          total: data.total
        },
        status: 200,
        message: 'success'
      }
    }
  }
]
