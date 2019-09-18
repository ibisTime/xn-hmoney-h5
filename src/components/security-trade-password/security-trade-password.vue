<template>
  <div class="password-wrapper" @click.stop>
    <div class="main">
      <!--<p class='text1' v-if="email == ''"><span>{{$t('securityTradePassword.subject.zg')}}</span><span class='txt2'>+86</span><i class='icon'></i></p>-->
      <p v-if="mobile">{{mobile}}</p>
      <p v-if="email != ''">{{email}}</p>
      <p class='text3'>
        <input v-model="smsCaptcha" type="text" name="capt" v-validate="'required|capt'" :placeholder="$t('securityTradePassword.subject.sryzm')" autocomplete="off">
        <span v-show="errors.has('smsCaptcha')" class="error-tip smsCaptcha">{{errors.first('smsCaptcha')}}</span>
        <i v-show="!show" @click="smsCaptcha = ''" class='icon'></i>
        <span v-show="show" @click="get" class='txt2'>{{$t('securityTradePassword.subject.hqyzm')}}</span>
        <span v-show="!show" class='txt1'>{{$t('securityTradePassword.subject.cxhq')}}({{time}}s)</span>
      </p>
      <p>
        <input class="item-input" type="password" v-model="newPayPwd" name="password" v-validate="'required|trade'" :placeholder="$t('securityTradePassword.subject.szjymm')" autocomplete="off">
        <span v-show="errors.has('password')" class="error-tip password">{{errors.first('password')}}</span>
      </p>
    </div>
    <div class="foot">
      <button @click="changeTradPwd">{{$t('securityTradePassword.subject.qd')}}</button>
    </div>

  <Toast :text="textMsg" ref="toast" />
  <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import {getUser, changeTradPwd, getSmsCaptchaPhone, getSmsCaptchaEmail} from '../../api/person';
import { setTradePwd } from 'api/user';
import {getUserId, setTitle, getUrlParam} from '../../common/js/util';
import { resetPwd } from 'api/user';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';
export default {
  data() {
    return {
      time: 60,
      textMsg: '',
      show: true,
      bizType: '805067',
      mobile: '',
      email: '',
      smsCaptcha: '',
      newPayPwd: '',
      // surePwd: '',
      istw: '',
      isLoading: false
    };
  },
  created() {
    this.istw = getUrlParam('istw');      // 0设置 1修改
    if(this.istw == '1'){
      setTitle(this.$t('securityTradePassword.subject.xgjymm'));
    }else{
      this.bizType = '805066'
      setTitle(this.$t('securityTradePassword.subject.szjymm'));
    }
    getUser().then((data) => {
      if(data.mobile){
        this.mobile = data.mobile;
      }else{
        if(data.email){
          this.email = data.email;
        }
      }
    });
  },
  methods: {
    get() {
      this.show = false;
      this.isLoading = true;
      if(this.mobile){
        getSmsCaptchaPhone({
            bizType: this.bizType,
            mobile: this.mobile
        }).then(data => {
          this.isLoading = false;
          let times = setInterval(() => {
            this.time --;
            if(this.time < 0){
              clearInterval(times);
              this.time = 60;
              this.show = true;
            }
          }, 1000);
        }, () => {
          this.time = 60;
          this.show = true;
          this.isLoading = false;
        });
      }
      if(this.email){
        getSmsCaptchaEmail({
          bizType: this.bizType,
          email: this.email
        }).then(data => {
          this.isLoading = false;
          let times = setInterval(() => {
            this.time --;
            if(this.time < 0){
              clearInterval(times);
              this.time = 60;
              this.show = true;
            }
          }, 1000);
        }, () => {
          this.time = 60;
          this.show = true;
          this.isLoading = false;
        });
      }
    },
    changeTradPwd() {
      if(this.newPayPwd == '' || this.smsCaptcha == ''){
        this.textMsg = this.$t('securityTradePassword.subject.txwz');
        this.$refs.toast.show();
        return;
      }
      if(this.errors.items.length === 0){
        this.isLoading = true;
        if(this.istw == '1'){
          changeTradPwd(this.newPayPwd, this.smsCaptcha, getUserId()).then((data) => {
            this.textMsg = this.$t('securityTradePassword.subject.czcg');
            this.$refs.toast.show();
            this.isLoading = false;
            setTimeout(() => {
              const goBack = sessionStorage.getItem('paw_go_back') || 'mine';
              this.$router.push(goBack);
            }, 1500);
          }, () => {
            this.isLoading = false;
          });
        }else{
          setTradePwd(this.newPayPwd, this.smsCaptcha).then(data => {
            this.textMsg = this.$t('securityTradePassword.subject.szcg');
            this.$refs.toast.show();
            this.isLoading = false;
            setTimeout(() => {
              const goBack = sessionStorage.getItem('paw_go_back') || 'mine';
              this.$router.push(goBack);
            }, 1500);
          }, () => {
            this.isLoading = false;
          })
        }
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

.password-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;
  height: 100%;
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
      background-image: url('./fh.png');
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
      position: relative;
    }
    input {
      height: 1rem;
    }
    input[attr='placeholder'] {
      color: #ccc;
    }
    .item-input{
      width: 100%;
    }
    .text1 {
      .txt2 {
        padding: 0 .24rem 0 .34rem;
      }
      .icon {
        width: .18rem;
        height: .14rem;
        background-image: url('./xl.png');
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
          background-image: url('./sc.png');
          margin-top: .29rem;
          margin-right: -.2rem;
      }
    }
  }

  .foot {
    width: 100%;
    text-align: center;
    margin-top: 1.2rem;
    button {
      width: 6.28rem;
      height: 1rem;
      background: #d53d3d;
      border-radius: .08rem;
      font-size: .32rem;
      color: #fff;
    }
  }

  .error-tip{
    color: #d53d3d;
    font-size: 0.26rem;
    position: absolute;
    right: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
  }


}
</style>
