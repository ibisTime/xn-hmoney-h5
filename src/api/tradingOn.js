import fetch from 'common/js/fetch';

//获取已发布币种列表
export function getBbListData(){
    return fetch('802007', {
        status: '0'
    })
}

// 交易对分页查询
export function tradingOnApi(params) {
  return fetch('650071', params);
}

// 根据交易币种和计价币种查询行情
export function selectedTradingApi(params) {
  return fetch(650074, params)
}

// 自选交易对查询
export function ownerTradingApi() {
  return fetch('650076');
}

// 查询板块
export function queryPlateList() {
  return fetch('802046');
}

// 收藏/取消收藏交易对
export function isCollectionTrading(marketId) {
  return fetch(650075, {marketId});
}

// 首页行情列表查询
export function queryHomeTrading() {
  return fetch(650079, {location: '1'});
}
