<template>
  <div id="app">
    <router-view></router-view>
    <Toast :text="textMsg" id="toast" ref="toast"/>
    <FullLoading id="fullLoading" v-show="isLoading"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';
  import {isLogin, getUrlParam, setUser, getUserId} from 'common/js/util';
  import {getBbListData} from 'api/tradingOn';
  import {SOCKET_URL} from 'common/js/config';
  import { mapMutations } from 'vuex';
  import * as types from './store/mutation-types';

  export default {
    name: 'app',
    data() {
      return {
        textMsg: '',
        coinData: {},
        isLoading: false
      }
    },
    created() {
      if(window.SCOKET) {
        window.SOCKET.onerror = function() {
          window.SOCKET = isLogin() ?
            new WebSocket(`${SOCKET_URL}?userId=${getUserId()}`) :
            new WebSocket(SOCKET_URL);
        }
      }else {
        window.SOCKET = isLogin() ?
          new WebSocket(`${SOCKET_URL}?userId=${getUserId()}`) :
          new WebSocket(SOCKET_URL);
      }
      this.$router.afterEach(() => {
        this.isLoading = false;
        getBbListData().then(data => {
          for(let i = 0; i < data.length; i ++){
            let obj = {
              ...data[i],
              unit: '1e' + data[i].unit
            };
            this.coinData[data[i].symbol] = JSON.parse(JSON.stringify(obj));
          }
          sessionStorage.setItem('coinData', JSON.stringify(this.coinData));
        });
        let userId = getUrlParam('userId') || '';
        let token = getUrlParam('token') || '';
        if (userId && token) {
          setUser({userId, token});
        }
      });
    },
    mounted() {
      const _this = this;
      window.SOCKET.onmessage = function(ev) {
        const pathname = window.location.pathname;
        if(ev.data) {
          const scoketData = JSON.parse(ev.data);
          const obj = {
            'market.notice': () => { // 行情
              _this.MARKET_NOTICE();
            },
            'simuorder.notice': () => { // 我的委托单
              _this.SIMUORDER_NOTICE();
            },
            'account.notice': () => { // 我的账户
              _this.ACCOUNT_NOTICE();
            },
            'handicap.notice': () => { // 盘口
              _this.HANDICAP_NOTICE();
            },
            'simuorderdetail.notice': () => { // 实时成交
              _this.SIMUORDERDETAIL_NOTICE();
            }
          };
          obj[scoketData.ch] && obj[scoketData.ch]();
        }
      }
      window.SOCKET.onerror = function() {
        window.SOCKET = isLogin() ?
          new WebSocket(`${SOCKET_URL}?userId=${getUserId()}`) :
          new WebSocket(SOCKET_URL);
      }
    },
    methods: {
      ...mapMutations({
        ...types
      })
    },
    components: {
      Toast,
      FullLoading
    },
    beforeDestroy() {
      window.SOCKET.close();
    }
  };
</script>
<style lang="scss">
  #app {
    overflow-x: hidden;
    /*background-color: #fff;*/
    -webkit-overflow-scrolling: auto; // 阻止元素滑动回弹
    // -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    .slide-enter-active, .slide-leave-active {
      transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
      transform: translate3d(-100%, 0, 50%);
    }
  }
  .all-content{
    width: 100%;
    margin: 0 auto;
  }

  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .loading-wrapper {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translate3d(0, -50%, 0);
    }
  }

  .hidden {
    display: none !important;
  }

  .show {
    display: block !important;
  }

  .no-data {
    width: 100%;
    padding: 1.6rem 0 1.2rem;
    text-align: center;
    img {
      vertical-align: bottom;
      width: 2rem;
    }
    p {
      font-size: 15px;
      color: #999;
      margin-top: 15px;
    }
  }

  .o-btn {
    width: 3rem;
    height: 0.88rem;
    background: #d53d3d;
    border-radius: 0.44rem;
    margin-bottom: 0.36rem;
    font-size: 0.32rem;
    line-height: 0.88rem;
    color: #fff;
  }

  .qx-btn {
    background-color: #fff;
    margin-left: 0.5rem;
    color: #d53d3d;
    border: 1px solid #d53d3d;
  }
  .tobuy{
    position: fixed;
    width: 2.8rem;
    height: 0.74rem;
    box-sizing: border-box;
    z-index: 999999;
    text-align: center;
    div{
      padding: 0.2rem 0.4rem;
      border-radius: 0.4rem;
      background-color: #D53D3D;
      opacity: 0.8;
      color: #fff;
      font-size: 0.32rem;
    }
  }
  .icon_right_to{
    background-image: url('/static/right_to.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
</style>
