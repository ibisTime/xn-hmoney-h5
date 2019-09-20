<template>
  <div class="outRecord">
    <div class="out_wrp">
      <Scroll
        ref="scroll"
        :data="list"
        :hasMore="hasMore"
        v-show="list.length > 0"
        @pullingUp="getOwnerApplyRecord"
      >
        <ul class="record_ul">
          <li
            class="record_li"
            v-for="(item, index) in list"
            :key="`out_record_${index}`"
          >
            <div class="left">
              <h5>{{item.amount}} {{item.aymbol}}</h5>
              <p>{{item.applyDatetime}}</p>
            </div>
            <div class="right">
              <span :class="item.status === '0' ? 'will_c' : item.status === '2' ? 'refused_c' : ''">{{item.statusName}}</span>
            </div>
          </li>
        </ul>
      </Scroll>
      <div class="no-data" :class="{'hidden': list.length > 0}">
        <img src="../outMine/wu.png" />
        <p>暂无记录</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {ownerApplyRecord} from 'api/homeDig';
  import {getDictList} from 'api/general.js';
  import Scroll from 'base/scroll/scroll';
  import { setTitle, formatDate, formatAmount } from "common/js/util";
  export default {
    data() {
      return {
        params: {
          start: 1,
          limit: 20
        },
        list: [],
        hasMore: true,
        statusObj: {}
      }
    },
    created() {
      setTitle('转账记录');
      getDictList('approve_status').then(data => {
        data.forEach(item => {
          this.statusObj[item.dkey] = item.dvalue;
        });
        this.getOwnerApplyRecord();
      });
    },
    methods: {
      getOwnerApplyRecord() {
        ownerApplyRecord(this.params).then(data => {
          data.list.forEach(item => {
            item.applyDatetime = formatDate(item.applyDatetime, 'yyyy-MM-dd hh:mm:ss');
            item.amount = item.amount > 0 ? formatAmount(item.amount, '4', item.symbol) : '0.0000';
            item.statusName = this.statusObj[item.status];
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

<style lang="scss" scoped>
  .outRecord{
    height: 100%;
    background-color: #fff;
    font-size: 0.24rem;
    position: relative;
    .out_wrp{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .record_ul{
      padding: 0.2rem 0.3rem 0.98rem;
      .record_li{
        display: flex;
        padding: 0.3rem 0;
        justify-content: space-between;
        border-bottom: 1px solid #E6E6E6;
        .left{
          h5{
            color: #333333;
            font-size: 0.36rem;
            margin-bottom: 0.1rem;
          }
          p{
            color: #999999;
          }
        }
        .will_c{
          color: #17CB39;
        }
        .refused_c{
          color: #D53D3D;
        }
      }
    }
  }
</style>
