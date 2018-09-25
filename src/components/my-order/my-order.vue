<template>
  <div class="order-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon' @click='goBack'></i>
        <span class='title'>我的订单</span>
        </p>
    </header>
    <div class='tabs'>
        <p>
            <span :class="[ show ? 'select' : '' ]" @click='starting'>进行中</span>
        </p>
        <p>
            <span :class="[ !show ? 'select' : '' ]" @click='ended'>已结束</span>
        </p>
    </div>
    <div v-show='show' class='list-start'>
        <div class='list' @click='goDetails' v-for='(item,index) in list1' :key="index">
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>{{item.buyUser}}<span :class="[item.type === 'buy' ? 'buy' : 'sell']">{{item.type === 'buy' ? '购买' : '出售'}}</span></p>
                <p class='txt2'>交易金额：{{item.count}} {{item.tradeCoin}}</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易进行中</p>
                <p class='txt2'>订单编号:{{item.code}}</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>FUN MVP<span class='sell'>出售</span></p>
                <p class='txt2'>交易金额：100.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易进行中</p>
                <p class='txt2'>订单编号：2080</p>
            </div>
        </div>
        <!-- <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>不懂<span class='sell'>出售</span></p>
                <p class='txt2'>交易金额：200.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易进行中</p>
                <p class='txt2'>订单编号：6666</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>Sting<span class='buy'>购买</span></p>
                <p class='txt2'>交易金额：100.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易进行中</p>
                <p class='txt2'>订单编号：2080</p>
            </div>
        </div> -->
    </div>

    <div v-show='!show' class='list-end'>
        <div class='list' @click='goDetails' v-for='(item,index) in list2' :key="index">
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>{{item.buyUser}}<span :class="[item.type === 'buy' ? 'buy' : 'sell']">{{item.type === 'buy' ? '购买' : '出售'}}</span></p>
                <p class='txt2'>交易金额：{{item.count}} {{item.tradeCoin}}</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易已结束</p>
                <p class='txt2'>订单编号:{{item.code}}</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>FUN MVP<span class='sell'>出售</span></p>
                <p class='txt2'>交易金额：100.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易已结束</p>
                <p class='txt2'>订单编号：2080</p>
            </div>
        </div>
        <!-- <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>不懂<span class='sell'>出售</span></p>
                <p class='txt2'>交易金额：200.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易已结束</p>
                <p class='txt2'>订单编号：6666</p>
            </div>
        </div>
        <div class='list'>
            <div class='pic'>
                <i class='icon'></i>
            </div>
            <div class='text1'>
                <p class='txt1'>Sting<span class='buy'>购买</span></p>
                <p class='txt2'>交易金额：100.00 CNY</p>
            </div>
            <div class='text2'>
                <p class='txt1'>交易已结束</p>
                <p class='txt2'>订单编号：2080</p>
            </div>
        </div> -->
    </div>
  </div>
</template>
<script>
import { myOrder } from "../../api/person";
import { moneyFormat } from "../../common/js/util";

export default {
  data() {
    return {
      show: true,
      list1: [],
      list2: [],
      start1: 1,
      start2: 1,
      limit1: 10,
      limit2: 10
    };
  },
  created() {
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goDetails() {
      this.$router.push('order-details');
    },
    starting() {
      this.show = true;
      myOrder(['0', '1', '2', '5'], this.start1, this.limit1).then( data => {
        data.list.map( v => {
            v.count = moneyFormat(v.count);
        });
            this.list1 = data.list;
      })
    },
    ended() {
      this.show = false;
      myOrder(['3', '4'], this.start2, this.limit2).then( data => {
        data.list.map( v => {
            v.count = moneyFormat(v.count);
        });
            this.list2 = data.list;  
      })
    }
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
      .icon {
        width: 100%;
        height: 100%;
        @include bg-image("头像(4)");
      }
    }

    .text1 {
      .txt1 {
        margin-bottom: 0.27rem;
        font-weight: bold;
        span {
          display: inline-block;
          width: 0.6rem;
          font-size: 0.2rem;
          color: #fff;
          text-align: center;
          line-height: 0.28rem;
          border-radius: 0.04rem;
          margin-left: 0.33rem;
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
        font-weight: bold;
      }
    }

    .text2 {
      text-align: right;
      margin-top: 0.04rem;
      position: absolute;
      right: 0.3rem;
      .txt1 {
        font-weight: bold;
        margin-bottom: 0.23rem;
      }
      .txt2 {
        font-size: 0.24rem;
        color: #666;
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
