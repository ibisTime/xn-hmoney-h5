<template>
  <div class="policy-wrapper" @click.stop>
    <div class="container" v-html="cvalue">

    </div>
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import { setTitle, getUrlParam } from "common/js/util";
import { getSysConfig } from "api/general";
import FullLoading from 'base/full-loading/full-loading';
export default {
  data() {
    return {
      tit: '',
      ckey: '',
      cvalue: '',
      isLoading: true
    };
  },
  created() {
    this.ckey = getUrlParam('ckey');
    switch(this.ckey){
      case 'plat_introduce': this.tit = this.$t('aboutprivacy.subject.ptjs');break;
      case 'reg_protocol': this.tit = this.$t('aboutprivacy.subject.yhxy');break;
      case 'privacy': this.tit = this.$t('aboutprivacy.subject.ystk');break;
      case 'raw_note': this.tit = this.$t('aboutprivacy.subject.flsm');break;
      case 'fee_note': this.tit = this.$t('aboutprivacy.subject.fvsm');break;
      case 'service': this.tit = this.$t('aboutprivacy.subject.lxwm');break;
    }
    setTitle(this.tit);
    getSysConfig(this.ckey).then(data => {
      this.cvalue = data.cvalue;
      this.isLoading = false;
    })
  },
  components: {
    FullLoading
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.policy-wrapper {
  font-size: .3rem;
  width: 100%;
  min-height: 13.3rem;
  background: #fff;
  header {
    font-size: .36rem;
    line-height: .88rem;
    width: 100%;
    border-bottom: .01rem solid #dedede;
    text-align: center;
  }
  .container{
    padding: 0.2rem 0.3rem;
    line-height: 1.7;
  }
}
  

</style>
