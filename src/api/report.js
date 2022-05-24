import request from '@/utils/request'

export function getBoard () {
  return request({
    url: '/report/board',
    method: 'get'
  })
}

export function queryTable (data) {
  return request({
    url: '/report/table',
    method: 'post',
    data
  })
}

export function queryIncome (data) {
  return request({
    url: '/report/income',
    method: 'post',
    data
  })
}

export function getList () {
  return request({
    url: '/report/list',
    method: 'get'
  })
}

export function getDetail () {
  return request({
    url: '/report/detail',
    method: 'get'
  })
}
