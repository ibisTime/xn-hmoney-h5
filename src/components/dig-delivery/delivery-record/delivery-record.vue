<template>
  <div class="delivery-record">
    <div class="header" @click="selectedTab">
      <p :class="params.status ==='' ? 'p_active' : ''" data-key="">全部</p>
      <p :class="params.status ==='0' ? 'p_active' : ''" data-key="0">待交割</p>
      <p :class="params.status ==='1' ? 'p_active' : ''" data-key="1">已完成</p>
    </div>
    <div class="record_box">
      <div class="wrp_box">
        <Scroll
          ref="scroll"
          :data="recordList"
          :hasMore="hasMore"
          v-show="recordList.length > 0"
          @pullingUp="getDeliveryRecord"
        >
          <ul class="record_ul">
            <li
              class="li_single"
              v-for="(item, index) in recordList"
              :key="`deRecord_${index}`"
            >
              <router-link :to="`delivery-record-detail?code=${item.code}`">
                <div class="single_head">
                  <div class="s_h_left">
                    <img class="s_h_left_img" :src="item.pic" alt="">
                    <span class="s_h_left_sp">{{item.productName}}</span>
                    <span class="left_zt">{{item.pickWay}}</span>
                  </div>
                  <div class="s_h_right">
                    {{item.status}}
                  </div>
                </div>
                <div class="single_con">
                  <div class="s_c_left">
                    <h5 class="s_c_h5">{{item.payAmount}}</h5>
                    <p>交割总量</p>
                  </div>
                  <div class="s_c_right">
                    <h5 class="s_c_h5">{{item.applyDatetime}}</h5>
                    <p>申请时间</p>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </Scroll>
        <div class="no-data" :class="{'hidden': recordList.length > 0}">
          <img src="./wu.png" />
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import {ownerDeliveryRecord} from 'api/homeDig';
import {getDictList} from 'api/general';
import {formatAmount, formatDate} from 'common/js/util';
export default {
  data() {
    return {
      recordList: [],
      params: {
        start: 1,
        limit: 10,
        status: ''
      },
      hasMore: true,
      recordStatus: {}
    }
  },
  created() {
    getDictList('delivery_record_status').then(data => {
      data.forEach(item => {
        this.recordStatus[item.dkey] = item.dvalue;
      });
      this.getDeliveryRecord();
    });
  },
  methods: {
    getDeliveryRecord() {
      ownerDeliveryRecord(this.params).then(data => {
          data.list.forEach(item => {
            item.status = this.recordStatus[item.status];
            item.payAmount = formatAmount(item.payAmount, '', item.symbol);
            item.applyDatetime = formatDate(item.applyDatetime, 'yyyy-MM-dd hh:mm:ss');
            item.pickWay = item.pickWay === '1' ? '邮寄' : '自提';
            item.pic = PIC_PREFIX + item.pic;
          });
        if (data.totalPage <= this.params.start) {
          this.hasMore = false;
        }
        this.recordList = [...this.recordList, ...data.list];
        this.params.start ++;
      });
    },
    selectedTab(ev) {
      const key = ev.target.getAttribute('data-key');
      this.params.status = key;
      this.recordList = [];
      this.getDeliveryRecord();
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="scss">
  .delivery-record{
    position: relative;
    height: 100%;
    background-color: #FAFAFA;
    display: flex;
    flex-direction: column;
    .header{
      background-color: #fff;
      display: flex;
      border-bottom: 1px solid #EBEBEB;
      p{
        padding-top: 0.44rem;
        text-align: center;
        flex: 1;
        font-size: 0.28rem;
        color: #999;
        padding-bottom: 0.24rem;
        border-bottom: 2px solid transparent;
      }
      .p_active{
        color: #D53D3D;
        border-color: #D53D3D;
      }
    }
    .record_box{
      position: relative;
      flex: 1;
      .wrp_box{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: scroll;
      }
    }
    .record_ul{
      padding: 0.3rem;
      .li_single{
        padding: 0.1rem 0.3rem 0.56rem;
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
            .left_zt{
              background-color: #FF9849;
              color: #fff;
              font-size: 0.22rem;
              padding: 0.04rem 0.12rem;
              margin-left: 0.14rem;
              border-radius: 0.06rem;
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
