<template>
  <div class="mine-wrapper" @click.stop>
    <Scroll :pullUpLoad="null">
      <div class="mine-header">
        <div class="my">
          <div class="pic" :style="picUrl ? {backgroundImage: picUrl} : ''">
            <HeadPic :content="picName" :class="{'hidden': data.photo || photos.length}"/>
            <qiniu
              ref="qiniu"
              style="visibility: hidden;position: absolute;"
              :token="token"
              :uploadUrl="uploadUrl"></qiniu>
            <input class="input-file"
                   type="file"
                   :multiple="multiple"
                   ref="fileInput"
                   @change="fileChange($event)"
                   accept="image/*"/>
          </div>
          <div class="h-text">
            <p class="h-text_p">
              <router-link :to="`security-loginName?loginName=${data.nickname ? data.nickname : data.loginName}`" class="name">
                {{data.nickname ? data.nickname : data.loginName}}
              </router-link>
            </p>
            <p class="intro">{{$t('mine.subject.jy')}} {{data.userStatistics && data.userStatistics.jiaoYiCount}} | {{$t('mine.subject.hpl')}}
              {{data.userStatistics && getPercentum(data.userStatistics.beiHaoPingCount, data.userStatistics.beiPingJiaCount)}} |
              {{$t('mine.subject.xr')}} {{data.userStatistics && data.userStatistics.beiXinRenCount}}</p>
          </div>
        </div>
        <div class="mine_tabs">
          <router-link class="tab_box" to="system-notice" @click.native="removeSession">
            <p><img src="./mine_gg@2x.png" alt=""></p>
            <p>消息</p>
          </router-link>
          <p class="b_r"></p>
          <router-link class="tab_box" to="mine-team">
            <p><img src="./mine_td.png" alt=""></p>
            <p>团队</p>
          </router-link>
          <p class="b_r"></p>
          <router-link class="tab_box" to="my-inviteFriends">
            <p><img src="./mine_tj.png" alt=""></p>
            <p>推荐</p>
          </router-link>
        </div>
      </div>
      <div class="mine-main">
        <div class="card">
          <router-link to="security-center" class="item item-6">
            <i></i>
            <span class="txt">账户与安全</span>
            <span class='icon'></span>
          </router-link>
          <router-link to="mine-address" class="item item-4">
            <i></i>
            <span class="txt">收货地址</span>
            <span class='icon'></span>
          </router-link>
        </div>
        <p class="line"></p>
        <div class="card">
          <router-link to="about-platformIntroduced?ckey=help_note" class="item item-5">
            <i></i>
            <span class='txt'>帮助中心</span>
            <span class='icon'></span>
          </router-link>
          <router-link to="my-aboutUs" class="item item-6">
            <i></i>
            <span class='txt'>关于我们</span>
            <span class='icon'></span>
          </router-link>
        </div>
        <p class="line"></p>
        <div class="card">
          <router-link to="mine-setUp" class="item item-8">
            <i></i>
            <span class='txt'>设置</span>
            <span class='icon'></span>
          </router-link>
        </div>
      </div>
      <div style="height: 1.1rem;"></div>
    </Scroll>
    <Footer></Footer>
    <Toast :text="textMsg" ref="toast"/>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import Footer from 'components/footer/footer';
  import {getUser} from "api/person";
  import {changePhoto} from "api/user";
  import {setTitle, formatImg, getImgData, getPercentum} from 'common/js/util';
  import EXIF from 'exif-js';
  import Qiniu from 'base/qiniu/qiniu';
  import {getQiniuToken} from 'api/general';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import {mapGetters} from 'vuex';
  import HeadPic from 'base/head-pic/headPic';

  export default {
    name: 'test-keep-alive',
    data() {
      return {
        isLoading: true,
        data: {
          userStatistics: {
            jiaoYiCount: '',
            beiPingJiaCount: '',
            beiHaoPingCount: '',
            beiXinRenCount: ''
          }
        },
        textMsg: '',
        photos: [],
        token: '',
        uploadUrl: '',
        multiple: false,
        picName: '',
        picUrl: ''
      };
    },
    created() {
      setTitle('我的');
      getUser().then((data) => {
        this.isLoading = false;
        this.data = data;
        this.picName = data.nickname ? data.nickname.substring(0, 1) : data.loginName.substring(0, 1);
        this.getAvatar();
      }, () => {
        this.isLoading = false;
      });
    },
    activated() {
      this.$set(document, 'title', this.$t('mine.subject.grzx'));
    },
    mounted() {
      this.uploadUrl = PIC_PREFIX;
      getQiniuToken().then(data => {
        this.token = data.uploadToken;
      });
    },
    methods: {
      // 是否显示有新消息
      getUnreadMsgNum() {
        return this.unreadMsgNum > 0;
      },
      // 计算百分比
      getPercentum(num1, num2) {
        return getPercentum(num1, num2);
      },
      getAvatar() {
        if (this.photos.length || this.data.photo) {
          this.picUrl = `url(${formatImg(this.photos.length ? this.photos[0].key : this.data.photo)})`;
        }
      },
      /**
       * 从相册中选择图片
       * */
      fileChange(e) {
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        let self = this;
        let file = files[0];
        let orientation;
        EXIF.getData(file, function () {
          orientation = EXIF.getTag(this, 'Orientation');
        });
        let reader = new FileReader();
        reader.onload = function (e) {
          getImgData(file.type, this.result, orientation, function (data) {
            let _url = URL.createObjectURL(file);
            let item = {
              preview: data,
              ok: false,
              type: file.type,
              key: _url.split('/').pop() + '.' + file.name.split('.').pop()
            };
            self.uploadPhoto(data, item.key).then(() => {
              item = {
                ...item,
                ok: true
              };
              if (item.ok === true) {
                self.photos = [item];
                changePhoto(self.photos[0].key).then(() => {
                  self.textMsg = self.$t('mine.subject.ghcg');
                  self.$refs.toast.show();
                });
              }
              self.updatePhotos(item);
            }).catch(err => {
              self.onUploadError(err);
            });
            self.$refs.fileInput.value = null;
          });
        };
        reader.readAsDataURL(file);
      },
      onUploadError(error) {
        this.text = (error.body && error.body.error) || `${error.message}:10M` || this.$t('mine.subject.tpsc');
        this.$refs.toast.show();
      },
      updatePhotos(item) {
        for (let i = 0; i < this.photos.length; i++) {
          if (this.photos[i].key === item.key) {
            this.photos.splice(i, 1, item);
            break;
          }
        }
        this.getAvatar();
      },
      uploadPhoto(base64, key) {
        return this.$refs.qiniu.uploadByBase64(base64, key);
      },
      removeSession() {
        sessionStorage.removeItem('mes_skey');
      },
      toOrderFn(){
        sessionStorage.setItem('ordering', 'starting');
      }
    },
    components: {
      Scroll,
      Footer,
      Qiniu,
      Toast,
      FullLoading,
      HeadPic
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .mine-wrapper {
    width: 100%;
    height: 100%;
    background-color: #FAFAFA;
    .mine-header {
      width: 100%;
      height: 3.4rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      @include bg-image("mine");
      text-align: center;
      position: relative;
      z-index: 8;
      h4 {
        padding-top: 0.58rem;
        font: 0.36rem/0.5rem PingFangSC-Medium;
        color: #fff;
      }
      .my {
        width: 100%;
        margin: 0 auto;
        position: absolute;
        top: 0.75rem;
        left: 0;
        padding: 0 0.36rem;
        display: flex;
        align-items: center;
        .pic {
          position: relative;
          width: 1.16rem;
          height: 1.16rem;
          border-radius: 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          // background-image: url('./tou.png');
          .input-file {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }

        .h-text {
          height: 1.16rem;
          margin-left: 0.3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .h-text_p{
            font-size: 0;
            text-align: left;
          }
          .name {
            font: 0.44rem/0.48rem PingFangSC-Medium;
            color: #fff;
            letter-spacing: 0.004rem;
            padding-bottom: 0.12rem;
            padding-top: 0.04rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .intro {
            font: 0.28rem/0.48rem PingFangSC-Regular;
            color: #fff;
            letter-spacing: 0.0023rem;
          }
        }
      }
      .mine_tabs {
        display: flex;
        border-radius: 0.08rem;
        position: absolute;
        bottom: -0.48rem;
        height: 1.6rem;
        align-items: center;
        padding-top: 0.26rem;
        padding-bottom: 0.3rem;
        box-shadow: 0 0.08rem 0.08rem 0 #FFF2F0;
        font-size: 0.28rem;
        color: #999999;
        background-color: #fff;
        left: 0.3rem;
        right: 0.3rem;
        box-sizing: border-box;
        .tab_box{
          width: 33%;
          img{
            width: 0.5rem;
            height: 0.5rem;
            margin-bottom: 0.16rem;
          }
        }
        .b_r{
          width: 0.01rem;
          background-color: #EBEBEB;
        }
      }
    }

    .mine-main {
      margin: 0.9rem auto 0;
      display: flex;
      flex-direction: column;
      position: relative;

      .item-top {
        width: 100%;
        display: inline-block;
        height: 1.18rem;
        z-index: 1;
        font-size: 0.32rem;
        color: #333;
      }

      .card {
        padding: 0 0.3rem;
        /*box-shadow: 0 0 0.36rem 0.04rem rgba(200,193,193,0.30);*/
        /*border-radius: 0.16rem;*/
        .item {
          display: block;
          width: 100%;
          height: 1.18rem;
          overflow: hidden;
          position: relative;

          &:last-child {
            border-bottom: none;
          }

          i {
            display: inline-block;
            width: 0.54rem;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center left;
            background-size: 0.36rem;
            float: left;
          }

          .txt {
            float: left;
            font: 0.32rem/1.18rem PingFangSC-Regular;
          }

          .icon {
            float: right;
            margin-top: 0.5rem;
            width: 0.15rem;
            height: 0.26rem;
            background-repeat: no-repeat;
            background-position: center right;
            background-size: 0.15rem;
            background-image: url('./more.png');
            font-size: 0.24rem;
          }

          &.item-4 {
            i {
              background-image: url('./Fill 1@2x.png');
            }
          }

          &.item-5 {
            i {
              background-image: url('./mine_help.png');
            }
          }

          &.item-6 {
            i {
              background-image: url('./mine_zhaq.png');
            }
          }

          &.item-7 {
            i {
              background-image: url('./mine_owner.png');
            }
          }

          &.item-8 {
            i {
              background-image: url('./mine_set.png');
            }
          }

        }
      }

      .line{
        height: 0.2rem;
        background-color: #F0F0F0;
      }
    }
  }
</style>
