<template>
  <div class="password-wrapper" @click.stop>
    <div class="main">
      <p v-if="isEmail">
        <input type="text" v-model="config.mobile" name="emailPhone" v-validate="'required|emailPhone'" :placeholder="$t('exitLoginPassword.subject.sryxsj')">
        <span v-show="errors.has('emailPhone')" class="error-tip">{{errors.first('emailPhone')}}</span>
      </p>
      <p class='text3' v-if="(mobile == '' || email == '') && isEmail">
        <input v-model="smsCaptcha" type="text" name="capt" v-validate="'required|capt'" :placeholder="$t('exitLoginPassword.subject.yzm')">
        <i v-show="!show" class='icon'></i>
        <span v-show="show" @click="get" class='txt2'>{{$t('exitLoginPassword.subject.hqyzm')}}</span>
        <span v-show="!show" class='txt1'>{{$t('exitLoginPassword.subject.cxhq')}}({{time}}s)</span>
      </p>
      <p>
        <input class="item-input"  type="password" v-model="newPayPwd" name="password" v-validate="'required'" :placeholder="!isEmail ? $t('exitLoginPassword.subject.jmm') : $t('exitLoginPassword.subject.ywsz')">
        <span v-show="errors.has('password')" class="error-tip password">{{errors.first('password')}}</span>
      </p>
      <p v-show="!isEmail">
        <input class="item-input"  type="password" v-model="sureNewPwd" name="password2" v-validate="'required|password'" :placeholder="$t('exitLoginPassword.subject.xmm')">
        <span v-show="errors.has('password2')" class="error-tip password2">{{errors.first('password2')}}</span>
      </p>
      <p>
        <input class="item-input"  type="password" v-model="surePwd" name="password1" v-validate="'required|password'" :placeholder="$t('exitLoginPassword.subject.qrmm')">
        <span v-show="errors.has('password1')" class="error-tip password1">{{errors.first('password1')}}</span>
      </p>
    </div>
    <div class="foot">
      <button @click="changeLoginPwd">{{$t('exitLoginPassword.subject.qd')}}</button>
    </div>

  <Toast :text="textMsg" ref="toast" />
  <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import {getUser, changeLoginPwd, getSmsCaptchaPhone, getSmsCaptchaEmail} from '../../api/person';
import {getUserId, setTitle, clearUser} from '../../common/js/util';
import { resetPwd } from 'api/user';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      isLoading: true,
      time: 60,
      textMsg: '',
      show: true,
      bizType: '805063',
      mobile: '',
      email: '',
      smsCaptcha: '',
      newPayPwd: '',
      surePwd: '',
      config: {
        mobile: '',
        newLoginPwd: '',
        smsCaptcha: ''
      },
      isEmail: true,
      sureNewPwd: ''
    };
  },
  created() {
    if(getUserId()){
      setTitle(this.$t('exitLoginPassword.subject.xgdlmm'));
      getUser().then((data) => {
        if(data.mobile){
          this.isEmail = false;
          this.mobile = data.mobile;
        }else{
          if(data.email){
            this.isEmail = false;
            this.email = data.email;
          }
        }
      });
    }else{
      setTitle(this.$t('exitLoginPassword.subject.zhmm'));
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  methods: {
    get() {
      this.show = false;
      let mobile, email;
      this.isLoading = true;
      if((this.config.mobile).match(/@/)){
        email = this.config.mobile;
        getSmsCaptchaEmail({
          bizType: this.bizType,
          email
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
          this.isLoading = false;
        });
      }else{
        mobile = this.config.mobile;
        getSmsCaptchaPhone({
          bizType: this.bizType,
          mobile
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
          this.isLoading = false;
        });
      }
    },
    changeLoginPwd() {
      if(!this.isEmail){
        if(this.sureNewPwd !== this.surePwd){
          this.textMsg = this.$t('exitLoginPassword.subject.mmbyz');
          this.$refs.toast.show();
          return;
        }
        if(!this.errors.any()){
          this.isLoading = true;
          changeLoginPwd(this.newPayPwd, this.surePwd).then((data) => {
            this.isLoading = false;
            this.textMsg = this.$t('common.czcg');
            this.$refs.toast.show();
            setTimeout(() => {
              // clearUser();
              this.$router.push('mine');
            }, 1500);
          }, () => {
            this.isLoading = false;
          });
        }
      }else{
        if(this.newPayPwd != this.surePwd){
          this.textMsg = this.$t('exitLoginPassword.subject.mmbyz');
          this.$refs.toast.show();
          return;
        }
        if(!this.errors.any()){
          this.isLoading = true;
          this.config.newLoginPwd = this.newPayPwd;
          this.config.smsCaptcha = this.smsCaptcha;
          resetPwd(this.config).then(data => {
            this.isLoading = false;
            this.textMsg = this.$t('exitLoginPassword.subject.czmmcg');
            this.$refs.toast.show();
            setTimeout(() => {
              clearUser();
              this.$router.push('login');
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
  height: 12rem;
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

    .item-input{
      width: 100%;
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
