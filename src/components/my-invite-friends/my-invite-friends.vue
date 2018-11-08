<template>
  <div class="invite-friends-wrapper" @click.stop>
      <div class='friends icon'>
          <div class='content'>
            <div class="pic icon"></div>
            <div id='qrcode'></div>
          </div>
      </div>
      <div class='main-btn'>
          <span class="icon ic_bz"></span>
          保存至本地
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
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: .32rem;
    color: #333;
    background-image: url('./yqbj.png');
    background-size: 100% 100%;
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
        }
    }
    .main-btn{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.98rem;
        line-height: 0.98rem;
        font-size: 0.6rem;
        color: #fff;
        text-align: center;
        .ic_bz{
            display: inline-block;
            width: 0.3rem;
            height: 0.3rem;
            background-image: url('./bcbd.png');
            margin-right: 0.14rem;
            vertical-align: middle;
        }
    }

} 
</style>
