<template>
  <div id="app">
    <div class="">
      <router-view></router-view>
    </div>
    <Toast :text="textMsg" ref="toast" />
  </div>
</template>

<script type="text/ecmascript-6">
//@touchmove.prevent
import Toast from 'base/toast/toast';
import {isLogin, getUrlParam} from './common/js/util';
  export default {
    data(){
      return {
        textMsg: ''
      }
    },
    created() {
      this.$router.beforeEach((to, from ,next) => {
        if(isLogin()){
          next();
        }else{
          if(to.path == '/' ||
            to.path == '/page' || 
            to.path == '/system-notice' || 
            to.path == '/about-platformIntroduced?ckey=about_us' || 
            to.path == '/trading' ||
            to.path == '/otc' ||
            to.path == '/login' ||
            to.path == '/registered' ||
            to.path == '/security-tradePassword'){
              next();
          }else{
            this.textMsg = '请先登录';
            this.$refs.toast.show();
            setTimeout(() => {
              next('/login');
            }, 1500);
          }
        }
      })
    },
    components: {
      Toast
    }
  };
</script>
<style lang="scss">
  #app{
    overflow-x: hidden;
    position: relative;
    background-color: #fff;
    -webkit-overflow-scrolling: auto;    // 阻止元素滑动回弹
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
  .hidden{
    display: none !important;
  }
  .show{
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
  .qx-btn{
    background-color: #fff;
    margin-left: 0.5rem;
    color: #d53d3d;
    border: 1px solid #d53d3d;
  }
</style>
