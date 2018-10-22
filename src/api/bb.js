import fetch from 'common/js/fetch';

// 市场（交易对）
export function getBazaarData() {
    return fetch("650100", {
        start: '1',
        limit: '10'
    }, true);
}

// 获取币种汇率、行情
export function getBBExchange(ex_type, toSymbol) {
    return fetch('650101', {
        symbol: toSymbol,
        referCurrency: ex_type
    });
}

// 盘口查询
export function getHandicapData(setBazDeal) {
    return fetch("650065", setBazDeal, true);
}

// 下订单
export function downBBOrder(config){
    return fetch('650050', config);
}

// 分页查询我的委托单
export function getMyorderTicket(config) {
    return fetch('650058', config);
}