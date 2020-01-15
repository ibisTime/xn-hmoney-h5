<template>
  <div class="entrust_details">
    <div class="entrust_top">
      <h5 class="entrust_top_h5">
        <span :class="entrustData.direction === '0' ? 'green' : 'red'">
          {{entrustData.direction === '0' ? '买入' : '卖出'}}
        </span>
        ({{entrustData.symbol}}/{{entrustData.toSymbol}})
      </h5>
      <ul class="entrust_top_ul">
        <li class="entrust__single">
          <p class="entrust__single_h">委托价({{entrustData.toSymbol}})</p>
          <p class="entrust__single_t">{{+entrustData.type === 0 ? '市价' : entrustData.price}}</p>
        </li>
        <li class="entrust__single" style="text-align: center">
          <p class="entrust__single_h">
            委托量({{(entrustData.direction === '0' && entrustData.type === '0') ? entrustData.toSymbol : entrustData.symbol}})
          </p>
          <p class="entrust__single_t">
            {{(entrustData.direction === '0' && entrustData.type === '0') ? entrustData.totalAmount : entrustData.totalCount}}
          </p>
        </li>
        <li class="entrust__single" style="text-align: right">
          <p class="entrust__single_h">成交总额({{entrustData.toSymbol}})</p>
          <p class="entrust__single_t">{{entrustData.tradedAmount}}</p>
        </li>
        <li class="entrust__single">
          <p class="entrust__single_h">成交均价({{entrustData.toSymbol}})</p>
          <p class="entrust__single_t">{{entrustData.avgPrice}}</p>
        </li>
        <li class="entrust__single" style="text-align: center">
          <p class="entrust__single_h">成交量({{entrustData.symbol}})</p>
          <p class="entrust__single_t">{{entrustData.tradedCount}}</p>
        </li>
        <li class="entrust__single" style="text-align: right">
          <p class="entrust__single_h">手续费({{entrustData.direction === '0' ? entrustData.symbol : entrustData.toSymbol}})</p>
          <p class="entrust__single_t">{{entrustData.tradedFee}}</p>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="entrust_d_box">
      <div class="entrust_d_wrapper">
        <Scroll :pullUpLoad="null">
          <ul class="entrust_d_ul">
            <li class="entrust_d_single" v-for="item in entrustDetails" :key="item.code">
              <p class="entrust_d_s_p">
                <span class="d_s_p_left">成交时间</span>
                <span class="d_s_p_right">{{item.createDatetime}}</span>
              </p>
              <p class="entrust_d_s_p">
                <span class="d_s_p_left">成交价</span>
                <span class="d_s_p_right">{{item.tradedPrice}} {{item.toSymbol}}</span>
              </p>
              <p class="entrust_d_s_p">
                <span class="d_s_p_left">成交量</span>
                <span class="d_s_p_right">{{item.tradedCount}} {{item.symbol}}</span>
              </p>
              <p class="entrust_d_s_p">
                <span class="d_s_p_left">手续费</span>
                <span class="d_s_p_right">{{item.tradedFee}} {{item.feeSymbol}}</span>
              </p>
            </li>
          </ul>
        </Scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import {getRealTimeData} from 'api/bb';
  import { formatAmount, setTitle, formatDate } from "common/js/util";
  export default {
    data() {
      return {
        entrustData: {},
        entrustDetails: []
      }
    },
    created() {
      setTitle('交易明细');
      const entrustData = sessionStorage.getItem('entrustData') || '';
      if(entrustData) {
        this.entrustData = JSON.parse(entrustData);
        getRealTimeData({
          start: 1,
          limit: 1000,
          orderCode: this.entrustData.code
        }).then(data => {
          this.entrustDetails = data.list.map(item => ({
            code: item.code,
            symbol: item.symbol,
            toSymbol: item.toSymbol,
            feeSymbol: item.feeSymbol,
            tradedPrice: formatAmount(`${item.tradedPrice}`, '', item.toSymbol),
            tradedCount: formatAmount(`${item.tradedCount}`, '', item.symbol),
            tradedFee: formatAmount(`${item.tradedFee}`, '', item.feeSymbol),
            createDatetime: formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss')
          }));
        });
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  .entrust_details{
    height: 100%;
    background-color: #fff;
    font-family: 'PingFangSC-Medium';
    display: flex;
    flex-direction: column;
  }
  .entrust_top{
    padding: 0.6rem 0.32rem 0.39rem;
    .entrust_top_h5{
      font-size: 0.36rem;
      color: #333333;
      margin-bottom: 0.46rem;
      .red{
        color: #D53D3D;
      }
      .green{
        color: #0EC55B;
      }
    }
    .entrust_top_ul{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .entrust__single{
        width: 33%;
        .entrust__single_h{
          color: #999999;
          font-size: 0.24rem;
          margin-bottom: 0.16rem;
        }
        .entrust__single_t{
          color: #333333;
          font-size: 0.24rem;
        }
        &:nth-child(1) {
          margin-bottom: 0.39rem;
        }
        &:nth-child(2) {
          margin-bottom: 0.39rem;
        }
        &:nth-child(3) {
          margin-bottom: 0.39rem;
        }
      }
    }
  }
  .line{
    height: 0.2rem;
    background-color: #F5F5F5;
  }
  .entrust_d_box{
    flex: 1;
    position: relative;
    font-family: 'PingFangSC-Regular';
    .entrust_d_wrapper{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      overflow: scroll;
      .entrust_d_ul{
        padding: 0.4rem 0.29rem 0;
        color: #999999;
        font-size: 0.24rem;
        .entrust_d_single{
          border-bottom: 0.01rem solid #e5e5e5;
          margin-bottom: 0.3rem;
          .entrust_d_s_p{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.37rem;
            &:last-child{
              margin-bottom: 0.3rem;
            }
          }
        }
      }
    }
  }
</style>
