<template>
  <div class="home-wrapper">
    <div class="home-header">
      <p class="title">{{ $t('page.navbar.title') }}</p>
      <span class="lang-change" @click='changeLocale'>{{ $t('language.name') }}</span>
    </div>
    <div class="banner-wrap">
      <div class="slider-wrapper">
        <slider v-if="banners.length" :dots="banners">
          <div class="slider-item home-slider" v-for="item in banners" :key="item.code" :style="getImgSyl(item.pic)"
               @click="toUrl(item.url)">
          </div>
        </slider>
      </div>
      <!-- <Swiper v-if="banners.length" :data="banners"></Swiper> -->
    </div>
    <div class="cates-wrapper">
      <router-link to="shop" tag="div" class="cate-item">
        <i class="cate-icon game-icon"></i>
        <p>{{ $t('page.cate.xss') }}</p>
      </router-link>
      <router-link to="shop-usedCar" class="cate-item">
        <i class="cate-icon exchange-icon"></i>
        <p>{{ $t('page.cate.exchange') }}</p>
      </router-link>
      <router-link to='otc' tag="div" class="cate-item" @click.native="toOtcFn">
        <i class="cate-icon otc-icon"></i>
        <p>{{ $t('page.cate.otc') }}</p>
      </router-link>
    </div>
    <div class="tab-wrapper">
      <div class="tabCar fun">
        <router-link to='shop'>
          <div class="tab-text">
            <p class="tit">{{ $t('page.cate.game') }}</p>
            <p class="con">{{ $t('page.cate.splendid') }}</p>
          </div>
        </router-link>
      </div>
      <div class="tabCar bibi">
        <router-link to='trading'>
          <div class="tab-text">
            <p class="tit">{{ $t('page.cate.bbDeal') }}</p>
            <p class="con">{{ $t('page.cate.realTime') }}</p>
          </div>
        </router-link>
      </div>
      <div class="tabCar notice">
        <router-link to='system-notice'>
          <div class="tab-text">
            <p class="tit">{{ $t('page.cate.xtgg') }}</p>
            <p class="con">{{ $t('page.cate.sstsjcnr') }}</p>
          </div>
        </router-link>
      </div>
      <div class="tabCar introduce">
        <router-link to='about-platformIntroduced?ckey=about_us'>
          <div class="tab-text">
            <p class="tit">{{ $t('page.cate.ptjs') }}</p>
            <p class="con">{{ $t('page.cate.ljwm') }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <Footer></Footer>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
  import {isLogin, formatImg, setTitle} from 'common/js/util';
  import {getBannerList} from 'api/general';
  import Slider from 'base/slider/slider';
  // import Swiper from 'base/swiper/swiper';
  import FullLoading from 'base/full-loading/full-loading';
  import Footer from 'components/footer/footer';
  import LangStorage from '../../common/js/cookie';

  export default {
    name: 'test-keep-alive',
    data() {
      return {
        banners: [],
        isLoading: true,
        data: '',
        coinData: {}
      };
    },
    created() {
      setTitle(this.$t('footer.navbar.page'));
      this.getBanner();
    },
    activated() {
      this.$set(document, 'title', this.$t('footer.navbar.page'));
    },
    mounted() {
    },
    computed: {},
    methods: {
      // 语言切换
      changeLocale() {
        let locale = this.$i18n.locale;
        locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh';
        LangStorage.setLang(this.$i18n.locale);// 将用户习惯存储到本地浏览器
        setTitle(this.$t('footer.navbar.page'));
        this.getBanner();
      },
      getBanner() {
        this.isLoading = true;
        getBannerList().then((data) => {
          this.banners = data;
          this.isLoading = false;
        })
      },
      getImgSyl(imgs) {
        return {
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${formatImg(imgs)})`
        };
      },
      toUrl(url) {
        if (url !== '' && url) {
          window.open(url);
        };
      },
      toOtcFn(){
        sessionStorage.removeItem('coin');
        sessionStorage.setItem('tradeType', '1');
      }
    },
    components: {
      Slider,
      // Swiper,
      Footer,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .home-wrapper {
    width: 100%;
    background: #fff;
    font-size: 0;

    .home-header {
      width: 100%;
      text-align: center;
      color: #323232;
      position: relative;
      height: .88rem;
      margin-bottom: .1rem;

      .title {
        font: .36rem/.88rem PingFangSC-Medium;
      }

      .lang-change {
        position: absolute;
        top: .24rem;
        right: .27rem;
        font: .28rem/.4rem PingFangSC-Medium;
      }

    }
    .banner-wrap{
      width: 100%;
      padding: 0 .3rem;
    }
    .slider-wrapper {
      position: relative;
      height: 2.9rem;
      width: 100%;
      border-radius: .08rem;
      overflow: hidden;
      box-shadow: 0 0 0.3rem rgba(99,99,99,0.08);
      .slider, .home-slider {
        height: 100%;
        width: 100%;
        // background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

    }

    .cates-wrapper {
      margin-top: .5rem;
      display: flex;
      align-items: center;
      border-bottom: .2rem solid #F5F5F5;

      .cate-item {
        flex: 1;
        text-align: center;

        .cate-icon {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;

          &.game-icon {
            @include bg-image('game');
          }

          &.exchange-icon {
            @include bg-image('exchange');
          }

          &.otc-icon {
            @include bg-image('otc');
          }

        }

        p {
          font: .24rem/.33rem PingFangSC-Medium;
          color: #666;
          padding: .18rem 0 .5rem;
        }

      }

    }

    .tab-wrapper {
      width: 92%;
      margin: .4rem auto .5rem;
      padding-bottom: 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .tabCar {
        width: 46.8%;
        height: 1.8rem;
        background-size: 100% 100%;

        .tab-text {
          margin: .3rem 0 0 .3rem;
          color: #fff;
          .tit {
            font: .28rem/.4rem PingFangSC-Semibold;
            margin-bottom: .1rem;
          }
          .con {
            font: .22rem/.3rem PingFangSC-Medium;
          }
        }

      }

      .fun {
        @include bg-image('fun');
        margin: 0 .3rem .3rem 0;
      }

      .bibi {
        @include bg-image('bibi');
      }

      .notice {
        @include bg-image('notice');
        margin: 0 .3rem .3rem 0;
      }

      .introduce {
        @include bg-image('introduce');
      }

    }

    .foot {
      width: 100%;
      height: .88rem;
      background: #f5f5f5;
      position: fixed;
      bottom: .57rem;
      z-index: 1;
    }

  }

</style>
