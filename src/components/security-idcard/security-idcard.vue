<template>
  <div class="idcard-wrapper" @click.stop>
    <div class="wrapper">
      <Scroll :pullUpLoad="null">
        <div class="main">
          <p style="border-bottom: .01rem solid #e3e3e3;">
            <input
              class="item-input"
              type="text"
              :placeholder="$t('securityIdcard.subject.qsrxm')"
              v-model="config.realName"
            >
          </p>
          <p style="border-bottom: .01rem solid #e3e3e3;">
            <input
              class="item-input"
              type="text"
              placeholder="请输入身份证号"
              v-model="config.idNo"
            >
          </p>
        </div>
        <div class="id-pic">
          <h5>请上传以下资料，保持图片清晰，文字可辨认</h5>
          <div class="pic-box">
            <qiniu
              ref="qiniu"
              style="visibility: hidden;position: absolute;"
              :token="token"
              :uploadUrl="uploadUrl">
            </qiniu>
            <input
              type="file"
              :multiple="multiple"
              ref="fileInput"
              @change="fileChange($event, 'z')"
              accept="image/*"
            />
            <p class="add-pic pic_zm"></p>
            <div class="pic"><img src="" alt="" width="100%" height="100%" ref="zf_z"></div>
          </div>
          <p class="pic-tit">本人身份证人像面</p>
          <div class="pic-box" style="margin-top: 0.3rem;">
            <qiniu
              ref="qiniu"
              style="visibility: hidden;position: absolute;"
              :token="token"
              :uploadUrl="uploadUrl">
            </qiniu>
            <input
              type="file"
              :multiple="multiple"
              ref="fileInput1"
              @change="fileChange($event, 'f')"
              accept="image/*"
            />
            <p class="add-pic pic_fm"></p>
            <div class="pic"><img src="" alt="" width="100%" height="100%" ref="zf_f"></div>
          </div>
          <p class="pic-tit">本人身份证国徽面</p>
          <div class="pic-box" style="margin-top: 0.3rem;">
            <qiniu
              ref="qiniu"
              style="visibility: hidden;position: absolute;"
              :token="token"
              :uploadUrl="uploadUrl">
            </qiniu>
            <input
              type="file"
              :multiple="multiple"
              ref="fileInput2"
              @change="fileChange($event, 'l')"
              accept="image/*"
            />
            <p class="add-pic pic_sc"></p>
            <div class="pic"><img src="" alt="" width="100%" height="100%" ref="zf_l"></div>
          </div>
          <p class="pic-tit">本人手持身份证+手写纸条</p>
          <p class="tip_tit">（示例:大文通2019.7.17实名认证)</p>
        </div>
        <div class="foot">
          <button @click="scIdCard">{{$t('securityIdcard.subject.qd')}}</button>
        </div>
      </Scroll>
    </div>
    <Toast ref="toast" :text="text"/>

  </div>
</template>
<script>
import Qiniu from 'base/qiniu/qiniu';
import EXIF from 'exif-js';
import {formatImg, getImgData, getUserId, setTitle} from 'common/js/util';
import { getQiniuToken } from 'api/general';
import { userAttestation } from 'api/user';
import Toast from 'base/toast/toast';
import Scroll from 'base/scroll/scroll';
export default {
  data() {
    return {
      text: this.$t('securityIdcard.subject.fqcg'),
      rzText: '',
      show: true,
      token: '',
      multiple: false,
      photos: [],
      uploadUrl: '',
      rzType: '',
      config: {
        frontImage: '',
        backImage: '',
        faceImage: '',
        realName: '',
        idNo: ''
      }
    };
  },
  created() {
    setTitle('身份证认证');
  },
  mounted() {
    this.uploadUrl = 'http://up.qiniup.com';
    getQiniuToken().then(data => {
      this.token = data.uploadToken;
    })
  },
  methods: {
    get() {
      this.show = false;
    },
    uploadPhoto(base64, key) {
      return this.$refs.qiniu.uploadByBase64(base64, key);
    },
    updatePhotos(item) {
      for (let i = 0; i < this.photos.length; i++) {
        if (this.photos[i].key === item.key) {
          this.photos.splice(i, 1, item);
          break;
        }
      }
    },
    onUploadError(error) {
      this.text = (error.body && error.body.error) || `${error.message}:10M` || this.$t('securityIdcard.subject.tpcc');
      this.$refs.toast.show();
    },
    /**
      * 从相册中选择图片
    * */
    fileChange(e, zf_ty) {
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
            }
            self.updatePhotos(item);
            if(zf_ty === 'z'){
              self.$refs.zf_z.src = formatImg(self.photos[0].key);
              self.config.frontImage = self.photos[0].key;
            }
            if(zf_ty === 'f'){
              self.$refs.zf_f.src = formatImg(self.photos[0].key);
              self.config.backImage = self.photos[0].key;
            }
            if(zf_ty === 'l'){
              self.$refs.zf_l.src = formatImg(self.photos[0].key);
              self.config.faceImage = self.photos[0].key;
            }
          }).catch(err => {
            self.onUploadError(err);
          });
          self.$refs.fileInput.value = null;
          self.$refs.fileInput1.value = null;
          self.$refs.fileInput2.value = null;
        });
      };
      reader.readAsDataURL(file);
    },
    scIdCard(){
      const {realName, idNo, frontImage, backImage, faceImage} = this.config;
      if(!realName || !idNo || !frontImage || !backImage || !faceImage) {
        this.text = '请填写完整';
        this.$refs.toast.show();
        return;
      }
      userAttestation(this.config).then(() => {
        this.$refs.toast.show();
        const toBank = sessionStorage.getItem('toBank');
        setTimeout(() => {
          if(toBank) {
            this.$router.push(toBank);
          }else {
            this.$router.push('/mine');
          }
        }, 1500);
      })
    }
  },
  components: {
    Qiniu,
    Toast,
    Scroll
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.idcard-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  .wrapper{
    position: absolute;
    z-index: 10;
    top: 0rem;
    bottom: 0rem;
    left: 0;
    right: 0;
    overflow: hidden;
    background-color: #fff;
  }
  .main {
    width: 100%;
    padding: 0 .3rem;
    font-size: .32rem;
    color: #333;
    font-weight: bold;
    background: #fff;
    p {
      height: 1.1rem;
      line-height: 1.1rem;
      margin-bottom: .1rem;
    }
    input {
      padding: 0.2rem 0;
    }
    input[attr='placeholder'] {
      color: #ccc;
    }
    .item-input{
      width: 100%;
    }
  }
  .id-pic{
    padding-top: 0.2rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
    h5{
      font-size: 0.28rem;
      margin-bottom: .4rem;
      color: #999999;
      font-weight: 400;
    }
    .pic-box{
      border-radius: 0.04rem;
      padding: 0.03rem;
      width: 5.2rem;
      margin: 0 auto;
      height: 2.8rem;
      position: relative;
      font-size: 0.28rem;
      color: #b3b3b3;
      text-align: center;
      input{
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
        position: absolute;
        z-index: 9;
      }
      .add-pic{
        color: #666;
        font-size: 2rem;
        font-weight: 200;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
      }
      .pic_zm{
        background-image: url('./card__zheng.png')
      }
      .pic_fm{
        background-image: url('./card__fan.png')
      }
      .pic_sc{
        background-image: url('./card__sc.png')
      }
      .pic{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
        background-color: transparent;
      }
    }
    .pic-tit{
      color: #333333;
      font-size: 0.28rem;
      margin: 0.16rem 0 0.3rem;
      text-align: center;
      font-weight: 600;
    }
    .tip_tit{
      color: #BABABA;
      font-size: 0.26rem;
      margin-top: -0.1rem;
      text-align: center;
    }
  }

  .foot {
    width: 100%;
    text-align: center;
    padding-top: 0.8rem;
    padding-bottom: 0.98rem;
    background-color: #fff;
    button {
      width: 6.28rem;
      height: 1rem;
      background: #d53d3d;
      border-radius: .08rem;
      font-size: .32rem;
      color: #fff;
    }
  }
}
</style>
