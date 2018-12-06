import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import CN from 'vee-validate/dist/locale/zh_CN';
import {getTranslateText} from './util';

Validator.localize('zh_CN', {
  messages: {
    ...CN.messages,
    required: getTranslateText('不能为空'),
    regex: getTranslateText('格式错误'),
    numeric: getTranslateText('只能包含数字'),
    min: function(n, e) {
      return getTranslateText('不能少于') + e[0] + getTranslateText('位');
    },
    max: function(n, e) {
      return getTranslateText('不能多于') + e[0] + getTranslateText('位');
    },
    email: getTranslateText('邮箱格式错误')
  }
});

// 银行卡格式校验
Validator.extend('idCard', {
  getMessage: field => getTranslateText('格式错误'),
  validate: value => {
    var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;  // (15位)
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/; // (18位)
    return isIDCard1.test(value) || isIDCard2.test(value);
  }
});

// 短信验证码
Validator.extend('capt', {
  getMessage: field => getTranslateText('格式错误'),
  validate: value => {
    var isIDCard1 = /^\d{4}$/;
    return isIDCard1.test(value);
  }
});

// 手机号检验
Validator.extend('phone', {
  getMessage: field => getTranslateText('手机号格式错误'),
  validate: value => {
    var isIDCard1 = /^1[3|4|5|6|7|8]\d{9}$/;
    return isIDCard1.test(value);
  }
});

// 邮箱账号检验
Validator.extend('email', {
  getMessage: field => getTranslateText('邮箱格式错误'),
  validate: value => {
    var isIDCard1 = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
    return isIDCard1.test(value);
  }
});

// 邮箱号手机号账号检验
Validator.extend('emailPhone', {
  getMessage: field => getTranslateText('邮箱或手机号格式错误'),
  validate: value => {
    var isIDCard1 = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|6|7|8|9]\d{9}$/;
    return isIDCard1.test(value);
  }
});

// 登录密码校验
Validator.extend('password', {
  getMessage: field => getTranslateText('密码格式不正确'),
  validate: value => {
    var isIDCard1 = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
    return isIDCard1.test(value) && 5 < value.length && value.length < 16;
  }
});

// 昵称校验
Validator.extend('nickname', {
  getMessage: field => getTranslateText('昵称2-20位'),
  validate: value => {
    return 1 < value.length && value.length < 21;
  }
});

// 支付密码校验
Validator.extend('trade', {
  getMessage: field => getTranslateText('密码长度为6位且为数字'),
  validate: value => {
    let isIDCard1 = /[0-9]\d*$/;
    return isIDCard1.test(value) && value.length == 6;
  }
});

// 校验第二次密码是否和第一次相同
// Validator.extend('trade', {
//   getMessage: field => '两次密码不一致',
//   validate: value => {
//     return value.length < 6;
//   }
// });

const config = {
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'zh_CN',
  dictionary: null,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'blur',
  inject: true,
  validity: false,
  aria: true
};

Vue.use(VeeValidate, config);
