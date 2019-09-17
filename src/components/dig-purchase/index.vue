<template>
  <div class="purchase">
    <div class="header">
      <ul class="head_ul" @click="changeTabs">
        <li class="h_single_li" :class="tabType === '0' ? 'h_single_li_active' : ''" data-key="0">全部</li>
        <li class="h_single_li" :class="tabType === '1' ? 'h_single_li_active' : ''" data-key="1">申购中</li>
        <li class="h_single_li" :class="tabType === '2' ? 'h_single_li_active' : ''" data-key="2">已结束</li>
      </ul>
    </div>
    <div class="pur_con">
      <div class="warrep">
        <Scroll
          ref="scroll"
          :data="list"
          :hasMore="hasMore"
          v-show="list.length > 0"
          @pullingUp="queryPurchase"
        >
          <ul class="con_ul">
            <li class="c_single" v-for="(item, index) in list" :key="`pur_${index}`">
              <router-link to="purchase-detail" @click.native="() => {toPurchaseDetail(item.code, item.productStatus)}">
                <div class="li_head">
                  <div class="li_head_left">
                    <i :style="{backgroundImage: `url('${item.symbolIcon}')`}"></i>
                    <span>{{item.symbol}}</span>
                  </div>
                  <div class="li_head_right">
                    {{item.statusName}}
                  </div>
                </div>
                <div class="li_con_box">
                  <div class="li_con_head">
                    <div class="li_con_head_left">
                      <h5 class="li_con_head_left_h5">{{item.totalAmount}}</h5>
                      <p class="li_con_head_left_p">申购总量</p>
                    </div>
                    <div class="li_con_head_right">
                      <p class="li_con_head_right_tit">
                        剩余总量: <span class="li_con_head_right_tit_sp">{{item.remainAmount}}</span>
                      </p>
                      <p class="li_con_head_right_progress">
                        <span :style="{
                          width: `${item.totalAmount ? ((1 - item.remainAmount / item.totalAmount) * 100) : 0}%`}"
                        ></span>
                      </p>
                    </div>
                  </div>
                  <p class="li_con_p">期限：{{item.startDatetime}} 至 {{item.endDatetime}}</p>
                </div>
              </router-link>
            </li>
          </ul>
        </Scroll>
        <div class="no-data" :class="{'hidden': list.length > 0}">
          <img src="./wu.png" />
          <p>暂无记录</p>
        </div>
      </div>
    </div>
    <div class="pur_foo">
      <p @click="toRecord">申购记录</p>
    </div>
    <FullLoading v-show="isLoading" :title="''"/>
  </div>
</template>

<script>
  import { setTitle, formatDate, formatAmount } from "common/js/util";
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';
  import {queryPurchase} from 'api/homeDig';
  import {getDictList} from 'api/general';
  export default {
    data() {
      return {
        tabType: '0',
        hasMore: true,
        isLoading: false,
        params: {
          start: 1,
          limit: 10,
          status: '0'
        },
        list: [],
        dictObj: {}
      }
    },
    created() {
      setTitle('申购');
      getDictList('purchase_product_status').then(data => {
        if(Array.isArray(data)) {
          data.forEach(item => {
            this.dictObj[item.dkey] = item.dvalue;
          });
        }
        this.queryPurchase('0');
      });
    },
    methods: {
      queryPurchase(key) {
        this.isLoading = true;
        queryPurchase({
          ...this.params,
          status: key
        }).then(data => {
          data.list.forEach(item => {
            item.startDatetime = formatDate(item.startDatetime, 'yyyy-MM-dd hh:mm:ss');
            item.endDatetime = formatDate(item.endDatetime, 'yyyy-MM-dd hh:mm:ss');
            item.totalAmount = formatAmount(item.totalAmount, '0', item.symbol);
            item.remainAmount = formatAmount(item.remainAmount, '0', item.symbol);
            item.buyAmountMax = formatAmount(item.buyAmountMax, '0', item.symbol);
            item.symbolIcon = PIC_PREFIX + item.symbolIcon;
            item.statusName = this.dictObj[item.status];
          });
          if (data.totalPage <= this.params.start) {
            this.hasMore = false;
          }
          this.list = [...this.list, ...data.list];
          this.params.start ++;
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
      },
      changeTabs(ev) {
        const key = ev.target.getAttribute('data-key');
        this.tabType = key;
        this.list = [];
        if(key) {
          this.queryPurchase(key);
        }
      },
      toPurchaseDetail(code, status) {
        sessionStorage.setItem('purchaseCode', code);
        sessionStorage.setItem('purchaseStatus', status);
      },
      toRecord() {
        this.$router.push('/purchase-record');
      }
    },
    components: {
      Scroll,
      FullLoading
    }
  }
</script>

<style lang="scss" scoped>
  .purchase{
    height: 100%;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    position: relative;
    .header{
      background-color: #FFFFFF;
      .head_ul{
        text-align: center;
        font-size: 0.28rem;
        color: #999;
        display: flex;
        .h_single_li{
          padding-top: 0.44rem;
          flex: 1;
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
      .warrep{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
      }
      .con_ul{
        padding: 0.22rem 0.3rem 1rem;
        .c_single{
          background-color: #fff;
          border-radius: 0.1rem;
          padding: 0.22rem 0.3rem 0.46rem;
          margin-bottom: 0.2rem;
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
                    width: 0;
                    background-color: #D53D3D;
                  }
                }
              }
            }
          }
        }
      }
    }
    .pur_foo{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.4rem 0.3rem;
      box-shadow: 0 -0.04rem 0.08rem 0 #E6E6E6;
      p{
        padding: 0.28rem 0;
        text-align: center;
        color: #D53D3D;
        background-color: rgba(213,61,61,0.1);
        border: 0.01rem solid #D53D3D;
        border-radius: 0.06rem;
        font-size: 0.32rem;
      }
    }
  }
</style>
