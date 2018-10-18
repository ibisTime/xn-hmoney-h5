<template>
  <div class="home-wrapper">
    <div class="home-header">
      <p class="title">{{ $t('page.navbar.title') }}</p>
      <span class="lang-change" @click='changeLocale'>{{ $t('language.name') }}</span>
    </div>
    <scroll>
      <div class="slider-wrapper">
        <slider>
          <div class="home-slider" v-for="item in banners" :key="item.code">
            <a :href="item.url||'javascript:void(0)'" :style="getImgSyl(item.pic)"></a>
          </div>
        </slider>
      </div>
      <div class="cates-wrapper">
          <div tag="div" class="cate-item">
            <i class="cate-icon game-icon"></i>
            <p>{{ $t('page.cate.game') }}</p>
          </div>
          <div tag="div" class="cate-item">
            <i class="cate-icon exchange-icon"></i>
            <p>{{ $t('page.cate.exchange') }}</p>
          </div>
          <router-link to='otc' tag="div" class="cate-item" @click="sessionStorage.setItem('tradeType', '1');">
            <i class="cate-icon otc-icon"></i>
            <p>{{ $t('page.cate.otc') }}</p>
          </router-link>
      </div>
      <div class="tab-wrapper">
          <div class="tabCar fun">
            <router-link to=''>
              <div class="tab-text">
                <p class="tit">FUN MVP</p>
                <p class="con">混乱世界、精彩画面</p>
              </div>
            </router-link>           
          </div>
          <div class="tabCar bibi">
            <router-link to='trading'>
              <div class="tab-text">
                <p class="tit">币币交易</p>
                <p class="con">24h全球实时行情</p>
              </div>
            </router-link>           
          </div>
          <div class="tabCar notice">
            <router-link to='system-notice'>
              <div class="tab-text">
                <p class="tit">系统公告</p>
                <p class="con">实时推送精彩内容</p>
              </div>
            </router-link>
          </div>
          <div class="tabCar introduce">
            <router-link to='about-platformIntroduced?ckey=about_us'>
              <div class="tab-text">
                <p class="tit">平台介绍</p>
                <p class="con">让你更加的了解我们</p>
              </div>
            </router-link>
          </div>
      </div>
    </scroll>
    <div class="foot"></div>
    <Footer></Footer>
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
  import {isLogin, formatImg} from 'common/js/util';
  import {getBannerList} from 'api/general';
  import Slider from 'base/slider/slider';
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';
  import Footer from 'components/footer/footer';
  import LangStorage from '../../common/js/cookie';
  import {getBbListData} from 'api/otc';
  export default {
    data() {
      return {
        banners: [
          './banner@2x.png'
          // './banner@2x.png'
        ],
        isLoading: true
      };
    },
    created() {
      this.getInitData();
    },
    updated() {
    },
    mounted() {
      getBbListData().then(data => {
        sessionStorage.setItem('coinData', JSON.stringify(data));
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    },
    computed: {
    },
    methods: {
      // 语言切换
      changeLocale() {
        let locale = this.$i18n.locale;
        locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh';
        LangStorage.setLang(this.$i18n.locale);// 将用户习惯存储到本地浏览器
      },
      getInitData() {
        this.getBannerList();
      },
      getBannerList() {
        return getBannerList().then((data) => {
          this.banners = data;
        });
      },
      getImgSyl(imgs) {
        return {
          backgroundImage: `url(${formatImg(imgs)})`
        };
      }
    },
    watch: {
    },
    components: {
      Slider,
      Scroll,
      Footer,
      FullLoading
    }
    // beforeRouteLeave(to, from, next) {
    //   if(to.path === '/login' || to.path === '/registered') {
    //     next();
    //   } else {
    //     alert('还没有登陆，请先登录！');
    //     next('/login');
    //   }
    // }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .home-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 1rem;
    background: #fff;
    font-size: 0;

    .home-header {
      width: 100%;
      text-align: center;
      color: #323232;
      position: relative;
      height: .88rem;
      margin-bottom: .2rem;

      .title {
        font:.36rem/.88rem PingFangSC-Medium;
      }

      .lang-change {
        position: absolute;
        top: .24rem;
        right: .27rem;
        font: .28rem/.4rem PingFangSC-Medium;
      }

    }

    .slider-wrapper {
      position: relative;
      height: 2.9rem;
      width: 100%;
      padding: 0 .3rem;
      border-radius: .08rem;

      .slider, .home-slider {
        height: 100%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        @include bg-image('banner');
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
      display: flex;
      flex-wrap: wrap;
      justify-content:space-around ;


      .tabCar {
        width: 47.8%;
        height: 1.8rem;
        background-size: 100% 100%;

        .tab-text {
          margin: .3rem 0 0 .3rem;
          color: #fff;
          .tit {
            font:.28rem/.4rem PingFangSC-Semibold;
            margin-bottom: .1rem;
          }
          .con {
            font:.22rem/.3rem PingFangSC-Medium;
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
