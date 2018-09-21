<template>
  <div class="agreement-wrapper" @click.stop>
    <header>
       用户协议
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.agreement-wrapper {
  font-size: .3rem;
  width: 100%;
  background: #fff;
  header {
    font-size: .36rem;
    line-height: .88rem;
    width: 100%;
    border-bottom: .01rem solid #dedede;
    text-align: center;
  }
}

</style>
