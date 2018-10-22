<template>
  <div class="currency-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>选择货币</span>
        </p>
    </header>
    <div class='content'>
        <p>
            <span>CNY</span>
            <i class='icon'></i>
        </p>
        <p>
            <span>USD</span>
            <i class='icon'></i>
        </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.currency-wrapper {
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
    margin-bottom: .2rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      background-image: url('./fhui.png');
      float: left;
      margin-top: 0.31rem;
    }
  }

  .content {
      width: 100%;
      padding: 0 .3rem;
      font-size: .32rem;
      line-height: 1rem;
      p {
          width: 100%;
          border-bottom: .01rem solid #d8d8d8;
          .icon {
              width: .28rem;
              height: .22rem;
              float: right;
              margin-top: .39rem;
          }
      }
      p:hover {
          .icon {
              background-image: url('./dag.png');
          }
      }
  }

}
</style>
