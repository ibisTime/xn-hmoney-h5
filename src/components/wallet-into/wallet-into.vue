<template>
  <div class="wallet-into-wrapper" @click.stop>
    <div class='prompt' v-show="txtShow">
        <p class='text'>
            {{currency}}钱包地址禁止充值除{{currency}}之外其他资产，任何{{currency}}资产充值将不可找回
        </p>
        <i class='icon' @click="txtShow = false"></i>
    </div>
    <p class='my-address'>
        我的转入地址
    </p>
    <div class='erweima'>
        <div class='ewm-wrap'>
            <div class='qrcode' id="qrcode"></div>
        </div>
    </div>
    <div class='address'>
        <p class='txt'>地址 <router-link :to="'wallet-bill'+'?accountNumber=' + accountNumber" class='txt2'>记录</router-link></p>
        <input id='copyObj' class='url' readonly type="text" v-model="adress"/>
    </div>
    <button @click='CopyUrl'>复制收款地址</button>
  </div>
</template>
<script>
import { getUrlParam, setTitle } from 'common/js/util';
const QRCode = require('js-qrcode');
export default {
  data() {
    return {
      txtShow: true,
      adress: '',
      currency: '',
      accountNumber: ''
    };
  },
  created() {
    setTitle('转入');
    this.adress = getUrlParam('adress');
    this.currency = getUrlParam('currency');
    this.accountNumber = getUrlParam('accountNumber');
  },
  methods: {
    CopyUrl() {
      let url = document.querySelector('#copyObj');
      url.select(); // 选择对象
      document.execCommand('Copy');
    }
  },
  mounted() {
    const container = document.getElementById('qrcode');
    const qr = new QRCode(container, {
      typeNumber: -1,
      correctLevel: 2,
      foreground: '#000000'
    });
    qr.make(this.adress);
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.wallet-into-wrapper {
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
    line-height: 0.88rem;
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;

    p {
      display: flex;
      justify-content: space-between;
      a {
        color: #333;
      }

      .icon {
        width: 0.2rem;
        height: 0.36rem;
        @include bg-image("返回");
        margin-top: 0.28rem;
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
  .txt2{
      float: right;
    }
  .prompt {
    width: 100%;
    height: 1rem;
    background: #fff6eb;
    padding: 0.16rem 0.3rem 0.18rem;
    position: relative;
    .text {
      width: 6.26rem;
      display: inline-block;
      font-size: 0.24rem;
      line-height: 0.33rem;
      color: #f59218;
    }
    .icon {
      width: 0.28rem;
      height: 0.28rem;
      @include bg-image("删 除");
      position: absolute;
      right: 0.3rem;
      top: 0.36rem;
    }
  }

  .my-address {
    font-weight: bold;
    line-height: 0.45rem;
    padding: 0.4rem 0 0.53rem;
  }

  .erweima {
    width: 5.4rem;
    height: 5.4rem;
    margin: 0 auto;
    margin-bottom: 0.52rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    @include bg-image("二维码 框");
    position: relative;
    .ewm-wrap {
      width: 4.42rem;
      height: 4.42rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fdfeff;
      box-shadow: 0 0.02rem 0.24rem 0 rgba(149, 61, 43, 0.16);
      border-radius: 0.16rem;
      .qrcode {
        width: 3.8rem;
        height: 3.8rem;
        background: #ccc;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .address {
    width: 100%;
    padding: 0 0.6rem;
    font-size: 0.28rem;
    text-align: left;
    margin-bottom: 0.56rem;

    .txt {
      margin-bottom: 0.16rem;
      line-height: 0.4rem;
    }

    .url {
      width: 6.3rem;
      height: 0.8rem;
      opacity: 0.8;
      background: #fffdfd;
      box-shadow: 0 0.02rem 0.16rem 0 rgba(149, 43, 43, 0.1);
      border-radius: 0.08rem;
      text-indent: 0.22rem;
      font-size: 0.28rem;
      color: #666;
      line-height: 0.8rem;
    }
  }

  button {
    width: 6.9rem;
    height: 0.96rem;
    background: #d53d3d;
    border-radius: 0.08rem;
    color: #fff;
    line-height: 0.96rem;
    font-size: 0.32rem;
    line-height: 0.96rem;
  }
}
</style>