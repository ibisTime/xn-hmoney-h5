<template>
<div>
  <div :class = "[Show ? 'filter otc-wrapper': 'otc-wrapper' ]" @click.stop>
      <div class='header'>
        <select name="bbName" v-model="config.coin" @change="getAdverFn">
          <option :value="item" v-for="(item, index) in bbList" :key="index">{{item}}<span :class="{sicon: index == 0}"></span></option>
        </select>
        <p class="buySell">
        <span :class="[flag1 ? 'buy select' : 'buy']" @click.stop='buy'>买币</span>
        <span :class="[flag2 ? 'sell select' : 'sell']" @click.stop='sell'>卖币</span>
        </p>
        <router-link to='trading' class='trading'>币币交易</router-link>
      </div>
      <div class="top">
        <div class='top-main'>
            <p>
              <select name="hbName" @change="selHbName" ref="select_hb">
                <option value="">请选择</option>
                <option value="CNY">CNY</option>
                <option value="USD">USD</option>
              </select>
              <span></span>
            </p>
            <p>
              <select name="bbPayType" @change="selPayType" ref="select_pay">
                <option value="">请选择</option>
                <option value="0">支付宝</option>
                <option value="1">微信</option>
                <option value="2">银行卡转账</option>
              </select>
              <span></span>
            </p>
        </div>
      </div>
      <div class="slider-wrapper">
        <slider v-if="banners.length">
          <div class="home-slider" v-for="item in banners" :key="item.code" :style="getImgSyl(item.pic)">
          </div>
        </slider>
      </div>
      <!-- 买币 -->
      <div class='main'>
        <Scroll 
          ref="scroll"
          :data="bbDataList"
          :hasMore="hasMore"
          v-show="bbDataList.length"
          @pullingUp="getBBListData"
        >
          <div class='content' v-for="(adverItem, index) in bbDataList" :key="index">
            <div class='cont'>
              <div class='preson'>
                <div class='pic' @click="toHomePage(adverItem.userId, adverItem.tradeCoin)">
                  <p class="pic-p" :style="getAvatar(adverItem.user.photo)" alt=""></p>
                  <span class='green color'></span>
                </div>
                <span class='name' :class="{'wname': !adverItem.user.idNo}">{{adverItem.user.idNo ? '已实名' : '未实名'}}</span>
              </div>
              <div class='text'>
                <p class='title'>{{adverItem.user.nickname}}<span class='ico'>{{bizTypeList[adverItem.payType]}}</span></p>
                <p class='disc'>交易{{adverItem.userStatistics.jiaoYiCount}}•好评{{getPercentum(adverItem.userStatistics.beiHaoPingCount, adverItem.userStatistics.beiPingJiaCount)}}•信任{{adverItem.userStatistics.beiXinRenCount}}</p>
                <p class='limit'>限额：{{adverItem.minTrade}}-{{adverItem.maxTrade}} {{adverItem.tradeCurrency}}</p>
              </div>
              <div class='number'>
                <p class='num'>{{adverItem.truePrice.toFixed(2)}} {{adverItem.tradeCurrency}}</p>
                <p class='shop' @click="toclAdver(adverItem.user.userId, adverItem.tradeType, adverItem.code)">{{adverItem.user.userId == userId ? '编辑' : adverItem.tradeType == 0 ? '出售' : '购买'}}</p>
              </div>
            </div>
          </div>
        </Scroll>
        <div class="no-data" :class="{'hidden': bbDataList.length > 0}">
          <img src="./wu.png" />
          <p>暂无广告</p>
        </div>
      </div>
      <Toast :text="textMsg" ref="toast" />
      <div   
        class='release'
        ref="touchDemo"
        @click='relShow'
        @touchstart.stop="fbTouchStartFn"
        @touchmove.stop="fbTouchMoveFn"
        @touchend.stop="fbTouchEndFn"
      >
      </div>

      <Footer></Footer>
  </div>
  <div v-show="Show" class='release2'>
    <div class='main'>
      <div class='buy' @click.stop='goBuyPublish'>
        <span></span>
        发布购买
      </div>
      <div class='sell' @click.stop='goSellPublish'>
        <span></span>
        发布卖出
      </div>
    </div>
    <div @click='relClose' class='close'></div>
</div>
<FullLoading ref="fullLoading" v-show="isLoading"/>
</div>
</template>
<script>
import Footer from 'components/footer/footer';
import {formatImg, getUserId, getAvatar, setTitle, getPercentum} from 'common/js/util';
import {getUser} from 'api/user';
import {getBannerList} from 'api/general';
import {getAdvertisingData} from 'api/otc';
import Slider from 'base/slider/slider';
import Scroll from 'base/scroll/scroll';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';
export default {
  data() {
    return {
      PHOTO_SUFFIX: '?imageMogr2/auto-orient/thumbnail/!150x150r',
      userId: getUserId(),
      isLoading: true,
      bbList: [],
      config: {
        coin:'',
        tradeType: '1'
      },
      bizTypeList: {
        "0": "支付宝",
        "1": "微信",
        "2": "银行卡转账"
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
      docuHeight: ''
    };
  },
  created() {
    setTitle('场外交易');
    getBannerList().then((data) => {
      this.banners = data;
    });
  },
  updated() {
  },
  mounted() {
    let coinList = JSON.parse(sessionStorage.getItem('coinData'));
    this.bbList = Object.keys(coinList);
    this.config.tradeType = sessionStorage.getItem('tradeType') || '1';
    if(this.config.tradeType === '0'){
      this.flag1 = false;
      this.flag2 = true;
    }
    let coin = sessionStorage.getItem('coin') || 'ETH';
    this.config.coin = coin != 'undefined' ? coin : 'ETH';
    this.getBBListData();
  },
  computed: {
  },
  methods: {
    // 计算百分比
    getPercentum(num1, num2){
        return getPercentum(num1, num2);
    },
    // 请求列表数据
    getBBListData(){
      let that = this;
      this.config.limit = this.limit;
      if(this.type == 's'){
        this.config.start = this.start1;
        getAdvertisingData(this.config).then(data => {
          clData(data, that, this.start1, 's');
        }, () => {
          this.isLoading = false;
        });
      }else{
        this.config.start = this.start2;
        getAdvertisingData(this.config).then(data => {
          clData(data, that, this.start2, 'e');
        }, () => {
          this.isLoading = false;
        });
      }

      function clData(data, that, start, type){
        that.isLoading = false;
        that.hasMore = true;
        if(data.totalPage < start){
          that.bbDataList = [];
        }
        if (data.totalPage <= start) {
          that.hasMore = false;
        }
        that.bbDataList = [...that.bbDataList, ...data.list];
        if(type == 's'){
          that.start1 ++;
        }else{
          that.start2 ++;
        }
      }

    },
    // 根据条件查询数据
    selHbName(){
      this.config.tradeCurrency = this.$refs.select_hb.value;
      this.start1 = 1;
      this.start2 = 1;
      this.bbDataList = [];
      this.getBBListData();
    },
    selPayType(){
      this.start1 = 1;
      this.start2 = 1;
      this.bbDataList = [];
      this.config.payType = this.$refs.select_pay.value;
      this.getBBListData();
    },
    //根据币种请求数据
    getAdverFn(){
      sessionStorage.setItem('coin', this.config.coin);
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
        backgroundImage: `url(${formatImg(imgs)})`
      };
    },
    advertisingFn(type){
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
      getUser().then(data => {
        if(data.tradepwdFlag){
          this.Show = true;
        }else if(!data.tradepwdFlag){
          this.textMsg = '请设置资金密码';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.push('/security-tradePassword');
          }, 1500);
        }
      });
    },
    relClose() {
      this.Show = false;
    },
    goBuyPublish() {
      this.$router.push('buy-publish?type=0');
    },
    goSellPublish() {
      this.$router.push('buy-publish?type=1');
    }, 
    getPic(pic, suffix) {
      if (!pic) {
          return "";
      }
      pic = pic.split(/\|\|/)[0];
      if (!/^http|^data:image/i.test(pic)) {
          suffix = suffix || "?imageMogr2/auto-orient/interlace/1"
          pic = PIC_PREFIX + pic + suffix;
      }
      return {backgroundImage: `url(${pic})`};
    },
    getAvatar(pic, suffix) {
      var defaultAvatar = '';
      var suffix = suffix || this.PHOTO_SUFFIX;
      if (!pic) {
          pic = defaultAvatar;
      }
      return this.getPic(pic, suffix);
    },
    // 编辑、购买或出售
    toclAdver(userId, type, code){
      if(userId === this.userId){
        this.$router.push({
          path:'/buy-publish',
          query: {
            userId,
            code,
            type
          }
        })
      }else{
        this.$router.push({path: '/otc-buy', query: {
          userId,
          adsCode: code,
          type
        }});
      }
    },
    // 个人主页
    toHomePage(userId, tradeCoin){
      this.$router.push(`/homepage?userId=${userId}&currency=${tradeCoin}`);
    },
    // 实现 发布 拖动
    fbTouchStartFn(){
      this.touchDemo = this.$refs.touchDemo;
      this.flags = true;
      let touch = '';
      if(event.touchs){
        touch = event.touchs[0];
      }else{
        touch = event.changedTouches[0];
      }
      
      this.docuWidth = document.body.clientWidth - 50;
      this.docuHeight = document.body.clientHeight - 150;
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.demoX = this.touchDemo.offsetLeft;
      this.demoY = this.touchDemo.offsetTop;
    },
    fbTouchMoveFn(){
      event.preventDefault();
      if(this.flags){
        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event.changedTouches[0];
        }
        this.moveX = touch.clientX - this.position.x;
        this.moveY = touch.clientY - this.position.y;
        this.xPum = this.demoX + this.moveX;
        this.yPum = this.demoY + this.moveY;

        // 判断边界
        if(this.xPum > this.docuWidth){
          this.xPum = this.docuWidth;
        }
        if(this.xPum < 0){
          this.xPum = 0;
        }
        if(this.yPum > this.docuHeight){
          this.yPum = this.docuHeight;
        }
        if(this.yPum < 0){
          this.yPum = 0;
        }

        this.touchDemo.style.left = this.xPum / 50 + 'rem';
        this.touchDemo.style.top = this.yPum / 50 + 'rem';
      }
    },
    fbTouchEndFn(){
      this.flags = false;
    }
  },
  components: {
    Footer,
    Slider,
    Scroll,
    Toast,
    FullLoading
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
  background: #fafafa;
  overflow-x: hidden;
  z-index: 10;

  .header {
    width: 100%;
    padding: 0 .3rem;
    height: .98rem;
    line-height: .98rem;
    display: flex;
    justify-content: space-between;

    select {
      font-weight: bold;
      
      .sicon {
        display: inline-block;
        width: .23rem;
        height: .16rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        background-image: url('./xlabai.png');

      }
    }

    .buySell {
      font-size: .34rem;
      font-weight: bold;

      .select {
        color: #d53d3d;
        border-bottom: .04rem solid #d53d3d;
      }

      .buy {
        padding-bottom: .15rem;
        margin-right: 1.1rem;
        font-weight: bold;
      }
      .sell {
        font-weight: bold;
        padding-bottom: .15rem;
      }
    }

    a {
      font-size: .32rem;
      font-weight: bold;
      color: #333;
    }
    
  }

  .top {
    width: 100%;
    padding:0;
    height: .64rem;
    background: #fafafa;

    .top-main {
      width: 100%;
      padding: 0 .3rem;
      display: flex;
      font: .26rem/.64rem PingFangSC-Medium;
      p{
        margin-right: .8rem;
        select{
          width: 1.5rem;
          padding: 0.05rem 0.1rem;
        }
      }
      .act {
        color: #d53d3d;
        span {
          background-image: url('./sla.png');
        }
      }

      span {
        display: inline-block;
        width: .15rem;
        height: .1rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        background-image: url('./xla.png');
        vertical-align: middle;
        margin-left: .14rem;
      }

    }
  }

  .select3 {
    position: fixed;
    top: 1.62rem;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0,0,0,.4);
    .main {
      line-height: .9rem;
      font-size: .28rem;
      color: #666;
      width: 100%;
      padding: 0 .3rem;
      background: #fff;
      p {
        border-bottom: .01rem solid #e5e5e5;
      }
      p:active {
        color: #d53d3d;
      }
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
    height: 7rem;
    padding-bottom: 0.2rem;
    overflow: scroll;
    .content {
      width: 92%;
      margin: 0 auto;
      height: 1.9rem;
      background: #fff;
      margin-top: .2rem;

      .cont {
        width: 100%;
        padding: .4rem .2rem;
        display: flex;
        position: relative;
        .preson {
          margin-right: .2rem;
          .pic {
            width: .76rem;
            height: .76rem;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            background-image: url('./tou.png');
            position: relative;
            .pic-p{
              height: 100%;
              width: 100%;
              border-radius: 50%;
              background-size: 100% 100%;
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
            display:block;
            width: .76rem;
            height: .3rem;
            border-radius: .04rem;
            border: .01rem solid #d53d3d;
            font: .18rem/.24rem PingFangSC-Medium;
            color:#d53d3d;
            margin-top: .1rem;
            text-align: center;
            line-height: .2rem;
          }
          .wname{
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
  .release {
    width: 1.06rem;
    height:1.06rem;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    background-image: url('./fb.png');
    position: fixed;
    left: 6.3rem;
    top: 7.52rem;
    opacity: 0.8;

  }
}

.release2 {
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  opacity: 0.64;
  z-index: 1000;

  .main {
    width: 100%;
    position: absolute;
    bottom: 2.26rem;
    font-size: .3rem;
    color:#333;
    padding: 0 1.42rem;
    display: flex;
    justify-content: space-between;

    span {
      display: block;
      width: 1.35rem;
      height:1.35rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      margin-bottom: .3rem;
    }

    .buy {
        text-align: center;
        span {
          background-image: url('./fbbuy.png');
      }
    }

    .sell {
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
    @include bg-image("叉");
    position: absolute;
    bottom: .6rem;
    left: 50%;
    transform: translateX(-50%);
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
