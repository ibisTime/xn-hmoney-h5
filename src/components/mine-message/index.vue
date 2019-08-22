<template>
  <div class="mine_message">
    <div class="header" @click="selectedSingle">
      <div class="single" :class="skey === 'all' ? 'active' : ''" data-key="all">
        全部
      </div>
      <div class="single" :class="skey === 'todo' ? 'active' : ''" data-key="todo">
        待办事项
      </div>
      <div class="single" :class="skey === 'msg' ? 'active' : ''" data-key="msg">
        系统公告
      </div>
    </div>
    <ul class="msg_main">
      <li class="single_li">
        <h5>您充值的0.1 BTC已到账</h5>
        <p>
          <span class="sp_left">2019-10-10 20:00:00</span>
          <span class="sp_right">系统公告</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import { setTitle } from 'common/js/util';
  export default {
    data() {
      return {
        skey: 'all'
      }
    },
    created() {
      setTitle('消息')
    },
    methods: {
      selectedSingle(ev) {
        const skey = ev.target.getAttribute('data-key');
        if(skey) {
          this.skey = skey;
          switch (skey) {
            case 'all': return;
            case 'todo': return;
            case 'msg': return;
          }
        }
      }
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
