<template>
  <div class="guest-wrapper" @click.stop>
    <header>
        <p>
          <span @click="toxrFn('1')" :class="{'select': type === '1'}">{{$t('myGuest.subject.wxrd')}}</span>
          <span @click="toxrFn('2')" :class="{'select': type === '2'}">{{$t('myGuest.subject.xrwd')}}</span>
          <span @click="toxrFn('0')" :class="{'select': type === '0'}">{{$t('myGuest.subject.wpbd')}}</span>
        </p>
    </header>
    <div class='main' >
        <div class='list-wrap'>
            <Scroll
            ref="scroll"
            :data="list"
            :hasMore="hasMore"
            v-show="list.length > 0"
            @pullingUp="getPageTrust"
            >
                <div class='list' v-for='(item,index) in list' :key="index">
                    <div class='pic'>
                        <p :style="getUserPic(item.toUserInfo ? item.toUserInfo.photo : item.fromUserInfo.photo)" :class="{'hidden': !(item.toUserInfo ? item.toUserInfo.photo : item.fromUserInfo.photo)}" alt=""></p>
                        <!-- <img :class="{'hidden': item.toUserInfo.photo}" src="./txiang.png"/> -->
                        <HeadPic :content="item.toUserInfo ? item.toUserInfo.nickname.substring(0, 1) : item.fromUserInfo.nickname.substring(0, 1)" :class="{'hidden': item.toUserInfo ? item.toUserInfo.photo : item.fromUserInfo.photo}"/>
                    </div>
                    <div class='text'>
                        <div class='text1'>
                            <p class='txt1'><span class='name'>{{item.toUserInfo ? item.toUserInfo.nickname : item.fromUserInfo.nickname }}</span></p>
                            <p class='txt2 gray'>{{item.createDatetime}}</p>
                        </div>
                        <div class='text2'>
                            <p class='txt1'>{{$t('myGuest.subject.jycs')}}：{{item.toUserInfo ? item.toUserInfo.userStatistics.jiaoYiCount : item.fromUserInfo.userStatistics.jiaoYiCount}}</p>
                            <p class='txt2'>{{$t('myGuest.subject.xrrs')}}：{{item.toUserInfo ? item.toUserInfo.userStatistics.beiXinRenCount : item.fromUserInfo.userStatistics.beiXinRenCount}}</p>
                            <p class='txt2'>{{$t('myGuest.subject.hpl')}}：{{getPercentum(item.toUserInfo ? item.toUserInfo.userStatistics.beiHaoPingCount : item.fromUserInfo.userStatistics.beiHaoPingCount,item.toUserInfo ? item.toUserInfo.userStatistics.beiPingJiaCount : item.fromUserInfo.userStatistics.beiPingJiaCount)}}</p>
                        </div>
                    </div>
                </div>
            </Scroll>
            <div class="no-data" :class="{'hidden': len > 0}">
                <img src="./wu.png" />
                <p>暂无数据</p>
            </div>
        </div>

    </div>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import { myGuest, getPageTrust } from "api/person";
import { getUser, formatDate, formatAmount, isUnDefined, getAvatar, setTitle, getPercentum, getUserId } from "common/js/util";
import Scroll from 'base/scroll/scroll';
import HeadPic from 'base/head-pic/headPic';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      list: [],
      start: 1,
      limit: 10,
      hasMore: true,
      len: '',
      config: {
        start: 1,
        limit: 10,
        type: '1',
        userId: getUserId()
      },
      type: '1',
      isLoading: true
    };
  },
  created() {
    setTitle(this.$t('myGuest.subject.jyds'));
    // this.myGuest();
    this.getPageTrust();
  },
  methods: {
    getPercentum(num1, num2){
      return getPercentum(num1, num2);
    },
    // 获取头像
    getUserPic(pic){
      return getAvatar(pic);
    },
    myGuest() { // 邀请好友列表
      myGuest(this.start, this.limit).then(data => {
        data.list.map( v => {
            v.total = formatAmount(v.tradeAwardCount + v.regAwardCount, '', 'FMVP');
            v.regAwardCount = formatAmount(`${v.regAwardCount}`, '', 'FMVP');
            v.tradeCount = formatAmount(`${v.tradeCount}`, '', 'FMVP');
            v.tradeAwardCount = formatAmount(`${v.tradeAwardCount}`, '', 'FMVP');
            v.createDatetime = formatDate(v.createDatetime, 'yyyy-MM-dd');
        });
        if (data.totalPage <= this.start) {
          this.hasMore = false;
        }
        this.list = [...this.list, ...data.list];
        this.len = this.list.length;
        this.start++;
      });
    },
    getPageTrust(){
      this.isLoading = true;
      this.config.start = this.start;
      getPageTrust(this.config).then(data => {
        this.isLoading = false;
        data.list.map( v => {
          v.createDatetime = formatDate(v.createDatetime, 'yyyy-MM-dd');
        });
        if (data.totalPage <= this.start) {
          this.hasMore = false;
        }
        this.list = [...this.list, ...data.list];
        this.len = this.list.length;
        this.start++;
      }, () => {
        this.isLoading = false;
      });
    },
    toxrFn(type){
      this.type = type;
      if (type === '2') {
        this.config.type = '1';
        this.config.toUser = getUserId();
        delete this.config.userId;
      } else {
        this.config.type = type;
        this.config.userId = getUserId();
        delete this.config.toUser;
      };
      this.start = 1;
      this.list = [];
      this.getPageTrust();
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

.guest-wrapper {
  font-size: 0.28rem;
  color: #333;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .red {
    color: #d53d3d;
  }
  .gray {
    color: #999;
  }

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    background: #fff;
    width: 100%;
    padding: 0 0.3rem;
    margin-bottom: 0.2rem;
    position: relative;
    z-index: 9;
    p{
      display: flex;
      justify-content: space-around;
      color: #666;
      font-size: 0.32rem;
    }
  }
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 1.1rem;
    z-index: 8;
    background: #fff;
    .list-wrap {
      display: block;
      width: 100%;
      .list {
        width: 100%;
        display: flex;
        padding: 0.4rem 0.3rem;
        border-bottom: 0.01rem solid #e5e5e5;
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
          img{
              width: 100%;
              height: 100%;
          }
        }
        .text {
          width: 83%;
          font-size: 0.24rem;
          color: #323232;
          .text1,
          .text2 {
            display: flex;
            justify-content: space-between;
          }

          .text1 {
            padding-bottom: 0.27rem;
            .name {
              font-size: 0.28rem;
              font-weight: bold;
            }
            .slogn1 {
              display: inline-block;
              width: 0.74rem;
              border-radius: 0.04rem;
              background: #d53d3d;
              font-size: 0.2rem;
              color: #fff;
              text-align: center;
              line-height: 0.28rem;
              margin-left: 0.23rem;
            }
            .slogn2 {
              display: inline-block;
              width: 0.74rem;
              border-radius: 0.04rem;
              background: #b3b3b3;
              font-size: 0.2rem;
              color: #fff;
              text-align: center;
              line-height: 0.28rem;
              margin-left: 0.23rem;
            }
          }
        }
      }
    }
  }
  .select{
    color: #d53d3d;
    border-bottom: .04rem solid #d53d3d;
  }
}
</style>
