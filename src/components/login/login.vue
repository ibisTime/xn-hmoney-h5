<template>
  <div class="log-wrapper" @click.stop>
      <div class="bg">
          <p>FUNMVP</p>
      </div>
      <div class="card">
          <div class="main">
              <h3>{{$t('login.subject.hyhl')}}</h3>
              <input type="text" v-model="username" name="phone|email" v-validate="'required|phone|email'" :placeholder="$t('login.subject.srzh')">
              <input type="password" v-model="password" name="password" v-validate="'required|password'" :placeholder="$t('login.subject.srldsl')">
              <input type="submit" :value="$t('login.subject.dl')" @click='login'>
              <p>
                  <router-link class="reg" to="/registered">{{$t('login.subject.ljzc')}}</router-link>
                  <router-link class="paw" to="/security-loginPassword">{{$t('login.subject.wjmm')}}</router-link>
              </p>
          </div>
      </div>
      <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import fetch from '../../common/js/fetch';
import {login} from '../../api/person';
import {setUser, setTitle} from '../../common/js/util';
import FullLoading from 'base/full-loading/full-loading';
export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false
    };
  },
  created(){
    setTitle(this.$t('login.subject.dl'));
  },
  computed: {},
  methods: {
    login() {
      if(this.errors.any()){
        this.isLoading = true;
        login(this.username, this.password).then(data => {
          this.isLoading = false;
          setUser(data);
          this.$router.push('page');
        }, () => {
          this.isLoading = false;
        });
      }
    }
  },
  components: {
    fetch,
    FullLoading
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
    margin: 0 auto;
    margin-top: -1.1rem;
    box-shadow: 0 0.08rem 0.16rem 0 #dcdcdc;
    border-radius: 0.16rem;

    .main {
      width: 6.3rem;
      padding-top: 0.33rem;
      padding-left: 0.33rem;
      h3 {
        font: 0.52rem/.73rem PingFangSC-Semibold;
        color: #2d2d2d;
      }

      input[type='text'], input[type='password'] {
        width: 6.1rem;
        border-bottom: 0.02rem solid #e3e3e3;
        font: 0.32rem/1.28rem PingFangSC-Medium;
        color: #999;
        padding: 0.3rem 0.1rem;
        box-sizing: border-box;
        height: 1.2rem;
        line-height: 1.2rem;
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
