import fetch from 'common/js/fetch';

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