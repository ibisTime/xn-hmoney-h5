<template>
  <div class="due-to-delivery">
    <div class="header">
      <ul class="head_ul" @click="selectedTab">
        <li class="h_single_li" data-key="" :class="tabKey === '' ? 'h_single_li_active' : ''">全部</li>
        <li class="h_single_li" data-key="1" :class="tabKey === '1' ? 'h_single_li_active' : ''">交割中</li>
        <li class="h_single_li" data-key="2" :class="tabKey === '2' ? 'h_single_li_active' : ''">已结束</li>
      </ul>
    </div>
    <div class="pur_con">
      <div class="warrper">
        <Scroll
          ref="scroll"
          :data="deliveryList"
          :hasMore="hasMore"
          v-show="deliveryList.length > 0"
          @pullingUp="queryDeliveryData"
        >
          <ul class="con_ul">
            <li
              class="c_single"
              v-for="(item, index) in deliveryList"
              :key="`delivery_${index}`"
            >
              <router-link :to="`delivery-detail?code=${item.code}`" @click.native="toDeliveryDetail">
                <div class="li_head">
                  <div class="li_head_left">
                    <i :style="{backgroundImage: `url('${item.symbolIcon}')`}"></i>
                    <span>{{item.symbol}}</span>
                    <span class="head_left_sp">{{item.pickWay === '1' ? '邮寄' : '自提'}}</span>
                    <span class="head_left_sp" v-show="item.pickWay === '3'">{{item.pickWay === '3' ? '邮寄' : ''}}</span>
                  </div>
                  <div class="li_head_right">
                    {{item.deliveryStatus}}
                  </div>
                </div>
                <div class="li_con_box">
                  <div class="li_con_head">
                    <div class="li_con_head_left">
                      <h5 class="li_con_head_left_h5">{{item.totalAmount}}</h5>
                      <p class="li_con_head_left_p">交割总量</p>
                    </div>
                    <div class="li_con_head_right">
                      <p class="li_con_head_right_tit">
                        剩余总量<span class="li_con_head_right_tit_sp">{{item.remainAmount}}</span>
                      </p>
                      <p class="li_con_head_right_progress">
                        <span :width="item.totalAmount ? `${(1 - (item.remainAmount / item.totalAmount)) * 100}%` : ''"></span>
                      </p>
                    </div>
                  </div>
                  <p class="li_con_p">期限：{{item.startDatetime}}至{{item.endDatetime}}</p>
                </div>
              </router-link>
            </li>
          </ul>
        </Scroll>
        <div class="no-data" :class="{'hidden': deliveryList.length > 0}">
          <img src="./wu.png" />
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import {queryDelivery} from 'api/homeDig';
import {getDictList} from 'api/general';
import {formatAmount, formatDate} from 'common/js/util';
export default {
  data() {
    return {
      deliveryList: [],
      params: {
        start: 1,
        limit: 10,
        deliveryStatus: ''
      },
      hasMore: true,
      deliveryStatus: {},
      tabKey: ''
    }
  },
  created() {
    getDictList('delivery_status').then(data => {
      if(Array.isArray(data)) {
        data.forEach(item => {
          this.deliveryStatus[item.dkey] = item.dvalue;
        });
      }
      this.queryDeliveryData();
    });
  },
  methods: {
    queryDeliveryData() {
      queryDelivery(this.params).then(data => {
        data.list.forEach(item => {
          item.deliveryStatus = this.deliveryStatus[item.deliveryStatus];
          item.totalAmount = formatAmount(item.totalAmount, '', item.symbol);
          item.remainAmount = formatAmount(item.remainAmount, '', item.symbol);
          item.startDatetime = formatDate(item.startDatetime, 'yyyy-MM-dd hh:mm:ss');
          item.endDatetime = formatDate(item.endDatetime, 'yyyy-MM-dd hh:mm:ss');
          item.symbolIcon = PIC_PREFIX + item.symbolIcon;
        });
        if (data.totalPage <= this.params.start) {
          this.hasMore = false;
        }
        this.deliveryList = [...this.deliveryList, ...data.list];
        this.params.start ++;
      });
    },
    selectedTab(ev) {
      this.tabKey = ev.target.getAttribute('data-key');
      this.params.deliveryStatus = this.tabKey;
      this.deliveryList = [];
      this.params.start = 1;
      this.queryDeliveryData();
    },
    toDeliveryDetail() {
      sessionStorage.removeItem('dueToProductMsg');
      sessionStorage.removeItem('isMail');
      sessionStorage.removeItem('setRess');
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
  .due-to-delivery{
    flex: 1;
    background-color: #FAFAFA;
    display: flex;
    flex-direction: column;
  }
  .header{
    padding-top: 0.2rem;
    background-color: #FFFFFF;
    .head_ul{
      text-align: center;
      font-size: 0.28rem;
      color: #999;
      display: flex;
      .h_single_li{
        flex: 1;
        padding-top: 0.24rem;
        padding-bottom: 0.26rem;
        border-bottom: 2px solid transparent;
      }
      .h_single_li_active{
        color: #D53D3D;
        border-color: #D53D3D;
      }
    }
  }
  .pur_con{
    position: relative;
    flex: 1;
    .warrper{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      overflow: scroll;
    }
    .con_ul{
      padding: 0.22rem 0.3rem;
      .c_single{
        background-color: #fff;
        border-radius: 0.1rem;
        padding: 0.22rem 0.3rem 0.46rem;
        .li_head{
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.2rem;
          margin-bottom: 0.4rem;
          border-bottom: 1px solid #F0F0F0;
          .li_head_left{
            font-size: 0.28rem;
            display: flex;
            align-items: center;
            i{
              display: inline-block;
              width: 0.5rem;
              height: 0.5rem;
              margin-right: 0.14rem;
              background-size: 100% 100%;
              border-radius: 100%;
            }
            .head_left_sp{
              padding: 0.04rem 0.12rem;
              margin-left: 0.14rem;
              background-color: #FF9849;
              color: #fff;
              font-size: 0.22rem;
              border-radius: 0.04rem;
            }
          }
          .li_head_right{
            font-size: 0.24rem;
            color: #D53D3D;
            display: flex;
            align-items: center;
          }
        }
        .li_con_box{
          font-size: 0.24rem;
          color: #999;
          .li_con_head{
            display: flex;
            margin-bottom: 0.4rem;
            .li_con_head_left{
              width: 50%;
              .li_con_head_left_h5{
                color: #333333;
                font-size: 0.36rem;
                margin-bottom: 0.12rem;
              }
            }
            .li_con_head_right{
              width: 50%;
              .li_con_head_right_tit{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 0.28rem;
                .li_con_head_right_tit_sp{
                  color: #555;
                  font-size: 0.3rem;
                }
              }
              .li_con_head_right_progress{
                width: 90%;
                border-radius: 0.08rem;
                height: 0.12rem;
                overflow: hidden;
                background-color: #EBEBEB;
                display: flex;
                align-items: center;
                span{
                  display: inline-block;
                  height: 0.12rem;
                  width: 0%;
                  background-color: #D53D3D;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
