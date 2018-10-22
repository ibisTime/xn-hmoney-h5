<template>
  <div class="shop-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>转币</span>
        </p>
    </header>
    <div class="banner">
      <p class='text1'>游戏余额</p>
      <p class='text2'>100.00 X</p>
    </div>
    <div class='main'>
        <input type="number" placeholder="请输入转入数量">
        <p>可用币数：100.00X</p>
    </div>
    <button @click='goShop'>确认转币</button>

  </div>
  
</template>
<script>
export default {
  methods: {
    goShop() {
      this.$router.push('shop');
    }
  }

};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.shop-wrapper {
    font-size: 0.28rem;
    color: #323232;
    overflow: auto;
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
    width: 100%;
    padding: 0 .3rem;
    background: #fff;
    padding-bottom: .2rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      background-image: url('./fh.png');
      float: left;
      margin-top: 0.3rem;
    }
  }

  .banner {
    width: 92%;
    margin: 0 .3rem;
    background: #fff;
    height: 2.8rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    @include bg-image("banner");
    text-align: center;
    margin-bottom: .2rem;
    .text1{
      color: #ffecec;
      line-height: .33rem;
      font-size: .24rem;
      padding-top: .74rem;
      padding-bottom: .14rem;
    }
    .text2 {
      font-size: .48rem;
      color: #fff;
      line-height: .56rem;
    }

  } 
  
  .main {
      width: 100%;
      padding: 0 .3rem;
      border-top: .2rem solid #e5e5e5;
      input {
          width: 100%;
          line-height: 1rem;
          color: #989898;
          border-bottom: .01rem solid #e5e5e5;
      }
      p {
          line-height: 1rem;
          font-size: .24rem;
          color: #666;
      }
  }

  button {
    width: 92%;
    height: 1rem;
    background: #d53d3d;
    border-radius: .08rem;
    margin: 0 .3rem;
    font-size: .32rem;
    color: #fff;
    font-weight: bold;
    margin-top: .5rem;
    margin-bottom: 5.7rem;
  }

}
</style>
