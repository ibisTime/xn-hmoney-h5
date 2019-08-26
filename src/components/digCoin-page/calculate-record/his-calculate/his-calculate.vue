<template>
  <div class="his-calculate">
    <ul class="his_cal_ul">
      <router-link class="single_li" to="calculate-detail">
        <div class="left">
          06-19 10:25
        </div>
        <div class="right">
          <span>+50.0000</span>
          <i class="icon icon_right_to"></i>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import { setTitle } from "common/js/util";
  export default {
    data() {
      return {}
    },
    created() {
      setTitle('历史算力');
    }
  }
</script>

<style lang="scss" scoped>
  .his-calculate{
    height: 100%;
    background-color: #fff;
    .his_cal_ul{
      padding: 0.2rem 0.3rem;
      .single_li{
        border-bottom: 1px solid #E6E6E6;
        display: flex;
        justify-content: space-between;
        padding: 0.34rem 0;
        .left{
          color: #333;
          font-size: 0.24rem;
        }
        .right{
          color: #D53D3D;
          font-size: 0.28rem;
          display: flex;
          align-items: center;
          .icon{
            margin-left: 0.06rem;
            display: inline-block;
            width: 0.14rem;
            height: 0.14rem;
          }
        }
      }
    }
  }
</style>
