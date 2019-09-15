<template>
    <div class="invite-friends" @touchmove.prevent>
        <div class="invite_box" ref="copyImg">
            <div class="invite_wrp">
                <div class="invite_name">
                    <h5>{{nickName}}</h5>
                    <p>邀请您加入大文通</p>
                </div>
                <div class="invite_qcode">
                    <div id="qcode">
                        <qrcode :url="wxUrl" :iconurl="logoPic" :wid="140" :hei="140" :imgwid="30" :imghei="30"></qrcode>
                    </div>
                </div>
            </div>
        </div>
        <div class="textarea_box">
            <textarea class="ress" type="text" id="copyObj" readonly v-model="wxUrl" />
        </div>
        <div class="img_box">
            <img src="" alt="" ref="conImg">
        </div>
        <div class="link_btn">
            <div class="left">您的专属邀请链接</div>
            <div class="right" ref="copy" data-clipboard-action="copy" data-clipboard-target="#copyObj" @click='CopyUrl'>复制链接</div>
        </div>
        <div class="foo_btn" @click="downPic">
            长按保存至本地
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
import qrcode from 'vue_qrcodes';

export default {
  data() {
    return {
        nickName: '',
        isLoading: true,
        wxUrl: '',
        userId: '',
        textMsg: '',
        container: '',
        copyBtn: null,
        picUrl: '',
        logoPic: require('./yqbj.png')
    };
  },
  created() {
    setTitle('邀请有礼');
    this.userId = getUserId();
  },
  mounted() {
    getUser().then(data => {
        this.nickName = data.realName ? data.realName : data.nickname;
        this.isLoading = false;
        this.wxUrl = '点击该链接' + window.location.origin + '/registered' + '?inviteCode=' + getUserId() + `，${this.nickName}邀请您加入大文通`;
        // this.container = document.getElementById('qcode');
        // const qr = new QRCode(this.container, {
        //   typeNumber: -1,
        //   correctLevel: 2,
        //   foreground: '#000000'
        // });
        setTimeout(() => {
            this.saveImgFn();
        }, 0)
    }, () => {
        this.isLoading = false;
    });
    this.copyBtn = new this.clipboard(this.$refs.copy);
  },
  methods: {
    CopyUrl() {
        let _this = this;
        let clipboard = _this.copyBtn;
        clipboard.on('success', function() {
            _this.textMsg = _this.$t('walletInto.subject.fzcg');
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
        html2canvas(this.$refs.copyImg, {
            useCORS: true,
            width: window.screen.availWidth,
            height: window.screen.availHeight,
            windowWidth: document.body.scrollWidth,
            windowHeight: document.body.scrollHeight
        }).then((canvas) => {
            this.picUrl = canvas.toDataURL('image/png');
            this.$refs.conImg.setAttribute('src', this.picUrl);
        });
    },
    downloadIamge(imgsrc, name) {//下载图片地址和图片名
        var image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
            var a = document.createElement("a"); // 生成一个a元素
            var event = new MouseEvent("MouseEvents"); // 创建一个单击事件
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.download = name || "photo"; // 设置图片名称
            a.href = url; // 将生成的URL设置为a.href属性
            a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
    },
    downPic(){
        this.downloadIamge(this.picUrl, '邀请好友');
    }
  },
  components: {
      FullLoading,
      Toast,
      qrcode
  }
};
</script>

<style lang="scss" scoped>
    .invite-friends{
        position: relative;
        height: 100%;
        .invite_box{
            position: relative;
            height: 100%;
            background-image: url('./friends_bg.png');
            background-size: 100% 100%;
            .invite_wrp{
                position: absolute;
                top: 25%;
                left: 0;
                right: 0;
                text-align: center;
                .invite_name{
                    color: #fff;
                    margin-bottom: 0.6rem;
                    h5{
                        font-size: 0.36rem;
                        margin-bottom: 0.4rem;
                    }
                    p{
                        font-size: 0.28rem;
                    }
                }
                .invite_qcode{
                    width: 6rem;
                    height: 4rem;
                    margin: 0 auto;
                    background-image: url('./qcode_bg.png');
                    background-size: 100% 100%;
                    position: relative;
                    #qcode{
                        position: absolute;
                        top: 0.1rem;
                        left: 50%;
                        width: 2.8rem;
                        height: 2.8rem;
                        transform: translateX(-50%);
                    }
                }
            }
        }
        .textarea_box{
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            background-color: transparent;
        }
        .img_box{
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0rem;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .link_btn{
            position: absolute;
            left: 1rem;
            right: 1rem;
            bottom: 1.8rem;
            font-size: 0.28rem;
            color: #fff;
            padding: 0.24rem 0.4rem 0.24rem 0.58rem;
            border-radius: 0.03rem;
            border: 0.02rem solid #363636;
            display: flex;
            .left{
                padding-right: 0.58rem;
                border-right: 0.02rem solid #2A2A28;
            }
            .right{
                padding-left: 0.3rem;
                color: #D4A267;
            }
        }
        .foo_btn{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1.2rem;
            line-height: 1rem;
            text-align: center;
            color: #fff;
            font-size: 0.34rem;
            // background-color: #272625;
            user-select: none;
        }
    }
</style>