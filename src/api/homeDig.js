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

// 我的购买记录分页查询
export function myPurchaseRecord(params) {
  return fetch(650209, params)
}

// 详情查询产品
export function purchaseDetail(code) {
  return fetch(650205, {code});
}

// 交割
// 分页查询到期交割信息
export function queryDelivery(params) {
  return fetch('650236', params);
}

// 分页查询已上架物权
export function queryRealRight(params) {
  return fetch('650246', params);
}

// 查询交割币种
export function deliveryCoinList() {
  return fetch('650239');
}

// 交割信息详情查
export function deliveryDetail(code) {
  return fetch('650238', {code})
}

// 提交交割
export function submitDelivery(params) {
  return fetch('650250', params);
}

// 我的交割记录分页查
export function ownerDeliveryRecord(params) {
  return fetch('650254', params);
}

// 详情查询交割记录
export function deliveryRecordDetail(code) {
  return fetch('650253', {code})
}