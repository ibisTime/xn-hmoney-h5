<template>
  <div class="shop-wrapper" @click.stop>
    <header>
        <p>
        <span class='title'>区块链游戏</span>
        <router-link to='shop-usedCar' class="car">二手车</router-link>
        </p>
    </header>
    <div class="banner">
      <p class='text1'>游戏余额</p>
      <p class='text2'>100.00 X</p>
      <p class='text3'>可用余额：100.00 X</p>
      <router-link to='shop-turn' class='btn'>
        转币
      </router-link>
    </div>
    <div class="main">
    </div>
      <Footer></Footer>
  </div>
  
</template>
<script>
import Footer from 'components/footer/footer';
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    Footer
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.shop-wrapper {
  font-family: PingFangSC-Medium;
  color: #323232;
  width: 100%;
  height: 100%;
  padding: 0 0.3rem;
  background: #fff;
  font-size: .24rem;
  color: #fff;
  height: 13rem;

  header {
      width: 100%;
      height: .88rem;
      line-height: .88rem;
      font-size: 0.36rem;
      font-weight: bold;
      color: #323232;

      .title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

      }

      a {
        float: right;
        color: #323232;
        font-size: .32rem;
      }

  }

  .banner {
    width: 100%;
    height: 3rem;
    padding: 0 .3rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    @include bg-image("banner");
    text-align: center;
    .text1{
      color: #ffecec;
      line-height: .33rem;
      padding-top: .4rem;
      padding-bottom: .14rem;
    }
    .text2 {
      font-size: .48rem;
      color: #fff;
      line-height: .56rem;
      padding-bottom: .14rem;
    }
    .text3 {
      font-size: .24rem;
      color: #ffecec;
      padding-bottom: .26rem;
    }
    .btn {
      display: inline-block;
      width: 1.3rem;
      height: .5rem;
      font-size: .28rem;
      color: #fff;
      line-height: .5rem;
      border-radius: .06rem;
      border: .01rem solid #fff;
    }

  } 

  .main {
    width: 100%;
    height: 5.2rem;
    margin-top: .2rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }





}
</style>
