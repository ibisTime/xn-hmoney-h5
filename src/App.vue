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
  import {isLogin, getUrlParam, setUser} from 'common/js/util';
  import {messageMixin} from 'common/js/message-mixin';
  import {getBbListData} from 'api/tradingOn';

  export default {
    mixins: [messageMixin],
    name: 'app',
    data() {
      return {
        textMsg: '',
        coinData: {},
        isLoading: false
      }
    },
    created() {
      this.$router.beforeEach((to, from, next) => {
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
            to.path === '/about-platformIntroduced?ckey=about_us' ||
            to.path === '/trading' ||
            to.path === '/market' ||
            to.path === '/login' ||
            to.path === '/registered' ||
            to.path === '/security-loginPassword') {
            next();
          } else {
            this.textMsg = '请先登录';
            this.$refs.toast.show();
            setTimeout(() => {
              next('/login');
            }, 1500);
          }
        }
      });
      this.$router.afterEach(() => {
        this.isLoading = false;
        if(!sessionStorage.getItem('coinData')){
          getBbListData().then(data => {
            for(let i = 0; i < data.length; i ++){
              let obj = {
                ...data[i],
                unit: '1e' + data[i].unit
              };
              this.coinData[data[i].symbol] = JSON.parse(JSON.stringify(obj));
            }
            sessionStorage.setItem('coinData', JSON.stringify(this.coinData));
          }, () => {
          });
        }
        let userId = getUrlParam('userId') || '';
        let token = getUrlParam('token') || '';
        if (userId && token) {
          setUser({userId, token});
        }
      });
    },
    components: {
      Toast,
      FullLoading
    }
  };
</script>
<style lang="scss">
  #app {
    overflow-x: hidden;
    /*background-color: #fff;*/
    -webkit-overflow-scrolling: auto; // 阻止元素滑动回弹
    width: 100%;
    height: 100%;
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
</style>
