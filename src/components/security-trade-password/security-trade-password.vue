<template>
  <div class="password-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon'></i>
        <span class='title'>修改交易密码</span>
        </p>
    </header> -->
    <div class="main">
      <p class='text1' v-show="email == ''"><span>中国</span><span class='txt2'>+86</span><i class='icon'></i></p>
      <p v-show="mobile">{{mobile}}</p>
      <p v-show="email != ''">{{email}}</p>
      <p class='text3'>
        <input v-model="smsCaptcha" type="text" name="capt" v-validate="'required|capt'" placeholder="输入验证码">
        <i v-show="!show" class='icon'></i>
        <span v-show="show" @click="get" class='txt2'>获取验证码</span>
        <span v-show="!show" class='txt1'>重新获取({{time}}s)</span>
      </p>
      <p>
        <input type="password" v-model="newPayPwd" name="password" v-validate="'required|trade'" placeholder="密码6位-16位">
        <span v-show="errors.has('password')" class="error-tip password">{{errors.first('password')}}</span>
      </p>
      <p>
        <input type="password" v-model="surePwd" name="password1" v-validate="'required|trade'" placeholder="确认密码">
        <span v-show="errors.has('password1')" class="error-tip password1">{{errors.first('password1')}}</span>
      </p>
    </div>
    <div class="foot">
      <button @click="changeTradPwd">确 定</button>
    </div>
   
  <Toast :text="textMsg" ref="toast" />
  <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import {getUser, changeTradPwd, getSmsCaptcha1, getSmsCaptcha2} from '../../api/person';
import { setTradePwd } from 'api/user';
import {captValid, rePwdValid, tradeValid, getUserId, setTitle, getUrlParam} from '../../common/js/util';
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
      surePwd: '',
      istw: '',
      isLoading: false
    };
  },
  created() {
    this.istw = getUrlParam('istw');      // 0设置 1修改
    if(this.istw == '1'){
      setTitle('修改交易密码');
    }else{
      this.bizType = '805066'
      setTitle('设置交易密码');
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
        getSmsCaptcha1(this.bizType, this.mobile).then(data => {
          this.isLoading = false;
          let times = setInterval(() => {
            this.time --;
            if(this.time < 0){
              clearInterval(times);
              this.show = true;
            }
          }, 1000);
        }, () => {
          this.show = true;
          this.isLoading = false;
        });
      }
      if(this.email){
        getSmsCaptcha2(this.bizType, this.email).then(data => {
          this.isLoading = false;
          let times = setInterval(() => {
            this.time --;
            if(this.time < 0){
              clearInterval(times);
              this.show = true;
            }
          }, 1000);
        }, () => {
          this.show = true;
          this.isLoading = false;
        });
      }
    },
    changeTradPwd() {
      if(this.newPayPwd == '' || this.smsCaptcha == '' || this.surePwd == ''){
        this.textMsg = '请填写完整';
        this.$refs.toast.show();
        return;
      }
      if(this.newPayPwd !== this.surePwd){
        this.textMsg = '密码不一致，请重新输入';
        this.$refs.toast.show();
        return;
      }else{
        if(!this.errors.any()){
          this.isLoading = true;
          if(this.istw == '1'){
            changeTradPwd(this.newPayPwd, this.smsCaptcha, getUserId()).then((data) => {
              this.textMsg = '重置密码成功';
              this.$refs.toast.show();
              this.isLoading = false;
              setTimeout(() => {
                this.$router.push('mine');
              }, 1500);
            }, () => {
              this.isLoading = false;
            });
          }else{
            setTradePwd(this.newPayPwd, this.smsCaptcha).then(data => {
              this.textMsg = '设置密码成功';
              this.$refs.toast.show();
              this.isLoading = false;
              setTimeout(() => {
                this.$router.push('mine');
              }, 1500);
            }, () => {
              this.isLoading = false;
            })
          }
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
  }


}
</style>
