<template>
  <div class="shop-wrapper" @click.stop>
    <header>
        <p>
        <span class='title'>{{ $t('shop.navbar.txt') }}</span>
        <router-link to='shop-usedCar' class="car">{{ $t('shop.navbar.car') }}</router-link>
        </p>
    </header>
    <div class="banner">
      <p class='text1'>{{ $t('shop.subject.yxye') }}</p>
      <p class='text2'>{{gMon}}</p>
      <p class='text3'></p>
      <span class='btn'  @click="toGame">
        {{ $t('shop.subject.jryx') }}
      </span>
      <router-link to='/shop-cz' class='btn' >
        {{ $t('shop.subject.zryx') }}
      </router-link>
    </div>
    <div class="main" @click="toGame">
    </div>
      <Footer></Footer>
      <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>

</template>
<script>
import { gramUrl, gramMoney } from 'api/store';
import { setTitle } from "common/js/util";
import Footer from 'components/footer/footer';
import FullLoading from 'base/full-loading/full-loading';
import {isLogin} from 'common/js/util';
export default {
  data() {
    return {
      gUrl: '',
      gMon: '',
      isLoading: true
    };
  },
  created() {
    setTitle(this.$t('shop.navbar.title'));
  },
  mounted() {
    if (!isLogin()){
      this.$router.push('/login');
    } else {
      gramUrl().then(data => {
        this.gUrl = `${data.gameUrl}?userId=${data.userId}&phone=${data.phone}&hashID=${data.hashID}&sign=${data.sign}&timestamp=${data.timestamp}`;
      });
      gramMoney().then(data => {
        this.gMon = (Math.floor(parseFloat(data.balance) * 100000000) / 100000000).toFixed(8) + data.currency;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    }

  },
  methods: {
    toGame(){
      window.open(this.gUrl);
    }
  },
  components: {
    Footer,
    FullLoading
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
      margin: 0 0.1rem;
      padding: 0 0.4rem;
      line-height: 0.55rem;
      font-size: .28rem;
      color: #fff;
      border-radius: .06rem;
      border: .01rem solid #fff;
    }

  }

  .main {
    width: 100%;
    height: 6.2rem;
    margin-top: 0.6rem;
    background-image: url('./95650.jpg');
    background-repeat: no-repeat;
    background-position: top;
    background-size: 100%;
  }





}
</style>
