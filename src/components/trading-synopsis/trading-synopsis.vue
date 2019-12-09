<template>
  <div class="synopsis-wrapper" @click.stop>
     <div class='main'>
      <h3>{{symbolData.symbol}}</h3>
      <div class='text1' v-html="symbolData.introduction"></div>
     </div>
  </div>
</template>
<script>
import { getSymbolDetail } from 'api/bb';
import { getLangType } from 'common/js/util';
  export default {
    data(){
      return {
        setBazDeal: {},
        symbolData: {}
      }
    },
    props: {
      bazDeal: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    created() {
      const {symbol, toSymbol, origin} = this.$route.query;
      if(symbol && toSymbol && origin === 'APP') {
        this.setBazDeal = {
            symbol,
            toSymbol
        };
        this.symbolDetail();
      }
    },
    methods: {
      symbolDetail(){// 查询资料
        getSymbolDetail(this.setBazDeal.symbol).then(data => {
          if (getLangType() === 'en') {
            data.introduction = data.enIntroduction;
          };
          this.symbolData = data;
        })
      }
    },
    watch: {
      bazDeal: {
        handler(val, oldVal){
          this.setBazDeal = val;
          this.symbolDetail();
        },
        deep: true
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

.synopsis-wrapper {
  width: 100%;
  background: #172432;
  font-size: .28rem;
  color: #ccc;
  line-height: .35rem;
  .main {
    width: 100%;
    padding: 0 .3rem;
    h3 {
      font-size: .32rem;
      color: #fff;
      padding: .3rem 0 .36rem;
    }
    .text1, .text2 {
      padding-bottom: .4rem;
    }

  }

}
</style>
