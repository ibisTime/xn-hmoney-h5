<template>
  <div class="otcsell-wrapper" @click.stop>
      <header>
        <i class='icon'></i><span class='title'>出售</span> 
      </header>
      <div class='header'>
        <div class='person'>
          <div class='pic'></div>
          <div class='text'>
            <p class='name'>{{data.user.nickname}}<span class='icon'>{{bizTypeList[data.payType]}}</span></p>
            <p class='num'>限额：{{data.minTrade}}-{{data.maxTrade}} CNY</p>
          </div>
          <div class='money'>{{data.truePrice.toFixed(2)}} CNY</div>
        </div>
        <div class='about'>
          <div>
            <p>{{data.userStatistics.jiaoYiCount}}</p>
            <span>交易次数</span>
          </div>
          <div>
            <p>{{data.userStatistics.beiXinRenCount}}</p>
            <span>信任次数</span>
          </div>
          <div>
            <p>{{data.userStatistics.beiPingJiaCount != 0 ?(data.userStatistics.beiHaoPingCount / data.userStatistics.beiPingJiaCount) * 100 : '0'}}%</p>
            <span>好评率</span>
          </div>
          <div>
            <p>{{data.userStatistics.totalTradeCount}}</p>
            <span>历史交易</span>
          </div>
        </div>
      </div>
      <div class='message'>
        广告留言：{{data.leaveMessage}}
      </div>
      <div class='main'>
        <div class='want'>
          <p class='txt1'><span class='icon1'></span>你想出售多少？</p>
          <p class='txt2'>可用余额：{{data.user.tradeRate}}ETH</p>
          <div class='text'>
          <p class='txt3'><span class='txt'>CNY</span><input class="inp1" type="text" v-model="Cnum" @keyup="changeEnum" placeholder="请输入数字"></p>
          <p class=txt4><span class='icon2'></span><span class='txt'>ETH</span><input v-model="Enum" @keyup="changeCnum" class="inp2" type="text" placeholder="请输入数值"></p>
          </div>
        </div>
      </div>

      <div class='remind'>
          <p class='txt1'><span class='icon1'></span>交易提醒</p>
          <p class='cont'>1.交易前请详细了解卖家的交易信息；</p>
          <p class='cont'>2.请通过平台进行沟通约定。</p>
      </div>
      <div class='footer'>
          <router-link to='otc-contactOther' class='chat'>
            <span></span>
            联系对方
          </router-link>
          <div class='buy' @click='show=!show'>
              出售
          </div>
      </div>
      <div v-show='show' class='pop-up'>
        <div class='pop-up-window'>
          <div class='ico'><span></span></div>
          <h3>下单确定</h3>
          <div class='text'>
          <p><span class='txt1'>购买价格</span><span class='txt2'>{{data.truePrice}}CNY</span></p>
          <p><span class='txt1'>购买金额</span><span class='txt2'>{{data.truePrice*this.Cnum}}CNY</span></p>
          <p><span class='txt1'>购买数量</span><span class='txt2'>{{this.Cnum}}ETH</span></p>
          </div>
          <div class='prompt'>
            <span class='icon'></span>
            <span class='txt'>提醒：请确认价格再下单，下单后此交易的ETH将冻结锁定，请放心购买</span>
          </div>
          <div class='btn'>
            <button class='no' @click='show = !show'>放弃出售</button>
            <router-link to='order-details'><button class='yes'>确认出售</button></router-link>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { getUrlParam } from 'common/js/util';
import { otcBuy } from "api/otc";

export default {
  data() {
    return {
      show: false,
      data: [],
      bizTypeList: {
        "0": "支付宝",
        "1": "微信",
        "2": "银行卡转账"
      },
      rate: '',
      Cnum: '',
      Enum: ''
    };
  },
  created() {
    this.otcBuy();
  },
  methods: {
    otcBuy() {
      otcBuy(getUrlParam('adsCode'), getUrlParam('userId')).then((data) => {
        this.data = data;
        this.rate = data.marketPrice;
      });
    },
    changeEnum() {
      this.Enum = this.Cnum / this.rate;
    },
    changeCnum() {
      this.Cnum = this.Enum * this.rate;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.otcsell-wrapper {
  font-family: PingFangSC-Medium;
  font-size: 0.3rem;
  background: #fff;

  header {
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.36rem;
      color: #333;
      font-weight: bold;
      width: 100%;
      padding: 0 .3rem;

      .icon {
          display: inline-block;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          width: 0.21rem;
          height: 0.36rem;
          @include bg-image("返回");
          float: left;
          margin-top: .26rem;
      }
  }


  .header {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 0.01rem solid #eee;
    border-left: none;
    border-right: none;

    .person {
      display: flex;
      padding: 0 0.3rem;
      width: 100%;
      .pic {
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("头像(4)");
        margin-top: 0.26rem;
        margin-right: 0.2rem;
        margin-bottom: 0.46rem;
      }

      .text {
        margin-top: 0.36rem;
        width: 3.7rem;
        .name {
          font-size: 0.32rem;
          line-height: 0.28rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.24rem;
          .icon {
            display: inline-block;
            width: 0.76rem;
            height: 0.3rem;
            border-radius: 0.03rem;
            background: #0ec55b;
            text-align: center;
            font-size: 0.2rem;
            line-height: 0.28rem;
            color: #fff;
            margin-left: 0.12rem;
          }
        }

        .num {
          font-size: 0.24rem;
          color: #999;
        }
      }

      .money {
        text-align: right;
        width: 2.1rem;
        font-size: 0.3rem;
        color: #0ec55b;
        line-height: 1.4rem;
      }
    }

    .about {
      display: flex;
      padding: 0 0.54rem;
      justify-content: space-between;
      text-align: center;
      margin-bottom: 0.18rem;

      p {
        font-size: 0.34rem;
        color: #333;
        margin-bottom: 0.18rem;
      }

      span {
        font-size: 0.22rem;
        color: #999;
      }
    }
  }

  .message {
    font-size: 0.28rem;
    line-height: 0.36rem;
    color: #333;
    padding: 0.3rem 0.54rem 1.42rem 0.3rem;
    border-bottom: 0.2rem solid #f7f7f7;
  }

  .main {
    border-bottom: 0.2rem solid #f7f7f7;
    padding: 0 0.3rem 0.3rem 0.3rem;
    .want {
      padding: 0.28rem 0 0.3rem;
      border-bottom: 0.01rem solid #e5e5e5;

      .txt1 {
        font-size: 0.3rem;
        color: #333;
        margin-bottom: 0.34rem;

        .icon1 {
          display: inline-block;
          width: 0.27rem;
          height: 0.3rem;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          @include bg-image("购买多少");
          margin-right: 0.14rem;
        }
      }

      .txt2 {
        font-size: 0.24rem;
        color: #d53d3d;
        margin-bottom: 0.4rem;
      }

      .text {
        display: flex;
        justify-content: space-between;

        .txt {
          font-size: 0.3rem;
          color: #333;
          margin-right: 0.2rem;
        }

        .txt3 {
          width: 3.2rem;
          input {
            width: 2.3rem;
            border: none;
            font-size: 0.28rem;
            height: 0.3rem;
          }
        }
        .txt4 {
          width: 3.6rem;

          .icon2 {
            display: inline-block;
            width: .49rem;
            height: .49rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            @include bg-image("转换");
            margin-right: .4rem;
            vertical-align: middle;
           
          }

          input {
            width: 1.8rem;
            border: none;
            font-size: 0.28rem;
            height: 0.3rem;
          }
        }
      }
    }
  }

  .remind {
    width: 100%;
    height: 2.4rem;
    padding: .28rem .3rem;
    color: #333;

    .txt1 {
      margin-bottom: .4rem;

      .icon1 {
        display: inline-block;
        width: .26rem;
        height: .3rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("交易提醒");
        margin-right: .14rem;
      }
    }

    .cont {
      font-size: .26rem;
      line-height: .35rem;
    }

  }

  .footer {
    height: 1rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    display: flex;
    line-height: 1rem;
    font-size: .32rem;
    color: #333;
    justify-content: space-between;
    .chat {
      width: 61.6%;
      border-top: .01rem solid #e6e6e6;
      span {
        display: inline-block;
        width: .32rem;
        height: .32rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("聊天");
        margin: 0 .16rem 0 .3rem;
      }
    }
    .buy{
      width: 38.4%;
      background: #d53d3d;
      text-align: center;
      color: #fff;
    }
  }

  .pop-up {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    position: fixed;
    top: 0;

      .pop-up-window {
        position: absolute;
        top: 2.1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 6.14rem;
        height: 6.2rem;
        background: #fff;
        border-radius: .2rem;
        padding: .3rem .6rem .64rem;

        .ico,h3 {
          text-align: center;
          font-size: .32rem;
          color: #333;
        }

        .ico span {
          display: inline-block;
          width: .42rem;
          height: .44rem;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          @include bg-image("下单确定");
          margin-bottom: .24rem;
        }

        .text {
          font-size: .24rem;
          margin: .4rem 0 .62rem;

          p {
            display: flex;
            justify-content: space-between;
            margin-bottom: .32rem;
          }
          .txt1 {
            color: #666;
          }
          .txt2 {
            color: #333;
          }
        }

        .prompt {
          margin-bottom: .7rem;
          .icon {
            display: inline-block;
            width: .24rem;
            height: .24rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            @include bg-image("提示");
            margin-bottom: 0.2rem;
          }
          .txt {
            display: inline-block;
            width: 4.6rem;
            font-size: .22rem;
            color: #d53d3d;
            line-height: .26rem;
          }
        }

        .btn {
          button {
            width: 2.2rem;
            height: .7rem;
            border-radius: .1rem;
            color: #fff;
            line-height: .7rem;
            font-size: .28rem;
          }
          .no {
            background: #dedede;
            margin-right: .45rem;
          }
          .yes {
            background: #d53d3d;
          }
        }

      }
  }
  

}
</style>
