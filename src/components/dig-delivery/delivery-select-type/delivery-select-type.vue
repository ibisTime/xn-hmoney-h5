<template>
  <div class="delivery-select-type">
    <div class="iup_box">
      <div class="iup_left">
        交割方式
      </div>
      <div class="iup_right">
        <select v-model="deliveryConfig.pickWay" @change="changePickWay">
          <option value="" disabled>请选择交割方式</option>
          <option :value="item.key" v-for="(item, index) in selectObj" :key='`type_${index}`'>{{item.value}}</option>
        </select>
      </div>
    </div>
    <div class="iup_box" v-if="deliveryConfig.pickWay === '1'">
      <div class="iup_left">
        邮寄地址
      </div>
      <div class="iup_right" @click="toSelectedAddress">
        {{deliveryConfig.addressCode ? `${addRessMsg.province}-${addRessMsg.city}-${addRessMsg.district}-${addRessMsg.detailAddress}` : '请选择邮寄地址'}}
        <i class="right_icon"></i>
      </div>
    </div>
    <div class="iup_box" v-if="deliveryConfig.pickWay === '1'">
      <div class="iup_left">
        收货人
      </div>
      <div class="iup_right">
        {{addRessMsg.addressee}}
      </div>
    </div>
    <div class="iup_box" v-if="deliveryConfig.pickWay === '1'">
      <div class="iup_left">
        收货人手机号
      </div>
      <div class="iup_right">
        {{addRessMsg.mobile}}
      </div>
    </div>
    <div class="foo_btn" @click="isShowPawModal = true">
      确认支付
    </div>
    <div class="modal_success" v-if="isSuccessModal" @click="isSuccessModal = false">
      <div class="success_modal_box" @click.stop>
        <div class="suc_m_header">
          <img class="s_m_h_img" src="./success_icon.png" alt="">
          <p class="s_m_h_p">交割申请成功</p>
        </div>
        <div class="con_btn" @click="toDeliveryRecord"><span>查看交割记录</span></div>
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
  import { setTitle } from "common/js/util";
  import {getAddressList} from 'api/user';
  import {submitDelivery} from 'api/homeDig';
  import {getSymbolDetail} from 'api/bb.js';
  import PawModal from 'base/pwd-modal/index';
  import Toast from 'base/toast/toast';
  export default {
    data() {
      return {
        isShowPawModal: false,
        isSuccessModal: false,
        timer: 5,
        isMail: '',
        deliveryConfig: {
          pickWay: '0'
        },
        addRessMsg: {
          mobile: '',
          addressee: ''
        },
        interval: null,
        toastMsg: '',
        selectObj: [],
        isDelivery: true
      }
    },
    created() {
      setTitle('选择方式');
      const deliveryConfig = sessionStorage.getItem('deliveryConfig');
      this.isMail = sessionStorage.getItem('isMail');
      let setRess = sessionStorage.getItem('setRess');
      if(deliveryConfig) {
        this.deliveryConfig = JSON.parse(deliveryConfig);
        getSymbolDetail(this.deliveryConfig.symbol).then(data => {
          if(data.deliveryAdvanceFlag === '1') {
            this.selectObj.push({
              key: '1',
              value: '邮寄'
            })
            this.deliveryConfig.pickWay = '1';
          }
          if(data.deliveryAdvanceFlag === '2') {
            this.selectObj.push({
              key: '2',
              value: '自提'
            })
            this.deliveryConfig.pickWay = '2';
          }
          if(data.deliveryAdvanceFlag === '3') {
            this.selectObj.push({
              key: '1',
              value: '邮寄'
            });
            this.selectObj.push({
              key: '2',
              value: '自提'
            });
          }
        });
      }
      if(this.isMail && setRess) {
        this.deliveryConfig.pickWay = '1';
        setRess = JSON.parse(setRess);
        this.addRessMsg = setRess;
        this.deliveryConfig.addressCode = setRess.code;
      }
    },
    methods: {
      changePickWay() {
        if(this.deliveryConfig.pickWay === '1') {
          this.getAddressList();
        }
      },
      getAddressList() {
        getAddressList('1').then(data => {
          this.addRessMsg = data[0];
          this.deliveryConfig.addressCode = data[0].code;
        });
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
      toSelectedAddress() {
        sessionStorage.setItem('deliveryConfig', JSON.stringify(this.deliveryConfig));
        sessionStorage.setItem('isMail', '1');
        sessionStorage.setItem('storetype', '1');
        sessionStorage.setItem('toBank', `delivery-select-type`);
        this.$router.push('/mine-address');
      },
      toDeliveryRecord() {
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
  .delivery-select-type{
    height: 100%;
    background-color: #fff;
    padding: 0.4rem 0.3rem;
    .iup_box{
      padding: 0.36rem 0;
      border-bottom: 1px solid #E3E3E3;
      color: #333;
      font-size: 0.28rem;
      display: flex;
      align-items: center;
      .iup_left{
        font-size: 0.28rem;
        color: #999;
        width: 26%;
      }
      .iup_right{
        flex: 1;
        font-size: 0.26rem;
        color: #333333;
        select, input{
          width: 100%;
        }
        .right_icon{
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          background-image: url('./more.png');
          background-size: 100% 100%;
          float: right;
        }
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
