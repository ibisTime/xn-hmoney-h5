<template>
  <div class="delivery-comfirm">
    <div class="del_com_head">
      <div class="left"></div>
      <div class="right">
        <h5 class="right_h5">实物名称</h5>
        <p class="right_p1">1000币/份</p>
        <p class="right_p2">赎回币种：xxx币</p>
      </div>
    </div>
    <p class="line"/>
    <div class="del_com_container">
      <div class="select_box">
        <select>
          <option value="0">最多输入1000个交割份数</option>
          <option value="1">haha</option>
        </select>
      </div>
      <div class="con_foo">
        <p>数量：<span>1000</span></p>
        <p>余额：<span>123123</span></p>
      </div>
      <div class="foo_btn" @click="toDeliverySelectType">
        确认交割
      </div>
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
      setTitle('交割');
    },
    methods: {
      toDeliverySelectType() {
        this.$router.push('delivery-select-type');
      }
    }
  }
</script>

<style scoped lang="scss">
  .delivery-comfirm{
    height: 100%;
    background-color: #fff;
    .del_com_head{
      padding: 0.38rem 0.3rem 0.36rem;
      display: flex;
      .left{
        background-color: red;
        border-radius: 0.06rem;
        width: 2.2rem;
        height: 1.66rem;
        margin-right: 0.26rem;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
      .right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 0.28rem;
        .right_h5{
          color: #333333;
        }
        .right_p1{
          color: #D53D3D;
        }
        .right_p2{
          color: #999;
          font-size: 0.24rem;
        }
      }
    }
    .line{
      height: 0.2rem;
      background-color: #F5F5F5;
    }
    .del_com_container{
      padding: 0.1rem 0.3rem;
      .select_box{
        padding: 0.36rem 0;
        font-size: 0.28rem;
        border-bottom: 1px solid #E3E3E3;
        margin-bottom: 0.3rem;
        select{
          width: 100%;
          color: #333;
        }
      }
      .con_foo{
        display: flex;
        justify-content: space-between;
        font-size: 0.24rem;
        color: #999;
        span{
          color: #333;
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
    }
  }
</style>
