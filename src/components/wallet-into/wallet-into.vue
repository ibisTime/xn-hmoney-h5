<template>
  <div class="wallet-into-wrapper" @click.stop>
    <div class='prompt' v-show="txtShow">
        <p class='text'>
            {{currency}}{{$t('walletInto.subject.qbjz')}}{{currency}}{{$t('walletInto.subject.qbzw')}}{{currency}}{{$t('walletInto.subject.qbzh')}}
        </p>
        <i class='icon' @click="txtShow = false"></i>
    </div>
    <p class='my-address'>
        {{$t('walletInto.subject.zrdz')}}
    </p>
    <div class='erweima'>
        <div class='ewm-wrap'>
            <div class='qrcode' id="qrcode"></div>
        </div>
    </div>
    <div class='address'>
        <p class='txt'>{{$t('walletInto.subject.dz')}} <router-link :to="'wallet-bill'+'?accountNumber=' + accountNumber" class='txt2'>{{$t('walletInto.subject.jl')}}</router-link></p>
        <input id='copyObj' class='url' readonly type="text" v-model="adress"/>
    </div>
    <button @click='CopyUrl' ref="copy" data-clipboard-action="copy" data-clipboard-target="#copyObj">{{$t('walletInto.subject.fzskdz')}}</button>
    <Toast :text="textMsg" ref="toast" />
  </div>
</template>
<script>
import { getUrlParam, setTitle } from 'common/js/util';
import Toast from 'base/toast/toast';
const QRCode = require('js-qrcode');
export default {
  data() {
    return {
      txtShow: true,
      textMsg: '',
      adress: '',
      currency: '',
      accountNumber: '',
      copyBtn: null
    };
  },
  created() {
    setTitle(this.$t('walletInto.subject.zr'));
    this.adress = getUrlParam('adress');
    this.currency = getUrlParam('currency');
    this.accountNumber = getUrlParam('accountNumber');
  },
  mounted() {
    const container = document.getElementById('qrcode');
    const qr = new QRCode(container, {
      typeNumber: -1,
      correctLevel: 2,
      foreground: '#000000'
    });
    qr.make(this.adress);
    this.copyBtn = new this.clipboard(this.$refs.copy);
  },
  methods: {
    CopyUrl() {
      // let url = document.querySelector('#copyObj');
      // url.select(); // 选择对象
      // if(!document.execCommand('Copy')){
      //   this.textMsg = this.$t('walletInto.subject.gbzc');
      //   this.$refs.toast.show();
      // }
      let _this = this;
      let clipboard = _this.copyBtn;
      clipboard.on('success', function() {
          _this.textMsg = _this.$t('walletInto.subject.fzcg');
          _this.$refs.toast.show();
      });
      clipboard.on('error', function() {
          _this.textMsg = _this.$t('walletInto.subject.gbzc');
          _this.$refs.toast.show();
      });
    }
  },
  components: {
    Toast
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
        background-image: url('./fh.png');
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
      display: inline-block;
      font-size: 0.24rem;
      line-height: 0.33rem;
      color: #f59218;
      text-align: left;
      padding-right: 0.36rem;
    }
    .icon {
      width: 0.28rem;
      height: 0.28rem;
      background-image: url('./sc.png');
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
    background-image: url('./ewm.png');
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
      font-size: 0.25rem;
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
