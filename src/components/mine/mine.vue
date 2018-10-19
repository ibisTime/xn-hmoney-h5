<template>
  <div class="mine-wrapper" @click.stop>
    <div class="mine-header">
      <h4>我的</h4>
      <div class="my">
        <div class="pic"></div>
        <div class="h-text">
          <p class="name">{{data.nickname}}</p>
          <p class="intro">交易 {{data.userStatistics.jiaoYiCount}} | 好评率 {{data.userStatistics.beiPingJiaCount != 0 ?(data.userStatistics.beiHaoPingCount / data.userStatistics.beiPingJiaCount) * 100 : '0'}}% | 信用 {{data.userStatistics.beiXinRenCount}}</p>
        </div>
      </div>
    </div>
    <div class="mine-main">
      <div class="trading item">
        <router-link to="wallet-top-up?type=buy" class="buy item-0">
          <i></i>
          <span>我要购买</span>
        </router-link>
        <router-link to="wallet-top-up?type=sell" class="sell item-1">
          <i></i>
          <span>我要出售</span>
        </router-link>
      </div>
      <div class="item item-Wrap item1 hidden">
        <router-link to="my-currency" class="item-2">
          <div class='box'>
          <i></i>
          <span class="txt">选择货币</span>
          <span class='icon'></span>
          </div>
        </router-link>
      </div>
      <div class="item item-Wrap">
        <router-link to="my-advertising" class="item-3">
          <div class='box'>
          <i></i>
          <p class='line'>
          <span class='txt1'>我的广告</span>
          <span class='icon'></span>
          </p>
          </div>
        </router-link>
      </div>
      <div class="item item-Wrap ite4">
        <router-link to="my-order" class="item-4">
          <div class='box'>
          <i></i>
          <span class="txt">我的订单</span>
          <span class='icon'></span>
          </div>
        </router-link>
      </div>
      <div class="item item-Wrap">
        <router-link to="my-guest" class="item-5">
          <div class='box'>
          <i></i>
          <p class='line'>
          <span class='txt1'>交易对手</span>
          <span class='icon'></span>
          </p>
          </div>
        </router-link>
      </div>
      <div class="item item-Wrap ite4">
        <router-link to="my-inviteFriends" class="item-6">
          <div class='box'>
          <i></i>
          <span class="txt">邀请好友</span>
          <span class='icon'></span>
          </div>
        </router-link>
      </div>
      <div class="item item-Wrap">
        <router-link to="security-center" class="item-7">
          <div class='box'>
          <i></i>
          <p class='line'>
          <span class='txt1'>安全中心</span>
          <span class='icon'></span>
          </p>
          </div>
        </router-link>
      </div>
      <div class="item item-Wrap ite4">
        <router-link to="my-aboutUs" class="item-8">
          <div class='box'>
          <i></i>
          <span class="txt">关于我们</span>
          <span class='icon'></span>
          </div>
        </router-link>
      </div>

    </div>
    <div style="height: 1.1rem;"></div>
    <Footer></Footer>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import Footer from 'components/footer/footer';
import { getUser } from "api/person";

export default {
  data() {
    return {
      data: {
        userStatistics: {
          jiaoYiCount: '',
          beiPingJiaCount: '',
          beiHaoPingCount: '',
          beiXinRenCount: ''
        }
      }
    };
  },
  created() {
    getUser().then((data) => {
      this.data = data;
    });
  },
  computed: {},
  methods: {},
  components: {
    Scroll,
    Footer
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.mine-wrapper {
  width: 100%;
  height: 100%;

  .mine-header {
    width: 100%;
    height: 4rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    @include bg-image("mine");
    text-align: center;
    position: relative;

    h4 {
      padding-top: 0.58rem;
      font: 0.36rem/0.5rem PingFangSC-Medium;
      color: #fff;
    }

    .my {
      width: 92%;
      margin: 0 auto;
      position: absolute;
      top: 1.56rem;
      left: 0.34rem;

      .pic {
        width: 1.16rem;
        height: 1.16rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("tou");
        float: left;
      }

      .h-text {
        height: 1.16rem;
        float: left;
        margin-left: 0.3rem;
        .name {
          font: 0.44rem/0.48rem PingFangSC-Medium;
          color: #fff;
          text-align: left;
          letter-spacing: 0.004rem;
          padding-bottom: 0.12rem;
          padding-top: 0.04rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .intro {
          font: 0.28rem/0.48rem PingFangSC-Regular;
          color: #fff;
          letter-spacing: 0.0023rem;
        }
      }
    }
  }

  .mine-main {
    width: 92%;
    margin: 0 auto;
    margin-top: -0.86rem;
    display: flex;
    flex-direction: column;

    .item {
      width: 100%;
      display: inline-block;
      height: 1.18rem;
      z-index: 1;
      font-size: 0.32rem;
      color: #333;
    }

    .ite4 {
      margin-bottom: 0.2rem;
    }

    .item1 {
      margin-bottom: 0.22rem;
    }
    a {
      color: #333;
    }
    .trading {
      height: 1.4rem;
      background: #fdfeff;
      box-shadow: 0 0.02rem 0.24rem 0 rgba(131, 128, 128, 0.16);
      border-radius: 0.16rem;
      text-align: center;
      letter-spacing: 0.0018rem;
      text-align: center;
      display: flex;
      justify-content: space-around;
      margin-bottom: 0.2rem;
      a {
        font: 0.3rem/1.4rem PingFangSC-Regular;
        color: #333;
      }
      i {
        display: inline-block;
        width: 0.48rem;
        height: 0.48rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-bottom: 0.1rem;
        margin-right: 0.23rem;
      }

      .item-0 {
        i {
          @include bg-image("我要购买");
        }
        span {
          border-right: 0.01rem solid #ccc;
          padding-right: 0.78rem;
        }
      }

      .item-1 {
        i {
          @include bg-image("我要出售");
        }
      }
    }

    .item-Wrap {
      font: 0.32rem/1.18rem PingFangSC-Regular;
      letter-spacing: 0.0027rem;
      background: #fff;

      .box {
        height: 1.18rem;
        width: 6.7rem;
        margin-left: 0.22rem;
        position: relative;
        .line {
          width: 6.06rem;
          border-bottom: .01rem solid #e3e3e3;
          float: right;
        }
      }
     

      .txt {
        margin-left: 0.64rem;
      }

      .icon {
        @include bg-image("更多");
      }

      .item-2 {
        i {
          @include bg-image("选择货币");
        }
      }

      .item-3 {
        i {
          width: 0.36rem;
          height: 0.33rem;
          @include bg-image("我的广告");
        }
      }

      .item-4 {
        i {
          width: 0.36rem;
          height: 0.36rem;
          @include bg-image("我的订单");
        }
      }

      .item-5 {
        i {
          @include bg-image("交易对手");
        }
      }

      .item-6 {
        i {
          @include bg-image("邀请好友");
        }
      }

      .item-7 {
        i {
          width: 0.34rem;
          height: 0.4rem;
          @include bg-image("安全中心");
        }
      }

      .item-8 {
        i {
          @include bg-image("关于我们");
        }
      }


      i {
        display: inline-block;
        position: absolute;
        top: 0.4rem;
        width: 0.4rem;
        height: 0.4rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }

      .icon {
        float: right;
        margin-top: 0.5rem;
        margin-right: 0.2rem;
        width: 0.15rem;
        height: 0.26rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
