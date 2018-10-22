<template>
  <div class="password-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon'></i>
        <span class='title'>修改交易密码</span>
        </p>
    </header> -->
    <div class="main">
      <p class='text1'><span>中国</span><span class='txt2'>+86</span><i class='icon'></i></p>
      <p v-show="mobile">{{mobile}}</p>
      <p v-show="!mobile"><input type="number" v-model="config.mobile" placeholder="手机号"></p>
      <p class='text3'><input v-model="smsCaptcha" type="text" pattern="^\d{4}$" placeholder="输入验证码"><i v-show="!show" class='icon'></i><span v-show="show" @click="get" class='txt2'>获取验证码</span><span v-show="!show" class='txt1'>重新获取({{time}}s)</span></p>
      <p><input type="password" v-model="newPayPwd" pattern="^\d{6,}$" placeholder="新密码(不少于6位)"></p>
      <p><input type="password" v-model="surePwd" pattern="^\d{6,}$" placeholder="确认密码"></p>
    </div>
    <div class="foot">
      <button @click="changeTradPwd">确 定</button>
    </div>
   
  <Toast :text="textMsg" ref="toast" />
  </div>
</template>
<script>
import {getUser, changeTradPwd, getSmsCaptcha1} from '../../api/person';
import {captValid, rePwdValid, tradeValid, getUserId, setTitle} from '../../common/js/util';
import { resetPwd } from 'api/user';
import Toast from 'base/toast/toast';
export default {
  data() {
    return {
      time: 60,
      textMsg: '',
      show: true,
      bizType: '805067',
      mobile: '',
      smsCaptcha: '',
      newPayPwd: '',
      surePwd: '',
      config: {
        mobile: '',
        newLoginPwd: '',
        smsCaptcha: ''
      }
    };
  },
  created() {
    if(getUserId()){
      setTitle('修改交易密码');
      getUser().then((data) => {
        this.mobile = data.mobile;
      });
    }else{
      setTitle('找回密码');
    }
  },
  methods: {
    get() {
      this.show = false;
      let mobile = this.mobile;
      if(!this.mobile){
        this.bizType = '805063';
        mobile = this.config.mobile;
      }
      getSmsCaptcha1(this.bizType, mobile).then(data => {
        let times = setInterval(() => {
          this.time --;
          if(this.time < 0){
            clearInterval(times);
            this.show = true;
          }
        }, 1000);
      });
    },
    changeTradPwd() {
        if(tradeValid(this.newPayPwd).err === 0 && tradeValid(this.surePwd).err === 0 && rePwdValid(this.newPayPwd, this.surePwd).err === 0) {
          if(this.mobile){
            changeTradPwd(this.newPayPwd, this.smsCaptcha, getUserId()).then((data) => {
              this.textMsg = '操作成功';
              this.$refs.toast.show();
              setTimeout(() => {
                this.$router.push('mine');
              }, 1500);
            });
          }else{
            this.config.newLoginPwd = this.newPayPwd;
            this.config.smsCaptcha = this.smsCaptcha;
            resetPwd(this.config).then(data => {
              this.textMsg = '重置密码成功';
              this.$refs.toast.show();
              setTimeout(() => {
                this.$router.push('login');
              }, 1500);
            })
          }
        } else {
          this.textMsg = '密码不一致，请重新输入';
          this.$refs.toast.show();
        }
    }
  },
  components: {
    Toast
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

  


}
</style>
