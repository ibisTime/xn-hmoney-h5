<template>
  <div class="idcard-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>系统公告</span>
        </p>
    </header>
    <div class='main'>
      <div class="list">
        <div class='text1'><i class='icon'></i><span class='txt1'>FUN MVP</span><span class='txt2'>2015-10-10</span></div>
        <p class="text2">V1.0.0版本正式上线,如遇问题欢迎使用智能客服,谢谢！</p>
      </div>
      <div class="list">
        <div class='text1'><i class='icon'></i><span class='txt1'>FUN MVP</span><span class='txt2'>2015-10-10</span></div>
        <p class="text2">V1.0.0版本正式上线,如遇问题欢迎使用智能客服,谢谢！</p>
      </div>
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
  methods: {
    get() {
      this.show = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.idcard-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;

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
    margin-bottom: .3rem;

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
    padding: 0 .3rem;
    .list {
      width: 100%;
      border-radius: .08rem;
      background: #fff;
      padding: .4rem .3rem .52rem;
      margin-bottom: .3rem;
      .text1 {
        line-height: .6rem;
        padding-bottom: .3rem;
        .icon {
          width: .6rem;
          height: .6rem;
          background-image: url('./gg.png');
          vertical-align: middle;
          margin-right: .18rem;
        }
        .txt1 {
          font-weight: bold;
          color: #323232;
        }
        .txt2 {
          float: right;
          font-size: .24rem;
          color: #989898;
        }
      }
      .text2 {
        color: #323232;
        font-weight: bold;
        line-height: .4rem;
      }
    }
  }




}
</style>
