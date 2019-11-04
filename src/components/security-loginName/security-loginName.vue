<template>
  <div class="password-wrapper" @click.stop>
    <div class="main">
      <div class="iup_box">
        <label for="loginName">新昵称</label>
        <p>
          <input class="item-input" type="text" placeholder="请输入新昵称" v-model="newLoginName" id="loginName">
        </p>
      </div>
      <p class="login_p">
          昵称：<span style="color: #E06E6E;">{{loginName}}</span>
      </p>
    </div>
    <div class="foot">
      <button @click="changeLoginName">确认</button>
    </div>

  <Toast :text="textMsg" ref="toast" />
  <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import { setTradePwd } from 'api/user';
import {setTitle, getUrlParam} from '../../common/js/util';
import { changeLoginName } from 'api/user';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';
export default {
  data() {
    return {
      newLoginName: '',
      loginName: '',
      isLoading: false,
      textMsg: ''
    };
  },
  created() {
    this.loginName = getUrlParam('loginName') || '';
    setTitle('修改昵称');
  },
  methods: {
    changeLoginName() {
      if(!this.newLoginName) {
        this.textMsg = '请输入昵称';
        this.$refs.toast.show();
        return;
      }
      this.isLoading = true;
      changeLoginName(this.newLoginName).then(() => {
        this.isLoading = false;
        this.textMsg = '操作成功';
        this.$refs.toast.show();
        setTimeout(() => {
          this.$router.push('mine');
        }, 1000);
      });
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

.password-wrapper {
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
    padding: 0.4rem .3rem 0;
    font-size: .32rem;
    color: #333;
    font-weight: bold;
    .iup_box {
      height: 1.1rem;
      line-height: 1.1rem;
      margin-bottom: .1rem;
      border-bottom: .01rem solid #e3e3e3;
      position: relative;
      display: flex;
      label{
        margin-right: 20px;
      }
    }
    .login_p{
      color: '#999999';
      font-size: 0.28rem;
      margin-top: 0.2rem;
    }
    input {
      height: 1rem;
    }
    input[attr='placeholder'] {
      color: #ccc;
    }
    .item-input{
      width: 100%;
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
    padding: 0 0.3rem;
    button {
      width: 100%;
      height: 1rem;
      background: #d53d3d;
      border-radius: .08rem;
      font-size: .32rem;
      color: #fff;
    }
  }

  .error-tip{
    color: #d53d3d;
    font-size: 0.26rem;
    position: absolute;
    right: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
  }


}
</style>
