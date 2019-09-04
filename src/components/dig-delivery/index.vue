<template>
  <div class="dig-delivery">
    <div class="header">
      <div class="h_m_box">
        <span class="h_m_sp" :class="type === '0' ? 'h_m_sp_active' : ''" @click="freeDelivery">自由交割</span>
        <span class="h_m_sp" :class="type === '1' ? 'h_m_sp_active' : ''" @click="dueDelivery">到期交割</span>
      </div>
      <router-link to="delivery-record" class="h_right">
        交割记录
      </router-link>
    </div>
    <FreeDelivery v-show="type === '0'"/>
    <DueToDelivery v-show="type === '1'"/>
  </div>
</template>

<script>
  import { setTitle } from "common/js/util";
  import FreeDelivery from './free-delivery/free-delivery';
  import DueToDelivery from './due-to-delivery/due-to-delivery';
  export default {
    data() {
      return {
        type: '0'
      }
    },
    created() {
      setTitle('自由交割');
      this.type = sessionStorage.getItem('deliveryType') || '0';
    },
    methods: {
      freeDelivery() {
        this.type = '0';
        sessionStorage.setItem('deliveryType', '0');
      },
      dueDelivery() {
        this.type = '1';
        sessionStorage.setItem('deliveryType', '1');
      }
    },
    components: {
      FreeDelivery,
      DueToDelivery
    }
  }
</script>

<style lang="scss" scoped>
  .dig-delivery{
    height: 100%;
    background-color: #fff;
    padding: 0.3rem 0;
    display: flex;
    flex-direction: column;
    .header{
      position: relative;
      margin-bottom: 0.24rem;
      .h_m_box{
        display: flex;
        align-items: center;
        justify-content: center;
        .h_m_sp{
          padding: 0.12rem 0.2rem;
          color: #D53D3D;
          font-size: 0.28rem;
          border: 1px solid #D53D3D;
        }
        .h_m_sp_active{
          background-color: #D53D3D;
          color: #fff;
        }
      }
      .h_right{
        position: absolute;
        right: 0.2rem;
        top: 50%;
        transform: translateY(-50%);
        color: #333333;
        font-size: 0.3rem;
      }
    }
  }
</style>
