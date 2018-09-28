<template>
  <div class="regist-wrapper" @click.stop>
      <div class="header">
        <i></i>
      </div>
      <div class="card">
          <h3 class="title" @click="goBack">注册</h3>
          <p calss="tabs" id="tabs">
              <span :class="[flag ? 'activeClass tab-item' : '', 'tab-item']" @click="changeFlag1">手机注册</span>
              <span :class="[!flag ? 'activeClass tab-item' : '', 'tab-item']" @click="changeFlag2">邮箱注册</span>
          </p>
          <router-view></router-view>
          <div class="main-tel">
            <p><input type="text" name="username" v-validate="'required|nickname'" placeholder="请输入用户昵称" v-model="nickname">
            <span v-show="errors.has('username')" class="error-tip">{{errors.first('username')}}</span>
            </p>
            <p>
            <input required v-model="phone" v-show="flag" name="phone" v-validate="'required|phone'" type="text" placeholder="请输入手机号">
            <span v-show="errors.has('phone')" class="error-tip">{{errors.first('phone')}}</span>
            </p>
            <p>
            <input required v-model="email" v-show="!flag" name="email" v-validate="'required|email'" type="text" placeholder="请输入邮箱账号">
            <span v-show="errors.has('email')" class="error-tip">{{errors.first('email')}}</span>
            </p>
            <p class="yzm">
            <input required v-model="smsCaptcha" name="capt" v-validate="'required|capt'" pattern="^\d{4}$" type="text" placeholder="请输入验证码">
            <span v-show="errors.has('capt')" class="error-tip capt">{{errors.first('capt')}}</span>
            <input type="button" class="getYam" @click="getSca1" value="获取验证码">
            <input v-show="!flag" type="button" class="getYam" @click="getSca2" value="获取验证码">
            </p>
            <p>
            <input required v-model="password1" name="password" v-validate="'required|password'" type="password" placeholder="密码由英文数字组合不少于6位">
            <span v-show="errors.has('password')" class="error-tip password">{{errors.first('password')}}</span>
            </p>
            <p>
            <input required v-model="password2"  name="password" v-validate="'required|password'" type="password" placeholder="请确认密码">
            <span v-show="errors.has('password')" class="error-tip password">{{errors.first('password')}}</span>
            </p>
            <p class="check">
            <span click="changeBg" :class="[checked ? 'checkbox active' : 'checkbox']"></span><span>我已阅读并接受<i>《FUN MVP产品服务条款》</i></span>
            </p>
            <input type="submit" @click="regist" value="注册">
          </div>
      </div>
  </div>
</template>
<script>
import {
  reistered,
  reisteredEamil,
  getSmsCaptcha1,
  getSmsCaptcha2
} from "../../api/person";
import { rePwdValid } from "../../common/js/util";

export default {
  props: {},
  data() {
    return {
      flag: true,
      phone: "",
      email: "",
      smsCaptcha: "",
      nickname: "",
      password1: "",
      password2: "",
      bizType1: "805041",
      bizType2: "805043",
      checked: true
    };
  },
  computed: {},
  methods: {
    changeFlag1() {
      this.flag = true;
    },
    changeFlag2() {
      this.flag = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    getSca1() {
      getSmsCaptcha1(this.bizType1, this.phone).then(data => {});
    },
    getSca2() {
      getSmsCaptcha2(this.bizType2, this.email).then(data => {});
    },
    regist() {
      if(this.flag == false) {
        reisteredEamil( this.smsCaptcha, this.email, this.password1, this.nickname).then(data => {
          this.$router.push('login');
        });
      } else {
        reistered(this.phone, this.password1, this.smsCaptcha, this.nickname).then(data => {
          this.$router.push('login');
        });
      }
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.regist-wrapper {
  background: #fff;
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

    input[type="text"],
    input[type="password"] {
      width: 6.1rem;
      border-bottom: 0.02rem solid #e3e3e3;
      font: 0.32rem/1.28rem PingFangSC-Medium;
      color: #999;
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

    .title {
      font: 0.52rem/0.73rem PingFangSC-Semibold;
      color: #333;
      padding-top: 0.89rem;
      padding-bottom: 0.62rem;
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

    .getYam {
      position: absolute;
      top: 0.5rem;
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
        @include bg-image("打勾");
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
  }
}
</style>
