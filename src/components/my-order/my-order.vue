<template>
  <div class="order-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon' @click='goBack'></i>
        <span class='title'>我的订单</span>
        </p>
    </header>
    <div class='tabs'>
        <p>
            <span :class="[ show ? 'select' : '' ]" @click='starting'>进行中</span>
        </p>
        <p>
            <span :class="[ !show ? 'select' : '' ]" @click='ended'>已结束</span>
        </p>
    </div>
    <div v-show='show' class='list-start'>
        <div class='list' @click='goDetails'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>KOALA<span class='buy'>购买</span></p>
                <p class='txt2'>交易金额：500.08 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易进行中</p>
                <p class='txt2'>订单编号:1020</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>FUN MVP<span class='sell'>出售</span></p>
                <p class='txt2'>交易金额：100.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易进行中</p>
                <p class='txt2'>订单编号：2080</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>不懂<span class='sell'>出售</span></p>
                <p class='txt2'>交易金额：200.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易进行中</p>
                <p class='txt2'>订单编号：6666</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>Sting<span class='buy'>购买</span></p>
                <p class='txt2'>交易金额：100.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易进行中</p>
                <p class='txt2'>订单编号：2080</p>
            </div>
        </div>
    </div>

    <div v-show='!show' class='list-end'>
        <div class='list' @click='goDetails'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>KOALA<span class='buy'>购买</span></p>
                <p class='txt2'>交易金额：500.08 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易已结束</p>
                <p class='txt2'>订单编号:1020</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>FUN MVP<span class='sell'>出售</span></p>
                <p class='txt2'>交易金额：100.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易已结束</p>
                <p class='txt2'>订单编号：2080</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>不懂<span class='sell'>出售</span></p>
                <p class='txt2'>交易金额：200.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易已结束</p>
                <p class='txt2'>订单编号：6666</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>Sting<span class='buy'>购买</span></p>
                <p class='txt2'>交易金额：100.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易已结束</p>
                <p class='txt2'>订单编号：2080</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goDetails() {
      this.$router.push('order-details');
    },
    starting() {
      this.show = true;
    },
    ended() {
      this.show = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.order-wrapper {
  font-size: 0.28rem;
  color: #323232;
  overflow: auto;

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

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      @include bg-image("返回");
      float: left;
      margin-top: 0.31rem;
    }
  }

  .tabs {
    width: 100%;
    display: flex;
    line-height: 0.9rem;
    text-align: center;
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    margin-bottom: 0.21rem;

    p {
      flex: 1;
      font-size: 0.32rem;
      color: #666;
      span {
        padding-bottom: 0.22rem;
        
      }
      .select {
        border-bottom: 0.04rem solid #d53d3d;
        color: #d53d3d;
      }
    }
  }

  .list {
    width: 100%;
    padding: 0.4rem 0.3rem;
    background: #fff;
    display: flex;
    border-bottom: 0.01rem solid #ebebeb;

    .pic {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.22rem;
      .icon {
        width: 100%;
        height: 100%;
        @include bg-image("头像(4)");
      }
    }

    .text1 {
      .txt1 {
        margin-bottom: 0.27rem;
        font-weight: bold;
        span {
          display: inline-block;
          width: 0.6rem;
          font-size: 0.2rem;
          color: #fff;
          text-align: center;
          line-height: 0.28rem;
          border-radius: 0.04rem;
          margin-left: 0.33rem;
        }
        .buy {
          background: #d53d3d;
        }

        .sell {
          background: #0ec55b;
        }
      }

      .txt2 {
        font-size: 0.24rem;
        font-weight: bold;
      }
    }

    .text2 {
      text-align: right;
      margin-top: 0.04rem;
      position: absolute;
      right: 0.3rem;
      .txt1 {
        font-weight: bold;
        margin-bottom: 0.23rem;
      }
      .txt2 {
        font-size: 0.24rem;
        color: #666;
      }
    }
  }

  .list-start {
      .list {
          .text1 {
              .txt1 {
                  font-size: .3rem;
              }
          }
          .text2 {
              .txt1 {
                  color:#d53d3d;
              }
          }
      }
  }

  .list-end {
      .list {
          .text1 {
              .txt1 {
                  font-size: .28rem;
              }
          }
      }
  }

}
</style>
