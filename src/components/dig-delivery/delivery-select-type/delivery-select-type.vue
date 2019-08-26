<template>
  <div class="delivery-select-type">
    <div class="iup_box">
      <select>
        <option value="0">请选择方式</option>
        <option value="1">自提</option>
        <option value="2">邮寄</option>
      </select>
    </div>
    <div class="iup_box">
      <input type="text" placeholder="自提密码">
    </div>
    <div class="iup_box">
      <input type="text" placeholder="邮寄地址">
    </div>
    <div class="iup_box">
      <input type="text" placeholder="收货人">
    </div>
    <div class="iup_box">
      <input type="text" placeholder="收货人手机号">
    </div>
    <div class="foo_btn" @click="isShowPawModal = true">
      确认支付
    </div>
    <div class="modal_success" v-if="isSuccessModal" @click="isSuccessModal = false">
      <div class="success_modal_box" @click.stop>
        <div class="suc_m_header">
          <img class="s_m_h_img" src="./success_icon.png" alt="">
          <p class="s_m_h_p">转账成功</p>
        </div>
        <div class="con_btn"><span>查看转账记录</span></div>
        <p class="tip">
          {{timer}}秒后自动跳转
        </p>
      </div>
    </div>
    <PawModal :isShow="isShowPawModal" @getPawList="getPawList" @removePaw="removePaw"/>
  </div>
</template>

<script>
  import { setTitle } from "common/js/util";
  import PawModal from 'base/pwd-modal/index';
  export default {
    data() {
      return {
        isShowPawModal: false,
        isSuccessModal: false,
        timer: 5
      }
    },
    created() {
      setTitle('选择方式');
    },
    methods: {
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

<style scoped lang="scss">
  .delivery-select-type{
    height: 100%;
    background-color: #fff;
    padding: 0.4rem 0.3rem;
    .iup_box{
      padding: 0.36rem 0;
      border-bottom: 1px solid #E3E3E3;
      color: #333;
      font-size: 0.28rem;
      select{
        width: 100%;
      }
      input{
        width: 100%;
      }
    }
    .foo_btn{
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: #fff;
      background-color: #D53D3D;
      border-radius: 0.1rem;
      margin-top: 2rem;
      font-size: 0.36rem;
    }
    .modal_success{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.5);
      .success_modal_box{
        position: absolute;
        left: 0.5rem;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        background-color: #fff;
        border-radius: 0.1rem;
        padding: 0.6rem 0;
        text-align: center;
      }
      .suc_m_header{
        margin-bottom: 0.36rem;
        .s_m_h_img{
          width: 1.2rem;
          height: 1.2rem;
          margin-bottom: 0.26rem;
        }
        .s_m_h_p{
          color: #333;
          font-size: 0.4rem;
        }
      }
      .con_btn{
        color: #999999;
        margin-bottom: 0.64rem;
        font-size: 0.66rem;
        span{
          font-size: 0.28rem;
          padding: 0.14rem 0.32rem;
          border: 1px solid #aaa;
          border-radius: 0.06rem;
        }
      }
      .tip{
        color: #999;
        font-size: 0.22rem;
      }
    }
  }
</style>
