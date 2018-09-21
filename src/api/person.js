import fetch from 'common/js/fetch';
import {getUserId} from 'common/js/util';

/**
 * 获取用户详情
 */
export function getUser() {
  return fetch(805121, {
    userId: getUserId()
  });
}

/**
 * 获取用户详情
 * @param {string} userId
 */
// export function getUserById(userId) {
//   return fetch(805121, { userId });
// }

// 登陆
export function login(loginName, loginPwd) {
  return fetch(805050, {
    loginName,
    loginPwd,
    userId: getUserId()
  });
}

// 手机注册
export function reistered(mobile, loginPwd, smsCaptcha) {
  return fetch(805041, {
    mobile,
    loginPwd,
    smsCaptcha
  });
}

// 邮箱注册
export function reisteredEamil(captcha, email, loginPwd) {
  return fetch(805043, {
    captcha,
    email,
    loginPwd
  });
}

// 获取手机验证码
export function getSmsCaptcha1(bizType, mobile) {
  return fetch(630090, {
    bizType,
    mobile
  });
}

// 获取邮箱验证码
export function getSmsCaptcha2(bizType, email) {
  return fetch(630093, {
    bizType,
    email
  });
}

// 钱包
export function wallet(userId) {
  return fetch(802301, {
    userId
  });
}