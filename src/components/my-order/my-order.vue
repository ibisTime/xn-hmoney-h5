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
            <span :class="[ show ? 'select' : '' ]" @click='starting'>{{$t('myOrder.subject.jxz')}}</span>
        </p>
        <p>
            <span :class="[ !show ? 'select' : '' ]" @click='ended'>{{$t('myOrder.subject.yjs')}}</span>
        </p>
    </div>
    <div class='list-start'>
        <Scroll 
          ref="scroll"
          :data="list"
          :hasMore="hasMore"
          v-show="list.length > 0"
          @pullingUp="getOrderData"
        >
            <div class='list' @click='goDetails(item.code, item.status)' v-for='(item,index) in list' :key="index">
                <div class='pic' @click.stop="toHomePage(item.sellUser, item.buyUser, item.tradeCoin)">
                    <p 
                      :style="getUserPic(item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo)" 
                      :class="{'hidden': !(item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo)}"
                    >
                    </p>
                    <!-- <img :class="{'hidden': item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo}" src="./txiang.png"/> -->
                    <HeadPic :content="item.buyUser !== userId ? item.buyUserInfo.nickname.substring(0, 1) : item.sellUserInfo.nickname.substring(0, 1)" :class="{'hidden': item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo}"/>
                </div>
                <div class='text1'>
                    <p class='txt1'>
                      <span class='t1' >{{item.buyUser !== userId ? item.buyUserInfo.nickname : item.sellUserInfo.nickname}}</span>
                      <span :class="[item.buyUser !== userId ? 'txt2 buy' : 'txt2 sell']">{{typeList[item.buyUser !== userId ? 'buy' : 'sell']}} {{item.tradeCoin}}</span>
                    </p>
                    <p class='txt2'>{{$t('myOrder.subject.jyje')}}：{{item.status!="-1" ? item.tradeAmount : '-'}} {{item.tradeCurrency}}</p>
                    <p class='txt2'>{{$t('myOrder.subject.jysl')}}：{{item.countString ? item.countString : '0'}} {{item.tradeCoin}}</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>{{statusValueList[item.status]}}</p>
                    <p class='txt2' :title="item.code" >{{$t('myOrder.subject.ddbh')}}:{{item.code.substring(item.code.length-8)}}</p>
                </div>
            </div>
        </Scroll>
        <div class="no-data" :class="{'hidden': list.length > 0}">
          <img src="./wu.png" />
          <p>{{$t('myOrder.subject.zwdd')}}</p>
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
import HeadPic from 'base/head-pic/headPic';

export default {
  data() {
    return {
      userId: getUserId(),
      show: true,
      hasMore: true,
      list: [],
      start1: 1,
      start2: 1,
      limit: 10,
      typeList: {
        "sell": this.$t('common.cs'),
        "buy": this.$t('common.gm')
      },
      statusValueList: {},
      type: 's',
      statusList: ['0', '-1', '1', '5'],
      orderType: ''
    };
  },
  created() {
    setTitle(this.$t('myOrder.subject.wddd'));
    getDictList('trade_order_status').then(data => {
      data.forEach((item) => {
        this.statusValueList[item.dkey] = item.dvalue
      });
      let ordering = sessionStorage.getItem('ordering');
      if(ordering == 'ended'){
        this.show = false;
        this.type = 'e';
        this.start2 = 1;
        this.list = [];
        this.statusList = ['2', '3', '4'];
      }
      this.getOrderData();
    })
  },
  methods: {
    // 获取头像
    getUserPic(pic){
        return getAvatar(pic);
    },
    getOrderData(){
      this.getOrderList(this.type);
    },
    goBack() {
      this.$router.go(-1);
    },
    goDetails(code, status) {
      // if(status == -1){
      //   return;
      // }
      this.$router.push('order-details?code=' + code);
    },
    starting() {
      sessionStorage.setItem('ordering', 'starting');
      this.show = true;
      this.type = 's';
      this.start1 = 1;
      this.list = [];
      this.statusList = ['0', '-1', '1', '5'];
      this.getOrderList(this.type);
    },
    ended() {
      sessionStorage.setItem('ordering', 'ended');
      this.show = false;
      this.type = 'e';
      this.start2 = 1;
      this.list = [];
      this.statusList = ['2', '3', '4'];
      this.getOrderList(this.type);
    },
    getOrderList(type){
      let that = this;
      if(type == 's'){
        myOrder(this.statusList, this.start1, this.limit).then( data => {
          clData(data, that, this.start1, 's');
        })
      }else{
        myOrder(this.statusList, this.start2, this.limit).then( data => {
          clData(data, that, this.start2, 'e');
        })
      }

      function clData(data, that, start, type){
        data.list.map( v => {
          v.countString = formatAmount(v.countString, '', v.tradeCoin);
        });
        that.hasMore = true;
        if(data.totalPage < start){
          that.list = [];
        }
        if (data.totalPage <= start) {
          that.hasMore = false;
        }
        that.list = [...that.list, ...data.list];
        if(type == 's'){
          that.start1 ++;
        }else{
          that.start2 ++;
        }
      }
    },
    // 个人主页
    toHomePage(sellUser, buyUser, tradeCoin){
      if (buyUser == getUserId()) {
        //当前用户为买家
        this.$router.push(`/homepage?userId=${sellUser}&currency=${tradeCoin}`);
      } else {
        //当前用户为卖家
        this.$router.push(`/homepage?userId=${buyUser}&currency=${tradeCoin}`);
      }
      
    }
  },
  components: {
      Scroll,
      HeadPic
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
      background-image: url('./fh.png');
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
      p{
        width: 100%;
        height: 100%;    
        background-position: center;
        background-size: cover;
        border-radius: 100%;
      }
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
    height: 12rem;
    padding-bottom: 1rem;
    overflow: scroll;
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
