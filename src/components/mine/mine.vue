<template>
  <div class="mine-wrapper" @click.stop>
    <div class="mine-header">
      <div class="my">
        <div class="pic" :style="getAvatar()">
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
          <p class="intro">交易 {{data.userStatistics.jiaoYiCount}} | 好评率 {{getPercentum(data.userStatistics.beiHaoPingCount, data.userStatistics.beiPingJiaCount)}} | 信用 {{data.userStatistics.beiXinRenCount}}</p>
        </div>
      </div>
    </div>
    <div class="mine-main">
      <div class="trading item-top ">
        <router-link to="wallet-top-up?type=buy" class="buy item-0">
          <i></i>
          <span>我要购买</span>
        </router-link>
        <router-link to="wallet-top-up?type=sell" class="sell item-1">
          <i></i>
          <span>我要出售</span>
        </router-link>
      </div>

      <!--<div class="card">-->
        <!--<router-link to="my-currency" class="item item-2">-->
          <!--<i></i>-->
          <!--<span class='txt'>选择货币</span>-->
          <!--<span class='icon'></span>-->
        <!--</router-link>-->
      <!--</div>-->

      <div class="card">
        <router-link to="my-advertising" class="item item-3">
          <i></i>
          <span class='txt'>我的广告</span>
          <span class='icon'></span>
        </router-link>
        <router-link to="my-order" class="item item-4">
            <i></i>
            <span class="txt">我的订单</span>
            <span class='icon'></span>
        </router-link>
      </div>

      <div class="card">
        <router-link to="my-guest" class="item item-5">
          <i></i>
          <span class='txt'>交易对手</span>
          <span class='icon'></span>
        </router-link>
        <router-link to="my-inviteFriends" class="item item-6">
          <i></i>
          <span class="txt">邀请好友</span>
          <span class='icon'></span>
        </router-link>
      </div>

      <div class="card">
        <router-link to="security-center" class="item item-7">
          <i></i>
          <span class='txt'>安全中心</span>
          <span class='icon'></span>
        </router-link>
        <router-link to="my-aboutUs" class="item item-8">
          <i></i>
          <span class="txt">关于我们</span>
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

export default {
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
      multiple: false
    };
  },
  created() {
    setTitle('个人中心');
    getUser().then((data) => {
      this.isLoading = false;
      this.data = data;
    }, () => {
      this.isLoading = false;
    });
  },
  mounted() {
    this.uploadUrl = 'http://pgf8juy5p.bkt.clouddn.com/';  // http://pgf8juy5p.bkt.clouddn.com/
    getQiniuToken().then(data => {
      this.token = data.uploadToken;
    });
  },
  computed: {},
  methods: {
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
                self.textMsg = '更换成功';
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
      this.text = (error.body && error.body.error) || `${error.message}:10M` || '图片上传出错';
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
    }
  },
  components: {
    Scroll,
    Footer,
    Qiniu,
    Toast,
    FullLoading
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
        background-size: 100% 100%;
        background-image: url('./tou.png');
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
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          background-image: url('./more.png');
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

    .item-Wrap {
      font: 0.32rem/1.18rem PingFangSC-Regular;
      letter-spacing: 0.0027rem;
      background: #fff;

      .box {
        height: 1.18rem;
        width: 6.7rem;
        margin-left: 0.22rem;
        position: relative;
        .line {
          width: 6.06rem;
          border-bottom: .01rem solid #e3e3e3;
          float: right;
        }
      }
     

      .txt {
        margin-left: 0.64rem;
      }

      .icon {
        background-image: url('./more.png');
      }

      .item-2 {
        i {
          background-image: url('./xzhb.png');
        }
      }

      .item-3 {
        i {
          width: 0.36rem;
          height: 0.33rem;
          background-image: url('./wdgg.png');
        }
      }

      .item-4 {
        i {
          width: 0.36rem;
          height: 0.36rem;
          background-image: url('./wddd.png');
        }
      }

      .item-5 {
        i {
          background-image: url('./jyds.png');
        }
      }

      .item-6 {
        i {
          background-image: url('./yqhy.png');
        }
      }

      .item-7 {
        i {
          width: 0.34rem;
          height: 0.4rem;
          background-image: url('./aqzx.png');
        }
      }

      .item-8 {
        i {
          background-image: url('./gywm.png');
        }
      }


      i {
        display: inline-block;
        position: absolute;
        top: 0.4rem;
        width: 0.4rem;
        height: 0.4rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }

      .icon {
        float: right;
        margin-top: 0.5rem;
        margin-right: 0.2rem;
        width: 0.15rem;
        height: 0.26rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
