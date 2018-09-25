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
 * 获取用户详情列表
 */
export function getUserList() {
  return fetch(805120, {
    start: '0',
    limit: '100'
  });
}

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
    userId: getUserId()
  });
}

// 绑定邮箱
export function bindingEmail(captcha, email, userId) {
  return fetch(805086, {
    captcha,
    email,
    userId
  })
}

//绑定手机号
export function bindingPhone(isSendSms, mobile, smsCaptcha, userId) {
  return fetch(805060, {
    isSendSms,
    mobile,
    smsCaptcha,
    userId  
  })
}

// 修改登录密码
export function changeLoginPwd(mobile, newLoginPwd, smsCaptcha) {
  return fetch(805063, {
    mobile,
    newLoginPwd,
    smsCaptcha
  })
}

// 修改交易密码
export function changeTradPwd(newTradePwd, smsCaptcha, userId) {
  return fetch(805067, {
    newTradePwd,
    smsCaptcha,
    userId
  })
}

// 我的获客
export function myGuest(start, limit) {
  return fetch(802399, {
    start,
    limit,
    userId: getUserId()
  })
}

// 我的订单
export function myOrder(statusList, start, limit) {
  return fetch(625250, {
    belongUser: getUserId(),
    statusList,
    start,
    limit
  })
}