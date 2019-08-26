<template>
  <div class="purchase-record">
    <ul class="pur_record_ul">
      <li class="li_single">
        <div class="single_head">
          <div class="s_h_left">
            <img class="s_h_left_img" src="" alt="">
            <span class="s_h_left_sp">WIS</span>
          </div>
          <div class="s_h_right">
            申购时间：2019-10-10
          </div>
        </div>
        <div class="single_con">
          <div class="s_c_left">
            <h5 class="s_c_h5">289360.00000000 <span>WIS</span></h5>
            <p>申购总量</p>
          </div>
          <div class="s_c_right">
            <h5 class="s_c_h5">380.00000000 <span>TWT</span></h5>
            <p>支付</p>
          </div>
        </div>
      </li>
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
      setTitle('申购记录');
    }
  }
</script>

<style scoped lang="scss">
  .purchase-record{
    position: relative;
    height: 100%;
    background-color: #FAFAFA;
    .pur_record_ul{
      padding: 0.5rem 0.3rem;
      .li_single{
        padding: 0.1rem 0.3rem 0.4rem;
        background-color: #fff;
        margin-bottom: 0.3rem;
        box-shadow: 0 0.08rem 0.16rem 0 #EBEBEB;
        .single_head{
          border-bottom: 1px solid #F0F0F0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
          height: 0.9rem;
          .s_h_left{
            display: flex;
            align-items: center;
            .s_h_left_img{
              width: 0.5rem;
              height: 0.5rem;
            }
            .s_h_left_sp{
              font-size: 0.28rem;
              color: #333333;
              margin-left: 0.15rem;
            }
          }
          .s_h_right{
            color: #999999;
            font-size: 0.24rem;
          }
        }
        .single_con{
          display: flex;
          .s_c_left{
            width: 50%;
            border-right: 1px solid #D8D8D8;
          }
          .s_c_right{
            margin-left: 0.3rem;
          }
          .s_c_h5{
            color: #333333;
            font-size: 0.28rem;
            margin-bottom: 0.16rem;
            span{
              color: #666;
            }
          }
          p{
            color: #999;
            font-size: 0.24rem;
          }
        }
      }
    }
  }
</style>
