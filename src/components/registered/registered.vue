<template>
  <div class="regist-wrapper" @click.stop>
      <div class="card">
          <h3 class="title">{{$t('registered.subject.zc')}}</h3>
          <p calss="tabs" id="tabs">
              <span :class="[flag ? 'activeClass tab-item' : '', 'tab-item']" @click="changeFlag1">{{$t('registered.subject.sjzc')}}</span>
              <!-- <span :class="[!flag ? 'activeClass tab-item' : '', 'tab-item']" @click="changeFlag2">{{$t('registered.subject.yxzc')}}</span> -->
          </p>
          <router-view></router-view>
          <div class="main-tel">
            <p class="iup_p" v-show="flag">
            <input required v-model="phone" name="phone" v-validate="'required|phone'" type="number" :placeholder="$t('registered.subject.srsjh')" @blur="blurIn">
            <span v-show="errors.has('phone')" class="error-tip">{{errors.first('phone')}}</span>
            </p>
            <p class="iup_p" v-show="!flag">
            <!-- <input required v-model="email" name="email" v-validate="'required|email'" type="text" :placeholder="$t('registered.subject.sryxh')" @blur="blurIn"> -->
            <span v-show="errors.has('email')" class="error-tip">{{errors.first('email')}}</span>
            </p>
            <p class="yzm iup_p">
            <input required v-model="smsCaptcha" name="capt" v-validate="'required|capt'" pattern="^\d{4}$" type="number" :placeholder="$t('registered.subject.sryzm')" @blur="blurIn">
            <span v-show="errors.has('capt')" class="error-tip capt">{{errors.first('capt')}}</span>
            <input v-show="!fscg && type== '0'" type="button" class="getYam" @click="getSca1()" :value="$t('registered.subject.hqyzm')" @blur="blurIn">
            <span class="cxfs" v-if="fscg && type== '0'">{{$t('registered.subject.cxfs')}}({{time1}}s)</span>
            <input v-show="!fscg1 && type== '1'" type="button" class="getYam" @click="getSca1()" :value="$t('registered.subject.hqyzm')" @blur="blurIn">
            <span class="cxfs" v-if="fscg1 && type== '1'">{{$t('registered.subject.cxfs')}}({{time2}}s)</span>
            </p>
            <p class="iup_p">
            <input required v-model="password1" name="password" v-validate="'required|password'" type="password" :placeholder="$t('registered.subject.ldslw')" @blur="blurIn">
            <span v-show="errors.has('password')" class="error-tip password">{{errors.first('password')}}</span>
            </p>
            <p class="iup_p">
            <input required v-model="password2"  name="password1" v-validate="'required|password'" type="password" :placeholder="$t('registered.subject.qrmm')" @blur="blurIn">
            <span v-show="errors.has('password1')" class="error-tip password1">{{errors.first('password1')}}</span>
            </p>
            <p class="check">
            <span @click="changeBg" :class="[checked ? 'checkbox active' : 'checkbox']"></span><span @click="isLook = true">{{$t('registered.subject.wyjs')}}<i>{{$t('registered.subject.xytk')}}</i></span>
            </p>
            <input type="submit" @click="regist" :value="$t('registered.subject.zc')" :class="{'nosubmut': !checked}" @blur="blurIn"/>
          </div>
      </div>
      <!-- 注册条款 -->
      <div class="clause-box" v-show="isLook">
        <div class="clause-tit">
          <h5>{{$t('registered.subject.zcxy')}}</h5>
          <span class="close" @click="isLook = false"></span>
        </div>
        <div class="cla-contant" v-html="clauseText"></div>
      </div>
      <Toast :text="textMsg" ref="toast" />
      <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import {
  login,
  reistered,
  reisteredEamil,
  getSmsCaptchaPhone,
  getSmsCaptchaEmail
} from "api/person";
import { rePwdValid, getUrlParam, setTitle, setUser } from "common/js/util";
import { getSysConfig } from 'api/general';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';
export default {
  props: {},
  data() {
    return {
      textMsg: '',
      clauseText: '',
      isLook: false,
      isLoading: false,
      fscg: false,
      fscg1: false,
      flag: true,
      type:'0',         // 0 手机注册   1 邮箱注册
      time1: 60,
      time2: 60,
      phone: "",
      email: "",
      smsCaptcha: "",
      nickname: "",
      password1: "",
      password2: "",
      bizType1: "805041",
      bizType2: "805043",
      checked: true,
      inviteCode: '',
      config: {}
    };
  },
  created() {
    setTitle(this.$t('registered.subject.zc'));
    this.inviteCode = getUrlParam('inviteCode');
    getSysConfig('reg_protocol').then(data => {
      this.clauseText = data.cvalue;
    });
  },
  computed: {},
  methods: {
    changeFlag1() {
      this.nickname = '';
      this.email = '';
      this.smsCaptcha = '';
      this.password1 = '';
      this.password2 = '';
      this.type = '0';
      this.flag = true;
    },
    changeFlag2() {
      this.nickname = '';
      this.phone = '';
      this.smsCaptcha = '';
      this.password1 = '';
      this.password2 = '';
      this.type = '1';
      this.flag = false;
    },
    getSca1() {
      if(this.type == '0'){
        if(this.errors.has('phone') || this.phone == ''){
          this.textMsg = this.errors.collect('phone')[0] || this.$t('registered.subject.sjhwk');
          this.$refs.toast.show();
          return;
        }
        this.isLoading = true;
        this.fscg = true;
        getSmsCaptchaPhone({
          bizType: this.bizType1,
          mobile: this.phone
        }).then(() => {
          this.isLoading = false;
          let phTime = setInterval(() => {
            this.time1 --;
            if(this.time1 < 0){
              clearInterval(phTime);
              this.fscg = false;
              this.time1 = 60;
            }
          }, 1000);
        }, () => {
          this.isLoading = false;
          this.fscg = false;
        });
      }else{
        if(this.errors.has('email') || this.email == ''){
          this.textMsg = this.errors.collect('email')[0] || this.$t('registered.subject.yxhwk');
          this.$refs.toast.show();
          return;
        }
        this.isLoading = true;
        this.fscg1 = true;
        getSmsCaptchaEmail({
          bizType: this.bizType2,
          email: this.email
        }).then(() => {
          this.isLoading = false;
          let phTime = setInterval(() => {
            this.time2 --;
            if(this.time2 < 0){
              clearInterval(phTime);
              this.fscg1 = false;
              this.time2 = 60;
            }
          }, 1000);
        }, () => {
          this.isLoading = false;
          this.fscg1 = false;
        });
      }
    },
    regist() {
      if(!this.checked){
        this.textMsg = this.$t('registered.subject.txwz');
        this.$refs.toast.show();
        return;
      }
      if(this.smsCaptcha != '' && this.password1 != '' && !this.errors.any()){
        if(this.password1 !== this.password2){
          this.textMsg = this.$t('registered.subject.mmbyz');
          this.$refs.toast.show();
          return;
        }
        this.config = {
          captcha: this.smsCaptcha,
          smsCaptcha: this.smsCaptcha,
          email: this.email,
          mobile: this.phone,
          loginPwd: this.password1
        }
        if(this.inviteCode != '' && this.inviteCode != undefined){
          this.config.inviteCode = this.inviteCode;
        }
        this.isLoading = true;
        if(this.flag == false) {
          delete this.config.mobile;
          delete this.config.smsCaptcha;
          reisteredEamil(this.config).then(data => {
            this.isLoading = false;
            this.textMsg = this.$t('registered.subject.zccg');
            this.$refs.toast.show();
            setTimeout(() => {
              this.toLogin(this.config.email, this.config.loginPwd);
            }, 1000);
          }, () => {
            this.isLoading = false;
          });
        } else {
          delete this.config.email;
          delete this.config.captcha;
          reistered(this.config).then(data => {
            this.isLoading = false;
            this.textMsg = this.$t('registered.subject.zccg');
            this.$refs.toast.show();
            setTimeout(() => {
              this.toLogin(this.config.mobile, this.config.loginPwd);
            }, 1000);
          }, () => {
            this.isLoading = false;
          });
        }
      }else if(this.smsCaptcha == '' || this.password1 == ''){
        this.textMsg = this.$t('registered.subject.txwz');
        this.$refs.toast.show();
        return;
      }
    },
    changeBg(){
      this.checked = !this.checked;
    },
    toLogin(username, password) {
      login(username, password).then(data => {
        this.isLoading = false;
        setUser(data);
        if(window.SOCKET && window.SOCKET.onmessage) {
          window.SOCKET.send('close');
          window.SOCKET = null;
        }
        const userId = data.userId;
        this.$router.push('page');
      }, () => {
        this.isLoading = false;
      });
    },
    blurIn () {
      window.scrollTo(0, Math.max(this.scrollHeight - 1, 0))
    }
  },
  components: {
    Toast,
    FullLoading
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.regist-wrapper {
  height: 100%;
  position: relative;
  background: #fff;
  padding-bottom: 0.6rem;
  .header {
    width: 100%;
    height: 0.4rem;
    i {
      margin-left: 0.26rem;
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 0.24rem 0.42rem;
      @include bg-image("return");
    }
  }

  .card {
    width: 6.3rem;
    margin: 0 auto;
    padding-bottom: 0.3rem;
    input[type="number"],
    input[type="text"],
    input[type="password"] {
      width: 6.1rem;
      border-bottom: 0.02rem solid #e3e3e3;
      font: 0.32rem/1.28rem PingFangSC-Medium;
      color: #333;
      padding: 0 0.1rem;
      margin-bottom: 0.3rem;
      box-sizing: border-box;
      height: 0.8rem;
      line-height: 0.8rem;
      letter-spacing: 0.0027rem;
    }

    input[type="submit"] {
      width: 6.3rem;
      height: 0.9rem;
      background: #d53d3d;
      box-shadow: 0 6px 14px 2px rgba(200, 193, 193, 0.72);
      border-radius: 4px;
      text-align: center;
      font: 0.32rem/0.9rem PingFangSC-Semibold;
      color: #fff;
      letter-spacing: 0.003rem;
      margin: 0.7rem 0 0.4rem;
    }
    .nosubmut{
      box-shadow: none !important;
      color: #bbb !important;
      background-color: #ddd !important;
    }

    .title {
      font: 0.52rem/0.73rem PingFangSC-Semibold;
      color: #333;
      padding-top: 0.6rem;
      padding-bottom: 0.4rem;
    }

    #tabs .tab-item {
      display: inline-block;
      margin-right: 0.5rem;
      font: 0.4rem/0.56rem PingFangSC-Medium;
      color: #4d4d4d;
    }

    #tabs .activeClass {
      color: #d53d3d;
      padding-bottom: 0.12rem;
      border-bottom: 0.04rem solid #d53d3d;
    }

    .main-tel {
      p {
        position: relative;
        .error-tip {
          position: absolute;
          font-size: 0.3rem;
          color:red;
          right: .3rem;
          top: .6rem;
        }
        .capt {
          right: 2.5rem;
        }
      }
    }

    .yzm {
      width: 6.1rem;
      position: relative;
    }

    .getYam{
      position: absolute;
      top: 0.3rem;
      width: 2.1rem;
      height: 0.68rem;
      border: 0.02rem solid #d53d3d;
      background: #fff;
      border-radius: 0.04rem;
      right: 0;
      font: 0.26rem/.68rem PingFangSC-Regular;
      color: #d53d3d;
      letter-spacing: 0.0031rem;
      text-align: center;
    }

    .check {
      margin-top: 0.42rem;

      .checkbox {
        display: inline-block;
        float: left;
        width: 0.24rem;
        height: 0.24rem;
        border: 0.02rem solid #979797;
        border-radius: 0.04rem;
        margin-right: 0.08rem;
      }

      .active {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        background-image: url('./dgou.png');
      }

      span {
        float: left;
        font: 0.24rem/.26rem PingFangSC-Regular;
        color: #999;
        letter-spacing: 0.002rem;

        i {
          color: #d53d3d;
        }
      }
    }
    .cxfs{
      position: absolute;
      top: 0.3rem;
      right: 0;
      font: 0.26rem/.68rem PingFangSC-Regular;
      font-size: 0.28rem;
      width: 2.45rem;
      text-align: center;
      height: 0.78rem;
      line-height: 0.78rem;
      display: inline-block;
      color: #666;
      // border: 1px solid #ccc;
      border-radius: 0.04rem;
    }
  }

  .clause-box{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0.2rem 0.2rem;
    .clause-tit{
      position: relative;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.5rem;
      font-weight: 400;
      text-align: center;
      margin-bottom: 0.5rem;
      margin-top: 0.2rem;
      .close{
        position: absolute;
        right: 0;
        top: 0rem;
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url('./popup-close.png');
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .cla-contant{
      width: 100%;
      height: 11rem;
      line-height: 1.7;
      font-size: 0.32rem;
      overflow-y: scroll;
    }
  }
}
</style>
