<template>
  <div class="delivery-record">
    <div class="header">
      <p class="p_active">全部</p>
      <p>待发货</p>
      <p>已销毁</p>
    </div>
    <ul class="record_ul">
      <li class="li_single">
        <div class="single_head">
          <div class="s_h_left">
            <img class="s_h_left_img" src="" alt="">
            <span class="s_h_left_sp">实物名称</span>
            <span class="left_zt">自提</span>
          </div>
          <div class="s_h_right">
            待发货
          </div>
        </div>
        <div class="single_con">
          <div class="s_c_left">
            <h5 class="s_c_h5">289360.00000000</h5>
            <p>交割总量</p>
          </div>
          <div class="s_c_right">
            <h5 class="s_c_h5">2019-10-10 20:00:00</h5>
            <p>申请时间</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .delivery-record{
    position: relative;
    height: 100%;
    background-color: #FAFAFA;
    .header{
      background-color: #fff;
      display: flex;
      padding-top: 0.44rem;
      border-bottom: 1px solid #EBEBEB;
      p{
        text-align: center;
        flex: 1;
        font-size: 0.28rem;
        color: #999;
        padding-bottom: 0.24rem;
        border-bottom: 2px solid transparent;
      }
      .p_active{
        color: #D53D3D;
        border-color: #D53D3D;
      }
    }
    .record_ul{
      padding: 0.3rem;
      .li_single{
        padding: 0.1rem 0.3rem 0.56rem;
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
            .left_zt{
              background-color: #FF9849;
              color: #fff;
              font-size: 0.22rem;
              padding: 0.04rem 0.12rem;
              margin-left: 0.14rem;
              border-radius: 0.06rem;
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
