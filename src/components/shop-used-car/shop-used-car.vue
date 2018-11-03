<template>
  <div class="usedCar-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon'></i>
        <span class='title'>二手车</span>
        </p>
    </header> -->
    <div class='main'>

    </div>
    <Footer></Footer>
  </div>
  
</template>
<script>
import { setTitle } from "common/js/util";
import Footer from 'components/footer/footer';
export default {
  created() {
      setTitle(this.$t('shop.navbar.escdh'));
  },
  components: {
    Footer
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.usedCar-wrapper {
    overflow: auto;
    width: 100%;
    background: #fff;

    header {
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.36rem;
        font-weight: bold;
        width: 100%;
        padding: 0 .3rem;
        padding-bottom: .2rem;

        .icon {
            display: inline-block;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            width: 0.21rem;
            height: 0.36rem;
            background-image: url('./fh.png');
            float: left;
            margin-top: .26rem;
        }
    }

    .main {
        width: 100%;
        height: 12.06rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        background-image: url('./jjtc.png');
    }

}
</style>
