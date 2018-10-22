<template>
  <div class="order-details-wrapper" @click.stop>
    <div class='header'>
        <div class='top'>
            <!-- <p>
                <i class='icon'></i>
                <span class='txt1'>订单详情</span>
            </p> -->
        </div>
    </div>
    <!-- 待支付 -->
    <div class='main'>
        <div class='text1'>
            <p class='txt1'><i class='icon'></i><span>{{statusList[status]}}</span></p>
            <p class='txt2'><span>￥</span>{{money}}</p>
            <!-- <p class='line'>
                <span class='t1'>转账附言</span>
                <span class='red t2'>DUS7</span>
            </p> -->
        </div>
        <p class='text2 clearfix'>
            <span class='icon ico1'><i class='icon' :class="receiveType == 'alipay' ? 'ico3' : 'ico2'"></i></span>
            <span class='txt1'>{{receiveType == 'alipay' ? '支付宝' : '银行转账'}}</span>
        </p>
        <p class='text3'>
            <!-- 请按一下方式付款，转账务必填写转账附言码 -->
        </p>
        <p class='text4'>
            <span class='txt1'>类型：</span>
            <span class='txt2'>{{typeList[type]}}</span>
        </p>
        <p class='text4'>
            <span class='txt1'>收款人：</span>
            <span class='txt2'>{{realName}}</span>
        </p>
        <p class='text4'>
            <span class='txt1'>收款方式：</span>
            <span class='txt2'>{{zfType[receiveType]}}</span>
        </p>
        <p class='text4'>
            <span class='txt1'>账号：</span>
            <span class='txt2'>{{receiveCardNo}}</span>
        </p>
        <p class='text4'>
            <span class='txt1'>开户行：</span>
            <span class='txt2'>{{receiveInfo}}</span>
        </p>
        <p class='text5'><i class='icon'></i><span>收款账户经过平台认证，请放心收款</span></p>
        <div v-show="btnStatus">
            <button v-show="qrStatus" @click="qrPayClick">我已完成付款</button>
            <button class="qx-order" v-show="qxStatus" @click="qxPayClick">取消交易</button>
        </div>
    </div>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import { getUrlParam, getUserId, formatDate, formatAmount, setTitle } from 'common/js/util';
import { bjPlayfo, qxOrder, getGmBankData, getCTSDetail } from 'api/person';
import FullLoading from 'base/full-loading/full-loading';
import Toast from 'base/toast/toast';
export default {
  data() {
    return {
        textMsg: '操作成功',
        isLoading: true,
        qxStatus: false,
        btnStatus: false,
        qrStatus: false,
        statusList: {
            '0': '待支付',
            '1': '待确认',
            '2': '已完成',
            '3': '已取消',
            '4': '平台已取消'
        },
        zfType: {},
        typeList: {
            '0': '买入',
            '1': '卖出'
        },
        config: {
            start: 1,
            limit: 10,
            userId: getUserId(),
            code: ''
        },
        jyConfig: {
            userId: getUserId(),
            code: ''
        },
        realName: '',
        receiveCardNo: '',
        receiveInfo: '',
        receiveType: '',
        status: '',
        type: '',
        money: ''
    };
  },
  created() {
      setTitle('订单详情');
      this.config.code = getUrlParam('code');
      this.jyConfig.code = getUrlParam('code');
      getGmBankData().then(data => {
          data.forEach(item => {
            this.zfType[item.bankCode] = item.bankName;
        });
        this.getOrderDetail();
      });
  },
  methods: {
    getOrderDetail(){
        getCTSDetail(this.config).then(data => {
            this.realName = data.bankcard ? data.bankcard.realName : data.user.realName;
            this.receiveCardNo = data.receiveCardNo;
            this.receiveInfo = data.receiveInfo;
            this.receiveType = data.receiveType;
            this.status = data.status;
            this.money = data.tradeAmount;
            this.type = data.type;
            if (data.status == 0 || data.status == 1) {
                this.btnStatus = true;
            }else{
                this.btnStatus = false;
            }
            if (data.status == 0) {
                this.qxStatus = true;
            }else{
                this.qxStatus = false;
            }
            if (data.status == 0 && data.type == 0) {
                this.qrStatus = true;
            }else{
                this.qrStatus = false;
            }
            this.isLoading = false;
        }, () => {
            this.isLoading = false;
        })
    },
    qrPayClick(){
        bjPlayfo(this.jyConfig).then(data => {
            this.$refs.toast.show();
            this.getOrderDetail();
        }, () => {
            setTimeout(() => {
                this.$router.push('/wallect-orderRecord');
            }, 1500);
        });
    },
    qxPayClick(){
        qxOrder(this.jyConfig).then(data => {
            this.$refs.toast.show();
            this.getOrderDetail();
        }, () => {
            setTimeout(() => {
                this.$router.push('/wallect-orderRecord');
            }, 1500);
        });
    }
  },
  components: {
      FullLoading,
      Toast
  }
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
    background-image: url('./zdxq.png');
    .top {
        line-height: 0.88rem;
        width: 100%;
        color: #fff;
        padding: 0 0.3rem;

        .icon {
            width: 0.2rem;
            height: 0.36rem;
            background-image: url('./fhbs.png');
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
      margin-top: -1.32rem;
      border-radius: .08rem;
      background: #fff;
      text-align: center;
      .text1 {
          width: 100%;
          padding: .5rem .3rem 0;
        .txt1 {
            padding-bottom: .35rem;
            .icon {
                width: .36rem;
                height: .36rem;
                background-image: url('./dzf.png');
                 margin-right: .12rem;
                 vertical-align: baseline;
            }
            .ico1 {
                background-image: url('./yqx.png');
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
          .ico2 , .ico3{
            position: absolute;
            top: .098rem;
            left: .28rem;
            width: .32rem;
            height: .26rem;
          }
          .ico2{
              background-image: url('./yhk.png');
          }
          .ico3{
              background-image: url('./zfb.png');
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
              background-image: url('./rz.png');
               margin-right: .1rem;
          }
      }
      button {
          width: 2.34rem;
          height: .9rem;
          background: #d53d3d;
          border-radius: .45rem;
          font-size: .32rem;
          color: #fff;
          margin-bottom: .4rem;
      }
      .qx-order{
          border: 1px solid #d53d3d;
          color: #d53d3d;
          background-color: #fff;
          margin-left: 0.5rem;
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
