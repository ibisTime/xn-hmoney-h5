<template>
  <div class="template-wrapper">
    <div :class="[Show ? 'filter otc-wrapper': 'otc-wrapper' ]" @click.stop>
      <div class='header'>
        <div class="head_left">
          <p :class="[flag1 ? 'head_left_txt head_left_select' : 'head_left_txt']" @click.stop='buy'>我要买</p>
          <p :class="[flag2 ? 'head_left_txt head_left_select' : 'head_left_txt']" @click.stop='sell'>我要卖</p>
        </div>
        <div class="head_right">
          <div class="head_r_01" @click="isShowSxBox = true">
            <p class="head_r_01_icon"></p>
            <p class="head_r_01_txt">筛选</p>
          </div>
          <div class="head_r_02" @click="showPersonalBox">
            <p class="head_r_02_icon">
              <span class="tip_icon" v-if="getUnreadMsgNum()"></span>
            </p>
            <p class="head_r_02_txt">我的</p>
          </div>
        </div>
      </div>
      <div class="otc_content">
        <ul class="top-main">
          <li
            class="top_sx_single"
            :class="config.coin === item ? 'top_sx_single_select' : ''"
            v-for="item in bbList"
            :key="item"
            @click="() => {
              getAdverFn(item);
            }"
          >{{item}}</li>
        </ul>
        <!-- 买币 -->
        <div class='main'>
          <Scroll
            ref="scroll"
            :data="bbDataList"
            :hasMore="hasMore"
            :pullUpLoad="pullUpLoad"
            v-show="bbDataList.length"
            @pullingUp="getBBListData"
          >
            <div class='content' v-for="(adverItem, index) in bbDataList" :key="index">
              <div class='cont'>
                <div class='preson'>
                  <div class='pic' @click="toHomePage(adverItem.userId, adverItem.tradeCoin)">
                    <p class="pic-p" :style="getUserPic(adverItem.user.photo)" :class="{'hidden': !adverItem.user.photo}"
                       alt=""></p>
                    <HeadPic :content="adverItem.user.nickname.substring(0, 1)"
                             :class="{'hidden': adverItem.user.photo}"/>
                    <span class='color' :class="calculateFn(adverItem.user.lastLogin)"></span>
                  </div>
                  <span class='name' :class="{'wname': !adverItem.user.idNo}">{{adverItem.user.idNo ? $t('otc.subject.ysm') : $t('otc.subject.wsm')}}</span>
                </div>
                <div class='text'>
                  <p class='title'>{{adverItem.user.nickname}}<span class='ico'>{{bizTypeList[adverItem.payType]}}</span>
                  </p>
                  <p class='disc'>{{ $t('otc.subject.jy') }}·{{adverItem.userStatistics.jiaoYiCount}} {{
                    $t('otc.subject.hp') }}·{{getPercentum(adverItem.userStatistics.beiHaoPingCount,
                    adverItem.userStatistics.beiPingJiaCount)}} {{ $t('otc.subject.xr')
                    }}·{{adverItem.userStatistics.beiXinRenCount}}</p>
                  <p class='limit'>{{ $t('otc.subject.xe') }}：{{adverItem.minTrade}}-{{adverItem.maxTrade}}
                    {{adverItem.tradeCurrency}}</p>
                </div>
                <div class='number'>
                  <p class='num'>{{(Math.floor(adverItem.truePrice * 100) / 100).toFixed(2)}}
                    {{adverItem.tradeCurrency}}</p>
                  <p class='shop' @click="toclAdver(adverItem.user.userId, adverItem.tradeType, adverItem.code)">
                    {{adverItem.user.userId == userId ? $t('otc.subject.bj') : adverItem.tradeType == 0 ?
                    $t('otc.subject.cs') : $t('otc.subject.gm')}}</p>
                </div>
              </div>
            </div>
          </Scroll>
          <div class="no-data" :class="{'hidden': bbDataList.length > 0}">
            <img src="./wu.png"/>
            <p>{{ $t('common.zwgg') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="userId"
      class='release'
      :class="lang === 'cn' ? '' : 'en'"
      ref="touchDemo"
      @click='relShow'
      @touchstart.stop="fbTouchStartFn"
      @touchmove.stop="fbTouchMoveFn"
      @touchend.stop="fbTouchEndFn"
    >
      <span class="icon"></span>
      <p class="txt">{{$t('otc.subject.fb')}}</p>
    </div>
    <div v-show="Show" class='release2'>
      <div class='main'>
        <div class='buy' @click.stop='goBuyPublish'>
          <span></span>
          <p>{{ $t('otc.subject.fbgm') }}</p>
        </div>
        <div class='sell' @click.stop='goSellPublish'>
          <span></span>
          <p>{{ $t('otc.subject.fbcs') }}</p>
        </div>
      </div>
      <div @click='relClose' class='close'></div>
    </div>
    <div class="otc_sx_box" v-show="isShowSxBox" @click="isShowSxBox = false">
      <div class="sx_content" @click.stop>
        <div class="otc_sx_box_single">
          <h5 class="sx_box_h5">货币</h5>
          <ul class="sx_box_ul">
            <li
              class="sx_box__single"
              :class="sx_currency === 'CNY' ? 'sx_box__single_select' : ''"
              @click="sx_currency === 'CNY' ? sx_currency = '' : sx_currency = 'CNY'"
            >CNY</li>
            <li
              class="sx_box__single"
              :class="sx_currency === 'USD' ? 'sx_box__single_select' : ''"
              @click="sx_currency === 'USD' ? sx_currency = '' : sx_currency = 'USD'"
            >USD</li>
          </ul>
        </div>
        <div class="otc_sx_box_single">
          <h5 class="sx_box_h5">支付方式</h5>
          <ul class="sx_box_ul">
            <li
              class="sx_box__single"
              :class="sx_pay === '0' ? 'sx_box__single_select' : ''"
              @click="sx_pay === '0' ? sx_pay = '' : sx_pay = '0'"
            >支付宝</li>
            <li
              class="sx_box__single"
              :class="sx_pay === '1' ? 'sx_box__single_select' : ''"
              @click="sx_pay === '1' ? sx_pay = '' : sx_pay = '1'"
            >微信</li>
            <li
              class="sx_box__single"
              :class="sx_pay === '2' ? 'sx_box__single_select' : ''"
              @click="sx_pay === '2' ? sx_pay = '' : sx_pay = '2'"
            >银行卡转让</li>
          </ul>
        </div>
        <div class="otc_sx_foo">
          <p
            class="otc_sx_foo_reset"
            @click="() => {
              sx_pay = '';
              sx_currency = '';
            }">重置</p>
          <p class="otc_sx_foo_qd" @click="sxOtcList">确定</p>
        </div>
      </div>
    </div>
    <div class="otc_personal" v-show="isShowPersonal" @click="hidePersonalBox">
      <div class="personal_box" @click.stop>
        <div class="personal_box_head">
          <div class="personal___head_left">
            <HeadPic
              :content="userNameSub.substring(0, 1)"
              :picUrl="userPic"
            />
            <!--adverItem.user.nickname.substring(0, 1)-->
          </div>
          <div class="personal___head_right">
            <p class="p_head_r_name">{{userNameSub}}</p>
            <p class="p_head_r_info">交易 {{userMsg.jiaoYiCount}} | 好评率 {{userMsg.bingJiaCount}} | 信任 {{userMsg.beiXinRenCount}}</p>
          </div>
        </div>
        <ul class="personal_box_con">
          <li class="p_box_con_single" @click="toPage('my-advertising')">
            <div class="p_single_left">
              <p class="p_s_l_icon p_s_l_icon01"></p>
              <p class="p_s_l_txt">我的广告</p>
            </div>
            <div class="p_single_right">
              <p class="p_s_r_icon"></p>
            </div>
          </li>
          <li class="p_box_con_single" @click="toPage('my-order')">
            <div class="p_single_left">
              <p class="p_s_l_icon p_s_l_icon02"></p>
              <p class="p_s_l_txt">我的订单</p>
            </div>
            <div class="p_single_right">
              <p class="p_s_r_txt" v-if="getUnreadMsgNum()">您有新消息</p>
              <p class="p_s_r_icon"></p>
            </div>
          </li>
          <li class="p_box_con_single" @click="toPage('my-guest')">
            <div class="p_single_left">
              <p class="p_s_l_icon p_s_l_icon03"></p>
              <p class="p_s_l_txt">交易对手</p>
            </div>
            <div class="p_single_right">
              <p class="p_s_r_icon"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Toast :text="textMsg" ref="toast"/>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import Footer from 'components/footer/footer';
  import {formatImg, getUserId, getAvatar, setTitle, getPercentum, calculateDays, isLogin} from 'common/js/util';
  import {getUser} from 'api/user';
  import {getBannerList} from 'api/general';
  import {getAdvertisingData, getAdvertiseBbList} from 'api/otc';
  import Slider from 'base/slider/slider';
  import Scroll from 'base/scroll/scroll';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import HeadPic from 'base/head-pic/headPic';

  export default {
    data() {
      return {
        userId: getUserId(),
        isLoading: true,
        bbList: [],
        config: {
          coin: '',
          tradeType: '1'
        },
        bizTypeList: {
          '0': this.$t('otc.navtxt.zfb'),
          '1': this.$t('otc.navtxt.wx'),
          '2': this.$t('otc.navtxt.yhk')
        },
        bbDataList: [],
        banners: [],
        show3: false,
        Show: false,
        flag1: true,
        flag2: false,
        url: 'otc-buy',
        hasMore: true,
        start1: 1,
        start2: 1,
        limit: 10,
        textMsg: '',
        type: 's',
        flags: '',
        position: {x: '', y: ''},
        demoX: '',
        demoY: '',
        moveX: '',
        moveY: '',
        xPum: '',
        yPum: '',
        touchDemo: '',
        docuWidth: '',
        docuHeight: '',
        pullUpLoad: {
          threshold: 40,
          txt: {
            more: this.$t('common.jzz') + '...',
            noMore: this.$t('common.jzwb')
          }
        },
        loginStatus: '',
        lang: 'cn',
        sx_currency: '',
        sx_pay: '',
        isShowSxBox: false,
        isShowPersonal: !!sessionStorage.getItem('isShowPersonal'),
        userPic: '',
        userNameSub: '',
        userMsg: {
          jiaoYiCount: '0',
          bingJiaCount: '0',
          beiXinRenCount: '0'
        }
      };
    },
    created() {
      setTitle('法币交易');
      this.lang = window.localStorage.getItem('user_lang') || 'cn';
      getAdvertiseBbList().then(data => {
        this.bbList = data.map(item => item.symbol);
        this.config.tradeType = sessionStorage.getItem('tradeType') || '1';
        if (this.config.tradeType === '0') {
          this.flag1 = false;
          this.flag2 = true;
        }
        let coin = sessionStorage.getItem('coin') || this.bbList[0];
        this.config.coin = coin != 'undefined' ? coin : this.bbList[0];
        this.getBBListData();
      });
      if(isLogin()) {
        getUser().then(data => {
          this.userPic = data.photo ? formatImg(data.photo) : '';
          this.userNameSub = data.nickname ? data.nickname : data.loginName;
          const userStatistics = data.userStatistics;
          if(userStatistics) {
            this.userMsg = {
              jiaoYiCount: userStatistics.jiaoYiCount,
              bingJiaCount: this.getPercentum(userStatistics.beiHaoPingCount, userStatistics.beiPingJiaCount),
              beiXinRenCount: userStatistics.beiXinRenCount
            };
          }
        });
      }
    },
    methods: {
      // 登录状态
      calculateFn(userTime) {
        let time = calculateDays(userTime, new Date());
        if (time <= 10) {
          return 'green';
        } else if (time <= 30) {
          return 'yellow';
        } else {
          return 'gray';
        }
      },
      hidePersonalBox() {
        this.isShowPersonal = false;
        sessionStorage.removeItem('isShowPersonal');
      },
      showPersonalBox() {
        this.isShowPersonal = true;
        sessionStorage.setItem('isShowPersonal', '1');
      },
      // 是否显示有新消息
      getUnreadMsgNum() {
        return this.unreadMsgNum > 0;
      },
      // 计算百分比
      getPercentum(num1, num2) {
        return getPercentum(num1, num2);
      },
      // 请求列表数据
      getBBListData() {
        let that = this;
        this.config.limit = this.limit;
        if (this.type == 's') {
          this.config.start = this.start1;
          getAdvertisingData(this.config).then(data => {
            clData(data, that, this.start1, 's');
          }, () => {
            this.isLoading = false;
          });
        } else {
          this.config.start = this.start2;
          getAdvertisingData(this.config).then(data => {
            clData(data, that, this.start2, 'e');
          }, () => {
            this.isLoading = false;
          });
        }

        function clData(data, that, start, type) {
          that.isLoading = false;
          that.hasMore = true;
          if (data.totalPage < start) {
            that.bbDataList = [];
          }
          if (data.totalPage <= start) {
            that.hasMore = false;
          }
          that.bbDataList = [...that.bbDataList, ...data.list];
          if (type == 's') {
            that.start1++;
          } else {
            that.start2++;
          }
        }

      },
      // 根据条件查询数据
      sxOtcList() {
        this.config.tradeCurrency = this.sx_currency;
        this.config.payType = this.sx_pay;
        this.isShowSxBox = false;
        this.start1 = 1;
        this.start2 = 1;
        this.bbDataList = [];
        this.getBBListData();
      },
      //根据币种请求数据
      getAdverFn(coin) {
        sessionStorage.setItem('coin', coin);
        this.config = {
          ...this.config,
          coin
        };
        this.start1 = 1;
        this.start2 = 1;
        this.limit = 10;
        this.bbDataList = [];
        this.getBBListData();
      },
      getInitData() {
        this.getBannerList();
      },
      getImgSyl(imgs) {
        return {
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${formatImg(imgs)})`
        };
      },
      advertisingFn(type) {
        this.config.tradeType = type;
        this.getBBListData();
      },
      buy() {
        this.flag1 = true;
        this.flag2 = false;
        this.start1 = 1;
        this.type = 's';
        this.bbDataList = [];
        this.advertisingFn('1');
        this.url = 'otc-buy';
        sessionStorage.setItem('tradeType', '1');
      },
      sell() {
        this.type = 'e';
        this.flag1 = false;
        this.flag2 = true;
        this.start2 = 1;
        this.bbDataList = [];
        this.advertisingFn('0');
        this.url = 'otc-sell';
        sessionStorage.setItem('tradeType', '0');
      },
      goOtcBuy() {
        this.$router.push('otc-buy');
      },
      relShow() {
        this.Show = true;
      },
      relClose() {
        this.Show = false;
      },
      goBuyPublish() {
        this.$router.push('buy-publish?type=0');
      },
      goSellPublish() {
        getUser().then(data => {
          if (data.tradepwdFlag) {
            this.$router.push('buy-publish?type=1');
          } else if (!data.tradepwdFlag) {
            this.textMsg = this.$t('common.szzjmm');
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.push('/security-tradePassword');
            }, 1500);
          }
        });
      },
      // 获取头像
      getUserPic(pic) {
        return getAvatar(pic);
      },
      // 编辑、购买或出售
      toclAdver(userId, type, code) {
        if (userId === this.userId) {
          this.$router.push({
            path: '/buy-publish',
            query: {
              userId,
              code,
              type
            }
          });
        } else {
          this.$router.push({
            path: '/otc-buy', query: {
              userId,
              adsCode: code,
              type
            }
          });
        }
      },
      // 个人主页
      toHomePage(userId, tradeCoin) {
        this.$router.push(`/homepage?userId=${userId}&currency=${tradeCoin}`);
      },
      // 实现 发布 拖动
      fbTouchStartFn() {
        this.touchDemo = this.$refs.touchDemo;
        this.flags = true;
        let touch = '';
        if (event.touchs) {
          touch = event.touchs[0];
        } else {
          touch = event.changedTouches[0];
        }

        this.docuWidth = document.body.clientWidth - 50;
        this.docuHeight = document.body.clientHeight - 150;
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.demoX = this.touchDemo.offsetLeft;
        this.demoY = this.touchDemo.offsetTop;
      },
      fbTouchMoveFn() {
        event.preventDefault();
        if (this.flags) {
          var touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event.changedTouches[0];
          }
          this.moveX = touch.clientX - this.position.x;
          this.moveY = touch.clientY - this.position.y;
          this.xPum = this.demoX + this.moveX;
          this.yPum = this.demoY + this.moveY;

          // 判断边界
          if (this.xPum > this.docuWidth) {
            this.xPum = this.docuWidth;
          }
          if (this.xPum < 0) {
            this.xPum = 0;
          }
          if (this.yPum > this.docuHeight) {
            this.yPum = this.docuHeight;
          }
          if (this.yPum < 0) {
            this.yPum = 0;
          }

          this.touchDemo.style.left = this.xPum / 50 + 'rem';
          this.touchDemo.style.top = this.yPum / 50 + 'rem';
        }
      },
      fbTouchEndFn() {
        this.flags = false;
      },
      toUrl(url) {
        window.open(url);
      },
      toPage(url) {
        this.$router.push(url)
      }
    },
    computed: {
      ...mapGetters([
        'unreadMsgNum'
      ])
    },
    components: {
      Footer,
      Slider,
      Scroll,
      Toast,
      FullLoading,
      HeadPic
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .otc-wrapper {
    font-family: PingFangSC-Medium;
    font-size: .3rem;
    color: #333;
    height: 100%;
    background: #fff;
    overflow-x: hidden;
    z-index: 10;
    padding-bottom: 1rem;

    .header {
      width: 100%;
      padding: 0.5rem .29rem 0.34rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 9;
      background-color: #F5F5F5;
      font-family: 'PingFangSC-Regular';
      .head_left{
        display: flex;
        align-items: center;
        .head_left_txt{
          color: #C0C4CC;
          margin-right: 0.4rem;
          font-size: 0.28rem;
          line-height: 0.36rem;
          &:last-child{
            margin-right: 0;
          }
        }
        .head_left_select{
          color: #333333;
          font-weight: 500;
          font-size: 0.42rem;
        }
      }
      .head_right{
        display: flex;
        align-items: center;
        .head_r_01, .head_r_02{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .head_r_01{
          margin-right: 0.38rem;
        }
        .head_r_01_icon, .head_r_02_icon{
          width: 0.3rem;
          height: 0.31rem;
          margin-bottom: 0.05rem;
          background-size: 100% 100%;
        }
        .head_r_01_icon{
          background-image: url("./otc_sx.png");
        }
        .head_r_02_icon{
          position: relative;
          background-image: url("./otc_me.png");
          .tip_icon{
            position: absolute;
            right: -0.02rem;
            top: -0.02rem;
            display: inline-block;
            width: 0.13rem;
            height: 0.13rem;
            border-radius: 100%;
            background-color: #D53D3D;
          }
        }
        .head_r_01_txt, .head_r_02_txt{
          font-size: 0.2rem;
          color: #333333;
        }
      }
    }
    .otc_content{
      border-top-left-radius: 0.12rem;
      border-top-right-radius: 0.12rem;
      background-color: #fff;
    }
    .top-main {
      position: relative;
      z-index: 9;
      background-color: #fff;
      display: flex;
      padding: 0.25rem 0.3rem 0;
      border-bottom: 1px solid #F0F0F0;
      font-family: 'PingFangSC-Regular';
      font-size: 0.24rem;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      .top_sx_single{
        margin-right: 0.82rem;
        color: #333333;
        box-sizing: border-box;
        padding-bottom: 0.22rem;
        border-bottom: 0.04rem solid transparent;
      }
      .top_sx_single_select{
        border-color: #D53D3D;
        color: #D53D3D;
      }
    }

    .slider-wrapper {
      margin: 0.3rem auto .2rem auto;
      height: 2.8rem;
      width: 91%;
      border-radius: .08rem;
    }
    .slider, .home-slider {
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .main {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 2.25rem;
      padding-bottom: 0.6rem;
      overflow: scroll;
      z-index: 8;
      background-color: #fff;
      .content {
        width: 92%;
        margin: .2rem auto 0;
        height: 1.9rem;
        background: #fff;
        .cont {
          width: 100%;
          padding: .4rem .2rem;
          margin-bottom: 0.2rem;
          display: flex;
          position: relative;
          box-shadow: 0.1rem 0.08rem 0.18rem 0.1rem rgba(200,193,193,0.3);
          .preson {
            margin-right: .2rem;
            .pic {
              width: .76rem;
              height: .76rem;
              border-radius: 50%;
              background-repeat: no-repeat;
              background-position: center;
              background-size: 100% 100%;
              position: relative;
              .pic-p {
                height: 100%;
                width: 100%;
                border-radius: 50%;
                background-position: center;
                background-size: cover;
              }
              .color {
                display: inline-block;
                width: .2rem;
                height: .2rem;
                border-radius: 50%;
                position: absolute;
                right: 0;
                bottom: 0;
              }

              .green {
                background: #74c758;
              }

              .yellow {
                background: #fcd705;
              }

              .gray {
                background: #ccc;
              }
            }
            .name {
              display: block;
              height: .3rem;
              border-radius: .04rem;
              border: .01rem solid #d53d3d;
              font-size: 0.16rem;
              color: #d53d3d;
              margin-top: .1rem;
              text-align: center;
              line-height: .26rem;
            }
            .wname {
              color: #777;
              border-color: #777;
            }
          }

          .text {
            .title {
              font: bold .3rem/.28rem PingFangSC-Medium;
              color: #333;
              margin-bottom: .2rem;
              .ico {
                display: inline-block;
                text-align: center;
                width: .76rem;
                height: .3rem;
                background: #74c758;
                border-radius: .03rem;
                margin-left: .12rem;
                font: .2rem/.28rem PingFangSC-Medium;
                color: #fff;
              }
            }

            .disc, .limit {
              font-size: .24rem;
              color: #999;
              line-height: .24rem;
              margin-bottom: .18rem;
            }

          }

          .number {
            font-size: .28rem;
            position: absolute;
            right: .2rem;
            text-align: right;
            .num {
              color: #0ec55b;
              margin-bottom: .32rem;
            }
            .shop {
              display: inline-block;
              width: 1.1rem;
              height: .5rem;
              line-height: .5rem;
              text-align: center;
              border-radius: .06rem;
              border: .01rem solid #d53d3d;
              color: #d53d3d;
            }
          }
        }
      }

    }
  }
  .release {
    width: 1.66rem;
    height: 1.66rem;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    background-image: url('./fb_bg.png');
    position: fixed;
    right: 0.5rem;
    bottom: 1rem;
    opacity: 0.8;
    text-align: center;
    z-index: 12;

    .icon{
      display: inline-block;
      width: 100%;
      height: 0.54rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 0.54rem;
      background-image: url('./fb_icon.png');
      position: absolute;
      top: 0.2rem;
      left: -0.06rem;
    }
    .txt{
      width: 100%;
      font-size: 0.30rem;
      color: #fff;
      position: absolute;
      top: 0.9rem;
      left: 0;
    }

  }

  .release2 {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0.64;
    z-index: 90;

    .main {
      width: 100%;
      position: absolute;
      bottom: 2.26rem;
      font-size: .3rem;
      color: #333;
      padding: 0 0.4rem;
      display: flex;
      justify-content: space-between;

      span {
        display: inline-block;
        width: 1.35rem;
        height: 1.35rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        margin-bottom: .3rem;
      }

      .buy {
        width: 50%;
        text-align: center;
        span {
          background-image: url('./fbbuy.png');
        }
      }

      .sell {
        width: 50%;
        text-align: center;
        span {
          background-image: url('./fbsell.png');
        }
      }

    }

    .close {
      width: .36rem;
      height: .36rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      background-image: url('./cha.png');
      position: absolute;
      bottom: .6rem;
      left: 50%;
      transform: translateX(-50%);
    }

  }
  .otc_sx_box{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: row-reverse;
    .sx_content{
      position: relative;
      width: 5.7rem;
      height: 100%;
      background-color: #fff;
      padding: 0.76rem 0.61rem 0 0.29rem;
      .otc_sx_box_single{
        margin-bottom: 0.65rem;
        .sx_box_h5{
          font-size: 0.28rem;
          color: #333333;
          margin-bottom: 0.29rem;
        }
        .sx_box_ul{
          display: flex;
          align-items: center;
          font-family: 'MicrosoftYaHei';
          font-size: 0.24rem;
          .sx_box__single{
            padding: 0.14rem 0.18rem;
            min-width: 1.3rem;
            margin-right: 0.3rem;
            background-color: #EFEFEF;
            color: #333333;
            border-radius: 0.04rem;
            text-align: center;
            border: 1px solid transparent;
            &:last-child{
              margin-right: 0;
            }
          }
          .sx_box__single_select{
            border: 1px solid #D53D3D;
            color: #D53D3D;
            background-color: #fff;
          }
        }
      }
      .otc_sx_foo{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0.98rem;
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        p{
          flex: 1;
          height: 0.98rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.32rem;
        }
        .otc_sx_foo_reset{
          background-color: #EFEFEF;
          color: #333;
        }
        .otc_sx_foo_qd{
          background-color: #D53D3D;
          color: #fff;
        }
      }
    }
  }
  .otc_personal{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: row-reverse;
    .personal_box{
      position: relative;
      width: 5.7rem;
      height: 100%;
      background-color: #fff;
      padding: 1.17rem 0.3rem 0;
      .personal_box_head{
        display: flex;
        align-items: center;
        margin-bottom: 0.41rem;
        .personal___head_left{
          width: 1rem;
          height: 1rem;
          margin-right: 0.16rem;
        }
        .personal___head_right{
          .p_head_r_name{
            font-size: 0.28rem;
            color: #333;
            margin-bottom: 0.26rem;
          }
          .p_head_r_info{
            color: #999999;
            font-size: 0.22rem;
          }
        }
      }
      .personal_box_con{
        .p_box_con_single{
          height: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 0.02rem solid #F5F5F5;
          .p_single_left{
             display: flex;
            align-items: center;
            .p_s_l_icon{
              margin-right: 0.16rem;
              background-size: 100% 100%;
            }
            .p_s_l_icon01{
              width: 0.36rem;
              height: 0.33rem;
              background-image: url("./wdgg.png");
            }
            .p_s_l_icon02{
              width: 0.34rem;
              height: 0.36rem;
              background-image: url("./wddd.png");
            }
            .p_s_l_icon03{
              width: 0.32rem;
              height: 0.36rem;
              background-image: url("./jyds.png");
            }
            .p_s_l_txt{
              font-size: 0.28rem;
              color: #333333;
            }
          }
          .p_single_right{
            display: flex;
            align-items: center;
            font-size: 0.2rem;
            color: #EC3F3F;
            .p_s_r_txt{
              margin-right: 0.1rem;
            }
            .p_s_r_icon{
              width: 0.12rem;
              height: 0.2rem;
              background-size: 100% 100%;
              background-image: url("./to_right.png");
            }
          }
        }
      }
    }
  }
  .filter {
    -webkit-filter: blur(.45rem);
    -moz-filter: blur(.45rem);
    -o-filter: blur(.45rem);
    -ms-filter: blur(.45rem);
    filter: blur(.45rem);
  }


</style>
