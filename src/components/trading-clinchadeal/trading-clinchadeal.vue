<template>
  <div class="clinch-wrapper" @click.stop>
     <div class='main'>
       <p class='title'>
         <span class='left'>成交时间</span>
         <span class="cont">成交价格({{setBazDeal.toSymbol}})</span>
         <span class='right'>成交量({{setBazDeal.symbol}})</span>
       </p>
        <div class="t-box">
          <Scroll 
            ref="scroll"
            :data="realTimeList"
            :hasMore="hasMore"
            v-show="realTimeList.length > 0"
            @pullingUp="realTimeData"
          >
            <p v-for="(item, index) in realTimeList" :key="index">
              <span class='left'>{{item.createDatetime}}</span>
              <span class="cont">{{item.tradedPrice}}</span>
              <span class='right'>{{item.tradedCount}}</span>
            </p>
          </Scroll>
          <div class="no-data" :class="{'hidden': realTimeList.length > 0}">
            <img src="./zwdata.png" />
            <p>暂无数据</p>
          </div>
        </div>
     </div>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import { getRealTimeData } from 'api/bb';
import { formatDate, formatAmount } from 'common/js/util';
  export default {
    data(){
      return {
        hasMore: true,
        start: 1,
        timeConfig: {},
        setBazDeal: {},
        realTimeList: []
      }
    },
    props: {
      bazDeal: {
        type: Object,
        default(){
          return {}
        }
      },
      show2: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      realTimeData(){
        this.timeConfig = {
          start: this.start,
          limit: 10,
          ...this.setBazDeal
        };
        getRealTimeData(this.timeConfig).then(data => {
          data.list.map(item => {
            item.createDatetime = formatDate(item.createDatetime, 'MM-dd hh:mm:ss');
            item.tradedPrice = formatAmount(`${item.tradedPrice}`, '', item.toSymbol);
            item.tradedCount = formatAmount(`${item.tradedCount}`, '', item.symbol);
          });
          if (data.totalPage <= this.start) {
            this.hasMore = false;
          }
          this.realTimeList = [...this.realTimeList, ...data.list];
          this.start ++;
        });
      }
    },
    components: {
      Scroll
    },
    watch: {
      bazDeal: {
        handler(val, oldVal){
            this.setBazDeal = val;
            this.hasMore = true;
            this.start = 1;
            this.realTimeList = [];
            this.realTimeData();
        },
        deep: true
      },
      show2(){
        this.realTimeData();
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

.clinch-wrapper {
  width: 100%;
  background: #172143;
  font-size: .28rem;
  color: #fff;
  line-height: .35rem;

  .main {
    .title {
      font-size: .28rem;
      line-height: .6rem;
      color: #fff;
      border-bottom: .01rem solid #ccc;
    }
    .t-box{
      width: 100%;
      height: 6rem;
      overflow: scroll;
    }
    p {
      width: 100%;
      padding: 0 .3rem;
      padding-top: 0.2rem;
      color: #0ec55b;
      line-height: .55rem;
      border-bottom: .01rem solid #1b2c3f;
      span {
        display: inline-block;
        width: 30%;
        overflow: hidden;
        text-overflow: ellipsis;
        word-spacing: normal;
        // &:nth-of-type(1){
        //   width: 30%;
        // }
        &:nth-of-type(2){
          width: 35%;
        }
      }
      .left {
        text-align: left;
      }
      .cont {
        text-align: center;
        text-indent: .5rem;
      }
      .right {
        text-align: center;
      }

    } 
    .no-data{
      p{
        color: #fff;
      }
    }

  }

}
</style>
