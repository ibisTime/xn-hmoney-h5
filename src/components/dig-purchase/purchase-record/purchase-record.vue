<template>
  <div class="purchase-record">
    <div class="warrep">
      <Scroll
          ref="scroll"
          :data="list"
          :hasMore="hasMore"
          v-show="list.length > 0"
          @pullingUp="myPurchaseRecord"
        >
          <ul class="pur_record_ul">
            <li class="li_single" v-for="(item, index) in list" :key="`record_${index}`">
              <div class="single_head">
                <div class="s_h_left">
                  <img class="s_h_left_img" :src="item.symbolIcon" alt="">
                  <span class="s_h_left_sp">{{item.symbol}}</span>
                </div>
                <div class="s_h_right">
                  申购时间：{{item.buyDatetime}}
                </div>
              </div>
              <div class="single_con">
                <div class="s_c_left">
                  <h5 class="s_c_h5">{{item.amount}} <span>{{item.symbol}}</span></h5>
                  <p>申购总量</p>
                </div>
                <div class="s_c_right">
                  <h5 class="s_c_h5">{{item.payAmount}} <span>TWT</span></h5>
                  <p>支付</p>
                </div>
              </div>
            </li>
          </ul>
      </Scroll>
      <div class="no-data" :class="{'hidden': list.length > 0}">
        <img src="./wu.png" />
        <p>暂无记录</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { setTitle, formatDate, formatAmount } from "common/js/util";
  import Scroll from 'base/scroll/scroll';
  import {myPurchaseRecord} from 'api/homeDig';
  export default {
    data() {
      return {
        list: [],
        params: {
          start: 1,
          limit: 20
        },
        hasMore: true
      }
    },
    created() {
      setTitle('申购记录');
      this.myPurchaseRecord();
    },
    methods: {
      myPurchaseRecord() {
        myPurchaseRecord(this.params).then(data => {
          data.list.forEach(item => {
            item.amount = formatAmount(item.amount, 4, item.symbol);
            item.payAmount = formatAmount(item.payAmount, 4, item.toSymbol);
            item.buyDatetime = formatDate(item.buyDatetime, 'yyyy-MM-dd hh:mm:ss');
            item.symbolIcon = PIC_PREFIX + item.symbolIcon;
          });
          if (data.totalPage <= this.params.start) {
            this.hasMore = false;
          }
          this.list = [...this.list, ...data.list];
          this.params.start ++;
        });
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  .purchase-record{
    position: relative;
    height: 100%;
    background-color: #FAFAFA;
    .warrep{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
    .pur_record_ul{
      padding: 0.5rem 0.3rem;
      .li_single{
        padding: 0.1rem 0.3rem 0.4rem;
        background-color: #fff;
        margin-bottom: 0.3rem;
        box-shadow: 0 0.08rem 0.16rem 0 #EBEBEB;
        .single_head{
          border-bottom: 1px solid #F0F0F0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
          height: 0.9rem;
          .s_h_left{
            display: flex;
            align-items: center;
            .s_h_left_img{
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 100%;
            }
            .s_h_left_sp{
              font-size: 0.28rem;
              color: #333333;
              margin-left: 0.15rem;
            }
          }
          .s_h_right{
            color: #999999;
            font-size: 0.24rem;
          }
        }
        .single_con{
          display: flex;
          .s_c_left{
            width: 50%;
            border-right: 1px solid #D8D8D8;
          }
          .s_c_right{
            margin-left: 0.3rem;
          }
          .s_c_h5{
            color: #333333;
            font-size: 0.28rem;
            margin-bottom: 0.16rem;
            span{
              color: #666;
            }
          }
          p{
            color: #999;
            font-size: 0.24rem;
          }
        }
      }
    }
  }
</style>
