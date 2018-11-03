<template>
  <div class="trading-wrapper" :class="{'back-wrapper': !show2}" @click.stop>
    <div class='header' :class="{'col-header': !show2}">
      <span v-show="show2"><i class='icon' @click="showTwo"></i></span>
      <span v-show="!show2" @click="show2 = true"><i class='icon ico1'></i></span>
      <p>
        <select name="" class="cg-bb" v-model="symNumber" @change="changeSymBaz">
          <option :value="index" v-for="(symItem, index) in symBazList" :key="index">{{symItem.symbol}}/{{symItem.toSymbol}}</option>
        </select>
        <i class='icon' :class="{'icon-bai': !show2}"></i>
      </p>
      <router-link to='otc'>{{$t('trading.bbDeal.cwjy')}}</router-link>
    </div>
      
    <div v-show="show2" class='One'>
      <div class="top">
        <p>
          <span @click="buy" :class="[show1? 'txt1 buy' : 'txt1']">{{$t('trading.bbDeal.mr')}}</span>
          <span @click="sell" :class="[!show1? 'txt2 sell' : 'txt2']">{{$t('trading.bbDeal.mc')}}</span>
          <select name="" id="" class='txt3' v-model="downConfig.type" @change="bbDealType">
            <option value="1">{{$t('trading.bbDeal.xj')}}</option>
            <option value="0">{{$t('trading.bbDeal.sj')}}</option>
          </select>
          <i class='icon'></i>
          <span class='txt4'>{{$t('trading.bbDeal.pk')}}</span>
          <span class='txt5'>{{$t('common.jg')}}({{setBazDeal.toSymbol}})</span>
          <span class='txt6'>{{$t('common.sl')}}({{setBazDeal.symbol}})</span>
        </p>
      </div>
      <div class="main">
        <!-- 买入 -->
        <div v-show="show1" class="left">
          <p class='he9'>
            <input 
              type="number" 
              :placeholder="downConfig.type == '0' ? $t('trading.bbDeal.sczjjg') + $t('trading.bbDeal.mr') : $t('trading.bbDeal.wtjg')" 
              v-model="xjPrice" 
              :disabled="downConfig.type == '0'"
              @keyup="qrLength"
            >
            <span class='black'>{{setBazDeal.toSymbol}}</span>
          </p>
          <p class='text2' v-show="downConfig.type == '0'"></p>
          <p class='text2' v-show="downConfig.type == '1'">
            <span>{{$t('trading.bbDeal.zh')}}CNY</span>
            <span class='red max-len' :title="(Math.floor((xjPrice * toSyMid) * 100) / 100).toFixed(2)">￥{{(Math.floor((xjPrice * toSyMid) * 100) / 100).toFixed(2)}}</span>
          </p>
          <p class='he9 mb20'>
            <input type="number" :placeholder="$t('trading.bbDeal.wtsl')" v-model="wetNumber" @keyup="qrLength">
            <span class='black'>{{downConfig.type == '1' ? setBazDeal.symbol : setBazDeal.toSymbol}}</span>
          </p>
          <p class='he9 no-bor' v-show="downConfig.type == '1'">
            <span class="he-jye">{{$t('trading.bbDeal.jye')}}：{{(Math.floor((xjPrice * wetNumber) * 100000000) / 100000000).toFixed(8)}}</span>
            <span class='black'>{{setBazDeal.toSymbol}}</span>
          </p>
          <button class='sell' @click="downClickFn">{{$t('trading.bbDeal.mr')}}{{setBazDeal.symbol}}</button>
          <p class='he9 green'>
            <span>{{$t('trading.bbDeal.ky')}}{{setBazDeal.symbol}}</span>
            <span class="max-len" :title="symWallet.kyAmount">{{symWallet.kyAmount}}</span>
          </p>
          <p class='he9 btn green' v-show="downConfig.type == '1'">
            <span>{{$t('trading.bbDeal.km')}}{{setBazDeal.symbol}}</span>
            <span class="max-len">{{xjPrice > 0 ? (Math.floor((toSymWallet.kyAmount / xjPrice) * 100000000) / 100000000).toFixed(8) : '0'}}</span>
          </p>
          <p class='he9 btn'>
            <span>{{$t('trading.bbDeal.ky')}}{{setBazDeal.toSymbol}}</span>
            <span class='black max-len' :title="toSymWallet.kyAmount">{{toSymWallet.kyAmount}}</span>
          </p>
          <p class='he9 btn'>
            <span>{{$t('trading.bbDeal.dj')}}{{setBazDeal.symbol}}</span>
            <span class='black max-len' :title="symWallet.frozenAmount">{{symWallet.frozenAmount}}</span>
          </p>
        </div>
        <!-- 卖出 -->
        <div v-show="!show1" class="left">
          <p class='he9'>
            <input 
              type="number" 
              :placeholder="downConfig.type == '0' ? $t('trading.bbDeal.sczjjg') + $t('trading.bbDeal.mc') : $t('trading.bbDeal.wtjg')" 
              v-model="xjPrice" 
              :disabled="downConfig.type == '0'"
              @keyup="qrLength"
            >
            <span class='black'>{{setBazDeal.toSymbol}}</span>
          </p>
          <p class='text2' v-show="downConfig.type == '0'"></p>
          <p class='text2' v-show="downConfig.type == '1'">
            <span>{{$t('trading.bbDeal.zh')}}CNY</span>
            <span class='red'>￥{{(Math.floor((xjPrice * toSyMid) * 100) / 100).toFixed(2)}}</span>
          </p>
          <p class='he9 mb20'>
            <input type="number" :placeholder="$t('trading.bbDeal.wtsl')" v-model="wetNumber" @keyup="qrLength">
            <span class='black'>{{setBazDeal.symbol}}</span>
          </p>
          <p class='he9 no-bor' v-show="downConfig.type == '1'">
            <span>{{$t('trading.bbDeal.jye')}}：{{(Math.floor((xjPrice * wetNumber) * 100000000) / 100000000).toFixed(8)}}</span>
            <span class='black'>{{setBazDeal.toSymbol}}</span>
          </p>
          <button class='buy' @click="downClickFn">{{$t('trading.bbDeal.mc')}} {{setBazDeal.symbol}}</button>
          <p class='he9 red'>
            <span>{{$t('trading.bbDeal.ky')}}{{setBazDeal.symbol}}</span>
            <span class="max-len" :title="symWallet.kyAmount">{{symWallet.kyAmount}}</span>
          </p>
          <p class='he9 btn red' v-show="downConfig.type == '1'">
            <span>{{$t('trading.bbDeal.kmai')}}{{setBazDeal.symbol}}</span>
            <span class="max-len">{{xjPrice > 0 ? (Math.floor((symWallet.kyAmount / xjPrice) * 100000000) / 100000000).toFixed(8) : '0'}}</span>
          </p>
          <p class='he9 btn'>
            <span>{{$t('trading.bbDeal.ky')}}{{setBazDeal.toSymbol}}</span>
            <span class='black max-len' :title="toSymWallet.kyAmount">{{toSymWallet.kyAmount}}</span>
          </p>
          <p class='he9 btn'>
            <span>{{$t('trading.bbDeal.dj')}}{{setBazDeal.symbol}}</span>
            <span class='black max-len' :title="symWallet.frozenAmount">{{symWallet.frozenAmount}}</span>
          </p>
        </div>

        <div class="right">
          <div class='one'>
            <p class='text1' v-for="(sellItem, index) in bbAsks" :key="index" @click="selectAsksPrice(index)">
              <span class='red txt1'>{{$t('trading.bbDeal.mai')}}{{7 - index}}</span>
              <span class='txt2'>{{sellItem ? sellItem.price : '--'}}</span>
              <span class='txt3'>{{sellItem ? sellItem.count : '--'}}</span>
            </p>
          </div>
          <p class='middle'>
            <span class='red max-len_r'>{{(bb_zxj ? bb_zxj : '0') + setBazDeal.toSymbol}} ≈ {{(Math.floor(toSyMid * bb_zxj * 100) / 100).toFixed(2) + referCurrency}}</span>
            <!-- <i class='icon'></i> -->
          </p>
          <div class='one two'>
            <p class='text1' v-for="(buyItem, index) in bbBids" :key="index" @click="selectBidsPrice(index)">
              <span class='green txt1'>{{$t('trading.bbDeal.m')}}{{index + 1}}</span>
              <span class='txt2'>{{buyItem ? formatAmount(buyItem.price, '', setBazDeal.toSymbol) : '--'}}</span>
              <span class='txt3'>{{buyItem ? formatAmount(buyItem.count, '', setBazDeal.symbol) : '--'}}</span>
            </p>
          </div>

        </div>
      </div>
      <div class='entrust' v-show="isLogin">
        <div class='tabs'>
          <p @click="showCurr" class='current'>{{$t('trading.bbDeal.dqwt')}}</p>
          <p @click='showHisto' class='history'><i class='icon'></i>
          <router-link to='/trading-historyEntrust'>{{$t('trading.bbDeal.ls')}}</router-link></p>
        </div>
        <div v-show="!show3" class='current-history'>
          <Scroll 
            ref="scroll"
            :data="myOrderData"
            :hasMore="hasMore"
            v-show="myOrderData.length > 0"
            @pullingUp="myOrderTicket"
          >
            <div class='list' v-for="(myItem, index) in myOrderData" :key="index">
              <p class='text1'>
                <span :class='myItem.direction == 0 ? "green" : "red1"'>{{myItem.direction == 0 ? $t('trading.bbDeal.mr') : $t('trading.bbDeal.mc')}}</span>
                <span>{{myItem.createDatetime}}</span>
                <span class='red' v-show="(myItem.type != 0 && (myItem.status === '0' || myItem.status === '1'))" @click="repealOrder(myItem.code)">{{$t('trading.bbDeal.cx')}}</span>
              </p>
              <div class='text2'>
                <div class='txt1'>
                  <p>{{$t('common.jg')}}({{setBazDeal.toSymbol}})</p>
                  <p class='black'>{{myItem.type == 0 ? $t('trading.bbDeal.sj') : myItem.price}}</p>
                </div>
                <div class='txt2'>
                  <p>{{$t('common.sl')}}({{setBazDeal.symbol}})</p>
                  <p class='black'>{{myItem.totalCount}}</p>
                </div>
                <div class='txt3'>
                  <p>{{$t('trading.bbDeal.sjcj')}}({{setBazDeal.symbol}})</p>
                  <p class='black'>{{myItem.tradedCount}}</p>
                </div>
              </div>
            </div>
          </Scroll>
          <div class="no-data" :class="{'hidden': myOrderData.length > 0}">
            <img src="./zwdata.png" />
            <p>{{$t('trading.bbDeal.zwdd')}}</p>
          </div>
        </div>

      </div>
    </div>
    <!-- K线图 -->
    <div v-show="!show2" class='Two'>
      <div class="top-mian">
        <p class='text1'><span class='txt1'>{{setBazDeal.toSymbol}}</span><span>{{$t('trading.bbDepth.xj')}} </span><span class='red txt3'>&nbsp;&nbsp;{{ gkdsList.price}}</span><span class='red txt4'>≈ {{(Math.floor(gkdsList.currencyPrice * 100) / 100).toFixed(2)}} CNY</span></p>
        <div class='text2'>
          <p><span class='gray txt1'>{{$t('trading.bbDepth.zf')}}</span><span class='red txt2'>{{gkdsList.exchangeRate * 100}} %</span></p>
          <p><span class='gray'>{{$t('trading.bbDepth.zg')}}</span><span>{{dayLineInfo ? dayLineInfo.high : '0'}}</span></p>
        </div>
        <div class='text3'>
          <p><span class='gray'>24h </span><span>{{dayLineInfo ? dayLineInfo.volume : '0'}}</span></p>
          <p><span class='gray'>{{$t('trading.bbDepth.zd')}}</span><span>{{dayLineInfo ? dayLineInfo.low : '0'}}</span></p>
        </div>
      </div>
      <!-- k线图部分 -->
      <div class='main1'>
        <TVChartContainer />
      </div>

      <!-- 主要内容区 -->
      <div class='main2'>
        <div class='tabs' @click="changeMain">
          <span class='tab-item cj' :class="{'on': tShow === '1'}">{{$t('trading.bbDepth.cj')}}</span>
          <span class='tab-item gd' :class="{'on': tShow === '2'}">{{$t('trading.bbDepth.gd')}}</span>
          <span class='tab-item sd' :class="{'on': tShow === '3'}">{{$t('trading.bbDepth.sdt')}}</span>
          <span class='tab-item jj' :class="{'on': tShow === '4'}">{{$t('trading.bbDepth.jj')}}</span>
        </div>
        <TradingClinchadeal v-show="tShow === '1'" :bazDeal="bazDeal" :show2="show2"/>
        <TradingPutUp v-show="tShow === '2'" :bazDeal="bazDeal"/>
        <TradingDepthMap v-show="tShow === '3'" :bazDeal="bazDeal"/>
        <TradingSynopsis v-show="tShow === '4'" :bazDeal="bazDeal"/>
        <div class='foot'>
          <button class='sell' @click="toBuy">{{$t('trading.bbDeal.mr')}}FMVP</button>
          <button class='buy' @click="toSell">{{$t('trading.bbDeal.mc')}}FMVP</button>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import Footer from 'components/footer/footer';
import Toast from 'base/toast/toast';
import Scroll from 'base/scroll/scroll';
import FullLoading from 'base/full-loading/full-loading';
import TradingSynopsis from 'components/trading-synopsis/trading-synopsis';
import TradingPutUp from 'components/trading-put-up/trading-put-up';
import TradingClinchadeal from 'components/trading-clinchadeal/trading-clinchadeal';
import TradingDepthMap from 'components/trading-depth-map/trading-depth-map';
import TVChartContainer from 'components/TVChartContainer/TVChartContainer';

import { 
  formatAmount, 
  setTitle, 
  getUserId, 
  formatMoneyMultiply, 
  formatDate 
} from "common/js/util";
import {wallet} from 'api/person';
import {
  getBazaarData, 
  getBBExchange, 
  getHandicapData, 
  downBBOrder, 
  getMyorderTicket, 
  getRealTimeData, 
  repOrder
} from 'api/bb';
export default {
  data() {
    return {
      referCurrency: 'CNY',
      textMsg: '',
      hasMore: true,
      isLoading: true,
      isLogin: false,
      show1: true,
      show2: true,
      show3: false,
      history: false,
      tShow: '1',
      xjPrice: '',      // 委托价格
      wetNumber: '',    // 限价-委托数量
      toSyMid: '',      // toSymbol换算价
      syMid: '',        // symbol换算价
      symNumber: '0',
      setBazDeal: {},    // 选中的交易对
      symBazList: [],    // 交易对
      bazDealList: [],
      symWallet: {},     // symbol资产
      toSymWallet: {},   // toSymbol资产
      bbAsks: [],        // 卖盘
      bbBids: [],        // 买盘
      downConfig: {                 // 下订单config
        userId: getUserId(),
        type: '1',                   // 0=市价，1=限价
        direction: '0',              // 0=买入，1=卖出
        price: '',                  // type=1时必填，委托价格
        totalCount: '',              // 委托数量
        symbol: '',
        toSymbol: ''
      },
      start: '1',
      myOrderConfig: {             // 我的委托单config
        start: '1',
        limit: '3',
        userId: getUserId(),
        symbol: '',
        toSymbol: '',
      },
      myOrderData: [],
      bazDeal: {},
      realTimeConfig: {
        start: 1,
        limit: 1
      },                    // 实时成交参数
      bb_zxj: '',            // 最新价
      symbolData: {},
      handTime: '',
      gkdsList: {},           // 高、低、涨幅
      dayLineInfo: {},
      selIndex: 0
    };
  },
  created() {
    setTitle(this.$t('trading.bbDeal.bbjy'));
    getBazaarData().then(data => {  // 查询交易对
      this.syMid = data.list[0].currencyPrice;
      let setBazDeal = JSON.parse(sessionStorage.getItem('setBazDeal'));
      this.setBazDeal = setBazDeal || {
        symbol: data.list[0].symbol,
        toSymbol: data.list[0].toSymbol
      };
      if(!setBazDeal){
        sessionStorage.setItem('setBazDeal', JSON.stringify(this.setBazDeal));
      }
      if(this.setBazDeal.toSymbol == 'ETH'){
        this.symNumber = '1';
      }
      data.list.forEach(item => {
        this.symBazList.push({
          'symbol' : item.symbol,
          'toSymbol': item.toSymbol
        });
      });
      // 获取涨幅
      let gkData = data.list.filter(item => {
        return item.symbol == this.setBazDeal.symbol && item.toSymbol == this.setBazDeal.toSymbol;
      });
      this.gkdsList = gkData[0];
      this.dayLineInfo = this.gkdsList.dayLineInfo;console.log(this.dayLineInfo)
      if(this.dayLineInfo){
        this.dayLineInfo.high = formatAmount(this.dayLineInfo.high, '', this.setBazDeal.symbol);
        this.dayLineInfo.low = formatAmount(this.dayLineInfo.low, '', this.setBazDeal.symbol);
        // this.dayLineInfo.volume = formatAmount(this.dayLineInfo.volume, '', this.setBazDeal.symbol);
      }
      this.getMidPrice();
      this.handicapData();
      this.realTimeData();
      if(getUserId()){
        this.getUserWalletData();
        this.isLogin = true;
        this.history = true;
        this.myOrderTicket();
      }

      this.handTime = setInterval(() => {
        if(this.isLogin){
          this.getUserWalletData();
        }
        this.handicapData();
        this.realTimeData();
      }, 5000);

    });
  },
  mounted() {
    
  },
  methods: {
    getMidPrice(){
      getBBExchange(this.referCurrency, this.setBazDeal.toSymbol).then(data => { // 查询币换算人民币价格
        this.toSyMid = data[0].mid;
      });
    },
    getUserWalletData(){
      // 查询用户资产
      wallet().then(data => {
        data.map( item => {
          item.amount = formatAmount(`${item.amount}`, '', item.currency);
          item.frozenAmount = formatAmount(`${item.frozenAmount}`, '', item.currency);
        })
        data.forEach( item => {
          if(item.currency == this.setBazDeal.symbol){
            this.symWallet = item;
          }
          if(item.currency == this.setBazDeal.toSymbol){
            this.toSymWallet = item;
          }
        });
        this.symWallet.kyAmount = this.symWallet.amount - this.symWallet.frozenAmount;
        this.toSymWallet.kyAmount = this.toSymWallet.amount - this.toSymWallet.frozenAmount;
      });
    },
    changeSymBaz(){ // 选择交易对 this.symNumber : 0  X/BTC    1  X/ETH
      this.bbAsks = [];
      this.bbBids = [];
      this.setBazDeal = {
        symbol: this.symBazList[this.symNumber].symbol,
        toSymbol: this.symBazList[this.symNumber].toSymbol
      };
      sessionStorage.setItem('setBazDeal', JSON.stringify(this.setBazDeal));
      this.handicapData();
      this.realTimeData();
      this.getMidPrice();
      getBazaarData().then(data => {
        // 获取涨幅
        let gkData = data.list.filter(item => {
          return item.symbol == this.setBazDeal.symbol && item.toSymbol == this.setBazDeal.toSymbol;
        });
        this.gkdsList = gkData[0];
        this.dayLineInfo = this.gkdsList.dayLineInfo;
        if(this.dayLineInfo){
          this.dayLineInfo.high = formatAmount(this.dayLineInfo.high, '', this.setBazDeal.symbol);
          this.dayLineInfo.low = formatAmount(this.dayLineInfo.low, '', this.setBazDeal.symbol);
          this.dayLineInfo.volume = formatAmount(this.dayLineInfo.volume, '', this.setBazDeal.toSymbol);
        }
      });
      if(this.isLogin){
        this.getUserWalletData();
        this.hasMore = true;
        this.start = 1;
        this.myOrderData = [];
        this.myOrderTicket();
      }
      clearInterval(this.handTime);
      this.handTime = setInterval(() => {
        if(this.isLogin){
          this.getUserWalletData();
        }
        this.handicapData();
        this.realTimeData();
      }, 5000);
    },
    handicapData(){
      // 查询盘口
      getHandicapData(this.setBazDeal).then(data => {
        this.bbAsks = [];
        this.bbBids = [];
        this.bbAsks.length = 7;
        this.bbBids.length = 7;
        let asks = data.asks.sort( (a, b) => (b - a) );
        let bids = data.bids;
        if(data.bids.length > 0 || data.asks.length > 0){
          asks.forEach((item, index) => {
            this.bbAsks[6 - index] = JSON.parse(JSON.stringify(item));
          });
          bids.forEach((item, index) => {
            this.bbBids[index] = JSON.parse(JSON.stringify(item));
          });
          this.bbAsks.map(item => {
            item.price = formatAmount(`${item.price}`, '', this.setBazDeal.toSymbol);
            // item.price = (Math.floor(item.price * 10000) / 10000).toFixed(4);
            item.count = formatAmount(`${item.count}`, '', this.setBazDeal.symbol);
          });
          if(this.selIndex == 0){
            this.xjPrice = this.bbAsks[6] ? this.bbAsks[6].price : '';
          }
          this.selIndex ++;
        }
        this.isLoading = false;
        return;
      }, () => {
        this.isLoading = false;
      });
    },
    myOrderTicket(){
      this.isLoading = true;
      this.myOrderConfig.start = this.start;
      this.myOrderConfig = {
        ...this.myOrderConfig,
        ...this.setBazDeal
      };
      getMyorderTicket(this.myOrderConfig).then(data => {
          data.list.map(item => {
            let showTotalCount = item.direction == 0 && item.type == 0;
            item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
            item.price = item.type == 0 ? '市价' : formatAmount(`${item.price}`, '', item.toSymbol);
            item.totalCount = showTotalCount ? '-' : (formatAmount(`${item.totalCount}`, '', item.symbol));
            item.tradedCount = formatAmount(`${item.tradedCount}`, '', item.symbol)
          });
          if (data.totalPage <= this.start) {
            this.hasMore = false;
          }
          this.myOrderData = [...this.myOrderData, ...data.list];
          this.start ++;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
    },
    realTimeData(){
      // 实时成交数据
      this.realTimeConfig = {
        ...this.realTimeConfig,
        ...this.setBazDeal
      }
      getRealTimeData(this.realTimeConfig).then(data => {
        if(data.list.length > 0){
          this.bb_zxj = formatAmount(`${data.list[0].tradedPrice}`, '', data.list[0].toSymbol);
        }else{
          this.bb_zxj = 0;
        }
      });
    },
    buy() {
      this.downConfig.direction = '0';
      this.show1 = true;
      this.xjPrice = '';
      this.wetNumber = '';
      if(this.downConfig.type == '1'){
        this.xjPrice = this.bbAsks[6] ? this.bbAsks[6].price : '';
      }
    },
    sell() {
      this.downConfig.direction = '1';
      this.show1 = false;
      this.xjPrice = '';
      this.wetNumber = '';
      if(this.downConfig.type == '1'){
        this.xjPrice = this.bbBids[0] ? formatAmount(this.bbBids[0].price, '', this.setBazDeal.toSymbol) : '';
      }
    },
    //选择市价或是限价
    bbDealType(){
      if(this.downConfig.type == '0'){
        this.xjPrice = '';
      }
    },
    showHisto() {
      this.show3 = true;
      this.$router.push('trading-historyEntrust');
    },
    showCurr() {
      this.show3 = false;
    },
    showTwo() {
      this.show2 = false;
    },
    downClickFn(){
      // 买入X
      if(!this.isLogin){
        this.textMsg = this.$t('common.qdlhcz');
        this.$refs.toast.show();
        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
        return;
      }
      this.isLoading = true;
      if(this.downConfig.type == '1'){
        this.downConfig.price = formatMoneyMultiply(`${this.xjPrice}`, '', this.setBazDeal.toSymbol);
        if(this.xjPrice && this.xjPrice > 0 && this.wetNumber && this.wetNumber > 0){
          this.downConfig = {
            ...this.downConfig,
            ...this.setBazDeal
          };
          this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.symbol);
          downBBOrder(this.downConfig).then(data => {
            this.isLoading = false;
            this.textMsg = this.$t('common.xdcg');
            this.$refs.toast.show();
            this.xjPrice = '';
            this.wetNumber = '';
            this.hasMore = true;
            this.start = 1;
            this.myOrderData = [];
            this.myOrderTicket();
          }, () => {
            this.isLoading = false;
          });
        }else if(this.xjPrice == ''){
          this.textMsg = this.$t('common.jg') + this.$t('trading.bbDepth.bkbwl');
          this.$refs.toast.show();
          this.isLoading = false;
        }else if(this.wetNumber == ''){
          this.textMsg = this.$t('common.sl') + this.$t('trading.bbDepth.bkbwl');
          this.$refs.toast.show();
          this.isLoading = false;
        }
      }else{
        this.downConfig.price = '';
        if(this.wetNumber && this.wetNumber > 0){
          this.downConfig = {
            ...this.downConfig,
            ...this.setBazDeal
          };
          if(this.downConfig.direction == '0'){
            if(this.show1){
              this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.toSymbol);
            }else{
              this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.symbol);
            }
          }else{
            this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.symbol);
          }
          downBBOrder(this.downConfig).then(data => {
            this.isLoading = false;
            this.textMsg = this.$t('common.xdcg');
            this.$refs.toast.show();
            this.xjPrice = '';
            this.wetNumber = '';
          }, () => {
            this.isLoading = false;
          });
        }else if(this.wetNumber == ''){
          this.textMsg = this.$t('common.sl') + this.$t('trading.bbDepth.bkbwl');
          this.$refs.toast.show();
          this.isLoading = false;
        }
      }
    },
    changeMain(){
      let target = event.target;
      if(target.classList.contains('jj')){
        // 简介
        this.tShow = '4';
      }
      if(target.classList.contains('gd')){
        // 挂单
        this.tShow = '2';
      }
      if(target.classList.contains('cj')){
        // 成交
        this.tShow = '1';
      }
      if(target.classList.contains('sd')){
        // 深度图
        this.tShow = '3';
      }
    },
    qrLength(){
      let numLeft = this.xjPrice.split('.')[0];
      let numRight = this.xjPrice.split('.')[1];
      if(numRight){
        if(numRight.length > 8){
          this.textMsg = this.$t('trading.bbDepth.xsbdy');
          this.$refs.toast.show();
          numRight = numRight.substring(0, 8);
          this.xjPrice = numLeft + '.' + numRight;
        }
      }
    },
    repealOrder(code){  // 撤销委托单
      this.isLoading = true;
      repOrder(code).then(data => {
        this.textMsg = this.$t('common.czcg');
        this.$refs.toast.show();
        this.isLoading = false;
        setTimeout(() => {
          this.hasMore = true;
          this.start = 1;
          this.myOrderData = [];
          this.myOrderTicket();
        }, 1500);
      }, () => {
        this.isLoading = false;
      })
    },
    selectAsksPrice(index){  // 卖盘选中
      if(this.show1){
        this.xjPrice = this.bbAsks[index] ? this.bbAsks[index].price : '0';
      }
    },
    selectBidsPrice(index){  // 买盘选中
      if(!this.show1){
        this.xjPrice = this.bbBids[index] ? this.bbBids[index].price : '0';
      }
    },
    formatAmount(money, len, coin){
      return formatAmount(money, len, coin);
    },
    // 去买
    toBuy(){
      this.show2 = true;
      this.downConfig.direction = '0';
      this.show1 = true;
      this.xjPrice = '';
      this.wetNumber = '';
      if(this.downConfig.type == '1'){
        this.xjPrice = this.bbAsks[6] ? this.bbAsks[6].price : '';
      }
    },
    // 去卖
    toSell(){
      this.show2 = true;
      this.downConfig.direction = '1';
      this.show1 = false;
      this.xjPrice = '';
      this.wetNumber = '';
      if(this.downConfig.type == '1'){
        this.xjPrice = this.bbBids[0] ? formatAmount(this.bbBids[0].price, '', this.setBazDeal.toSymbol) : '';
      }
    }
  },
  components: {
    Footer,
    Toast,
    Scroll,
    FullLoading,
    TradingSynopsis,
    TradingPutUp,
    TradingClinchadeal,
    TradingDepthMap,
    TVChartContainer
  },
  watch: {  // 监听深度图
    setBazDeal: {
      handler(val, oldVal){
        this.bazDeal = val;
      },
      deep: true
    }
  },
  destroyed() {
    clearInterval(this.handTime);
  },
};
</script>

<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
.trading-wrapper {
  width: 100%;
  padding-bottom: 0.3rem;
  background: #fff;
  font-size: .28rem;
  color: #999;
  overflow: auto;
  .red {
    color: #d53d3d;
  }
  .green {
    color: #0ec55b;
  }
  .black {
    color: #333;
  }
  .gray {
    color: #a0a0a2;
  }

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;    
  }

  .header {
    width: 100%;
    padding: 0 .3rem;
    display: flex;
    justify-content: space-between;
    height: .98rem;
    font: bold .32rem/.98rem PingFangSC-Medium;
    font-size: .32rem;
    color: #333;
    border-bottom: .01rem solid #eee;
    span{
      padding: 0 0.3rem;
    }
    a {
      font-size: .32rem;
      color: #333;
    }
    p {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      .icon {
        width: .24rem;
        height: .15rem;
        background-image: url('./xlhs.png');
        margin-left: .2rem;
      }
      .icon-bai{
        background-image: url('./xlbs.png');
      }
    }

    .icon {
      width: .24rem;
      height: .28rem;
      background-image: url('./k.png');
    }
    .ico1 {
      width: .2rem;
      height: .30rem;
      background-image: url('./fbai.png');
      margin-top: .25rem;
    }
    .cg-bb{
      padding: 0.2rem 0;
    }
  }

  .col-header{
    color: #fff;
    a{
      color: #fff;
    }
    select{
      background-color: transparent;
    }
  }



// 币币交易页面
  .One {
    .top {
      line-height: 1rem;
      height: 1rem;
      width: 100%;
      padding: 0 .1rem;
      border-bottom: .01rem solid #eee;
      font-size: .3rem;
      margin-bottom: .2rem;
      .buy {
        color: #0ec55b;
        padding-bottom: .3rem;
        border-bottom: .04rem solid #0ec55b;
      }
      .sell {
        padding-bottom: .3rem;
        border-bottom: .04rem solid #d53d3d;
      }

      .txt1 {
        color: #0ec55b;
        margin-right: .5rem;
      }

      .txt2 {
        color: #d53d3d;
        margin-right: 0.2rem;
      }

      .txt3 {
        font-size: .26rem;
        color: #999;
        margin-right: .1rem;
      }

      .icon {
        width: .14rem;
        height: .08rem;
        background-image: url('./xjxl.png');
      }
      .txt4, .txt5, .txt6 {
        font-size: .2rem;
        color: #c2c2c2;
      }

      .txt4 {
        margin-right: .4rem;
      }
      .txt6 {
        float: right;
      }
      p{
        padding-left: 0.3rem;
      }
    }

    .main {
      display: flex;
      width: 100%;
      padding: 0 .3rem;
      border-bottom: .2rem solid #f7f7f7;
      .left {
        margin-right: .2rem;
        .he9 {
          width: 2.9rem;
          height: .9rem;
          padding: 0 0.2rem;
          border: .01rem solid #eee;
          display: flex;
          font-size: 0.26rem;
          justify-content: space-between;
          line-height: .9rem;
          input[attr="placeholder"] {
            color: #999;
          }
          input {
            width: 85%;
            height: .87rem;
            font-size: .28rem;
            line-height: .87rem;
          }
          span{
            white-space: nowrap;
          }
          .he-jye{
            display: inline-block;
            max-width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .no-bor{
          border: none;
        }
        .mb20 {
          margin-bottom: .2rem;
        }
        .text2 {
          margin: .18rem 0 .28rem;
          display: flex;
          justify-content: space-between;
          border: none;
          font-size: .2rem;
          color: #999;
          line-height: .2rem;
        }
        button {
          width: 100%;
          height: .8rem;
          background: #d53d3d;
          font-size: .34rem;
          color: #fff;
          margin: .3rem 0 .2rem;
        }
        .sell {
          background: #0ec55b;
        }
        .btn {
          border-top: none;
        }
      }
      .right {
        width: 100%;
        .one {
          .text1 {
            font-size: .2rem;
            color: #484848;
            line-height: .55rem;
            span{
              text-align: center;
              width: 41%;
              display: inline-block;
            }
            .txt1 {
              display: inline-block;
              width: .6rem;
            }
            .txt3 {
              float: right;
            } 
          }
        }
        .middle {
          width: 100%;
          display: flex;
          justify-content: space-between;         
          margin: .36rem 0; 
          .icon {
            width: .24rem;
            height: .24rem;
            background-image: url('./z_huan.png');
          }
        }
      }
    }
    .max-len{
      max-width: 2.1rem;
      margin-left: 0.05rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .max-len_r{
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      word-spacing: normal;
      font-size: 0.26rem;
      padding-left: 0.1rem;
    }

    .entrust {
      width: 100%;
      padding: 0 .3rem;
      margin-bottom: .96rem;
      .tabs {
        line-height: .8rem;
        display: flex;
        justify-content: space-between;
        .current {
          color: #333;
        }
        .history {
          .icon {
            width: .25rem;
            height: .28rem;
            background-image: url('./ls.png');
            vertical-align: middle;
            margin-right: .12rem;
          }
        }
      }
      .history-main {
        color: #98999c;
        text-align: center;
        .icon {
          width: 1.64rem;
          height: .96rem;
          background-image: url('./zwdata.png');
          margin: .54rem auto .22rem;
        }
        p {
          padding-bottom: .68rem;
        }
      }

      .current-history {
        width: 100%;
        height: 5rem;
        overflow: scroll;
        .list {
          width: 100%;
          padding: .4rem 0;
          border-top: .01rem solid #e5e5e5;
          .text1 {
            padding-bottom: .4rem;
            .green {
              margin-right: .36rem;
            }
            .red {
              float: right;
            }
            .red1{
              color: #d53d3d;
            }
          }
          .text2 {
            display: flex;
            justify-content: space-between;
            font-size: .24rem;
            .black {
              font-size: .28rem;
              padding-top: .2rem;
            }
            .txt1 {
              text-align: left;
            }
            .txt2 {
              text-align: center;
            }
            .txt3 {
              text-align: right;
            }
          }
        }
      }
    }
  }

// K线图页面
  .Two{
    width: 100%;
    font-size: .32rem;
    color: #fff;
    .top-mian {
      width: 100%;
      padding: 0 .3rem;
      background: #1c2b3f;
      .top {
        height: .3rem;
        display: flex;
        justify-content: space-between;
        .ico2 {
          width: .24rem;
          height: .15rem;
          background-image: url('./xlbs.png');
          margin-left: .2rem;
          margin-bottom: .05rem;
        }
        .ico3 {
          width: .28rem;
          height: .27rem;
          background-image: url('./xxbs.png');
          margin-top: .25rem;
        }
      }
      .text1 {
        padding-bottom: .2rem;
        .txt1 {
          margin-right: .21rem;
        }
        .txt3 {
          font-size: .42rem;
          font-weight: bold;
        }
        .txt4 {
          margin-left: .3rem;
          font-weight: bold;
        }
      }
      .text2, .text3{
        display: flex;
        padding-bottom: .2rem;
        p {
          flex: 1;
          font-size: .26rem;
          .gray {
            margin-right: .25rem;
            font-size: .24rem;
          }
        }
      }


    }

    .main1 {
      width: 100%;
      background: #1c2b3f;
    }
    .main2 {
      width: 100%;
      margin-bottom: 1.55rem;
      .tabs {
        width: 100%;
        padding: 0 .3rem;
        background: #1c2b3f;
        display: flex;
        line-height: .8rem;
        span {
          font-size: .28rem; 
          color: #fff;
          margin: 0 .35rem;
        }
        .tab-item {
          flex: 1;
          text-align: center;
        }
        .on{
          color: #d53d3d;
          border-bottom: .03rem solid #d53d3d;
        }
        
      }
      .foot {
        width: 100%;
        position: fixed;
        bottom: .96rem;
        display: flex;
        .buy {
          background: #d53d3d;
        }
        .sell {
          background: #0ec55b;
        }
        button {
          flex: 1;
          height: .9rem;
          font-size: .32rem;
          color: #fff;
        }
      }
      

    }
  }
}

.back-wrapper{
  background-color: #172b3f;
  .header{
    border-bottom: 0;
  }
}

</style>
