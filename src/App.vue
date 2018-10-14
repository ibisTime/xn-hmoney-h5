<template>
  <div id="app">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {isLogin, getUrlParam} from './common/js/util';

  export default {
    created() {
      let url = location.href;
      console.log(url);
      if(!isLogin()) {
        this.$router.push('login');
      }
    },
  };
</script>
<style lang="scss">
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
  .hidden{
    display: none !important;
  }
  .show{
    display: block !important;
  }
  .no-data {
    width: 100%;
    padding: 1.6rem 0 1.2rem;
    text-align: center;
    img {
        vertical-align: bottom;
        width: 2rem;
    }
    p {
        font-size: 15px;
        color: #999;
        margin-top: 15px;
    }
  }
</style>
