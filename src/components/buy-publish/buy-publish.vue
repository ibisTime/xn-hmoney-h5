<template>
  <div class="publish-wrapper" @click.stop>
    <div class='publish-list'>
        <p>
          <span class='txt1'>{{ $t('buyPublish.subject.jybz') }}<i></i></span>
          <select name="tradeCoin" v-model="config.tradeCoin" @change="changePrice">
            <option :value="item" v-for="(item, index) in bbList" :key="index">{{item}}</option>
          </select>
          <span class='icon'></span>
        </p>
        <p>
          <span class='txt1'>{{ $t('buyPublish.subject.jg') }}<i></i></span>
          <input type="number" readonly v-model="bbPrice">
          <span class='txt2'>CNY</span>
          <span class='ico' @click.stop="showMsg('jg')"></span>
        </p>
        <p>
          <span class='txt1'>{{ $t('buyPublish.subject.yjl') }}<i></i></span>
          <input type="number" v-model="yj_price" placeholder="-50% - 50%" @keyup="changeYjlPrice">
          <span class='txt2'>%</span>
          <span class='ico' @click.stop="showMsg('jv')"></span>
        </p>
        <p>
          <span class='txt1'>{{type !== $t('buyPublish.subject.gm') ? $t('buyPublish.subject.zdj') : $t('buyPublish.subject.zgj')}}<i></i></span>
          <input type="number" name="protectPrice" v-validate="'required'" v-model="config.protectPrice" :placeholder="type !== $t('buyPublish.subject.gm') ? $t('buyPublish.subject.kjyzdj') : $t('buyPublish.subject.kyjzgj')">
          <span v-show="errors.has('protectPrice')" class="error-tip">{{errors.first('protectPrice')}}</span>
          <span class='txt2'>CNY</span>
          <span class='ico' @click.stop="showMsg('low')"></span>
        </p>
        <p>
          <span class='txt1'>{{ $t('buyPublish.subject.zxj') }}<i></i></span>
          <input type="number" name="minTrade" v-validate="'required'" v-model="config.minTrade" :placeholder="$t('buyPublish.subject.zced')">
          <span v-show="errors.has('minTrade')" class="error-tip">{{errors.first('minTrade')}}</span>
          <span class='txt2'>CNY</span>
          <span class='ico' @click.stop="showMsg('min')"></span>
        </p>
        <p>
          <span class='txt1'>{{ $t('buyPublish.subject.zdjg') }}<i></i></span>
          <input type="number" name="maxTrade" v-validate="'required'" v-model="config.maxTrade" :placeholder="$t('buyPublish.subject.zded')">
          <span v-show="errors.has('maxTrade')" class="error-tip">{{errors.first('maxTrade')}}</span>
          <span class='txt2'>CNY</span>
          <span class='ico' @click.stop="showMsg('max')"></span>
        </p>
        <p>
          <span class='txt1'>{{type}}{{ $t('buyPublish.subject.zl') }}<i class="wallet">{{ $t('buyPublish.subject.ye') }}：{{walletMon}}</i></span>
          <input type="number" name="count" v-validate="'required'" v-model="count" :placeholder="$t('buyPublish.subject.sbzl')">
          <span v-show="errors.has('count')" class="error-tip">{{errors.first('count')}}</span>
          <span class='txt2'>{{config.tradeCoin}}</span>
        </p>
        <p>
          <span class='txt1'>{{ $t('buyPublish.subject.fkfs') }}<i></i></span>
          <select name="payType" v-model="config.payType">
            <option value="0">{{ $t('buyPublish.subject.zfb') }}</option>
						<option value="1">{{ $t('buyPublish.subject.wx') }}</option>
						<option value="2">{{ $t('buyPublish.subject.yhk') }}</option>
          </select>
          <span class='icon'></span>
          <span class='ico' @click.stop="showMsg('ty')"></span>
        </p>
        <!-- <p>
          <span class='txt1'>{{ $t('buyPublish.subject.fkqx') }}<i></i></span>
          <input type="text" name="payLimit" v-validate="'required'" :placeholder="$t('buyPublish.subject.qsfkqx')" v-model="config.payLimit">
          <span v-show="errors.has('payLimit')" class="error-tip">{{errors.first('payLimit')}}</span>
          <span class='txt2'>{{ $t('buyPublish.subject.fz') }}</span>
          <span class='ico' @click.stop="showMsg('qx')"></span>
        </p> -->
    </div>
    <textarea class='message' name="leaveMessage" v-validate="'required'" :placeholder="$t('buyPublish.subject.ggly')" ref="leaveMessage">
    </textarea>
    <span v-show="errors.has('leaveMessage')" class="error-tip">{{errors.first('leaveMessage')}}</span>
    <div class='select' @click="show = !show">
        <p class='text'>
            <span>{{ $t('buyPublish.subject.gjsz') }}</span>
            <span :class="[!show ? 'icon' : 'ico']" ></span>
        </p>
    </div>
    <div v-show='show' class='select-box'>
      <div class='select-time'>
          <p class='text1'>
            <span class='txt1'>{{ $t('buyPublish.subject.kfsj') }}</span>
            <span class='txt2'><i :class="[select ? 'icon icon1' : 'icon']" @click='isSelectFn("0")'></i>{{ $t('buyPublish.subject.rhsh') }}</span>
            <span class='txt3'><i :class="[!select ? 'icon icon1' : 'icon']" @click='isSelectFn("1")'></i>{{ $t('buyPublish.subject.zdy') }}</span>
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
          <span>{{ $t('buyPublish.subject.jfs') }} </span>
          <i class="fr" :class="[isFans ? 'icon ico1' : 'icon']" @click='onlyFans' style="margin-left: .1rem;"></i>
          <i class='icon ico2' @click.stop="showMsg('fs')" style="margin-top: .4rem;"></i>
        </p>
      </div>
    </div>
    <div class='footer'>
        <button @click="toOtcFn" :class="{'btn-w': isDetail}">{{ $t('buyPublish.subject.zjfb') }}</button>
        <button class='txt2' @click="saveOtcData" :class="{'hidden': isDetail}">{{ $t('buyPublish.subject.bccg') }}</button>
    </div>
    <showMsg :text="text" ref="showMsg"/>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
    <Toast :text="textMsg" ref="toast" />
  </div>
</template>
<script>
import Message from 'base/message/message';
import showMsg from 'base/showMsg/showMsg';
import {getUserId, getUrlParam, setTitle, formatMoneyMultiply, formatMoneySubtract, formatAmount} from 'common/js/util';
import {addAdvertising, getBbListData, getAdvertisePrice, getAdvertiseDetail, ExitAdvertising, getAdverMessage} from 'api/otc';
import { wallet } from 'api/person';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';

const message = new Message();

export default {
  data() {
    return {
      textMsg: '',
      isLoading: true,
      text: '',
      count: '',
      walletMon: '', // 余额
      lowTxt: this.$t('buyPublish.subject.zgcjjg'),
      MsgList: {},
      type: this.$t('buyPublish.subject.gm'),
      adsCode: '',
      isCg: '',
      dayList: [
        {
          week: this.$t('buyPublish.subject.xqy'),
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: this.$t('buyPublish.subject.xqe'),
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: this.$t('buyPublish.subject.xqs'),
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: this.$t('buyPublish.subject.xqi'),
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: this.$t('buyPublish.subject.xqw'),
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: this.$t('buyPublish.subject.xql'),
          dayStart: '00:00',
          dayEnd: '24:00'
        },{
          week: this.$t('buyPublish.subject.xqt'),
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
      bbPriceDet: '',
      yj_price: 0,     //溢价率
      paramCKey: 'buy_ads_hint',
      config: {
        price: 0,        //价格
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
      },
      isOk: true
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
      this.type = this.$t('buyPublish.subject.cs');
      this.lowTxt = this.$t('buyPublish.subject.zdcjjg');
      this.paramCKey = 'sell_ads_hint';
    }
    setTitle(this.type);
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
    let coinList = JSON.parse(sessionStorage.getItem('coinData'));
    this.bbList = Object.keys(coinList);
    this.config.tradeCoin = this.bbList[0];
    this.getBbPrice(this.config.tradeCoin);
    this.getAdverDetail();
  },
  methods: {
    // 查询余额
    getUserWallet(){
      wallet().then(data => {
        let wallet = data.filter(item => {
          return item.currency == this.config.tradeCoin;
        });
        this.walletMon = formatMoneySubtract(`${wallet[0].amount}`, `${wallet[0].frozenAmount}`, '', wallet[0].currency);
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
      let yj_price = parseFloat(this.yj_price);
      if(50 < yj_price || yj_price < -50){
        this.textMsg = this.$t('buyPublish.subject.yjlv');
        this.$refs.toast.show();
        this.yj_price = 0;
        return;
      }
      let price = parseFloat(this.config.price);
      this.bbPrice = yj_price ? (Math.floor((price + yj_price * price / 100) * 100) / 100).toFixed(2) : price;
    },
    onlyFans(){ // 仅粉丝
      if(this.isFans){
        this.config.onlyTrust = '0';
      }else{
        this.config.onlyTrust = '1';
      }
      this.isFans = !this.isFans;
    },
    getBbPrice(tradeCoin){  // 获取币种价格
      getAdvertisePrice(tradeCoin).then(data => {
        if(!this.adsCode){
          this.bbPrice = (Math.floor(data.mid * 100) / 100).toFixed(2);
        }
        this.config.price = (Math.floor(data.mid * 100) / 100).toFixed(2);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
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
      if(this.isOk){
        this.isOk = false;
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
          }, () => {
            this.isOk = true;
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
          }, () => {
            that.isOk = true;
          });
        }
        function cgAdver(that){
          message.show(that.$t('common.czcg'));
          that.isOk = true;
          if(that.config.publishType != '0'){
            sessionStorage.setItem('tradeType', that.config.tradeType);
            sessionStorage.setItem('coin', that.config.tradeCoin);
          }
          setTimeout(() => {
            that.$router.push(path);
          }, 300);
        }
      }
    },
    toOtcFn(){
      this.config.publishType = '1';
      if(this.errors.any() || this.config.protectPrice == ''){
        this.textMsg = this.$t('common.txwz');
        this.$refs.toast.show();
        this.isOk = true;
        return;
      }
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
    getAdverDetail(){   // 获取详情
      this.isLoading = true;
      this.adsCode = this.$route.query.code;
      let userId = this.$route.query.userId;
      if(this.adsCode){
        this.isDetail = true;
        getAdvertiseDetail(this.adsCode, userId).then(data => {
          if(data.onlyTrust === '1'){
            this.isFans = true;
          }
          this.bbPrice = (Math.floor(data.truePrice * 100) / 100).toFixed(2);
          this.config.minTrade = data.minTrade;
          this.config.maxTrade = data.maxTrade;
          this.count = formatAmount(data.totalCountString, '', data.tradeCoin);
          this.config.payType = data.payType;
          this.config.payLimit = data.payLimit;
          this.$refs.leaveMessage.value = data.leaveMessage;
          this.config.tradeCurrency = data.tradeCurrency;
          this.config.tradeCoin = data.tradeCoin;
          this.config.onlyTrust = data.onlyTrust;
          this.config.protectPrice = data.protectPrice;
          this.yj_price = parseFloat(data.premiumRate) * 100;
          this.getBbPrice(this.config.tradeCoin);
          this.getUserWallet();
          // this.config.price = this.bbPrice * (100 - this.yj_price) / 100;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        })
      }
    }
  },
  components: {
    showMsg,
    FullLoading,
    Toast
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
      background-image: url('./fhui.png');
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
        font-size: 100%;
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
      background-image: url('./whao.png');
      float: right;
    }
    .icon {
      display: inline-block;
      width: 0.16rem;
      height: 0.26rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      background-image: url('./more.png');
      float: right;
      margin-right: 0.14rem;
    }
  }
  .error-tip{
    position: absolute;
    right: 0.6rem;
    font-size: 0.24rem;
    width: 1.5rem;
    color: #d53d3d;
  }

  .message {
    width: 100%;
    background: #fff;
    padding: 0.2rem 0.3rem;
    height: 2.2rem;
    font-size: 0.28rem;
    line-height: 1.5;
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
        background-image: url('./xjxl.png');
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
        background-image: url('./gjsl.png');
        float: right;
        margin-top: 0.5rem;

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
          background-image: url('./wxz.png');
          vertical-align: middle;
          margin-right: .14rem;
        }

        .icon1 {
          width: .3rem;
          height: .3rem;
          background-image: url('./xz.png');

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
          background-image: url('./whao.png');
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
          background-image: url('./tjsj.png');
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
        position: relative;
        width: 100%;
        border-top: .01rem solid #e5e5e5;
        font-size: .26rem;
        color: #666;
        display: flex;
        justify-content: space-between;
        .fr{
          position: absolute;
          right: 0.5rem;
          top: 46%;
        }
        .icon {
          width: .3rem;
          height: .3rem;
          border: 1px solid #ccc;
          border-radius: 100%;
          vertical-align: middle;
        }
        .ico1 {
          vertical-align: middle;
          background-image: url('./xz.png');
        }
        .ico2 {
          background-image: url('./whao.png');
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
