<template>
  <div class="outRecord">
    <ul class="record_ul">
      <li class="record_li">
        <div class="left">
          <h5>1000.00000000 TWT</h5>
          <p>2019-06-19 10:25</p>
        </div>
        <div class="right">
          <span>待审核</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .outRecord{
    height: 100%;
    background-color: #fff;
    font-size: 0.24rem;
    .record_ul{
      padding: 0.2rem 0.3rem 0.98rem;
      .record_li{
        display: flex;
        padding: 0.3rem 0;
        justify-content: space-between;
        border-bottom: 1px solid #E6E6E6;
        .left{
          h5{
            color: #333333;
            font-size: 0.36rem;
            margin-bottom: 0.1rem;
          }
          p{
            color: #999999;
          }
        }
      }
    }
  }
</style>
