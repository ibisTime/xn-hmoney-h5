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

// 我目前的挖矿代币值和算力值
export function ownerDigValue() {
  return fetch('650273')
}

// 我的待领取的矿列表
export function willDigList() {
  return fetch('650274')
}

// 领取挖矿值
export function receiveDigValue(id) {
  return fetch('650275', {id})
}

// 算力排行榜
export function calculateList() {
  return fetch('650276')
}

// 代币排行榜
export function tokensList() {
  return fetch('650277')
}

// 某日获取算力记录分页查询
export function queryCalculateRecord(params) {
  return fetch('650279', params)
}

// 我的历史记录统计分页查询
export function queryHistoryRecord(params) {
  return fetch(650280, params);
}

// 我的某一日算力和获取的代币(含自身收益和团队收益)
export function ownerCalculateEarnings(outDatetime) {
  return fetch(650278, {outDatetime});
}

// 目前的挖矿代币值和算力值
export function outMineEarnings() {
  return fetch(650273);
}

// 代币池转账申请
export function outMineApply(params) {
  return fetch(650290, params);
}

// 我的代币池转账申请记录
export function ownerApplyRecord(params) {
  return fetch(650294, {
    ...params,
    orderDir: 'desc',
    orderColumn: 'id'
  })
}

// 我的矿池余额，昨日出矿以及累计出矿值
export function ownerDigAmount() {
  return fetch(650282)
}