<template>
  <div class="google" @click.stop>
    <div class="main">
        <p>
          <input type="text" disabled v-model="config.secret" :placeholder="$t('securityGoogle.subject.mm')">
        </p>
        <p>
          <input type="text" v-model="config.googleCaptcha" :placeholder="$t('securityGoogle.subject.ggyzm')">
        </p>
        <p class='text3'>
          <input v-model="config.smsCaptcha" type="text" :placeholder="$t('securityGoogle.subject.sjyzm')">
          <span v-show="show" @click="get" class='txt2'>
              {{$t('securityGoogle.subject.hqyzm')}}
          </span>
          <span v-show="!show" class='txt1'>
              {{$t('securityGoogle.subject.cxhq')}}({{time}}s)
          </span>
        </p>
    </div>
    <div class="foot">
      <button @click="bindPhone">{{$t('securityGoogle.subject.qd')}}</button>
    </div>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import {getUserId, setTitle, getUrlParam} from 'common/js/util';
import {getSmsCaptchaPhone, openGoogle, closeGoogle, getGooglePwd} from 'api/person';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      textMsg: '',
      isLoading: false,
      show: true,
      time: 60,
      mobile: '',
      bizType: '',             // 开启：805088    关闭：805089
      googleAuthFlag: '',
      config: {
          googleCaptcha: '',
          smsCaptcha: '',
          secret: ''
      }
    };
  },
  created() {
      setTitle(this.$t('securityGoogle.subject.ggrz'));
      this.googleAuthFlag = getUrlParam('google');
      this.mobile = getUrlParam('mobile');
      if(this.googleAuthFlag == 'false'){
          this.bizType = 805088;
      }else{
          this.bizType = 805089;
      }
      getGooglePwd().then(data => {
          this.config.secret = data.secret;
      })
  },
  methods: {
    get() {
      this.show = false;
      this.isLoading = true;
      getSmsCaptchaPhone({
        bizType: this.bizType,
        mobile: this.mobile
      }).then(data => {
          this.isLoading = false;
          this.time --;
          let inTime = setInterval(() => {
              this.time --;
              if(this.time < 0){
                  this.show = true;
                  clearInterval(inTime);
              }
          }, 1000);
      }, () => {
        this.show = true;
      });
    },
    bindPhone() {
      this.isLoading = true;
      if(this.googleAuthFlag == 'false'){
          // 开启谷歌认证
          openGoogle(this.config).then(data => {
              this.isLoading = false;
              this.textMsg = this.$t('securityGoogle.subject.kqcg');
              this.$refs.toast.show();
              setTimeout(() => {
                  this.$router.push('/security-center');
              }, 1500);
          }, () => {
              this.isLoading = false;
          })
      }else{
          // 关闭谷歌认证
          delete this.config.secret;
          closeGoogle(this.config).then(data => {
              this.isLoading = false;
              this.textMsg = this.$t('securityGoogle.subject.gbcg');
              this.$refs.toast.show();
              setTimeout(() => {
                  this.$router.push('/security-center');
              }, 1500);
          }, () => {
              this.isLoading = false;
          })
      }
    }
  },
  components: {
      Toast,
      FullLoading
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.google {
  font-size: 0.28rem;
  color: #333;
  width: 100%;
  background: #fff;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    background: #fff;
    width: 100%;
    padding: 0 0.3rem;
    margin-bottom: 0.4rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      background-image: url('./fhui.png');
      float: left;
      margin-top: 0.31rem;
    }
  }

  .main {
    width: 100%;
    padding: 0 .3rem;
    font-size: .32rem;
    color: #333;
    font-weight: bold;
    p {
      height: 1.1rem;
      line-height: 1.1rem;
      margin-bottom: .1rem;
      border-bottom: .01rem solid #e3e3e3;
    }
    input {
      height: 1rem;
      width: 80%;
      background-color: #fff;
    }
    input[attr='placeholder'] {
      color: #ccc;
    }
    .text1 {
      .txt2 {
        padding: 0 .24rem 0 .34rem;
      }
      .icon {
        width: .18rem;
        height: .14rem;
        background-image: url('./xiala.png');
      }
    }
    .text3 {
      display: flex;
      height: 1.1rem;
      justify-content: space-between;
      .txt2 {
        display: inline-block;
        width: 1.68rem;
        height: .52rem;
        margin-top: .24rem;
        line-height: .52rem;
        border: .02rem solid #d53d3d;
        border-radius: .04rem;
        font-size: .22rem;
        text-align: center;
        color: #d53d3d;
      }
      .txt1 {
        display: inline-block;
        width: 1.68rem;
        height: .52rem;
        margin-top: .24rem;
        line-height: .52rem;
        border-radius: .04rem;
        background: #ccc;
        font-size: .22rem;
        text-align: center;
        color: #fff;
      }
      .icon {
          width: .34rem;
          height: .34rem;
          background-image: url('./shanc.png');
          margin-top: .29rem;
          margin-right: -.2rem;
      }
    }
  }

  .foot {
    width: 100%;
    text-align: center;
    margin-top: 1.2rem;
    margin-bottom: 2.43rem;
    button {
      width: 6.28rem;
      height: 1rem;
      background: #d53d3d;
      border-radius: .08rem;
      font-size: .32rem;
      color: #fff;
    }
  }

  .promit {
    width: 100%;
    text-align: center;
    font-size: .26rem;
    color: #676767;
    padding-bottom: .76rem;
    .icon {
      width: .26rem;
      height: .26rem;
      background-image: url('./ts.png');
      vertical-align: middle;
      margin-right: .13rem;
    }
  }
}
</style>
