<template>
  <div class="top-up-wrapper" @click.stop>
    <header>
      <p>
        <!-- <i class='icon'></i> -->
        <span v-show="show" class='txt1'>购买X币</span>
        <span v-show="!show" class='txt1'>出售X币</span>
        <router-link to='wallect-orderRecord' class='icon ico1'></router-link>
      </p>
    </header>
    <div class='tabs'>
        <p>
            <span :class="[ show ? 'select' : '' ]" @click='toBuy'>买入</span>
        </p>
        <p>
            <span :class="[ !show ? 'select' : '' ]" @click='toSell'>卖出</span>
        </p>
    </div>
    <div class='public'>
        <p class='text1'>自己币种（X）</p>
        <p class='text2'>
            <span class='txt1'>单价：<i class='txt2'>￥</i></span>
            <span class='txt3'>{{cnyMon}}</span>
        </p>
        <!-- <i class='icon'></i> -->
    </div>

    <div class='main'> 
        <!-- 买入显示内容 -->
        <div v-show='show' class='area'>
            <p class='tab'>
                <span :class="[ showDet ? 'active text1' : 'text1' ]" @click='buy'>金额</span>
                <span :class="[ !showDet ? 'active text2' : 'text2' ]" @click='sell'>数量</span>
            </p>
            <p class='inp'>
                <input type="text" :placeholder="showDet ? '输入购买金额' : '输入购买数量'" v-model="buyMonNumber">
                <span class='txt1'>{{showDet ? 'CNY' : 'X'}}</span>
            </p>
            <p class='money'>
                <span class='txt1'>≈ {{showDet ? ((Math.floor((buyMonNumber / cnyMon) * 100000000) / 100000000).toFixed(8)) : ((Math.floor(buyMonNumber * cnyMon * 100))/ 100).toFixed(2)}} {{!showDet ? 'CNY' : 'X'}}</span>
                <span class=txt2>手续费：<i class=txt3>{{fvData}}%</i></span>
            </p>
        </div>
        <!-- 卖出显示内容 -->
        <div v-show="!show" class='area'>
            <p class='tab'>
                <span :class="[ showDet ? 'active text1' : 'text1' ]" @click='buy'>金额</span>
                <span :class="[ !showDet ? 'active text2' : 'text2' ]" @click='sell'>数量</span>
                <span class='text3'>可用<i :title="cdsMoney">{{cdsMoney}}</i>X</span>
            </p>
            <p class='inp'>
                <input type="text" :placeholder="showDet ? '输入购买金额' : '输入购买数量'" v-model="sellMonNumber">
                <span class='txt1'>{{showDet ? 'CNY' : 'X'}}</span>
            </p>
            <p class='money'>
                <span class='txt1'>≈ {{showDet && cnyMon > 0 ? ((Math.floor((sellMonNumber / cnyMon) * 100000000) / 100000000).toFixed(8)) : ((Math.floor(sellMonNumber * cnyMon * 100))/ 100).toFixed(2)}} {{!showDet ? 'CNY' : 'X'}}</span>
                <span class=txt2>手续费：<i class=txt3>{{fvData}}%</i></span>
            </p>
        </div>
        <!-- 去购买 -->
        <div class='pay' v-show="show">  
            <span>付款方式</span>
            <span class='txt2'>
                <!-- <i class='icon icon1'></i> -->
                <select name="" id="" v-model="buyConfig.receiveType" @change="selBankcar">
                  <option 
                    :value="buyItem.bankCode" 
                    v-for="(buyItem, index) in zfBankList" 
                    :key="index"
                  >{{buyItem.bankName}}</option>
                </select>
                <i class='icon icon2'></i>
            </span>
        </div>
        <div class="payNum" v-show="show">
          <p>账号：{{bankcardNumber}}</p>
        </div>
        <!-- 去出售 -->
        <div class='pay' v-show="!show">
            <span>付款方式</span>
            <span class='txt2'>
                <!-- <i class='icon icon1'></i> -->
                <!-- <i class="xz-i">请选择</i> -->
                <select name="" id="" v-model="sellConfig.receiveType">
                  <option :value="sellItem.bankCode" v-for="(sellItem, index) in gmBankList" :key="index">{{sellItem.bankName}}</option>
                </select>
                <i class='icon icon2'></i>
            </span>
        </div>
        <div class="payNum" v-show="!show">
          <input type="text" placeholder="请输入账号或卡号" v-model="sellConfig.receiveCardNo">
        </div>
        <div class="payPaw" v-show="!show">
          <p>资金密码</p>
          <input type="password" placeholder="请输入资金密码" v-model="sellConfig.tradePwd">
        </div>
        <div class="btn-box">
          <button v-show='show' @click="toBuyClick">确认购买</button>
          <button v-show='!show' @click="toSellClick">确认出售</button>
        </div>
    </div>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import {getAdverMessage} from 'api/otc';
import {getUserId, formatMoneyMultiply, formatMoneySubtract, setTitle, getUrlParam} from 'common/js/util';
import {getBankData, getGmBankData, getNumberMoney, buyX, sellX, wallet} from 'api/person';
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';
export default {
  data() {
    return {
      textMsg: '操作成功',
      type: '',
      isLoading: true,
      show: true,
      showDet: true,
      buyMonNumber: '',
      bankcardNumber: '',
      sellMonNumber: '',
      fvData: '',
      cnyMon: '',
      buyConfig: {
        tradeCurrency: 'CNY',
        tradePrice: '',
        userId: getUserId(),
        count: '',
        receiveType: '支付宝',
        tradeAmount: ''
      },
      sellConfig: {
        userId: getUserId(),
        tradeCurrency: 'CNY',
        tradePrice: '',
        count: '',
        receiveCardNo: '',
        receiveType: '支付宝',
        tradeAmount: '',
        tradePwd: ''       // 资金密码
      },
      zfType: {},      // 去购买支付方式
      zfNumber: {},
      gmType: {},       // 去出售支付方式
      zfBankList: [],   // 去购买账号列表
      gmBankList: [],   // 去出售账号列表
      cdsMoney: ''
    };
  },
  created() {
    this.type = getUrlParam('type');
    this.show = this.type == 'buy' ? true : false;
    let text = this.type == 'buy' ? '购买' : '出售';
    setTitle(text);
    getAdverMessage('simu_order_rule').then(data => {
      this.fvData = parseFloat(data.simu_order_fee_rate) * 100;
    });
    getBankData().then(data => {
      this.zfBankList = data;
      data.forEach(item => {
        this.zfType[item.bankName] = item.bankCode;
        this.zfNumber[item.bankName] = item.bankcardNumber;
      });
    });
    // 数字货币折合
    getNumberMoney('X', 'CNY').then(data => {
      this.cnyMon = (Math.floor(parseFloat(data) * 100) / 100).toFixed(2);
      this.buyConfig.tradePrice = this.cnyMon;
      this.sellConfig.tradePrice = this.cnyMon;
    });
    // 账户
    wallet().then(res => {
      let cdsList = res.filter(item => item.currency == 'X')[0];
      if(cdsList){
        this.cdsMoney = formatMoneySubtract(`${cdsList.amount}`, `${cdsList.frozenAmount}`, 'X');
      }
      getGmBankData().then(data => {
        this.gmBankList = data;
        data.forEach(item => {
          this.gmType[item.bankName] = item.bankCode;
        });
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    });
  },
  methods: {
    buy() {
      this.showDet = true;
    },
    sell() {
      this.showDet = false;
    },
    toBuy() {
      this.show = true;
    },
    toSell() {
      this.show = false;
    },
    selBankcar(){
      let list = this.zfBankList.filter(item => item.bankCode == this.buyConfig.receiveType);
      this.bankcardNumber = list[0].bankcardNumber;
    },
    toBuyClick(){
      this.isLoading = true;
      if(this.showDet){
        this.buyConfig.tradeAmount = this.buyMonNumber;
        let count = this.cnyMon > 0 ? ((Math.floor((this.buyMonNumber / this.cnyMon) * 100000000) / 100000000).toFixed(8)) : '0';
        this.buyConfig.count = formatMoneyMultiply(`${count}`, '', 'X');
      }else{
        this.buyConfig.count = formatMoneyMultiply(`${this.buyMonNumber}`, '', 'X');
        this.buyConfig.tradeAmount = this.cnyMon > 0 ? ((Math.floor(this.buyMonNumber * this.cnyMon * 100))/ 100).toFixed(2) : '0';
      }
      buyX(this.buyConfig).then(data => {
        this.$refs.toast.show();
        setTimeout(() => {
          this.$router.push('wallect-orderRecord')
        }, 1000);
        this.isLoading = false;
        }, () => {
          this.isLoading = false;
      });
    },
    toSellClick(){
      this.isLoading = true;
      if(this.showDet){ // 金额
        this.sellConfig.tradeAmount = this.sellMonNumber;
        let count = this.cnyMon > 0 ? ((Math.floor((this.sellMonNumber / this.cnyMon) * 100000000) / 100000000).toFixed(8)) : '0';
        this.sellConfig.count = formatMoneyMultiply(`${count}`, '', 'X');
      }else{ // 数量
        this.sellConfig.count = formatMoneyMultiply(`${this.sellMonNumber}`, '', 'X');
        this.sellConfig.tradeAmount = this.cnyMon > 0 ? ((Math.floor(this.sellMonNumber * this.cnyMon * 100))/ 100).toFixed(2) : '0';
      }
      sellX(this.sellConfig).then(data => {
        this.$refs.toast.show();
        setTimeout(() => {
          this.$router.push('wallect-orderRecord')
        }, 1000);
        this.isLoading = false;
        }, () => {
          this.isLoading = false;
      });
    }
  },
  components: {
    FullLoading,
    Toast
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.top-up-wrapper {
  font-size: 0.32rem;
  color: #333;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    p {
      .icon {
        width: 0.2rem;
        height: 0.36rem;
        background-image: url('./fhui.png');
        margin-top: 0.28rem;
        float: left;
      }

      .ico1 {
        width: .26rem;
        height: .3rem;
        background-image: url('./zdan.png');
        float: right;
      }

      .txt1 {
        font-size: 0.36rem;
        font-weight: bold;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .tabs {
    width: 100%;
    display: flex;
    line-height: 0.9rem;
    text-align: center;
    width: 100%;
    background: #fff;
    margin-bottom: 0.2rem;

    p {
      flex: 1;
      font-size: 0.32rem;
      color: #989898;
      span {
        display: inline-block;
        width: 1rem;
      }
      .select {
        border-bottom: 0.04rem solid #d53d3d;
        color: #d53d3d;
      }
    }
  }

  .public {
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    position: relative;
    margin-bottom: 0.2rem;
    text-align: center;

    .text1 {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #323232;
      font-weight: bold;
      padding-top: 0.57rem;
      padding-bottom: 0.18rem;
    }

    .text2 {
      padding-bottom: 0.58rem;

      .txt1 {
        font-size: 0.24rem;
        line-height: 0.33rem;
        color: #999;

        .txt2 {
          color: #000;
          font-weight: bold;
        }
      }

      .txt3 {
        font-size: 0.48rem;
        font-weight: bold;
        line-height: 0.67rem;
      }
    }

    .icon {
      width: 0.16rem;
      height: 0.26rem;
      background-image: url('./gduo.png');
      position: absolute;
      top: 1.07rem;
      right: 0.3rem;
    }
  }

  .main {
    .area {
      width: 100%;
      background: #fff;
      margin-bottom: 0.2rem;
      .tab {
        width: 100%;
        padding: 0 .3rem 0 0.78rem;
        line-height: 0.87rem;
        box-shadow: 0 0.01rem 0 0 #ebebeb;
        background: rgba(242, 242, 242, 0);
        color: #999;
        margin-bottom: 0.24rem;
        .text1 {
          margin-right: 1.25rem;
        }
        .text3 {
            float: right;
            font-size: .28rem;
            color: #999;
            max-width: 3.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            i {
                color: #151515;
                margin: 0 .1rem;
            }
            
        }
        .active {
          color: #d53d3d;
          padding-bottom: 0.22rem;
          border-bottom: 0.04rem solid #d53d3d;
        }
      }
      .inp {
        width: 92%;
        margin: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        line-height: 1.2rem;
        border-bottom: .01rem solid #ebebeb;

        input {
          color: #999;
        }
        .txt1 {
          font-weight: bold;
          .txt {
              color: #999;
              padding-right: .1rem;
              margin-right: .1rem;
              border-right: .01rem solid #e5e5e5;
          }
        }
      }

      .money {
        width: 100%;
        padding: 0 0.3rem;
        line-height: 0.81rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.28rem;

        .txt1 {
          color: #343434;
        }
        .txt2 {
          color: #999;
        }
        .txt3 {
          color: #161616;
        }
      }
    }

    .pay {
      width: 100%;
      padding: 0 0.3rem;
      background: #fff;
      line-height: 1.1rem;
      display: flex;
      justify-content: space-between;
      color: #323232;
      font-weight: bold;
      position: relative;
      .xz-i{
        position: absolute;
        right: 2rem;
        top: 0%;
      }
      .txt2 {
        font-size: 0.28rem;
        width: 80%;
        select{
          width: 90%;
        }
      }
      .icon1 {
        width: 0.48rem;
        height: 0.46rem;
        background-image: url('./zfb.png');
        vertical-align: middle;
        margin-right: 0.12rem;
      }
      .icon2 {
        width: 0.17rem;
        height: 0.26rem;
        background-image: url('./gduo.png');
        vertical-align: middle;
        margin-left: 0.12rem;
      }
    }
    .payNum{
      width: 100%;
      padding: 0.1rem 0.3rem;
      background-color: #fff;
      line-height: 1.1rem;
      color: #323232;
      input{
        width: 100%;
        padding: 0.1rem 0.3rem;
        border: 1px solid #eee;
        border-radius: 0.08rem;
        height: 0.8rem;
      }
    }
    .payPaw{
      width: 100%;
      padding: 0.1rem 0.3rem;
      background-color: #fff;
      color: #323232;
      p{
        margin-bottom: 0.2rem;
      }
      input{
        width: 100%;
        padding: 0.1rem 0.3rem;
        border: 1px solid #eee;
        border-radius: 0.08rem;
        height: 0.8rem;
      }
    }

    button {
      width: 6.9rem;
      height: 1rem;
      margin: 0.65rem 0.3rem 0;
      background: #d53d3d;
      border-radius: 0.08rem;
      font-weight: bold;
      color: #fff;
      font-size: 0.32rem;
      line-height: 1.1rem;
    }
  }
  .btn-box{
    background-color: #fff;
    padding-bottom: 0.5rem;
  }
}
</style>
