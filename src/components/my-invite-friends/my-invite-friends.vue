<template>
  <div class="invite-friends-wrapper" @click.stop>
      <div class='friends icon'>
          <div class='content'>
            <div class='logo'></div>
            <div class="pic icon"></div>
            <div class="text1">
                {{$t('myInviteFriends.subject.snyf')}}<span class='red1'>{{$t('myInviteFriends.subject.szzc')}}</span>
            </div>
            <i class='icon ico1'></i>
            <p class='text2 red2'> {{$t('myInviteFriends.subject.mgryg')}}</p>
            <p class='text3'>{{$t('myInviteFriends.subject.ynsn')}}</p>
            <p class="text4">{{$t('myInviteFriends.subject.snesn')}}</p>

          </div>

      </div>
      <div class='main'>
          <div class='text'>
              <p class='txt1'>{{nickName}}</p>
              <p class='txt2'>{{$t('myInviteFriends.subject.yqnjr')}}</p>
              <p class='txt2'>{{$t('myInviteFriends.subject.casb')}}</p>
          </div>
          <div id='qrcode'></div>
      </div>
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template> 
<script>
const QRCode = require('js-qrcode');
import {getUserId, setTitle} from 'common/js/util';
import FullLoading from 'base/full-loading/full-loading';
import {getUser} from 'api/user';

export default {
  name: 'test-keep-alive',
  data() {
    return {
        nickName: '',
        isLoading: true
    };
  },
  mounted() {
    setTitle(this.$t('myInviteFriends.subject.yqhy'));
    getUser().then(data => {
        this.nickName = data.nickname;
        this.isLoading = false;
    }, () => {
        this.isLoading = false;
    });
    this.userId = getUserId();
    this.wxUrl = window.location.origin + '/registered' + '?inviteCode=' + getUserId();
    const container = document.getElementById('qrcode');
    const qr = new QRCode(container, {
      typeNumber: -1,
      correctLevel: 2,
      foreground: '#000000'
    });
    qr.make(this.wxUrl);
  },
  components: {
      FullLoading
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
        background-image: url('./yqbj.png');
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
                background-image: url('./yqhysjx.png');
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
