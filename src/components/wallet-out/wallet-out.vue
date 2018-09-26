<template>
  <div class="wallet-out-wrapper" @click.stop>
    <header>
      <p>
      <i class='icon'></i>
      <span class='txt1'>转出</span>
      <router-link to='wallet-bill' class='txt2'>记录</router-link>
      </p>
    </header>
    <div class='main'>
      <p class='text'>
        <span>可用余额</span>
        <input type="text" class='dis' readonly value='0.000023 BTC'>
      </p>
      <p class='text'>
        <span>接受地址</span>
        <input type="text" placeholder="请输入付币地址或扫码">
        <i class='icon'></i>
      </p>
      <p class='text'>
        <span>转账数量</span>
        <input type="text" placeholder="请输入付币数量">
      </p>

    </div>
    <div class='plan'>
      <p class='text1'>
        <span class='txt1'>矿工费</span>
        <span class='txt2'>矿工费将在可用余额中扣除，余额不足将从转账金额扣除</span>
      </p>
      <div class='progress'>
        <div class='pro'>
        </div>
      </div>
      <p class='text2'>
        <span>慢</span>
        <span class='txt'>0.002 BTC</span>
        <span>快</span>
      </p>
    </div>
    <button>确认转账</button>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.wallet-out-wrapper {
    font-size: 0.32rem;
    color: #333;
    text-align: center;

    .icon {
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
    }

    header {
        line-height: .88rem;
        width: 100%;
        padding: 0 .3rem;
        background: #fff;
        box-shadow: inset 0 -.02rem 0 0 rgba(222,222,222,0.50);

        a {
          color: #333;
        }

        p {
        display: flex;
        justify-content: space-between;

        .icon {
            width: .2rem;
            height: .36rem;
            @include bg-image("返回");
            margin-top: .28rem;
        }

        .txt1 {
            font-size: .36rem;
            font-weight: bold;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }


        }
    }

    .main {
      width: 100%;
      padding: 0 .3rem;
      background: #fff;
      margin-bottom: .2rem;

      .text {
        width: 100%;
        height: 1rem;
        border-bottom: .01rem solid #E5E5E5;
        line-height: 1rem;
        display: flex;
        span {
          display: inline-block;
          float: left;
          width: 1.52rem;
          font-size: .28rem;
          color: #666;
          text-align: left;
        }
        .dis {
          font-size: .3rem;
          color: #d53d3d;
          line-height: 1rem;
          
        }

        input {
          width: 2.8rem;
          height: .42rem;
          margin-top: .3rem;
          font-size: .28rem;
          color: #999;
        }

        .icon {
          width: .36rem;
          height: .36rem;
          @include bg-image("扫一扫-黑色");
          margin-top: .34rem;
          margin-left: 1.78rem;
        }
      }
    }

    .plan {
      width: 100%;
      padding: 0 .3rem;
      height: 2.7rem;
      background: #fff;
      margin-bottom: .8rem;

      .text1 {
        padding-top: .34rem;
        padding-bottom: .82rem;
        span {
          display: inline-block;
          font-size: .28rem;
          color: #666;
        }
        .txt2 {
          width: 5.9rem;
          height: .48rem;
          background: #f6f6f6;
          line-height: .48rem;
          font-size: .22rem;
          color: #b5b5b5;
        }

        
      }

      .progress {
        width: 6.9rem;
        height: .08rem;
        background: #efefef;
        border-radius: 2rem;
        position: relative;
        margin-bottom: .38rem;
        .pro {
          width: .4rem;
          height: .4rem;
          border-radius: 50%;
          background: #d35d3d;
          box-shadow: 0 0 .12rem .02rem rgba(255,43,43,0.26);
          position: absolute;
          top: -.16rem;
        }

      }

      .text2 {
        display: flex;
        justify-content: space-between;
        font-size: .24rem;
        line-height: .33rem;
        color: #aaa;
        .txt {
          font-size: .32rem;
          color: #333;
          line-height: .45rem;
        }
      }
    }

    button {
      width: 6.9rem;
      height: .96rem;
      background: #d53d3d;
      border-radius: .08rem;
      font-size: .32rem;
      line-height: .96rem;
      color: #fff;
    }



}

</style>
