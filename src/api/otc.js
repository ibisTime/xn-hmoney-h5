import fetch from 'common/js/fetch';
import { getUserId } from '../common/js/util';

//获取已发布币种列表
export function getBbListData(){
    return fetch('802007', {
        status: '0'
    })
}

// 获取广告价格
export function getAdvertisePrice(coin, ctype) {
    let refCurrency = ctype || 'CNY';
    return fetch("625292", {
        coin,
        refCurrency
    });
}

// 获取广告详情
export function getAdvertiseDetail(adsCode, userId) {
    return fetch("625226", {
        adsCode,
        userId
    });
}

//分页查广告
/* 
    var config = {
        start: 1,
        limit: 10,
        tradeType: 1,
        coin: coin.toUpperCase()
    };
 */
export function getAdvertisingData(config){
    return fetch('625227', {
        ...config
    });
}

// 发布广告
export function addAdvertising(config){
    return fetch('625220', config);
}

// 修改广告
export function ExitAdvertising(config){
    return fetch('625221', config);
}

// 根据type查询系统参数
export function getAdverMessage(type){
    return fetch('630048', {type});
}

// 获取我的广告
export function getUserAdver(config){
    return fetch('625225', config);
}

//下架广告
export function downAdvertise(adsCode) {
    return fetch("625224", {
        userId: getUserId(),
        adsCode
    });
}

// 场外交易买卖币购买和出售详情
export function otcBuy(adsCode, userId) {
    return fetch(625226, {
        adsCode,
        userId
    })
}

// 我要购买
export function buyETH(config) {
    return fetch("625240", {
        buyUser: getUserId(),
        ...config
    });
}

// 我要出售
export function sellBB(config) {
    return fetch("625241", {
        userId: getUserId(),
        ...config
    });
}

// 购买开始聊天，提交交易订单
export function chatOrderBuy(adsCode) {
  return fetch("625247", {
    buyUser: getUserId(),
    adsCode
  });
}
//出售开始聊天，提交交易订单
export function chatOrderSell(adsCode) {
  return fetch("625248", {
    sellUser: getUserId(),
    adsCode
  });
}
