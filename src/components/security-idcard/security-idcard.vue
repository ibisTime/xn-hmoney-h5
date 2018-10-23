<template>
  <div class="idcard-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon'></i>
        <span class='title'>身份证认证</span>
        </p>
    </header> -->
    <div class="main">
      <p><input type="text" placeholder="请输入姓名" v-model="config.realName"></p>
      <p><input type="text" :placeholder="`请输入${rzText}号`" v-model="config.idNo"></p>
    </div>
    <div class="id-pic">
      <h5>上传{{rzText}}</h5>
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
        <p class="add-pic"><img src="./sctp.png" alt=""></p>
        <p class="pic-tit">{{rzText}}正面</p>
        <div class="pic"><img src="" alt="" width="100%" height="100%" ref="zf_z"></div>
      </div>
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
        <p class="add-pic"><img src="./sctp.png" alt=""></p>
        <p class="pic-tit">{{rzText}}反面</p>
        <div class="pic"><img src="" alt="" width="100%" height="100%" ref="zf_f"></div>
      </div>
    </div>
    <div class="foot">
      <button @click="scIdCard">确 定</button>
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
export default {
  data() {
    return {
      text: '认证发起成功',
      rzText: '',
      show: true,
      token: '',
      multiple: false,
      photos: [],
      uploadUrl: '',
      rzType: '',
      config: {
        idFace: '',
        idOppo: '',
        applyUser: getUserId(),
        country: 'cn',
        idKind: '1',
        idNo: '',
        realName: ''
      }
    };
  },
  beforeRouteEnter (to, from, next) {console.log(1)
    if(from.path == '/security-identity'){
      next();
    }else{
      next('/security-center');
    }
  },
  created() {
    this.rzType = this.$route.params.type;
    switch(this.rzType){
      case 'sfz': 
        this.rzText = '身份证';
        this.config.idKind = '1';
        break;
      case 'hz': 
        this.rzText = '护照';
        this.config.idKind = '2';
        break;
      case 'jz': 
        this.rzText = '驾照';
        this.config.idKind = '3';
        break;
    };
    setTitle(this.rzText + '认证');
  },
  mounted() {
    this.uploadUrl = 'http://up-z0.qiniu.com';
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
      this.text = (error.body && error.body.error) || `${error.message}:10M` || '图片上传出错';
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
            if(zf_ty == 'z'){
              self.config.idFace = self.$refs.zf_z.src = formatImg(self.photos[0].key);
            }
            if(zf_ty == 'f'){
              self.config.idOppo = self.$refs.zf_f.src = formatImg(self.photos[0].key);
            }
          }).catch(err => {
            self.onUploadError(err);
          });
          self.$refs.fileInput.value = null;
          self.$refs.fileInput1.value = null;
        });
      };
      reader.readAsDataURL(file);
    },
    scIdCard(){
      userAttestation(this.config).then(data => {
        this.$refs.toast.show();
        setTimeout(() => {
          this.$router.push('/security-identity');
        }, 1500);
      })
    }
  },
  components: {
    Qiniu,
    Toast
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

  header {
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    background: #fff;
    width: 100%;
    padding: 0 0.3rem;
    padding-bottom: 0.4rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      background-image: url('./fh.png');
      float: left;
      margin-top: 0.31rem;
    }
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
      border-bottom: .01rem solid #e3e3e3;
    }
    input {
      height: 1rem;
    }
    input[attr='placeholder'] {
      color: #ccc;
    }
  }
  .id-pic{
    margin-top: .3rem;
    background-color: #fff;
    padding-top: 0.4rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
    h5{
      font-size: 0.32rem;
      margin-bottom: .3rem;
      color: #666;
      font-weight: 400;
    }
    .pic-box{
      border: 0.01rem solid #ccc;
      border-radius: 0.04rem;
      padding: 0.03rem;
      width: 95%;
      height: 4.1rem;
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
      .pic-tit{
        margin-top: -1rem;
      }
      .add-pic{
        margin-top: 20%;
        color: #666;
        font-size: 2rem;
        font-weight: 200;
        transform: translateY(-50%);
        z-index: 1;
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
  }

  .foot {
    width: 100%;
    text-align: center;
    margin-top: 1.2rem;
    margin-bottom: 2.43rem;
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
