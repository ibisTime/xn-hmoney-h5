<template>
  <div class="invite-friends-wrapper" @click.stop>
      <div class='friends icon'>
          <div class='content'>
            <div class="pic icon"></div>
            <div class="yq-box">
                <p class="yq_p1">{{nickName}}</p>
                <p class="yq_p2">{{$t('myInviteFriends.subject.yqnjr')}}</p>
            </div>
            <div class="rq-code">
                <div id='qrcode'></div>
            </div>
            <div class="qr-txt">
                {{$t('myInviteFriends.subject.fuzzs')}}
                <span @click="isFz = false;">{{$t('myInviteFriends.subject.fz')}}</span>
            </div>
          </div>
      </div>
      <div class='main-btn'>
          <span class="icon ic_bz"></span>
          {{$t('myInviteFriends.subject.bzbd')}}
      </div>
      <div class="ress-box" :class="{'hidden': isFz}">
          <textarea class="ress" type="text" id="copyObj" readonly v-model="wxUrl">
          </textarea>
          <div class="ress-btn" @click='CopyUrl'>
              复制
          </div>
      </div>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template> 
<script>
const QRCode = require('js-qrcode');
import {getUserId, setTitle} from 'common/js/util';
import FullLoading from 'base/full-loading/full-loading';
import Toast from 'base/toast/toast';
import {getUser} from 'api/user';

export default {
  name: 'test-keep-alive',
  data() {
    return {
        nickName: '',
        isLoading: true,
        wxUrl: '',
        userId: '',
        isFz: true,
        textMsg: ''
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
  methods: {
    CopyUrl() {
        let url = document.querySelector('#copyObj');
        url.select(); // 选择对象
        if(!document.execCommand('Copy')){
            this.textMsg = this.$t('walletInto.subject.gbzc');
            this.$refs.toast.show();
        }else{
            this.textMsg = '复制成功';
            this.$refs.toast.show();
            setTimeout(() => {
                this.isFz = true;
            }, 1000);
        }
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
            overflow: hidden;
            .logo {
                width: 1.1rem;
                height: .48rem;
            }
            .pic {
                width: 2.5rem;
                margin: 0 auto;
                height: 2.25rem;
                background-image: url('./logo.png');
                margin-top: 1.06rem;
                margin-bottom: 1rem;
            }
            .yq-box{
                color: #fff;
                margin-bottom: 0.32rem;
                p{
                    margin-top: 0.22rem;
                }
                .yq_p1{
                    font-size: 0.32rem;
                }
                .yq_p2{
                    font-size: 0.28rem;
                }
            }
            .rq-code{
                margin: 0 auto;
                width: 3.6rem;
                height: 3.6rem;
                border-radius: 0.12rem;
                margin-bottom: 0.38rem;
                background-color: #fff;
                padding: 0.28rem;
            }
            .qr-txt{
                height: 0.96rem;
                line-height: 0.96rem;
                color: #fff;
                font-size: 0.26rem;
                span{
                    display: inline-block;
                    border-radius: 0.04rem;
                    border: 1px solid #fff;
                    margin-left: 0.2rem;
                    line-height: 1;
                    vertical-align: middle;
                    padding: 0.1rem 0.25rem;
                }
            }
        }
    }
    .main-btn{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.98rem;
        line-height: 0.98rem;
        font-size: 0.3rem;
        color: #fff;
        text-align: center;
        background-color: #141e68;
        opacity: 0.8;
        border-bottom: 2px solid #687cfd;
        .ic_bz{
            display: inline-block;
            width: 0.3rem;
            height: 0.3rem;
            background-image: url('./bcbd.png');
            margin-right: 0.14rem;
            vertical-align: middle;
        }
    }
    .ress-box{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 5rem;
        border-radius: 0.2rem;
        padding: 0.3rem;
        background-color: #fff;
        .ress{
            width: 100%;
            height: 3rem;
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 0.15rem;
            padding-top: 0.2rem;
            border-radius: 0.1rem;
            font-size: 0.34rem;
            line-height: 1.4;
            word-wrap: break-word;
        }
        .ress-btn{
            margin-top: 0.35rem;
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            border: 1px solid #ddd;
            font-size: 0.34rem;
            letter-spacing: 0.04rem;
            color: #333;
            border-radius: 0.06rem;
        }
    }

} 
</style>
