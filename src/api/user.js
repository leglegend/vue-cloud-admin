import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getDetail () {
  return request({
    url: '/user/detail',
    method: 'get'
  })
}

export function editUser (data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function queryUser (data) {
  return request({
    url: '/user/query',
    method: 'post',
    data
  })
}
