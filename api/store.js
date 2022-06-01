import request from '@/utils/request'

export function getStoreInfo (data) {
  return request({
    url: '/store/businessGetStoreInfo',
    method: 'post',
    data
  })
}
