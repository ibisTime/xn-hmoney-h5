<template>
  <div class="purchase-detail">
    <div class="header">
      <div class="h_left">
        <img :src="purDetail.symbolIcon" alt="">
        <p>TWT</p>
      </div>
      <div class="h_m">
        <img src="./Fill 1@2x.png" alt="">
      </div>
      <div class="h_right">
        <img :src="purDetail.toSymbolIcon" alt="">
        <p>{{purDetail.symbol}}</p>
      </div>
    </div>
    <div class="pur_con">
      <ul class="con_ul">
        <li class="li_single">
          <div class="li_left">申购总量</div>
          <div class="li_right">{{purDetail.totalAmount}} 个</div>
        </li>
        <li class="li_single">
          <div class="li_left">剩余总量</div>
          <div class="li_right">{{purDetail.remainAmount}} 个</div>
        </li>
        <li class="li_single">
          <div class="li_left">申购单价</div>
          <div class="li_right">1 {{purDetail.toSymbol}} = {{purDetail.price}} {{purDetail.symbol}}</div>
        </li>
        <li class="li_single">
          <div class="li_left">单人申购上限</div>
          <div class="li_right">{{purDetail.personPayAmountMax}} {{purDetail.toSymbol}}</div>
        </li>
        <li class="li_single">
          <div class="li_left">申购开始时间</div>
          <div class="li_right">{{purDetail.startDatetime}}</div>
        </li>
        <li class="li_single">
          <div class="li_left">申购结束时间</div>
          <div class="li_right">{{purDetail.endDatetime}}</div>
        </li>
      </ul>
      <div class="pur_introduce">
        <h5 class="int_head">币种介绍</h5>
        <p class="int_p">
          {{purDetail.symbolDescription}}
        </p>
      </div>
    </div>
    <div class="pur_foo_btn" v-if="purchaseStatus === '0'" @click="showModalFn">
      <p>申购</p>
    </div>
    <div class="pur_modal" v-show="isShowModal" @click="isShowModal = false">
      <div class="modal_box" @click.stop>
        <div class="del" @click="isShowModal = false">
          <img src="./del.png" alt="">
        </div>
        <ul class="modal_ul">
          <li class="modal_li_single">申购通证 <span class="modal_li_single_sp">{{purDetail.symbol}}币</span></li>
          <li class="modal_li_single">申购单价 <span class="modal_li_single_sp">1 TWT = {{purDetail.price}} {{purDetail.symbol}}</span></li>
          <li class="modal_li_single_num">
            <p>请输入支付数量</p>
            <p class="modal_li_single_num_p">
              <input
                type="number"
                class="modal_li_single_num_iup"
                v-model="config.payAmount"
                @keyup="isBuyMax"
                @blur="blurIn"
              >
            </p>
          </li>
        </ul>
        <p class="modal_p">
          <span>得到 {{purDetail.price * config.payAmount}} {{purDetail.symbol}}</span>
          <span>TWT余额：{{userAmount}}</span>
        </p>
        <div class="foo_btn" @click="comfirmPayment">
          确认付款
        </div>
      </div>
    </div>
    <div class="modal_success" v-if="isSuccessModal" @click="isSuccessModal = false">
      <div class="success_modal_box" @click.stop>
        <div class="suc_m_header">
          <img class="s_m_h_img" src="./success_icon.png" alt="">
          <p class="s_m_h_p">申购成功</p>
        </div>
        <div class="con_btn" @click="toPurchaseRecord"><span>查看申购记录</span></div>
        <p class="tip">
          {{timer}}秒后自动跳转
        </p>
      </div>
    </div>
    <PawModal :isShow="isShowPawModal" @getPawList="getPawList" @removePaw="removePaw"/>
    <Toast :text="textMsg" ref="toast"/>
    <FullLoading :title="' '" v-show="isShowLoading"></FullLoading>
  </div>
</template>

<script>
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';
  import {wallet} from 'api/person';
  import {getUserById} from 'api/user';
  import {buyPurchase, purchaseDetail} from 'api/homeDig';
  import { setTitle, formatAmount, formatMoneyMultiply, formatDate } from "common/js/util";
  import PawModal from 'base/pwd-modal/index';
  export default {
    data() {
      return {
        isShowLoading: false,
        isShowModal: false,
        isShowPawModal: false,
        isSuccessModal: false,
        purchaseStatus: '',
        timer: 5,
        interval: null,
        purDetail: {},
        config: {
          payAmount: '',
          purchaseProductCode: '',
          tradePwd: ''
        },
        twtAmount: '',
        textMsg: '',
        userAmount: 0
      }
    },
    created() {
      setTitle('申购详情');
      const purchaseCode = sessionStorage.getItem('purchaseCode');
      this.purchaseStatus = sessionStorage.getItem('purchaseStatus');
      if(purchaseCode) {
        purchaseDetail(purchaseCode).then(data => {
          data.startDatetime = formatDate(data.startDatetime, 'yyyy-MM-dd hh:mm:ss');
          data.endDatetime = formatDate(data.endDatetime, 'yyyy-MM-dd hh:mm:ss');
          data.totalAmount = formatAmount(data.totalAmount, '', data.symbol);
          data.remainAmount = formatAmount(data.remainAmount, '', data.symbol);
          data.personPayAmountMax = formatAmount(data.personPayAmountMax, '', data.toSymbol);
          data.symbolIcon = PIC_PREFIX + data.symbolIcon;
          data.toSymbolIcon = PIC_PREFIX + data.toSymbolIcon;
          this.purDetail = data;
        });
        this.config.purchaseProductCode = purchaseCode;
      }
      wallet('TWT').then(data => {
        this.userAmount = formatAmount((data.accountList[0].amount - data.accountList[0].frozenAmount), '', 'TWT');
      });
    },
    methods: {
      comfirmPayment() {
        if(!this.config.payAmount) {
          this.textMsg = '请先填写申购数量';
          this.$refs.toast.show();
          return;
        }
        window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
        this.isShowPawModal = true;
        this.isShowModal = false;
      },
      getPawList(list) {
        window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
        const tradePwd = list.join('');
        if(tradePwd.length < 6) {
          this.textMsg = '请完整输入交易密码';
          this.$refs.toast.show();
          return;
        }
        this.config.tradePwd = list.join('');
        this.isShowLoading = true;
        const payAmount = formatMoneyMultiply(this.config.payAmount, '', this.purDetail.toSymbol);
        buyPurchase({
          ...this.config,
          payAmount
        }).then(() => {
          this.isShowLoading = false;
          this.isShowPawModal = false;
          this.isSuccessModal = true;
          if(this.interval) {
            clearInterval(this.interval);
          }
          this.interval = setInterval(() => {
            this.timer --;
            if(this.timer < 1) {
              this.$router.push('purchase-record');
              clearInterval(this.interval);
            }
          }, 1000);
        }).catch(() => {
          this.isShowLoading = false;
        });
      },
      removePaw() {
        this.isShowModal = true;
        this.isShowPawModal = false;
        this.config.tradePwd = '';
      },
      toPurchaseRecord() {
        this.$router.replace('purchase-record');
      },
      isBuyMax() {
        if(+this.config.payAmount > +this.purDetail.personPayAmountMax) {
          this.textMsg = `申购数量不得大于上限${this.purDetail.personPayAmountMax}`;
          this.$refs.toast.show();
          this.config.payAmount = this.purDetail.personPayAmountMax;
          return;
        }
      },
      showModalFn() {
        getUserById().then(data => {
          if(data.tradepwdFlag) {
            this.isShowModal = true;
          }else {
            this.textMsg = '请先设置交易密码';
            this.$refs.toast.show();
            return;
          }
        });
      },
      blurIn () {
        window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
      }
    },
    components: {
      PawModal,
      Toast,
      FullLoading
    },
    computed: {
      scrollHeight () {
        return document.documentElement.scrollTop || document.body.scrollTop || 0
      }
    },
    beforeDestroy() {
      if(this.interval) {
        clearInterval(this.interval);
      }
    }
  }
</script>


<style lang="scss" scoped>
  .purchase-detail{
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
          border-radius: 100%;
          width: 0.78rem;
          height: 0.78rem;
          margin-bottom: 0.2rem;
        }
      }
      .h_m{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 0.6rem;
          height: 0.32rem;
        }
      }
      .h_right{
        flex: 2;
        img{
          border-radius: 100%;
          width: 0.78rem;
          height: 0.78rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .pur_con{
      padding-bottom: 2rem;
      background-color: #FAFAFA;
      .con_ul{
        .li_single{
          padding: 0.3rem 0;
          display: flex;
          border-bottom: 1px solid #E6E6E6;
          .li_left{
            font-size: 0.28rem;
            color: #999;
            width: 28%;
          }
          .li_right{
            font-size: 0.32rem;
            color: #333333;
          }
        }
      }
      .pur_introduce{
        margin-top: 0.3rem;
        .int_head{
          color: #333333;
          font-size: 0.3rem;
          margin-bottom: 0.2rem;
        }
        .int_p{
          font-size: 0.28rem;
          color: #999;
          line-height: 0.48rem;
        }
      }
    }
    .pur_foo_btn{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1.8rem;
      background-color: #fff;
      font-size: 0.32rem;
      color: #fff;
      box-shadow: 0 -0.04rem 0.08rem 0 #E6E6E6;
      padding: 0.4rem 0.3rem;
      p{
        border-radius: 0.08rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background-color: #D53D3D;
      }
    }
  }
  .pur_modal{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0,0,0,.5);
    .modal_box{
      position: absolute;
      left: 0.7rem;
      right: 0.7rem;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      border-radius: 0.1rem;
      padding: 0.3rem 0.4rem 0.8rem;
      .del{
        position: absolute;
        right: 0.22rem;
        top: 0.22rem;
        font-size: 0;
        img{
          width: 0.4rem;
          height: 0.4rem;
        }
      }
      .modal_ul{
        margin-bottom: 0.2rem;
        li{
          padding: 0.24rem 0;
          border-bottom: 1px solid #E6E6E6;
          color: #999999;
        }
        .modal_li_single{
          font-size: 0.28rem;
          .modal_li_single_sp{
            color: #333333;
            margin-left: 0.3rem;
            font-size: 0.28rem;
          }
        }
        .modal_li_single_num{
          padding: 0.2rem 0;
          font-size: 0.24rem;
          .modal_li_single_num_p{
            padding-top: 0.12rem;
            .modal_li_single_num_iup{
              color: #333;
              font-size: 0.32rem;
            }
          }
        }
      }
      .modal_p{
        font-size: 0.24rem;
        color: #999;
        margin-bottom: 0.64rem;
        display: flex;
        justify-content: space-between;
      }
      .foo_btn{
        height: 0.9rem;
        line-height: 0.9rem;
        color: #fff;
        background-color: #D53D3D;
        font-size: 0.28rem;
        text-align: center;
      }
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
</style>
