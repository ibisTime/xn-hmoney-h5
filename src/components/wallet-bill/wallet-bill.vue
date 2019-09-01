<template>
  <div class="bill-wrapper" @click.stop>
    <div class='list-wrap'>
      <div class="selected_wallet">
        <p class="wallet-p"></p>
        <select name="" id="wallet-set" v-model="billType" @change="walletTypeFn">
          <option :value="item.key" v-for="(item, index) in watlleType" :key="index">{{item.value}}</option>
        </select>
      </div>
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
              <i :class="[item.transAmountString > 0 ? 'icon' : 'icon ico3']"></i>
            </div>
            <div class='item'>
              <p class='collect'>
                <span class='txt1'>{{bizTypeValueList[item.bizType]}}</span>
                <span :class="[item.transAmountString > 0 ? 'txt2' : 'txt2 txt22']">{{item.transAmountString}}{{item.currency}}</span>
              </p>
              <p class='time'>{{item.createDatetime}}</p>
              <p class='explain'>{{getBizNote(item)}}</p>
            </div>
          </div>
        </router-link>
      </Scroll>
      <div class="no-data" :class="{'hidden': list.length > 0}">
        <img src="./wu.png" />
        <p>{{$t('walletBill.subject.zwjl')}}</p>
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
import { getUrlParam, formatDate, formatAmount, setTitle, getTranslateText } from 'common/js/util';
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
      watlleType: [
        {
          key: [],
          value: this.$t('walletBill.subject.qb')
        },{
          key: ['charge'],
          value: this.$t('walletBill.subject.cb')
        },{
          key: ['withdraw'],
          value: this.$t('walletBill.subject.tb')
        },{
          key: ['ccorder_buy', 'bborder_buy', 'accept_buy'],
          value: this.$t('walletBill.subject.jymr')
        },{
          key: ['ccorder_sell', 'bborder_sell', 'accept_sell'],
          value: this.$t('walletBill.subject.jymc')
        },{
          key: ['ccorder_fee', 'bborder_fee', 'withdraw_fee'],
          value: this.$t('walletBill.subject.sxf')
        },{
          key: ['game_in'],
          value:  this.$t('walletBill.subject.yxzr')
        },{
          key: ['game_out'],
          value: this.$t('walletBill.subject.yxzc')
        },{
          key: [
            'ccorder_frozen',
            'ccorder_unfrozen_revoke',
            'ccorder_unfrozen_trade',
            'bborder_frozen',
            'bborder_unfrozen_revoke',
            'bborder_unfrozen_trade',
            'withdraw_frozen',
            'withdraw_unfrozen',
            'accept_frozen',
            'accept_unfrozen'
          ],
          value: this.$t('walletBill.subject.djjd')
        }
      ],
      code: '12345',
      start: 1,
      limit: 10,
      config: {
        accountNumber: '',
        start: 1,
        limit: 10
      },
      bizTypeValueList: []
    }
  },
  created() {
    setTitle(this.$t('walletBill.subject.zzjl'));
    this.config.accountNumber = getUrlParam('accountNumber');
    getDictList('jour_biz_type_user').then(data => {
      data.forEach((item) => {
        this.bizTypeValueList[item.dkey] = item.dvalue;
      });
    })
    this.walletBill();
  },
  methods: {
    walletTypeFn(){
      // 筛选
      this.FullLoading = true;
      if(this.billType.length > 0){
        this.config.bizTypeList = this.billType;
      }else{
        delete this.config.bizTypeList;
      }
      this.hasMore = true;
      this.start = 1;
      this.list = [];
      this.walletBill();
    },
    walletBill() { // 充币：charge     提币：withdraw
      this.config.start = this.start;
      this.config.limit = this.limit;
      // 获取账单列表
      walletBill(this.config).then((data) => {
        data.list.map(item => {
          item.transAmountString = formatAmount(item.transAmountString, '', item.currency);
          item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
        });
        if (data.totalPage <= this.start) {
          this.hasMore = false;
        }
        this.list = [...this.list, ...data.list];
        this.start ++;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    },
    getBizNote(item) {
      // 币币交易买入卖出
      if (item.bizType === 'bborder_frozen') {
        console.log(getTranslateText(item.bizNote));
        return getTranslateText(item.bizNote);
        // 充值
      } else if (item.bizType === 'charge') {
        if(item.bizNote.indexOf('充币-来自地址') > -1) {
          return item.bizNote.replace('充币-来自地址', getTranslateText('充币-来自地址'));
        } else if(item.bizNote.indexOf('充币-来自交易') > -1) {
          return item.bizNote.replace('充币-来自交易', getTranslateText('充币-来自交易'));
        } else if(item.bizNote.indexOf('充币-交易id') > -1) {
          return item.bizNote.replace('充币-交易id', getTranslateText('充币-交易id'));
        } else if(item.bizNote.indexOf('充币-来自地址') > -1) {
          return item.bizNote.replace('充币-外部地址', getTranslateText('充币-外部地址'));
        } else {
          return this.bizTypeValueList[item.bizType];
        }
      } else {
        return this.bizTypeValueList[item.bizType];
      }
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
        background-image: url('./fh.png');
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
          background-image: url('./sk.png');
          margin-right: .32rem;
        }

        .ico1 {
          background-image: url('./cz.png');
        }

        .ico2 {
          background-image: url('./zc.png');
        }

        .ico3 {
          background-image: url('./zr.png');
        }

        .ico4 {
          background-image: url('./tx.png');
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
    position: relative;
    height: 13rem;
    overflow: scroll;
    .selected_wallet{
      position: absolute;
      right: 5%;
      top: 0.6rem;
      z-index: 5;
      &:hover .wallet-p{
        opacity: 0.9;
      }
    }
    .wallet-p{
      height: 1rem;
      width: 1rem;
      opacity: 0.3;
      background-image: url('./sxuan.png');
      background-size: 100%;
    }
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
