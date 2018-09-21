<template>
  <div class="clinch-wrapper" @click.stop>
     <div class='main'>
       <p class='title'>
         <span class='left'>委托时间</span>
         <span class="cont">委托价格</span>
         <span class='right'>委托量</span>
       </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.047291</span>
          <span class='right'>0.02</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.0472202091</span>
          <span class='right'>0.02</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.0472202091</span>
          <span class='right'>0.02020202</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.047291</span>
          <span class='right'>0.020202</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.047291</span>
          <span class='right'>0.02</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.0472202091</span>
          <span class='right'>0.02</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.0472202091</span>
          <span class='right'>0.02020202</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.047291</span>
          <span class='right'>0.020202</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.047291</span>
          <span class='right'>0.02</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.0472202091</span>
          <span class='right'>0.02</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.0472202091</span>
          <span class='right'>0.02020202</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.047291</span>
          <span class='right'>0.020202</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.047291</span>
          <span class='right'>0.02</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.0472202091</span>
          <span class='right'>0.02</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.0472202091</span>
          <span class='right'>0.02020202</span>
        </p>
        <p>
          <span class='left'>00:15:59</span>
          <span class="cont">0.047291</span>
          <span class='right'>0.020202</span>
        </p>
     </div>
  </div>
</template>
<script>
  export default {
    props: {
    },
    computed: {
    },
    methods: {
    },
    components: {
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

.clinch-wrapper {
  width: 100%;
  background: #172143;
  font-size: .28rem;
  color: #fff;
  line-height: .35rem;

  .main {
    .title {
      font-size: .28rem;
      line-height: .8rem;
      color: #fff;
      border-bottom: .01rem solid #ccc;
    }
    p {
      width: 100%;
      padding: 0 .3rem;
      color: #0ec55b;
      line-height: .55rem;
      border-bottom: .01rem solid #1b2c3f;
      span {
        display: inline-block;
        width: 32.5%;
      }
      .left {
        text-align: left;
      }
      .cont {
        text-align: left;
        text-indent: .5rem;
      }
      .right {
        text-align: right;
      }

    } 

  }

}
</style>
