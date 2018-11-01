<template>
  <div class="phonenumber-wrapper" @click.stop>
    <div class="main">
      <p><input v-model="email" type="text" name="email" v-validate="'required|email'" :placeholder="$t('bindEmail.subject.sryx')"></p>
      <span v-show="errors.has('email')" class="error-tip">{{errors.first('email')}}</span>
      <p class='text3'>
        <input v-model="captcha" type="text" :placeholder="$t('bindEmail.subject.sryz')">
        <i v-show="!show" class='icon' @click="captcha = ''"></i>
        <span v-show="show" @click="get" class='txt2'>{{$t('bindEmail.subject.hqyz')}}</span>
        <span v-show="!show" class='txt1'>{{$t('bindEmail.subject.cxhq')}}({{time}}s)</span>
      </p>

    </div>
    <div class="foot">
      <button @click="bindEmail">{{$t('bindEmail.subject.qd')}}</button>
    </div>
    
  <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import {getUserId,CheckMail, setTitle} from '../../common/js/util';
import {bindingEmail, getSmsCaptcha2} from '../../api/person';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      show: true,
      email: '',
      captcha: '',
      bizType: '805086',
      isLoading: false,
      time: 60
    };
  },
  created() {
    setTitle(this.$t('bindEmail.subject.bdyx'));
  },
  methods: {
    get() {
      this.show = false;
      if(CheckMail(this.email) === true) {
        this.isLoading = true;
        getSmsCaptcha2(this.bizType, this.email).then(data => {
          this.isLoading = false;
          let phTime = setInterval(() => {
            this.time --;
            if(this.time < 0){
              clearInterval(phTime);
              this.show = true;
              this.time = 60;
            }
          }, 1000);
        }, () => {
          this.isLoading = false;
          this.show = true;
        });
      }
    },
    bindEmail() {
      if(CheckMail(this.email) === true) {
        bindingEmail(this.captcha, this.email, getUserId()).then(data => {
          this.$router.push('security-center');
        })
      }
    }
  },
  components: {
    FullLoading
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
