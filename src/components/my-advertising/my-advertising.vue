<template>
  <div class="order-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon'></i>
        <span class='title'>我的广告</span>
        </p>
    </header> -->
    <div class='tabs'>
        <p @click="change1">
            <span :class="[show1? 'select' : '']">待发布</span>
        </p>
        <p @click="change2">
            <span :class="[!show1? 'select' : '']">已发布</span>
        </p>
    </div>
    <div class='adver'>
        <Scroll 
          ref="scroll"
          :data="myWillAdverList"
          :hasMore="hasMore"
          v-show="myWillAdverList.length > 0"
          @pullingUp="getAdverData"
        >
            <div class='list-wrap' v-for="(adverItem, index) in myWillAdverList" :key="index">
                <div class='list1'>
                    <div class='pic' @click="toHomePage(adverItem.userId, adverItem.tradeCoin)">
                        <p :style="getUserPic(adverItem.user.photo)" :class="{'hidden': !adverItem.user.photo}" alt=""></p>
                        <img :class="{'hidden': adverItem.user.photo}" src="./txiang.png"/>
                    </div>
                    <div class='text1'>
                        <p class='txt1'><span class='name'>{{adverItem.user.nickname}}</span><span class='green'>{{payTypeList[adverItem.payType]}}</span></p>
                        <p class='txt2'>交易{{adverItem.userStatistics.jiaoYiCount}} • 好评{{adverItem.userStatistics.beiPingJiaCount != 0 ? getPercentum(adverItem.userStatistics.beiHaoPingCount, adverItem.userStatistics.beiPingJiaCount) : '0'}} • 信任{{adverItem.userStatistics.beiXinRenCount}}</p>
                        <p class='txt3'>限额：{{adverItem.minTrade}}-{{adverItem.maxTrade}} {{adverItem.tradeCurrency}}</p>
                    </div>
                    <div class='text2'>
                        <p class='txt1'>{{adverItem.truePrice.toFixed(2)}} {{adverItem.tradeCurrency}}</p>
                        <span class='txt2' :class="[show1? 'select' : '']" @click="fbAdverFn(adverItem)">发布</span>
                    </div>
                </div>
                <div class='list2'>
                    <div class='text1'>
                        <p @click.stop="toclAdver(adverItem.user.userId, adverItem.tradeType, adverItem.code)"><i class='icon'></i><span>编辑</span></p>
                    </div>
                    <span :class="{'hidden': show1}">|</span>
                    <div class='text2'>
                        <p :class="{'hidden': show1}" @click="downAdverFn(adverItem.code)"><i class='icon'></i><span>下架</span></p>
                    </div>
                </div>
            </div>
        </Scroll>
        <div class="no-data" :class="{'hidden': myWillAdverList.length > 0}">
          <img src="./wu.png" />
          <p>暂无广告</p>
        </div>
        <Toast :text="textMsg" ref="toast" />
        <FullLoading ref="fullLoading" v-show="isLoading"/> 
    </div>
  </div>
</template>
<script>
import { getUserAdver, addAdvertising, downAdvertise, ExitAdvertising } from "api/otc";
import {getUserId, formatAmount, setTitle, getAvatar, getPercentum} from 'common/js/util';
import Toast from 'base/toast/toast';
import Scroll from 'base/scroll/scroll';
import FullLoading from 'base/full-loading/full-loading';
export default {
  data() {
    return {
      start1: 1,
      start2: 1,
      limit: 5,
      type: 's',
      hasMore: true,
      isLoading: true,
      textMsg: '操作成功',
      show1: true,
      myWillAdverList: [],
      myAdverList: [],
      payTypeList: {
          '0': '支付宝',
          '1': '微信',
          '2': '银行卡转账'
      },
      config: {
          limit: 5,
          start: 1,
          statusList: [0],
          userId: getUserId()
      },
      fbConfig: {
        minTrade: '',     //最小
        maxTrade: '',     // 最大
        totalCount: '',   // 交易总量
        payType: '0',      // 支付方式
        onlyCert: '1',     // 实名认证1是0否
        onlyTrust: '0',    //0=任何人都可以交易、1=只有受信任的人可以交易
        tradeCoin: 'BTC', //币种类型
        tradeCurrency: 'CNY', // 货币类型
        tradeType: '0',      //0=买币，1=卖币
        payLimit: '',        // 超过时间
        leaveMessage: '',    // 广告留言
        publishType: '0',    // "0", "存草稿" "1", "直接发布"	
        protectPrice: '',
        truePrice: '0',
        premiumRate: '0',   // 溢价率
        userId: getUserId()
      }
    };
  },
  created() {
    this.getAdverData();
    setTitle('我的广告');
  },
  methods: {
    getPercentum(num1, num2){
        return getPercentum(num1, num2);
    },
    // 获取头像
    getUserPic(pic){
        return getAvatar(pic);
    },
    bbFormatAmount(amount, len, coin){
        return formatAmount(amount, len, coin);
    },
    change1() {
      this.show1 = true;
      this.start1 = 1;
      this.isLoading = true;
      this.type = 's';
      this.myWillAdverList = [];
      this.config.statusList = [0];
      this.getAdverData();
    },
    change2() {
      this.show1 = false;
      this.isLoading = true;
      this.start2 = 1;
      this.type = 'e';
      this.myWillAdverList = [];
      this.config.statusList = [1];
      this.getAdverData();
    },
    // 获取广告数据
    getAdverData(){
        let that = this;
        this.config.limit = this.limit;
        if(this.type == 's'){
            this.config.start = this.start1;
            getUserAdver(this.config).then(data => {
                clData(data, that, this.start1, 's');
                that.isLoading = false;
            }, () => {
                that.isLoading = false;
            });
        }else{
            this.config.start = this.start2;
            getUserAdver(this.config).then(data => {
                clData(data, that, this.start2, 'e');
                that.isLoading = false;
            }, () => {
                that.isLoading = false;
            });
        }

        function clData(data, that, start, type){
            that.hasMore = true;
            if(data.totalPage < start){
                that.myWillAdverList = [];
            }
            if (data.totalPage <= start) {
                that.hasMore = false;
            }
            that.myWillAdverList = [...that.myWillAdverList, ...data.list];
            if(type == 's'){
                that.start1 ++;
            }else{
                that.start2 ++;
            }
        }
    },
    // 发布
    fbAdverFn(item){
        if(!this.show1){
            return false;
        }
        this.fbConfig.adsCode = item.code;
        this.fbConfig.minTrade  = item.minTrade;
        this.fbConfig.maxTrade  = item.maxTrade;
        this.fbConfig.totalCount  = item.totalCountString;
        this.fbConfig.payType  = item.payType;
        this.fbConfig.onlyCert  = '1';
        this.fbConfig.onlyTrust  = item.onlyTrust;
        this.fbConfig.tradeCoin  = item.tradeCoin;
        this.fbConfig.tradeCurrency  = item.tradeCurrency;
        this.fbConfig.tradeType  = item.tradeType;
        this.fbConfig.payLimit  = item.payLimit;
        this.fbConfig.leaveMessage  = item.leaveMessage;
        this.fbConfig.publishType  = '2';
        this.fbConfig.protectPrice  = item.protectPrice;
        this.fbConfig.truePrice  = item.truePrice;
        this.fbConfig.premiumRate  = item.premiumRate;
        ExitAdvertising(this.fbConfig).then(data => {
            this.$refs.toast.show();
            this.getAdverData();
            setTimeout(() => {
                this.$refs.toast.hide();
            }, 1500);
        });
    },
    // 编辑
    toclAdver(userId, type, code){
      if(this.show1){
        this.$router.push({
            path:'/buy-publish',
            query: {
                userId,
                code,
                type,
                isCg: 'ok'
            }
        })
      }else{
        this.$router.push({
            path:'/buy-publish',
            query: {
                userId,
                code,
                type
            }
        })
      }
    },
    // 下架广告
    downAdverFn(adsCode){
        this.start2 = 1;
        this.myWillAdverList = [];
        downAdvertise(adsCode).then(data => {
            this.$refs.toast.show();
            this.getAdverData();
            setTimeout(() => {
                this.$refs.toast.hide();
            }, 1500);
        })
    },
    // 个人主页
    toHomePage(userId, tradeCoin){
      this.$router.push(`/homepage?userId=${userId}&currency=${tradeCoin}`);
    }
  },
  components: {
      Toast,
      Scroll,
      FullLoading
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.order-wrapper {
  font-size: 0.28rem;
  color: #333;
  overflow: auto;

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
    background: #fff;
    width: 100%;
    font-weight: bold;
    padding: 0 0.3rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      background-image: url('./fhui.png');
      float: left;
      margin-top: 0.31rem;
    }
  }
  .adver{
      height: 12rem;
      overflow: scroll;
  }

  .tabs {
    width: 100%;
    display: flex;
    line-height: 0.9rem;
    text-align: center;
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    margin-bottom: 0.18rem;

    p {
      flex: 1;
      font-size: 0.32rem;
      color: #666;
      span {
        padding-bottom: 0.25rem;
      }
      .select {
        border-bottom: 0.04rem solid #d53d3d;
        color: #d53d3d;
      }
    }
  }

  .list-wrap {
    display: block;
    color: #333;
    width: 92%;
    height: 2.6rem;
    margin: 0 auto;
    background: #fff;
    border-radius: 0.1rem;
    margin-bottom: .18rem;
    .list1 {
      padding: 0.4rem 0.18rem 0.36rem 0.14rem;
      display: flex;
      position: relative;
      border-bottom: .01rem solid #ececec;
      .pic {
        width: 0.76rem;
        height: 0.76rem;
        margin-right: 0.2rem;
        p{
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
            border-radius: 100%;
        }
        img{
            width: 100%;
            height: 100%;
        }
      }
      .text1 {
          color: #333;
        .txt1 {
          margin-bottom: 0.2rem;
          span {
            display: inline-block;
          }
          .name {
            font-size: 0.3rem;
            font-weight: bold;
          }
          .green {
            width: .74rem;
            font-size: 0.2rem;
            color: #fff;
            margin-left: 0.12rem;
            text-align: center;
            background: #0ec55b;
            border-radius: 0.03rem;
            line-height: .28rem;
          }
        }
        .txt2, .txt3 {
            font-size: .24rem;
            color: #999;
        }
        .txt2 {
            margin-bottom: .18rem;
        }
      }
      .text2 {
          right: .18rem;
          position: absolute;
          font-size: .28rem;
          font-weight: bold;
          text-align: right;
          .txt1 {
            margin-bottom: .32rem;
          }
          .txt2 {
              display: inline-block;
              text-align: center;
              line-height: .5rem;
              font-size: .28rem;
              color: #999;
              width: 1.1rem;
              height: .5rem;
              border: .01rem solid #999;
              border-radius: .06rem;
          }
          .select {
              color: #d53d3d;
              border-color: #d53d3d;
          }
      }
    }
    .list2 {
        display: flex;
        line-height: .6rem;
        color: #eaeaea;
        p {
            font-size: .24rem;
            color: #333;
        }
        .text1, .text2 {
            flex: 1;
            text-align: center;
            line-height: .6rem;
            .icon {
                width: .24rem;
                height: .24rem;
                vertical-align: baseline;
                margin-right: .06rem;
            }
        }
        .text1 .icon {
            background-image: url('./bj.png');
        }
        .text2 .icon {
            background-image: url('./jx.png');
        }
    }
  }
}
</style>
