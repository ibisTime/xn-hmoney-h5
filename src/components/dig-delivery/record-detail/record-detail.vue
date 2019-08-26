<template>
  <div class="delivery-record-detail">
    <div class="header">
      <div class="h_left">
        <img src="" alt="">
        <p>TWT</p>
      </div>
      <div class="h_m">
        <img src="" alt="">
      </div>
      <div class="h_right">
        <img src="" alt="">
        <p>实物名称</p>
      </div>
    </div>
    <div class="pur_con">
      <ul class="con_ul">
        <li class="li_single">
          <div class="li_left">交割状态</div>
          <div class="li_right">已销毁</div>
        </li>
        <li class="li_single">
          <div class="li_left">交割份数</div>
          <div class="li_right">2 份</div>
        </li>
        <li class="li_single">
          <div class="li_left">交割总量</div>
          <div class="li_right">289360.00 个
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">交割方式</div>
          <div class="li_right">自提</div>
        </li>
        <li class="li_single">
          <div class="li_left">自提密码</div>
          <div class="li_right">123455</div>
        </li>
        <li class="li_single">
          <div class="li_left">申请时间</div>
          <div class="li_right">2019-10-10 15:06:00</div>
        </li>
        <li class="li_single">
          <div class="li_left">销毁时间</div>
          <div class="li_right">2019-12-10 15:06:00</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { setTitle } from "common/js/util";
  import PawModal from 'base/pwd-modal/index';
  export default {
    data() {
      return {
        isShowModal: false,
        isShowPawModal: false,
        isSuccessModal: false,
        timer: 5
      }
    },
    created() {
      setTitle('交割详情');
    },
    methods: {
      comfirmPayment() {
        this.isShowPawModal = true;
        this.isShowModal = false;
      },
      getPawList(list) {
        this.isShowPawModal = false;
        console.log(list);
      },
      removePaw() {
        this.isShowPawModal = false;
      }
    },
    components: {
      PawModal
    }
  }
</script>


<style lang="scss" scoped>
  .delivery-record-detail{
    background-color: #FAFAFA;
    height: 100%;
    position: relative;
    padding: 0.4rem 0.3rem;
    .header{
      background-color: #fff;
      font-size: 0.22rem;
      color: #333;
      padding: 0.22rem 0;
      display: flex;
      border-radius: 0.08rem;
      text-align: center;
      margin-bottom: 0.3rem;
      .h_left{
        flex: 2;
        img{
          width: 0.78rem;
          height: 0.78rem;
          margin-bottom: 0.2rem;
        }
      }
      .h_m{
        flex: 1;
        img{
          width: 0.6rem;
          height: 0.32rem;
        }
      }
      .h_right{
        flex: 2;
        img{
          width: 0.78rem;
          height: 0.78rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .pur_con{
      padding-bottom: 1rem;
      .con_ul{
        .li_single{
          padding: 0.3rem 0;
          display: flex;
          border-bottom: 1px solid #E6E6E6;
          .li_left{
            font-size: 0.28rem;
            color: #999;
            width: 20%;
          }
          .li_right{
            font-size: 0.26rem;
            color: #333333;
            select, input{
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
