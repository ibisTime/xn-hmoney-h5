<template>
  <div class="put-up-wrapper" @click.stop>
     <div class='main'>
       <p class='title1'>
         <span>买盘20档</span>
         <span>卖盘20档</span>
       </p>
        <div class='title2'>
            <p class='tit1'>53.58%</p>
            <p class='tit2'>53.58%</p>

         </div>

       <div class='content'>
        <div class='left'>
          <p>
            <span class='red'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.4270000</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.400</span>
            <span class='white'>2.311114</span>
          </p>
          <p>
            <span class='red'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.4270000</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.400</span>
            <span class='white'>2.311114</span>
          </p>
          <p>
            <span class='red'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.4270000</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.400</span>
            <span class='white'>2.311114</span>
          </p>
          <p>
            <span class='red'>0.42700</span>
            <span class='white'>2.34</span>
          </p>

          <p>
            <span class='red'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.4270000</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='red'>0.400</span>
            <span class='white'>2.311114</span>
          </p>
          <p>
            <span class='red'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
        </div>
        <div class='right'>
          <p>
            <span class='green'>0.40</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='green'>0.42700000</span>
            <span class='white'>2.30004</span>
          </p>
          <p>
            <span class='green'>0.42700</span>
            <span class='white'>2.34000</span>
          </p>
          <p>
            <span class='green'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='green'>0.40</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='green'>0.42700000</span>
            <span class='white'>2.30004</span>
          </p>
          <p>
            <span class='green'>0.42700</span>
            <span class='white'>2.34000</span>
          </p>
          <p>
            <span class='green'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='green'>0.40</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='green'>0.42700000</span>
            <span class='white'>2.30004</span>
          </p>
          <p>
            <span class='green'>0.42700</span>
            <span class='white'>2.34000</span>
          </p>
          <p>
            <span class='green'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='green'>0.40</span>
            <span class='white'>2.34</span>
          </p>
          <p>
            <span class='green'>0.42700000</span>
            <span class='white'>2.30004</span>
          </p>
          <p>
            <span class='green'>0.42700</span>
            <span class='white'>2.34000</span>
          </p>
          <p>
            <span class='green'>0.42700</span>
            <span class='white'>2.34</span>
          </p>
       
        </div>

       </div>
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

.put-up-wrapper {
  width: 100%;
  background: #172143;
  font-size: .28rem;
  color: #ccc;
  line-height: .35rem;
  .red {
    color: #d53d3d;
  }
  .green {
    color: #0ec55b;
  }
  .white {
    color: #fff;
  }

  .main {
    .title1 {
      width: 100%;
      padding: 0 .3rem;
      display: flex;
      span {
        flex: 1;
        text-align: center;
        font-size: .28rem; 
        line-height: .8rem;
        color: #fff;
      }
    }
    .title2 {
      display: flex;
      justify-content: space-between;
      width: 100%;
      line-height: .6rem;
      color: #fff;
      .tit1 {    
        flex: 1;
        background: #d53d3d;
        text-align: left;
        padding-left: .3rem;
      }
      .tit2 {
        flex: 1;
        padding-right: .3rem;
        background: #0ec55b;
        text-align: right;
      }
    }

    .content {
      width: 100%;
      font-size: .28rem;
      display: flex;
      .left {
        flex: 1;
        p {
          padding:0 .05rem 0 .3rem;
          display: flex;
          justify-content: space-between;
          line-height: .55rem;
          border-bottom: .01rem solid #1f2c3f;
        }
      }
      .right {
        flex: 1;
        p {
          padding:0 .3rem 0 .05rem;
          display: flex;
          justify-content: space-between;
          line-height: .55rem;
          border-bottom: .01rem solid #1f2c3f;
        }
      }


    }
  }


}
</style>
