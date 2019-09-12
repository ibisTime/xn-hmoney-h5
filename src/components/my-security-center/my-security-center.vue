<template>
  <div class="security-wrapper" @click.stop>
    <div class='content cont1'>
        <router-link class='tag mb20' :to='"security-tradePassword?istw=" + isTradepwdFlag'>
            <p>
            <span>{{$t('securityCenter.subject.jymm')}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <div class='tag' @click="toIdcard">
          <p>
            <span>{{$t('securityCenter.subject.sfrz')}}</span>
            <i class='icon'></i>
            <span class="tel">{{identifyObj[identifyStatus]}}</span>
          </p>
        </div>
    </div>
    <div class='content cont1'>
        <router-link class='tag mb20' :to='"security-google?google=" + googleAuthFlag + "&mobile=" + mobile'>
            <p>
            <span>{{$t('securityCenter.subject.ggrz')}}</span>
            <i class='icon'></i>
            <span class='tel'>{{googleAuthFlag == false ? '' : $t('securityCenter.subject.ykq')}}</span>
            </p>
        </router-link>
        <router-link v-show="show" class='tag' to='security-bindingEmail'>
            <p>
            <span>{{$t('securityCenter.subject.bdyx')}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <div v-show="!show" class='tag mb20'>
            <p>
            <span>{{$t('securityCenter.subject.ybdyx')}}</span>
            <i class='icon'></i>
            <span class='tel'>{{email}}</span>
            </p>
        </div>
    </div>
    <div class='content'>
        <router-link v-show="!mobile" class='tag mb20' to='security-phoneNumber'>
            <p>
            <span>{{$t('securityCenter.subject.bdsjh')}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <div v-show="mobile" class='tag mb20'>
            <p>
            <span>{{$t('securityCenter.subject.ybdsjh')}}</span>
            <i class='icon'></i>
            <span class='tel'>{{mobile}}</span>
            </p>
        </div>
        <router-link class='tag mb20' to='security-loginPassword'>
            <p>
            <span>{{$t('securityCenter.subject.xgdlmm')}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
    </div>
    <div class="footer">
        <button @click="quitLogin">{{$t('securityCenter.subject.tcdl')}}</button>
    </div>
  </div>
</template>
<script>
import {getUser} from '../../api/person';
import { clearUser, setTitle } from 'common/js/util';
import {mapGetters, mapActions, mapMutations} from 'vuex';
import {SET_TENCENT_LOGINED} from 'store/mutation-types';

export default {
  data() {
    return {
      show: true,
      show1: true,
      email: '',
      mobile: '',
      isTradepwdFlag: '',
      googleAuthFlag: false,
      identifyStatus: '0',
      identifyObj: {
        '0': '未认证',
        '1': '已认证',
        '2': '认证中',
        '3': '认证失败'
      }
    };
  },
  created() {
    setTitle('账户与安全');
    document.getElementById('app').style.height = '100%';
    getUser().then((data) => {
      this.mobile = data.mobile;
      this.email = data.email;
      this.identifyStatus = data.identifyStatus;
      this.isTradepwdFlag = data.tradepwdFlag ? 1 : 0;
      data.emailBindFlag === false ? this.show = true : this.show = false;
      this.googleAuthFlag = data.googleAuthFlag;
    });
  },
  computed: {
    ...mapGetters([
      'tencentLogined'
    ])
  },
  methods: {
    quitLogin(){
      clearUser();
      this.setTencentLogined(false);
      setTimeout( () => {
        this.$router.push('/login');
      }, 500 );
    },
    toIdcard() {
      if(!this.isKind) {
        this.$router.push('/security-idcard');
      }else {
        return false;
      }
    },
    ...mapMutations({
      setTencentLogined: SET_TENCENT_LOGINED
    })
  },
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.security-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;
  height: 100%;
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
      background-image: url('./fh.png');
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
      border-bottom: 0.01rem solid #eee;
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
        background-image: url('./more.png');
      }
      .tel {
        float: right;
        margin-right: .2rem;
        font-size: 0.26rem;
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
