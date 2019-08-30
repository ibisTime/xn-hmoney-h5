<template>
  <div class="mine_message">
    <div class="header" @click="selectedSingle">
      <div class="single" :class="skey === 'todo' ? 'active' : ''" data-key="todo">
        待办事项
      </div>
      <div class="single" :class="skey === 'msg' ? 'active' : ''" data-key="msg">
        系统公告
      </div>
    </div>
    <ul class="msg_main">
      <Scroll
        ref="scroll"
        :data="list"
        :hasMore="hasMore"
        v-show="list.length > 0"
        @pullingUp="selectedSingle"
      >
      <li class="single_li" v-for='(item,index) in list' :key='index'>
        <h5>{{item.title}}</h5>
        <p>
          <span class="sp_left">{{item.createDatetime}}</span>
          <span class="sp_right">{{item.type}}</span>
        </p>
      </li>
      </Scroll>
    </ul>
    <div class="no-data" :class="{'hidden': list.length > 0}">
      <img src="./wu.png" />
      <p>{{$t('walletBill.subject.zwjl')}}</p>
    </div>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>

<script>
  import { setTitle, formatDate } from 'common/js/util';
  import {mineMessage, mineNotice} from 'api/mine';
  import {getUserId} from 'common/js/util';
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';
  export default {
    data() {
      return {
        skey: 'todo',
        isLoading: true,
        hasMore: true,
        config: {
          userId: getUserId(),
          start: 1,
          limit: 10
        },
        start: 1,
        limit: 10,
        configNtc: {
          userId: getUserId(),
          start: 1,
          limit: 10
        },
        startNtc: 1,
        limitNtc: 10,
        list: []
      }
    },
    created() {
      setTitle('消息');
      this.config.start = this.start;
      this.config.limit = this.limit;
      this.mineMessage(this.config);
    },
    methods: {
      selectedSingle(ev) {
        this.config.start = this.start;
        this.config.limit = this.limit;
        this.configNtc.start = this.startNtc;
        this.configNtc.limit = this.limitNtc;
        const skey = ev.target.getAttribute('data-key');
        if(skey) {
          this.skey = skey;
          switch (skey) {
            case 'todo':
              this.list = [];
              this.config.start = 1;
              this.mineMessage(this.config);
              return;
            case 'msg':
              this.list = [];
              this.configNtc.start = 1;
              this.mineNotices(this.configNtc);
              return;
          }
        }
      },
      mineNotices(config) {
         mineNotice(config).then(data => {
          data.list.map(item => {
            item.content = item.content;
            item.type = (item.type === '1' ? '系统消息' : '订单消息');
            item.title = item.title;
            item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
          })
          if (data.totalPage <= this.startNtc) {
            this.hasMore = false;
          }
          this.list = [...this.list, ...data.list];
          this.startNtc ++;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      },
      mineMessage(config) {
        mineMessage(config).then(data => {
          data.list.map(item => {
            item.content = item.content;
            item.type = (item.type === '1' ? '系统消息' : '订单消息');
            item.title = item.title;
            item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
          })
          if (data.totalPage <= this.start) {
            this.hasMore = false;
          }
          this.list = [...this.list, ...data.list];
          this.start ++;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      }
    },
    components: {
      Scroll,
      FullLoading
    }
  }
</script>

<style lang="scss" scoped>
  .mine_message{
    height: 100%;
    background-color: #fff;
    .header{
      border-bottom: 1px solid #B7B7B7;
      display: flex;
      justify-content: space-around;
      .single{
        width: 30%;
        text-align: center;
        color: #595959;
        font-size: 0.32rem;
        border-bottom: 2px solid transparent;
        padding-top: 0.28rem;
        padding-bottom: 0.28rem;
      }
      .active{
        color: #DA5454;
        border-bottom: 2px solid #DA5454;
      }
    }
    .msg_main{
      .single_li{
        padding: 0.3rem 0.3rem;
        border-bottom: 1px solid #E6E6E6;
        h5{
          font-weight: 500;
          font-size: 0.3rem;
          color: #333333;
          margin-bottom: 0.22rem;
        }
        p{
          font-size: 0.24rem;
          color: #999;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>
