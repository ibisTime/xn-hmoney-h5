<template>
  <div class="invite-friends-wrapper" @click.stop>
      <div class='friends icon'>
          <div class='content'>
            <div class='logo'></div>
            <div class="pic icon"></div>
            <div class="text1">
                送您一份<span class='red1'>数字资产</span>
            </div>
            <i class='icon ico1'></i>
            <p class='text2 red2'> 每个人都应该拥有一些比特币</p>
            <p class='text3'>1年内，你就会明白它的珍贵；3年内，你就会明白它的价值；</p>
            <p class="text4">10年内，它会给你一个新的世界；20年内，它就是你的生活方式</p>

          </div>

      </div>
      <div class='main'>
          <div class='text'>
              <p class='txt1'>梵蒂冈</p>
              <p class='txt2'>邀请你加入FUN MVP</p>
              <p class='txt3'>长按识别二维码</p>
          </div>
          <div id='qrcode'></div>
      </div>
  </div>
</template> 
<script>
const QRCode = require('js-qrcode');
import {getUserId} from 'common/js/util';
import {URL} from 'common/js/config';

export default {
  data() {
    return {
    };
  },
  mounted() {
    this.userId = getUserId();
    this.wxUrl = URL;
    this.Url = this.wxUrl+this.userId;
    const container = document.getElementById('qrcode');
    const qr = new QRCode(container, {
      typeNumber: -1,
      correctLevel: 2,
      foreground: '#000000'
    });
    qr.make(this.Url);
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.invite-friends-wrapper {
    width: 100%;
    background: #fff;
    font-size: .32rem;
    color: #333;
    .red1 {
        color: #e55151;
    }
    .red2 {
        color: #da5b5b;
    }
    .icon {
        display: block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
    }

    .friends {
        width: 100%;
        height: 10.96rem;
        @include bg-image("邀请背景");
        position: relative;
        .content {
            width: 100%;
            text-align: center;
            position: absolute;
            top: .96rem;
            .logo {
                width: 1.1rem;
                height: .48rem;
                padding-bottom: .74rem;
            }
            .pic {
                width: 3.89rem;
                margin: 0 auto;
                height: .63rem;
                @include bg-image("FUNMVP");
                margin-bottom: .4rem;
            }
            .text1 {
                width: 3.8rem;
                margin: 0 auto;
                padding: .26rem 0;
                font-size: .45rem;
                color: #fff;
                border-top: .02rem solid #fff;
                border-bottom: .02rem solid #fff;
            }
            .ico1 {
                width: .24rem;
                margin: .8rem auto .6rem;
                height: .12rem;
                @include bg-image("邀请好友三角形箭头");
            }
            .text2 {
                font-size: .34rem;
                font-weight: bold;
                padding-bottom: .48rem;
            }
            .text3, .text4 {
                font-size: .2rem;
                color: #fff;
            }
            .text3 {
                padding-bottom: .25rem;
            }
        }
    }
    .main {
        width: 100%;
        height: 2.38rem;
        background: #fff;
        padding: .26rem .48rem .66rem .48rem;
        display: flex;
        justify-content: space-between;
        .text {
            padding-top: .22rem;
            .txt1 {
                font-size: .44rem;
                font-weight: bold;
                padding-bottom: .2rem;
            }
            .txt2 {
                font-size: .32rem;
                padding-bottom: .1rem;
            }
            .txt3 {
                font-size: .22rem;
                color: #999;
            }
        }
        #qrcode {
            width: 1.66rem;
            height: 1.66rem;
        }
    }

} 
</style>
