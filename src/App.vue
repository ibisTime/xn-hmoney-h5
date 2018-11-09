<template>
  <div id="app">
    <div class="all-content">
      <router-view></router-view>
    </div>
    <Toast :text="textMsg" ref="toast"/>
    <div
      class="tobuy"
      id="touchDemo"
      @click="toBuy"
      ref="touchDemo"
      @touchstart.stop="fbTouchStartFn"
      @touchmove.stop="fbTouchMoveFn"
      @touchend.stop="fbTouchEndFn"
      v-show="showFlag"
    >
      <div >去购买FMVP</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //@touchmove.prevent
  import Toast from 'base/toast/toast';
  import {isLogin, getUrlParam, isUnDefined} from './common/js/util';
  import {messageMixin} from 'common/js/message-mixin';
  import {getBbListData} from 'api/otc';

  export default {
    mixins: [messageMixin],
    name: 'app',
    data() {
      return {
        textMsg: '',
        coinData: {},
        position: {x: '', y: ''},
        flags: false,
        demoX: '',
        demoY: '',
        moveX: '',
        moveY: '',
        xPum: '',
        yPum: '',
        touchDemo: '',
        docuWidth: '',
        docuHeight: '',
        showFlag: true
      }
    },
    beforeCreate(){
      let that = this;
      window.onload = function(){
        let href = location.href;
        getBbListData().then(data => {
          for(let i = 0; i < data.length; i ++){
            let obj = {
              ...data[i],
              unit: '1e' + data[i].unit
            };
            that.coinData[data[i].symbol] = JSON.parse(JSON.stringify(obj));
          }
          sessionStorage.setItem('coinData', JSON.stringify(that.coinData));
          that.isLoading = false;
        }, () => {
          that.isLoading = false;
        });
        if(href.search(/page|system-notice|about-platformIntroduced\?ckey=about_us|trading|otc|login|registered|security-loginPassword/) == -1){
          if(!isLogin()){
            that.$router.push('/login');
            return;
          }
        };
      }
    },
    created() {
      this.$router.beforeEach((to, from, next) => {
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
            this.isLoading = false;
          }, () => {
            this.isLoading = false;
          });
        }

        if (isLogin()) {
          this.tencentLogin();
          next();
        } else {
          if (to.path == '/' ||
            to.path == '/page' ||
            to.path == '/shop-usedCar' ||
            to.path == '/system-notice' ||
            to.path == '/about-platformIntroduced?ckey=about_us' ||
            to.path == '/trading' ||
            to.path == '/otc' ||
            to.path == '/login' ||
            to.path == '/registered' ||
            to.path == '/security-loginPassword') {
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
    },
    mounted() {
      this.$refs.touchDemo.style.right = '0.5rem';
      this.$refs.touchDemo.style.bottom = '1rem';
      this.$refs.touchDemo.style.left = '';
      this.$refs.touchDemo.style.top = '';
    },
    components: {
      Toast
    },
    methods: {
      // 实现 发布 拖动
      fbTouchStartFn(){
        this.touchDemo = this.$refs.touchDemo;
        this.flags = true;
        let touch = '';
        if(event.touchs){
          touch = event.touchs[0];
        }else{
          touch = event.changedTouches[0];
        }

        this.docuWidth = document.body.clientWidth - 150;
        this.docuHeight = document.body.clientHeight - 50;
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.demoX = this.touchDemo.offsetLeft;
        this.demoY = this.touchDemo.offsetTop;
      },
      fbTouchMoveFn(){
        event.preventDefault();
        if(this.flags){
          var touch ;
          if(event.touches){
              touch = event.touches[0];
          }else {
              touch = event.changedTouches[0];
          }
          this.moveX = touch.clientX - this.position.x;
          this.moveY = touch.clientY - this.position.y;
          this.xPum = this.demoX + this.moveX;
          this.yPum = this.demoY + this.moveY;

          // 判断边界
          if(this.xPum > this.docuWidth){
            this.xPum = this.docuWidth;
          }
          if(this.xPum < 0){
            this.xPum = 0;
          }
          if(this.yPum > this.docuHeight){
            this.yPum = this.docuHeight;
          }
          if(this.yPum < 0){
            this.yPum = 0;
          }

          this.touchDemo.style.left = this.xPum / 50 + 'rem';
          this.touchDemo.style.top = this.yPum / 50 + 'rem';
        }
      },
      fbTouchEndFn(){
        this.flags = false;
      },
      toBuy(){
        this.$router.push('wallet-top-up?type=buy');
      }
    }
  };
</script>
<style lang="scss">
  #app {
    overflow-x: hidden;
    /*background-color: #fff;*/
    -webkit-overflow-scrolling: auto; // 阻止元素滑动回弹
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
