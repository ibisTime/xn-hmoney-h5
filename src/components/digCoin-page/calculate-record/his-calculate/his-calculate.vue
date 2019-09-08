<template>
  <div class="his-calculate">
    <div class="his_wrp">
      <Scroll
        ref="scroll"
        :data="hisRecordList"
        :hasMore="hasMore"
        v-show="hisRecordList.length > 0"
        @pullingUp="queryHistoryRecord"
      >
        <ul class="his_cal_ul">
          <router-link
            class="single_li"
            :to="`calculate-detail?outDatetime=${item.outDatetime}`"
            v-for="(item, index) in hisRecordList"
            :key="`his_record_${index}`"
          >
            <div class="left">
              {{item.outDatetime}}
            </div>
            <div class="right">
              <span>{{item.dayCalculate}}</span>
              <i class="icon icon_right_to"></i>
            </div>
          </router-link>
        </ul>
      </Scroll>
      <div class="no-data" :class="{'hidden': hisRecordList.length > 0}">
        <img src="../wu.png" />
        <p>暂无记录</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { setTitle, formatAmount } from "common/js/util";
  import {queryHistoryRecord} from 'api/homeDig';
  import Scroll from 'base/scroll/scroll';
  export default {
    data() {
      return {
        params: {
          start: 1,
          limit: 10
        },
        hisRecordList: [],
        hasMore: true
      }
    },
    created() {
      setTitle('历史算力');
      this.queryHistoryRecord();
    },
    methods: {
      queryHistoryRecord() {
        queryHistoryRecord(this.params).then(data => {
          data.list.forEach(item => {
            item.dayCalculate = formatAmount(item.dayCalculate, '', 'TWT');
          });
          if (data.totalPage <= this.params.start) {
            this.hasMore = false;
          }
          this.hisRecordList = [...this.hisRecordList, ...data.list];
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
  .his-calculate{
    position: relative;
    height: 100%;
    background-color: #fff;
    .his_wrp{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .his_cal_ul{
      padding: 0.2rem 0.3rem 1rem;
      .single_li{
        border-bottom: 1px solid #E6E6E6;
        display: flex;
        justify-content: space-between;
        padding: 0.34rem 0;
        .left{
          color: #333;
          font-size: 0.24rem;
        }
        .right{
          color: #D53D3D;
          font-size: 0.28rem;
          display: flex;
          align-items: center;
          .icon{
            margin-left: 0.1rem;
            display: inline-block;
            width: 0.14rem;
            height: 0.14rem;
          }
        }
      }
    }
  }
</style>
