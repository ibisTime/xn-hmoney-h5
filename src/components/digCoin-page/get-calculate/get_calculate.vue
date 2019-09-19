<template>
  <div class="get_calculate">
    <ul class="cal_container">
      <li>
        <router-link to="my-inviteFriends">
          <img src="../image/get_yqhy.png" alt="">
          <p>邀请好友</p>
        </router-link>
      </li>
      <li>
        <router-link :to="`wallet-into?adress=${walletObj.address}&currency=${walletObj.currency}&accountNumber=${walletObj.accountNumber}`">
          <img src="../image/get_cbi.png" alt="">
          <p>持TWT币</p>
        </router-link>
      </li>
      <li>
        <router-link to="dig-delivery" @click.native="toDelivery">
          <img src="../image/get_zdjg.png" alt="">
          <p>主动交割</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {wallet} from 'api/person';
export default {
  data() {
    return {
      walletObj: {
        address: '',
        currency: '',
        accountNumber: ''
      }
    }
  },
  created() {
    wallet().then(data => {
      this.walletObj = data.accountList.filter(item => item.currency === 'TWT')[0];
    });
  },
  methods: {
    toDelivery() {
      sessionStorage.removeItem('deliveryType');
    }
  }
}
</script>  

<style lang="scss" scoped>
  .get_calculate{
    background-image: url('../image/get_hqu_bg.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    height: 100%;
    position: relative;
    .cal_container{
      position: absolute;
      top: 46%;
      left: 0.3rem;
      right: 0.3rem;
      display: flex;
      justify-content: space-between;
      li{
        width: 32%;
        background-color: #fff;
        border-radius: 0.1rem;
        text-align: center;
        padding: 0.6rem 0;
        img{
          height: 0.78rem;
        }
        p{
          font-size: 0.32rem;
          margin-top: 0.3rem;
        }
      }
    }
  }
</style>
