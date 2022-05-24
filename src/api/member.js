import request from '@/utils/request'

export function queryMembers (data) {
  return request({
    url: '/card/businessGetUserCards',
    method: 'post',
    data
  })
}

export function getGroupList (data) {
  return request({
    url: '/userGroup/getGroupList',
    method: 'post',
    data
  })
}

export function getTradeList (data) {
  return request({
    url: '/consumption/businessGetUserConsumptionList',
    method: 'post',
    data
  })
}

export function getMemberControls (data) {
  return request({
    url: '/user/businessGetStoreControls',
    method: 'post',
    data
  })
}

export function getCardList (data) {
  return request({
    url: '/storeCard/businessGetStorePrepaidCards',
    method: 'post',
    data
  })
}

export function createMember (data) {
  return request({
    url: '/user/businessAddStoreUser',
    method: 'post',
    data
  })
}

export function editMember (data) {
  return request({
    url: '/user/businessSetStoreUser',
    method: 'post',
    data
  })
}

export function getCardSetting (data) {
  return request({
    url: '/storeCard/businessStorePrepaidCardSeting',
    method: 'post',
    data
  })
}

export function createCard (data) {
  return request({
    url: '/storeCard/businessAddStorePrepaidCard',
    method: 'post',
    data
  })
}
