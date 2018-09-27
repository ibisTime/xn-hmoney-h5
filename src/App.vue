<template>
  <div id="app">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {isLogin} from './common/js/util';

  export default {
    created() {
      if(!isLogin()) {
        this.$router.push('login');
      }else {
        this.$router.push('page');
      }
    },
  };
</script>
<style lang="scss" scoped>
  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .loading-wrapper {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translate3d(0, -50%, 0);
    }
  }
</style>
