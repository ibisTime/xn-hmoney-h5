<template>
  <div class="calculate-detail">
    <div class="header">
      <div class="h_con">
        <div class="h_left">
          <p class="tit">算力数</p>
          <h5 class="txt">100</h5>
        </div>
        <div class="h_right">
          <p class="tit">算力数</p>
          <h5 class="txt">100</h5>
        </div>
      </div>
      <p>2019-10-10</p>
    </div>
    <div class="cal_con">
      <h5 class="con_tit">
        <span class="tit_left">算力记录</span>
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
  </div>
</template>

<script>
  import { setTitle } from "common/js/util";
  export default {
    data() {
      return {}
    },
    created() {
      setTitle('算力明细');
    }
  }
</script>

<style lang="scss" scoped>
  .calculate-detail{
    height: 100%;
    background-color: #fff;
    .header{
      background-image: url('../../image/Mask@2x.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      padding: 0.68rem 0 0.3rem 0;
      text-align: center;
      font-size: 0.24rem;
      color: #FFEEEC;
      .h_con{
        display: flex;
        margin-bottom: 0.44rem;
        .h_left{
          flex: 1;
          border-right: 1px solid #EAEAEA;
        }
        .h_right{
          flex: 1;
        }
        .tit{
          margin-bottom: 0.26rem;
        }
        .txt{
          font-size: 0.48rem;
          color: #fff;
        }
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
  }
</style>
