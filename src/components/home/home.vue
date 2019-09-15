<template>
  <div class="home-wrapper">
    <Scroll :pullUpLoad="null">
      <div class="banner-wrap">
        <div class="slider-wrapper">
          <slider v-if="banners.length" :dots="banners">
            <div class="slider-item home-slider" v-for="item in banners" :key="item.code" :style="getImgSyl(item.pic)"
                 @click="toUrl(item.url)">
            </div>
          </slider>
        </div>
      </div>
      <div class="cates-wrapper">
        <router-link to="dig-purchase" tag="div" class="cate-item">
          <i class="cate-icon game-icon"></i>
          <p>申购</p>
        </router-link>
        <router-link to="dig-coin" class="cate-item">
          <i class="cate-icon exchange-icon"></i>
          <p>挖矿</p>
        </router-link>
        <router-link to='dig-delivery' tag="div" class="cate-item" @click.native="resetSession">
          <i class="cate-icon otc-icon"></i>
          <p>交割</p>
        </router-link>
      </div>
      <div class="home_con">
        <h5><span></span>应用</h5>
        <div class="tab-wrapper">
          <div class="tabCar fun">
            <router-link to='/my-inviteFriends' style="display: flex; align-items: center;">
              <div class="tab_left">
                <img src="./con_mk.png" alt="">
              </div>
              <div class="tab-text">
                <p class="tit">邀请好友</p>
                <p class="con">推荐有礼</p>
              </div>
            </router-link>
          </div>
          <div class="tabCar bibi">
            <router-link to='trading' style="display: flex; align-items: center;">
              <div class="tab_left">
                <img src="./con_bbjy.png" alt="">
              </div>
              <div class="tab-text">
                <p class="tit">{{ $t('page.cate.bbDeal') }}</p>
                <p class="con">全球首创交易平台</p>
              </div>
            </router-link>
          </div>
          <div class="tabCar notice">
            <router-link to='system-notice' style="display: flex; align-items: center;" @click.native="toNotice">
              <div class="tab_left">
                <img src="./con_xtgg.png" alt="">
              </div>
              <div class="tab-text">
                <p class="tit">系统公告</p>
                <p class="con">实时推送精彩内容</p>
              </div>
            </router-link>
          </div>
          <div class="tabCar introduce">
            <router-link to='about-platformIntroduced?ckey=plat_introduce' style="display: flex; align-items: center;">
              <div class="tab_left">
                <img src="./con_ptjs.png" alt="">
              </div>
              <div class="tab-text">
                <p class="tit">平台介绍</p>
                <p class="con">让你更加了解我们</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </Scroll>
    <Footer></Footer>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
  import {isLogin, formatImg, setTitle} from 'common/js/util';
  import {getBannerList} from 'api/general';
  import Slider from 'base/slider/slider';
  import Scroll from 'base/scroll/scroll';
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
        }).catch(() => {
          this.isLoading = false;
        });
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
      toNotice() {
        sessionStorage.setItem('mes_skey', 'common');
      },
      resetSession() {
        sessionStorage.removeItem('freeSymbol');
        sessionStorage.removeItem('productMsg');
      }
    },
    components: {
      Slider,
      Scroll,
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
    height: 100%;
    background: #fff;
    font-size: 0;
    padding-top: 0.4rem;
    .banner-wrap{
      width: 100%;
      padding: 0 .3rem;
    }
    .slider-wrapper {
      position: relative;
      height: 3rem;
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
            background-image: url('./tab_sg.png');
          }

          &.exchange-icon {
            background-image: url('./tab_wk.png');
          }

          &.otc-icon {
            background-image: url('./tab_jg.png');
          }

        }

        p {
          font: .24rem/.33rem PingFangSC-Medium;
          color: #666;
          padding: .18rem 0 .5rem;
        }

      }

    }
    .home_con{
      padding: 0.3rem;
      background-color: #fff;
      h5{
        color: #333333;
        font-size: 0.32rem;
        margin-bottom: 0.22rem;
        span{
          margin-right: 0.16rem;
          display: inline-block;
          width: 0.06rem;
          height: 0.26rem;
          background-color: #676FFF;
        }
      }
    }
    .tab-wrapper {
      margin: .4rem auto .5rem;
      padding-bottom: 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .tabCar {
        width: 46.8%;
        background-size: 100% 100%;
        background-color: #FAFAFA;
        padding: 0.3rem;
        margin-bottom: 0.3rem;
        .tab_left{
          width: 0.6rem;
          height: 0.6rem;
          margin-right: 0.18rem;
          img{
            width: 0.6rem;
            height: 0.6rem;
          }
        }
        .tab-text {
          color: #999;
          .tit {
            font: .28rem/.4rem PingFangSC-Semibold;
            margin-bottom: .16rem;
            color: #333;
          }
          .con {
            font: .22rem/.3rem PingFangSC-Medium;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
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
