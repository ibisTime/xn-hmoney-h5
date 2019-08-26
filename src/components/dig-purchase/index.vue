<template>
  <div class="purchase">
    <div class="header">
      <ul class="head_ul">
        <li class="h_single_li h_single_li_active">全部</li>
        <li class="h_single_li">申购中</li>
        <li class="h_single_li">已结束</li>
        <router-link to="purchase-record" class="h_single_li">申购记录</router-link>
      </ul>
    </div>
    <div class="pur_con">
      <ul class="con_ul">
        <li class="c_single">
          <router-link to="purchase-detail">
            <div class="li_head">
              <div class="li_head_left">
                <i></i>
                <span>WIS</span>
              </div>
              <div class="li_head_right">
                申购中
              </div>
            </div>
            <div class="li_con_box">
              <div class="li_con_head">
                <div class="li_con_head_left">
                  <h5 class="li_con_head_left_h5">289360.00000000</h5>
                  <p class="li_con_head_left_p">申购总量</p>
                </div>
                <div class="li_con_head_right">
                  <p class="li_con_head_right_tit">
                    剩余总量<span class="li_con_head_right_tit_sp">289360.00000000</span>
                  </p>
                  <p class="li_con_head_right_progress">
                    <span></span>
                  </p>
                </div>
              </div>
              <p class="li_con_p">期限：2019-10-10至2020-10-10</p>
            </div>
          </router-link>
        </li>
      </ul>
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
      setTitle('申购');
    }
  }
</script>

<style lang="scss" scoped>
  .purchase{
    height: 100%;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    .header{
      padding-top: 0.2rem;
      background-color: #FFFFFF;
      .head_ul{
        padding-top: 0.24rem;
        text-align: center;
        font-size: 0.28rem;
        color: #999;
        display: flex;
        .h_single_li{
          flex: 1;
          padding-bottom: 0.26rem;
          border-bottom: 2px solid transparent;
        }
        .h_single_li_active{
          color: #D53D3D;
          border-color: #D53D3D;
        }
      }
    }
    .pur_con{
      padding: 0 0.3rem;
      position: relative;
      .con_ul{
        padding: 0.22rem 0;
        .c_single{
          background-color: #fff;
          border-radius: 0.1rem;
          padding: 0.22rem 0.3rem 0.46rem;
          .li_head{
            display: flex;
            justify-content: space-between;
            padding-bottom: 0.2rem;
            margin-bottom: 0.4rem;
            border-bottom: 1px solid #F0F0F0;
            .li_head_left{
              font-size: 0.28rem;
              display: flex;
              align-items: center;
              i{
                display: inline-block;
                width: 0.5rem;
                height: 0.5rem;
                margin-right: 0.14rem;
              }
            }
            .li_head_right{
              font-size: 0.24rem;
              color: #D53D3D;
              display: flex;
              align-items: center;
            }
          }
          .li_con_box{
            font-size: 0.24rem;
            color: #999;
            .li_con_head{
              display: flex;
              margin-bottom: 0.4rem;
              .li_con_head_left{
                width: 50%;
                .li_con_head_left_h5{
                  color: #333333;
                  font-size: 0.36rem;
                  margin-bottom: 0.12rem;
                }
              }
              .li_con_head_right{
                width: 50%;
                .li_con_head_right_tit{
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  margin-bottom: 0.28rem;
                  .li_con_head_right_tit_sp{
                    color: #555;
                    font-size: 0.3rem;
                  }
                }
                .li_con_head_right_progress{
                  width: 90%;
                  border-radius: 0.08rem;
                  height: 0.12rem;
                  overflow: hidden;
                  background-color: #EBEBEB;
                  display: flex;
                  align-items: center;
                  span{
                    display: inline-block;
                    height: 0.12rem;
                    width: 20%;
                    background-color: #D53D3D;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
