import fetch from 'common/js/fetch';
import {getUserId} from 'common/js/util';

/**
 * 获取用户详情
 */
export function getUser(userId) {
  return fetch(805121, {
    userId: userId || getUserId()
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

// 查询用户信任关系
export function getUserRelation(currency, master) {
  return fetch("625256", {
      visitor: getUserId(),
      currency,
      master,
  });
}

/**
 * 修改信任关系(建立)
 * @param config {limit, start, userId, type}
 * type=1 信任，type=0，屏蔽
 */
export function addUserRelation(config, refresh) {
  return fetch("805150", {
      userId: getUserId(),
      ...config
  }, refresh);
}

/**
 * 修改信任关系(解除）
 * @param config {limit, start, userId, type}
 * type=1 信任，type=0，屏蔽
 */
export function removeUserRelation(config, refresh) {
  return fetch("805151", {
      userId: getUserId(),
      ...config
  }, refresh);
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
export function reistered(config) {
  return fetch(805041, config);
}

// 邮箱注册
export function reisteredEamil(config) {
  return fetch(805043, config);
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

// 列表查询用户账户
export function wallet() {
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

//获取谷歌密码
export function getGooglePwd() {
  return fetch("630094");
}

/**
 * 开启谷歌验证
 * @param config {googleCaptcha, secret, smsCaptcha}
 */
export function openGoogle(config) {
  return fetch("805088", {
      userId: getUserId(),
      ...config
  });
}
/**
 * 关闭谷歌验证
 */
export function closeGoogle(googleCaptcha, smsCaptcha) {
    return fetch("805089", {
        googleCaptcha,
        smsCaptcha,
        userId: getUserId()
    });
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

// 获取订单详情
export function getOrderDetail(code) {
    return fetch("625251", {
        code
    }, true);
}

// 订单-释放以太币
export function releaseOrder(code) {
  return fetch("625244", {
      updater: getUserId(),
      code
  });
}

// 订单-取消交易
export function cancelOrder(code) {
  return fetch("625242", {
      updater: getUserId(),
      code
  });
}

// 订单-标记打款
export function payOrder(code) {
  return fetch("625243", {
      updater: getUserId(),
      code
  });
}

// 申请仲裁
export function arbitrationlOrder(config) {
  return fetch("625246", {
      applyUser: getUserId(),
      ...config
  });
}

//订单-评价
export function commentOrder(code, comment, content) {
  return fetch("625245", {
      updater: getUserId(),
      code,
      starLevel: comment,
      content
  });
}

// 钱包 -- 转出
export function walletOut(config) {
  return fetch(802350, config)
}

// 钱包 -- 账单
export function walletBill(config) {
  return fetch(802322, config);
}

// 钱包 -- 账单 -- 账单详情
export function billDetails(code) {
  return fetch(802321, {
    code
  })
}

// 获取银行卡
export function getBankData() {
  return fetch('802026', {
      status: '1'
  })
}

// 获取银行渠道
export function getGmBankData() {
  return fetch('802116', {
      status: '1'
  })
}

// 数字货币折合
export function getNumberMoney(symbol, referCurrency){
  return fetch('650102', {
      symbol,
      referCurrency
  })
}

// 购买X币
export function buyX(config) {
  return fetch('625270', config);
}

// 出售X币
export function sellX(config) {
  return fetch('625271', config);
}

//分页查询我的承兑商信息
export function getCTSData(config) {
  return fetch('625287', config);
}

//详情查询我的承兑商信息
export function getCTSDetail(config) {
  return fetch('625286', config);
}

// 标记付款
export function bjPlayfo(config) {
  return fetch('625273', config);
}

// 取消订单
export function qxOrder(config) {
  return fetch('625272', config);
}
