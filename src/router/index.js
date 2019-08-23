import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 首页
const Home = () => import('components/home/home');
// 登陆
const Login = () => import('components/login/login');
// 注册
const Registered = () => import('components/registered/registered');
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
// 钱包
const Wallet = () => import('components/wallet/wallet');
// 钱包 -- 转入
const WalletInto = () => import('components/wallet-into/wallet-into');
// 钱包 -- 转出
const WalletOut = () => import('components/wallet-out/wallet-out');
// 钱包 -- 账单
const WalletBill = () => import('components/wallet-bill/wallet-bill');
// 账单 -- 详情
const BillDetails = () => import('components/wallet-bill-details/wallet-bill-details');
// 我的
const Mine = () => import('components/mine/mine');
// 我的 -- 安全中心
const mySecurityCenter = () => import('components/my-security-center/my-security-center');
// 安全中心 -- 谷歌认证
const securityGoogle = () => import('components/security-google-certification/security-google');
// 安全中心 -- 交易密码
const securityTradePassword = () => import('components/security-trade-password/security-trade-password');
// 安全中心 -- 身份认证
const securityIdentity = () => import('components/security-identity/security-identity');
// 身份认证 -- 身份证认证
const securityIdcard = () => import('components/security-idcard/security-idcard');
// 安全中心 -- 绑定邮箱
const securityBindingEmail = () => import('components/security-binding-email/security-binding-email');
// 安全中心 -- 修改手机号
const securityPhoneNumber = () => import('components/security-phone-number/security-phone-number');
// 安全中心 -- 修改登录密码
const securityLoginPassword = () => import('components/security-login-password/security-login-password');
// 我要购买 -- 订单记录
const wallectOrderRecord = () => import('components/wallect-order-record/wallect-order-record');
// 我要购买 -- 订单详情
const walletOrderDetails = () => import('components/wallet-order-details/wallet-order-details');
// 我的订单
const MyOrder = () => import('components/my-order/my-order');
// 订单详情
const OrderDetails = () => import('components/order-details/order-details');
// 我的 -- 邀请好友
const myInviteFriends = () => import('components/my-invite-friends/my-invite-friends');
// 我的 -- 关于我们
const myAboutUs = () => import('components/my-about-us/my-about-us');
// 关于我们 -- 平台介绍
const aboutPlatformIntroduced = () => import('components/about-privacy-policy/about-privacy-policy');
// 关于我们 -- 隐私条款
const aboutPrivacyPolicy = () => import('components/about-privacy-policy/about-privacy-policy');
// 首页 -- 系统公告
const systemNotice = () => import('components/system-notice/system-notice');

// 行情
const Market = () => import('components/market/market');

// 消息
const MineMessage = () => import('components/mine-message/index');

// 团队
const MineTeam = () => import('components/mine-team/index');

// 挖矿
const DigCoin = () => import('components/dig-coin/index');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/page'
    },
    {
      path: '/page',
      component: Home
    },
    {
      path: '/system-notice',
      component: systemNotice
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
      path: '/wallect-orderRecord',
      component: wallectOrderRecord
    },
    {
      path: '/wallet-orderDetails',
      component: walletOrderDetails
    },
    {
      path: '/mine',
      component: Mine
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
      path: '/security-center',
      component: mySecurityCenter
    },
    {
      path: '/security-google',
      component: securityGoogle
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
      path: '/security-idcard/:type',
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
      path: '/about-privacyPolicy',
      component: aboutPrivacyPolicy
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
    },
    {
      path: '/market',
      component: Market
    },
    {
      path: '/mine-message',
      component: MineMessage
    },
    {
      path: '/mine-team',
      component: MineTeam
    },
    {
      path: '/dig-coin',
      component: DigCoin
    }
  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosition) { // vue滚动行为
      return { x: 0, y: 0 };
  }
});
