<template>
  <div class="policy-wrapper" @click.stop>
    <div class="container" v-html="cvalue">

    </div>
  </div>
</template>
<script>
import { setTitle, getUrlParam } from "common/js/util";
import { getSysConfig } from "api/general"
export default {
  data() {
    return {
      tit: '',
      ckey: '',
      cvalue: ''
    };
  },
  created() {
    this.ckey = getUrlParam('ckey');
    switch(this.ckey){
      case 'about_us': this.tit = '平台介绍';break;
      case 'reg_protocol': this.tit = '用户协议';break;
      case 'privacy': this.tit = '隐私条款';break;
      case 'raw_note': this.tit = '法律申明';break;
      case 'fee_note': this.tit = '费率说明';break;
    }
    setTitle(this.tit);
    getSysConfig(this.ckey).then(data => {
      this.cvalue = data.cvalue;
    })
  },
  methods: {}
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
  }
}
  

</style>
