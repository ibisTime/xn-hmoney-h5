<template>
  <div class="order-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>我的广告</span>
        </p>
    </header>
    <div class='tabs'>
        <p @click="change1">
            <span :class="[show1? 'select' : '']">待发布</span>
        </p>
        <p @click="change2">
            <span :class="[!show1? 'select' : '']">已发布</span>
        </p>
    </div>
    <!-- 待发布 -->
    <div class='adver'>
        <Scroll 
          ref="scroll"
          :data="myWillAdverList"
          :hasMore="hasMore"
          @pullingUp="getAdverData"
        >
            <div class='list-wrap' v-for="(adverItem, index) in myWillAdverList" :key="index">
                <div class='list1'>
                    <div class='pic'>
                        <i class='icon'></i>
                    </div>
                    <div class='text1'>
                        <p class='txt1'><span class='name'>{{adverItem.user.nickname}}</span><span class='green'>{{payTypeList[adverItem.payType]}}</span></p>
                        <p class='txt2'>交易{{adverItem.userStatistics.jiaoYiCount}} • 好评{{adverItem.userStatistics.beiPingJiaCount != 0 ?(adverItem.userStatistics.beiHaoPingCount / adverItem.userStatistics.beiPingJiaCount) * 100 : '0'}}% • 信任{{adverItem.userStatistics.beiXinRenCount}}</p>
                        <p class='txt3'>限额：{{adverItem.minTrade}}-{{adverItem.maxTrade}} {{adverItem.tradeCurrency}}</p>
                    </div>
                    <div class='text2'>
                        <p class='txt1'>{{adverItem.truePrice.toFixed(2)}} {{adverItem.tradeCurrency}}</p>
                        <span class='txt2' :class="[show1? 'select' : '']" @click="fbAdverFn(adverItem)">发布</span>
                    </div>
                </div>
                <div class='list2'>
                    <div class='text1'>
                        <p @click.stop="toclAdver(adverItem.user.userId, adverItem.payType, adverItem.code)"><i class='icon'></i><span>编辑</span></p>
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
        <show-msg :text="textMsg" ref="showmsg" />
    </div>
  </div>
</template>
<script>
import { getUserAdver, addAdvertising, downAdvertise } from "api/otc";
import {getUserId} from 'common/js/util';
import ShowMsg from 'base/showMsg/showMsg';
import Scroll from 'base/scroll/scroll';
export default {
  data() {
    return {
      start: 1,
      limit: 5,
      hasMore: true,
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
  },
  methods: {
    change1() {
      this.show1 = true;
      this.config.statusList = [0];
      this.getAdverData();
    },
    change2() {
      this.show1 = false;
      this.config.statusList = [1];
      this.getAdverData();
    },
    // 获取广告数据
    getAdverData(){
        this.config.limit = this.limit;
        this.config.start = this.start;
        getUserAdver(this.config).then(data => {
            if (data.totalPage <= this.start) {
                this.hasMore = false;
                this.myWillAdverList = data.list;
            }else{
                this.myWillAdverList = [...this.myWillAdverList, ...data.list];
                this.start++;
            }
        })
    },
    // 发布
    fbAdverFn(item){
        this.fbConfig.minTrade  = item.minTrade;
        this.fbConfig.maxTrade  = item.maxTrade;
        this.fbConfig.totalCount  = item.totalCount;
        this.fbConfig.payType  = item.payType;
        this.fbConfig.onlyCert  = item.onlyCert;
        this.fbConfig.onlyTrust  = item.onlyTrust;
        this.fbConfig.tradeCoin  = item.tradeCoin;
        this.fbConfig.tradeCurrency  = item.tradeCurrency;
        this.fbConfig.tradeType  = item.tradeType;
        this.fbConfig.payLimit  = item.payLimit;
        this.fbConfig.leaveMessage  = item.leaveMessage;
        this.fbConfig.publishType  = '1';
        this.fbConfig.protectPrice  = item.protectPrice;
        this.fbConfig.truePrice  = item.truePrice;
        this.fbConfig.premiumRate  = item.premiumRate;
        addAdvertising(this.fbConfig).then(data => {
            console.log('fb', data);
        });
    },
    // 编辑
    toclAdver(userId, type, code){
      this.$router.push({
            path:'/buy-publish',
            query: {
                userId,
                code,
                type
            }
        })
    },
    // 下架广告
    downAdverFn(adsCode){alert(adsCode)
        downAdvertise(adsCode).then(data => {
            console.log('下架：', data);
            this.$refs.showmsg.show();
        })
    }
  },
  components: {
      ShowMsg,
      Scroll
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
      @include bg-image("返回");
      float: left;
      margin-top: 0.31rem;
    }
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
        .icon {
          width: 100%;
          height: 100%;
          @include bg-image("头像(4)");
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
            @include bg-image("编辑");
        }
        .text2 .icon {
            @include bg-image("矩形51");
        }
    }
  }
}
</style>
