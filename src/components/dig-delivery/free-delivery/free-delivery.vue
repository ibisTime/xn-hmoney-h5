<template>
  <div class="free-delivery">
    <div class="deli_con">
      <div class="c_h_select">
        <select v-model="symbol" @change="changeSymbol">
          <option value="" disabled>请选择资产交通证</option>
          <option
            :value="item.symbol"
            v-for="(item, index) in coinList" :key="`free_${index}`"
          >{{item.symbol}}</option>
        </select>
      </div>
      <div class="c_h_con">
        <div class="c_h_con_h">
          <div class="c_h_con_h_left">
            可交割余额：<span class="c_h_con_h_left_sp">{{avaAmount}}</span>
          </div>
          <!-- <div class="c_h_con_h_right" @click="toDeliveryDetail">
            了解更多
          </div> -->
        </div>
        <p class="c_h_con_c">
          到期交割时间：{{symbol ? symbolObj[symbol].endDatetime : ''}}
        </p>
      </div>
    </div>
    <p class="line" />
    <div class="deli_foo">
      <h5 class="deli_h5">商品选择</h5>
      <div class="deli_iup_img" @click="toDeliveryImg" :style="productMsg.productPic ? {backgroundImage: `url('${productMsg.productPic}')`} : ''"></div>
      <div class="foo_box">
        <h5 class="foo_box_h5">
          交割流程：(待替换)
        </h5>
        <p>
          1，用户填写交割数量，提交交割申请
        </p>
        <p>
          2，交割单位确认转交物权
        </p>
        <p>
          3，智能合约自动销毁对应数量资产通证
        </p>
      </div>
      <div class="foo_btn" @click="toDelivery">
        确认交割
      </div>
    </div>
    <Toast :text="toastMsg" ref="toast"/>
  </div>
</template>

<script>
  import {wallet} from 'api/person';
  import {formatDate, formatAmount} from 'common/js/util';
  import {deliveryCoinList} from 'api/homeDig';
  import Toast from 'base/toast/toast';
  export default {
    data() {
      return {
        coinList: {
          symbol: '',
          unit: '',
          icon: ''
        },
        symbol: '',
        toastMsg: '',
        symbolObj: {},
        productMsg: {},
        avaAmount: '',
        deliveryConfig: {
          symbol: '',
          realRightCode: '',
          quantity: '',
          pickWay: '',
          addressCode: ''
        }
      }
    },
    created() {
      const productMsg = sessionStorage.getItem('productMsg');
      const freeSymbol = sessionStorage.getItem('freeSymbol');
      if(productMsg) {
        this.productMsg = JSON.parse(productMsg);
      }
      deliveryCoinList().then(data => {
        this.coinList = data.map(item => {
          this.symbolObj[item.symbol] = {
            icon: item.coinIcon,
            endDatetime: formatDate(item.endDatetime, 'yyyy-MM-dd hh:mm:ss')
          };
          return {
            symbol: item.symbol,
            unit: item.unit,
            icon: item.coinIcon
          }
        });
        if(freeSymbol) {
          this.symbol = freeSymbol;
        }
      });
      if(freeSymbol) {}
    },
    methods: {
      toDelivery() {
        if(!this.symbol) {
          this.toastMsg = '请先选择币种';
          this.$refs.toast.show();
          return;
        }
        if(!this.productMsg.productCode) {
          this.toastMsg = '请先选择商品';
          this.$refs.toast.show();
          return;
        }
        this.deliveryConfig.symbol = this.symbol;
        this.deliveryConfig.realRightCode = this.productMsg.productCode;
        sessionStorage.setItem('deliveryConfig', JSON.stringify(this.deliveryConfig));
        this.$router.push(`delivery-confirm?avaAmount=${this.avaAmount}`);
      },
      toDeliveryDetail() {
        if(!this.symbol) {
          this.toastMsg = '请先选择币种';
          this.$refs.toast.show();
          return;
        }
        const selectedCoin = this.coinList.filter(item => item.symbol === this.symbol);
        this.$router.push(`delivery-detail?coinObj=${JSON.stringify(selectedCoin[0])}`);
      },
      toDeliveryImg() {
        if(!this.symbol) {
          this.toastMsg = '请先选择币种';
          this.$refs.toast.show();
          return;
        }
        this.$router.push(`delivery-image?symbol=${this.symbol}`);
      },
      getWallet() {
        wallet(this.symbol).then(data => {
          this.avaAmount = formatAmount(data.accountList[0].amount - data.accountList[0].frozenAmount, '', this.symbol);
        });
      },
      changeSymbol() {
        sessionStorage.removeItem('productMsg');
        this.productMsg = {};
      }
    },
    components: {
      Toast
    },
    watch: {
      symbol(newVal) {
        this.getWallet();
        sessionStorage.setItem('freeSymbol', newVal);
      }
    }
  }
</script>

<style scoped lang="scss">
  .deli_con{
    padding: 0 0.3rem;
    .c_h_select{
      display: flex;
      padding: 0.3rem 0;
      border-bottom: 1px solid #EBEBEB;
      margin-bottom: 0.3rem;
      select{
        width: 100%;
      }
    }
    .c_h_con{
      padding-bottom: 0.34rem;
      font-size: 0.24rem;
      color: #999999;
      .c_h_con_h{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .c_h_con_h_left_sp{
          color: #333;
        }
        .c_h_con_h_right{
          color: #517FFF;
        }
      }
    }
  }
  .line{
    background-color: #F5F5F5;
    height: 0.2rem;
  }
  .deli_foo{
    padding: 0.28rem 0.3rem 0.98rem;
    .deli_h5{
      color: #333333;
      font-size: 0.24rem;
      margin-bottom: 0.22rem;
    }
    .deli_iup_img{
      margin-bottom: 0.3rem;
      width: 2rem;
      height: 1.5rem;
      background-size: 100% 100%;
      background-image: url('./update.png');
    }
    .foo_box{
      border-top: 1px solid #EBEBEB;
      padding-top: 0.3rem;
      font-size: 0.24rem;
      color: #999999;
      margin-bottom: 1.6rem;
      .foo_box_h5{
        margin-bottom: 0.14rem;
      }
      p{
        line-height: 0.36rem;
      }
    }
    .foo_btn{
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.32rem;
      color: #fff;
      background-color: #D53D3D;
      border-radius: 0.1rem;
    }
  }
</style>
