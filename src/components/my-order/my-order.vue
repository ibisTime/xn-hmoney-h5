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
    <p class="line"></p>
    <div class='list-start'>
      <Scroll
        ref="scroll"
        :data="list"
        :hasMore="hasMore"
        v-show="list.length > 0"
        @pullingUp="getOrderData"
      >
        <div class="order_box" v-for='item in list' :key="item.code">
          <div class='list' @click='goDetails(item.code, item.status)'>
            <div class="top">
              <p class='code' :title="item.code">
                {{$t('myOrder.subject.ddbh')}}{{item.code.substring(item.code.length-8)}}</p>
              <p class="unread" v-if="item.unreadMsgNum > 0">
                {{$t('myOrder.subject.wd')}}({{+item.unreadMsgNum < 100 ? item.unreadMsgNum : '99+'}})
              </p>
            </div>
            <div class="content">
              <div class="con_head">
                <p class="con_head_left">
                  {{typeList[item.buyUser === userId ? 'buy' : 'sell']}} {{item.tradeCoin}}
                </p>
                <p class="con_head_right">
                  {{statusValueList[item.status]}}
                </p>
              </div>
              <ul class="con_ul">
                <li class="con_single">
                  <p class="sing_head">
                    时间
                  </p>
                  <p class="sing_p">
                    {{item.createDatetime}}
                  </p>
                </li>
                <li class="con_single">
                  <p class="sing_head">
                    数量({{item.tradeCoin}})
                  </p>
                  <p class="sing_p">
                    {{item.countString ? item.countString : '0.0000'}}
                  </p>
                </li>
                <li class="con_single">
                  <p class="sing_head">
                    交易总额({{item.tradeCurrency}})
                  </p>
                  <p class="sing_p">
                    {{item.status!='-1' ? (+item.tradeAmount).toFixed(2) : '-'}}
                  </p>
                </li>
              </ul>
              <div class="foo_pic">
                <HeadPic
                  style="width: 0.48rem; height: 0.48rem"
                  :content="item.buyUser !== userId ? item.buyUserInfo.nickname.substring(0, 1) : item.sellUserInfo.nickname.substring(0, 1)"
                  :picUrl="(item.buyUser !== userId ? item.buyUserInfo.photo : item.sellUserInfo.photo)"
                  :txtSize="'0.36rem'"
                />
                <p class="foo_pic_txt">{{item.buyUser !== userId ? item.buyUserInfo.nickname : item.sellUserInfo.nickname}}</p>
              </div>
            </div>
          </div>
          <p class="line"></p>
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
  import {formatAmount, getAvatar, setTitle, getUserId, formatDate} from 'common/js/util';
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
          let endedUnread = this.endedUnread;
          data.list.map(v => {
            v.countString = formatAmount(v.countString, '', v.tradeCoin);
            v.unreadMsgNum = this.groupList[v.code];
            v.createDatetime = formatDate(v.createDatetime, 'MM/dd hh:mm:ss');
            if(v.buyUserInfo.photo) {
              v.buyUserInfo.photo = PIC_PREFIX + v.buyUserInfo.photo;
            }
            if(v.sellUserInfo.photo) {
              v.sellUserInfo.photo = PIC_PREFIX + v.sellUserInfo.photo;
            }
            if (v.unreadMsgNum > 0 && firstLoad) {
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
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .order-wrapper {
    font-size: 0.28rem;
    color: #323232;
    overflow: auto;
    position: fixed;
    background-color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

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
      position: relative;
      z-index: 9;
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
    .line{
      height: 0.2rem;
      background-color: #F8F8F8;
    }

    .list {
      width: 100%;
      padding: 0 0.3rem;
      background: #fff;

      .content {
        padding: 0.24rem 0 0.32rem;
      }
      .con_head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.28rem;
        line-height: 0.4rem;
        margin-bottom: 0.4rem;
        .con_head_left{
          color: #333333;
          font-weight: 500;
        }
        .con_head_right{
          color: #D53D3D;
          font-weight: 500;
        }
      }
      .con_ul{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.3rem;
        .con_single{
          font-size: 0.24rem;
          .sing_head{
            color: #999999;
            line-height: 0.33rem;
            margin-bottom: 0.12rem;
          }
          .sing_p{
            color: #333;
            line-height: 0.33rem;
            font-family: PingFangSC-Medium, PingFang SC;
          }
          &:nth-child(2) {
            text-align: center;
          }
          &:nth-child(3) {
            text-align: right;
          }
        }
      }
      .foo_pic{
        display: flex;
        align-items: center;
        .foo_pic_txt{
          margin-left: 0.13rem;
          font-size: 0.24rem;
          color: #323232;
        }
      }

      .top {
        width: 100%;
        overflow: hidden;
        border-bottom: 0.01rem solid #ebebeb;
        padding: 0.2rem 0;

        .code {
          display: inline-block;
          float: left;
          font-size: 0.24rem;
          color: #323232;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .unread {
          display: inline-block;
          float: right;
          font-size: 0.24rem;
          line-height: 0.3rem;
          color: #D53D3D;
        }
      }
    }

    .list-start {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 1.1rem;
      z-index: 8;
      .list {
        .text1 {
          .txt1 {
            font-size: .3rem;
          }
        }
        .text2 {
          .txt1 {
            color: #D53D3D;
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
