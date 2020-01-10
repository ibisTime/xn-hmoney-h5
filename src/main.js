import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import 'common/js/validate';
import VueI18n from 'vue-i18n';
import LangStorage from './common/js/cookie';
import clipboard from 'clipboard';
import zh from './common/lang/zh';
import en from './common/lang/en';
import {isLogin, getUrlParam, setUser} from './common/js/util';

import 'common/scss/index.scss';
import 'swiper/dist/css/swiper.css';

//引入基本模板
const echarts = require('echarts/lib/echarts');

require('echarts/lib/chart/line');

Vue.prototype.$echarts = echarts;
Vue.prototype.clipboard = clipboard;

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
});
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: LangStorage.getLang('zh'),
  messages: {
    'zh': zh,
    'en': en
  }
});

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://192.168.1.136:9092'
// }));

router.beforeEach((to, from, next) => {
  this.isLoading = true;
  let userId = getUrlParam('userId') || '';
  let token = getUrlParam('token') || '';
  if (isLogin()) {
    next();
  } else if (userId && token) {
    setUser({userId, token});
    next();
  }  else {
    if (to.path === '/' ||
      to.path === '/page' ||
      to.path === '/shop-usedCar' ||
      to.path === '/system-notice' ||
      to.path === '/about-platformIntroduced?ckey=plat_introduce' ||
      to.path === '/trading' ||
      to.path === '/market' ||
      to.path === '/login' ||
      to.path === '/registered' ||
      to.path === '/security-loginPassword' ||
      to.path.includes('/trading-kline')) {
      next();
    } else {
      next('/login');
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
