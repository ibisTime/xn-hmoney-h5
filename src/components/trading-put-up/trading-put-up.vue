<template>
  <div class="put-up-wrapper" @click.stop>
     <div class='main'>
       <p class='title1'>
         <span>买盘20档</span>
         <span>卖盘20档</span>
       </p>
        <div class='title2'>
          <p class='tit1'>
            <span>数量({{setBazDeal.symbol}})</span>
            <span>价格({{setBazDeal.toSymbol}})</span>
          </p>
          <p class='tit2'>
            <span>价格({{setBazDeal.toSymbol}})</span>
            <span>数量({{setBazDeal.symbol}})</span>
          </p>
        </div>
       <div class='content'>
        <div class='left'>
          <p v-for="(item, index) in bbAsks" :key="index">
            <span class='white'>{{item ? item.count : '--'}}</span>
            <span class='red'>{{item ? item.price : '--'}}</span>
          </p>
        </div>
        <div class='right'>
          <p v-for="(item, index) in bbBids" :key="index">
            <span class='green'>{{item ? item.price : '--'}}</span>
            <span class='white'>{{item ? item.count : '--'}}</span>
          </p>
        </div>
       </div>
     </div>
  </div>
</template>
<script>
import { formatAmount } from "common/js/util";
import { getHandicapData } from 'api/bb';
// import Scroll from 'base/scroll/scroll';
  export default {
    props: {
      bazDeal: {
        type: Object,
        default(){
          return {};
        }
      }
    },
    data(){
      return {
        setBazDeal: {},
        bbAsks: '',
        bbBids: ''
      }
    },
    methods: {
      handicapData(){
      // 查询盘口
        getHandicapData(this.setBazDeal).then(data => {
          this.bbAsks = [];        // 卖盘
          this.bbBids = [];        // 买盘
          this.bbAsks.length = 20;
          this.bbBids.length = 20;
          let bids = data.bids.sort((a, b) => (b - a));
          if(data.bids.length > 0 || data.asks.length > 0){
            data.asks.forEach((item, index) => {
              this.bbAsks[index] = JSON.parse(JSON.stringify(item));
            });
            bids.forEach((item, index) => {
              this.bbBids[index] = JSON.parse(JSON.stringify(item));
            });
            this.bbAsks.map(item => {
              item.price = formatAmount(`${item.price}`, '', this.setBazDeal.toSymbol);
              item.price = (Math.floor(item.price * 10000) / 10000).toFixed(4);
              item.count = formatAmount(`${item.count}`, '', this.setBazDeal.symbol);
              item.count = (Math.floor(item.count * 10000) / 10000).toFixed(4);
            });
            this.bbBids.map(item => {
              item.price = formatAmount(`${item.price}`, '', this.setBazDeal.toSymbol);
              item.price = (Math.floor(item.price * 10000) / 10000).toFixed(4);
              item.count = formatAmount(`${item.count}`, '', this.setBazDeal.symbol);
              item.count = (Math.floor(item.count * 10000) / 10000).toFixed(4);
            });
          }
          return;
        });
      }
    },
    components: {
      // Scroll
    },
    watch: {
      bazDeal: {
        handler(val, oldVal){
            this.setBazDeal = val;
            this.handicapData();
        },
        deep: true
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

.put-up-wrapper {
  width: 100%;
  background: #172432;
  font-size: .28rem;
  color: #ccc;
  line-height: .35rem;
  padding-bottom: 0.5rem;
  .red {
    color: #d53d3d;
  }
  .green {
    color: #0ec55b;
  }
  .white {
    color: #fff;
  }

  .main {
    .title1 {
      width: 100%;
      padding: 0 .3rem;
      display: flex;
      span {
        flex: 1;
        text-align: center;
        font-size: .28rem; 
        line-height: .8rem;
        color: #fff;
      }
    }
    .title2 {
      display: flex;
      justify-content: space-around;
      width: 100%;
      line-height: .6rem;
      color: #fff;
      p{
        width: 50%;
        display: flex;
        justify-content: space-around;
        span{
          font-size: 0.2rem;
        }
      }
      .tit1 {    
        background: #d53d3d;
      }
      .tit2 {
        background: #0ec55b;
      }
    }

    .content {
      width: 100%;
      height: 7rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: auto;
      font-size: .28rem;
      display: flex;
      .left {
        flex: 1;
        p {
          padding:0 .05rem 0 .3rem;
          display: flex;
          justify-content: space-around;
          line-height: .55rem;
          border-bottom: .01rem solid #1f2c3f;
        }
      }
      .right {
        flex: 1;
        p {
          padding:0 .3rem 0 .05rem;
          display: flex;
          justify-content: space-around;
          line-height: .55rem;
          border-bottom: .01rem solid #1f2c3f;
        }
      }


    }
  }


}
</style>
