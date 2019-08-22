import fetch from 'common/js/fetch';

// 市场（交易对）
export function getBazaarData(params = {}) {
    return fetch("650042", params);
}

// 获取币种汇率、行情
export function getBBExchange(ex_type, toSymbol) {
    return fetch('650102', {
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

// 取消委托
export function repOrder(code) {
    return fetch('650051', {
        code
    })
}

// 分页查询我的历史委托单
export function getMyHistoryData(config) {
    return fetch('650059', config);
}

// 深度图 数据
export function getDepthData(config) {
    return fetch('650064', config)
}

// 分页查询成交明细 （实时成交）
export function getRealTimeData(config) {
    return fetch('650057', config)
}

// 根据symbol查资料
export function getSymbolDetail(symbol) {
    return fetch('802008', {
        symbol
    })
}
