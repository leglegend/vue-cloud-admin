export default [
  {
    url: '/report/board',
    method: 'get',
    response: params => {
      return {
        data: {
          people: 25,
          card: 13,
          money: 998,
          member: 460
        },
        status: 200,
        message: 'success'
      }
    }
  },
  {
    url: '/report/table',
    method: 'post',
    response: params => {
      const body = JSON.parse(params.body)
      const day = body.type ? 30 : 7
      const table = {
        xAxis: [],
        total: [],
        non: [],
        vip: []
      }
      for (let i = 0; i < day; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        table.xAxis.unshift([date.getMonth() + 1, date.getDate()].join('-'))
        const non = parseInt(Math.random() * 100)
        const vip = parseInt(Math.random() * 100)
        table.total.unshift(non + vip)
        table.non.unshift(non)
        table.vip.unshift(vip)
      }
      return {
        data: { ...table },
        status: 200,
        message: 'success'
      }
    }
  },
  {
    url: '/report/income',
    method: 'post',
    response: params => {
      return {
        data: {
          card: parseInt(Math.random() * 300),
          non: parseInt(Math.random() * 300),
          vip: parseInt(Math.random() * 300)
        },
        status: 200,
        message: 'success'
      }
    }
  },
  {
    url: '/report/list',
    method: 'get',
    response: params => {
      return {
        data: [
          {
            time: '12:15',
            name: '路飞',
            money: 100
          },
          {
            time: '13:11',
            name: '索隆',
            money: 40
          },
          {
            time: '19:23',
            name: '娜美',
            money: 50
          }
        ],
        status: 200,
        message: 'success'
      }
    }
  }
]
