import fetch from 'common/js/fetch';
import {getUserId} from 'common/js/util';

// 阅读我的消息
export function readMeMessage(start, limit) {
  return fetch(805310, {
    id: getUserId()
  })
}

// 分页查询我的消息
export function mineMessage(params) {
  return fetch(805315, params);
}

// 分页查询公告
export function mineNotice(params) {
  return fetch(805305, params);
}

// 地址簿添加
export function addAddressBook(params) {
  return fetch(802010, params)
}

// 分页查地址簿
export function getAddressBookPage(params) {
  return fetch(802015, params);
}
