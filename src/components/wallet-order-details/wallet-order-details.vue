<template>
  <div class="order-details-wrapper" @click.stop>
    <div class='header'>
        <div class='top'>
            <p>
                <i class='icon'></i>
                <span class='txt1'>订单详情</span>
            </p>
        </div>
    </div>
    <!-- 待支付 -->
    <div v-show='show' class='main'>
        <div class='text1'>
            <p class='txt1'><i class='icon'></i><span>待支付</span></p>
            <p class='txt2'><span>￥</span>100</p>
            <p class='line'>
                <span class='t1'>转账附言</span>
                <span class='red t2'>DUS7</span>
                <span class='red t1'>复制</span></p>
        </div>
        <p class='text2 clearfix'>
            <span class='icon ico1'><i class='icon ico2'></i></span>
            <span class='txt1'>银行转账</span>
            <span class='red'>一键复制</span>
        </p>
        <p class='text3'>
            请按一下方式付款，转账务必填写转账附言码
        </p>
        <p class='text4'>
            <span class='txt1'>收款人</span>
            <span class='txt2'>lisa</span>
            <span class='red txt3'>复制</span>
        </p>
        <p class='text4'>
            <span class='txt1'>银行卡号</span>
            <span class='txt2'>6216 9012 1358 0868</span>
            <span class='red txt3'>复制</span>
        </p>
        <p class='text4'>
            <span class='txt1'>收款银行</span>
            <span class='txt2'>中国民生银行</span>
            <span class='red txt3'>复制</span>
        </p>
        <p class='text4'>
            <span class='txt1'>开户行</span>
            <span class='txt2'>上海奉贤支行</span>
            <span class='red txt3'>复制</span>
        </p>
        <p class='text5'><i class='icon'></i><span>收款账户经过平台认证，请放心收款</span></p>
        <button>我已完成付款</button>
    </div>
    <!-- 已取消 -->
    <div v-show='!show' class='main main1'>
        <div class='text1'>
            <p class='txt1'><i class='icon ico1'></i><span>已取消</span></p>
            <p class='txt2'>买入 0.345657BTC</p>
            <p class='txt3'>总价 ￥100</p>
            <p class='txt4 line'>币已转入您的账户，交易完成</p>
        </div>
        <p class='text4'>
            <span class='txt1'>订单编号</span>
            <span class='txt2'>56567878898989</span>
        </p>
        <p class='text4'>
            <span class='txt1'>类型</span>
            <span class='txt2'>买入</span>
        </p>
        <p class='text4'>
            <span class='txt1'>单价</span>
            <span class='txt2'>￥576</span>
        </p>
        <p class='text4'>
            <span class='txt1'>下单时间</span>
            <span class='txt2'>2018-09-23 12:00:00</span>
        </p>
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
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.order-details-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;
  background: #fff;
  position: relative;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
  .red {
      color: #d53d3d;
  }

  .header {
    width: 100%;
    height: 2.6rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    @include bg-image("账单详情");
    .top {
        line-height: 0.88rem;
        width: 100%;
        color: #fff;
        padding: 0 0.3rem;

        .icon {
            width: 0.2rem;
            height: 0.36rem;
            @include bg-image("返回白色");
            margin-top: 0.28rem;
            float: left;
        }

        .txt1 {
            font-size: 0.36rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }


  }

  .main {
      width: 92%;
      margin: 0 auto;
      border-radius: .08rem;
      background: #fff;
      position: absolute;
      top: 1.32rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      z-index: 10;
      .text1 {
          width: 100%;
          padding: .5rem .3rem 0;
        .txt1 {
            padding-bottom: .35rem;
            .icon {
                width: .36rem;
                height: .36rem;
                 @include bg-image("待支付");
                 margin-right: .12rem;
                 vertical-align: baseline;
            }
            .ico1 {
                @include bg-image("已取消");
                vertical-align: baseline;
            }
            span {
                font-size: .34rem;
                color: #333;
            }
        }
        .txt2 {
            font-size: .5rem;
            font-weight: bold;
            padding-bottom: .37rem;
            span {
                font-size: .34rem;
            }
        }
        .line {
            padding-bottom: .5rem;
            border-bottom: .01rem dotted #979797;

            .t1 {
                font-size: .24rem;
                color: #999;
            }
            .t2 {
                font-size: .36rem;
                font-weight: bold;
            }

        }
      }
      .text2 {
          width: 91%;
          margin: 0 auto;
          border-bottom: .02rem solid #d53d3d;
          padding-top: .34rem;
          .ico1 {
            width: .96rem;
            height: .48rem;
            @include bg-image("Rectangle 30");
            position: relative;
            float: left;
          }
          .ico2 {
            position: absolute;
            top: .098rem;
            left: .28rem;
            width: .32rem;
            height: .26rem;
            @include bg-image("银行卡白色");
          }
          .txt1 {
              float: left;
              margin-top: .15rem;
              margin-left: .19rem;
              font-size: .26rem;
              color: #666;
          }
          .red {
              float: right;
              font-size: .28rem;
              margin-top: .15rem;
          }
      }
      .text3 {
          width: 92%;
          line-height: .54rem;
          margin: .3rem auto .12rem;
          background: #fff6ef;
          font-size: .24rem;
          color: #fa7d0e;
      } 
      .text4 {
        width: 92%;
        margin: 0 auto;
        line-height: 1rem;
        border-bottom: .01rem solid #E5E5E5; 
        display: flex;
        justify-content: space-between;
        text-align: left;
        .txt1 {
            font-size: .26rem;
            color: #666;
            flex: 1;
        }
        .txt2 {
            flex: 3;
        }
        .txt3 {
            font-size: .26rem;
            flex: 1;
            text-align: right;
        }
      }
      .text5 {
          font-size: .24rem;
          color: #0ec55b;
          line-height: .33rem;
          padding: .4rem 0 .35rem;
          .icon {
              width: .2rem;
              height: .24rem;
               @include bg-image("认证");
               margin-right: .1rem;
          }
      }
      button {
          width: 3.84rem;
          height: .9rem;
          background: #d53d3d;
          border-radius: .45rem;
          font-size: .32rem;
          color: #fff;
          margin-bottom: .4rem;
      }
  }

  .main1 {
      padding-bottom: .93rem;
      .text1 {
          .txt2 {
              font-size: .48rem;
              color: #333;
              line-height: .46rem;
          }
          .txt3 {
              font-size: .28rem;
              color: #d53d3d;
              padding: 0 0 .48rem;
          }
          .txt4 {
              font-size: .24rem;
              color: #999;
          }
      }
     
  }


}
</style>
