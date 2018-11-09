<template>
  <div class="invite-friends-wrapper" @click.stop>
      <div class='friends icon'>
            <div class='content' ref="copyImg" @click="isFz = true;">
                <div class="pic icon"></div>
                <div class="yq-box">
                    <p class="yq_p1">{{nickName}}</p>
                    <p class="yq_p2">{{$t('myInviteFriends.subject.yqnjr')}}</p>
                </div>
                <div class="rq-code">
                    <div id='qrcode'></div>
                </div>
            </div>
            <img src="" alt="" class="con-img" ref="conImg" @click="isFz = true;">
            <div class="qr-txt">
                {{$t('myInviteFriends.subject.bzbd')}}
            </div>
            <div class='main-btn' @click.stop="isFz = false;">
                {{$t('myInviteFriends.subject.fuzzs')}}
            </div>
      </div>
      <div class="ress-box" v-show="!isFz" @click.stop>
          <textarea class="ress" type="text" id="copyObj" readonly v-model="wxUrl">
          </textarea>
          <div class="ress-btn" ref="copy" data-clipboard-action="copy" data-clipboard-target="#copyObj" @click='CopyUrl'>
              {{$t('myInviteFriends.subject.fz')}}
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
import html2canvas from 'html2canvas';

export default {
  data() {
    return {
        nickName: '',
        isLoading: true,
        wxUrl: '',
        userId: '',
        isFz: true,
        textMsg: '',
        container: '',
        copyBtn: null
    };
  },
  created() {
    setTitle(this.$t('myInviteFriends.subject.yqhy'));
    this.userId = getUserId();
  },
  mounted() {
    getUser().then(data => {
        this.nickName = data.nickname;
        this.isLoading = false;
        this.wxUrl = window.location.origin + '/registered' + '?inviteCode=' + getUserId();
        this.container = document.getElementById('qrcode');
        const qr = new QRCode(this.container, {
        typeNumber: -1,
        correctLevel: 2,
        foreground: '#000000'
        });
        qr.make(this.wxUrl);
        this.saveImgFn();
    }, () => {
        this.isLoading = false;
    });
    this.copyBtn = new this.clipboard(this.$refs.copy);
  },
  methods: {
    CopyUrl() {
        // let url = document.querySelector('#copyObj');
        // url.select(); // 选择对象
        // if(!document.execCommand('Copy')){
        //     this.textMsg = this.$t('walletInto.subject.gbzc');
        //     this.$refs.toast.show();
        // }else{
        //     this.textMsg = '复制成功';
        //     this.$refs.toast.show();
        //     setTimeout(() => {
        //         this.isFz = true;
        //     }, 1000);
        // }
        let _this = this;
        let clipboard = _this.copyBtn;
        clipboard.on('success', function() {
            _this.textMsg = '复制成功';
            _this.$refs.toast.show();
            setTimeout(() => {
                _this.isFz = true;
            }, 1000);
        });
        clipboard.on('error', function() {
            _this.textMsg = _this.$t('walletInto.subject.gbzc');
            _this.$refs.toast.show();
        });
    },
    saveImgFn(){
        html2canvas(this.$refs.copyImg).then((canvas) => {
            // let down = document.getElementById('down');
            var url = canvas.toDataURL('image/png');
            this.$refs.conImg.setAttribute('src', url);
            // down.setAttribute('href', url);
            // down.click();
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

.invite-friends-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: .32rem;
    color: #333;
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
        height: 100%;
        position: relative;
        .content {
            width: 100%;
            height: 100%;
            background-image: url('./yqbj.png');
            position: relative;
            text-align: center;
            overflow: hidden;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            .logo {
                width: 1.1rem;
                height: .48rem;
            }
            .pic {
                width: 2.5rem;
                margin: 0 auto;
                height: 2.25rem;
                background-image: url('./logo.png');
                margin-top: 11%;
                margin-bottom: 8%;
            }
            .yq-box{
                color: #fff;
                margin-bottom: 4%;
                p{
                    margin-top: 4%;
                }
                .yq_p1{
                    height: 0.42rem;
                    font-size: 0.42rem;
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
                margin-bottom: 4.5%;
                background-color: #fff;
                padding: 0.28rem;
            }
        }
        .con-img{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 9;
        }
        .qr-txt{
            position: absolute;
            bottom: 2rem;
            z-index: 99;
            width: 100%;
            text-align: center;
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
    .main-btn{
        position: absolute;
        bottom: 0;
        z-index: 99;
        width: 100%;
        height: 0.98rem;
        line-height: 0.98rem;
        font-size: 0.3rem;
        color: #fff;
        text-align: center;
        background-color: #141e68;
        opacity: 0.8;
        border-top: 2px solid #687cfd;
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
        z-index: 999;
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
