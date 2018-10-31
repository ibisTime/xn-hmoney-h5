<template>
  <div class="bill-details-wrapper" @click.stop>
      <div class='header'>
            <!-- <p>
                <span class='title'>账单详情</span>
            </p> -->
      </div>
      <div class='box'>
            <div class='mess'>
                <p class='name'>{{type}}</p>
                <p class='num'>{{data.transAmountString}} {{data.currency}}</p>
            </div>
      </div>
      <div class='main'>
          <div class='list'>
              <span class='txt1'>变动前金额</span>
              <span class='txt2'>{{data.preAmountString}} {{data.currency}}</span>
          </div>
          <div class='list'>
              <span class='txt1'>变动后金额</span>
              <span class='txt2'>{{data.postAmountString}} {{data.currency}}</span>
          </div>
          <div class='list'>
              <span class='txt1'>手续费</span>
              <span class='txt2'>{{type == '提现' ? fee : '-'}}</span>
          </div>
          <div class='list'>
              <span class='txt1'>变动时间</span>
              <span class='txt2'>{{data.createDatetime}}</span>
          </div>
          <div class='list'>
              <span class='txt1'>明细状态</span>
              <span class='txt2'>{{data.bizNote}}</span>
          </div>
          <!-- <div class='list'>
              <span class='txt1'>明细摘要</span>
              <span class='txt3'>转出至239120320190djkfdsahf djfafk djfafk djfafk</span>
          </div> -->
      </div>
      <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import { getUrlParam, formatDate, formatAmount, setTitle } from 'common/js/util';
import { billDetails } from 'api/person';
import { getSysConfig } from 'api/general';
import FullLoading from 'base/full-loading/full-loading';

export default {
    data() {
        return {
            data: [],
            type: '',
            fee: '',
            isLoading: true
        }
    },
    created() {
        setTitle('账单详情');
        this.type = getUrlParam('type');
        this.billDetails();
        getSysConfig('withdraw_fee').then(data => {
            this.fee = data.cvalue * 100 + '%';
            this.isLoading = false;
        }, () => {
            this.isLoading = false;
        })
    },
    methods: {
        billDetails() {
            billDetails(getUrlParam('code')).then((data) => {
                data.transAmountString = formatAmount(data.transAmountString, '', data.currency);
                data.postAmountString = formatAmount(data.postAmountString, '', data.currency);
                data.preAmountString = formatAmount(data.preAmountString, '', data.currency);
                this.data = data;
                this.data.createDatetime = formatDate(data.createDatetime, 'yyyy-MM-dd hh:mm:ss');
            });
        }
    },
    components: {
        FullLoading
    }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.bill-details-wrapper {
    font-size: 0.3rem;
    color: #333;
    background: #fff;

    .icon {
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
    }

    .header {
        width: 100%;
        height: 2.2rem;
        padding: 0 .3rem 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        background-image: url('./zdxq.png');
        text-align: center;
        font-size: .36rem;
        line-height: .5rem ;
        color: #fff;
        
        p {
            padding-top: .18rem;

            .title {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }
            
            .icon {
                float: left;
                width: .2rem;
                height: .36rem;
                background-image: url('./fhbs.png');
            }
        }

    }

    .box {
         width: 100%;
         padding: 0 .3rem;
         position: absolute;
         left: 0;
         top: 1.18rem;

        .mess {
            width: 100%;
            height: 1.8rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            background-image: url('./xq.png');
            text-align: center;

            .name {
                font-size: .28rem;
                color: #666;
                line-height: .4rem;
                padding: .38rem 0 .04rem;
            }

            .num {
                font-size: .44rem;
                line-height: .62rem;
            }

        }

    }

    .main {
        margin-top: 1.22rem;

        .list {
            width: 100%;
            padding: 0 .3rem;
            display: flex;   
            box-shadow: 0 .01rem 0 0 #E5E5E5;
            .txt1 {
                width: 1.92rem;
                font-size: .28rem;
                color: #666;
                line-height: 1rem;
            }
            .txt2 {
                line-height: 1rem;
                width: 4.8rem;
                word-break: break-all;
                word-wrap:break-word;
                white-space:normal;
            }
            .txt3 {
                width: 4.8rem;
                line-height: .4rem;
                padding: .36rem 0;
            }
        }


    }



}


</style>
