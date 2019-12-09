<template>
    <!-- K线图 -->
      <div class='Two' :style="{paddingTop: origin === 'APP' ? '0.2rem' : ''}">
        <div class="top-mian">
          <p class='text1'>
            <span
              class='txt3'
              :class="+gkdsList.percent24h < 0 ? 'red' : 'green'"
            >
              {{ bb_zxj > 0 ? (Math.floor(bb_zxj * 10000) / 10000).toFixed(4) : '0.0000' }}
            </span>
            <span
              class='txt4'
              :class="+gkdsList.percent24h < 0 ? 'red' : 'green'"
            >
              ≈ {{toSyMid > 0 ? (Math.floor(toSyMid * 100) / 100).toFixed(2) : '0.00'}} {{currency}}
            </span>
          </p>
          <div class='text2'>
            <p>
              <span class='gray txt1'>
                {{$t('trading.bbDepth.zf')}}
              </span>
              <span class='txt2' :class="+gkdsList.percent24h < 0 ? 'red' : 'green'">
                {{gkdsList.percent24h}} %
              </span>
            </p>
            <p>
              <span class='gray'>
                {{$t('trading.bbDepth.zg')}}
              </span>
              <span>
                {{gkdsList ? gkdsList.high : '0.0000'}}
              </span>
            </p>
          </div>
          <div class='text3'>
            <p>
              <span class='gray'>24h </span>
              <span>{{gkdsList ? gkdsList.volume ? gkdsList.volume : '0.0000' : '0.0000'}}</span>
            </p>
            <p>
              <span class='gray'>{{$t('trading.bbDepth.zd')}}</span>
              <span>{{gkdsList ? gkdsList.low : '0.0000'}}</span>
            </p>
          </div>
        </div>
        <!-- k线图部分 -->
        <div class='main1'>
          <TVChartContainer :locale="locale" :setBazDeal="bazDeal"/>
        </div>

        <!-- 主要内容区 -->
        <div class='main2' :style="{paddingBottom: origin === 'H5' ? '0.98rem' : ''}">
          <div class='tabs' @click="changeMain">
            <span class='tab-item cj' :class="{'on': tShow === '1'}">成交</span>
            <span class='tab-item gd' :class="{'on': tShow === '2'}">挂单</span>
            <span class='tab-item sd' :class="{'on': tShow === '3'}">深度图</span>
            <span class='tab-item jj' :class="{'on': tShow === '4'}">简介</span>
          </div>
          <TradingClinchadeal v-show="tShow === '1'" :bazDeal="bazDeal" :gkdsList="gkdsList"/>
          <TradingPutUp v-show="tShow === '2'" :bazDeal="bazDeal" :gkdsList="gkdsList"/>
          <TradingDepthMap v-show="tShow === '3'" :bazDeal="bazDeal" :gkdsList="gkdsList"/>
          <TradingSynopsis v-show="tShow === '4'" :bazDeal="bazDeal" :gkdsList="gkdsList"/>
        </div>
      </div>
</template>

<script>
import TradingSynopsis from 'components/trading-synopsis/trading-synopsis';
import TradingPutUp from 'components/trading-put-up/trading-put-up';
import TradingClinchadeal from 'components/trading-clinchadeal/trading-clinchadeal';
import TradingDepthMap from 'components/trading-depth-map/trading-depth-map';
import TVChartContainer from 'components/TVChartContainer/TVChartContainer';
import {selectedTradingApi} from 'api/tradingOn';
import { mapGetters } from 'vuex';
import {
    getLangType,
  } from "common/js/util";
export default {
    data() {
        return {
            bb_zxj: '',            // 最新价
            symbolData: {},
            handTime: '',
            gkdsList: {},           // 高、低、涨幅
            selIndex: 0,
            toSyMid: 0,
            bazDeal: {},
            tShow: '1',
            locale: getLangType(),
            tradingTime: null,
            origin: 'H5',
            currency: ''
        }
    },
    props: {
        setBazDeal: {
            type: Object,
            default: () => ({
                symbol: '',
                toSymbol: ''
            })
        }
    },
    created() {
        this.currency = sessionStorage.getItem('WALLET_CURRY') || 'CNY';
        this.watchAppChange();
    },
    methods: {
      getSelectedTrading() {
        if(this.bazDeal.symbol) {
            selectedTradingApi({
                symbol: this.bazDeal.symbol,
                referCurrency: this.bazDeal.toSymbol
            }).then(data => {
                // 获取涨幅
                this.bb_zxj = data.lastPrice;
                this.toSyMid = this.currency === 'USD' ? data.lastPriceUsd : data.lastPriceCny; // toSymbol换算价
                data.percent24h = (data.percent24h && (data.percent24h * 100).toFixed(2)) || '0.00';
                data.volume = data.volume > 0 ? (Math.floor(data.volume * 10000) / 10000).toFixed(4) : '0.0000';
                data.low = data.low > 0 ? (Math.floor(data.low * 10000) / 10000).toFixed(4) : '0.0000';
                data.high = data.high > 0 ? (Math.floor(data.high * 10000) / 10000).toFixed(4) : '0.0000';
                this.gkdsList = {
                    ...data
                };
            });
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
      watchAppChange() {
          const {symbol, toSymbol, origin, currency} = this.$route.query;
          if(currency) {
              this.currency = currency;
          }
          if(symbol && toSymbol && origin === 'APP') {
              document.body.style.backgroundColor = '#1c2b3f';
              this.origin = origin;
              this.bazDeal = {
                  symbol,
                  toSymbol
              };
              sessionStorage.setItem('setBazDeal', JSON.stringify({
                  id: 0,
                  symbol,
                  toSymbol
              }));
              this.getSelectedTrading();
          }
      }
    },
    components: {
        TradingSynopsis,
        TradingPutUp,
        TradingClinchadeal,
        TradingDepthMap,
        TVChartContainer
    },
    computed: mapGetters([
      'isUpdateMarket'
    ]),
    watch: {
      setBazDeal: {
        handler(val) {
          this.bazDeal = val;
          this.getSelectedTrading();
        },
        deep: true
      },
      isUpdateMarket() {
        this.getSelectedTrading();
      }
    }
}
</script>

<style lang="scss" scoped>
    // K线图页面
    .Two {
        height: 100%;
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
        width: 100%;
        background: #1c2b3f;
        .tabs {
          width: 100%;
          padding: 0 .3rem;
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

      }
    }
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
</style>