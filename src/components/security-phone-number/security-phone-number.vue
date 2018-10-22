<template>
  <div class="phonenumber-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>绑定手机号</span>
        </p>
    </header>
    <div class="main">
      <p><input type="text" v-model="mobile" placeholder="请输入手机号"></p>
      <p class='text3'><input v-model="smsCaptcha" type="text" placeholder="请输入验证码"><i v-show="!show" class='icon'></i><span v-show="show" @click="get" class='txt2'>获取验证码</span><span v-show="!show" class='txt1'>重新获取(60s)</span></p>

    </div>
    <div class="foot">
      <button @click="bindPhone">确 定</button>
    </div>
    <div class='promit'>
      <i class='icon'></i><span>请联系客服热线：289-3760-0000 进行修改</span>
    </div>
  </div>
</template>
<script>
import {getUserId} from '../../common/js/util';
import {bindingPhone, getSmsCaptcha1} from '../../api/person';

export default {
  data() {
    return {
      show: true,
      mobile: '',
      smsCaptcha: '',
      bizType: '805060',
    };
  },
  methods: {
    get() {
      this.show = false;
      getSmsCaptcha1(this.bizType, this.mobile).then(data => {
      });
    },
    bindPhone() {
      bindingPhone(1, this.mobile, this.smsCaptcha, getUserId()).then(data => {
        this.$router.push('security-center');
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.phonenumber-wrapper {
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
