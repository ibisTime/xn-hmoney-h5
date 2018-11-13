<template>
  <div class="top-up-wrapper" @click.stop>
    <div class="main">
      <Scroll 
        ref="scroll"
        :data="orderDataList"
        :hasMore="hasMore"
        v-show="orderDataList.length > 0"
        @pullingUp="getOrderData"
      >
        <router-link :to='"wallet-orderDetails?code=" + orderItem.code' class='list-wrap' v-for="(orderItem, index) in orderDataList" :key="index">
          <div class='list'>
              <div class='pic'>
                  <i :class='orderItem.type == "0" ? "icon" : "ico1"'></i>
              </div>
              <div class='text'>
                  <div class='text1'>
                      <p class='txt1'>{{$t('walletRecord.subject.zje')}}：{{(Math.floor(orderItem.tradeAmount * 100) / 100).toFixed(2)}} <span class='name'>{{orderItem.tradeCurrency}}</span></p>
                      <p class='txt2 green'>{{$t('common.sl')}}：{{orderItem.count}} {{orderItem.tradeCoin}}</p>
                  </div>
                  <div class='text2'>
                      <p class='txt1'>{{orderItem.createDatetime}}</p>
                      <p class='txt2 green'>{{statusList[orderItem.status]}}</p>
                  </div>
              </div>
          </div>
        </router-link>
      </Scroll>
      <div class="no-data" :class="{'hidden': orderDataList.length > 0}">
        <img src="./wu.png" />
        <p>{{$t('walletRecord.subject.zwdd')}}</p>
      </div>
    </div>
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
// bjPlayfo, qxOrder
import {getUserId, formatAmount, formatDate, setTitle} from 'common/js/util';
import { getDictList } from "api/general";
import { getCTSData } from "api/person";
import Scroll from 'base/scroll/scroll';
import FullLoading from 'base/full-loading/full-loading';
export default {
  data() {
    return {
      hasMore: true,
      isLoading: true,
      statusList: [],
      orderDataList: [],
      start: 1,
      config: {
        start: 1,
        limit: 10,
        userId: getUserId()
      }
    };
  },
  created() {
    setTitle(this.$t('walletRecord.subject.ddjl'));
    getDictList('accept_order_status').then(data => {
      data.forEach(item => {
        this.statusList[item.dkey] = item.dvalue;
      });
      this.getOrderData();
    })
  },
  methods: {
    getOrderData(){
      this.config.start = this.start;
      getCTSData(this.config).then(res => {
        res.list.map(item => {
          item.count = formatAmount(`${item.count}`, '', item.tradeCoin);
          item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
        });
        if (res.totalPage <= this.start) {
          this.hasMore = false;
        }
        this.orderDataList = [...this.orderDataList, ...res.list];
        this.start ++;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      })
    }
  },
  components: {
    Scroll,
    FullLoading
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.top-up-wrapper {
  font-size: 0.28rem;
  color: #333;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
  .green {
    color: #0ec55b;
  }
  .gray {
    color: #999;
  }
  .red {
    color: #d53d3d;
  }
  .black {
    color:#333;
  }

  header {
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    margin-bottom: 0.2rem;

    .icon {
      width: 0.2rem;
      height: 0.36rem;
      background-image: url('./fh.png');
      margin-top: 0.28rem;
      float: left;
    }

    .txt1 {
      font-size: 0.36rem;
      font-weight: bold;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .main {
    width: 100%;
    height: 13rem;
    padding-bottom: 2rem;
    overflow: scroll;
    background: #fff;
    .list-wrap {
      display: block;
      width: 100%;
      padding: 0.3rem 0 0.23rem;
      border-bottom: 0.01rem solid #e5e5e5;
      .list {
        width: 100%;
        padding: 0 0.3rem;
        display: flex;
        .pic {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          margin-right: 0.32rem;
          .icon {
            width: 100%;
            height: 100%;
            background-image: url(./mr.png);
          }
          .ico1 {
            display: inline-block;
            width: 100%;
            height: 100%;
            background-image: url(./mc.png);
            background-size: 100% 100%;
          }
        }
        .text {
          width: 87%;
          font-size: 0.24rem;
          color: #333;
          .text1,
          .text2 {
            display: flex;
            justify-content: space-between;
          }

          .text1 {
            padding-bottom: 0.3rem;
            .txt2 {
              font-size: 0.24rem;
            }
            .name {
              font-size: 0.28rem;
              font-weight: bold;
            }
          }
          .text2 {
            font-size: 0.22rem;
          }
        }
      }
    }
  }
}
</style>
