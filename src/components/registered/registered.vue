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
          <div calss="main-tel">
            <input required v-model="phone" v-show="flag" pattern="^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$" type="text" placeholder="请输入手机号">
            <input required v-model="email" v-show="!flag" pattern="^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$" type="text" placeholder="请输入邮箱账号">
            <p class="yzm">
            <input required v-model="smsCaptcha" pattern="^\d{4}$" type="text" placeholder="请输入验证码">
            <input type="button" class="getYam" @click="getSca1" value="获取验证码">
            <input v-show="!flag" type="button" class="getYam" @click="getSca2" value="获取验证码">
            </p>
            <input required v-model="password1" pattern="^[a-zA-Z]\w{5,15}$" type="password" placeholder="请输入密码">
            <input required v-model="password2" pattern="^[a-zA-Z]\w{5,15}$" type="password" placeholder="请确认密码">
            <p class="check">
            <input type="checkbox"><span>我已阅读并接受<i>《FUN MVP产品服务条款》</i></span>
            <input @click='regist' type="submit" value="注册">
            </p>
          </div>
      </div>
  </div>
</template>
<script>
import {reistered, reisteredEamil, getSmsCaptcha1, getSmsCaptcha2} from '../../api/person';
export default {
  props: {},
  data() {
    return {
      flag: true,
      phone: '',
      email: '',
      smsCaptcha: '',
      password1: '',
      password2: '',
      bizType1: '805041',
      bizType2: '805043'
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
      getSmsCaptcha1(this.bizType1, this.phone).then(data => {
      });
    },
    getSca2() {
      getSmsCaptcha2(this.bizType2, this.email).then(data => {
      });
    },
    regist() {
      if(this.flag == false) {
        reisteredEamil(this.email, this.password1, this.smsCaptcha).then(data => {
          this.$router.push('login');
        });
      } else {
        reistered(this.phone, this.password1, this.smsCaptcha).then(data => {
          this.$router.push('login');
        });
      }
    }
  },
  components: {
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.regist-wrapper {
  background:#fff;
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

    input[type="text"], input[type="password"] {
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
      font: 0.32rem/.9rem PingFangSC-Semibold;
      color: #fff;
      letter-spacing: 0.003rem;
      margin: 0.7rem 0 0.4rem;
    }


    .title {
      font: 0.52rem/.73rem PingFangSC-Semibold;
      color: #333;
      padding-top: 0.89rem;
      padding-bottom: 0.62rem;
    }

    #tabs .tab-item {
      display: inline-block;
      margin-right: .5rem;
      font: 0.4rem/.56rem PingFangSC-Medium;
      color: #4d4d4d;
    }

    #tabs .activeClass {
      color:#d53d3d;
      padding-bottom: .12rem;
      border-bottom: .04rem solid #d53d3d;
    }

    .yzm {
      width: 6.1rem;
      position: relative;
    }

    .getYam {
      position: absolute;
      top: .5rem;
      width: 2.1rem;
      height:.68rem;
      border: .02rem solid #D53D3D;
      background: #fff;
      border-radius: .04rem;
      right: 0;
      font: .26rem/.68rem PingFangSC-Regular;
      color: #D53D3D;
      letter-spacing: .0031rem;
      text-align: center;
    }

    .check {
      margin-top: .42rem;

      input[type="checkbox"] {
        float: left;
        width: .24rem;
        height: .24rem;
        border: .02rem solid #979797;
        border-radius: .04rem;
        margin-right: .08rem;
      }

      span {
        float: left;
        font: .24rem/.26rem PingFangSC-Regular;
        color: #999;
        letter-spacing: 0.002rem;

        i {
          color: #D53D3D;
        }
      }

    }


  }
}
</style>
