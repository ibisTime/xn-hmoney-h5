import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 首页
const Home = () => import('components/home/home');
// 登陆
const Login = () => import('components/login/login');
// 注册
const Registered = () => import('components/registered/registered');
// 商城
const Shop = () => import('components/shop/shop');
// 商城 -- 转币
const ShopTurnMoney = () => import('components/shop-turn-money/shop-turn-money');
// 商城 -- 二手车
const shopUsedCar = () => import('components/shop-used-car/shop-used-car');
// 交易
const Trading = () => import('components/trading/trading');
// k线图简介
const TradingSynopsis = () => import('components/trading-synopsis/trading-synopsis');
// k线图挂单
const TradingPutUp = () => import('components/trading-put-up/trading-put-up');
// k线图成交
const TradingClinchadeal = () => import('components/trading-clinchadeal/trading-clinchadeal');
// k线图深度图
const tradingDepthMap = () => import('components/trading-depth-map/trading-depth-map');
// 交易 -- 历史委托 
const tradingHistoryEntrust = () => import('components/trading-history-entrust/trading-history-entrust');
// 场外交易
const Otc = () => import('components/otc/otc');
// 场外交易 -- 购买
const OtcBuy = () => import('components/otc-buy/otc-buy');
// 场外交易 -- 出售
const OtcSell = () => import('components/otc-sell/otc-sell');
// 联系对方
const otcContactOther = () => import('components/otc-contact-other/otc-contact-other');
// 购买发布
const BuyPublish = () => import('components/buy-publish/buy-publish');
// 出售发布
const SellPublish = () => import('components/sell-publish/sell-publish');
// 钱包
const Wallet = () => import('components/wallet/wallet');
// 钱包 -- 转入
const WalletInto = () => import('components/wallet-into/wallet-into');
// 钱包 -- 转出
const WalletOut = () => import('components/wallet-out/wallet-out');
// 钱包 -- 充值
const WalletTopUp = () => import('components/wallet-top-up/wallet-top-up');
// 钱包 -- 账单
const WalletBill = () => import('components/wallet-bill/wallet-bill');
// 账单 -- 详情
const BillDetails = () => import('components/wallet-bill-details/wallet-bill-details');
// 我的
const Mine = () => import('components/mine/mine');
// 我的 -- 选择货币
const MyCurrency = () => import('components/my-currency/my-currency');
// 我的 -- 安全中心
const mySecurityCenter = () => import('components/my-security-center/my-security-center');
// 安全中心 -- 交易密码 
const securityTradePassword = () => import('components/security-trade-password/security-trade-password');
// 安全中心 -- 身份认证 
const securityIdentity = () => import('components/security-identity/security-identity');
// 身份认证 -- 身份证认证 
const securityIdcard = () => import('components/security-idcard/security-idcard');
// 安全中心 -- 绑定邮箱 
const securityBindingEmail = () => import('components/security-binding-email/security-binding-email');
// 安全中心 -- 修改邮箱 
const securityEmail = () => import('components/security-email/security-email');
// 安全中心 -- 修改手机号 
const securityPhoneNumber = () => import('components/security-phone-number/security-phone-number');
// 安全中心 -- 修改登录密码 
const securityLoginPassword = () => import('components/security-login-password/security-login-password');
// 我的 -- 我的广告
const myAdvertising = () => import('components/my-advertising/my-advertising');
// 我要购买 -- 订单记录
const wallectOrderRecord = () => import('components/wallect-order-record/wallect-order-record');
// 我要购买 -- 订单详情
const walletOrderDetails = () => import('components/wallet-order-details/wallet-order-details');
// 我的订单
const MyOrder = () => import('components/my-order/my-order');
// 订单详情
const OrderDetails = () => import('components/order-details/order-details');
// 我的 -- 交易对手
const myGuest = () => import('components/my-guest/my-guest');
// 我的 -- 邀请好友
const myInviteFriends = () => import('components/my-invite-friends/my-invite-friends');
// 我的 -- 关于我们
const myAboutUs = () => import('components/my-about-us/my-about-us');
// 关于我们 -- 平台介绍
const aboutPlatformIntroduced = () => import('components/about-platform-introduced/about-platform-introduced');
// 关于我们 -- 用户协议
const aboutUserAgreement = () => import('components/about-user-agreement/about-user-agreement');
// 关于我们 -- 隐私条款
const aboutPrivacyPolicy = () => import('components/about-privacy-policy/about-privacy-policy');
// 关于我们 -- 法律申明
const aboutLegalNotices = () => import('components/about-legal-notices/about-legal-notices');
// 关于我们 -- 费率说明
const aboutRateExplain = () => import('components/about-rate-explain/about-rate-explain');
// 关于我们 -- 帮助中心
const aboutHelpCenter = () => import('components/about-help-center/about-help-center');
// 首页 -- 系统公告
const systemNotice = () => import('components/system-notice/system-notice');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/page'
    },
    {
      path: '/page',
      component: Home,
      beforeRouteLeave(to, from, next) {
        if(to.path === '/login' || to.path === '/registered') {
          next();
        } else {
          alert('还没有登陆，请先登录！');
          next('/login');
        }
      },
    },
    {
      path: '/system-notice',
      component: systemNotice
    },
    {
      path: '/shop',
      component: Shop
    },
    {
      path: '/shop-turn',
      component: ShopTurnMoney
    },
    {
      path: '/shop-usedCar',
      component: shopUsedCar
    },
    {
      path: '/trading',
      component: Trading,
      children: [
        {
          path: '/trading-synopsis',
          component: TradingSynopsis,
        },
        {
          path: '/trading-putUp',
          component: TradingPutUp,
        },
        {
          path: '/trading-clinchADeal',
          component: TradingClinchadeal,
        },
        {
          path: '/trading-depthMap',
          component: tradingDepthMap,
        }
      ]
    },
    {
      path: '/trading-historyEntrust',
      component: tradingHistoryEntrust
    },
    {
      path: '/wallet',
      component: Wallet
    },
    {
      path: '/wallet-bill',
      component: WalletBill
    },
    {
      path: '/wallet-into',
      component: WalletInto
    },
    {
      path: '/wallet-out',
      component: WalletOut
    },
    {
      path: '/bill-details',
      component: BillDetails
    },
    {
      path: '/wallet-top-up',
      component: WalletTopUp
    },
    {
      path: '/wallect-orderRecord',
      component: wallectOrderRecord
    },
    {
      path: '/wallet-orderDetails',
      component: walletOrderDetails
    },
    {
      path: '/otc',
      component: Otc
    },
    {
      path: '/otc-buy',
      component: OtcBuy
    },
    {
      path: '/otc-sell',
      component: OtcSell
    },
    {
      path: '/otc-contactOther',
      component: otcContactOther
    },
    {
      path: '/buy-publish',
      component: BuyPublish
    },
    {
      path: '/sell-publish',
      component: SellPublish
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/my-currency',
      component: MyCurrency
    },
    {
      path: '/my-advertising',
      component: myAdvertising
    },
    {
      path: '/my-order',
      component: MyOrder
    },
    {
      path: '/my-inviteFriends',
      component: myInviteFriends
    },
    {
      path: '/my-guest',
      component: myGuest
    },
    {
      path: '/security-center',
      component: mySecurityCenter
    },
    {
      path: '/security-tradePassword',
      component: securityTradePassword
    },
    {
      path: '/security-identity',
      component: securityIdentity
    },
    {
      path: '/security-idcard',
      component: securityIdcard
    },
    {
      path: '/security-loginPassword',
      component: securityLoginPassword
    },
    {
      path: '/security-bindingEmail',
      component: securityBindingEmail
    },
    {
      path: '/security-email',
      component: securityEmail
    },
    {
      path: '/security-phoneNumber',
      component: securityPhoneNumber
    },
    {
      path: '/my-aboutUs',
      component: myAboutUs
    },
    {
      path: '/about-platformIntroduced',
      component: aboutPlatformIntroduced
    },
    {
      path: '/about-userAgreement',
      component: aboutUserAgreement
    },
    {
      path: '/about-privacyPolicy',
      component: aboutPrivacyPolicy
    },
    {
      path: '/about-legalNotices',
      component: aboutLegalNotices
    },
    {
      path: '/about-rateExplain',
      component: aboutRateExplain
    },
    {
      path: '/about-helpCenter',
      component: aboutHelpCenter
    },
    {
      path: '/order-details',
      component: OrderDetails
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/registered',
      component: Registered
    }
  ],
  mode: 'history'
});