<template>
  <div class="identity-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>身份认证</span>
        </p>
    </header>
    <div class='content cont1'>
        <router-link class='tag mb20' to='security-idcard'>
            <p>
            <span>身份证认证</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to=''>
            <p>
            <span>护照认证</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag' to=''>
            <p>
            <span>驾照认证</span>
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
      show: true
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.identity-wrapper {
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
