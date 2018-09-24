<template>
  <div class="security-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>安全中心</span>
        </p>
    </header>
    <div class='content cont1'>
        <router-link class='tag' to='security-tradePassword'>
            <p>
            <span>交易密码</span>
            <i class='icon'></i>
            </p>
        </router-link>
    </div>
    <div class='content cont1'>
        <router-link class='tag mb20' to='security-identity'>
            <p>
            <span>身份认证</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to=''>
            <p>
            <span>谷歌认证</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link v-show="show" class='tag' to='security-bindingEmail'>
            <p>
            <span>绑定邮箱</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <div v-show="!show" class='tag mb20'>
            <p>
            <span>已绑定邮箱</span>
            <i class='icon'></i>
            <span class='tel'>{{email}}</span>
            </p>
        </div>
    </div>
    <div class='content'>
        <router-link v-show="show1" class='tag mb20' to='security-phoneNumber'>
            <p>
            <span>绑定手机号</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <div v-show="!show1" class='tag mb20'>
            <p>
            <span>已绑定手机号</span>
            <i class='icon'></i>
            <span class='tel'>{{mobile}}</span>
            </p>
        </div>
        <router-link class='tag mb20' to='security-loginPassword'>
            <p>
            <span>修改登录密码</span>
            <i class='icon'></i>
            </p>
        </router-link>
    </div>
    <div class="footer">
        <button>退出登录</button>
    </div>
  </div>
</template>
<script>
import {getUserById} from '../../api/person';
import {getUserId} from '../../common/js/util';

export default {
  data() {
    return {
      show: true,
      show1: true,
      email: '',
      mobile: ''
    };
  },
  created() {
    getUserById(getUserId()).then((data) => {
      this.mobile = data.mobile;
      this.email = data.email;
      this.email === '' ? this.show = true : this.show = false;
      this.mobile === '' ? this.show1 = true : this.show1 = false;
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.security-wrapper {
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
    margin-bottom: 0.2rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      @include bg-image("返回");
      float: left;
      margin-top: 0.31rem;
    }
  }

  .cont1 {
    border-bottom: 0.2rem solid #f5f5f5;
  }

  .content {
    width: 100%;
    padding: 0 0.3rem;
    line-height: 1rem;
    .mb20 {
      border-bottom: 0.01rem solid #d8d8d8;
    }
    .tag {
      display: block;
      width: 100%;
      font-size: 0.32rem;
      color: #333;
      .icon {
        width: 0.16rem;
        height: 0.26rem;
        float: right;
        margin-top: 0.37rem;
        @include bg-image("更多");
      }
      .tel {
        float: right;
        margin-right: .2rem;
      }
    }
  }

  .footer {
    width: 100%;
    padding: 0 0.3rem;
    margin-top: 1.2rem;
    text-align: center;
    button {
      width: 100%;
      height: 1rem;
      background: #fff;
      border: 0.02rem solid #d53d3d;
      font-size: 0.32rem;
      color: #d53d3d;
      font-weight: bold;
      border-radius: 0.08rem;
      margin-bottom: 2.6rem;
    }
  }
}
</style>
