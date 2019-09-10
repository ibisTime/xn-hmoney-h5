<template>
  <div class="wallet-out-wrapper" @click.stop>
    <div class='main'>
      <p class='text' style="position: relative;">
        <span>可用余额</span>
        <input type="text" class='dis' readonly v-model="value">
        <router-link
          :to="'wallet-bill'+'?accountNumber=' + config.accountNumber"
          style="position: absolute; right: 0rem;"
        >记录</router-link>
      </p>
      <p class='text'>
        <span>接收地址</span>
        <input type="text" placeholder="请输入转币地址" v-model="config.payCardNo">
      </p>
      <p class='text'>
        <span>转账数量</span>
        <input type="number" placeholder="请输入转币数量" v-model="zAmount">
      </p>
      <p class='text'>
        <span>交易密码</span>
        <input type="password" placeholder="请输入交易密码" v-model="config.tradePwd">
      </p>
      <p class='text' style="position: relative;">
        <span>验证码</span>
        <input type="text" placeholder="请输入验证码" v-model="config.smsCaptcha">
        <span
          style="position: absolute; right: 0rem; width: 1.8rem;text-align: right;"
          :class="isSend ? '' : 'send_smc'"
          @click="sendSmsCode"
        >{{isSend ? `重新获取(${timer})s` : '获取验证码'}}</span>
      </p>
      <p class='text'>
        <span>提现说明</span>
      </p>
      <div class="tx-box">
        <textarea
          type="text"
          placeholder="请输入提现说明"
          v-model="config.applyNote"
        ></textarea>
      </div>
    </div>
    <div class='plan'>
      <p class='kgfee'>
        {{$t('walletOut.subject.kgf')}}：{{feeAmount}} <span class="cur_fee">({{currency}})</span>
      </p>
      <div class='text2'>
        <ul v-if="langType === 'zh'">
          <li>{{currency}} 地址只能充值 {{currency}} 资产，任何充入 {{currency}} 地址的非 {{currency}} 资产将不可找回。</li>
          <li>在平台内相互转账是实时到账且免费的。</li>
        </ul>
        <ul else>
          <li>{{currency}} address can only recharge {{currency}} assets, any non - {{currency}} assets will not be recovered.</li>
          <li>Mutual transfers within the platform are real-time and free of charge.</li>
        </ul>
      </div>
    </div>
    <button @click="walletOut">{{$t('walletOut.subject.qrzz')}}</button>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import {walletOut, getSmsCaptchaPhone, getSmsCaptchaEmail} from 'api/person';
import {getBbListData} from 'api/tradingOn';
import { getUrlParam, getUserId, setTitle, formatAmount, formatMoneyMultiply, getLangType } from 'common/js/util';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      textMsg: '',
      isLoading: false,
      isSend: false,
      currency: '',
      amount: '',
      feeAmount: '',
      value: '',
      site:'',
      paw: '',
      bbNumber: '',
      zAmount: '',
      loginName: '',
      timer: 60,
      timeInter: null,
      langType: getLangType(),
      config: {
        accountNumber: '',
        amount: '',
        applyNote: '',
        applyUser: getUserId(),
        payCardInfo: '',
        payCardNo: '',
        tradePwd: '',
        smsCaptcha: ''
      }
    }
  },
  created() {
    setTitle(this.$t('walletOut.subject.zc'));
    this.currency = getUrlParam('currency');
    this.amount = getUrlParam('amount');
    this.loginName = getUrlParam('loginName');
    this.value = this.amount + this.currency;
    this.config.accountNumber = getUrlParam('accountNumber');
    this.config.payCardInfo = this.currency;
    getBbListData().then(data => {
      const currencyData = data.filter(item => item.symbol === this.currency)[0];
      this.feeAmount = currencyData.withdrawFeeType === '0' ? formatAmount(currencyData.withdrawFee, '4', this.currency) : currencyData.withdrawFee;
    });
  },
  methods: {
    sendSmsCode() {
      if(this.isSend) {
        return false;
      }
      if(!this.config.tradePwd) {
        this.textMsg = '请填写交易密码';
        this.$refs.toast.show();
        return;
      }
      if(this.loginName.match(/@/)) {
        getSmsCaptchaEmail({
          bizType: '802350',
          email: this.loginName,
          tradePwd: this.config.tradePwd
        }).then(() => {
          this.isSend = true;
          this.timeInter = setInterval(() => {
            this.timer --;
            if(this.timer <= 0) {
              clearInterval(this.timeInter);
              this.timer = 60;
              this.isSend = false;
            }
          }, 1000);
        });
      }else {
        getSmsCaptchaPhone({
          bizType: '802350',
          mobile: this.loginName,
          tradePwd: this.config.tradePwd
        }).then(() => {
          this.isSend = true;
          this.timeInter = setInterval(() => {
            this.timer --;
            if(this.timer <= 0) {
              clearInterval(this.timeInter);
              this.timer = 60;
              this.isSend = false;
            }
          }, 1000);
        });
      }
    },
    walletOut() {
      if(!this.config.payCardNo || !this.zAmount || !this.config.tradePwd || !this.config.applyNote){
        this.textMsg = '请填写完整';
        this.$refs.toast.show();
        return;
      }
      this.isLoading = true;
      this.config.amount = formatMoneyMultiply(this.zAmount, '', this.currency);
      walletOut(this.config).then(() => {
        this.isLoading = false;
        this.textMsg = '操作成功';
        this.$refs.toast.show();
        setTimeout(() => {
          this.$router.push(`/wallet-bill?accountNumber=${this.config.accountNumber}`);
        }, 1500);
      }, () => {
        this.isLoading = false;
      })
    },
    formatAmount(money, unit, coin) {
      return formatAmount(money, unit, coin);
    },
  },
  beforeDestroy() {
    if(this.timeInter) {
      clearInterval(this.timeInter);
    }
  },
  components: {
    Toast,
    FullLoading
  }
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
            background-image: url('./fh.png');
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
      .tx-box{
        text-align: left;
        textarea{
          width: 100%;
          height: 2rem;
          padding: .2rem .2rem;
          border: 1px solid #eee;
        }
      }
      .text {
        width: 100%;
        height: 1rem;
        border-bottom: .01rem solid #E5E5E5;
        line-height: 1rem;
        display: flex;
        position: relative;
        span {
          display: inline-block;
          float: left;
          width: 1.52rem;
          font-size: .28rem;
          color: #666;
          text-align: left;
        }
        .dis {
          width: 3.4rem;
          font-size: .3rem;
          color: #d53d3d;
          line-height: 1rem;
          height: 1rem;
          margin-top: 0;
          border-bottom: .01rem solid #E5E5E5;
        }
        .error-tip {
          position: absolute;
          font-size: 0.3rem;
          color:red;
          right: .3rem;
          top: .6rem;
        }

        input {
          width: 5rem;
          height: .42rem;
          margin-top: .3rem;
          font-size: .28rem;
          color: #999;
        }

        .icon {
          width: .36rem;
          height: .36rem;
          background-image: url('./sys.png');
          margin-top: .34rem;
          margin-left: 0.78rem;
        }
      }
    }

    .plan {
      width: 100%;
      padding: 0 .3rem;
      background: #fff;
      margin-bottom: .8rem;
      padding-bottom: 0.3rem;
      .kgfee{
          text-align: left;
          padding-top: 0.4rem;
          padding-bottom: 0.2rem;
          .cur_fee{
            font-size: 0.28rem;
            color: #666;
          }
        }
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
        font-size: .24rem;
        line-height: .33rem;
        color: #aaa;
        text-align: left;
        ul li{
          list-style: disc inside;
        }
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
  .send_smc{
    color: red;
  }
}

</style>
