<template>
  <div class="aboutus-wrapper" @click.stop>
    <header>
       汇率换算
    </header>
    <div class='main'>
      <p class='text1'><i class='icon ico1'></i><span>$1≈￥6.6079</span><i class='icon ico2'></i>
      </p>
      <p class='text2'>
        计算规则:采用银行柜台汇率过去14天的平均值作为汇率参考值，在每一个交割结算日，若改平均值与系统当前汇率偏高超过0.2，则会采用新的14天平均值作为系统汇率。
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
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.aboutus-wrapper {
  font-size: .3rem;
  width: 100%;
  background: #fff;
  
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
  header {
    font-size: .36rem;
    line-height: .88rem;
    width: 100%;
    border-bottom: .01rem solid #dedede;
    text-align: center;
  }
  .main {
    width: 100%;
    padding: 0 .3rem;
    .text1 {
      font-size: .36rem;
      padding: .88rem 0 .6rem;
      text-align: center;
      .ico1 {
        width: .45rem;
        height: .3rem;
        background-image: url('./mguo.png');
        margin-right: .34rem;
      }
      .ico2 {
        width: .45rem;
        height: .3rem;
        background-image: url('./zguo.png');
        margin-left: .34rem;
      }
    }
    .text2 {
      text-align: left;
      line-height: .44rem;
    }
  }
} 

</style>
