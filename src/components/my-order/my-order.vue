<template>
  <div class="order-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon' @click='goBack'></i>
        <span class='title'>我的订单</span>
        </p>
    </header> -->
    <div class='tabs'>
        <p>
            <span :class="[ show ? 'select' : '' ]" @click='starting'>进行中</span>
        </p>
        <p>
            <span :class="[ !show ? 'select' : '' ]" @click='ended'>已结束</span>
        </p>
    </div>
    <div class='list-start'>
        <Scroll 
          ref="scroll"
          :data="list"
          :hasMore="hasMore"
          @pullingUp="getOrderData"
        >
            <div class='list' @click='goDetails(item.code)' v-for='(item,index) in list' :key="index">
                <div class='pic'>
                    <img :src="getUserPic(item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo)" :class="{'hidden': !(item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo)}" alt="">
                    <img :class="{'hidden': item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo}" src="./txiang.png"/>
                </div>
                <div class='text1'>
                    <p class='txt1'><span class='t1' >{{item.buyUser !== userId ? item.buyUserInfo.nickname : item.sellUserInfo.nickname}}</span><span :class="[item.type === 'buy' ? 'txt2 buy' : 'txt2 sell']">{{typeList[item.type]}} {{item.tradeCoin}}</span></p>
                    <p class='txt2'>交易金额：{{item.tradePrice}} {{item.tradeCurrency}}</p>
                    <p class='txt2'>交易数量：{{item.countString}} {{item.tradeCoin}}</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>{{statusValueList[item.status]}}</p>
                    <p class='txt2' :title="item.code" >订单编号:{{item.code.substring(item.code.length-8)}}</p>
                </div>
            </div>
        </Scroll>
        <div class="no-data" :class="{'hidden': list.length > 0}">
          <img src="./wu.png" />
          <p>暂无订单</p>
        </div>
    </div>
  </div>
</template>
<script>
import { myOrder } from "api/person";
import { getDictList } from "api/general";
import { formatAmount, getAvatar, setTitle } from "common/js/util";
import Scroll from 'base/scroll/scroll';
import { getUserId } from '../../common/js/util';

export default {
  data() {
    return {
      userId: getUserId(),
      show: true,
      hasMore: true,
      list: [],
      start: 1,
      limit: 10,
      typeList: {
        "sell": "购买",
        "buy": "出售"
      },
      statusValueList: {},
      userType: []
    };
  },
  created() {
    setTitle('我的订单');
    getDictList('trade_order_status').then(data => {
        data.forEach((item) => {
            this.statusValueList[item.dkey] = item.dvalue
        });
        this.getOrderData();
    })
  },
  methods: {
      // 获取头像
    getUserPic(pic){
        return getAvatar(pic);
    },
    getOrderData(){
        this.getOrderList(['0', '-1', '1', '5'], this.start, this.limit);
    },
    goBack() {
      this.$router.go(-1);
    },
    goDetails(code) {
      this.$router.push('order-details?code=' + code);
    },
    starting() {
      this.show = true;
      this.start = 1;
      this.getOrderList(['0', '-1', '1', '5'], this.start, this.limit);
    },
    ended() {
      this.show = false;
      this.start = 1;
      this.getOrderList(['2', '3', '4'], this.start, this.limit);
    },
    getOrderList(statusList, start, limit){
        myOrder(statusList, start, limit).then( data => {
            data.list.map( v => {
                v.countString = formatAmount(v.countString, '', v.tradeCoin);
            });
            if (data.totalPage <= this.start) {
                this.hasMore = false;
                this.list = data.list;
            }else{
                if(this.start > 1){
                  this.list = [...this.list, ...data.list];
                }else{
                  this.list = data.list;
                }
                this.start++;
            }
        })
    }
  },
  components: {
      Scroll
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.order-wrapper {
  font-size: 0.28rem;
  color: #323232;
  overflow: auto;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    background: #fff;
    width: 100%;
    padding: 0 0.3rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      @include bg-image("返回");
      float: left;
      margin-top: 0.31rem;
    }
  }

  .tabs {
    width: 100%;
    display: flex;
    line-height: 0.9rem;
    text-align: center;
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    margin-bottom: 0.21rem;

    p {
      flex: 1;
      font-size: 0.32rem;
      color: #666;
      span {
        padding-bottom: 0.22rem;
        
      }
      .select {
        border-bottom: 0.04rem solid #d53d3d;
        color: #d53d3d;
      }
    }
  }

  .list {
    width: 100%;
    padding: 0.4rem 0.3rem;
    background: #fff;
    display: flex;
    border-bottom: 0.01rem solid #ebebeb;

    .pic {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.22rem;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .text1 {
      .txt1 {
        margin-bottom: 0.17rem;
        font-weight: bold;
        display: inline-block;
        .t1 {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 0.1rem;
        }
        .txt2 {
          display: inline-block;
          width: 1.3rem;
          font-size: 0.2rem;
          color: #fff;
          text-align: center;
          line-height: 0.28rem;
          border-radius: 0.04rem;
          margin-left: 0.1rem;
          margin-bottom: 0.05rem;
        }
        .buy {
          background: #d53d3d;
        }

        .sell {
          background: #0ec55b;
        }
      }

      .txt2 {
        font-size: 0.24rem;
      }
    }

    .text2 {
      text-align: right;
      margin-top: 0.4rem;
      position: absolute;
      right: 0.3rem;
      .txt1 {
        font-weight: bold;
        margin-bottom: 0.23rem;
      }
      .txt2 {
        width: 3rem;
        font-size: 0.24rem;
        color: #666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .list-start {
      .list {
          .text1 {
              .txt1 {
                  font-size: .3rem;
              }
          }
          .text2 {
              .txt1 {
                  color:#d53d3d;
              }
          }
      }
  }

  .list-end {
      .list {
          .text1 {
              .txt1 {
                  font-size: .28rem;
              }
          }
      }
  }

}
</style>
