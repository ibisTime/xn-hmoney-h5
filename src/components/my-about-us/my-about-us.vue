<template>
  <div class="aboutus-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>关于我们</span>
        </p>
    </header>
    <div class='content cont1'>
        <router-link class='tag mb20' to='about-platformIntroduced'>
            <p>
            <span>平台介绍</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-userAgreement'>
            <p>
            <span>用户协议</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-privacyPolicy'>
            <p>
            <span>隐私条款</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-legalNotices'>
            <p>
            <span>法律申明</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-rateExplain'>
            <p>
            <span>费率说明</span>
            <i class='icon'></i>
            </p>
        </router-link>
    </div>
    <div class='content'>
        <router-link class='tag mb20' to='about-helpCenter'>
            <p>
            <span>帮助中心</span>
            <i class='icon'></i>
            </p>
        </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.aboutus-wrapper {
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

}
</style>
