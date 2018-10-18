<template>
  <div class="bill-wrapper" @click.stop>
    <header>
      <p>
      <i class='icon'></i>
      <span class='txt1'>账单</span>
      <span class='txt2'>筛选
        <!-- <select name="" id="" v-model="billType" @change="walletTypeFn">
          <option value="">全部</option>
          <option value="charge">充币</option>
          <option value="withdraw">提币</option>
          <option value="ccorder_buy">交易买入</option>
          <option value="ccorder_sell">交易卖出</option>
          <option value="accept_buy">场外承兑商购买</option>
          <option value="accept_sell">场外承兑商出售</option>
          <option value="ccorder_fee">交易手续费</option>
          <option value="withdraw_fee">提现手续费</option>
          <option value="award_reg">邀请好友收入</option>
          <option value="">冻结记录</option>
        </select> -->
      </span>
      </p>
    </header>
    <div class='list-wrap'>
      <Scroll 
        ref="scroll"
        :data="list"
        :hasMore="hasMore"
        v-show="list.length > 0"
        @pullingUp="walletBill"
      >
        <router-link :to="'bill-details' + '?code=' + item.code + '&type=' + bizTypeValueList[item.bizType]" class="bill-list" v-for='(item,index) in list' :key='index'>
          <div class="list">
            <div class='mark'>
              <i :class="[item.transAmountString < 0 ? 'icon' : 'icon ico3']"></i>
            </div>
            <div class='item'>
              <p class='collect'>
                <span class='txt1'>{{bizTypeValueList[item.bizType]}}</span>
                <span :class="[item.transAmountString < 0 ? 'txt2' : 'txt2 txt22']">{{item.transAmountString}}{{item.currency}}</span>
              </p>
              <p class='time'>{{item.createDatetime}}</p>
              <p class='explain'>{{item.bizNote}}</p>
            </div>
          </div>
        </router-link>
      </Scroll>
      <div class="no-data" :class="{'hidden': list.length > 0}">
        <img src="./wu.png" />
        <p>暂无订单</p>
      </div>
    </div>
    <!-- 筛选弹窗 -->
    <div class='select'>
      <!-- <p>
        <span>取消</span>
        <span>确定</span>
      </p> -->

    </div>
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import { getUrlParam, formatDate, formatAmount } from 'common/js/util';
import { walletBill } from 'api/person';
import { getDictList } from 'api/general';
import Scroll from 'base/scroll/scroll';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      isLoading: true,
      hasMore: true,
      billType: '',
      list: [],
      code: '12345',
      start: 1,
      limit: 10,
      config: {
        accountNumber: '',
        bizType: '',
        start: 1,
        limit: 10
      },
      bizTypeValueList: []
    }
  },
  created() {
    this.config.accountNumber = getUrlParam('accountNumber');
    getDictList('jour_biz_type_user').then(data => {
      data.forEach((item) => {
        this.bizTypeValueList[item.dkey] = item.dvalue
      })
    })
    this.walletBill();
  },
  methods: {
    walletTypeFn(){
      // 筛选
      this.config.bizType = this.billType;
      this.walletBill();
    },
    walletBill() { // 充币：charge     提币：withdraw
      this.config.start = this.start;
      this.config.limit = this.limit;
      // 获取账单列表
      walletBill(this.config).then((data) => {
        data.list.map(item => {
          item.transAmountString = formatAmount(item.transAmountString, '', item.currency);
          item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh-mm-ss');
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
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.bill-wrapper {
  font-size: 0.28rem;
  color: #333;
  overflow: auto;
  
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    line-height: .88rem;
    width: 100%;
    padding: 0 .3rem;
    background: #fff;
    margin-bottom: .2rem;

    p {
      display: flex;
      justify-content: space-between;

      .icon {
        width: .2rem;
        height: .36rem;
        @include bg-image("返回");
        margin-top: .28rem;
      }

      .txt1 {
        font-size: .36rem;
        font-weight: bold;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

      }

      .txt2 {
        font-size: .32rem;
      }

    }
  }

  .bill-list {
    display: block;
    width: 100%;
    background: #fff;
    padding: .26rem .3rem 0;

    .list {
      width: 100%;
      height: 1.52rem;
      display: flex;
      border-bottom: .01rem solid #e5e5e5;

      .mark {
        border-radius: 50%;
        margin-top: .26rem;

        .icon {
          width: .6rem;
          height: .6rem;
          @include bg-image("收款");
          margin-right: .32rem;
        }

        .ico1 {
          @include bg-image("充值");
        }

        .ico2 {
          @include bg-image("转出");
        }

        .ico3 {
          @include bg-image("转入");
        }

        .ico4 {
          @include bg-image("提现");
        }

      }

      .item {
        width: 86%;

        .collect {
          display: flex;
          justify-content: space-between;
         
          .txt1 {
            font-size: .28rem;
            font-weight: bold;
            line-height: .4rem;
            color: #333;
          }

          .txt2 {
            font-size: .32rem;
            color: #0ec55b;
            line-height: .45rem;
            font-weight: 600;
          }

          .txt22 {
            color: #d35d3d;
          }

        }

        .time {
          font-size: .22rem;
          line-height: .3rem;
          margin-bottom: .08rem;
          color: #333;
        }

        .explain {
          font-size: .22rem;
          color: #adbacd;
          line-height: .3rem;
          width: 4.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

      }

    }

  }

  .list-wrap{
    height: 12rem;
    overflow: scroll;
  }



}

</style>
