<template>
  <div class="delivery-comfirm">
    <div class="del_com_head">
      <div class="left" :style="{backgroundImage: `url('${productMsg.productPic}')`}"></div>
      <div class="right">
        <h5 class="right_h5">{{productMsg.productName}}</h5>
        <p class="right_p1">{{productMsg.price}}币/份</p>
        <p class="right_p2">赎回币种：{{symbol}}币</p>
      </div>
    </div>
    <p class="line"/>
    <div class="del_com_container">
      <div class="select_box">
        <input
          type="number"
          v-model="quantity"
          :placeholder="`最多输入${productMsg.remainQuantity}个交割份数`"
          @keyup="upQuantity"
        />
      </div>
      <div class="con_foo">
        <p>数量：<span>{{productMsg.remainQuantity}}</span></p>
        <p>余额：<span>{{avaAmount}}</span></p>
      </div>
      <div class="foo_btn" @click="toDeliverySelectType">
        确认交割
      </div>
    </div>
    <Toast :text="toastMsg" ref="toast"/>
  </div>
</template>

<script>
  import { setTitle } from "common/js/util";
  import Toast from 'base/toast/toast';
  export default {
    data() {
      return {
        productMsg: {},
        symbol: '',
        avaAmount: '',
        deliveryConfig: {},
        quantity: '',
        toastMsg: ''
      }
    },
    created() {
      setTitle('交割');
      this.avaAmount = this.$route.query.avaAmount;
      const productMsg = sessionStorage.getItem('productMsg');
      const symbol = sessionStorage.getItem('freeSymbol');
      const deliveryConfig = sessionStorage.getItem('deliveryConfig');
      if(productMsg && symbol && deliveryConfig) {
        this.productMsg = JSON.parse(productMsg);
        this.symbol = symbol;
        this.deliveryConfig = JSON.parse(deliveryConfig);
      }else {
        this.$router.push('dig-delivery');
      }
    },
    methods: {
      toDeliverySelectType() {
        if(!this.quantity) {
          this.toastMsg = '请输入交割份数';
          this.$refs.toast.show();
          return;
        }
        this.deliveryConfig.quantity = this.quantity;
        sessionStorage.setItem('deliveryConfig', JSON.stringify(this.deliveryConfig));
        this.$router.push('delivery-select-type');
      },
      upQuantity() {
        if(+this.quantity > +this.productMsg.remainQuantity) {
          this.toastMsg = `请输入小于或等于${this.productMsg.remainQuantity}的数`;
          this.$refs.toast.show();
          this.quantity = this.productMsg.remainQuantity;
          return;
        }
      }
    },
    components: {
      Toast
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
        input{
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
