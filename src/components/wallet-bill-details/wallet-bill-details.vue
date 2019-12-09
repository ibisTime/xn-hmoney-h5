<template>
  <div class="bill-details-wrapper" @click.stop>
      <div class='header'>
      </div>
      <div class='box'>
            <div class='mess'>
                <p class='name'>{{typeName}}</p>
                <p class='num'>{{data.transAmountString}} {{data.currency}}</p>
            </div>
      </div>
      <div class='main'>
          <div class='list'>
              <span class='txt1'>{{$t('billDetail.subject.bdqje')}}</span>
              <span class='txt2'>{{data.preAmountString}} {{data.currency}}</span>
          </div>
          <div class='list'>
              <span class='txt1'>{{$t('billDetail.subject.bdhje')}}</span>
              <span class='txt2'>{{data.postAmountString}} {{data.currency}}</span>
          </div>
          <div class='list'>
              <span class='txt1'>{{$t('billDetail.subject.bdsj')}}</span>
              <span class='txt2'>{{data.createDatetime}}</span>
          </div>
          <div class='list'>
              <span class='txt1'>明细说明</span>
              <span class='txt2'>{{data.bizNote}}</span>
          </div>
      </div>
  </div>
</template>
<script>
import { getUrlParam, formatDate, formatAmount, setTitle, getTranslateText } from 'common/js/util';
import { billDetails } from 'api/person';
import { getSysConfig, getDictList } from 'api/general';

export default {
    data() {
        return {
            data: [],
            typeName: '',
            code: '',
            isLoading: true,
            bizTypeValueList: []
        }
    },
    created() {
        setTitle(this.$t('billDetail.subject.zdxq'));
        const type = getUrlParam('type');
        this.code = getUrlParam('code');
        getDictList('jour_biz_type_user').then(data => {
            const list = data.filter(item => item.dkey === type);
            if(list.length > 0) {
                this.typeName = list[0].dvalue;
            }
        });
        this.billDetails();
    },
    methods: {
        billDetails() {
            billDetails(this.code).then((data) => {
                data.transAmountString = formatAmount(data.transAmountString, '', data.currency);
                data.postAmountString = formatAmount(data.postAmountString, '', data.currency);
                data.preAmountString = formatAmount(data.preAmountString, '', data.currency);
                this.data = data;
                this.data.createDatetime = formatDate(data.createDatetime, 'yyyy-MM-dd hh:mm:ss');
            });
        }
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
    height: 100%;
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
