import request from '@/utils/request'

export function getStoreInfo(data: any) {
  return request({
    url: '/store/businessGetStoreInfo',
    method: 'post',
    data
  })
}
