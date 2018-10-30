<template>
  <div class="wallet-out-wrapper" @click.stop>
    <div class='main'>
      <p class='text'>
        <span>可用余额</span>
        <input type="text" class='dis' readonly v-model="value">
        <router-link :to="'wallet-bill'+'?accountNumber=' + config.accountNumber" style="margin-left: 0.6rem;">记录</router-link>
      </p>
      <p class='text'>
        <span>接受地址</span>
        <input type="text" placeholder="请输入转币地址" v-model="config.payCardNo">
      </p>
      <p class='text'>
        <span>转账数量</span>
        <input type="number" placeholder="请输入转币数量" v-model="config.amount">
      </p>
      <p class='text'>
        <span>资金密码</span>
        <input type="password" placeholder="请输入资金密码" v-model="config.tradePwd">
      </p>
      <!-- <p class='text'>
        <span>谷歌验证码</span>
        <input type="text" placeholder="请输入谷歌验证码" v-model="config.tradePwd">
      </p> -->
      <p class='text'>
        <span>提现说明</span>
      </p>
      <div class="tx-box">
        <textarea type="text" placeholder="请输入提现说明" v-model="config.applyNote"></textarea>
      </div>

    </div>
    <div class='plan'>
      <p class='kgfee'>
        矿工费：{{feeAmount}}
      </p>
      <p class='text2'>
        矿工费将在可用余额中扣除，余额不足将从转账金额扣除
        <br>
        在平台内相互转账是实时到账且免费的。
      </p>
    </div>
    <button @click="walletOut">确认转账</button>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import {walletOut} from 'api/person';
import {getSysConfig} from 'api/general';
import { getUrlParam, getUserId, setTitle, formatAmount } from 'common/js/util';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      textMsg: '',
      isLoading: false,
      currency: '',
      amount: '',
      feeAmount: '',
      value: '',
      site:'',
      paw: '',
      bbNumber: '',
      config: {
        accountNumber: '',
        amount: '',
        applyNote: '',
        applyUser: getUserId(),
        payCardInfo: '',
        payCardNo: '',
        tradePwd: ''
      }
    }
  },
  created() {
    setTitle('转出');
    this.currency = getUrlParam('currency');
    this.amount = getUrlParam('amount');
    this.value = formatAmount(this.amount, '', this.currency) + this.currency;
    this.config.accountNumber = getUrlParam('accountNumber');
    this.config.payCardInfo = this.currency;
    getSysConfig('withdraw_fee').then(data => {
      this.feeAmount = data.cvalue;
    })
  },
  methods: {
    walletOut() {
      this.isLoading = true;
      walletOut(this.config).then(data => {
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
          width: 4rem;
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
