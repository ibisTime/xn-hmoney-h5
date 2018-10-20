<template>
  <div class="publish-wrapper" @click.stop>
    <div class='publish-list'>
        <p>
          <span class='txt1'>交易币种<i></i></span>
          <select name="tradeCoin" v-model="config.tradeCoin" @change="changePrice">
            <option :value="item.symbol" v-for="(item, index) in bbList" :key="index">{{item.symbol}}</option>
          </select>
          <span class='icon'></span>
        </p>
        <p>
          <span class='txt1'>价格<i></i></span>
          <input type="text" readonly v-model="bbPrice">
          <span class='txt2'>CNY</span>
          <span class='ico' @click.stop="showMsg('jg')"></span>
        </p>
        <p>
          <span class='txt1'>溢价率<i></i></span>
          <input type="text" v-model="yj_price" placeholder="-50% - 50%" @keyup="changeYjlPrice">
          <span class='txt2'>%</span>
          <span class='ico' @click.stop="showMsg('jv')"></span>
        </p>
        <p>
          <span class='txt1'>{{type !== '购买' ? '最低价' : '最高价'}}<i></i></span>
          <input type="text" v-model="config.protectPrice" :placeholder="type !== '购买' ? '广告可交易的最低价' : '广告可交易的最高价'">
          <span class='txt2'>CNY</span>
          <span class='ico' @click.stop="showMsg('low')"></span>
        </p>
        <p>
          <span class='txt1'>最小价<i></i></span>
          <input type="text" v-model="config.minTrade" placeholder="单笔交易的最小额度">
          <span class='txt2'>CNY</span>
          <span class='ico' @click.stop="showMsg('min')"></span>
        </p>
        <p>
          <span class='txt1'>最大价<i></i></span>
          <input type="text" v-model="config.maxTrade" placeholder="单笔交易的最大额度">
          <span class='txt2'>CNY</span>
          <span class='ico' @click.stop="showMsg('max')"></span>
        </p>
        <p>
          <span class='txt1'>{{type}}总量<i class="wallet">余额：{{walletMon}}</i></span>
          <input type="text" v-model="count" placeholder="请输入售卖币的总量">
          <span class='txt2'>{{config.tradeCoin}}</span>
        </p>
        <p>
          <span class='txt1'>付款方式<i></i></span>
          <!-- <input readonly type="text" placeholder="请输入付款方式"> -->
          <select name="payType" v-model="config.payType">
            <option value="0">支付宝</option>
						<option value="1">微信</option>
						<option value="2">银行卡</option>
          </select>
          <span class='icon'></span>
          <span class='ico' @click.stop="showMsg('ty')"></span>
        </p>
        <p>
          <span class='txt1'>付款期限<i></i></span>
          <input type="text" placeholder="请输入付款期限" v-model="config.payLimit">
          <span class='txt2'>分钟</span>
          <span class='ico' @click.stop="showMsg('qx')"></span>
        </p>
    </div>
    <textarea class='message' placeholder="请写下您的广告留言吧" ref="leaveMessage">
        
    </textarea>
    <div class='select' @click="show = !show">
        <p class='text'>
            <span>高级设置</span>
            <span :class="[!show ? 'icon' : 'ico']" ></span>
        </p>
    </div>
    <div v-show='show' class='select-box'>
      <div class='select-time'>
          <p class='text1'>
            <span class='txt1'>开放时间</span>
            <span class='txt2'><i :class="[select ? 'icon icon1' : 'icon']" @click='isSelectFn("0")'></i>任何时候</span>
            <span class='txt3'><i :class="[!select ? 'icon icon1' : 'icon']" @click='isSelectFn("1")'></i>自定义</span>
            <i class='icon ico2' @click="showMsg('time')"></i>
          </p>
          <div class="select-time" v-show="!select">
            <p class='text2' v-for="(dayItem, index) in dayList" :key="index">
              <span class='txt1'>{{dayItem.week}}</span>
              <select name="dayStart" id="dayStart" class="str_time">
                <option :value="sItem" v-for="(sItem, sIndex) in startTimeList" :key="sIndex">{{sItem}}</option>
              </select>
              <span class='txt2'>-</span>
              <select name="dayEnd" id="dayEnd" class="end_time">
                <option :value="eItem" v-for="(eItem, eIndex) in endTimeList" :key="eIndex">{{eItem}}</option>
              </select>
            </p>
            <!-- <p class='text3'>
              <i class='icon'></i>
              <span>添加时间段</span>
            </p> -->
          </div>
      </div>
      <!-- <div class='select-time'>
          <p class='text1'>
            <span class='txt1'>是否实名</span>
            <span class='txt2'><i :class="[isReal ? 'icon icon1' : 'icon']" @click='isRealFn("0")'></i>启用</span>
            <span class='txt3'><i :class="[!isReal ? 'icon icon1' : 'icon']" @click='isRealFn("1")'></i>不启用</span>
            <i class='icon ico2'></i>
          </p>
      </div> -->
      <div class='select-last'>
        <p class='text1' @click="onlyFans">
          <span>仅粉丝 <i :class="[isFans ? 'icon ico1' : 'icon']" @click='onlyFans' style="margin-left: .1rem;"></i></span>
          <i class='icon ico2' @click.stop="showMsg('fs')" style="margin-top: .3rem;"></i>
        </p>
      </div>
    </div>
    <div class='footer'>
        <button @click="toOtcFn" :class="{'btn-w': isDetail}">直接发布</button>
        <button class='txt2' @click="saveOtcData" :class="{'hidden': isDetail}">保存草稿</button>
    </div>
    <showMsg :text="text" ref="showMsg"/>
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import Message from 'base/message/message';
import showMsg from 'base/showMsg/showMsg';
import {getUserId, getUrlParam, setTitle, formatMoneyMultiply, formatMoneySubtract} from 'common/js/util';
import {addAdvertising, getBbListData, getAdvertisePrice, getAdvertiseDetail, ExitAdvertising, getAdverMessage} from 'api/otc';
import { wallet } from 'api/person';
import FullLoading from 'base/full-loading/full-loading';

const message = new Message();

export default {
  data() {
    return {
      isLoading: true,
      text: '',
      count: '',
      walletMon: '', // 余额
      lowTxt: '广告最高可成交的价格',
      MsgList: {},
      type: '购买',
      adsCode: '',
      isCg: '',
      dayList: [
        {
          week: '星期一',
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: '星期二',
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: '星期三',
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: '星期四',
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: '星期五',
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: '星期六',
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: '星期天',
          dayStart: '00:00',
          dayEnd: '24:00'
        },
      ],
      startTimeList: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '08:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ],
      endTimeList: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '08:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ],
      displayTime: [],
      show: false,
      select: true,
      isReal: false,
      isFans: false,
      isDetail: false,
      bbList: [],
      bbPrice: '',
      yj_price: '',     //溢价率
      paramCKey: 'buy_ads_hint',
      config: {
        price: '',        //价格
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
    this.getUserWallet();
  },
  updated() {},
  mounted() {
    this.config.tradeType = getUrlParam('type');
    this.isCg = getUrlParam('isCg');
    if(this.config.tradeType == '1'){
      this.type = '出售';
      this.lowTxt = '广告最低可成交的价格';
      this.paramCKey = 'sell_ads_hint';
      setTitle('出售');
    }
    setTitle('购买');
    getAdverMessage(this.paramCKey).then(data => {
      this.MsgList = data;
      // 期限： data.payLimit
      // 开放时间：data.displayTime
      // 最大限额：data.maxTrade
      // 最小限额：data.minTrade
      // 付款期限：data.payLimit
      // 收款方式：data.payType
      // 溢价：data.premiumRate
      // 价格：data.price
      // 总量: data.totalCount
      // 粉丝：data.trust
    });
    this.bbList = JSON.parse(sessionStorage.getItem('coinData'));
    this.getBbPrice('BTC');
    this.getAdverDetail();
  },
  computed: {},
  methods: {
    // 查询余额
    getUserWallet(){
      wallet().then(data => {
        let wallet = data.filter(item => {
          return item.currency == this.config.tradeCoin;
        });
        this.walletMon = formatMoneySubtract(`${wallet[0].amount}`, `${wallet[0].frozenAmount}`, wallet[0].currency);
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      })
    },
    bbFormatAmount(amount, len, coin){
        return formatMoneyMultiply(amount, len, coin);
    },
    //显示交易提示
    showMsg(type){
      switch(type){
        case 'jg': this.text = this.MsgList.price;break;
        case 'jv': this.text = this.MsgList.premiumRate;break;
        case 'low': this.text = this.lowTxt;break;
        case 'min': this.text = this.MsgList.minTrade;break;
        case 'max': this.text = this.MsgList.maxTrade;break;
        case 'ty': this.text = this.MsgList.payType;break;
        case 'time': this.text = this.MsgList.displayTime;break;
        case 'qx': this.text = this.MsgList.payLimit;break;
        case 'fs': this.text = this.MsgList.trust;break;
      }
      this.$refs.showMsg.show();
    },
    //通过溢价率改变价格
    changeYjlPrice(){
      this.bbPrice = this.config.price + this.yj_price * this.config.price / 100;
    },
    onlyFans(){ // 仅粉丝
      if(this.isFans){
        this.config.onlyTrust = '0';
      }else{
        this.config.onlyTrust = '1';
      }
      this.isFans = !this.isFans;
    },
    getBbPrice(tradeCoin){
      getAdvertisePrice(tradeCoin).then(data => {
          this.bbPrice = data.mid;
          this.config.price = data.mid;
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    // isRealFn(i){
    //   if(this.isReal){
    //     this.config.onlyCert = '0';
    //   }else{
    //     this.config.onlyCert = '1';
    //   }
    //   if(i == 0){
    //     this.isReal = true;
    //   }else{
    //     this.isReal = false;
    //   }
    // },
    isSelectFn(i){
      if(i == 0){
        this.select = true;
      }else{
        this.select = false;
      }
    },
    changePrice(){
      this.getBbPrice(this.config.tradeCoin);
      this.getUserWallet();
    },
    changeConfig(path){
      if(!this.select){
        let str_ = document.querySelectorAll('.str_time');
        let end_ = document.querySelectorAll('.end_time');
        str_.forEach((item, index) => {
          this.displayTime.push({
            startTime: '',
            endTime: '',
            week: ''
          })
          this.displayTime[index]['startTime'] = this.startTimeList.indexOf(item.value).toString();
          this.displayTime[index]['week'] = (index + 1).toString();
        });
        end_.forEach((item, index) => {
          this.displayTime[index]['endTime'] = this.endTimeList.indexOf(item.value).toString();
        })
      }
      this.config.leaveMessage = (this.$refs.leaveMessage.value).trim();
      let totalCount = '';
      this.config.totalCount = this.bbFormatAmount(this.count, '', this.config.tradeCoin);
      this.config.displayTime = this.displayTime;
      this.config.premiumRate = this.yj_price / 100;
      if(!this.isDetail){
        let that = this;
        addAdvertising(this.config).then(data => {
          cgAdver(that);
        })
      }else{
        if(this.isCg){
          this.config.publishType = '2';
        }else{
          this.config.publishType = '3';
        }
        this.config.adsCode = this.adsCode;
        let that = this;
        exitAdverFn(that);
      }
      function exitAdverFn(that){
        ExitAdvertising(that.config).then(data => {
          cgAdver(that);
        });
      }
      function cgAdver(that){
        message.show('操作成功');
        if(that.config.publishType != '3'){
          sessionStorage.setItem('tradeType', that.config.publishType);
          sessionStorage.setItem('coin', that.config.tradeCoin);
        }
        setTimeout(() => {
          that.$router.push(path);
        }, 300);
      }
    },
    toOtcFn(){
      this.config.publishType = '1';
      this.changeConfig('/otc');
    },
    //保存草稿
    saveOtcData(){
      if(!this.isCg){
        this.config.publishType = '0';
        this.changeConfig('/my-advertising');
      }else{
        this.config.publishType = '2';
        this.changeConfig('/my-advertising');
      }
    },
    getAdverDetail(){
      this.isLoading = true;
      this.adsCode = this.$route.query.code;
      let userId = this.$route.query.userId;
      if(this.adsCode){
        this.isDetail = true;
        getAdvertiseDetail(this.adsCode, userId).then(data => {
          if(data.onlyTrust === '1'){
            this.isFans = true;
          }
          let blv = 0;
          if(data.tradeCoin != 'BTC'){
            blv = 1e18;
          }else{
            blv = 1e8;
          }
          this.bbPrice = data.truePrice;
          this.config.minTrade = data.minTrade;
          this.config.maxTrade = data.maxTrade;
          this.count = parseFloat(data.totalCountString) / blv;
          this.config.payType = data.payType;
          this.config.payLimit = data.payLimit;
          this.$refs.leaveMessage.value = data.leaveMessage;
          this.config.tradeCurrency = data.tradeCurrency;
          this.config.tradeCoin = data.tradeCoin;
          this.config.onlyTrust = data.onlyTrust;
          this.config.protectPrice = data.protectPrice;
          this.yj_price = parseFloat(data.premiumRate) * 100;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        })
      }
    }
  },
  components: {
    showMsg,
    FullLoading
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.publish-wrapper {
  font-size: 0.3rem;
  font-family: PingFangSC-Medium;
  color: #333;
  overflow: auto;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;

  }

  .header {
    width: 100%;
    padding: 0 0.3rem;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 1rem;
    text-align: center;
    margin-bottom: 0.2rem;
    .icon {
      display: inline-block;
      width: 0.21rem;
      height: 0.36rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      @include bg-image("返回");
      margin-top: 0.2rem;
    }
    .txt1 {
      font-size: 0.36rem;
      height: 0.7rem;
      line-height: 0.7rem;
      font-weight: bold;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

    }
    button {
      font-size: 0.32rem;
      color: #333;
      background-color: #fff;
    }
  }

  .publish-list {
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    margin-bottom: 0.2rem;

    input, select {
        width: 4.1rem;
        padding-left: 0.5rem;
        flex: 1;
    }

    input[attr="placeholder"] {
      color: #999;
    }

    p {
        border-bottom: 0.01rem solid #e5e5e5;
        display: flex;
        align-items: center;
        position: relative;
    }

    p:last-child {
      border: none;
    }

    .txt1 {
        display: inline-block;
        width: 1.2rem;
        color: #666;
        line-height: 1rem;
        height: 1rem;
        text-align: justify;
        overflow: hidden;
      i {
          display: inline-block;
          width: 100%;
          height: 0;
      }
      .wallet{
        position: absolute;
        width: 100%;
        bottom: 0%;
        left: 0;
        height: 0.3rem;
        line-height: 0.4rem;
        color: #d53d3d;
        font-size: 0.2rem;
      }
    }
    .txt2 {
      color: #333;
      margin-right: 0.14rem;
    }
    .ico {
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      @include bg-image("问号");
      float: right;
    }
    .icon {
      display: inline-block;
      width: 0.16rem;
      height: 0.26rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      @include bg-image("更多");
      float: right;
      margin-right: 0.14rem;
    }
  }

  .message {
    width: 100%;
    background: #fff;
    padding: 0.1rem 0.2rem;
    height: 2.2rem;
    font-size: 0.28rem;
    color: #333;
    margin-bottom: 0.2rem;
  }

  .select {
    width: 100%;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
    line-height: 1rem;
    color: #666;
    background: #fff;

    .text {
      width: 100%;
      border-bottom: .01rem solid #e5e5e5;

      .icon {
        display: inline-block;
        width: 0.24rem;
        height: 0.14rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("限价下拉");
        float: right;
        margin-top: 0.5rem;
      }

      .ico {
        display: inline-block;
        width: 0.24rem;
        height: 0.14rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("限价下拉");
        float: right;
        margin-top: 0.5rem;
        @include bg-image("高级设置上拉");

      }
    }
  }

  .select-box {
    margin-bottom: 0.54rem;
  
    .select-time {
      width: 100%;
      padding: 0 .3rem;
      background: #fff;
      .text1 {
        font-size: .26rem;
        padding: .32rem 0 .4rem;
        color: #666;

        .icon {
          width: .3rem;
          height: .3rem;
          @include bg-image("未选择");
          vertical-align: middle;
          margin-right: .14rem;
        }

        .icon1 {
          width: .3rem;
          height: .3rem;
          @include bg-image("选中");
   
        }


        .txt2 {
          color: #333;
          margin-left: 1.8rem;
          margin-right: .6rem;
        }
        .txt3 {
          color: #333;
        }

        .ico2 {
          @include bg-image("问号");
          margin-right: 0;
          margin-left: .2rem;
        }
      }

      .text2 {
        font-size: .24rem;
        color: #333;
        padding-bottom: .22rem;
        margin-bottom: .18rem;
        .txt1 {
          margin-right: 1.08rem;
        }
        .txt2 {
          margin: 0 .6rem;
        }
      }

      .text3 {
        font-size: .24rem;
        color: #d53d3d;
        padding-bottom: .4rem;
        .icon {
          width: .24rem;
          height: .24rem;
          @include bg-image("添加时间段");
          vertical-align: middle;
        }
      }

    }

    .select-last {
      width: 100%;
      padding: 0 .3rem;
      background: #fff;
      height: .9rem;
      line-height: .9rem;
      .text1 {
        width: 100%;
        border-top: .01rem solid #e5e5e5;
        font-size: .26rem;
        color: #666;
        display: flex;
        justify-content: space-between;
        .icon {
          width: .3rem;
          height: .3rem;
        }
        .ico1 {
          @include bg-image("选择");
        }
        .ico2 {
          @include bg-image("问号");
          margin-left: .2rem;
        }
        b{
          width: .3rem;
          height: .3rem;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFW…5StU7sUqvAhNXUveYI87dDW8R2aCu0lTnr0BYTru3xbwEGAIghgwP7XNU7AAAAAElFTkSuQmCC);
          vertical-align: middle;
          background-position: center;
          background-size: 100% 100%;
        }

      }
    }

  }

  .footer {
    width: 100%;
    height: 1.3rem;
    background: #fff;
    text-align: center;
    button {
      width: 3.3rem;
      height: 1rem;
      border-radius: 0.08rem;
      background: #d53d3d;
      font-size: 0.32rem;
      color: #fff;
      line-height: 1rem;
      margin-top: 0.15rem;
      margin-right: 0.1rem;
      &:nth-of-type(2){
        background: #333;
        color: #fff;
      }
    }
    .btn-w{
      width: 6.9rem;
    }
  }
}
</style>
