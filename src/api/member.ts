import request from '@/utils/request'

export function queryMembers(data: any) {
  return request({
    url: '/card/businessGetUserCards',
    method: 'post',
    data
  })
}

export function getGroupList(data: any) {
  return request({
    url: '/userGroup/getGroupList',
    method: 'post',
    data
  })
}

export function getTradeList(data: any) {
  return request({
    url: '/consumption/businessGetUserConsumptionList',
    method: 'post',
    data
  })
}

export function getMemberControls(data: any) {
  return request({
    url: '/user/businessGetStoreControls',
    method: 'post',
    data
  })
}

export function getCardList(data: any) {
  return request({
    url: '/storeCard/businessGetStorePrepaidCards',
    method: 'post',
    data
  })
}

export function createMember(data: any) {
  return request({
    url: '/user/businessAddStoreUser',
    method: 'post',
    data
  })
}

export function editMember(data: any) {
  return request({
    url: '/user/businessSetStoreUser',
    method: 'post',
    data
  })
}

export function getCardSetting(data: any) {
  return request({
    url: '/storeCard/businessStorePrepaidCardSeting',
    method: 'post',
    data
  })
}

export function createCard(data: any) {
  return request({
    url: '/storeCard/businessAddStorePrepaidCard',
    method: 'post',
    data
  })
}
