<template>
  <div class="calculate-detail">
    <div class="header">
      <div class="h_con">
        <div class="h_left">
          <p class="tit">算力数</p>
          <h5 class="txt">{{dayCalculate}}</h5>
        </div>
        <div class="h_right">
          <p class="tit">获取代币</p>
          <h5 class="txt">{{dayPoolAmount}}</h5>
        </div>
      </div>
      <p>{{params.outDatetime}}</p>
    </div>
    <div class="cal_con">
      <h5 class="con_tit">
        <span class="tit_left">算力记录</span>
      </h5>
      <div class="cal_con_box">
        <div class="cal_wrp">
          <Scroll
            ref="scroll"
            :data="recordList"
            :hasMore="hasMore"
            v-show="recordList.length > 0"
            @pullingUp="queryCalculateRecord"
          >
            <ul class="con_ul">
              <li
                class="sing_li"
                v-for="(item, index) in recordList"
                :key="`record_${index}`"
              >
                <div class="sing_left">
                  <h5 class="left_h5">{{item.bizNote}}</h5>
                  <p class="left_p">{{params.outDatetime}}</p>
                </div>
                <div class="sing_right">
                  {{item.calculate}}
                </div>
              </li>
            </ul>
          </Scroll>
          <div class="no-data" :class="{'hidden': recordList.length > 0}">
            <img src="../wu.png" />
            <p>暂无记录</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import { setTitle, formatAmount } from "common/js/util";
  import {ownerCalculateEarnings, queryCalculateRecord} from 'api/homeDig';
  export default {
    data() {
      return {
        params: {
          start: 1,
          limit: 20,
          outDatetime: ''
        },
        recordList: [],
        hasMore: true,
        dayCalculate: '',
        dayPoolAmount: ''
      }
    },
    created() {
      setTitle('算力明细');
      this.params.outDatetime = this.$route.query.outDatetime;
      this.queryCalculateRecord();
      ownerCalculateEarnings(this.params.outDatetime).then(data => {
        this.dayCalculate = data.dayCalculate;
        this.dayPoolAmount = formatAmount(data.dayPoolAmount, '4', 'TWT');
      });
    },
    methods: {
      queryCalculateRecord() {
        queryCalculateRecord(this.params).then(data => {
          if (data.totalPage <= this.params.start) {
            this.hasMore = false;
          }
          this.recordList = [...this.recordList, ...data.list];
          this.params.start ++;
        });
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
  .calculate-detail{
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .header{
      background-image: url('../../image/Mask@2x.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      padding: 0.68rem 0 0.3rem 0;
      text-align: center;
      font-size: 0.24rem;
      color: #FFEEEC;
      .h_con{
        display: flex;
        margin-bottom: 0.44rem;
        .h_left{
          flex: 1;
          border-right: 1px solid #EAEAEA;
        }
        .h_right{
          flex: 1;
        }
        .tit{
          margin-bottom: 0.26rem;
        }
        .txt{
          font-size: 0.48rem;
          color: #fff;
        }
      }
    }
    .cal_con{
      padding: 0.3rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      .cal_con_box{
        flex: 1;
        position: relative;
        .cal_wrp{
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      }
      .con_tit{
        color: #333333;
        font-size: 0.36rem;
        margin-bottom: 0.1rem;
        display: flex;
        justify-content: space-between;
      }
      .con_ul{
        padding-bottom: 1rem;
        .sing_li{
          border-bottom: 1px solid #E6E6E6;
          padding: 0.3rem 0 0.24rem 0;
          display: flex;
          justify-content: space-between;
          font-size: 0.24rem;
          .left_h5{
            color: #333;
            margin-bottom: 0.12rem;
          }
          .left_p{
            color: #999;
          }
          .sing_right{
            display: flex;
            font-size: 0.28rem;
            color: #D53D3D;
            align-items: center;
          }
        }
      }
    }
  }
</style>
