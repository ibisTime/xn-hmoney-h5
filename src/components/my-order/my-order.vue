<template>
  <div class="order-wrapper" @click.stop>
    <div class='tabs'>
      <p>
        <span :class="[ show ? 'select' : '' ]" @click='changeStatus("starting")'>{{$t('myOrder.subject.jxz')}}{{startingUnread <= 0 ? '' : startingUnread <= 99 ? '('+startingUnread+')' : '(99+)'}}</span>
      </p>
      <p>
        <span :class="[ !show ? 'select' : '' ]" @click='changeStatus("ended")'>{{$t('myOrder.subject.yjs')}}{{endedUnread <= 0 ? '' : endedUnread <= 99 ? '('+endedUnread+')' : '(99+)'}}</span>
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
          <div class="top">
            <p class='code' :title="item.code">
              {{$t('myOrder.subject.ddbh')}}:{{item.code.substring(item.code.length-8)}}</p>
            <p class="unread" v-if="item.unreadMsgNum > 0">未读({{item.unreadMsgNum <= 99 ? item.unreadMsgNum :
              '99+'}})</p>
          </div>
          <div class="content">
            <div class='pic' @click.stop="toHomePage(item.sellUser, item.buyUser, item.tradeCoin)">
              <p
                :style="getUserPic(item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo)"
                :class="{'hidden': !(item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo)}"
              >
              </p>
              <!-- <img :class="{'hidden': item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo}" src="./txiang.png"/> -->
              <HeadPic
                :content="item.buyUser !== userId ? item.buyUserInfo.nickname.substring(0, 1) : item.sellUserInfo.nickname.substring(0, 1)"
                :class="{'hidden': item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo}"/>
            </div>
            <div class='text1'>
              <p class='txt1'>
              <span
                class='t1'>{{item.buyUser !== userId ? item.buyUserInfo.nickname : item.sellUserInfo.nickname}}</span>
                <span :class="[item.buyUser !== userId ? 'txt buy' : 'txt sell']">{{typeList[item.buyUser !== userId ? 'buy' : 'sell']}} {{item.tradeCoin}}</span>
              </p>
              <p class='txt2'>{{$t('myOrder.subject.jyje')}}：{{item.status!='-1' ? item.tradeAmount : '-'}}
                {{item.tradeCurrency}}</p>
              <p class='txt3'>{{$t('myOrder.subject.jysl')}}：{{item.countString ? item.countString : '0'}}
                {{item.tradeCoin}}</p>
            </div>
            <div class='text2'>
              <p class='txt1'>{{statusValueList[item.status]}}</p>
            </div>
          </div>
        </div>
      </Scroll>
      <div class="no-data" :class="{'hidden': list.length > 0}">
        <img src="./wu.png"/>
        <p>{{$t('myOrder.subject.zwdd')}}</p>
      </div>
    </div>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import {myOrder} from 'api/person';
  import {getDictList} from 'api/general';
  import {formatAmount, getAvatar, setTitle, getUserId} from 'common/js/util';
  import Scroll from 'base/scroll/scroll';
  import HeadPic from 'base/head-pic/headPic';
  import FullLoading from 'base/full-loading/full-loading';

  export default {
    data() {
      return {
        userId: getUserId(),
        show: true,
        hasMore: true,
        list: [],
        start: 1,
        limit: 50,
        typeList: {
          'sell': this.$t('common.cs'),
          'buy': this.$t('common.gm')
        },
        statusValueList: {},
        type: 'starting',
        statusList: {
          'starting': ['0', '-1', '1', '5'], // 进行中
          'ended': ['2', '3', '4'] // 已结算
        },
        orderType: '',
        startingUnread: 0,
        endedUnread: 0,
        firstLoad: true,
        isLoading: true
      };
    },
    computed: {
      ...mapGetters([
        'groupList'
      ])
    },
    created() {
      setTitle(this.$t('myOrder.subject.wddd'));
      let ordering = sessionStorage.getItem('ordering');
      if (ordering === 'ended') {
        this.show = false;
        this.type = 'ended';
        this.list = [];
      }
      getDictList('trade_order_status').then(data => {
        data.forEach((item) => {
          this.statusValueList[item.dkey] = item.dvalue;
        });
        this.getOrderList();
        // 初次加载请求另一个状态的数据 用以统计未读数
        if (this.firstLoad) {
          let type = 'ended';
          if (this.type === 'ended') {
            type = 'starting';
          }
          this.getOrderList(type);
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    },
    methods: {
      // 获取头像
      getUserPic(pic) {
        return getAvatar(pic);
      },
      getOrderData() {
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
      // 切换状态
      changeStatus(type) {
        if (type === 'ended') {
          this.show = false;
        } else {
          this.show = true;
        }
        sessionStorage.setItem('ordering', type);
        this.type = type;
        this.start = 1;
        this.list = [];
        this.getOrderList();
      },
      // 获取我的订单 type仅用于页面初次加载另一状态数据
      getOrderList(type) {
        let statusList = this.statusList[this.type];
        if (type) {
          statusList = this.statusList[type];
        }
        // 页面初次加载
        let firstLoad = this.firstLoad;
        // 页面初次加载 请求另一个数据时
        if (type) {
          firstLoad = true;
          this.firstLoad = false;
        }
        myOrder(statusList, this.start, this.limit).then(data => {
          let startingUnread = this.startingUnread;
          let endedUnread = this.startingUnread;
          data.list.map(v => {
            v.countString = formatAmount(v.countString, '', v.tradeCoin);
            v.unreadMsgNum = this.groupList[v.code];
            if (v.unreadMsgNum > 0 && firstLoad) {
              // 判断未读消息的订单状态
              if (this.statusList['starting'].indexOf(v.status) > -1) {
                startingUnread += v.unreadMsgNum;
              } else {
                endedUnread += v.unreadMsgNum;
              }
            }
          });
          if (!type) {
            this.hasMore = true;
            if (data.totalPage < this.start) {
              this.list = [];
            }
            if (data.totalPage <= this.start) {
              this.hasMore = false;
            }
            this.list = [...this.list, ...data.list];
            this.start++;
          }
          ;
          // 第一次加载统计 未读消息数
          if (firstLoad) {
            this.startingUnread = startingUnread;
            this.endedUnread = endedUnread;
          }
        });
      },
      // 个人主页
      toHomePage(sellUser, buyUser, tradeCoin) {
        if (buyUser === getUserId()) {
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
      HeadPic,
      FullLoading
  }
}
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
      padding: 0.2rem 0.3rem;
      background: #fff;
      margin-bottom: 0.2rem;

      .content{
        width: 100%;
        display: flex;
        padding: 0.3rem 0 0.2rem;
        position: relative;
      }

      .top{
        width: 100%;
        overflow: hidden;
        border-bottom: 0.01rem solid #ebebeb;
        padding: 0.2rem 0;

        .code {
          display: inline-block;
          float: left;
          font-size: 0.24rem;
          color: #666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .unread {
          display: inline-block;
          float: right;
          font-size: 0.24rem;
          line-height: 0.3rem;
          color: $color-red;
        }
      }
      .pic {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: 0.22rem;
        p {
          width: 100%;
          height: 100%;
          background-position: center;
          background-size: cover;
          border-radius: 100%;
          position: relative;
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
            line-height: 0.28rem;
            float: left;
          }
          .txt {
            display: inline-block;
            width: 1.3rem;
            font-size: 0.2rem;
            color: #fff;
            text-align: center;
            line-height: 0.28rem;
            border-radius: 0.04rem;
            margin-left: 0.1rem;
            margin-bottom: 0.05rem;
            float: left;
          }
          .buy {
            background: #d53d3d;
          }

          .sell {
            background: #0ec55b;
          }
        }

        .txt2, .txt3 {
          font-size: 0.24rem;
        }
        .txt2{
          margin-bottom: 0.1rem;
          margin-top: 0.05rem;
        }
      }

      .text2 {
        text-align: right;
        position: absolute;
        right: 0;
        bottom: 0;
        .txt1 {
          font-weight: bold;
          margin-bottom: 0.2rem;
        }
        .txt2 {
          width: 3rem;
          font-size: 0.24rem;
          color: #666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .unread {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 0.24rem;
          line-height: 0.3rem;
          color: $color-red;
        }
      }
    }

  .list-start {
    height: 12rem;
    padding-bottom: 2rem;
    overflow: scroll;
      .list {
        .text1 {
          .txt1 {
            font-size: .3rem;
          }
        }
        .text2 {
          .txt1 {
            color: #d53d3d;
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
