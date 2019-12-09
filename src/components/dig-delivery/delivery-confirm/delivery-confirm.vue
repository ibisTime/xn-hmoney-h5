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
          type="text"
          name="quantity"
          v-model="quantity"
          :placeholder="`最多输入${productMsg.remainQuantity}份`"
          @keyup.stop="upQuantity"
           v-validate="'required|intNumber'"
        />
        <span v-show="errors.has('quantity')" class="error-tip">{{errors.first('quantity')}}</span>
      </div>
      <div class="con_foo">
        <p>剩余数量：<span>{{productMsg.remainQuantity}}</span></p>
        <p>余额：<span>{{avaAmount}}</span></p>
      </div>
      <div class="foo_btn" @click.stop="toDeliverySelectType">
        确认交割
      </div>
    </div>
    <div class="modal_success" v-if="isSuccessModal" @click="isSuccessModal = false">
      <div class="success_modal_box" @click.stop>
        <div class="suc_m_header">
          <img class="s_m_h_img" src="./success_icon.png" alt="">
          <p class="s_m_h_p">交割申请成功</p>
        </div>
        <div class="con_btn" @click="toRecord"><span>查看交割记录</span></div>
        <p class="tip">
          {{timer}}秒后自动跳转
        </p>
      </div>
    </div>
    <PawModal :isShow="isShowPawModal" @getPawList="getPawList" @removePaw="removePaw"/>
    <Toast :text="toastMsg" ref="toast"/>
  </div>
</template>

<script>
  import {getUser} from 'api/user';
  import {submitDelivery} from 'api/homeDig';
  import { setTitle, formatMoneyMultiply } from "common/js/util";
  import Toast from 'base/toast/toast';
  import PawModal from 'base/pwd-modal/index';
  export default {
    data() {
      return {
        productMsg: {},
        symbol: '',
        avaAmount: '',
        deliveryConfig: {},
        quantity: '',
        toastMsg: '',
        isShowPawModal: false,
        isSuccessModal: false,
        pathType: '',
        interval: null,
        timer: 5,
        isDelivery: true
      }
    },
    created() {
      setTitle('交割');
      this.avaAmount = this.$route.query.avaAmount;
      this.pathType = this.$route.query.type;
      const productMsg = this.pathType === 'dueTo' ? sessionStorage.getItem('dueToProductMsg') : sessionStorage.getItem('productMsg');
      const symbol = this.pathType === 'dueTo' ? sessionStorage.getItem('dueToSymbol') : sessionStorage.getItem('freeSymbol');
      const deliveryConfig = sessionStorage.getItem('deliveryConfig');
      if(productMsg && symbol && deliveryConfig) {
        this.productMsg = JSON.parse(productMsg);
        this.symbol = symbol;
        this.deliveryConfig = JSON.parse(deliveryConfig);
      }
      sessionStorage.removeItem('paw_go_back');
    },
    methods: {
      toDeliverySelectType() {
        this.$validator.validateAll().then((result) => {
          if(result) {
            getUser().then(data => {
              if(data.tradepwdFlag) {
                const totalPrice = quantity * +this.productMsg.price;
                if(totalPrice > +this.avaAmount) {
                  this.toastMsg = '余额不足，请充值';
                  this.$refs.toast.show();
                  return;
                }
                this.deliveryConfig.quantity = this.quantity;
                if(this.pathType === 'dueTo') {
                  this.isShowPawModal = true;
                }else {
                  sessionStorage.setItem('deliveryConfig', JSON.stringify(this.deliveryConfig));
                  this.$router.push('delivery-select-type');
                }
              }else {
                this.toastMsg = '请先设置交易密码';
                this.$refs.toast.show();
                setTimeout(() => {
                  const goBack = `${this.$route.path}?avaAmount=${this.avaAmount}&type=${this.pathType}`;
                  sessionStorage.setItem('paw_go_back', goBack);
                  this.$router.push('/security-tradePassword?istw=0');
                }, 1000);
                return;
              }
            });
          }
          const quantity = +this.quantity;
        });
      },
      upQuantity() {
        if(+this.quantity > +this.productMsg.remainQuantity) {
          this.toastMsg = `请输入小于或等于${this.productMsg.remainQuantity}的数`;
          this.$refs.toast.show();
          this.quantity = this.productMsg.remainQuantity;
          return;
        }
      },
      getPawList(list) {
        if(list.length < 6) {
          this.toastMsg = '请填写完整';
          this.$refs.toast.show();
          return;
        }
        if(this.isDelivery) {
          this.isDelivery = false;
          this.deliveryConfig.tradePwd = list.join('');
          submitDelivery(this.deliveryConfig).then(() => {
            this.isDelivery = true;
            this.isShowPawModal = false;
            this.isSuccessModal = true;
            if(this.interval) {
              clearInterval(this.interval);
            }
            this.interval = setInterval(() => {
              this.timer --;
              if(this.timer < 1) {
                this.$router.push('delivery-record');
                clearInterval(this.interval);
              }
            }, 1000);
          }).catch(() => {
            this.isDelivery = true;
            this.isShowPawModal = false;
          });
        }
      },
      removePaw() {
        this.isShowPawModal = false;
      },
      toRecord() {
        this.$router.push('delivery-record');
      }
    },
    components: {
      PawModal,
      Toast
    },
    beforeDestroy() {
      if(this.interval) {
        clearInterval(this.interval);
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
        position: relative;
        .error-tip {
          position: absolute;
          right: 0.16rem;
          top: 0.38rem;
          white-space: nowrap;
          font-size: 0.28rem;
          color: #ff0000;
        }
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
