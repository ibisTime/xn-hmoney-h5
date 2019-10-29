<template>
  <div class="home-wrapper">
    <Scroll :pullUpLoad="null">
      <div class="banner-wrap">
        <div class="slider-wrapper">
          <slider v-if="banners.length" :dots="banners" :isdots="false">
            <div class="slider-item home-slider" v-for="item in banners" :key="item.code" :style="getImgSyl(item.pic)"
                 @click="toUrl(item.url)">
            </div>
          </slider>
        </div>
        <div class="warp-msg">
          <div class="msg-left-icon"></div>
          <div class="msg-right" @click="toNoticeDetail">
            <vueSeamless :data='APIIpList' :class-option="option" :step="0.5">
              <div
                v-for="(item, index) in APIIpList"
                :key="index"
                :data-code="item.code"
              >{{item.title}}</div>
            </vueSeamless>
          </div>
        </div>
        <div class="trading-warp">
          <slider v-if="gkdsList.length" :dots="gkdsList" :autoPlay="false">
            <div class="trading-single" v-for="(item, index) in gkdsList" :key="`gkds_${index}`">
              <div
                class="single-box"
                v-for="singleItem in item"
                :key="`trading_${singleItem.id}`"
                @click="() => {
                  toTradingView({symbol: singleItem.symbol, toSymbol: singleItem.referCurrency})
                }"
              >
                <h5 class="single-box-head">{{singleItem.symbol}}/{{singleItem.referCurrency}}</h5>
                <div :class="+singleItem.percent24h < 0 ? 'trading-num-down' : 'trading-num-up'">
                  <p class="trading-num-tit">{{singleItem.lastPrice}}</p>
                  <p class="trading-num-txt">{{singleItem.percent24h < 0 ? `-` : `+`}}{{(Math.floor(+singleItem.percent24h * 100) / 100).toFixed(2)}}%</p>
                </div>
                <p class="single-box-foo">
                  ≈{{singleItem.hsLastPrice}} {{currency}}
                </p>
              </div>
            </div>
          </slider>
        </div>
      </div>
      <div class="cates-wrapper">
        <div class="cates-wrapper-left">
          <router-link to="dig-purchase" tag="div" class="cate-item">
            <div class="cate-item-left">
              <h5>申购</h5>
              <p>优质通证放心购</p>
            </div>
            <div class="cate-item-icon"></div>
          </router-link>
        </div>
        <div class="cates-wrapper-right">
          <router-link
            to="dig-coin"
            tag="div"
            class="cate-item"
            style="margin-bottom: 0.2rem; background-color: rgba(241, 130, 79, 0.1)"
          >
            <div class="cate-icon exchange-icon"></div>
            <p>挖矿</p>
          </router-link>
          <router-link
            to='dig-delivery'
            tag="div"
            class="cate-item"
            style="background-color: rgba(97,79,241,0.1)"
            @click.native="resetSession"
          >
            <div class="cate-icon otc-icon"></div>
            <p>交割</p>
          </router-link>
        </div>
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
                <p class="con">真实物权交易平台</p>
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
  import {mineNotice} from 'api/mine';
  import vueSeamless from 'vue-seamless-scroll';
  import LangStorage from '../../common/js/cookie';
  import {queryHomeTrading} from 'api/tradingOn';

  export default {
    name: 'test-keep-alive',
    data() {
      return {
        banners: [],
        APIIpList: [],
        option: {
          step: 1,
          limitMoveNum: 1,
          openTouch: false,
          waitTime: 48,
          direction: 1,
          singleHeight: 1
        },
        isLoading: true,
        data: '',
        coinData: {},
        gkdsList: [],
        currency: '',
        timer: null
      };
    },
    created() {
      setTitle(this.$t('footer.navbar.page'));
      this.currency = sessionStorage.getItem('WALLET_CURRY') || 'CNY';
      this.getBanner();
      this.getNotice();
      this.getQueryHomeTrading();
      if(this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.getNotice();
        this.getQueryHomeTrading();
      }, 5000);
    },
    activated() {
      this.$set(document, 'title', this.$t('footer.navbar.page'));
    },
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
        }
      },
      toNotice() {
        sessionStorage.setItem('mes_skey', 'common');
      },
      toNoticeDetail(ev) {
        const code = ev.target.getAttribute('data-code');
        if(code) {
          this.$router.push(`/system-notice-detail?code=${code}`);
        }
      },
      resetSession() {
        sessionStorage.removeItem('freeSymbol');
        sessionStorage.removeItem('productMsg');
      },
      getQueryHomeTrading() {
        queryHomeTrading().then(data => {
          let arr = [], index = 0;
          for(let i = 0, len = data.length; i < len; i ++) {
            data[i].lastPrice = (Math.floor(+data[i].lastPrice * 100) / 100).toFixed(2);
            data[i].hsLastPrice = this.currency === 'USD' ? (Math.floor(+data[i].lastPriceUsd * 100) / 100).toFixed(2) : (Math.floor(+data[i].lastPriceCny * 100) / 100).toFixed(2);
            if(i === 0) {
              arr[0] = [data[0]];
            }else if(i % 3 === 0) {
              index ++;
              arr[index] = [data[i]];
            }else {
              arr[index].push(data[i]);
            }
          }
          this.gkdsList = arr;
        });
      },
      getNotice() {
        mineNotice({
          start: 1,
          limit: 20,
          type: 0
        }).then(data => {
          this.APIIpList = data.list.map(item => ({
            title: item.title,
            code: item.code
          }));
        });
      },
      toTradingView(obj) {
        this.$router.push(`/trading?symbol=${obj.symbol}&toSymbol=${obj.toSymbol}`);
      }
    },
    components: {
      Slider,
      Scroll,
      Footer,
      FullLoading,
      vueSeamless
    },
    beforeDestroy() {
      if(this.timer) {
        clearInterval(this.timer);
      }
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
    .warp-msg{
      margin: 0.04rem 0;
      height: 0.7rem;
      line-height: 0.7rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      .msg-left-icon{
        width: 0.3rem;
        height: 0.26rem;
        background-image: url('./home_msg.png');
        background-size: 100% 100%;
      }
      .msg-right{
        flex: 1;
        padding-left: 0.2rem;
        color: #3D3DD5;
        font-size: 0.24rem;
      }
    }
    .trading-warp{
      position: relative;
      width: 100%;
      border-radius: .08rem;
      overflow: hidden;
      border-top: 0.01rem solid #EBEBEB;
      .trading-single{
        display: flex;
        padding: 0.3rem 0 0.4rem;
      }
      .single-box{
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .single-box-head{
          color: #333;
          font-weight: 600;
          font-size: 0.24rem;
          margin-bottom: 0.1rem;
        }
        .trading-num-up{
          color: #11A746;
        }
        .trading-num-down{
          color: #D53D3D;
        }
        .trading-num-tit{
          font-weight: 500;
          font-size: 0.32rem;
          line-height: 0.45rem;
        }
        .trading-num-txt{
          font-size: 0.22rem;
          line-height: 0.3rem;
          margin-bottom: 0.06rem;
        }
        .single-box-foo{
          color: #999999;
          font-size: 0.22rem;
          line-height: 0.3rem;
        }
        &:nth-of-type(2){
          margin: 0 5%;
        }
      }
    }

    .cates-wrapper {
      border-top: 0.5px solid #EBEBEB;
      border-bottom: 0.01rem solid #EBEBEB;
      padding: 0.3rem 0;
      margin: auto 0.22rem;
      background-color: #fff;
      align-items: center;
      display: flex;
      justify-content: space-between;
      .cates-wrapper-left{
        width: 3.8rem;
        padding: 0.57rem 0.4rem;
        border-radius: 0.08rem;
        overflow: hidden;
        background-color: rgba(79,127,241,0.1);
        .cate-item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .cate-item-left{
            flex: 1;
            padding-right: 0.34rem;
            h5{
              font-size: 0.36rem;
              color: #333;
              line-height: 0.45rem;
              margin-bottom: 0.1rem;
            }
            p{
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #999999;
              font-size: 0.24rem;
            }
          }
          .cate-item-icon{
            width: 0.98rem;
            height: 0.86rem;
            background-image: url('./tab_sg.png');
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
        }
      }
      .cates-wrapper-right{
        flex: 1;
        padding-left: 0.2rem;
        .cate-item{
          font-size: 0.28rem;
          background-color: #fff;
          padding: 0.23rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.08rem;
          p{
            color: #333;
          }
          .cate-icon{
            margin-right: 0.1rem;
            background-size: 100% 100%;
          }
          .exchange-icon{
            width: 0.51rem;
            height: 0.45rem;
            background-image: url('./tab_wk.png');
          }
          .otc-icon {
            width: 0.5rem;
            height: 0.46rem;
            background-image: url('./tab_jg.png');
          }
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
