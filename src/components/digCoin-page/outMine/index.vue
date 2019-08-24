<template>
  <div class="out-mine">
    <div class="header">
      <p class="ck_p">挖矿余额</p>
      <h5 class="head_h">51.0000</h5>
      <div class="head_box">
        <div class="left">
          <p class="ck_p">昨日出矿</p>
          <p class="ck_num_p">51.0000</p>
        </div>
        <div class="right">
          <p class="ck_p">累计出矿</p>
          <p class="ck_num_p">51.0000</p>
        </div>
      </div>
    </div>
    <div class="out_mine_con">
      <h5 class="con_h5">出矿记录</h5>
      <ul class="con_ul">
        <li class="single_li">
          <span class="left">06-19 10:25</span>
          <span class="right">+50.0000 <i></i></span>
        </li>
      </ul>
      <div class="foo_box">
        <p>转入钱包</p>
      </div>
    </div>
    <div class="modal_box">
      <div class="modal_con">
        <h5>转入钱包</h5>
        <div class="iup_box">
          <div class="left">
            <input type="text" placeholder="最多可转入400.0000">
          </div>
          <div class="right">
            <span>全部金额</span>
          </div>
        </div>
        <div class="foo_btn">
          确认转入
        </div>
        <div class="del">
          <img src="../image/del.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setTitle} from 'common/js/util';
  export default {
    created() {
      setTitle('出矿');
    }
  }
</script>

<style scoped lang="scss">
  .out-mine{
    position: relative;
    height: 100%;
    background-color: #fff;
    .header{
      background-image: url('../image/Mask@2x.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      text-align: center;
      padding-top: 0.46rem;
      padding-bottom: 0.46rem;
      margin-bottom: 0.4rem;
      .ck_p{
        font-size: 0.24rem;
        color: #FFEEEC;
      }
      .head_h{
        font-size: 0.48rem;
        color: #fff;
        margin-top: 0.18rem;
        margin-bottom: 0.52rem;
      }
      .head_box{
        display: flex;
        .left{
          width: 50%;
        }
        .right{
          width: 50%;
        }
        .ck_num_p{
          font-size: 0.32rem;
          color: #fff;
          margin-top: 0.04rem;
        }
      }
    }
    .out_mine_con{
      padding: 0 0.3rem;
      .con_h5{
        color: #333;
        font-size: 0.28rem;
      }
      .con_ul{
        .single_li{
          height: 1rem;
          line-height: 1rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #E6E6E6;
          .left{
            color: #333;
            font-size: 0.24rem;
          }
          .right{
            color: #D53D3D;
            font-size: 0.28rem;
          }
        }
      }
    }
    .foo_box{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.4rem 0.3rem;
      box-shadow: 0 -0.04rem 0.08rem 0 #E6E6E6;
      p{
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        font-size: 0.32rem;
        background-color: #D53D3D;
        -webkit-border-radius: 0.08rem;
        -moz-border-radius: 0.08rem;
        border-radius: 0.08rem;
      }
    }
    .modal_box{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 1;
      transition: all 0.3s;
      .modal_con{
        height: 0.59rem;
        background-color: #fff;
        padding: 0.3rem;
        position: relative;
        h5{
          text-align: center;
          color: #333;
          font-size: 0.36rem;
          margin-bottom: 0.88rem;
        }
        .iup_box{
          border-bottom: 1px solid #D6D6D6;
          padding-bottom: 0.36rem;
          display: flex;
          left{
            flex: 1;
            input{
              width: 100%;
              font-size: 0.36rem;
              color: #333;
            }
          }
          right{
            span{
              padding: 0.1rem 0.16rem;
              font-size: 0.24rem;
              color: #3D7CD5;
            }
          }
        }
        .foo_btn{
          position: absolute;
        }
      }
    }
  }
</style>
