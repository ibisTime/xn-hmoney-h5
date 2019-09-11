<template>
  <div class="publish-wrapper" @click.stop>
    <!-- <div class='header'>
        <i class='icon'></i>
        <span class='txt1'>历史委托</span>
    </div> -->
    <div class='main'>
        <Scroll
          ref="scroll"
          :data="hisDataList"
          :hasMore="hasMore"
          v-show="hisDataList.length > 0"
          @pullingUp="getHistory"
        >
            <div class='list' v-for="(item, index) in hisDataList" :key="index">
                <p class='text1'>
                    <span :class='item.direction == "0" ? "green" : "red1"'>{{item.direction == '0' ? $t('historyEntrust.subject.mr') : $t('historyEntrust.subject.mc')}}</span>
                    <span>{{item.createDatetime}}</span>
                    <span class='red'>{{item.status}}</span>
                </p>
                <div class='text2'>
                    <div class='txt1'>
                        <p>{{$t('common.jg')}}({{item.toSymbol}})</p>
                        <p class='black'>{{item.type == 0 ? $t('historyEntrust.subject.sj') : item.price}}</p>
                    </div>
                    <div class='txt2'>
                        <p>{{$t('historyEntrust.subject.ze')}}({{(item.direction == 0 && item.type == 0) ? item.toSymbol : item.symbol}})</p>
                        <p class='black'>{{(item.direction == 0 && item.type == 0) ? item.totalAmount : item.totalCount}}</p>
                    </div>
                    <div class='txt2'>
                        <p>{{$t('historyEntrust.subject.ycj')}}({{(item.direction == 0 && item.type == 0) ? item.toSymbol : item.symbol}})</p>
                        <p class='black'>{{(item.direction == 0 && item.type == 0) ? item.tradedAmount : item.tradedCount}}</p>
                    </div>
                    <!--<div class='txt3'>-->
                        <!--<p>{{$t('historyEntrust.subject.sjcj')}}({{item.symbol}})</p>-->
                        <!--<p class='black'>{{item.avgPrice}}</p>-->
                    <!--</div>-->
                </div>
            </div>
        </Scroll>
        <div class="no-data" :class="{'hidden': hisDataList.length > 0}">
          <img src="./zwdata.png" />
          <p>{{$t('historyEntrust.subject.zwdd')}}</p>
        </div>
    </div>
    <FullLoading  ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import FullLoading from 'base/full-loading/full-loading';
import { getUrlParam, formatAmount, setTitle, formatDate, getUserId } from "common/js/util";
import { getMyHistoryData } from "api/bb";
import { getDictList } from 'api/general';
export default {
  data() {
    return {
        isLoading: true,
        hasMore: true,
        start: 1,
        limit: 10,
        hisConfig: {
            userId: getUserId(),
            start: 1,
            limit: 10,
            symbol: 'FMVP',
            toSymbol: 'BTC'
        },
        hisDataList: [],
        statusValueList: {}
    };
  },
  created() {
    setTitle(this.$t('historyEntrust.subject.lswt'));
    this.hisConfig.symbol = getUrlParam('symbol');
    this.hisConfig.toSymbol = getUrlParam('toSymbol');
    getDictList('simu_order_status').then(data => {
        data.forEach((item) => {
            this.statusValueList[item.dkey] = item.dvalue;
        });
        this.getHistory();
    });
  },
  updated() {},
  computed: {},
  methods: {
    getHistory(){
        this.hisConfig.start = this.start;
        this.hisConfig.limit = this.limit;
        getMyHistoryData(this.hisConfig).then(data => {
            data.list.map(item => {
                item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
                item.price = formatAmount(`${item.price}`, '', item.toSymbol);
                item.totalAmount = formatAmount(`${item.totalAmount}`, '', item.toSymbol);
                item.totalCount = formatAmount(`${item.totalCount}`, '', item.symbol);
                item.tradedAmount = formatAmount(`${item.tradedAmount}`, '', item.toSymbol);
                item.tradedCount = formatAmount(`${item.tradedCount}`, '', item.symbol);
                item.avgPrice = formatAmount(`${item.avgPrice}`, '', item.toSymbol);
                item.status = this.statusValueList[item.status];
            });
            if (data.totalPage <= this.start) {
                this.hasMore = false;
            }
            this.hisDataList = [...this.hisDataList, ...data.list];
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

.publish-wrapper {
    width: 100%;
  height: 100%;
    background: #fff;
    font-size: .28rem;
    color: #999;
    overflow: auto;
    .icon {
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
    }

    .header {
        padding: 0 .3rem;
        font-size: .36rem;
        text-align: center;
        line-height: .88rem;
        color: #333;
        .icon {
            float: left;
            width: .2rem;
            height: .36rem;
            background-image: url('./fh.png');
            margin-top: .26rem;
        }
    }

    .main {
        position: absolute;
        width: 100%;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        background-color: #fff;
        padding: 0 .3rem;
        padding-bottom: 0.9rem;
        .red {
            color: #d53d3d;
        }
        .green {
            color: #0ec55b;
        }
        .black {
            color: #333;
        }
        .gray {
            color: #a0a0a2;
        }
        .list {
            width: 100%;
            padding: .4rem 0;
            border-top: .01rem solid #e5e5e5;
            .text1 {
                padding-bottom: .4rem;
                .green {
                margin-right: .36rem;
                }
                .red {
                float: right;
                }
                .red1{
                    color: #d53d3d;
                }
            }
            .text2 {
                display: flex;
                justify-content: space-between;
                font-size: .24rem;
                .black {
                font-size: .28rem;
                padding-top: .2rem;
                }
                .txt1 {
                text-align: left;
                }
                .txt2 {
                text-align: center;
                }
                .txt3 {
                text-align: right;
                }
            }
        }

    }


}
</style>
