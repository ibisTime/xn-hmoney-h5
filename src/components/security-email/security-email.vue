<template>
  <div class="phonenumber-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>修改邮箱</span>
        </p>
    </header>
    <div class="main">
      <p>256545545@qq.com</p>
      <p><input type="text" placeholder="请输入新的邮箱"></p>
      <p class='text3'><input type="text" placeholder="请输入验证码"><i v-show="!show" class='icon'></i><span v-show="show" @click="get" class='txt2'>获取验证码</span><span v-show="!show" class='txt1'>重新获取(60s)</span></p>

    </div>
    <div class="foot">
      <button>确 定</button>
    </div>
    <div class='prom'>
      <i class='icon'></i><span>请联系客服热线：289-3760-0000 进行修改</span>
    </div>

    
    <div v-show="show2" class='promit'>
      <div class="cont">
        <div class='text'>
          <p class='txt1'>获取验证码失败</p>
          <p class='txt2'>请联系客服热线</p>
          <p class='txt3'>289-3760-0000</p>
        </div>
        <p class='yes' @click='show2 = !show2'>确 定</p>
      </div>
    </div>
   

  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      show2: false
    };
  },
  methods: {
    get() {
      this.show = false;
    },
    promi() {
      this.show2 = true;
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

  .prom {
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

  .promit {
    width: 100%;
    height: 100%;
    top: 0;
    text-align: center;
    position: fixed;
    background: rgba(0,0,0,.5);
    .cont {
      width: 6.6rem;
      height: 4.21rem;
      background: #fff;
      border-radius: .08rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 4rem;
      .text {
        font-weight: bold;
        height: 3.3rem;
        border-bottom: .01rem solid #d8d8d8;
        .txt1 {
          font-size: .38rem;
          line-height: .54rem;
          padding: .69rem 0 .36rem;
        }
        .txt2, .txt3 {
          font-size: .36rem;
          line-height: .54rem;
        }
      }
      .yes {
        line-height: .9rem;
        font-size: .32rem;
        color: #d53d3d;
      }
    }
  }


}
</style>
