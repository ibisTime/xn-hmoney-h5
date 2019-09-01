import fetch from 'common/js/fetch';
import {getUserId} from 'common/js/util';

// 查询我的申购
export function queryPurchase(params) {
  return fetch(650206, params);
}

// 购买申购
export function buyPurchase(params) {
  return fetch(650207, params);
}
