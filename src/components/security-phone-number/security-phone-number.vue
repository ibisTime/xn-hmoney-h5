<template>
  <div class="phonenumber-wrapper" @click.stop>
    <div class="main">
      <p v-if="!isExit">
        <input
          type="text"
          name="phone"
          v-model="mobile"
          :disabled="!!mobile"
          v-validate="'required|phone'"
          :placeholder="$t('securityPhone.subject.sjh')"
        >
        <span v-show="errors.has('phone')" class="error-tip">{{errors.first('phone')}}</span>
      </p>
      <p class='text3' v-if="!isExit">
        <input name="smsCaptcha" v-model="smsCaptcha" v-validate="'required'" type="text" :placeholder="$t('securityPhone.subject.yzm')">
        <i v-show="!show" class='icon' @click="smsCaptcha = ''"></i>
        <span v-show="show" @click="get" class='txt2'>{{$t('securityPhone.subject.hqyzm')}}</span>
        <span v-show="!show" class='txt1'>{{$t('securityPhone.subject.cxhq')}}({{time}}s)</span>
        <span v-show="errors.has('smsCaptcha')" class="error-tip" style="right: 2rem;">{{errors.first('smsCaptcha')}}</span>
      </p>
      <p v-if="isExit">
        <input
          type="text"
          name="newPhone"
          v-model="newMobile"
          v-validate="'required|phone'"
          placeholder="新手机号"
        >
        <span v-show="errors.has('newPhone')" class="error-tip">{{errors.first('newPhone')}}</span>
      </p>
      <p class='text3' v-if="isExit">
        <input name="newSmsCaptcha" v-validate="'required'" v-model="newSmsCaptcha" type="text" :placeholder="$t('securityPhone.subject.yzm')">
        <i v-show="!newShow" class='icon' @click="newSmsCaptcha = ''"></i>
        <span v-show="newShow" @click="() => {get('new')}" class='txt2'>{{$t('securityPhone.subject.hqyzm')}}</span>
        <span v-show="!newShow" class='txt1'>{{$t('securityPhone.subject.cxhq')}}({{newTime}}s)</span>
        <span v-show="errors.has('newSmsCaptcha')" class="error-tip" style="right: 3rem;">{{errors.first('newSmsCaptcha')}}</span>
      </p>
    </div>
    <div class="foot">
      <button @click="bindPhone">{{$t('securityPhone.subject.qd')}}</button>
    </div>
    <!-- <div class='promit'>
      <i class='icon'></i><span>请联系客服热线：289-3760-0000 进行修改</span>
    </div> -->
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import {getUserId} from '../../common/js/util';
import {bindingPhone, getSmsCaptchaPhone, exitBindingPhone} from '../../api/person';
import FullLoading from 'base/full-loading/full-loading';
import Toast from 'base/toast/toast';

export default {
  data() {
    return {
      show: true,
      newShow: true,
      mobile: '',
      smsCaptcha: '',
      bizType: '805060',
      time: 60,
      newTime: 60,
      isLoading: false,
      textMsg: '',
      newMobile: '',
      newSmsCaptcha: '',
      isExit: false
    };
  },
  created() {
    this.mobile = this.$route.query.mobile || '';
    this.isExit = !!this.mobile;
    if(this.isExit) {
      this.bizType = '805061';
    }
  },
  methods: {
    get(type) {
      if(type === 'new') {
        if(!this.newMobile) {
          this.textMsg = '请填写新手机号';
          this.$refs.toast.show();
          return;
        }
        if(!this.errors.has('newPhone')) {
          setTimeout(() => {
            this.newShow = false;
            this.isLoading = true;
            getSmsCaptchaPhone({
              bizType: this.bizType,
              mobile: this.newMobile
            }).then(data => {
              this.isLoading = false;
              let phTime = setInterval(() => {
                this.newTime --;
                if(this.newTime < 0){
                  clearInterval(phTime);
                  this.newTime = 60;
                  this.newShow = true;
                }
              }, 1000);
            }, () => {
              this.newTime = 60;
              this.isLoading = false;
              this.newShow = true;
            });
          }, 100);
        }
      }else {
        if(this.mobile === ''){
          this.textMsg = this.$t('securityPhone.subject.qtx');
          this.$refs.toast.show();
          return;
        }
        if(!this.errors.has('phone')) {
          setTimeout(() => {
            this.show = false;
            this.isLoading = true;
            getSmsCaptchaPhone({
              bizType: this.bizType,
              mobile: this.mobile
            }).then(data => {
              this.isLoading = false;
              let phTime = setInterval(() => {
                this.time --;
                if(this.time < 0){
                  clearInterval(phTime);
                  this.time = 60;
                  this.show = true;
                }
              }, 1000);
            }, () => {
              this.time = 60;
              this.isLoading = false;
              this.show = true;
            });
          }, 100);
        }
      }
    },
    bindPhone() {
      if(this.isExit) {
        if(!this.newMobile || !this.newSmsCaptcha) {
          this.textMsg = '请填写完整';
          this.$refs.toast.show();
          return;
        }
        if(!this.errors.any() && this.errors.items.length === 0) {
          this.isLoading = true;
          exitBindingPhone({
            newMobile: this.newMobile,
            newSmsCaptcha: this.newSmsCaptcha
          }).then(data => {
            this.isLoading = false;
            this.textMsg = '操作成功';
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.push('mine');
            }, 1000);
          }, () => {
            this.isLoading = false;
          });
        }
      }else {
        if(this.mobile == '' || this.smsCaptcha == ''){
          this.textMsg = '请填写完整';
          this.$refs.toast.show();
          return;
        }
        if(!this.errors.any() && this.errors.items.length === 0) {
          this.isLoading = true;
          bindingPhone(0, this.mobile, this.smsCaptcha, getUserId()).then(data => {
            this.isLoading = false;
            this.$router.push('mine');
          }, () => {
            this.isLoading = false;
          });
        }
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

.phonenumber-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;
  background: #fff;
  height: 100%;
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
    margin-bottom: 0.4rem;

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
    p {
      height: 1.1rem;
      line-height: 1.1rem;
      margin-bottom: .1rem;
      border-bottom: .01rem solid #e3e3e3;
      position: relative;
      .error-tip {
        position: absolute;
        right: 0.16rem;
        top: 50%;
        transform: translateY(-50%);
        white-space: nowrap;
        font-size: 0.28rem;
        color: #ff0000;
      }
    }
    input {
      height: 1rem;
    }
    input[attr='placeholder'] {
      color: #ccc;
    }
    .text1 {
      .txt2 {
        padding: 0 .24rem 0 .34rem;
      }
      .icon {
        width: .18rem;
        height: .14rem;
        background-image: url('./xl.png');
      }
    }
    .text3 {
      display: flex;
      height: 1.1rem;
      justify-content: space-between;
      .txt2 {
        display: inline-block;
        width: 1.68rem;
        height: .52rem;
        margin-top: .24rem;
        line-height: .52rem;
        border: .02rem solid #d53d3d;
        border-radius: .04rem;
        font-size: .22rem;
        text-align: center;
        color: #d53d3d;
      }
      .txt1 {
        display: inline-block;
        width: 1.68rem;
        height: .52rem;
        margin-top: .24rem;
        line-height: .52rem;
        border-radius: .04rem;
        background: #ccc;
        font-size: .22rem;
        text-align: center;
        color: #fff;
      }
      .icon {
          width: .34rem;
          height: .34rem;
          background-image: url('./sc.png');
          margin-top: .29rem;
          margin-right: -.2rem;
      }
    }
  }

  .foot {
    width: 100%;
    text-align: center;
    margin-top: 1.2rem;
    padding-bottom: 2.43rem;
    button {
      width: 6.28rem;
      height: 1rem;
      background: #d53d3d;
      border-radius: .08rem;
      font-size: .32rem;
      color: #fff;
    }
  }

  .promit {
    width: 100%;
    text-align: center;
    font-size: .26rem;
    color: #676767;
    padding-bottom: .76rem;
    .icon {
      width: .26rem;
      height: .26rem;
      background-image: url('./ts.png');
      vertical-align: middle;
      margin-right: .13rem;
    }
  }
}
</style>
