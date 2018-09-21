<template>
  <div class="top-up-wrapper" @click.stop>
    <header>
      <p>
        <i class='icon'></i>
        <span v-show="show" class='txt1'>购买X币</span>
        <span v-show="!show" class='txt1'>出售X币</span>
        <router-link to='wallect-orderRecord' class='icon ico1'></router-link>
      </p>
    </header>
    <div class='tabs'>
        <p>
            <span :class="[ show ? 'select' : '' ]" @click='buy'>买入</span>
        </p>
        <p>
            <span :class="[ !show ? 'select' : '' ]" @click='sell'>卖出</span>
        </p>
    </div>
    <div class='public'>
        <p class='text1'>自己币种（X）</p>
        <p class='text2'>
            <span class='txt1'>单价：<i class='txt2'>￥</i></span>
            <span class='txt3'>44315</span>
        </p>
        <i class='icon'></i>
    </div>

    <div class='main'> 
        <!-- 买入显示内容 -->
        <div v-show='show' class='area'>
            <p class='tab'>
                <span :class="[ show ? 'active text1' : 'text1' ]" @click='buy'>金额</span>
                <span :class="[ !show ? 'active text2' : 'text2' ]" @click='sell'>数量</span>
            </p>
            <p class='inp'>
                <input type="text" placeholder="输入购买金额">
                <span class='txt1'>CNY</span>
            </p>
            <p class='money'>
                <span class='txt1'>≈0.0000 X</span>
                <span class=txt2>手续费：<i class=txt3>0.2%</i></span>
            </p>
        </div>
        <!-- 卖出显示内容 -->
        <div v-show="!show" class='area'>
            <p class='tab'>
                <span :class="[ show ? 'active text1' : 'text1' ]" @click='buy'>金额</span>
                <span :class="[ !show ? 'active text2' : 'text2' ]" @click='sell'>数量</span>
                <span class='text3'>可用<i>0.000000</i>X</span>
            </p>
            <p class='inp'>
                <input type="text" placeholder="输入卖出数量">
                <span class='txt1'><i class='txt'>x</i>全部</span>
            </p>
            <p class='money'>
                <span class='txt1'>≈0.0000 CNY</span>
                <span class=txt2>手续费：<i class=txt3>0.2%</i></span>
            </p>
        </div>

        <div class='pay'>
            <span>付款方式</span>
            <span class='txt2'>
                <i class='icon icon1'></i>
                支付宝
                <i class='icon icon2'></i>
            </span>
        </div>
        <button v-show='show'>确认购买</button>
        <button v-show='!show'>确认出售</button>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    buy() {
      this.show = true;
    },
    sell() {
      this.show = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.top-up-wrapper {
  font-size: 0.32rem;
  color: #333;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    p {
      .icon {
        width: 0.2rem;
        height: 0.36rem;
        @include bg-image("返回");
        margin-top: 0.28rem;
        float: left;
      }

      .ico1 {
        width: .26rem;
        height: .3rem;
        @include bg-image("账单");
        float: right;
      }

      .txt1 {
        font-size: 0.36rem;
        font-weight: bold;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .tabs {
    width: 100%;
    display: flex;
    line-height: 0.9rem;
    text-align: center;
    width: 100%;
    background: #fff;
    margin-bottom: 0.2rem;

    p {
      flex: 1;
      font-size: 0.32rem;
      color: #989898;
      span {
        display: inline-block;
        width: 1rem;
      }
      .select {
        border-bottom: 0.04rem solid #d53d3d;
        color: #d53d3d;
      }
    }
  }

  .public {
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    position: relative;
    margin-bottom: 0.2rem;
    text-align: center;

    .text1 {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #323232;
      font-weight: bold;
      padding-top: 0.57rem;
      padding-bottom: 0.18rem;
    }

    .text2 {
      padding-bottom: 0.58rem;

      .txt1 {
        font-size: 0.24rem;
        line-height: 0.33rem;
        color: #999;

        .txt2 {
          color: #000;
          font-weight: bold;
        }
      }

      .txt3 {
        font-size: 0.48rem;
        font-weight: bold;
        line-height: 0.67rem;
      }
    }

    .icon {
      width: 0.16rem;
      height: 0.26rem;
      @include bg-image("更多");
      position: absolute;
      top: 1.07rem;
      right: 0.3rem;
    }
  }

  .main {
    .area {
      width: 100%;
      background: #fff;
      margin-bottom: 0.2rem;
      .tab {
        width: 100%;
        padding: 0 .3rem 0 0.78rem;
        line-height: 0.87rem;
        box-shadow: 0 0.01rem 0 0 #ebebeb;
        background: rgba(242, 242, 242, 0);
        color: #999;
        margin-bottom: 0.24rem;
        .text1 {
          margin-right: 1.25rem;
        }
        .text3 {
            float: right;
            font-size: .28rem;
            color: #999;
            i {
                color: #151515;
                margin: 0 .1rem;
            }
            
        }
        .active {
          color: #d53d3d;
          padding-bottom: 0.22rem;
          border-bottom: 0.04rem solid #d53d3d;
        }
      }
      .inp {
        width: 92%;
        margin: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        line-height: 1.2rem;
        border-bottom: .01rem solid #ebebeb;

        input {
          color: #999;
        }
        .txt1 {
          font-weight: bold;
          .txt {
              color: #999;
              padding-right: .1rem;
              margin-right: .1rem;
              border-right: .01rem solid #e5e5e5;
          }
        }
      }

      .money {
        width: 100%;
        padding: 0 0.3rem;
        line-height: 0.81rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.28rem;

        .txt1 {
          color: #343434;
        }
        .txt2 {
          color: #999;
        }
        .txt3 {
          color: #161616;
        }
      }
    }

    .pay {
      width: 100%;
      padding: 0 0.3rem;
      background: #fff;
      line-height: 1.1rem;
      display: flex;
      justify-content: space-between;
      color: #323232;
      font-weight: bold;
      .txt2 {
        font-size: 0.28rem;
      }
      .icon1 {
        width: 0.48rem;
        height: 0.46rem;
        @include bg-image("支付宝");
        vertical-align: middle;
        margin-right: 0.12rem;
      }
      .icon2 {
        width: 0.17rem;
        height: 0.26rem;
        @include bg-image("更多");
        vertical-align: middle;
        margin-left: 0.12rem;
      }
    }

    button {
      width: 6.9rem;
      height: 1rem;
      margin: 1.05rem 0.3rem 0;
      background: #d53d3d;
      border-radius: 0.08rem;
      font-weight: bold;
      color: #fff;
      font-size: 0.32rem;
      line-height: 1.1rem;
    }
  }
}
</style>
