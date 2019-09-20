<template>
  <div class="mine_message">
    <div class="header" @click="selectedSingle">
      <div class="single" :class="skey === 'todo' ? 'active' : ''" data-key="todo">
        我的消息
      </div>
      <div class="single" :class="skey === 'common' ? 'active' : ''" data-key="common">
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
        <li
          class="single_li"
          v-for='(item,index) in list'
          :key='index'
          @click="() => {toNoticeDetail(item.code)}"
        >
          <h5>{{item.title}}</h5>
          <p>
            <span class="sp_left">{{item.createDatetime}}</span>
            <!-- <span class="sp_right">{{item.type}}</span> -->
          </p>
        </li>
      </Scroll>
    </ul>
    <div class="no-data" :class="{'hidden': list.length > 0}">
      <img src="./wu.png" />
      <p>暂无数据</p>
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
          limit: 20,
          type: 1
        },
        configNtc: {
          userId: getUserId(),
          start: 1,
          limit: 20,
          type: 0
        },
        configAll: {
          userId: getUserId(),
          start: 1,
          limit: 20
        },
        list: []
      }
    },
    created() {
      setTitle('消息');
      const mes_skey = sessionStorage.getItem('mes_skey') || 'todo';
      this.skey = mes_skey;
      if(mes_skey === 'todo') {
        this.mineMessage();
        return;
      }
      if(mes_skey === 'common'){
        this.mineNotices();
        return;
      }
    },
    methods: {
      selectedSingle(ev) {
        this.config.start = 1;
        this.configNtc.start = 1;
        this.configAll.start = 1;
        this.list = [];
        const skey = ev.target.getAttribute('data-key');
        if(skey) {
          this.skey = skey;
          sessionStorage.setItem('mes_skey', skey);
          switch (skey) {
            case 'todo':
              this.mineMessage();
              return;
            case 'common':
              this.mineNotices();
              return;
          }
        }
      },
      // 公告
      mineNotices() {
        mineNotice(this.configNtc).then(data => {
          data.list.map(item => {
            // item.type = (item.type === '1' ? '系统消息' : '订单消息');
            item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
          })
          if (data.totalPage <= this.configNtc.start) {
            this.hasMore = false;
          }
          this.list = [...this.list, ...data.list];
          this.configNtc.start ++;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      },
      // 我的消息
      mineMessage() {
        mineMessage(this.config).then(data => {
          data.list.map(item => {
            item.content = item.content;
            item.code = item.smsCode;
            // item.type = (item.type === '1' ? '系统消息' : '订单消息');
            item.title = item.title;
            item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
          })
          if (data.totalPage <= this.config.start) {
            this.hasMore = false;
          }
          this.list = [...this.list, ...data.list];
          this.config.start ++;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      },
      mineMessageAll() {
        mineMessage(this.configAll).then(data => {
          data.list.map(item => {
            item.content = item.content;
            // item.type = (item.type === '1' ? '系统消息' : '订单消息');
            item.title = item.title;
            item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
          })
          if (data.totalPage <= this.configAll.start) {
            this.hasMore = false;
          }
          this.list = [...this.list, ...data.list];
          this.configAll.start ++;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      },
      toNoticeDetail(code) {
        this.$router.push(`/system-notice-detail?code=${code}`);
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
