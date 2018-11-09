<template>
  <div class="mine-wrapper" @click.stop>
    <div class="mine-header">
      <div class="my">
        <div class="pic" :style="getAvatar()">
            <HeadPic :content="picName" :class="{'hidden': data.photo}"/>
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
          <p class="name">{{data.nickname}}</p>
          <p class="intro">{{$t('mine.subject.jy')}} {{data.userStatistics.jiaoYiCount}} | {{$t('mine.subject.hpl')}} {{getPercentum(data.userStatistics.beiHaoPingCount, data.userStatistics.beiPingJiaCount)}} | {{$t('mine.subject.xr')}} {{data.userStatistics.beiXinRenCount}}</p>
        </div>
      </div>
    </div>
    <div class="mine-main">
      <div class="trading item-top ">
        <router-link to="wallet-top-up?type=buy" class="buy item-0">
          <i></i>
          <span>{{$t('mine.subject.wygm')}}</span>
        </router-link>
        <router-link to="otc" class="sell item-1" @click.native="toOtcFn">
          <i></i>
          <span>{{$t('mine.subject.wycs')}}</span>
        </router-link>
      </div>

      <div class="card">
        <router-link to="my-advertising" class="item item-3">
          <i></i>
          <span class='txt'>{{$t('mine.subject.wdgg')}}</span>
          <span class='icon'></span>
        </router-link>
        <router-link to="my-order" class="item item-4" @click.native="toOrderFn">
            <i></i>
            <span class="txt">{{$t('mine.subject.wddd')}}</span>
            <span class='icon' v-if="getUnreadMsgNum()">{{$t('mine.subject.nyxxx')}}</span>
        </router-link>
      </div>

      <div class="card">
        <router-link to="my-guest" class="item item-5">
          <i></i>
          <span class='txt'>{{$t('mine.subject.jyds')}}</span>
          <span class='icon'></span>
        </router-link>
        <router-link to="my-inviteFriends" class="item item-6">
          <i></i>
          <span class="txt">{{$t('mine.subject.yqhy')}}</span>
          <span class='icon'></span>
        </router-link>
      </div>

      <div class="card">
        <router-link to="security-center" class="item item-7">
          <i></i>
          <span class='txt'>{{$t('mine.subject.aqzx')}}</span>
          <span class='icon'></span>
        </router-link>
        <router-link to="my-aboutUs" class="item item-8">
          <i></i>
          <span class="txt">{{$t('mine.subject.gywm')}}</span>
          <span class='icon'></span>
        </router-link>
      </div>
    </div>
    <div style="height: 1.1rem;"></div>
    <Footer></Footer>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import Footer from 'components/footer/footer';
import { getUser } from "api/person";
import { changePhoto } from "api/user";
import { setTitle, formatImg, getImgData, getPercentum } from 'common/js/util';
import EXIF from 'exif-js';
import Qiniu from 'base/qiniu/qiniu';
import { getQiniuToken } from 'api/general';
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
      textMsg:'',
      photos: [],
      token: '',
      uploadUrl: '',
      multiple: false,
      picName: ''
    };
  },
  computed: {
    ...mapGetters([
      'unreadMsgNum'
    ])
  },
  created() {
    setTitle(this.$t('mine.subject.grzx'));
    getUser().then((data) => {
      this.isLoading = false;
      this.data = data;
      this.picName = data.nickname.substring(0, 1);
    }, () => {
      this.isLoading = false;
    });
  },
  activated() {
    this.$set(document, 'title', this.$t('mine.subject.grzx'));
  },
  mounted() {
    this.uploadUrl = 'http://pgf8juy5p.bkt.clouddn.com/';  // http://pgf8juy5p.bkt.clouddn.com/  http://up-z0.qiniup.com
    getQiniuToken().then(data => {
      this.token = data.uploadToken;
    });
  },
  methods: {
    // 是否显示新消息
    getUnreadMsgNum() {
      return this.unreadMsgNum > 0;
    },
    // 计算百分比
    getPercentum(num1, num2){
        return getPercentum(num1, num2);
    },
    getAvatar() {
      if(this.photos.length || this.data.photo) {
        return {
          backgroundImage: `url(${formatImg(this.photos.length ? this.photos[0].key : this.data.photo)})`
        }
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
      EXIF.getData(file, function() {
        orientation = EXIF.getTag(this, 'Orientation');
      });
      let reader = new FileReader();
      reader.onload = function(e) {
        getImgData(file.type, this.result, orientation, function(data) {
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
            if(item.ok === true) {
              self.photos = [item];
              changePhoto(self.photos[0].key).then(() => {
                self.textMsg = self.$t('mine.subject.ghcg');
                self.$refs.toast.show();
              })
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
    },
    uploadPhoto(base64, key) {
      return this.$refs.qiniu.uploadByBase64(base64, key);
    },
    toOrderFn(){
      sessionStorage.setItem('ordering', 'starting');
    },
    toOtcFn(){
      sessionStorage.removeItem('coin');
      sessionStorage.setItem('tradeType', '1');
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
  background-color: #fff;

  .mine-header {
    width: 100%;
    height: 3.4rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    @include bg-image("mine");
    text-align: center;
    position: relative;

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

      .pic {
        position: relative;
        width: 1.16rem;
        height: 1.16rem;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        // background-image: url('./tou.png');
        float: left;
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
        float: left;
        margin-left: 0.3rem;
        .name {
          font: 0.44rem/0.48rem PingFangSC-Medium;
          color: #fff;
          text-align: left;
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
  }

  .mine-main {
    width: 92%;
    margin: 0 auto;
    margin-top: -0.86rem;
    display: flex;
    flex-direction: column;

    .item-top {
      width: 100%;
      display: inline-block;
      height: 1.18rem;
      z-index: 1;
      font-size: 0.32rem;
      color: #333;
    }

    .card{
      width: 100%;
      box-shadow: 0 0 0.36rem 0.04rem rgba(200,193,193,0.30);
      border-radius: 0.16rem;
      margin-bottom: 0.2rem;
      padding: 0 0.3rem;
      .item{
        display: block;
        width: 100%;
        height: 1.18rem;
        overflow: hidden;
        position: relative;
        border-bottom: 1px solid #eee;

        &:last-child{
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

        .txt{
          float: left;
          font: 0.32rem/1.18rem PingFangSC-Regular;
        }

        .icon {
          float: right;
          margin-top: 0.5rem;
          width: 0.15rem;
          height: 0.26rem;
          font-size: 0.25rem;
          background-repeat: no-repeat;
          background-position: center right;
          background-size: 0.15rem;
          background-image: url('./more.png');
          font-size: 0.24rem;
        }

        &.item-2 {
          i {
            background-image: url('./xzhb.png');
          }
        }

        &.item-3 {
          i {
            background-image: url('./wdgg.png');
          }
        }

        &.item-4 {
          i {
            background-image: url('./wddd.png');
          }
          .icon{
            width: 1.6rem;
            color: $primary-color;
            text-align: right;
            padding-right: 0.3rem;
          }
        }

        &.item-5 {
          i {
            background-image: url('./jyds.png');
          }
        }

        &.item-6 {
          i {
            background-image: url('./yqhy.png');
          }
        }

        &.item-7 {
          i {
            background-image: url('./aqzx.png');
          }
        }

        &.item-8 {
          i {
            background-image: url('./gywm.png');
          }
        }

      }
    }

    a {
      color: #333;
    }

    .trading {
      height: 1.4rem;
      background: #fdfeff;
      box-shadow: 0 0 0.36rem 0.04rem rgba(200,193,193,0.30);
      border-radius: 0.16rem;
      text-align: center;
      letter-spacing: 0.0018rem;
      text-align: center;
      display: flex;
      justify-content: space-around;
      margin-bottom: 0.2rem;
      a {
        font: 0.3rem/1.4rem PingFangSC-Regular;
        color: #333;
      }
      i {
        display: inline-block;
        width: 0.48rem;
        height: 0.48rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-bottom: 0.1rem;
        margin-right: 0.23rem;
      }

      .item-0 {
        i {
          background-image: url('./wbuy.png');
        }
        span {
          border-right: 0.01rem solid #ccc;
          padding-right: 0.78rem;
        }
      }

      .item-1 {
        i {
          background-image: url('./wsell.png');
        }
      }
    }
  }
}
</style>
