<template>
  <div class="order-detail-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        订单详情
        </p>
    </header>
    <div class='order'>
        <p>
            <i class='icon'></i>
            <span class='num'>订单编号：123545566</span>
            <span class='state'>{{buttonTitle[index].title}}</span>
        </p>
    </div>
    <div class='trading'>
        <p class='money'><span>交易金额</span><span>34564546.8CNY</span></p>
        <p class='number'><span>交易数量</span><span>0.34564546ETH</span></p>
        <p class='price'><span>交易价格</span><span>34564546.8CNY</span></p>
    </div>
    <div class='message'>
        <div class='mess'>
            <p class='text1'><span>买家KOLO</span><span class='pay'>支付宝</span><span class='seller'>卖家：libble</span></p>
            <p class='text2'>广告留言：支持支付宝15890989876z转账，谢谢，陈某某收.速度</p>
        </div>
        <div class='appraise' v-show='this.index == 2'>
          <p class='txt1'>评价</p>
          <p class='txt2'>对这次交易非常满意，下次继续合作。</p>
        </div>
    </div>
    <div class='window'>
        <p v-html="buttonTitle[index].main"></p>
        <button @click="changeIndex">{{buttonTitle[index].btn}}</button>
    </div>

    <div class='chat'>
        <div class='chat-inner'>
          <div class='content'>
          </div>
        </div>
    </div>

    <div class="chat-input">
        <p>
            <input type="text" placeholder="请输入聊天内容">
            <i class='ico1 icon'></i>
            <i class='ico2 icon'></i>
        </p>
    </div>
    <div v-show='show' class='prompt'>
        <div class='appraise'>
          <p class='text1'>交易评价</p>
          <p class='text2'>交易有何印象？快来评价吧</p>
          <div class='pic'>
            <div class='box mr'>
              <i class="icon"></i>
              <p class="txt">好评</p>
            </div>
            <div class='box mr'>
              <i class="icon icon2"></i>
              <p class="txt">中评</p>
            </div>
            <div class='box'>
              <i class="icon icon3"></i>
              <p class="txt">差评</p>
            </div>
          </div>
          <textarea>请用文字简单评价一下</textarea>
          <p class='btn' @click="close">提交</p>
        </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      buttonTitle: [
        {
          'title': '待解冻',
          'main': '比特币将解冻<span style="color: red">15</span>分钟，逾期未支付交易将自动取消',
          'btn': '解冻比特币'
        },
        {
          'title': '交易评价',
          'main': '比特币将解冻',
          'btn': '交易评价'
        },
        {
          'title': '交易完成',
          'main': '交易成功，以评价交易',
          'btn': '查看钱包'
        }
      ],
      index: 0,
      show: false
    };
  },
  methods: {
    changeIndex() {
      this.index === 1 ? this.show = true : this.show = false;
      this.index === 2 ? this.index = 0 : this.index++;
    },
    close() {
      this.show = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.order-detail-wrapper {
  font-size: 0.28rem;
  color: #333;
  position: fixed;
  left: 0;
  top: 0;
  
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
    border-bottom: 0.01rem solid #e5e5e5;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      @include bg-image("返回");
      float: left;
      margin-top: 0.31rem;
    }
  }

  .order {
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    line-height: 1rem;

    p {
      border-bottom: 0.01rem solid #e5e5e5;
      .icon {
        width: 0.23rem;
        height: 0.26rem;
        @include bg-image("订单编号");
        margin-right: 0.12rem;
      }
      .state {
        float: right;
        font-size: 0.32rem;
        color: #d53d3d;
      }
    }
  }

  .trading {
    background: #fff;
    width: 100%;
    padding: 0.3rem 0.3rem;
    margin-bottom: 0.2rem;

    p {
      display: flex;
      justify-content: space-between;
    }
    .number,
    .price {
      font-size: 0.28rem;
      color: #999;
    }
    .number {
      margin: 0.34rem 0;
    }
  }

  .message {
    width: 100%;
    padding: 0.32rem 0.3rem 0;
    background: #fff;
    .mess {
      padding-bottom: 0.3rem;
      border-bottom: 0.01rem solid #e6e6e6;
      .text1 {
        margin-bottom: 0.3rem;
        .pay {
          display: inline-block;
          width: 0.74rem;
          background: #0ec55b;
          font-size: 0.2rem;
          line-height: 0.28rem;
          color: #fff;
          text-align: center;
          margin-left: 0.12rem;
          border-radius: 0.03rem;
        }
        .seller {
          position: absolute;
          right: 0.3rem;
        }
      }
      .text2 {
        font-size: 0.26rem;
        color: #999;
        line-height: 0.34rem;
      }
    }
    .appraise {
      padding: .3rem 0 .28rem;
      border-bottom: .01rem solid #e6e6e6;
      .txt1 {
        margin-bottom: .28rem;
      }
      .txt2 {
        color: #999;
      }
    }
  }

  .window {
    width: 100%;
    background: #fff;
    text-align: center;
    p {
      font-size: 0.24rem;
      color: #999;
      padding: 0.3rem 0 0.34rem;
    }
    button {
      width: 3rem;
      height: 0.88rem;
      background: #d53d3d;
      border-radius: 0.44rem;
      margin-bottom: 0.36rem;
      font-size: 0.32rem;
      line-height: 0.88rem;
      color: #fff;
    }
  }

  .chat {
    width: 100%;
    padding: 0 .3rem;
    height: 4rem;
    margin-bottom: 0.98rem;
    overflow: hidden;
    .chat-inner {
      width: 102%;
      height: 4rem;
      overflow-y: auto;
      .content {
        height: 100%;
      }
    }
  }

  .chat-input {
    width: 100%;
    height: 0.98rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    p {
      width: 100%;
      margin: 0.14rem 0.3rem;
      input {
        width: 5.4rem;
        line-height: 0.7rem;
        border: 0.01rem solid #e5e5e5;
        border-radius: 0.05rem;
        text-indent: 0.22rem;
      }
      input[attr="placeholder"] {
        font-size: 0.32rem;
        color: #999;
      }

      .ico1,
      .ico2 {
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        top: 0.28rem;
      }

      .ico1 {
        @include bg-image("表情(1)");
        right: 1rem;
      }
      .ico2 {
        @include bg-image("添加(2)");
        right: 0.3rem;
      }
    }
  }

  .prompt {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    position: fixed;
    top: 0;

    .appraise {
      width: 6.14rem;
      height: 6.4rem;
      background: #fff;
      border-radius: .2rem;
      position: absolute;
      left: 50%;
      top: 3rem;
      transform: translateX(-50%);
      text-align: center;
      padding: .54rem .57rem 0;

      .text1 {
        font-size: .32rem;
        font-weight: bold;
        margin-bottom: .4rem;
      }

      .text2 {
        margin-bottom: .62rem;
      }

      .pic {
        display: flex;
        width: 4.16rem;
        margin: 0 auto;

        .mr {
          margin-right: 1.32rem;
        }

        .box {
          margin-bottom: .4rem;
          .icon {
            width: .54rem;
            height: .58rem;
            @include bg-image("好评灰");
            margin-bottom: .22rem;
          }

          .ico1 {
            @include bg-image("好评");
          }

          .icon2 {
            @include bg-image("中评灰");
          }

          .ico2 {
            @include bg-image("中评红拷贝");
          }

          .icon3 {
            @include bg-image("差评灰");
          }

          .ico3 {
            @include bg-image("差评红");
          }


          .txt {
            font-size: .24rem;
            color: #b3b3b3;
          }

          .txt1 {
            color: #d53d3d;
          }

        }

      }

      textarea {
        width: 5rem;
        height: 1.3rem;
        border-radius: .1rem;
        border: .01rem solid #dedede;
        text-align: left;
        color: #999;
        padding: .26rem 0 0 .2rem;
        margin-bottom: .52rem;
      }

      .btn {
        font-size: .32rem;
        color: #d53d3d;
      }

    }
    
  }

}
</style>
