<template>
  <div class="market">
    <div class="market_box">
      <div class="header">
        <category-scroll
          :currentIndex="currentIndex"
          :categorys="orderTypeList"
          @select="selectCategory"
        />
      </div>
      <div class="con_header">
        <p>币种名称</p>
        <p>
          最新价
        </p>
        <p>涨跌幅</p>
      </div>
      <div class="container" v-show="tradingData.length">
        <div class="wrapper">
          <Scroll :pullUpLoad="null">
            <div
              class="mar_single"
              v-for="item in tradingData"
              :key="`t_${item.id}`"
              @click="() => {
              toTradingView({symbol: item.symbol, toSymbol: item.referCurrency})
            }"
            >
              <div class="sing_left">
                <p class="li_head">{{item.symbol}}/<span>{{item.referCurrency}}</span></p>
                <div class="s_l_p">24H <span>{{item.volume ? (Math.floor(item.volume * 10000) / 10000).toFixed(4) : '0.0000'}}</span></div>
              </div>
              <div class="sing_mid">
                <p class="li_head">{{(Math.floor(item.lastPrice * 10000) / 10000).toFixed(4)}}</p>
                <p>≈ {{currency === 'CNY' ? '￥' + (item.lastPriceCny ? (Math.floor(item.lastPriceCny * 100) / 100).toFixed(2) : '0.00') : item.lastPriceUsd ? '$' + (Math.floor(item.lastPriceUsd * 100) / 100).toFixed(2) : '0.00'}}</p>
              </div>
              <div class="sing_right">
              <span
                :class="item.percent24h >= 0 ? 'up_p' : 'dw_p'"
              >
                {{item.percent24h | percent24h}}
              </span>
              </div>
            </div>
          </Scroll>
        </div>
      </div>
      <div class="no-data" :class="{'hidden': tradingData.length > 0}">
        <img src="./wu.png"/>
        <p>暂无数据</p>
      </div>
      <full-loading v-show="isLoading"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import categoryScroll from 'base/category-scroll/category-scroll';
  import Scroll from 'base/scroll/scroll';
  import Footer from 'components/footer/footer';
  import fullLoading from 'base/full-loading/full-loading';
  import {tradingOnApi, ownerTradingApi, queryPlateList} from 'api/tradingOn';

  export default {
    data() {
      return {
        orderTypeList: [
          {
            key: 'm_btn0',
            value: '自选'
          }, {
            key: 'm_btn1',
            value: '全部'
          }
        ],
        tradingData: [],
        currentIndex: 0,
        params: {
          start: 1,
          limit: 10
        },
        isLoading: true,
        currency: '',
        isFirst: true
      }
    },
    created() {
      this.$set(document, 'title', '行情');
      this.currency = sessionStorage.getItem('WALLET_CURRY') || 'CNY';
      queryPlateList().then(data => {
        if (Array.isArray(data)) {
          const list = data.map(item => ({
            key: item.id,
            value: item.name
          }));
          this.orderTypeList = [...this.orderTypeList, ...list];
        }
      });
      this.ownerTrading();
    },
    methods: {
      ownerTrading() {
        ownerTradingApi().then(data => {
          this.isLoading = false;
          this.tradingData = data;
          if(data.length === 0 && this.isFirst) {
            this.currentIndex = 1;
            this.isFirst = false;
            tradingOnApi().then(data => {
              this.isLoading = false;
              this.tradingData = data;
            }).catch(() => {
              this.isLoading = false;
            });
          }
        }).catch(() => {
          this.isLoading = false;
        });
      },
      selectCategory(index, key) {
        this.currentIndex = index;
        this.isLoading = true;
        if(index === 0) {
          this.ownerTrading();
        }else if(index === 1) {
          tradingOnApi().then(data => {
            this.isLoading = false;
            this.tradingData = data;
          }).catch(() => {
            this.isLoading = false;
          });
        }else {
          tradingOnApi({plateId: key}).then(data => {
            this.isLoading = false;
            this.tradingData = data;
          }).catch(() => {
            this.isLoading = false;
          });
        }
      },
      toTradingView(obj) {
        this.$router.push(`/trading?symbol=${obj.symbol}&toSymbol=${obj.toSymbol}`);
      }
    },
    filters: {
      percent24h(v) {
        if(!v) {
          return '0.00%';
        }
        return (Math.floor(v * 10000) / 100).toFixed(2) + '%';
      }
    },
    components: {
      Footer,
      categoryScroll,
      fullLoading,
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
  .market {
    background-color: #fff;
    height: 100%;
  }
  .market_box{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .header {
    height: 0.8rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    font-size: 0.32rem;
    color: #999999
  }
  .con_header {
    background-color: #F0F0F0;
    color: #999;
    display: flex;
    padding: 0.14rem 0.3rem;
    font-size: 0.24rem;
    justify-content: space-between;
    .h_pic {
      margin-right: 0.3rem;
    }
  }

  .container {
    position: relative;
    flex: 1;
    .wrapper{
      position: absolute;
      z-index: 10;
      top: 0rem;
      bottom: 0rem;
      left: 0;
      right: 0;
      overflow: auto;
      padding: 0 0.3rem;
    }
    .mar_single {
      padding: 0.22rem 0;
      display: flex;
      border-bottom: 1px solid #E6E6E6;
      align-items: center;
      .sing_left {
        flex: 1;
        .s_l_p{
          font-size: 0.26rem;
          span{
            font-size: 0.3rem;
          };
        }
      }
      .sing_mid {
        flex: 1;
        text-align: center;
      }
      .sing_right {
        flex: 1;
        text-align: right;
        height: 0.8rem;
        span {
          display: inline-block;
          width: 1.6rem;
          height: 0.7rem;
          line-height: 0.7rem;
          font-size: 0.32rem;
          color: #fff;
          vertical-align: super;
          text-align: center;
          border-radius: 0.06rem;
        }
        .up_p {
          background-color: #28BE67;
        }
        .dw_p {
          background-color: #C93D3D;
        }
      }
      .li_head {
        font-style: 'Helvetica Neue Medium';
        font-size: 0.32rem;
        margin-bottom: 0.15rem;
        color: #333;
        font-weight: 500;
        span {
          font-size: 0.26rem;
          color: #666;
        }
      }
      p {
        font-size: 0.3rem;
        color: #666;
      }
    }
  }
</style>
