const LANGUAGE = {
  '正在载入': {
    'zh': '正在载入...',
    'en': 'Loading...'
  },
  '已经全部加载完毕': {
    'zh': '已经全部加载完毕',
    'en': 'All loaded'
  },
  '不能为空': {
    'zh': '不能为空',
    'en': "Can't be empty"
  },
  '格式错误': {
    'zh': '格式错误',
    'en': 'Formatting error'
  },
  '只能包含数字': {
    'zh': '只能包含数字',
    'en': 'Only numbers'
  },
  '邮箱格式错误': {
    'zh': '邮箱格式错误',
    'en': 'Formatting error'
  },
  '手机号格式错误': {
    'zh': '手机号格式错误',
    'en': 'Formatting error'
  },
  '邮箱或手机号格式错误': {
    'zh': '邮箱或手机号格式错误',
    'en': 'Formatting error'
  },
  '密码格式不正确': {
    'zh': '密码格式不正确',
    'en': 'Formatting error'
  },
  '昵称2-20位': {
    'zh': '昵称2-20位',
    'en': 'Nickname 2-20'
  },
  '密码长度为6位且为数字': {
    'zh': '密码长度为6位且为数字',
    'en': 'The password length is 6 bits and is numeric'
  },
  '不能少于': {
    'zh': '不能少于',
    'en': 'No less than '
  },
  '不能多于': {
    'zh': '不能多于',
    'en': 'No more than '
  },
  '位': {
    'zh': '位',
    'en': ''
  },
  '系统消息：交易已下单，等待买家标记打款': {
    'zh': '系统消息：交易已下单，等待买家标记打款',
    'en': 'System Message: The transaction has placed an order waiting for the buyer to mark the payment'
  },
  '系统消息：订单支付超时，系统自动取消': {
    'zh': '系统消息：订单支付超时，系统自动取消',
    'en': 'System Message: Order payment timeout, system cancel automatically'
  },
  '系统消息：订单已取消': {
    'zh': '系统消息：订单已取消',
    'en': 'System Message: Order has cancelled'
  },
  '系统消息：买家已标记打款': {
    'zh': '系统消息：买家已标记打款',
    'en': 'System Message: Buyer has marked the payment'
  },
  '系统消息：卖家已释放': {
    'zh': '系统消息：卖家已释放',
    'en': 'System Message: Seller has released'
  },
  '系统消息：订单已申请仲裁': {
    'zh': '系统消息：订单已申请仲裁',
    'en': 'System Message: Order has applied for arbitration'
  },
  '系统消息：仲裁申请已处理完成': {
    'zh': '系统消息：仲裁申请已处理完成',
    'en': 'System Message: The arbitration application has been processed'
  },
  '系统消息：买家申请仲裁不通过，买家实际未付款，订单取消': {
    'zh': '系统消息：买家申请仲裁不通过，买家实际未付款，订单取消',
    'en': 'System Message: Buyer to apply for arbitration does not pass, the buyer is not actually paid, order cancelled'
  },
  '系统消息：买家申请仲裁通过，买家实际已付款，自动解冻': {
    'zh': '系统消息：买家申请仲裁通过，买家实际已付款，自动解冻',
    'en': 'System message: Buyer apply for arbitration through the buyer has actually paid, automatic thawing'
  },
  '系统消息：买家已评价': {
    'zh': '系统消息：买家已评价',
    'en': 'System Message: Buyer has evaluated'
  },
  '系统消息：卖家已评价': {
    'zh': '系统消息：卖家已评价',
    'en': 'System Message: Seller has evaluated'
  },
  // 流水
  '提交卖出[FMVP/ETH]委托单': {
    'ZH': '提交卖出[FMVP/ETH]委托单',
    'EN': 'Commit sell FMVP/ETH order'
  },
  '提交购买[FMVP/ETH]委托单': {
    'ZH': '提交购买[FMVP/ETH]委托单',
    'EN': 'Commit buy FMVP/ETH order'
  },
  '提交卖出[FMVP/BTC]委托单': {
    'ZH': '提交卖出[FMVP/BTC]委托单',
    'EN': 'Selling orders [FMVP/BTC]'
  },
  '提交购买[FMVP/BTC]委托单': {
    'ZH': '提交购买[FMVP/BTC]委托单',
    'EN': 'Buy FMVP/BTC order'
  },
  '充币-来自地址': {
    'zh': '充币-来自地址',
    'en': 'Charge-from address '
  },
  '充币-来自交易': {
    'zh': '充币-来自交易',
    'en': 'Charge-from transactional '
  },
  '充币-交易id': {
    'zh': '充币-交易id',
    'en': 'Charge-from id'
  },
  '充币-外部地址': {
    'zh': '充币-外部地址',
    'en': 'Charge-from external address'
  }
};
export default {
  getText(text, lang) {
    if(lang === '' || !lang){
      lang = window.localStorage.getItem('user_lang') || 'zh';
    }
    let t = LANGUAGE[text] && LANGUAGE[text][lang] ? LANGUAGE[text][lang] : '';
    if (!LANGUAGE[text] || t === '') {
      if (!LANGUAGE[text]) {
        t = text;
        console.log('[' + text + ']没有翻译配置');
      } else {
        if (!LANGUAGE[text]['zh']) {
          t = LANGUAGE[text]['en']
        } else {
          t = LANGUAGE[text]['zh'];
        }
        console.log(lang + ': [' + text + ']没有翻译配置');
      }
    }
    return t;
  }
}
