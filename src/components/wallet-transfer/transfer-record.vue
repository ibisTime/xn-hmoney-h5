<template>
  <div class="bill-wrapper" @click.stop>
    <div class='list-wrap' v-show="list.length > 0">
      <Scroll
        ref="scroll"
        :data="list"
        :hasMore="hasMore"
        @pullingUp="getTransferRecord"
      >
        <div class="bill-list">
          <div class="list" v-for="item in list" :key="item.code">
              <div class="list_single">
                  <div class="left">
                      转出金额：<span class="red">{{item.amount}} {{item.currency}}</span>
                  </div>
                  <div class="red">{{item.status}}</div>
              </div>
              <div class="list_single">
                  <div class="left">
                      手续费：<span class="red">{{item.fee}} {{item.currency}}</span>
                  </div>
                  <div>{{item.applyDatetime}}</div>
              </div>
              <div class="list_single">
                  <div class="left">
                      <span style="font-size: 0.28rem;">转出地址：</span><span class="red" style="font-size: 0.24rem;">{{item.payCardNo}}</span>
                  </div>
              </div>
          </div>
        </div>
      </Scroll>
      <div class="no-data" :class="{'hidden': list.length > 0}">
        <img src="./wu.png" />
        <p>暂无记录</p>
      </div>
    </div>
    <!-- 筛选弹窗 -->
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import { getUrlParam, formatDate, formatAmount, setTitle, getTranslateText, formatMoneySubtract } from 'common/js/util';
import { transferRecord } from 'api/person';
import { getDictList } from 'api/general';
import Scroll from 'base/scroll/scroll';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      isLoading: true,
      hasMore: true,
      list: [],
      config: {
        accountNumber: '',
        start: 1,
        limit: 20,
        bizType: 'transfer'
      },
      statusObj: {}
    }
  },
  created() {
    setTitle('转出记录');
    this.config.accountNumber = getUrlParam('accountNumber');
    this.config.bizType = getUrlParam('bizType');
    getDictList('withdraw_status').then(data => {
      for(let i = 0, len = data.length; i < len; i ++) {
          this.statusObj[data[i].dkey] = data[i].dvalue;
      }
      this.getTransferRecord();
    });
  },
  methods: {
      getTransferRecord() {
          this.isLoading = true;
          transferRecord(this.config).then(data => {
              data.list.map(item => {
                  item.amount = formatAmount(item.amount, '', item.currency);
                  item.fee = formatAmount(item.fee, '', item.currency);
                  item.status = this.statusObj[item.status],
                  item.applyDatetime = formatDate(item.applyDatetime, 'yyyy-MM-dd hh:mm:ss');
              });
              if (data.totalPage <= this.config.start) {
                this.hasMore = false;
              }
              this.list = [...this.list, ...data.list];
              this.config.start ++;
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
  background-color: #fff;
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
  .bill-list {
    display: block;
    width: 100%;
    background: #fff;
    .list {
      width: 100%;
      padding: .26rem .2rem 0.2rem;
      min-height: 1rem;
      border-bottom: .01rem solid #e5e5e5;
      .list_single{
          display: flex;
          justify-content: space-between;
          line-height: 0.54rem;
          color: '#333';
          font-size: 0.28rem;
          .red{
            color: #d53d3d;
          }
          .left{
              display: flex;
              align-items: center;
          }
      }
    }
  }

  .list-wrap{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: scroll;
    background-color: #fff;
    #wallet-set{
      position: absolute;
      opacity: 0;
      right: 0.1rem;
      top: 0.1rem;
      left: 0.1rem;
      bottom: 0.1rem;
      z-index: 9;
    }
  }
}

</style>
