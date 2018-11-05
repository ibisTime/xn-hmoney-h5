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
import echarts from 'echarts';
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole';

import 'common/scss/index.scss';
import 'swiper/dist/css/swiper.css';

Vue.prototype.$echarts = echarts;

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
});
Vue.use(VueI18n);

import zh from './common/lang/zh';
import en from './common/lang/en';

const i18n = new VueI18n({
  locale: LangStorage.getLang('zh'),
  messages: {
    'zh': zh,
    'en': en
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
