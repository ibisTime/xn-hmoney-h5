<template>
  <div class="log-wrapper" @click.stop>
      <div class="bg">
          <p>FUN MVP</p>
      </div>
      <div class="card">
          <div class="main">
              <h3>欢迎回来</h3>
              <input type="text" v-model="username" name="phone|email" v-validate="'required|phone|email'" placeholder="请输入账号">
              <input type="password" v-model="password" placeholder="请输入密码（6～16个字符或字母组成）">
              <input type="submit" value="登  录" @click='login'>
              <p>
                  <router-link class="reg" to="/registered">立即注册</router-link>
                  <router-link class="paw" to="/security-tradePassword">忘记密码？</router-link>
              </p>
          </div>
      </div>
  </div>
</template>
<script>
import fetch from '../../common/js/fetch';
import {login} from '../../api/person';
import {setUser} from '../../common/js/util';
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  props: {},
  computed: {},
  methods: {
    login() {
      login(this.username, this.password).then(data => {
        setUser(data);
        this.$router.push('page');
      });
    }
  },
  components: {
    fetch
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.log-wrapper {
  width: 100%;
  position: relative;

  .bg {
    width: 100%;
    height: 4.18rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    @include bg-image("login");

    p {
      font: 0.8rem/1.12rem PingFangSC-Semibold;
      color: #fff;
      text-shadow: 0 0.04rem 0.08rem #cf5340;
      position: absolute;
      top: 1.19rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .card {
    width: 6.9rem;
    height: 7.4rem;
    background: #fff;
    position: absolute;
    top: 3.25rem;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0.08rem 0.16rem 0 #dcdcdc;
    border-radius: 0.16rem;

    .main {
      width: 6.3rem;
      margin: 0.33rem auto 0;
      h3 {
        font: 0.52rem/.73rem PingFangSC-Semibold;
        color: #2d2d2d;
      }

      input[type='text'], input[type='password'] {
        width: 6.1rem;
        border-bottom: 0.02rem solid #e3e3e3;
        font: 0.32rem/1.28rem PingFangSC-Medium;
        color: #999;
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


      p {
        font: 0.28rem/.4rem PingFangSC-Regular;
        letter-spacing: 0.23px;
        .reg {
          float: left;
          color: #656565;
        }
        .paw {
          float: right;
          color: #656565;
        }
      }
    }
  }
}
</style>
