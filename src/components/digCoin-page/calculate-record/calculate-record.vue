<template>
  <div class="calculate-record">
    <div class="header">
      <p class="h_tit">今日算力</p>
      <p class="h_txt">51.0000</p>
    </div>
    <div class="cal_con">
      <h5 class="con_tit">
        <span class="tit_left">算力记录</span>
        <router-link to="his-calculate" class="tit_right">历史算力</router-link>
      </h5>
      <ul class="con_ul">
        <li class="sing_li">
          <div class="sing_left">
            <h5 class="left_h5">直推持币算力</h5>
            <p class="left_p">2018-10-10 20:00:00</p>
          </div>
          <div class="sing_right">
            +4644.1125
          </div>
        </li>
      </ul>
    </div>
    <div class="foo_btn">
      获取算力
    </div>
  </div>
</template>

<script>
  import { setTitle } from "common/js/util";
  export default {
    data() {
      return {

      }
    },
    created() {
      setTitle('今日算力');
    }
  }
</script>

<style lang="scss" scoped>
  .calculate-record{
    height: 100%;
    position: relative;
    background-color: #fff;
    .header{
      background-image: url('../image/Mask@2x.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      text-align: center;
      padding-bottom: 0.76rem;
      padding-top: 0.5rem;
      .h_tit{
        font-size: 0.24rem;
        color: #FFEEEC;
        margin-bottom: 0.18rem;
      }
      .h_txt{
        color: #fff;
        font-size: 0.48rem;
      }
    }
    .cal_con{
      padding: 0.3rem;
      .con_tit{
        color: #333333;
        font-size: 0.36rem;
        margin-bottom: 0.1rem;
        display: flex;
        justify-content: space-between;
        .tit_right{
          font-size: 0.3rem;
          color: #666;
        }
      }
      .con_ul{
        .sing_li{
          border-bottom: 1px solid #E6E6E6;
          padding: 0.3rem 0 0.24rem 0;
          display: flex;
          justify-content: space-between;
          font-size: 0.24rem;
          .left_h5{
            color: #333;
            margin-bottom: 0.12rem;
          }
          .left_p{
            color: #999;
          }
          .sing_right{
            display: flex;
            font-size: 0.28rem;
            color: #D53D3D;
            align-items: center;
          }
        }
      }
    }
    .foo_btn{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0.98rem;
      line-height: 0.98rem;
      color: #fff;
      background-color: #DA5454;
      text-align: center;
      font-size: 0.32rem;
    }
  }
</style>
