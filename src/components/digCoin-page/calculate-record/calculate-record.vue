<template>
  <div class="calculate-record">
    <div class="header">
      <p class="h_tit">今日算力</p>
      <p class="h_txt">{{dayCalculate}}</p>
    </div>
    <div class="cal_con">
      <h5 class="con_tit">
        <span class="tit_left">算力记录</span>
        <router-link to="his-calculate" class="tit_right">历史算力</router-link>
      </h5>
      <div class="con_box">
        <div class="con_wrp">
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
            <img src="./wu.png" />
            <p>暂无记录</p>
          </div>
        </div>
      </div>
    </div>
    <router-link to="get-calculate" class="foo_btn">
      获取算力
    </router-link>
  </div>
</template>

<script>
  import { setTitle, formatDate, formatAmount } from "common/js/util";
  import {queryCalculateRecord, ownerCalculateEarnings} from 'api/homeDig';
  import Scroll from 'base/scroll/scroll';
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
        dayCalculate: ''
      }
    },
    created() {
      setTitle('今日算力');
      this.params.outDatetime = formatDate(new Date(), 'yyyy-MM-dd');
      this.queryCalculateRecord();
      ownerCalculateEarnings(this.params.outDatetime).then(data => {
        this.dayCalculate = data.dayCalculate;
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
  .calculate-record{
    height: 100%;
    position: relative;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .header{
      background-image: url('../image/Mask@2x.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      text-align: center;
      padding-bottom: 0.76rem;
      padding-top: 0.5rem;
      .h_tit{
        font-size: 0.24rem;
        color: #FFEEEC;
        margin-bottom: 0.18rem;
      }
      .h_txt{
        color: #fff;
        font-size: 0.48rem;
      }
    }
    .cal_con{
      padding: 0.3rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      .con_tit{
        color: #333333;
        font-size: 0.36rem;
        margin-bottom: 0.1rem;
        display: flex;
        justify-content: space-between;
        .tit_right{
          font-size: 0.3rem;
          color: #666;
        }
      }
      .con_box{
        position: relative;
        flex: 1;
      }
      .con_wrp{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .con_ul{
        padding-bottom: 2rem;
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
    .foo_btn{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0.98rem;
      line-height: 0.98rem;
      color: #fff;
      background-color: #DA5454;
      text-align: center;
      font-size: 0.32rem;
    }
  }
</style>
