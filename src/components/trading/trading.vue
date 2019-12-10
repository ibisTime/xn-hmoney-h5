<template>
  <div class="trading-wrapper" :class="{'back-wrapper': !show2}" @click.stop>
    <div class="wrapper" :style="{'background-color': show2 ? '#fff' : 'rgb(28, 43, 63)'}">
      <div class='header' :class="{'col-header': !show2}">
          <span
            v-show="!show2"
            @click="hideShow2"
            style="padding: 0.2rem 0.4rem;margin-left: -0.4rem;"
          >
            <i class='icon ico1'></i>
          </span>
        <p v-show="!isMarket">
          <select name="" class="cg-bb" v-model="symId" @change="changeSymBaz">
            <option :value="symItem.id" v-for="(symItem, index) in symBazList" :key="index">
              {{symItem.symbol}}/{{symItem.toSymbol}}
            </option>
          </select>
          <i class='icon' :class="{'icon-bai': !show2}" style="margin-left: -0.2rem;"></i>
        </p>
        <p v-show="isMarket">{{setBazDeal.symbol}}/{{setBazDeal.toSymbol}}</p>
        <div style="float: right;">
            <span v-show="show2" style="margin-right: -0.3rem;padding: 0.2rem;" @click="showTwo">
              <i class='icon'></i>
            </span>
          <span v-show="!show2" style="margin-right: -0.5rem;padding: 0.2rem 0.4rem;">
              <i class='icon_xx' :class="isAttention ? 'xx_bs' : 'xx_hs'" @click="collectionTrading"></i>
            </span>
        </div>
      </div>

      <div v-show="show2" class='One'>
        <div class="top">
          <div class="left">
            <span @click="buy" :class="[show1? 'txt1 buy' : 'txt1']">{{$t('trading.bbDeal.mr')}}</span>
            <span @click="sell" :class="[!show1? 'txt2 sell' : 'txt2']">{{$t('trading.bbDeal.mc')}}</span>
            <p>
              <select name="" id="" class='txt3' v-model="downConfig.type" @change="bbDealType">
                <option value="1" v-if="langType === 'en'">&nbsp;&nbsp;{{$t('trading.bbDeal.xj')}}</option>
                <option value="1" v-else>{{$t('trading.bbDeal.xj')}}</option>
                <option value="0">{{$t('trading.bbDeal.sj')}}</option>
              </select>
              <i class='icon'></i>
            </p>
          </div>
          <div class="right">
            <span class='txt4'>{{$t('trading.bbDeal.pk')}}</span>
            <span class='txt5'>{{$t('common.jg')}}<br/>({{setBazDeal.toSymbol}})</span>
            <span class='txt6'>{{$t('trading.bbDeal.sl')}}<br/>({{setBazDeal.symbol}})</span>
          </div>
        </div>
        <div class="main">
          <!-- 买入 -->
          <div v-show="show1" class="left">
            <p class='he9'>
              <input
                type="number"
                :placeholder="downConfig.type === '0' ? '以当前最优价格交易' : $t('trading.bbDeal.wtjg')"
                v-model="xjPrice"
                :disabled="downConfig.type === '0'"
                @keyup="qrLength"
              >
              <span class='black'>{{setBazDeal.toSymbol}}</span>
            </p>
            <p class='text2' v-show="downConfig.type === '0'"></p>
            <p class='text2' v-show="downConfig.type === '1'">
              <span class='red'>≈{{bb_zxj > 0 ? (Math.floor((xjPrice * toSyMid / bb_zxj) * 100) / 100).toFixed(2) : '0.00'}}{{referCurrency}}</span>
            </p>
            <p class='he9 mb20'>
              <input type="number" :placeholder="$t('trading.bbDeal.wtsl')" v-model="wetNumber" @keyup="qrLength">
              <span class='black'>{{downConfig.type === '1' ? setBazDeal.symbol : setBazDeal.toSymbol}}</span>
            </p>
            <p class='he9 no-bor' v-show="downConfig.type === '1'">
              <span class="he-jye max-len" style="max-width: 90%;">{{$t('trading.bbDeal.jye')}}：{{(Math.floor((xjPrice * wetNumber) * 10000) / 10000).toFixed(4)}}</span>
              <span class='black'>{{setBazDeal.toSymbol}}</span>
            </p>
            <button class='sell' @click="downClickFn">{{$t('trading.bbDeal.mr')}}{{setBazDeal.symbol}}</button>
            <p class='he9 green'>
              <span>{{$t('trading.bbDeal.ky')}}{{setBazDeal.symbol}}</span>
              <span class="max-len">{{symWallet.kyAmount | symbolToFixed}}</span>
            </p>
            <p class='he9 btn green' v-show="downConfig.type === '1'">
              <span>{{$t('trading.bbDeal.km')}}{{setBazDeal.symbol}}</span>
              <span class="max-len">{{(xjPrice > 0 && toSymWallet.kyAmount) ? (Math.floor((toSymWallet.kyAmount / xjPrice) * 10000) / 10000).toFixed(4) : '0.0000'}}</span>
            </p>
            <p class='he9 btn'>
              <span>{{$t('trading.bbDeal.ky')}}{{setBazDeal.toSymbol}}</span>
              <span class='black max-len'>{{toSymWallet.kyAmount | symbolToFixed}}</span>
            </p>
            <p class='he9 btn'>
              <span>{{$t('trading.bbDeal.dj')}}{{setBazDeal.toSymbol}}</span>
              <span class='black max-len'>{{toSymWallet.frozenAmount}}</span>
            </p>
          </div>
          <!-- 卖出 -->
          <div v-show="!show1" class="left">
            <p class='he9'>
              <input
                type="number"
                :placeholder="downConfig.type === '0' ? '以当前最优价格交易' : $t('trading.bbDeal.wtjg')"
                v-model="xjPrice"
                :disabled="downConfig.type === '0'"
                @keyup="qrLength"
              >
              <span class='black'>{{setBazDeal.toSymbol}}</span>
            </p>
            <p class='text2' v-show="downConfig.type === '0'"></p>
            <p class='text2' v-show="downConfig.type === '1'">
              <span class='red'>≈{{bb_zxj > 0 ? (Math.floor((xjPrice * toSyMid / bb_zxj) * 100) / 100).toFixed(2) : '0.00'}}{{referCurrency}}</span>
            </p>
            <p class='he9 mb20'>
              <input type="number" :placeholder="$t('trading.bbDeal.wtsl')" v-model="wetNumber" @keyup="qrLength">
              <span class='black'>{{setBazDeal.symbol}}</span>
            </p>
            <p class='he9 no-bor' v-show="downConfig.type === '1'">
              <span class="max-len" style="max-width: 90%;">{{$t('trading.bbDeal.jye')}}：{{(Math.floor((xjPrice * wetNumber) * 10000) / 10000).toFixed(4)}}</span>
              <span class='black'>{{setBazDeal.toSymbol}}</span>
            </p>
            <button class='buy' @click="downClickFn">{{$t('trading.bbDeal.mc')}} {{setBazDeal.symbol}}</button>
            <p class='he9 red'>
              <span>{{$t('trading.bbDeal.ky')}}{{setBazDeal.symbol}}</span>
              <span class="max-len">{{symWallet.kyAmount | symbolToFixed}}</span>
            </p>
            <p class='he9 btn red' v-show="downConfig.type === '1'">
              <span>可得{{setBazDeal.toSymbol}}</span>
              <span class="max-len">{{(xjPrice > 0 && symWallet.kyAmount) ? (Math.floor((symWallet.kyAmount * (+xjPrice)) * 10000) / 10000).toFixed(4) : '0.0000'}}</span>
            </p>
            <p class='he9 btn'>
              <span>{{$t('trading.bbDeal.ky')}}{{setBazDeal.toSymbol}}</span>
              <span class='black max-len'>{{toSymWallet.kyAmount | symbolToFixed}}</span>
            </p>
            <p class='he9 btn'>
              <span>{{$t('trading.bbDeal.dj')}}{{setBazDeal.symbol}}</span>
              <span class='black max-len'>{{symWallet.frozenAmount}}</span>
            </p>
          </div>

          <div class="right">
            <div class='one'>
              <p class='text1' v-for="(sellItem, index) in bbAsks" :key="index" @click="selectAsksPrice(index)">
                <span class='red txt1'>{{$t('trading.bbDeal.mai')}}{{7 - index}}</span>
                <span class='txt2'>{{sellItem ? formatAmount(sellItem.price, 4, setBazDeal.toSymbol) : '--'}}</span>
                <span class='txt3'>{{sellItem ? formatAmount(sellItem.count, 4, setBazDeal.symbol) : '--'}}</span>
              </p>
            </div>
            <p class='middle'>
              <span class='red max-len_r'>{{(bb_zxj ? bb_zxj.toFixed(4) : '0.0000')}} ≈ {{toSyMid && (Math.floor(toSyMid * 100) / 100).toFixed(2) + referCurrency}}</span>
              <!-- <i class='icon'></i> -->
            </p>
            <div class='one two'>
              <p class='text1' v-for="(buyItem, index) in bbBids" :key="index" @click="selectBidsPrice(index)">
                <span class='green txt1'>{{$t('trading.bbDeal.m')}}{{index + 1}}</span>
                <span class='txt2'>{{buyItem ? formatAmount(buyItem.price, 4, setBazDeal.toSymbol) : '--'}}</span>
                <span class='txt3'>{{buyItem ? formatAmount(buyItem.count, 4, setBazDeal.symbol) : '--'}}</span>
              </p>
            </div>

          </div>
        </div>
        <div class='entrust' v-show="isLogin">
          <div class='tabs'>
            <p class='current'>当前委托</p>
            <p class='history' @click="showHisto">
              <i class='icon'></i>
              <span>历史</span>
            </p>
          </div>
          <div class='current-history' @touchmove.prevent>
            <div class="history_wp">
              <Scroll
                :pullUpLoad="null"
              >
                <div class='list' v-show="myOrderData.length">
                  <div v-for="(myItem, index) in myOrderData"
                    :key="index"
                    style="padding: 0.4rem 0;border-bottom: 1px solid #F0F0F0;"
                  >
                    <p class='text1'>
                      <span :class='myItem.direction.toString() === "0" ? "green" : "red1"'>
                        {{myItem.direction.toString() === "0" ? '买入' : '卖出'}}
                      </span>
                      <span style="color: #333333; font-weight: 500;">({{myItem.symbol}}/{{myItem.toSymbol}})</span>
                      <span class='red' v-show="(myItem.type.toString() !== '0' && (myItem.status === '0' || myItem.status === '1'))"
                            @click="repealOrder(myItem.code)">{{$t('trading.bbDeal.cx')}}</span>
                    </p>
                    <div class='text2'>
                      <div class='txt1'>
                        <p>{{$t('common.jg')}}({{setBazDeal.toSymbol}})</p>
                        <p class='black'>{{myItem.type.toString() === '0' ? $t('trading.bbDeal.sj') : myItem.price}}</p>
                      </div>
                      <div class='txt2'>
                        <p>{{$t('trading.bbDeal.sl')}}({{myItem.type === '0' ?setBazDeal.toSymbol  : setBazDeal.symbol}})</p>
                        <p class='black'>{{myItem.totalCount}}</p>
                      </div>
                      <div class='txt3'>
                        <p>{{$t('trading.bbDeal.sjcj')}}({{setBazDeal.symbol}})</p>
                        <p class='black'>{{myItem.tradedCount}}</p>
                      </div>
                    </div>
                    <p>成交时间：{{myItem.createDatetime}}</p>
                  </div>
                </div>
                <div class="no-data" :class="{'hidden': myOrderData.length > 0}">
                  <img src="./zwdata.png"/>
                  <p>暂无数据</p>
                </div>
              </Scroll>
            </div>
          </div>
        </div>
      </div>
      <!-- K线图 -->
      <TradingKline v-show="!show2" :setBazDeal="setBazDeal" :referCurrency="referCurrency"/>
    </div>
    <div class='foot' v-show="!show2">
      <button class='sell' @click="toBuy">买入</button>
      <button class='buy' @click="toSell">卖出</button>
    </div>
    <Footer :bgColor="show2 ? '#fff' : '#1c2b3f'" v-show="show2"></Footer>
    <Toast :text="textMsg" ref="toast"/>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
  import {isLogin} from 'common/js/util';
  import Footer from 'components/footer/footer';
  import Toast from 'base/toast/toast';
  import Scroll from 'base/scroll/scroll';
  import noResult from 'base/no-result/no-result';
  import FullLoading from 'base/full-loading/full-loading';
  import TradingSynopsis from 'components/trading-synopsis/trading-synopsis';
  import TradingPutUp from 'components/trading-put-up/trading-put-up';
  import TradingClinchadeal from 'components/trading-clinchadeal/trading-clinchadeal';
  import TradingDepthMap from 'components/trading-depth-map/trading-depth-map';
  import TradingKline from 'components/trading-kline/trading-kline';
  import { mapGetters } from 'vuex';
  import {
    formatAmount,
    setTitle,
    getUserId,
    formatMoneyMultiply,
    formatDate,
    getLangType,
    getUrlParam
  } from "common/js/util";
  import {SOCKET_URL} from 'common/js/config';
  import {wallet, getUser} from 'api/person';
  import {
    getBazaarData,
    getBBExchange,
    getHandicapData,
    downBBOrder,
    getMyorderTicket,
    repOrder
  } from 'api/bb';
  import {selectedTradingApi, isCollectionTrading} from 'api/tradingOn';

  export default {
    data() {
      return {
        langType: getLangType(),
        referCurrency: 'CNY',
        textMsg: '',
        isLoading: false,
        isLogin: false,
        show1: true,
        show2: true,
        history: false,
        tShow: '1',
        xjPrice: '',      // 委托价格
        wetNumber: '',    // 限价-委托数量
        toSyMid: '',
        syMid: '',
        symId: 0,
        setBazDeal: {
          symbol: '',
          toSymbol: ''
        },    // 选中的交易对
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
          limit: '1000',
          userId: getUserId(),
          symbol: '',
          toSymbol: '',
        },
        myOrderData: [],
        bazDeal: {},
        bb_zxj: '',            // 最新价
        symbolData: {},
        handTime: '',
        gkdsList: {},           // 高、低、涨幅
        selIndex: 0,
        locale: getLangType(),
        isAttention: true,
        marketId: '',
        isMarket: false,
        hasMore: true,
        isNeedAuth: false
      };
    },
    created() {
      setTitle('币币交易');
      this.isLoading = true;
      const symbol = getUrlParam('symbol');
      const toSymbol = getUrlParam('toSymbol');
      const symId = getUrlParam('symId');
      this.referCurrency = sessionStorage.getItem('WALLET_CURRY') || 'CNY';
      let params = {};
      if(symbol && toSymbol) {
        if(!symId) {
          params.symbol = symbol;
          params.toSymbol = toSymbol;
          this.show2 = false;
          this.isMarket = true;
        }
        sessionStorage.setItem('setBazDeal', JSON.stringify({
          id: symId || 0,
          symbol,
          toSymbol
        }));
      }
      sessionStorage.removeItem('toBank');
      getBazaarData(params).then(data => {  // 查询交易对
        if(!Array.isArray(data)) {
          return false;
        }
        let setBazDeal = JSON.parse(sessionStorage.getItem('setBazDeal'));
        this.setBazDeal = setBazDeal || {
          id: 0,
          symbol: data[0].symbol,
          toSymbol: data[0].toSymbol
        };
        this.symId = this.setBazDeal.id;
        if (!setBazDeal) {
          sessionStorage.setItem('setBazDeal', JSON.stringify(this.setBazDeal));
        }
        this.getSelectedTrading({
          symbol: this.setBazDeal.symbol,
          referCurrency: this.setBazDeal.toSymbol
        });
        data.forEach((item, index) => {
          this.symBazList.push({
            isNeedAuth: item.isNeedAuth,
            id: index,
            'symbol': item.symbol,
            'toSymbol': item.toSymbol
          });
        });
        if(data[0]) {
          this.isNeedAuth = data[0].isNeedAuth === '1';
        }
        this.handicapData();
        if (getUserId()) {
          this.getUserWalletData();
          this.isLogin = true;
          this.history = true;
          this.myOrderTicket();
        }
      });
    },
    methods: {
      getSelectedTrading(params) {
        selectedTradingApi(params).then(data => {
          // 获取涨幅
          this.isAttention = data.isAttention === '0';
          this.marketId = data.id;
          this.bb_zxj = data.lastPrice;
          this.toSyMid = this.referCurrency === 'USD' ? data.lastPriceUsd : data.lastPriceCny; // toSymbol换算价
          data.percent24h = data.percent24h ? (Math.floor(+data.percent24h * 10000) / 100).toFixed(2) : '0.00';
          data.volume = data.volume > 0 ? (Math.floor(data.volume * 10000) / 10000).toFixed(4) : '0.0000';
          data.low = data.low > 0 ? (Math.floor(data.low * 10000) / 10000).toFixed(4) : '0.0000';
          data.high = data.high > 0 ? (Math.floor(data.high * 10000) / 10000).toFixed(4) : '0.0000';
          this.gkdsList = {
            ...data
          };
        });
      },
      getUserWalletData() {
        // 查询用户资产
        wallet().then(data => {
          if(data.accountList) {
            data.accountList.map(item => {
              item.amount = item.amount > 0 ? formatAmount(item.amount, '', item.currency) : '0.0000';
              item.frozenAmount = item.frozenAmount ? formatAmount(item.frozenAmount, '', item.currency) : '0.0000';
            });
            data.accountList.forEach(item => {
              if (item.currency === this.setBazDeal.symbol) {
                this.symWallet = item;
              }
              if (item.currency === this.setBazDeal.toSymbol) {
                this.toSymWallet = item;
              }
            });
            this.symWallet.kyAmount = (+this.symWallet.amount) - (+this.symWallet.frozenAmount);
            this.toSymWallet.kyAmount = (+this.toSymWallet.amount) - (+this.toSymWallet.frozenAmount);
          }
        });
      },
      changeSymBaz() { // 选择交易对 this.symId
        this.bbAsks = [];
        this.bbBids = [];
        this.xjPrice = '';
        this.selIndex = 0;
        this.symBazList.forEach((item) => {
          if(item.id === this.symId) {
            this.isNeedAuth = item.isNeedAuth === '1';
            this.setBazDeal = {
              id: item.id,
              symbol: item.symbol,
              toSymbol: item.toSymbol
            };
          }
        });
        this.getSelectedTrading({
          symbol: this.setBazDeal.symbol,
          referCurrency: this.setBazDeal.toSymbol
        });
        sessionStorage.setItem('setBazDeal', JSON.stringify(this.setBazDeal));
        this.handicapData();
        if (this.isLogin) {
          this.getUserWalletData();
          this.start = 1;
          this.myOrderData = [];
          this.myOrderTicket();
        }
      },
      handicapData() {
        // 查询盘口
        getHandicapData(this.setBazDeal).then(data => {
          this.bbAsks = [];
          this.bbBids = [];
          this.bbAsks.length = 7;
          this.bbBids.length = 7;
          let asks = data.asks.sort((a, b) => (b - a));
          let bids = data.bids.sort((a, b) => (b - a));
          if (data.bids.length > 0 || data.asks.length > 0) {
            asks.forEach((item, index) => {
              this.bbAsks[6 - index] = JSON.parse(JSON.stringify(item));
            });
            bids.forEach((item, index) => {
              this.bbBids[index] = JSON.parse(JSON.stringify(item));
            });
            if (this.selIndex === 0) {
              this.xjPrice = this.bbAsks[6] ? formatAmount(this.bbAsks[6].price, '', this.setBazDeal.toSymbol) : '';
            }
            this.selIndex++;
          }
          this.isLoading = false;
          return;
        }, () => {
          this.isLoading = false;
        });
      },
      myOrderTicket() {
        this.myOrderConfig.start = this.start;
        this.myOrderConfig = {
          ...this.myOrderConfig,
          ...this.setBazDeal
        };
        getMyorderTicket(this.myOrderConfig).then(data => {
          data.list.map(item => {
            let showTotalCount = item.direction === '0' && item.type === '0';
            item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
            item.price = item.type === '0' ? '市价' : formatAmount(`${item.price}`, '', item.toSymbol);
            item.totalCount = showTotalCount ? formatAmount(`${item.totalCount}`, '', item.toSymbol) : (formatAmount(`${item.totalCount}`, '', item.symbol));
            item.tradedCount = formatAmount(`${item.tradedCount}`, '', item.symbol);
          });
          this.myOrderData = data.list;
          // if (data.totalPage <= this.start) {
          //       this.hasMore = false;
          //   }
          //   this.hisDataList = [...this.hisDataList, ...data.list];
          //   this.start ++;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      },
      collectionTrading() {
        this.isLoading = true;
        if(isLogin()) {
          isCollectionTrading(this.marketId).then(() => {
            this.isLoading = false;
            this.isAttention = !this.isAttention;
            this.textMsg = this.isAttention ? '已移除自选' : '已添加自选';
            this.$refs.toast.show();
          }).catch(() => {
            this.isLoading = false;
          });
        }else {
          this.$router.push('/login');
        }
      },
      buy() {
        this.downConfig.direction = '0';
        this.show1 = true;
        this.xjPrice = '';
        this.wetNumber = '';
        if (this.downConfig.type === '1') {
          this.xjPrice = this.bbAsks[6] ? formatAmount(this.bbAsks[6].price, '', this.setBazDeal.toSymbol) : '';
        }
      },
      sell() {
        this.downConfig.direction = '1';
        this.show1 = false;
        this.xjPrice = '';
        this.wetNumber = '';
        if (this.downConfig.type === '1') {
          this.xjPrice = this.bbBids[0] ? formatAmount(this.bbBids[0].price, 4, this.setBazDeal.toSymbol) : '';
        }
      },
      //选择市价或是限价
      bbDealType() {
        if (this.downConfig.type === '0') {
          this.xjPrice = '';
        }
      },
      showHisto() {
        this.$router.push('trading-historyEntrust?symbol=' + this.myOrderConfig.symbol + '&toSymbol=' + this.myOrderConfig.toSymbol);
      },
      showTwo() {
        this.show2 = false;
        this.isMarket = false;
      },
      hideShow2() {
        if(this.isMarket) {
          this.$router.go(-1);
        } else {
        this.show2 = true;
        this.isMarket = false;
        this.$router.push('/trading');
      }
      },
      downClickFn() {
        // 买入
        if (!this.isLogin) {
          this.textMsg = this.$t('common.qdlhcz');
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.push('/login');
          }, 1500);
          return;
        }
        if(this.isNeedAuth) {
          getUser().then(userDetail => {
            switch(userDetail.identifyStatus) {
              case '0': // 未认证
                this.textMsg = '请先进行实名认证';
                this.$refs.toast.show();
                setTimeout(() => {
                  sessionStorage.setItem('toBank', `trading?symbol=${this.setBazDeal.symbol}&toSymbol=${this.setBazDeal.toSymbol}&symId=${this.symId}`);
                  this.$router.push('/security-idcard');
                }, 1500);
                return;
              case '1': // 已认证
                this.isLoading = true;
                if (this.downConfig.type === '1') {
                  this.downConfig.price = formatMoneyMultiply(`${this.xjPrice}`, '', this.setBazDeal.toSymbol);
                  if (this.xjPrice && this.xjPrice > 0 && this.wetNumber && this.wetNumber > 0) {
                    this.downConfig = {
                      ...this.downConfig,
                      ...this.setBazDeal
                    };
                    this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.symbol);
                    downBBOrder(this.downConfig).then(() => {
                      this.isLoading = false;
                      this.textMsg = this.$t('common.xdcg');
                      this.$refs.toast.show();
                      this.xjPrice = '';
                      this.wetNumber = '';
                      this.start = 1;
                      this.myOrderData = [];
                      this.myOrderTicket();
                    }, () => {
                      this.isLoading = false;
                    });
                  } else if (this.xjPrice === '') {
                    this.textMsg = this.$t('common.jg') + this.$t('trading.bbDepth.bkbwl');
                    this.$refs.toast.show();
                    this.isLoading = false;
                  } else if (this.wetNumber === '') {
                    this.textMsg = this.$t('common.sl') + this.$t('trading.bbDepth.bkbwl');
                    this.$refs.toast.show();
                    this.isLoading = false;
                  }
                } else {
                  this.downConfig.price = '';
                  if (this.wetNumber && this.wetNumber > 0) {
                    this.downConfig = {
                      ...this.downConfig,
                      ...this.setBazDeal
                    };
                    if (this.downConfig.direction === '0') {
                      if (this.show1) {
                        this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.toSymbol);
                      } else {
                        this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.symbol);
                      }
                    } else {
                      this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.symbol);
                    }
                    downBBOrder(this.downConfig).then(() => {
                      this.isLoading = false;
                      this.textMsg = this.$t('common.xdcg');
                      this.$refs.toast.show();
                      this.xjPrice = '';
                      this.wetNumber = '';
                    }, () => {
                      this.isLoading = false;
                    }).catch(() => {
                      this.isLoading = false;
                    });
                  } else if (this.wetNumber === '') {
                    this.textMsg = this.$t('common.sl') + this.$t('trading.bbDepth.bkbwl');
                    this.$refs.toast.show();
                    this.isLoading = false;
                  }
                }
              return;
              case '2': // 认证中
                this.textMsg = '您的实名认证还在审核中，请耐心等待';
                this.$refs.toast.show();
                return;
              return;
              case '3': // 认证失败
                this.textMsg = '您的实名认证不通过，请重新认证';
                this.$refs.toast.show();
                setTimeout(() => {
                  sessionStorage.setItem('toBank', `trading?symbol=${this.setBazDeal.symbol}&toSymbol=${this.setBazDeal.toSymbol}&symId=${this.symId}`);
                  this.$router.push('/security-idcard');
                }, 1500);
              return;
            }
          });
          return;
        }
        this.isLoading = true;
        if (this.downConfig.type === '1') {
          this.downConfig.price = formatMoneyMultiply(`${this.xjPrice}`, '', this.setBazDeal.toSymbol);
          if (this.xjPrice && this.xjPrice > 0 && this.wetNumber && this.wetNumber > 0) {
            this.downConfig = {
              ...this.downConfig,
              ...this.setBazDeal
            };
            this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.symbol);
            downBBOrder(this.downConfig).then(() => {
              this.isLoading = false;
              this.textMsg = this.$t('common.xdcg');
              this.$refs.toast.show();
              this.xjPrice = '';
              this.wetNumber = '';
              this.start = 1;
              this.myOrderData = [];
              this.myOrderTicket();
            }, () => {
              this.isLoading = false;
            });
          } else if (this.xjPrice === '') {
            this.textMsg = this.$t('common.jg') + this.$t('trading.bbDepth.bkbwl');
            this.$refs.toast.show();
            this.isLoading = false;
          } else if (this.wetNumber === '') {
            this.textMsg = this.$t('common.sl') + this.$t('trading.bbDepth.bkbwl');
            this.$refs.toast.show();
            this.isLoading = false;
          }
        } else {
          this.downConfig.price = '';
          if (this.wetNumber && this.wetNumber > 0) {
            this.downConfig = {
              ...this.downConfig,
              ...this.setBazDeal
            };
            if (this.downConfig.direction === '0') {
              if (this.show1) {
                this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.toSymbol);
              } else {
                this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.symbol);
              }
            } else {
              this.downConfig.totalCount = formatMoneyMultiply(`${this.wetNumber}`, '', this.setBazDeal.symbol);
            }
            downBBOrder(this.downConfig).then(() => {
              this.isLoading = false;
              this.textMsg = this.$t('common.xdcg');
              this.$refs.toast.show();
              this.xjPrice = '';
              this.wetNumber = '';
            }, () => {
              this.isLoading = false;
            }).catch(() => {
              this.isLoading = false;
            });
          } else if (this.wetNumber === '') {
            this.textMsg = this.$t('common.sl') + this.$t('trading.bbDepth.bkbwl');
            this.$refs.toast.show();
            this.isLoading = false;
          }
        }
      },
      changeMain() {
        let target = event.target;
        if (target.classList.contains('jj')) {
          // 简介
          this.tShow = '4';
        }
        if (target.classList.contains('gd')) {
          // 挂单
          this.tShow = '2';
        }
        if (target.classList.contains('cj')) {
          // 成交
          this.tShow = '1';
        }
        if (target.classList.contains('sd')) {
          // 深度图
          this.tShow = '3';
        }
      },
      qrLength() {
        if (this.xjPrice) {
          let numLeft = this.xjPrice.toString().split('.')[0];
          let numRight = this.xjPrice.toString().split('.')[1];
          if (numRight) {
            if (numRight.length > 4) {
              this.textMsg = this.$t('trading.bbDepth.xsbdy');
              this.$refs.toast.show();
              numRight = numRight.substring(0, 4);
              this.xjPrice = numLeft + '.' + numRight;
            }
          }
        }
      },
      repealOrder(code) {  // 撤销委托单
        this.isLoading = true;
        repOrder(code).then(data => {
          this.textMsg = this.$t('common.czcg');
          this.$refs.toast.show();
          this.isLoading = false;
          setTimeout(() => {
            this.start = 1;
            this.myOrderData = [];
            this.myOrderTicket();
          }, 1500);
        }, () => {
          this.isLoading = false;
        })
      },
      selectAsksPrice(index) {  // 卖盘选中
        if (this.show1) {
          this.xjPrice = this.bbAsks[index] ? formatAmount(this.bbAsks[index].price, 4, this.setBazDeal.toSymbol) : '';
        }
      },
      selectBidsPrice(index) {  // 买盘选中
        if (!this.show1) {
          this.xjPrice = this.bbBids[index] ? formatAmount(this.bbBids[index].price, 4, this.setBazDeal.toSymbol) : '';
        }
      },
      formatAmount(money, len, coin) {
        return formatAmount(money, len, coin);
      },
      // 去买
      toBuy() {
        document.getElementById('app').scrollTo(0, 0);
        this.show2 = true;
        this.downConfig.direction = '0';
        this.show1 = true;
        this.xjPrice = '';
        this.wetNumber = '';
        if (this.downConfig.type === '1') {
          this.xjPrice = this.bbAsks[6] ? formatAmount(this.bbAsks[6].price, '', this.setBazDeal.toSymbol) : '';
        }
      },
      // 去卖
      toSell() {
        document.getElementById('app').scrollTo(0, 0);
        this.show2 = true;
        this.downConfig.direction = '1';
        this.show1 = false;
        this.xjPrice = '';
        this.wetNumber = '';
        if (this.downConfig.type === '1') {
          this.xjPrice = this.bbBids[0] ? formatAmount(this.bbBids[0].price, 4, this.setBazDeal.toSymbol) : '';
        }
      },
      toOtcFn() {
        sessionStorage.removeItem('coin');
        sessionStorage.setItem('tradeType', '1');
      }
    },
    components: {
      Footer,
      Toast,
      Scroll,
      noResult,
      FullLoading,
      TradingSynopsis,
      TradingPutUp,
      TradingClinchadeal,
      TradingDepthMap,
      TradingKline
    },
    computed: mapGetters([
      'isUpdateMarket',
      'isUpdateSimuorder',
      'isUpdateAccount',
      'isUpdateHandicap'
    ]),
    watch: {  // 监听深度图
      setBazDeal: {
        handler(val) {
          this.bazDeal = val;
        },
        deep: true
      },
      isUpdateMarket() {
        this.getSelectedTrading({
          symbol: this.setBazDeal.symbol,
          referCurrency: this.setBazDeal.toSymbol
        });
      },
      isUpdateSimuorder() {
        this.myOrderTicket();
      },
      isUpdateAccount() {
        this.getUserWalletData();
      },
      isUpdateHandicap() {
        this.handicapData();
      }
    },
    filters: {
      symbolToFixed(v) {
        if(!v) {
          return '0.0000';
        }
        return (Math.floor((v * 10000)) / 10000).toFixed(4);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .trading-wrapper {
    width: 100%;
    height: 100%;
    font-size: .28rem;
    color: #999;
    background-color: #fff;
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
      position: relative;
      width: 100%;
      padding: 0 .3rem 0.2rem;
      height: .98rem;
      font: bold .32rem/.98rem PingFangSC-Medium;
      font-size: .32rem;
      color: #333;
      border-bottom: .01rem solid #eee;
      span {
        padding: 0 0.3rem;
        margin-left: -0.3rem;
      }
      a {
        font-size: .32rem;
        color: #333;
      }
      p {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        .icon {
          width: .24rem;
          height: .15rem;
          background-image: url('./xlhs.png');
          margin-left: .2rem;
        }
        .icon-bai {
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
      .icon_xx{
        display: inline-block;
        width: .3rem;
        height: .3rem;
        background-size: 100% 100%;
      }
      .xx_bs{
        background-image: url('./xxbs.png');
      }
      .xx_hs{
        background-image: url('./xxhs.png');
      }
      .cg-bb {
        padding: 0.2rem 0.1rem;
      }
    }

    .col-header {
      color: #fff;
      background-color: #1c2b3f;
      a {
        color: #fff;
      }
      select {
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
        display: flex;
        .left {
          display: flex;
          width: 50%;
          justify-content: space-between;
          align-items: center;
          margin-right: 0.2rem;
          margin-left: 0.2rem;
        }
        .right {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
        }
        .buy {
          color: #0ec55b;
          border-bottom: .04rem solid #0ec55b;
        }
        .sell {
          border-bottom: .04rem solid #d53d3d;
        }

        .txt1 {
          margin-bottom: 0.04rem;
          color: #0ec55b;
        }

        .txt2 {
          margin-bottom: 0.04rem;
          color: #d53d3d;
        }

        .txt3 {
          font-size: .26rem;
          color: #999;
        }

        .icon {
          width: .14rem;
          height: .08rem;
          background-image: url('./xjxl.png');
        }
        .txt4, .txt5, .txt6 {
          font-size: .2rem;
          color: #c2c2c2;
          display: inline-block;
          line-height: 1.2;
          float: left;
        }

        .txt5, .txt6 {
          text-align: center;
        }
        .txt4 {
          width: 0.6rem;
        }
        p {
          padding-left: 0.8rem;
        }
      }

      .main {
        display: flex;
        width: 100%;
        padding: 0 .3rem;
        border-bottom: .02rem solid #f7f7f7;
        .left {
          margin-right: .2rem;
          width: 50%;
          .he9 {
            height: .9rem;
            padding: 0 0.2rem;
            border: .01rem solid #eee;
            display: flex;
            font-size: 0.22rem;
            justify-content: space-between;
            line-height: .9rem;
            display: flex;
            align-items: center;
            input[attr="placeholder"] {
              color: #999;
            }
            input {
              width: 85%;
              height: .6rem;
              font-size: .26rem;
              line-height: .6rem;
            }
            span {
              white-space: nowrap;
            }
            .he-jye {
              display: inline-block;
              max-width: 85%;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .no-bor {
            border: none;
            padding: 0;
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
            padding-left: 0.2rem;
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
          flex: 1;
          .one {
            .text1 {
              font-size: .18rem;
              color: #484848;
              line-height: .55rem;
              display: flex;
              justify-content: space-between;
              span {
                text-align: center;
                display: inline-block;
              }
              .txt1 {
                display: inline-block;
                width: .6rem;
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
      .max-len {
        max-width: 2.8rem;
        margin-left: 0.05rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .max-len_r {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        word-spacing: normal;
        font-size: 0.26rem;
        padding: 0.1rem 0 0.1rem 0.1rem;
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
            padding-right: 0.3rem;
            padding-left: 0.3rem;
            margin-right: -0.3rem;
            .icon {
              width: .25rem;
              height: .32rem;
              background-image: url('./ls.png');
              vertical-align: middle;
              margin-right: .08rem;
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
          height: 7rem;
          position: relative;
          .history_wp{
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            overflow: hidden;
          }
          .list {
            width: 100%;
            padding: .0rem 0 0.9rem 0;
            border-top: .01rem solid #e5e5e5;
            .text1 {
              padding-bottom: .4rem;
              .green {
                margin-right: .36rem;
              }
              .red {
                float: right;
              }
              .red1 {
                color: #d53d3d;
              }
            }
            .text2 {
              display: flex;
              justify-content: space-between;
              font-size: .24rem;
              margin-bottom: 0.36rem;
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
    .Two {
      font-size: .32rem;
      color: #fff;
      background: #1c2b3f;
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
            font-weight: bold;
          }
        }
        .text2, .text3 {
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
      }
      .main2 {
        padding-bottom: 0.98rem;
        width: 100%;
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
          .on {
            color: #d53d3d;
            border-bottom: .03rem solid #d53d3d;
          }

        }
      }
    }
  }
  .foot {
    width: 100%;
    position: fixed;
    bottom: 0.2rem;
    display: flex;
    padding: 0 0.2rem;
    .buy {
      background: #d53d3d;
    }
    .sell {
      margin-right: 0.2rem;
      background: #0ec55b;
    }
    button {
      flex: 1;
      height: .9rem;
      font-size: .36rem;
      color: #fff;
      border-radius: 0.05rem;
    }
  }
  .back-wrapper {
    background-color: #172b3f;
    .header {
      border-bottom: 0;
    }
  }

</style>
